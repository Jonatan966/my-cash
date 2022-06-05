import {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@firebase/firestore'

import { RemoveTransactionDialog } from 'components/RemoveTransactionDialog'

import { useThemeSwitcher } from './useThemeSwitcher'

import { ITransaction } from 'interfaces/Transactions'
import { firestoreConfig } from 'services/firebase'
import { useAuth } from 'contexts/authContext'
import { ICategory } from 'interfaces/Category'
import { TransactionModal } from 'components/TransactionModal'

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: ITransaction[]
  categories: ICategory[]
  selectedTransaction?: ITransaction
  isFetchingTransactions?: boolean

  createTransaction: (transaction: TransactionInput) => Promise<void>
  removeTransaction: () => Promise<void>
  editTransaction: (transaction: ITransaction) => Promise<void>
  handleToggleNewTransactionModal: (
    isOpen: boolean,
    transaction?: ITransaction
  ) => void
  handleToggleRemoveTransactionDialog: (transaction?: ITransaction) => void
  handleToggleEditTransactionModal: (transaction?: ITransaction) => void
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { setScrollbarVisibility } = useThemeSwitcher()
  const { user } = useAuth()

  const [isFetchingTransactions, setIsFetchingTransactions] = useState(false)
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<
    ITransaction | undefined
  >()

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [isRemoveTransactionDialogOpen, setIsRemoveTransactionDialogOpen] =
    useState(false)

  useEffect(() => {
    if (user) {
      setIsFetchingTransactions(true)

      const transactionsCollRef = collection(
        firestoreConfig,
        `/users/${user?.id}/transactions`
      )

      const categoriesCollRef = collection(
        firestoreConfig,
        `/users/${user?.id}/categories`
      )

      getDocs(categoriesCollRef).then((docs) => {
        const mappedDocs: ICategory[] = []

        docs.forEach((doc) =>
          mappedDocs.push({
            ...(doc.data() as ICategory),
            id: doc.id,
          })
        )

        setCategories(mappedDocs)
      })

      getDocs(transactionsCollRef).then((docs) => {
        const mappedDocs: ITransaction[] = []

        docs.forEach((doc) =>
          mappedDocs.push({
            ...(doc.data() as ITransaction),
            id: doc.id,
          })
        )

        setTransactions(mappedDocs)
        setIsFetchingTransactions(false)
      })
    }
  }, [user])

  async function createCategory(title: string) {
    const categoriesCollRef = collection(
      firestoreConfig,
      `/users/${user?.id}/categories`
    )

    let newCategory: ICategory = {
      title,
    }

    const insertCategoryResult = await addDoc(categoriesCollRef, newCategory)

    newCategory.id = insertCategoryResult.id
    setCategories([...categories, newCategory])
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const transactionsCollRef = collection(
      firestoreConfig,
      `/users/${user?.id}/transactions`
    )

    let newTransaction: ITransaction = {
      ...transactionInput,
      createdAt: new Date().getTime(),
    }

    const hasCreatedCategory = categories.some(
      (category) => category.title === newTransaction.category
    )

    const insertResultRef = await addDoc(transactionsCollRef, newTransaction)

    newTransaction.id = insertResultRef.id

    setTransactions([...transactions, newTransaction])

    if (!hasCreatedCategory) {
      await createCategory(newTransaction.category)
    }
  }

  async function editTransaction({
    id: transactionId,
    createdAt,
    ...transaction
  }: ITransaction) {
    const transactionDocRef = doc(
      firestoreConfig,
      `/users/${user?.id}/transactions/${transactionId}`
    )

    const hasCreatedCategory = categories.some(
      (category) => category.title === transaction.category
    )

    await updateDoc(transactionDocRef, {
      ...transaction,
    })

    setTransactions((transactions) => {
      const newTransactionList = [...transactions]

      const targetTransaction = newTransactionList.findIndex(
        (transaction) => transaction.id === transactionId
      )

      newTransactionList[targetTransaction] = {
        ...newTransactionList[targetTransaction],
        ...transaction,
      }

      return newTransactionList
    })

    if (!hasCreatedCategory) {
      await createCategory(transaction.category)
    }
  }

  function handleToggleNewTransactionModal(isOpen: boolean) {
    setScrollbarVisibility(!isOpen)
    setIsTransactionModalOpen(isOpen)

    if (isOpen) {
      setSelectedTransaction(undefined)
    }
  }

  function handleToggleEditTransactionModal(transaction?: ITransaction) {
    setScrollbarVisibility(!transaction)
    setIsTransactionModalOpen(!!transaction)

    if (transaction) {
      setSelectedTransaction(transaction)
    }
  }

  function handleToggleRemoveTransactionDialog(transaction?: ITransaction) {
    setScrollbarVisibility(!transaction)
    setIsRemoveTransactionDialogOpen(!!transaction)

    if (transaction) {
      setSelectedTransaction(transaction)
    }
  }

  async function removeTransaction() {
    const transactionsCollRef = doc(
      firestoreConfig,
      `/users/${user?.id}/transactions/${selectedTransaction?.id}`
    )

    await deleteDoc(transactionsCollRef)

    setTransactions((oldValue) =>
      oldValue.filter(
        (transaction) => transaction.id !== selectedTransaction?.id
      )
    )
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        categories,
        createTransaction,
        editTransaction,
        removeTransaction,
        selectedTransaction,
        isFetchingTransactions,
        handleToggleNewTransactionModal,
        handleToggleRemoveTransactionDialog,
        handleToggleEditTransactionModal,
      }}
    >
      {children}
      <TransactionModal isOpen={isTransactionModalOpen} />
      <RemoveTransactionDialog isOpen={isRemoveTransactionDialogOpen} />
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}

import {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs } from '@firebase/firestore'

import { NewTransactionModal } from 'components/NewTransactionModal'
import { RemoveTransactionModal } from 'components/RemoveTransactionModal'

import { useThemeSwitcher } from './useThemeSwitcher'

import { ITransaction } from 'interfaces/Transactions'
import { firestoreConfig } from 'services/firebase'
import { useAuth } from 'contexts/authContext'
import { ICategory } from 'interfaces/Category'

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: ITransaction[]
  categories: ICategory[]
  isNewTransactionModalOpen: boolean
  isRemoveModalOpen: boolean
  selectedTransaction?: string
  isFetchingTransactions?: boolean

  createTransaction: (transaction: TransactionInput) => Promise<void>
  removeTransaction: () => Promise<void>
  handleOpenNewTransactionModal: () => void
  handleCloseNewTransactionModal: () => void
  handleOpenRemoveTransactionModal: (transactionId: string) => void
  handleCloseRemoveTransactionModal: () => void
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { setScrollbarVisibility } = useThemeSwitcher()
  const { user } = useAuth()

  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<string | undefined>()
  const [isFetchingTransactions, setIsFetchingTransactions] = useState(false)

  useEffect(() => {
    if (user) {
      setIsFetchingTransactions(true)

      const transactionsCollRef = collection(
        firestoreConfig, 
        `/users/${user?.id}/transactions`,
      )

      const categoriesCollRef = collection(
        firestoreConfig, 
        `/users/${user?.id}/categories`,
      )

      getDocs(categoriesCollRef).then(docs => {
        const mappedDocs: ICategory[] = []

        docs.forEach(doc => 
          mappedDocs.push({
            ...doc.data() as ICategory,
            id: doc.id
          })
        )

        setCategories(mappedDocs)
      })

      getDocs(transactionsCollRef).then(docs => {
        const mappedDocs: ITransaction[] = []

        docs.forEach(doc => 
          mappedDocs.push({
            ...doc.data() as ITransaction,
            id: doc.id
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
    const transactionsCollRef = collection(firestoreConfig, `/users/${user?.id}/transactions`)

    let newTransaction: ITransaction = {
      ...transactionInput,
      createdAt: (new Date()).getTime(),
    }

    const hasCreatedCategory = categories.some(category => 
      category.title === newTransaction.category
    )

    const insertResultRef = await addDoc(transactionsCollRef, newTransaction)

    newTransaction.id = insertResultRef.id

    setTransactions([...transactions, newTransaction])

    if (!hasCreatedCategory) {
      await createCategory(newTransaction.category)
    }
  }

  function handleOpenNewTransactionModal() {
    setScrollbarVisibility(false)
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setScrollbarVisibility(true)
    setIsNewTransactionModalOpen(false)
  }

  function handleOpenRemoveTransactionModal(transactionId: string) {
    setScrollbarVisibility(false)
    setSelectedTransaction(transactionId)
    setIsRemoveModalOpen(true)
  }

  function handleCloseRemoveTransactionModal() {
    setScrollbarVisibility(true)
    setIsRemoveModalOpen(false)
  }

  async function removeTransaction() {
    const transactionsCollRef = doc(
      firestoreConfig, 
      `/users/${user?.id}/transactions/${selectedTransaction}`
    )

    await deleteDoc(transactionsCollRef)

    setTransactions((oldValue) =>
      oldValue.filter((transaction) => transaction.id !== selectedTransaction)
    )
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        categories,
        createTransaction,
        removeTransaction,
        selectedTransaction,
        isNewTransactionModalOpen,
        isRemoveModalOpen,
        isFetchingTransactions,
        handleOpenNewTransactionModal,
        handleCloseNewTransactionModal,
        handleOpenRemoveTransactionModal,
        handleCloseRemoveTransactionModal,
      }}
    >
      {children}
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <RemoveTransactionModal />
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}

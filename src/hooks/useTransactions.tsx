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

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: ITransaction[]
  isNewTransactionModalOpen: boolean
  isRemoveModalOpen: boolean
  selectedTransaction?: string

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
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<string | undefined>()

  useEffect(() => {
    if (user) {
      const transactionsCollRef = collection(
        firestoreConfig, 
        `/users/${user?.id}/transactions`
      )

      getDocs(transactionsCollRef).then(docs => {
        const mappedDocs: ITransaction[] = []

        docs.forEach(doc => 
          mappedDocs.push({
            ...doc.data() as ITransaction,
            id: doc.id
          })
        )

        setTransactions(mappedDocs)
      })
    }
  }, [user])

  async function createTransaction(transactionInput: TransactionInput) {
    const transactionsCollRef = collection(firestoreConfig, `/users/${user?.id}/transactions`)

    let newTransaction: ITransaction = {
      ...transactionInput,
      createdAt: (new Date()).getTime(),
    }

    const insertResultRef = await addDoc(transactionsCollRef, newTransaction)

    newTransaction.id = insertResultRef.id

    setTransactions([...transactions, newTransaction])
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
        createTransaction,
        removeTransaction,
        selectedTransaction,
        isNewTransactionModalOpen,
        isRemoveModalOpen,
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

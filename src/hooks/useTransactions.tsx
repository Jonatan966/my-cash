import { useContext } from "react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { RemoveTransactionModal } from "../components/RemoveTransactionModal";
import { ITransaction } from "../interfaces/Transactions";
import { useDatabase } from "./useDatabase";
import { useThemeSwitcher } from "./useThemeSwitcher";

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: ITransaction[];
  isNewTransactionModalOpen: boolean;
  isRemoveModalOpen: boolean;
  selectedTransaction: number;

  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: () => Promise<void>;
  handleOpenNewTransactionModal: () => void;
  handleCloseNewTransactionModal: () => void;
  handleOpenRemoveTransactionModal: (transactionId: number) => void;
  handleCloseRemoveTransactionModal: () => void;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { setScrollbarVisibility } = useThemeSwitcher()

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(-1);

  const { transactionsTable } = useDatabase();

  useEffect(() => {
    transactionsTable.toArray()
      .then(response => setTransactions(response))
  }, [transactionsTable])

  async function createTransaction(transactionInput: TransactionInput) {
    const newTransactionId = await transactionsTable.add({
      ...transactionInput,
      createdAt: new Date()
    });

    const transaction = await transactionsTable.where({ id: newTransactionId }).toArray();

    setTransactions([...transactions, ...transaction])
  }

  function handleOpenNewTransactionModal() {
    setScrollbarVisibility(false);
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setScrollbarVisibility(true);
    setIsNewTransactionModalOpen(false);
  }

  function handleOpenRemoveTransactionModal(transactionId: number) {
    setScrollbarVisibility(false);
    setSelectedTransaction(transactionId)
    setIsRemoveModalOpen(true)
  }

  function handleCloseRemoveTransactionModal() {
    setScrollbarVisibility(true);
    setIsRemoveModalOpen(false)
  }


  async function removeTransaction() {
    await transactionsTable.delete(selectedTransaction)

    setTransactions(oldValue => 
      oldValue.filter(transaction => transaction.id !== selectedTransaction)
    )
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
      removeTransaction,
      selectedTransaction,
      isNewTransactionModalOpen,
      isRemoveModalOpen,
      handleOpenNewTransactionModal,
      handleCloseNewTransactionModal,
      handleOpenRemoveTransactionModal,
      handleCloseRemoveTransactionModal
    }}>
      {children}
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <RemoveTransactionModal/>
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

import { useContext } from "react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { ITransaction } from "../interfaces/Transactions";
import { useDatabase } from "./useDatabase";

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: ITransaction[];
  isNewTransactionModalOpen: boolean;

  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (transactionId: number) => Promise<void>;
  handleOpenNewTransactionModal: () => void;
  handleCloseNewTransactionModal: () => void;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const { transactionsTable } = useDatabase();

  useEffect(() => {
    transactionsTable.toArray()
      .then(response => setTransactions(response))
  }, [transactionsTable])

  async function createTransaction(transactionInput: TransactionInput) {
    const teste = await transactionsTable.add({
      ...transactionInput,
      createdAt: new Date()
    });

    const transaction = await transactionsTable.where({ id: teste }).toArray();

    setTransactions([...transactions, ...transaction])
  }

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }


  async function removeTransaction(transactionId: number) {
    await transactionsTable.delete(transactionId)

    setTransactions(oldValue => 
      oldValue.filter(transaction => transaction.id !== transactionId)
    )
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
      removeTransaction,
      isNewTransactionModalOpen,
      handleOpenNewTransactionModal,
      handleCloseNewTransactionModal
    }}>
      {children}
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

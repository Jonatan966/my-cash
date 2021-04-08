import { useContext } from "react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ITransaction } from "../interfaces/Transactions";
import { useDatabase } from "./useDatabase";

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
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

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

import { DtMoneyDatabase } from "../services/DexieDatabase";

const database = new DtMoneyDatabase();

export function useDatabase() {
  return {
    transactionsTable: database.transactions
  }
}
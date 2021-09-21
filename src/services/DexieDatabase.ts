import Dexie from 'dexie'
import { ITransaction } from '../interfaces/Transactions'


export class DtMoneyDatabase extends Dexie {
  transactions: Dexie.Table<ITransaction, number>

  constructor() {
    super("DtMoney");
    this.version(1).stores({
      transactions: '++id, title, amount, category, type, createdAt'
    });

    this.transactions = this.table('transactions');
  }
}

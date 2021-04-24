export interface ITransaction {
  id?: number,
  title: string,
  amount: number,
  category: string,
  type: 'deposit' | 'withdraw',
  createdAt: Date
}

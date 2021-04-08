export interface ITransaction {
  id?: string,
  title: string,
  amount: number,
  category: string,
  type: 'deposit' | 'withdraw',
  createdAt: Date
}

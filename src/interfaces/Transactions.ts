export interface ITransaction {
  id?: string
  title: string
  amount: number
  category: string
  transactionDate: string
  type: 'deposit' | 'withdraw'
  createdAt: number
}

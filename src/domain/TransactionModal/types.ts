export interface TransactionDTO {
  title: string
  amount: number
  category: string
  transactionDate: string
  type: 'deposit' | 'withdraw'
}

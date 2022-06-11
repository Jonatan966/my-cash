export interface TransactionTypeProps {
  onChange(newValue: string): void
  value: 'deposit' | 'withdraw'
}

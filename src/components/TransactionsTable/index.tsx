import { useTransactions } from 'hooks/useTransactions'

import { Container } from './styles'
import { TransactionCard } from './TransactionCard'

export function TransactionsTable() {
  const { transactions, handleOpenRemoveTransactionModal } = useTransactions()

  return (
    <Container itensCount={transactions.length}>
      <table>
        <thead>
          <tr>
            <th>
              <span>Título</span>
            </th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>
              <span>Data</span>
            </th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => 
            <TransactionCard 
              key={`transaction-${transaction.id}`} 
              transaction={transaction} 
              onRemove={handleOpenRemoveTransactionModal}
            />
          )}
        </tbody>
      </table>
    </Container>
  )
}

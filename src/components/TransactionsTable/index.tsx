import { BackdropLoader } from 'components/BackdropLoader'
import { useTransactions } from 'hooks/useTransactions'

import { Container } from './styles'
import { TransactionCard } from './TransactionCard'

export function TransactionsTable() {
  const {
    transactions,
    handleToggleRemoveTransactionDialog,
    handleToggleEditTransactionModal,
    isFetchingTransactions,
  } = useTransactions()

  return (
    <Container itensCount={transactions.length}>
      {isFetchingTransactions ? (
        <BackdropLoader />
      ) : (
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
            {transactions.map((transaction) => (
              <TransactionCard
                key={`transaction-${transaction.id}`}
                transaction={transaction}
                onRemove={handleToggleRemoveTransactionDialog}
                onEdit={(transaction) =>
                  handleToggleEditTransactionModal(transaction)
                }
              />
            ))}
          </tbody>
        </table>
      )}
    </Container>
  )
}

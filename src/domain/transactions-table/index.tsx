import { useMemo } from 'react'
import dayjs from 'dayjs'

import { BackdropLoader } from 'components/backdrop-loader'
import { useTransactions } from 'contexts/transactions'

import { TransactionCard } from './transaction-card'
import { Container } from './styles'

export function TransactionsTable() {
  const {
    transactions,
    handleToggleRemoveTransactionDialog,
    handleToggleEditTransactionModal,
    isFetchingTransactions,
  } = useTransactions()

  const orderedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) =>
      dayjs(b.transactionDate || b.createdAt).diff(
        dayjs(a.transactionDate || a.createdAt)
      )
    )
  }, [transactions])

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
            {orderedTransactions.map((transaction) => (
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

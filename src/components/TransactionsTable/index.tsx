import { useTransactions } from 'hooks/useTransactions'
import { Button } from 'components/Button'

import trashImg from 'assets/trash.svg'

import { Container } from './styles'

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
          {transactions.map((transaction) => (
            <tr key={`transaction-${transaction.id}`}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
              <td className="trash">
                <Button
                  title="Remover"
                  onClick={() =>
                    handleOpenRemoveTransactionModal(transaction.id || '')
                  }
                  fontSize='0'
                  backgroundColor='trashBg'
                >
                  <img src={trashImg} alt="Remover" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

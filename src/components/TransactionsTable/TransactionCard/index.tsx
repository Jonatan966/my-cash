import { Button } from 'components/Button'
import { ITransaction } from 'interfaces/Transactions'

import trashImg from 'assets/trash.svg'
import Container from './styles'

interface TransactionCardProps {
  transaction: ITransaction,
  onRemove(id: string): void,
}

export function TransactionCard({ transaction, onRemove }: TransactionCardProps) {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(transaction.amount)

  const formattedCreationDate = new Intl.DateTimeFormat('pt-BR')
    .format(new Date(transaction.createdAt))

  return (
    <Container>
      <td>{transaction.title}</td>
      <td className={transaction.type}>
        {formattedAmount}
      </td>
      <td>{transaction.category}</td>
      <td>
        {formattedCreationDate}
      </td>
      <td className="trash">
        <Button
          title="Remover"
          onClick={() =>
            onRemove(transaction.id || '')
          }
          fontSize='0'
          backgroundColor='trashBg'
        >
          <img src={trashImg} alt="Remover" />
        </Button>
      </td>
    </Container>
  )
}

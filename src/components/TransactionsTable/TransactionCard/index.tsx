import { Button } from 'components/Button'
import { ITransaction } from 'interfaces/Transactions'

import trashImg from 'assets/trash.svg'
import editImg from 'assets/edit.svg'
import Container from './styles'

interface TransactionCardProps {
  transaction: ITransaction
  onRemove(transaction: ITransaction): void
  onEdit(transaction: ITransaction): void
}

export function TransactionCard({
  transaction,
  onRemove,
  onEdit,
}: TransactionCardProps) {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(transaction.amount)

  const formattedCreationDate = new Intl.DateTimeFormat('pt-BR').format(
    new Date(transaction.createdAt)
  )

  return (
    <Container>
      <td>{transaction.title}</td>
      <td className={transaction.type}>{formattedAmount}</td>
      <td>{transaction.category}</td>
      <td>{formattedCreationDate}</td>
      <td className="actions">
        <Button
          title="Editar"
          onClick={() => onEdit(transaction)}
          fontSize="0"
          backgroundColor="editBg"
        >
          <img src={editImg} alt="Editar" className="edit" />
        </Button>

        <Button
          title="Remover"
          onClick={() => onRemove(transaction)}
          fontSize="0"
          backgroundColor="trashBg"
        >
          <img src={trashImg} alt="Remover" className="trash" />
        </Button>
      </td>
    </Container>
  )
}

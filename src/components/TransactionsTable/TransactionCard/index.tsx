import { FiEdit, FiTrash } from 'react-icons/fi'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { Button } from 'components/Button'
import { ITransaction } from 'interfaces/Transactions'

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

  const formattedCreationDate = useMemo(() => {
    const formattedDate = dayjs(
      transaction.transactionDate || transaction.createdAt
    )
      .locale('pt-BR')
      .format('DD/MM/YYYY')

    return formattedDate
  }, [transaction])

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
          backgroundColor="edit"
        >
          <FiEdit size={16} className="edit" />
        </Button>

        <Button
          title="Remover"
          onClick={() => onRemove(transaction)}
          fontSize="0"
          backgroundColor="remove"
        >
          <FiTrash size={16} className="trash" />
        </Button>
      </td>
    </Container>
  )
}

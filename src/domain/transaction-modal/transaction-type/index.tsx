import { FC } from 'react'
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi'

import { SelectableButton } from 'components/selectable-button'
import { TransactionTypeProps } from './types'
import { Container } from './styles'

export const TransactionType: FC<TransactionTypeProps> = ({
  onChange,
  value,
}) => {
  return (
    <Container>
      <SelectableButton
        isActive={value === 'deposit'}
        onClick={() => onChange('deposit')}
        activeColor="green"
      >
        <FiArrowUpCircle size={20} />
        <span>Entrada</span>
      </SelectableButton>
      <SelectableButton
        isActive={value === 'withdraw'}
        onClick={() => onChange('withdraw')}
        activeColor="red"
      >
        <FiArrowDownCircle size={20} />
        <span>Saída</span>
      </SelectableButton>
    </Container>
  )
}

import { useHistory } from 'react-router-dom'

import { useTransactions } from 'hooks/useTransactions'
import { Button } from 'components/Button'

import { Container } from './styles'

import { FiList, FiPieChart } from 'react-icons/fi'

interface NavigationBarProps {
  selectedRoute: 'listing' | 'summary'
}

export function NavigationBar({ selectedRoute }: NavigationBarProps) {
  const { handleToggleNewTransactionModal } = useTransactions()
  const { push } = useHistory()

  const setSelectedClass = (targetRoute: NavigationBarProps['selectedRoute']) =>
    selectedRoute === targetRoute ? 'selected-btn' : ''

  return (
    <Container>
      <nav>
        <Button
          backgroundColor="none"
          className={setSelectedClass('listing')}
          onClick={() => push('/')}
        >
          <FiList size={24} />
          Listagem
        </Button>

        <Button
          title="Nova transação"
          onClick={() => handleToggleNewTransactionModal(true)}
          textColor="#fff"
          fontSize="1.75rem"
        >
          +
        </Button>

        <Button
          backgroundColor="none"
          className={setSelectedClass('summary')}
          onClick={() => push('/summary')}
        >
          <FiPieChart size={24} />
          Resumo
        </Button>
      </nav>
    </Container>
  )
}

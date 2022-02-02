import { useHistory } from 'react-router-dom'

import { useTransactions } from 'hooks/useTransactions'
import { Button } from 'components/Button'

import { Container } from './styles'

import { ReactComponent as ListImg } from 'assets/list.svg'
import { ReactComponent as PieChartImg } from 'assets/pie-chart.svg'

interface NavigationBarProps {
  selectedRoute: 'listing' | 'summary'
}

export function NavigationBar({ selectedRoute }: NavigationBarProps) {
  const { handleOpenNewTransactionModal } = useTransactions()
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
          <ListImg />
          Listagem
        </Button>

        <Button
          title="Nova transação"
          onClick={handleOpenNewTransactionModal}
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
          <PieChartImg />
          Resumo        
        </Button>
      </nav>
    </Container>
  )
}

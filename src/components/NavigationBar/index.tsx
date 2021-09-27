import { Link } from 'react-router-dom'

import { useTransactions } from 'hooks/useTransactions'

import { Container } from './styles'

import { ReactComponent as ListImg } from 'assets/list.svg'
import { ReactComponent as PieChartImg } from 'assets/pie-chart.svg'

interface NavigationBarProps {
  selectedRoute: 'listing' | 'summary'
}

export function NavigationBar({ selectedRoute }: NavigationBarProps) {
  const { handleOpenNewTransactionModal } = useTransactions()

  return (
    <Container>
      <nav>
        <Link
          to="/"
          className={selectedRoute === 'listing' ? 'selected-btn' : ''}
        >
          <ListImg />
          Listagem
        </Link>
        <button
          title="Nova transação"
          className="new-btn"
          onClick={handleOpenNewTransactionModal}
        >
          +
        </button>
        <Link
          to="/summary"
          className={selectedRoute === 'summary' ? 'selected-btn' : ''}
        >
          <PieChartImg />
          Resumo
        </Link>
      </nav>
    </Container>
  )
}

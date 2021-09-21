import { useTransactions } from 'hooks/useTransactions'

import { Container } from './styles'

import { ReactComponent as ListImg } from 'assets/list.svg'
import { ReactComponent as PieChartImg } from 'assets/pie-chart.svg'

export function NavigationBar() {
  const { handleOpenNewTransactionModal } = useTransactions()

  return (
    <Container>
      <nav>
        <button className="selected-btn">
          <ListImg />
          Listagem
        </button>
        <button
          title="Nova transação"
          className="new-btn"
          onClick={handleOpenNewTransactionModal}
        >
          +
        </button>
        <button>
          <PieChartImg />
          Resumo
        </button>
      </nav>
    </Container>
  )
}

import { Pie } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js'
import ChartDatalabelsPlugin from 'chartjs-plugin-datalabels'

import { NavigationBar } from 'components/NavigationBar'

import { ReactComponent as ArrowImg } from 'assets/arrow-left.svg'

import { chartFormatter } from 'services/chart'

import { Header, MainContainer, MonthSwitcher, PieLabel } from './styles'

export function SummaryPage() {
  const SummaryPieConfig: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: chartFormatter,
        color: '#fff',
        font: {
          weight: 'bold',
          size: 16,
          family: 'Poppins',
        },
      },
    },
  }

  const summaryCategories = [
    {
      category: 'Casa',
      amount: 200,
      color: '#FFC107',
    },
    {
      category: 'Carro',
      amount: 1000,
      color: '#FFA107',
    },
  ]

  return (
    <>
      <Header>
        <h3>Resumo por categoria</h3>
      </Header>

      <MainContainer>
        <MonthSwitcher>
          <button>
            <ArrowImg />
          </button>
          <h2>Maio, 2020</h2>

          <button>
            <ArrowImg
              style={{
                transform: 'rotate(180deg)',
              }}
            />
          </button>
        </MonthSwitcher>
        <section className="pie-summary">
          <Pie
            plugins={[ChartDatalabelsPlugin] as any}
            options={SummaryPieConfig}
            data={{
              labels: summaryCategories.map(({ category }) => category),
              datasets: [
                {
                  data: summaryCategories.map(({ amount }) => amount),
                  backgroundColor: summaryCategories.map(({ color }) => color),
                  borderWidth: 0,
                  barPercentage: 0.5,
                },
              ],
            }}
          />
        </section>
        <section className="pie-labels-list">
          {summaryCategories.map((summaryCategory) => (
            <PieLabel
              key={summaryCategory.category}
              color={summaryCategory.color}
            >
              <span>{summaryCategory.category}</span>
              <strong>R${summaryCategory.amount}</strong>
            </PieLabel>
          ))}
        </section>
      </MainContainer>
      <NavigationBar selectedRoute={'summary'} />
    </>
  )
}

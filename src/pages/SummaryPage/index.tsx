import { useMemo, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js'
import ChartDatalabelsPlugin from 'chartjs-plugin-datalabels'

import { NavigationBar } from 'components/NavigationBar'
import { useTransactions } from 'hooks/useTransactions'

import { ReactComponent as ArrowImg } from 'assets/arrow-left.svg'

import { chartFormatter } from 'services/chart'
import { getFirstDateOfMonth } from 'utils/get-first-date-of-month'

import { Header, MainContainer, MonthSwitcher, PieLabel } from './styles'

interface Summary {
  category: string,
  amount: number,
  color: string,
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

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

export function SummaryPage() {
  const { transactions } = useTransactions()
  const [targetDate, setTargetDate] = useState(getFirstDateOfMonth)

  const summary = useMemo(() => {
    const summaryObject = transactions.reduce((acc, transaction) => {
      const transactionAmount = transaction.amount * (transaction.type === 'deposit' ? 1 : -1)
      const color = 'hsla(' + (Math.random() * 360) + ', 50%, 50%, 1)'

      const transactionCreationDate = getFirstDateOfMonth(new Date(transaction.createdAt))

      if (transactionCreationDate !== targetDate) {
        return acc
      }

      if (!acc[transaction.category]) {
        acc[transaction.category] = {
          category: transaction.category,
          amount: transactionAmount,
          color,
        }
      } else {
        acc[transaction.category].amount += transactionAmount
      }

      return acc
    }, {} as Record<string, Summary>)

    return Object.values(summaryObject)
  }, [transactions, targetDate])

  const currentPeriod = useMemo(() => {
    const date = new Date(targetDate)

    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()

    return `${months[currentMonth]}, ${currentYear}`
  }, [targetDate])

  function changeTargetDate(direction: 'previous' | 'next') {
    const date = new Date(targetDate)

    if (direction === 'previous') {
      date.setMonth(date.getMonth() - 1)
    } else {
      date.setMonth(date.getMonth() + 1)
    }

    setTargetDate(getFirstDateOfMonth(date))
  }

  return (
    <>
      <Header>
        <h3>Resumo por categoria</h3>
      </Header>

      <MainContainer>
        <MonthSwitcher>
          <button onClick={() => changeTargetDate('previous')}>
            <ArrowImg />
          </button>
          <h2>{currentPeriod}</h2>

          <button onClick={() => changeTargetDate('next')}>
            <ArrowImg
              style={{
                transform: 'rotate(180deg)',
              }}
            />
          </button>
        </MonthSwitcher>
        {summary.length === 0 ? (
          <h2 className='emptyTransactions'>Não há transações neste mês</h2>
        ) : (
          <>
            <section className="pie-summary">
              <Pie
                plugins={[ChartDatalabelsPlugin] as any}
                options={SummaryPieConfig}
                data={{
                  labels: summary.map(({ category }) => category),
                  datasets: [
                    {
                      data: summary.map(({ amount }) => amount),
                      backgroundColor: summary.map(({ color }) => color),
                      borderWidth: 0,
                    },
                  ],
                }}
              />
            </section>
            <section className="pie-labels-list">
              {summary.map((summaryCategory) => (
                <PieLabel
                  key={summaryCategory.category}
                  color={summaryCategory.color}
                >
                  <span>{summaryCategory.category}</span>
                  <strong>R${summaryCategory.amount}</strong>
                </PieLabel>
              ))}
            </section>
          </>
        )}
        
      </MainContainer>
      <NavigationBar selectedRoute={'summary'} />
    </>
  )
}

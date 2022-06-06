import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js'
import ChartDatalabelsPlugin from 'chartjs-plugin-datalabels'
import 'dayjs/locale/pt-br'

import { NavigationBar } from 'components/NavigationBar'
import { useTransactions } from 'hooks/useTransactions'

import { chartFormatter } from 'services/chart'

import { Header, MainContainer, MonthSwitcher, PieLabel } from './styles'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface Summary {
  category: string
  amount: number
  color: string
}

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
  const [targetDate, setTargetDate] = useState(() => {
    return dayjs().startOf('month')
  })

  const summary = useMemo(() => {
    const summaryObject = transactions.reduce((acc, transaction) => {
      const transactionAmount =
        transaction.amount * (transaction.type === 'deposit' ? 1 : -1)
      const color = `hsla(${Math.random() * 360}, 50%, 50%, 1)`

      const transactionCreationDate = dayjs(
        transaction.transactionDate || transaction.createdAt
      ).startOf('month')

      if (!dayjs(transactionCreationDate).isSame(targetDate)) {
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
    const date = dayjs(targetDate)

    return date.locale('pt-BR').format('MMMM, YYYY')
  }, [targetDate])

  function changeTargetDate(direction: 'previous' | 'next') {
    let date = dayjs(targetDate)

    if (direction === 'previous') {
      date = date.subtract(1, 'month')
    } else {
      date = date.add(1, 'month')
    }

    setTargetDate(dayjs(date).startOf('month'))
  }

  return (
    <>
      <Header>
        <h3>Resumo por categoria</h3>
      </Header>

      <MainContainer>
        <MonthSwitcher>
          <button onClick={() => changeTargetDate('previous')}>
            <FiArrowLeft size={18} />
          </button>
          <h2>{currentPeriod}</h2>

          <button onClick={() => changeTargetDate('next')}>
            <FiArrowRight size={18} />
          </button>
        </MonthSwitcher>
        {summary.length === 0 ? (
          <h2 className="emptyTransactions">Não há transações neste mês</h2>
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

import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import 'dayjs/locale/pt-br'

import { NavigationBar } from 'domain/navigation-bar'
import { SummaryChart } from 'domain/summary-chart'
import { useTransactions } from 'contexts/transactions'
import { Summary } from 'interfaces/summary'

import { Header, MainContainer, MonthSwitcher, PieLabel } from './styles'

export function SummaryPage() {
  const { transactions } = useTransactions()
  const [targetDate, setTargetDate] = useState(() => {
    return dayjs().startOf('month')
  })

  const summaries = useMemo(() => {
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
        {summaries.length === 0 ? (
          <h2 className="emptyTransactions">Não há transações neste mês</h2>
        ) : (
          <>
            <section className="pie-summary">
              <SummaryChart summaries={summaries} />
            </section>
            <section className="pie-labels-list">
              {summaries.map((summaryCategory) => (
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

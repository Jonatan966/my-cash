import { useEffect, useRef } from 'react'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions'

import { Container } from './styles'

export function Summary() {
  const { transactions } = useTransactions()
  const summaryCardsContainerRef = useRef<HTMLDivElement>(null)

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.depoists += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.withdraws += transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    {
      depoists: 0,
      withdraws: 0,
      total: 0,
    }
  )

  useEffect(() => {
    const summaryCardsContainer =
      summaryCardsContainerRef.current as HTMLDivElement
    let touchDirection = 0
    let lastTouchX = 0
    let isTouching = false

    function handleSwipeToCard() {
      const summaryCardsContainerStyles = window.getComputedStyle(
        summaryCardsContainer
      )
      const gridGap = Number(
        summaryCardsContainerStyles.getPropertyValue('gap').replace('px', '')
      )

      const cardWidth = summaryCardsContainer.children[0].clientWidth
      const summaryCardsContainerWidth =
        summaryCardsContainer.clientWidth -
        Number(summaryCardsContainerStyles.paddingLeft.replace('px', '')) -
        Number(summaryCardsContainerStyles.paddingRight.replace('px', ''))

      const borderWidth = (summaryCardsContainerWidth - cardWidth) / 2

      const lastSummaryScrollX = summaryCardsContainer.scrollLeft

      summaryCardsContainer.scrollTo({
        left:
          lastSummaryScrollX +
          (cardWidth - borderWidth + gridGap) * touchDirection,
        behavior: 'smooth',
      })
    }

    function handleTouchStart(event: TouchEvent) {
      lastTouchX = event.touches[0].clientX
    }

    function handleTouchMove(event: TouchEvent) {
      if (isTouching) return

      isTouching = true

      touchDirection = event.touches[0].clientX < lastTouchX ? 1 : -1

      handleSwipeToCard()
    }

    function handleTouchEnd() {
      isTouching = false
    }

    summaryCardsContainer.addEventListener('touchstart', handleTouchStart)
    summaryCardsContainer.addEventListener('touchmove', handleTouchMove)
    summaryCardsContainer.addEventListener('touchend', handleTouchEnd)

    return () => {
      summaryCardsContainer.removeEventListener('touchstart', handleTouchStart)
      summaryCardsContainer.removeEventListener('touchmove', handleTouchMove)
      summaryCardsContainer.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <Container ref={summaryCardsContainerRef}>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.depoists)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          -{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withdraws)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}

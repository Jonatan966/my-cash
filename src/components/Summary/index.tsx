import { SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

import { useTransactions } from 'hooks/useTransactions'

import incomeImg from 'assets/income.svg'
import outcomeImg from 'assets/outcome.svg'
import totalImg from 'assets/total.svg'

import { Container } from './styles'

export function Summary() {
  const { transactions } = useTransactions()

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

  return (
    <Container
      slidesPerView={1.25}
      spaceBetween={16}
      centeredSlides
      breakpoints={{
        820: {
          slidesPerView: 3,
          centeredSlides: false,
        }
      }}
    >
      <SwiperSlide>
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
      </SwiperSlide>

      <SwiperSlide>
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
      </SwiperSlide>

      <SwiperSlide className="highlight-background">
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
      </SwiperSlide>
    </Container>
  )
}

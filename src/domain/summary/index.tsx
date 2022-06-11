import { useMemo } from 'react'
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiDollarSign,
} from 'react-icons/fi'
import { useTheme } from 'styled-components'
import { SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

import { useTransactions } from 'contexts/transactions'

import { Container } from './styles'

export function Summary() {
  const { transactions } = useTransactions()
  const { colors } = useTheme()

  const summary = useMemo(() => {
    return transactions.reduce(
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
  }, [transactions])

  return (
    <Container
      slidesPerView={1.25}
      spaceBetween={16}
      centeredSlides
      breakpoints={{
        820: {
          slidesPerView: 3,
          centeredSlides: false,
        },
      }}
    >
      <SwiperSlide>
        <header>
          <p>Entradas</p>
          <FiArrowUpCircle size={32} color={colors.green} />
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
          <FiArrowDownCircle size={32} color={colors.red} />
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
          <FiDollarSign size={32} />
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

import { Header } from 'components/Header'
import { NavigationBar } from 'components/NavigationBar'
import { Summary } from 'components/Summary'
import { TransactionsTable } from 'components/TransactionsTable'

import { Container } from './styles'

export function ListingPage() {
  return (
    <>
      <Header />
      <Container>
        <Summary />
        <TransactionsTable />
      </Container>
      <NavigationBar />
    </>
  )
}

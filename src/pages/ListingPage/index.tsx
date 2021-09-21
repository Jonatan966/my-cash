import { NavigationBar } from 'components/NavigationBar'
import { Summary } from 'components/Summary'
import { TransactionsTable } from 'components/TransactionsTable'
import { ThemeSwitcher } from 'components/ThemeSwitcher'

import logoImg from 'assets/logo.svg'

import { Container, HeaderContainer, HeaderContent } from './styles'

export function ListingPage() {
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="dt.money" />

          <ThemeSwitcher />
        </HeaderContent>
      </HeaderContainer>
      <Container>
        <Summary />
        <TransactionsTable />
      </Container>
      <NavigationBar selectedRoute={'listing'} />
    </>
  )
}

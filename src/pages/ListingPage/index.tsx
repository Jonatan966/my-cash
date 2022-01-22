import { NavigationBar } from 'components/NavigationBar'
import { Summary } from 'components/Summary'
import { TransactionsTable } from 'components/TransactionsTable'
import { ThemeSwitcher } from 'components/ThemeSwitcher'
import { UserProfile } from 'components/UserProfile'
import { BackdropLoader } from 'components/BackdropLoader'
import { Button } from 'components/Button'
import { useAuth } from 'contexts/authContext'

import { Container, HeaderContainer, HeaderContent } from './styles'

export function ListingPage() {
  const { signOut, isLoadingUserInformation } = useAuth()

  if (isLoadingUserInformation) {
    return <BackdropLoader fullScreen />
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <UserProfile />
          <ThemeSwitcher />
          <Button
            onClick={signOut}
            height='2.5rem'
            minWidth='12rem'
            textColor='#fff'
            backgroundColor='red'
          >
            Desconectar-se
          </Button>
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

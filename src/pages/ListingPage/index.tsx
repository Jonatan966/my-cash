import { NavigationBar } from 'domain/NavigationBar'
import { Summary } from 'domain/Summary'
import { TransactionsTable } from 'domain/TransactionsTable'
import { UserProfile } from 'domain/UserProfile'
import { BackdropLoader } from 'components/BackdropLoader'
import { useAuth } from 'contexts/auth'

import { Container, HeaderContainer, HeaderContent } from './styles'
import { OptionsModal } from 'domain/OptionsModal'

export function ListingPage() {
  const { isLoadingUserInformation } = useAuth()

  if (isLoadingUserInformation) {
    return <BackdropLoader fullScreen />
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <UserProfile />
          <OptionsModal />
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

import { NavigationBar } from 'components/NavigationBar'
import { Summary } from 'components/Summary'
import { TransactionsTable } from 'components/TransactionsTable'
import { UserProfile } from 'components/UserProfile'
import { BackdropLoader } from 'components/BackdropLoader'
import { useAuth } from 'contexts/authContext'

import { Container, HeaderContainer, HeaderContent } from './styles'
import { OptionsModal } from 'components/OptionsModal'

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

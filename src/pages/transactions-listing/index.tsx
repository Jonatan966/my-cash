import { NavigationBar } from 'domain/navigation-bar'
import { Summary } from 'domain/summary'
import { TransactionsTable } from 'domain/transactions-table'
import { UserProfile } from 'domain/user-profile'
import { OptionsModal } from 'domain/options-modal'
import { BackdropLoader } from 'components/backdrop-loader'
import { useAuth } from 'contexts/auth'

import { ReactComponent as AppLogo } from '../../assets/logo.svg'

import { Container, HeaderContainer, HeaderContent } from './styles'

export function TransactionsListingPage() {
  const { isLoadingUserInformation } = useAuth()

  if (isLoadingUserInformation) {
    return <BackdropLoader fullScreen />
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <UserProfile />
          <AppLogo className="app-logo" />
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

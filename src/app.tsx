import Modal from 'react-modal'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { TransactionsListingPage } from 'pages/transactions-listing'
import { SummaryPage } from 'pages/summary'
import { LoginPage } from 'pages/login'
import { Toast } from 'components/toast'
import { AuthProvider } from 'contexts/auth'

import { ThemeSwitcherProvider } from './contexts/theme-switcher'
import { TransactionsProvider } from './contexts/transactions'

import { GlobalStyle } from './styles/global'

Modal.setAppElement('#root')

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeSwitcherProvider>
          <Toast />
          <TransactionsProvider>
            <Switch>
              <Route exact path="/" component={TransactionsListingPage} />
              <Route path="/summary" component={SummaryPage} />
              <Route path="/auth" component={LoginPage} />
            </Switch>
            <GlobalStyle />
          </TransactionsProvider>
        </ThemeSwitcherProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

import Modal from 'react-modal'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ListingPage } from 'pages/ListingPage'
import { SummaryPage } from 'pages/SummaryPage'
import { LoginPage } from 'pages/LoginPage'
import { Toast } from 'components/Toast'
import { AuthProvider } from 'contexts/auth'

import { ThemeSwitcherProvider } from './contexts/themeSwitcher'
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
              <Route exact path="/" component={ListingPage} />
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

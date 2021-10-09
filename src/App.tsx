import Modal from 'react-modal'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ListingPage } from 'pages/ListingPage'
import { SummaryPage } from 'pages/SummaryPage'
import { LoginPage } from 'pages/LoginPage'

import { ThemeSwitcherProvider } from './hooks/useThemeSwitcher'
import { TransactionsProvider } from './hooks/useTransactions'

import { GlobalStyle } from './styles/global'

Modal.setAppElement('#root')

export function App() {
  return (
    <BrowserRouter>
      <ThemeSwitcherProvider>
        <TransactionsProvider>
          <Switch>
            <Route exact path="/" component={ListingPage} />
            <Route path="/summary" component={SummaryPage} />
            <Route path="/auth" component={LoginPage} />
          </Switch>
          <GlobalStyle />
        </TransactionsProvider>
      </ThemeSwitcherProvider>
    </BrowserRouter>
  )
}

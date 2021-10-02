import Modal from 'react-modal'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ListingPage } from 'pages/ListingPage'
import { SummaryPage } from 'pages/SummaryPage'

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
          </Switch>
          <GlobalStyle />
        </TransactionsProvider>
      </ThemeSwitcherProvider>
    </BrowserRouter>
  )
}

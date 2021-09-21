import { ListingPage } from 'pages/ListingPage'
import Modal from 'react-modal'
import { BrowserRouter, Route } from 'react-router-dom'

import { ThemeSwitcherProvider } from './hooks/useThemeSwitcher'
import { TransactionsProvider } from './hooks/useTransactions'

import { GlobalStyle } from './styles/global'

Modal.setAppElement('#root')

export function App() {
  return (
    <BrowserRouter>
      <ThemeSwitcherProvider>
        <TransactionsProvider>
          <Route exact path="/" component={ListingPage} />
          <GlobalStyle />
        </TransactionsProvider>
      </ThemeSwitcherProvider>
    </BrowserRouter>
  )
}

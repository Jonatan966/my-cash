import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Switch from 'react-switch'
import { lighten } from 'polished'

import moonImg from '../../assets/moon.svg'
import sunImg from '../../assets/sun.svg'
import logoImg from '../../assets/logo.svg'

import { NavigationBar } from 'components/NavigationBar'
import { Summary } from 'components/Summary'
import { TransactionsTable } from 'components/TransactionsTable'

import { useThemeSwitcher } from 'hooks/useThemeSwitcher'

import { Container, HeaderContainer, HeaderContent } from './styles'

export function ListingPage() {
  const { title } = useContext(ThemeContext)
  const { toggleTheme } = useThemeSwitcher()

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="dt.money" />

          <Switch
            checked={title === 'light'}
            uncheckedIcon={false}
            checkedIcon={false}
            checkedHandleIcon={<img src={sunImg} alt="Light mode" />}
            uncheckedHandleIcon={<img src={moonImg} alt="Dark mode" />}
            onColor="#f4a261"
            offColor="#363f5f"
            onHandleColor={lighten(0.25, '#f4a261')}
            offHandleColor={lighten(0.25, '#363f5f')}
            handleDiameter={30}
            height={20}
            onChange={toggleTheme}
            className="switcher"
          />
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

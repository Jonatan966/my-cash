import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Switch from 'react-switch'
import { lighten } from 'polished'

import { useThemeSwitcher } from '../../hooks/useThemeSwitcher'
import { useTransactions } from '../../hooks/useTransactions'

import moonImg from '../../assets/moon.svg'
import sunImg from '../../assets/sun.svg'
import logoImg from '../../assets/logo.svg'

import { Container, Content } from './styles'

export function Header() {
  const { title } = useContext(ThemeContext)
  const { handleOpenNewTransactionModal } = useTransactions()
  const { toggleTheme } = useThemeSwitcher()

  return (
    <Container>
      <Content>
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

        <button type="button" onClick={handleOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}

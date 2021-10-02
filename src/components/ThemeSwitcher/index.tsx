import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Switch from 'react-switch'
import { lighten } from 'polished'

import moonImg from 'assets/moon.svg'
import sunImg from 'assets/sun.svg'

import { useThemeSwitcher } from 'hooks/useThemeSwitcher'

export function ThemeSwitcher() {
  const { title } = useContext(ThemeContext)
  const { toggleTheme } = useThemeSwitcher()

  return (
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
  )
}

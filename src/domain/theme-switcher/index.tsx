import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { FiMoon, FiSun } from 'react-icons/fi'

import { Button } from 'components/button'
import { useThemeSwitcher } from 'contexts/theme-switcher'

const translatedThemes = {
  dark: 'Escuro',
  light: 'Claro',
}

const themeIcon = {
  dark: FiMoon,
  light: FiSun,
}

export function ThemeSwitcher() {
  const { title } = useContext(ThemeContext)
  const { toggleTheme } = useThemeSwitcher()

  const targetTheme = title === 'dark' ? 'light' : 'dark'

  return (
    <Button backgroundColor="background" onClick={toggleTheme} withIcon>
      {themeIcon[targetTheme]({ size: 24 })}
      <span>Mudar para tema {translatedThemes[targetTheme]}</span>
    </Button>
  )
}

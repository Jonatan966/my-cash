import { createContext, ReactNode, useContext } from "react";
import { ThemeContext, ThemeProvider } from "styled-components";

import light from "../styles/themes/light";
import dark from "../styles/themes/dark";
import { usePersistedState } from "./usePersistedState";


interface ThemeSwitcherProps {
  toggleTheme: () => void;
}

interface ThemeSwitcherProviderProps {
  children: ReactNode;
}

const themes = {
  light,
  dark
}

const ThemeSwitcherContext = createContext<ThemeSwitcherProps>({} as ThemeSwitcherProps)

export function ThemeSwitcherProvider({children}: ThemeSwitcherProviderProps) {
  const [theme, setTheme] = usePersistedState('@DtMoney:theme', 'light');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeSwitcherContext.Provider value={{toggleTheme}}>
      <ThemeProvider theme={themes[theme as 'light' | 'dark']}>
        {children}
      </ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}

export function useThemeSwitcher() {
  const {colors, title} = useContext(ThemeContext);
  const {toggleTheme} = useContext(ThemeSwitcherContext);

  return {
    colors,
    title,
    toggleTheme
  }
}

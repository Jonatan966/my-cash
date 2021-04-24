import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeContext, ThemeProvider } from "styled-components";

import light from "../styles/themes/light";
import dark from "../styles/themes/dark";
import { usePersistedState } from "./usePersistedState";


interface ThemeSwitcherProps {
  toggleTheme: () => void;
  setScrollbarVisibility: (visible: boolean) => void;
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
  const [isScrollbarVisible, setIsOverflowYVisible] = useState(true);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  function setScrollbarVisibility(visible: boolean) {
    setIsOverflowYVisible(visible);
  }

  return (
    <ThemeSwitcherContext.Provider value={{toggleTheme, setScrollbarVisibility}}>
      <ThemeProvider theme={{
        ...themes[theme as 'light' | 'dark'],
        isScrollbarVisible
      }}>
        {children}
      </ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}

export function useThemeSwitcher() {
  const {colors, title} = useContext(ThemeContext);
  const {toggleTheme, setScrollbarVisibility} = useContext(ThemeSwitcherContext);

  return {
    colors,
    title,
    toggleTheme,
    setScrollbarVisibility
  }
}

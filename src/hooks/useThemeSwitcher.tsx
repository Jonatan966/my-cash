import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeContext, ThemeProvider } from "styled-components";

import light from "../styles/themes/light";
import dark from "../styles/themes/dark";


interface ThemeSwitcherProps {
  toggleTheme: () => void;
}

interface ThemeSwitcherProviderProps {
  children: ReactNode;
}

const ThemeSwitcherContext = createContext<ThemeSwitcherProps>({} as ThemeSwitcherProps)

export function ThemeSwitcherProvider({children}: ThemeSwitcherProviderProps) {
  const [theme, setTheme] = useState(light);

  function toggleTheme() {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (
    <ThemeSwitcherContext.Provider value={{toggleTheme}}>
      <ThemeProvider theme={theme}>
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

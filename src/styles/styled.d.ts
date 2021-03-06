import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: 'dark' | 'light'

    colors: {
      background: string
      red: string
      primary: string
      green: string

      edit: string
      remove: string

      primaryLight: string

      textTitle: string
      textBody: string
      text: string

      shape: string

      inputBorder: string
      inputBg: string
    }

    isScrollbarVisible: boolean
  }
}

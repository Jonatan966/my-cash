import { LiteralUnion } from 'prettier'
import { DefaultTheme } from 'styled-components'

export type ThemeColors = keyof DefaultTheme["colors"]

export interface ButtonProps {
  height?: string,
  fontSize?: string,
  minWidth?: string,
  hoverMagnitude?: number,
  backgroundColor?: LiteralUnion<ThemeColors, string>,
  textColor?: LiteralUnion<ThemeColors, string>,
  isLoading?: boolean,
}

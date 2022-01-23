import { ButtonHTMLAttributes, FC } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import { useTheme } from 'styled-components'

import { Container } from './styles'
import { ButtonProps, ThemeColors } from './types'

type ExtendedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps

export const Button: FC<ExtendedButtonProps> = ({
  children,
  isLoading,
  disabled,
  ...props
}) => {
  const { colors } = useTheme()

  return (
    <Container 
      {...props}
      disabled={isLoading || disabled}
      fontSize={isLoading ? '0' : props.fontSize}
    >
      {isLoading ? (
        <BeatLoader 
          color={colors[props.textColor as ThemeColors] || props.textColor as string}
        />
      ) : children}
    </Container>
  )
}

Button.defaultProps = {
  textColor: 'textTitle',
  backgroundColor: 'green',
  fontSize: '1.05rem',
  height: 'initial',
  minWidth: 'initial',
  hoverMagnitude: 0.85,
}

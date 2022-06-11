import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'

import { Container } from './styles'
import { SelectableButtonProps } from './types'

type ExtendedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SelectableButtonProps

const SelectableButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ExtendedButtonProps
> = ({ children, ...props }, ref) => {
  return (
    <Container ref={ref} type="button" {...props}>
      {children}
    </Container>
  )
}

export const SelectableButton = forwardRef(SelectableButtonComponent)

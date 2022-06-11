import { ComponentProps, forwardRef, ForwardRefRenderFunction } from 'react'
import { FiX } from 'react-icons/fi'

import { Container } from './styles'

const FlutuantCloseButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ComponentProps<'button'>
> = (props, ref) => {
  return (
    <Container {...props} ref={ref} type="button">
      <FiX size={24} />
    </Container>
  )
}

export const FlutuantCloseButton = forwardRef(FlutuantCloseButtonComponent)

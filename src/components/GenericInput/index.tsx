import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react'
import { Input, Container } from './styles'

const GenericInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
> = (props, ref) => {
  return (
    <Container>
      <span>{props.title}</span>
      <Input {...props} ref={ref} />
    </Container>
  )
}

export const GenericInput = forwardRef(GenericInputComponent)

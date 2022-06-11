import { ComponentPropsWithRef } from 'react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { IMaskMixin } from 'react-imask'
import { Input, Container } from './styles'

const GenericInputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  ComponentPropsWithRef<'input'>
> = (props, ref) => {
  return (
    <Container>
      <span>{props.title}</span>
      <Input ref={ref} {...props} />
    </Container>
  )
}

export const GenericInput = forwardRef(GenericInputComponent)
export const MaskInput = IMaskMixin(({ inputRef, ...props }) => (
  <GenericInput {...props} ref={inputRef} />
))

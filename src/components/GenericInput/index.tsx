import { InputHTMLAttributes } from "react";
import { Input, Container } from "./styles";

export function GenericInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Container>
      <span>{props.title}</span>
      <Input {...props} />
    </Container>
  )
}

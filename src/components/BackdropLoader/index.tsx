import ClipLoader from 'react-spinners/ClipLoader'
import { useTheme } from 'styled-components'

import { Container } from './styles'

interface BackdropLoaderProps {
  fullScreen?: boolean,
}

export function BackdropLoader({ fullScreen }: BackdropLoaderProps) {
  const { colors } = useTheme()

  return (
    <Container fullScreen={fullScreen}>
      <ClipLoader color={colors.green} size={128} />
      <h2>Obtendo dados. . .</h2>
    </Container>
  )
}

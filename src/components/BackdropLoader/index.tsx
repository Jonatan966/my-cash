import ClipLoader from 'react-spinners/ClipLoader'
import { DefaultTheme, useTheme } from 'styled-components'

import { Container } from './styles'

interface BackdropLoaderProps {
  fullScreen?: boolean,
  title?: string,
  color?: keyof DefaultTheme['colors'],
}

export function BackdropLoader({
  fullScreen,
  title = 'Obtendo dados. . .', 
  color = 'green',
}: BackdropLoaderProps) {
  const { colors } = useTheme()

  return (
    <Container fullScreen={fullScreen}>
      <ClipLoader color={colors[color]} size={128} />
      <h2>{title}</h2>
    </Container>
  )
}

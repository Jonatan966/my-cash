import { ReactComponent as LogoImg } from 'assets/logo.svg'
import { ReactComponent as GoogleImg } from 'assets/google-logo.svg'
import { ReactComponent as FacebookImg } from 'assets/facebook-logo.svg'

import { useAuth } from 'contexts/authContext'

import { ActionsContainer, Header } from './styles'

export function LoginPage() {
  const { signIn } = useAuth()

  return (
    <>
      <Header>
        <LogoImg />
        <h1>Controle seus gastos de forma muito simples</h1>
        <span>
          Escolha uma das opções abaixo para começar a usar o nosso app
        </span>
      </Header>

      <ActionsContainer>
        <div>
          <button onClick={() => signIn('google')}>
            <GoogleImg />
            <hr />
            <span>Entrar com Google</span>
          </button>

          <button onClick={() => signIn('facebook')}>
            <FacebookImg />
            <hr />
            <span>Entrar com Facebook</span>
          </button>

          <span className='separator' data-content='Ou' />
          
          <button onClick={() => signIn('anonymous')} className='without-login-btn'>
            <span>Entrar sem fazer login</span>
          </button>
        </div>
      </ActionsContainer>
    </>
  )
}

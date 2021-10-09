import { ReactComponent as LogoImg } from 'assets/logo.svg'
import { ReactComponent as GoogleImg } from 'assets/google-logo.svg'
import { ReactComponent as FacebookImg } from 'assets/facebook-logo.svg'

import { ActionsContainer, Header } from './styles'

export function LoginPage() {
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
          <button>
            <GoogleImg />
            <hr />
            <span>Entrar com Google</span>
          </button>

          <button>
            <FacebookImg />
            <hr />
            <span>Entrar com Facebook</span>
          </button>

          <span className='separator' data-content='Ou' />
          
          <button className='without-login-btn'>
            <span>Entrar sem fazer login</span>
          </button>
        </div>
      </ActionsContainer>
    </>
  )
}

import { useState } from 'react'
import { FiLogOut, FiMessageCircle, FiSettings } from 'react-icons/fi'

import { Button } from 'components/button'
import { ThemeSwitcher } from 'domain/theme-switcher'

import { useAuth } from 'contexts/auth'

import styles from './styles.module.css'
import { AppModal } from 'components/app-modal'

export function OptionsModal() {
  const { signOut } = useAuth()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        minWidth="3.5rem"
        height="3.5rem"
        backgroundColor="primaryLight"
        textColor="textTitle"
        title="Opções"
        onClick={() => setIsOpen(true)}
      >
        <FiSettings size={28} />
      </Button>
      <AppModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={styles.modalContent}
        closeTimeoutMS={250}
        style={{
          overlay: {
            alignItems: 'flex-end',
          },
        }}
      >
        <Button
          backgroundColor="background"
          onClick={signOut}
          withIcon
          textColor="red"
        >
          <FiLogOut size={24} /> <span>Desconectar-se</span>
        </Button>
        <a href={process.env.REACT_APP_CONTACT_FORM_URL}>
          <Button backgroundColor="background" withIcon>
            <FiMessageCircle size={24} />
            <span>Relatar uma sugestão ou bug</span>
          </Button>
        </a>
        <ThemeSwitcher />
        <hr />
        <Button
          backgroundColor="background"
          textColor="red"
          height="3.5rem"
          onClick={() => setIsOpen(false)}
        >
          Fechar
        </Button>
      </AppModal>
    </>
  )
}

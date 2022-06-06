import { useState } from 'react'
import Modal from 'react-modal'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { useTheme } from 'styled-components'
import classNames from 'classnames'

import { Button } from 'components/Button'
import { ThemeSwitcher } from 'components/ThemeSwitcher'

import { useAuth } from 'contexts/authContext'

import styles from './styles.module.css'

export function OptionsModal() {
  const { colors } = useTheme()
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
      <Modal
        isOpen={isOpen}
        overlayClassName="react-modal-overlay"
        onRequestClose={() => setIsOpen(false)}
        className={classNames(styles.modalContent, {
          'react-modal-opening': isOpen,
          'react-modal-closing': !isOpen,
        })}
        closeTimeoutMS={250}
        style={{
          overlay: {
            alignItems: 'flex-end',
          },
          content: {
            background: colors.background,
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
      </Modal>
    </>
  )
}

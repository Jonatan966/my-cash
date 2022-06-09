import classNames from 'classnames'
import { FC, useEffect } from 'react'
import Modal, { Props } from 'react-modal'
import { Prompt, useHistory } from 'react-router-dom'
import { useTheme } from 'styled-components'

import styles from './styles.module.css'

type AppModalProps = Omit<Props, 'onRequestClose'> & {
  onRequestClose?: () => void
}

export const AppModal: FC<AppModalProps> = ({
  isOpen,
  className,
  children,
  ...props
}) => {
  const history = useHistory()
  const { colors } = useTheme()

  useEffect(() => {
    if (!isOpen) return

    history.push(history.location)
  }, [isOpen, history])

  const modalClassName = classNames(
    {
      [styles.modalOpening]: isOpen,
      [styles.modalClosing]: !isOpen,
    },
    className
  )

  function handleCloseModal(isPrompt?: boolean) {
    if (!isPrompt) {
      history.goBack()
    }

    props?.onRequestClose?.()
  }

  return (
    <Modal
      isOpen={isOpen}
      className={modalClassName}
      style={{
        content: {
          background: colors.background,
          ...props.style?.content,
        },
        overlay: props.style?.overlay,
      }}
      {...props}
      onRequestClose={() => handleCloseModal()}
    >
      <Prompt
        when={isOpen}
        message={() => {
          handleCloseModal(true)
          return false
        }}
      />
      {children}
    </Modal>
  )
}

AppModal.defaultProps = {
  closeTimeoutMS: 500,
  overlayClassName: styles.modalOverlay,
  className: styles.modalContent,
}

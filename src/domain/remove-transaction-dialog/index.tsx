import { toast } from 'react-toastify'
import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'
import classNames from 'classnames'

import { FlutuantCloseButton } from 'components/flutuant-close-button'
import { Button } from 'components/button'
import { useTransactions } from 'contexts/transactions'

import { Container } from './styles'

interface RemoveTransactionDialogProps {
  isOpen: boolean
}

export function RemoveTransactionDialog({
  isOpen,
}: RemoveTransactionDialogProps) {
  const {
    handleToggleRemoveTransactionDialog,
    removeTransaction,
    selectedTransaction,
  } = useTransactions()
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsRemoving(false)
    }
  }, [isOpen])

  async function handleRemoveTransaction(event: FormEvent) {
    event.preventDefault()

    setIsRemoving(true)
    const removalPromise = removeTransaction()

    try {
      await toast.promise(removalPromise, {
        pending: 'Removendo transação. . .',
        success: 'Transação removida com sucesso!',
        error: 'Não foi possível remover essa transação',
      })

      handleToggleRemoveTransactionDialog()
    } catch {
      setIsRemoving(false)
    }
  }

  const modalClassName = classNames('react-modal-content', {
    'react-modal-opening': isOpen,
    'react-modal-closing': !isOpen,
  })

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => handleToggleRemoveTransactionDialog()}
      shouldCloseOnEsc={!isRemoving}
      shouldCloseOnOverlayClick={!isRemoving}
      overlayClassName="react-modal-overlay"
      className={modalClassName}
      closeTimeoutMS={500}
    >
      <FlutuantCloseButton
        onClick={() => handleToggleRemoveTransactionDialog()}
        disabled={isRemoving}
        title="Fechar Diálogo"
        aria-label="Fechar Diálogo"
      />

      <Container onSubmit={handleRemoveTransaction}>
        <h2>Remover transação</h2>
        <p>
          Deseja mesmo remover a transação "
          <strong>{selectedTransaction?.title}</strong>"?
        </p>

        <div className="actions">
          <Button
            type="button"
            onClick={() => handleToggleRemoveTransactionDialog()}
            backgroundColor="green"
            height="4rem"
            textColor="#fff"
            disabled={isRemoving}
          >
            Não
          </Button>
          <Button
            type="submit"
            backgroundColor="red"
            height="4rem"
            textColor="#fff"
            isLoading={isRemoving}
          >
            Remover
          </Button>
        </div>
      </Container>
    </Modal>
  )
}

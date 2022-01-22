import { FormEvent } from 'react'
import Modal from 'react-modal'

import { useTransactions } from 'hooks/useTransactions'
import { Button } from 'components/Button'

import { Container } from './styles'

import closeImg from 'assets/close.svg'

export function RemoveTransactionModal() {
  const {
    isRemoveModalOpen,
    handleCloseRemoveTransactionModal,
    removeTransaction,
  } = useTransactions()

  async function handleRemoveTransaction(event: FormEvent) {
    event.preventDefault()
    await removeTransaction()
    handleCloseRemoveTransactionModal()
  }

  return (
    <Modal
      isOpen={isRemoveModalOpen}
      onRequestClose={handleCloseRemoveTransactionModal}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content ${
        !isRemoveModalOpen ? 'react-modal-closing' : 'react-modal-opening'
      }`}
      closeTimeoutMS={500}
    >
      <button
        type="button"
        onClick={handleCloseRemoveTransactionModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleRemoveTransaction}>
        <h2>Remover transação</h2>
        <p>Deseja mesmo remover essa transação?</p>

        <div className="actions">
          <Button
            type="button" 
            onClick={handleCloseRemoveTransactionModal}
            backgroundColor='green'
            height='4rem'
            textColor='#fff'
          >
            Cancelar
          </Button>
          <Button
            type="submit" 
            backgroundColor='trashBg'
            height='4rem'
            textColor='#fff'
          >
            Remover
          </Button>
        </div>
      </Container>
    </Modal>
  )
}

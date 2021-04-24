import { FormEvent } from 'react'
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'
import { useTransactions } from '../../hooks/useTransactions'
import { Container } from './styles'


export function RemoveTransactionModal() {
  const { 
    isRemoveModalOpen, 
    handleCloseRemoveTransactionModal, 
    removeTransaction 
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
      overlayClassName='react-modal-overlay'
      className={`react-modal-content ${!isRemoveModalOpen ? 'react-modal-closing' : 'react-modal-opening'}`}
      closeTimeoutMS={500}
    >
      <button
        type='button'
        onClick={handleCloseRemoveTransactionModal}
        className='react-modal-close'
      >
        <img src={closeImg} alt="Fechar modal"/>
      </button>

      <Container onSubmit={handleRemoveTransaction}>
        <h2>Remover transação</h2>
        <p>Deseja mesmo remover essa transação?</p>

        <div className="actions">
          <button type='button' onClick={handleCloseRemoveTransactionModal}>
            Cancelar
          </button>
          <button type="submit">
            Remover
          </button>
        </div>
      </Container>
    </Modal>
  )
}
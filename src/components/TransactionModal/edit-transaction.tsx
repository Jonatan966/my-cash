import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import closeImg from 'assets/close.svg'
import incomeImg from 'assets/income.svg'
import outcomeImg from 'assets/outcome.svg'

import { useTransactions } from 'hooks/useTransactions'
import { GenericInput } from 'components/GenericInput'
import { Button } from 'components/Button'

import { Container, RadioBox, TransactionTypeContainer } from './styles'

interface EditTransactionModalProps {
  isOpen: boolean
}

export function EditTransactionModal({ isOpen }: EditTransactionModalProps) {
  const {
    categories,
    selectedTransaction,
    editTransaction,
    handleToggleEditTransactionModal,
  } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [type, setType] = useState<'deposit' | 'withdraw'>(
    selectedTransaction?.type || 'deposit'
  )

  const hasFilledForm = title && amount && category

  useEffect(() => {
    if (!isOpen) return

    setIsSaving(false)

    if (selectedTransaction) {
      setTitle(selectedTransaction.title)
      setAmount(selectedTransaction.amount)
      setCategory(selectedTransaction.category)
      setType(selectedTransaction.type)
    }
  }, [isOpen, selectedTransaction])

  async function handleEditTransaction(event: FormEvent) {
    event.preventDefault()

    if (!selectedTransaction) return

    setIsSaving(true)

    const updatedTransaction = {
      ...selectedTransaction,
      title,
      amount,
      category,
      type,
    }

    const editionPromise = editTransaction(updatedTransaction)

    try {
      await toast.promise(editionPromise, {
        pending: 'Editando transação. . .',
        error: 'Não foi possível editar essa transação',
        success: 'Transação editada com sucesso!',
      })

      handleToggleEditTransactionModal()
    } catch {
      setIsSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => handleToggleEditTransactionModal()}
      overlayClassName="react-modal-overlay"
      shouldCloseOnEsc={!isSaving}
      shouldCloseOnOverlayClick={!isSaving}
      className={`react-modal-content ${
        !isOpen ? 'react-modal-closing' : 'react-modal-opening'
      }`}
      closeTimeoutMS={500}
    >
      <button
        type="button"
        onClick={() => handleToggleEditTransactionModal()}
        className="react-modal-close"
        disabled={isSaving}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleEditTransaction}>
        <h2>Editar transação</h2>

        <GenericInput
          title="Título"
          placeholder="Ex: Video game"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          autoFocus
        />
        <GenericInput
          type="number"
          title="Valor"
          min={0}
          step=".01"
          value={amount}
          onChange={(event) => setAmount(event.target.valueAsNumber)}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            onClick={() => setType('deposit')}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            onClick={() => setType('withdraw')}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <GenericInput
          title="Categoria"
          placeholder="Ex: Lazer"
          list="categories"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <datalist id="categories">
          {categories.map((category) => (
            <option value={category.title} key={category.id} />
          ))}
        </datalist>

        <Button
          type="submit"
          height="4rem"
          backgroundColor="green"
          textColor="#fff"
          isLoading={isSaving}
          disabled={!hasFilledForm && !isSaving}
        >
          Salvar Alterações
        </Button>
      </Container>
    </Modal>
  )
}

import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import closeImg from 'assets/close.svg'
import incomeImg from 'assets/income.svg'
import outcomeImg from 'assets/outcome.svg'

import { useTransactions } from 'hooks/useTransactions'
import { GenericInput } from 'components/GenericInput'
import { Button } from 'components/Button'

import { Container, RadioBox, TransactionTypeContainer } from './styles'
import { getFormattedDate } from 'utils/get-formatted-date'
import { useForm, Controller } from 'react-hook-form'
import { TransactionDTO } from './types'

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

  const { handleSubmit, register, control, setValue } =
    useForm<TransactionDTO>()

  const [isSaving, setIsSaving] = useState(false)

  const currentDate = getFormattedDate(new Date())

  useEffect(() => {
    if (!isOpen) return

    setIsSaving(false)

    if (selectedTransaction) {
      setValue('title', selectedTransaction.title)
      setValue('amount', selectedTransaction.amount)
      setValue('category', selectedTransaction.category)
      setValue('type', selectedTransaction.type)
      setValue(
        'transactionDate',
        selectedTransaction.transactionDate ||
          getFormattedDate(new Date(selectedTransaction.createdAt || 0))
      )
    }
  }, [isOpen, selectedTransaction, setValue])

  async function handleEditTransaction(transaction: TransactionDTO) {
    if (!selectedTransaction) return

    setIsSaving(true)

    const updatedTransaction = {
      ...selectedTransaction,
      ...transaction,
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
      <Container onSubmit={handleSubmit(handleEditTransaction)}>
        <h2>Editar transação</h2>

        <GenericInput
          title="Título"
          placeholder="Ex: Video game"
          {...register('title')}
          required
          autoFocus
        />
        <GenericInput
          title="Data"
          type="date"
          max={currentDate}
          {...register('transactionDate')}
          required
        />
        <GenericInput
          type="number"
          title="Valor"
          min={0}
          step=".01"
          {...register('amount')}
          required
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TransactionTypeContainer>
              <RadioBox
                type="button"
                isActive={field?.value === 'deposit'}
                onClick={() => field.onChange('deposit')}
                activeColor="green"
                value="deposit"
              >
                <img src={incomeImg} alt="Entrada" />
                <span>Entrada</span>
              </RadioBox>
              <RadioBox
                type="button"
                isActive={field?.value === 'withdraw'}
                onClick={() => field.onChange('withdraw')}
                activeColor="red"
              >
                <img src={outcomeImg} alt="Saída" />
                <span>Saída</span>
              </RadioBox>
            </TransactionTypeContainer>
          )}
        />

        <GenericInput
          title="Categoria"
          placeholder="Ex: Lazer"
          list="categories"
          maxLength={20}
          {...register('category')}
          required
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
        >
          Salvar Alterações
        </Button>
      </Container>
    </Modal>
  )
}

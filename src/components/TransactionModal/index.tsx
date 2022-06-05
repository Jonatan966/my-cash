import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'
import { FiArrowDownCircle, FiArrowUpCircle, FiX } from 'react-icons/fi'

import { useTransactions } from 'hooks/useTransactions'
import { GenericInput, MaskInput } from 'components/Input'
import { Button } from 'components/Button'

import { Container, RadioBox, TransactionTypeContainer } from './styles'
import { getFormattedDate } from 'utils/get-formatted-date'
import { TransactionDTO } from './types'

interface TransactionModalProps {
  isOpen: boolean
}

export function TransactionModal({ isOpen }: TransactionModalProps) {
  const currentDate = getFormattedDate(new Date())

  const {
    createTransaction,
    editTransaction,
    categories,
    handleToggleNewTransactionModal,
    handleToggleEditTransactionModal,
    selectedTransaction,
  } = useTransactions()
  const { handleSubmit, register, reset, control, setValue } =
    useForm<TransactionDTO>({
      defaultValues: {
        amount: 1,
        transactionDate: currentDate,
        type: 'deposit',
      },
    })

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return

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
    } else {
      reset()
    }

    setIsSaving(false)
  }, [isOpen, reset, setValue, selectedTransaction])

  async function handleCreateNewTransaction(newTransaction: TransactionDTO) {
    setIsSaving(true)

    const creationPromise = createTransaction(newTransaction)

    try {
      await toast.promise(creationPromise, {
        pending: 'Adicionando transação. . .',
        error: 'Não foi possível adicionar essa transação',
        success: 'Transação adicionada com sucesso!',
      })

      handleToggleNewTransactionModal(false)
    } catch {
      setIsSaving(false)
    }
  }

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

  const modalFlows = {
    create: {
      title: 'Cadastrar Transação',
      submitFunction: handleCreateNewTransaction,
      submitText: 'Cadastrar',
    },
    edit: {
      title: 'Editar transação',
      submitFunction: handleEditTransaction,
      submitText: 'Salvar Alterações',
    },
  }

  const currentModalFlow = modalFlows[selectedTransaction ? 'edit' : 'create']

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => handleToggleNewTransactionModal(false)}
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
        onClick={() => handleToggleNewTransactionModal(false)}
        className="react-modal-close"
        disabled={isSaving}
        title="Fechar Modal"
        aria-label="Fechar Modal"
      >
        <FiX size={24} />
      </button>
      <Container onSubmit={handleSubmit(currentModalFlow.submitFunction)}>
        <h2>{currentModalFlow.title}</h2>

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

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <MaskInput
              mask="R$ num"
              lazy={false}
              title="Valor"
              inputMode="numeric"
              overwrite="shift"
              value={String(field.value)}
              onAccept={(_, input) => {
                field.onChange(Number(input.unmaskedValue))
              }}
              blocks={{
                num: {
                  mask: Number,
                  scale: 2,
                  thousandsSeparator: '.',
                  min: 0.01,
                  max: 999999999.99,
                  padFractionalZeros: true,
                  radix: ',',
                  mapToRadix: ['.'],
                },
              }}
            />
          )}
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
                <FiArrowUpCircle size={20} />
                <span>Entrada</span>
              </RadioBox>
              <RadioBox
                type="button"
                isActive={field?.value === 'withdraw'}
                onClick={() => field.onChange('withdraw')}
                activeColor="red"
              >
                <FiArrowDownCircle size={20} />
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
          {currentModalFlow.submitText}
        </Button>
      </Container>
    </Modal>
  )
}

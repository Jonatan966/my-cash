import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { Controller, useForm } from 'react-hook-form'

import closeImg from 'assets/close.svg'
import incomeImg from 'assets/income.svg'
import outcomeImg from 'assets/outcome.svg'

import { useTransactions } from 'hooks/useTransactions'
import { GenericInput, MaskInput } from 'components/Input'
import { Button } from 'components/Button'

import { Container, RadioBox, TransactionTypeContainer } from './styles'
import { getFormattedDate } from 'utils/get-formatted-date'
import { TransactionDTO } from './types'

interface NewTransactionModalProps {
  isOpen: boolean
}

export function NewTransactionModal({ isOpen }: NewTransactionModalProps) {
  const currentDate = getFormattedDate(new Date())

  const { createTransaction, categories, handleToggleNewTransactionModal } =
    useTransactions()
  const { handleSubmit, register, reset, control } = useForm<TransactionDTO>({
    defaultValues: {
      amount: 0.01,
      transactionDate: currentDate,
      type: 'deposit',
    },
  })

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    reset()

    setIsSaving(false)
  }, [isOpen, reset])

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
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <h2>Cadastrar Transação</h2>

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
              onAccept={(_, input) => {
                field.onChange(Number(input.unmaskedValue))
              }}
              overwrite="shift"
              value={String(field.value)}
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
          Cadastrar
        </Button>
      </Container>
    </Modal>
  )
}

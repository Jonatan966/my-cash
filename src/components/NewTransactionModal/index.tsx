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

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction, categories } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')

  const hasFilledForm = title && amount && category

  useEffect(() => {
    if (isOpen) {
      setIsSaving(false)
    }
  }, [isOpen])

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()
    setIsSaving(true)

    const creationPromise = createTransaction({
      title,
      amount: isNaN(amount) ? 0 : amount,
      category,
      type,
    })

    try {
      await toast.promise(creationPromise, {
        pending: 'Adicionando transação. . .',
        error: 'Não foi possível adicionar essa transação',
        success: 'Transação adicionada com sucesso!'
      })
  
      setTitle('')
      setAmount(0)
      setCategory('')
      setType('deposit')
      onRequestClose()  
    } catch {
      setIsSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
        onClick={onRequestClose}
        className="react-modal-close"
        disabled={isSaving}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <GenericInput
          title='Título'
          placeholder="Ex: Video game"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <GenericInput
          type="number"
          title="Valor"
          min={0}
          value={amount}
          onChange={(event) =>
            setAmount(event.target.valueAsNumber)
          }
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
          {categories.map(category => 
            <option
              value={category.title}
              key={category.id}
            />
          )}
        </datalist>

        <Button 
          type='submit'
          height='4rem'
          backgroundColor='green'
          textColor='#fff'
          isLoading={isSaving}
          disabled={!hasFilledForm && !isSaving}
        >
          Cadastrar
        </Button>
      </Container>
    </Modal>
  )
}

import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import closeImg from 'assets/close.svg'
import incomeImg from 'assets/income.svg'
import outcomeImg from 'assets/outcome.svg'

import { useTransactions } from 'hooks/useTransactions'

import { Container, RadioBox, TransactionTypeContainer } from './styles'
import { GenericInput } from 'components/GenericInput'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title,
      amount: isNaN(amount) ? 0 : amount,
      category,
      type,
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content ${
        !isOpen ? 'react-modal-closing' : 'react-modal-opening'
      }`}
      closeTimeoutMS={500}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
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
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}

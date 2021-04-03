import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

interface Transaction {
  id: string,
  title: string,
  amount: number,
  category: string,
  type: 'deposit' | 'withdraw',
  createdAt: string
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <Container itensCount={2}>
      <table>
        <thead>
          <tr>
            <th><span>Título</span></th>
            <th>Valor</th>
            <th>Categoria</th>
            <th><span>Data</span></th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={`transaction-${transaction.id}`}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

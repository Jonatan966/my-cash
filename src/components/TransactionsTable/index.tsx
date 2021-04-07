import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';


export function TransactionsTable() {
  const { transactions } = useTransactions();
  
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

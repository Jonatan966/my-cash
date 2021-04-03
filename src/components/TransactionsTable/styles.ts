import styled from 'styled-components';

interface ContainerProps {
  itensCount?: number;
}

export const Container = styled.div<ContainerProps>`
  margin-top: 4rem;
  
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }

    }

    @media (max-width: 820px) {

      th {
        display: none;
        padding-left: 0;
        padding-right: 0;

        &:nth-child(1) {
          width: 100%;
          display: table-cell;
          
          color: var(--text-title);
          font-size: 1.45rem;

          span {
            display: none;
          }

          &::after {
            content: 'Listagem';
          }
        }

        &:nth-child(4) {
          display: table-cell;
          text-align: end;

          span {
            display: none;
          }

          &::after {
            content: '${props => props.itensCount} itens';
          }
        }
      }

      tr {
        display: grid;
        grid-template-areas: 
          'title title'
          'amount amount'
          'category createdAt';

        & + tr {
          margin: 1rem 0;
        }
        
        td {
          padding: 1rem;

          &:nth-child(1) {
            grid-area: title;
          }
          &:nth-child(2) {
            grid-area: amount;
            padding: 0.5rem 1rem;
          }
          &:nth-child(3) {
            grid-area: category;
          }
          &:nth-child(4) {
            grid-area: createdAt;
            text-align: end;
          }
         
        }
      }
    }
  }
`;

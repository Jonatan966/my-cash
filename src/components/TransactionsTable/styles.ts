import styled from 'styled-components';

interface ContainerProps {
  itensCount?: number;
}

export const Container = styled.div<ContainerProps>`
  margin-top: 2.25rem;
  
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: ${ctx => ctx.theme.colors.textBody};
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: ${ctx => ctx.theme.colors.shape};
      color: ${ctx => ctx.theme.colors.textBody};
      border-radius: 0.25rem;

      &:first-child {
        color: ${ctx => ctx.theme.colors.textTitle};
      }

      &.deposit {
        color: ${ctx => ctx.theme.colors.green};
      }

      &.withdraw {
        color: ${ctx => ctx.theme.colors.red};
      }

    }

    .trash {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        filter: ${ctx => ctx.theme.colors.trashIcon};
      }

      button {
        font-size: 0;
        zoom: 1.5;
        background: ${ctx => ctx.theme.colors.trashBg};
        border: none;
        padding: 0.25rem;
        border-radius: 0.25rem;

        transition: filter 0.2s;

        :hover {
          filter: brightness(0.9);
        }
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
          
          color: ${ctx => ctx.theme.colors.textTitle};
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
          'category createdAt'
          'actions actions';

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
          &:nth-child(5) {
            grid-area: actions;
          }
        }
      }

      .trash {
        gap: 0.5rem;

        button {
          flex: 1;
        }
      }
    }
  }
`;

import styled from 'styled-components'

const Container = styled.tr`
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

    &.trash {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        filter: ${ctx => ctx.theme.colors.trashIcon};
      }

      button {
        zoom: 1.5;
      }
    }
  }

  @media (max-width: 820px) {
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

    
    .trash {
      gap: 0.5rem;
      padding-top: 0;

      button {
        flex: 1;
      }
    }
  }
`

export default Container

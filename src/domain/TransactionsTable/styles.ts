import styled from 'styled-components'

interface ContainerProps {
  itensCount?: number;
}

export const Container = styled.div<ContainerProps>`
  margin-top: 2.25rem;
  padding-bottom: 2rem;
  
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

      thead tr {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
  }
`

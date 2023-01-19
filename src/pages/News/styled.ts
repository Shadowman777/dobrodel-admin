import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  td,
  th {
    padding: 5px;
    border-bottom: 1px solid #eeeeee;
    &:first-child {
      font-weight: bold;
      width: 30%;
    }
  }
`

export const StyledImagePreview = styled.img`
  max-width: 150px;
  max-height: 150px;
  display: inline-block;
  margin-left: 15px;
`

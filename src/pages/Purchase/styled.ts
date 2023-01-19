import { ButtonGroup, Paper } from '@material-ui/core'
import { TextField } from 'components/form'
import styled from 'styled-components'

export const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 15px;
`

export const StyledPaper = styled(Paper)`
  margin-bottom: 15px;
  padding: 15px;
`

export const StyledOrderList = styled.div`
  margin-bottom: 15px;
`

export const StyledOrder = styled(Paper)<{ status: number }>`
  padding: 15px;
  grid-gap: 15px;
  align-items: center;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  ${({ status }) => `
  ${
    status === 1
      ? `
      background-color: #4caf50;
      color: #ffffff;
  `
      : ''
  }
  ${
    status === 2
      ? `
    background-color: #f44336;
    color: #ffffff;
  `
      : ''
  }
  
  `}
`

export const StyledOrderColumn = styled.div`
  padding: 15px;
  flex: 1;
`

export const StyledOrderActions = styled.form`
  display: flex;
  grid-gap: 15px;
  align-items: center;
`

export const StyledQuantityField = styled(TextField)`
  width: 50px;
  input {
    height: 30px;
    padding: 0;
    text-align: center;
  }
`

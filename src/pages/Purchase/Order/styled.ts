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

export const StyledProductList = styled.div`
  margin-bottom: 15px;
`

export const StyledProduct = styled(Paper)`
  padding: 15px;
  display: flex;
  grid-gap: 15px;
  align-items: center;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 1fr auto;
`

export const StyledProductColumn = styled.div`
  padding: 15px;
  flex: 1;
`

export const StyledProductRow = styled.div`
  grid-gap: 10px;
  display: flex;
`

export const StyledProductActions = styled.form`
  display: flex;
  grid-gap: 15px;
  align-items: flex-start;
  margin-top: 15px;
  width: 100%;
  .MuiFormGroup-root {
    flex: 1;
  }
`

export const StyledField = styled(TextField)`
  input {
    height: 30px;
    padding: 0;
    text-align: center;
  }
  .MuiInputLabel-outlined {
    translate: translate(14px, 7px) scale(1);
  }
`

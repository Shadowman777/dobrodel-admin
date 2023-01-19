import { Button, ButtonGroup, Paper } from '@material-ui/core'
import { TextField } from 'components/form'
import styled from 'styled-components'

export const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 15px;
`

export const StyledPaper = styled(Paper)`
  margin-bottom: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const StyledProductList = styled.div`
  margin-bottom: 15px;
  width: 100%;
`

export const StyledProduct = styled(Paper)`
  padding: 15px;
  display: flex;
  grid-gap: 15px;
  align-items: center;
  margin-bottom: 5px;
`

export const StyledProductNames = styled.div`
  padding: 15px;
  flex: 1;
`

export const StyledProductActions = styled.form`
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

export const StyledAccumulateButton = styled(Button)`
  margin-bottom: 15px;
`

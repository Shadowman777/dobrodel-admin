import { CircularProgress } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

export const Loader = () => (
  <StyledWrapper>
    <CircularProgress />
  </StyledWrapper>
)

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

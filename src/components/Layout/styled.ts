import { AppBar, Drawer, Toolbar } from '@material-ui/core'
import styled from 'styled-components'

export const StyledAppBar = styled(AppBar)`
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`
export const StyledDrawer = styled(Drawer)`
  position: relative;
  width: 270px;
  white-space: nowrap;
  .MuiDrawer-paper {
    position: static;
    padding-top: 15px;
  }
`

export const StyledToolbar = styled(Toolbar)`
  padding-right: 0;
`

export const StyledContent = styled.main`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(3)};
`

export const StyledPaper = styled.div`
  background: #fff;
  display: flex;
  overflow: auto;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  .MuiDataGrid-root {
    flex: 1;
  }
`
export const StyledFlexGrow = styled.div`
  flex-grow: 1;
`

export const StyledPageHeader = styled.div`
  display: flex;
  grid-column-gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

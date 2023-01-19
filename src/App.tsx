import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import store from 'store/configureStore'
import { ruRU } from '@material-ui/core/locale'
import { ConfirmationProvider } from 'components/ConfirmProvider'
import DayJSUtils from '@date-io/dayjs'
import { createTheme, useTheme } from '@material-ui/core'
import { ThemeProvider } from 'styled-components'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import AppRouter from './router/AppRouter'

const App = () => {
  const theme = useTheme()
  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme(theme, ruRU)}>
        <ConfirmationProvider>
          <MuiPickersUtilsProvider utils={DayJSUtils}>
            <Suspense fallback={<div>Loading...</div>}>
              <AppRouter />
            </Suspense>
          </MuiPickersUtilsProvider>
        </ConfirmationProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App

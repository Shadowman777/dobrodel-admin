import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MainState } from './types'

const initialState: MainState = {
  loggedIn: localStorage.getItem('loggedIn') === '1'
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
      if (action.payload) {
        localStorage.setItem('loggedIn', '1')
      } else {
        localStorage.removeItem('loggedIn')
      }
    }
  }
})

export const { setLoggedIn } = mainSlice.actions

export const mainReducer = mainSlice.reducer

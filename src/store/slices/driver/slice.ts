import { createSlice } from '@reduxjs/toolkit'
import { DriverState } from './types'
import driverBuilders from './builder'

const initialState: DriverState = {
  order: {
    confirmed: false,
    loading: false,
    error: ''
  }
}

export const driverSlice = createSlice({
  name: 'promocode',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order.confirmed = false
      state.order.error = ''
    }
  },
  extraReducers: driverBuilders
})

export const { resetOrder } = driverSlice.actions

export const driverReducer = driverSlice.reducer

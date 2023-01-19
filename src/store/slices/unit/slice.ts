import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UnitState } from './types'
import unitBuilders from './builder'

const initialState: UnitState = {
  createModel: {
    open: false,
    error: ''
  },
  items: {
    data: [],
    loading: false
  }
}

export const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    toggleOpenCreateUnit: (state, action: PayloadAction<boolean>) => {
      state.createModel.open = action.payload
    }
  },
  extraReducers: unitBuilders
})

export const { toggleOpenCreateUnit } = unitSlice.actions

export const unitReducer = unitSlice.reducer

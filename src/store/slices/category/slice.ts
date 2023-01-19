import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryState } from './types'
import categoryBuilders from './builder'

const initialState: CategoryState = {
  createModel: {
    open: false,
    error: ''
  },
  items: {
    data: [],
    loading: false
  },
  internal: {
    data: [],
    loading: false
  }
}

export const categorySlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    toggleOpenCreateCategory: (state, action: PayloadAction<boolean>) => {
      state.createModel.open = action.payload
      state.createModel.error = ''
    }
  },
  extraReducers: categoryBuilders
})

export const { toggleOpenCreateCategory } = categorySlice.actions

export const categoryReducer = categorySlice.reducer

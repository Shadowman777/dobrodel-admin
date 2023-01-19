import { createSlice } from '@reduxjs/toolkit'
import { SupplierState } from './types'
import supplierBuilders from './builder'

const initialState: SupplierState = {
  items: {
    data: [],
    loading: false
  }
}

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: supplierBuilders
})

export const supplierReducer = supplierSlice.reducer

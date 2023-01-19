import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PurchaseState } from './types'
import purchaseBuilders from './builder'

const initialState: PurchaseState = {
  createModel: {
    open: false,
    error: ''
  },
  items: {
    data: [],
    loading: false
  },
  detail: {
    data: undefined,
    accumulation: undefined,
    loading: true
  },
  order: {
    data: undefined,
    loading: true
  }
}

export const purchaseSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    toggleOpenCreatePurchase: (state, action: PayloadAction<boolean>) => {
      state.createModel.open = action.payload
      state.createModel.error = ''
    },
    resetDetail(state) {
      state.detail = {
        data: undefined,
        accumulation: undefined,
        loading: true
      }
    },
    resetOrder(state) {
      state.order = {
        data: undefined,
        loading: true
      }
    }
  },
  extraReducers: purchaseBuilders
})

export const { toggleOpenCreatePurchase, resetDetail, resetOrder } =
  purchaseSlice.actions

export const purchaseReducer = purchaseSlice.reducer

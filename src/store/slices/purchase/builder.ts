import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import {
  createPurchase,
  getPurchase,
  orderGet,
  getPurchases,
  purchaseAccumulation
} from './thunks'
import { PurchaseState } from './types'

export default (builder: ActionReducerMapBuilder<PurchaseState>) => {
  builder.addCase(getPurchases.fulfilled, (state, action) => {
    state.items.data = action.payload || []
    state.items.loading = false
  })
  builder.addCase(getPurchases.pending, (state) => {
    state.items.loading = true
  })
  builder.addCase(createPurchase.fulfilled, (state, action) => {
    state.createModel.error =
      action.payload.code === 'error' ? action.payload.message : ''
    if (!state.createModel.error) {
      state.createModel.open = false
    }
  })
  builder.addCase(createPurchase.rejected, (state, action) => {
    state.createModel.error = action.error.message as string
  })
  builder.addCase(getPurchase.fulfilled, (state, action) => {
    state.detail.data = action.payload || []
    state.detail.loading = false
  })
  builder.addCase(getPurchase.pending, (state) => {
    state.detail.loading = true
  })
  builder.addCase(orderGet.fulfilled, (state, action) => {
    state.order.data = action.payload || []
    state.order.loading = false
  })
  builder.addCase(orderGet.pending, (state) => {
    state.order.loading = true
  })
  builder.addCase(purchaseAccumulation.fulfilled, (state, action) => {
    state.detail.accumulation = action.payload
  })
}

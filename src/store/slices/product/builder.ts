import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Product } from 'types/products'
import {
  addProductToStock,
  createProduct,
  getProductDetail,
  getProducts,
  getTaxes
} from './thunks'
import { ProductState } from './types'

export default (builder: ActionReducerMapBuilder<ProductState>) => {
  builder.addCase(getProducts.pending, (state) => {
    state.items.loading = true
  })
  builder.addCase(getProducts.fulfilled, (state, action) => {
    state.items = { ...state.items, ...action.payload, loading: false }
  })
  builder.addCase(getProductDetail.pending, (state) => {
    state.detail.loading = true
    state.detail.data = undefined
  })
  builder.addCase(getProductDetail.fulfilled, (state, action) => {
    state.detail.loading = false
    state.detail.data = action.payload as Product
  })
  builder.addCase(getTaxes.fulfilled, (state, action) => {
    state.taxes.data = action.payload || null
  })
  builder.addCase(getTaxes.pending, (state) => {
    state.taxes.loading = true
  })
  builder.addCase(createProduct.fulfilled, (state, action) => {
    state.model.error =
      action.payload.code === 'error' ? action.payload.message : ''
    if (!state.model.error) {
      state.model.open = false
    }
  })
  builder.addCase(createProduct.rejected, (state, action) => {
    state.model.error = action.error.message as string
  })

  builder.addCase(addProductToStock.fulfilled, (state, action) => {
    state.stockModel.error =
      action.payload.code === 'error' ? action.payload.message : ''
    if (!state.stockModel.error) {
      state.stockModel.open = false
    }
  })
}

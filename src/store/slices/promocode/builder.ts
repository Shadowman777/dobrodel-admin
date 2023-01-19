import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import {
  createPromocode,
  editPromocode,
  getPromocode,
  getPromocodes,
  getPromocodeTypes
} from './thunks'
import { PromocodeState } from './types'

export default (builder: ActionReducerMapBuilder<PromocodeState>) => {
  builder.addCase(getPromocodes.fulfilled, (state, action) => {
    state.items.count = action.payload?.length // TODO
    state.items.data = action.payload || []
    state.items.loading = false
  })
  builder.addCase(getPromocodes.pending, (state) => {
    state.items.loading = true
  })
  builder.addCase(getPromocode.fulfilled, (state, action) => {
    state.detail.data = action.payload.data
    state.detail.loading = false
  })
  builder.addCase(getPromocode.pending, (state) => {
    state.detail.loading = true
  })
  builder.addCase(createPromocode.fulfilled, (state) => {
    state.model.open = false
  })
  builder.addCase(createPromocode.rejected, (state, action) => {
    state.model.error = action.error.message as string
  })
  builder.addCase(editPromocode.fulfilled, (state) => {
    state.model.open = false
  })
  builder.addCase(editPromocode.rejected, (state, action) => {
    state.model.error = action.error.message as string
  })

  builder.addCase(getPromocodeTypes.fulfilled, (state, action) => {
    state.types = action.payload.data
  })
}

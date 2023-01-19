import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { getSuppliers } from './thunks'
import { SupplierState } from './types'

export default (builder: ActionReducerMapBuilder<SupplierState>) => {
  builder.addCase(getSuppliers.fulfilled, (state, action) => {
    state.items.data = action.payload || []
    state.items.loading = false
  })
  builder.addCase(getSuppliers.pending, (state) => {
    state.items.loading = true
  })
}

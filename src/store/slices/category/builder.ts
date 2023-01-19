import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { createCategory, getCategories, getInternalCategories } from './thunks'
import { CategoryState } from './types'

export default (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder.addCase(getCategories.fulfilled, (state, action) => {
    state.items.data = action.payload || []
    state.items.loading = false
  })
  builder.addCase(getCategories.pending, (state) => {
    state.items.loading = true
  })
  builder.addCase(getInternalCategories.fulfilled, (state, action) => {
    state.internal.data = action.payload || []
    state.internal.loading = false
  })
  builder.addCase(getInternalCategories.pending, (state) => {
    state.internal.loading = true
  })
  builder.addCase(createCategory.fulfilled, (state, action) => {
    state.createModel.error =
      action.payload.code === 'error' ? action.payload.message : ''
    if (!state.createModel.error) {
      state.createModel.open = false
    }
  })
  builder.addCase(createCategory.rejected, (state, action) => {
    state.createModel.error = action.error.message as string
  })
}

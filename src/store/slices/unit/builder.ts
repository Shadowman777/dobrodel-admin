import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { UnitState } from './types'
import { createUnit, getUnits } from './thunks'

export default (builder: ActionReducerMapBuilder<UnitState>) => {
  builder.addCase(getUnits.fulfilled, (state, action) => {
    state.items.data = action.payload || []
    state.items.loading = false
  })
  builder.addCase(getUnits.pending, (state) => {
    state.items.loading = true
  })
  builder.addCase(createUnit.fulfilled, (state, action) => {
    state.createModel.error =
      action.payload.code === 'error' ? action.payload.message : ''
    if (!state.createModel.error) {
      state.createModel.open = false
    }
  })
  builder.addCase(createUnit.rejected, (state, action) => {
    state.createModel.error = action.error.message as string
  })
}

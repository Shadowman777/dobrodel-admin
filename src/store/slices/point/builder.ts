import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { createPoint, getDates, getPoints } from './thunks'
import { PointState } from './types'

export default (builder: ActionReducerMapBuilder<PointState>) => {
  builder.addCase(getPoints.fulfilled, (state, action) => {
    state.items = action.payload
  })
  builder.addCase(createPoint.fulfilled, (state, action) => {
    state.createModel.error =
      action.payload.code === 'error' ? action.payload.message : ''
    if (!state.createModel.error) {
      state.createModel.open = false
    }
  })
  builder.addCase(createPoint.rejected, (state, action) => {
    state.createModel.error = action.error.message as string
  })
  builder.addCase(getDates.fulfilled, (state, action) => {
    state.dates = action.payload
  })
}

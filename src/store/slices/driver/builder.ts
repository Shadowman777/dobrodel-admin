import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { confirmOrder } from './thunks'
import { DriverState } from './types'

export default (builder: ActionReducerMapBuilder<DriverState>) => {
  builder.addCase(confirmOrder.fulfilled, (state) => {
    state.order.confirmed = true
    state.order.loading = false
  })
  builder.addCase(confirmOrder.pending, (state) => {
    state.order.loading = true
    state.order.error = ''
  })
  builder.addCase(confirmOrder.rejected, (state, action) => {
    state.order.error = action.error.message as string
    state.order.loading = false
  })
}

import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { getOrderDetail, getOrders, getOrderStatuses } from './thunks'
import { OrderState } from './types'

export default (builder: ActionReducerMapBuilder<OrderState>) => {
  builder.addCase(getOrders.fulfilled, (state, action) => {
    state.items = {
      count: action.payload.count,
      loading: false,
      orders: action.payload.orders
    }
  })
  builder.addCase(getOrders.pending, (state) => {
    state.items.loading = true
  })
  builder.addCase(getOrderStatuses.fulfilled, (state, action) => {
    state.statuses = action.payload || []
  })
  builder.addCase(getOrderDetail.fulfilled, (state, action) => {
    state.detail = action.payload
  })
}

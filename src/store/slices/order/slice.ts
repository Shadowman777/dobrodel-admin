import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { OrderState } from './types'
import orderBuilders from './builder'
import { OrderRequest } from '../../../types/orders'

const initialState: OrderState = {
  items: {
    count: 0,
    loading: false,
    orders: []
  },
  statuses: [],
  filters: {
    id_delivery_points: undefined,
    id_delivery_date: undefined,
    status: undefined,
    order_number: undefined,
    date_create_start: '01-01-2021',
    date_create_end: dayjs().format('DD-MM-YYYY'),
    offset: 0,
    limit: 50
  },
  detail: undefined
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Partial<OrderRequest>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      }
    },
    setDetail: () => {}
  },
  extraReducers: orderBuilders
})

export const { setDetail, setConfig } = orderSlice.actions

export const orderReducer = orderSlice.reducer

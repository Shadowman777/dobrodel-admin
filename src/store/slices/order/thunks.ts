import { createAsyncThunk } from '@reduxjs/toolkit'
import ax from 'utils/ax'
import {
  OrderDetail,
  OrderStatus,
  SetOrderStatusPayload
} from '../../../types/orders'
import { RootState } from '../../rootStorage'
import { OrdersList } from './types'

export const getOrders = createAsyncThunk(
  'order/get',
  async (data, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const response = await ax.post('order/get', state.order.filters)
    return response.data.data as OrdersList
  }
)

export const getOrderStatuses = createAsyncThunk(
  'order/get-status',
  async () => {
    const response = await ax.post('order/get-status')
    return response.data.data as OrderStatus[]
  }
)

export const setOrderStatus = createAsyncThunk(
  'order/set-status',
  async (data: SetOrderStatusPayload) => {
    const response = await ax.post('order/change-status', data)
    await getOrderDetail(data.id_order)
    return response.data.data
  }
)

export const getOrderDetail = createAsyncThunk(
  'order/card',
  async (id: number) => {
    const response = await ax.post('order/card', { id_order: id })
    return response.data.data as OrderDetail
  }
)

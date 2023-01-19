import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'store/rootStorage'
import {
  Purchase,
  PurchaseProductSavePayload,
  PurchaseUpdateStatusPayload
} from 'types/purchases'
import ax from 'utils/ax'

export const getPurchases = createAsyncThunk('purchase/get-all', async () => {
  const response = await ax.post('/purchase/get-all')
  return response.data.data as Purchase[]
})

export const orderGet = createAsyncThunk(
  'purchase/order-get',
  async (data: { id_order: number; id_purchase: number }) => {
    const response = await ax.post('purchase/order-get', data)
    return {
      ...data,
      ...response.data.data
    }
  }
)

export const getStatusItems = createAsyncThunk(
  'purchase/get-status-items',
  async (data: FormData) => {
    const response = await ax.post('purchase/get-status-items', data)
    return response.data
  }
)

export const getPurchase = createAsyncThunk(
  'purchase/get',
  async (id: number) => {
    const response = await ax.post('purchase/get', { id_purchase: id })
    return {
      id_purchase: id,
      ...response.data.data
    }
  }
)

export const purchaseAccumulation = createAsyncThunk(
  'purchase/accumulation',
  async (id: number) => {
    const response = await ax.post('purchase/accumulation', { id_purchase: id })
    return response.data.data
  }
)

export const updateStatusItem = createAsyncThunk(
  'purchase/update-status-item',
  async (data: PurchaseUpdateStatusPayload, thunkAPI) => {
    const response = await ax.post('purchase/update-status-item', data)
    const state = thunkAPI.getState() as RootState
    thunkAPI.dispatch(
      orderGet({
        id_order: state.purchase.order.data!.id_order!,
        id_purchase: state.purchase.order.data!.id_purchase!
      })
    )
    return response.data
  }
)

export const savePurchasedQuantity = createAsyncThunk(
  'purchase/save-purchased-quantity',
  async (data: PurchaseProductSavePayload) => {
    const response = await ax.post('purchase/save-purchased-quantity', data)
    return response.data
  }
)

export const createPurchase = createAsyncThunk(
  'purchase/create',
  async (data: FormData, thunkAPI) => {
    const response = await ax.post('purchase/create', data)
    thunkAPI.dispatch(getPurchases())
    return response.data
  }
)

export const deletePurchase = createAsyncThunk(
  'purchase/delete',
  async (data: FormData, thunkAPI) => {
    const response = await ax.post('purchase/delete', data)
    thunkAPI.dispatch(getPurchases())
    return response.data
  }
)

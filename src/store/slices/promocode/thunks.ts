import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'store/rootStorage'
import ax from 'utils/ax'
import { Promocode } from '../../../types/promocodes'

export const getPromocodes = createAsyncThunk(
  'promo-code/get-all',
  async (_payload, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const response = await ax.post(
      '/promo-code/get-all',
      state.promocode.filters
    )
    return response.data.data as Promocode[]
  }
)

export const createPromocode = createAsyncThunk(
  'promo-code/create',
  async (data: FormData, thunkAPI) => {
    const response = await ax.post('/promo-code/create', data)
    thunkAPI.dispatch(getPromocodes())
    return response.data
  }
)

export const editPromocode = createAsyncThunk(
  'promo-code/edit',
  async (data: FormData, thunkAPI) => {
    const response = await ax.post('/promo-code/edit', data)
    thunkAPI.dispatch(getPromocodes())
    return response.data
  }
)

export const deletePromocode = createAsyncThunk(
  'promo-code/delete',
  async (data: number, thunkAPI) => {
    const response = await ax.post('/promo-code/delete', {
      id_promo_code: data
    })
    thunkAPI.dispatch(getPromocodes())
    return response.data
  }
)

export const getPromocode = createAsyncThunk(
  'promo-code/get',
  async (data: number) => {
    const response = await ax.post('/promo-code/get', {
      id_promo_code: data
    })
    return response.data
  }
)

export const getPromocodeTypes = createAsyncThunk(
  'promo-code/get-type',
  async () => {
    const response = await ax.post('/promo-code/get-type')
    return response.data
  }
)

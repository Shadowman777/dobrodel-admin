import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'store/rootStorage'
import ax from 'utils/ax'
import { ICreateSchema, IDateCreateSchema } from '../../../pages/Points/types'

export const getPoints = createAsyncThunk(
  'points/get-all',
  async (_data, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const response = await ax.post('/delivery-points/get-all', state.point.sort)
    return response.data.data
  }
)
export const getAllDates = createAsyncThunk(
  'points/get-all-dates',
  async () => {
    const response = await ax.post('/delivery-points/date-all/get')
    return response.data.data
  }
)
export const getDate = createAsyncThunk(
  'points/get-date',
  async (date: string) => {
    const response = await ax.post('/delivery-points/get-date', {
      date
    })
    return response.data.data
  }
)
export const getDates = createAsyncThunk(
  'points/get-dates',
  async (id: number) => {
    const response = await ax.post('/delivery-points/date/get', {
      id_delivery_point: id
    })
    return response.data.data
  }
)

export const createPoint = createAsyncThunk(
  'points/create',
  async (data: ICreateSchema, thunkAPI) => {
    const response = await ax.post('delivery-points/create', data)
    thunkAPI.dispatch(getPoints())
    return response.data
  }
)
export const createPointDate = createAsyncThunk(
  'points/create-date',
  async (data: IDateCreateSchema, thunkAPI) => {
    const response = await ax.post('delivery-points/date/create', data)
    thunkAPI.dispatch(getDates(data.id_delivery_point))
    return response.data
  }
)

export const importPointsDates = createAsyncThunk(
  'points/import',
  async (data: FormData) => {
    const response = await ax.post('delivery-points/date/import', data)
    return response.data as any
  }
)

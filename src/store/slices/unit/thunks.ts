import { createAsyncThunk } from '@reduxjs/toolkit'
import ax from 'utils/ax'
import { Unit } from '../../../types/units'

export const getUnits = createAsyncThunk('unit/get', async () => {
  const response = await ax.post('unit-measure/get')
  return response.data.data as Unit[]
})

export const createUnit = createAsyncThunk(
  'unit/create',
  async (data: any, thunkAPI) => {
    const response = await ax.post('unit-measure/create', data)
    thunkAPI.dispatch(getUnits())
    return response.data
  }
)

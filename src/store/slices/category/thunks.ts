import { createAsyncThunk } from '@reduxjs/toolkit'
import ax from 'utils/ax'
import { Category } from '../../../types/categories'

export const getCategories = createAsyncThunk('category/get-all', async () => {
  const response = await ax.post('/category/get-all')
  return response.data.data as Category[]
})

export const getInternalCategories = createAsyncThunk(
  'internal-category/get-all',
  async () => {
    const response = await ax.post('/internal-category/get-all')
    return response.data.data as Category[]
  }
)

export const createCategory = createAsyncThunk(
  'category/create',
  async (data: FormData, thunkAPI) => {
    const response = await ax.post('category/create', data)
    thunkAPI.dispatch(getCategories())
    return response.data
  }
)

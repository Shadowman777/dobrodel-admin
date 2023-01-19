import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product, Tax } from 'types/products'
import ax from 'utils/ax'
import { ProductsList } from './types'
import { RootState } from '../../rootStorage'

export const getProducts = createAsyncThunk(
  'product/get-all',
  async (arg, { getState }) => {
    const state = getState() as RootState
    const payload = {
      offset: state.product.items.offset,
      limit: state.product.items.limit,
      sort: state.product.items.sort,
      filters: state.product.items.filters
    }
    const response = await ax.post('/product/get-all', payload)
    return response.data.data as ProductsList
  }
)
export const getProductDetail = createAsyncThunk(
  'product/card',
  async (payload: FormData) => {
    const response = await ax.post('/product/card', payload)
    return response.data.data as Product
  }
)

export const createProduct = createAsyncThunk(
  'product/create',
  async (data: FormData, { dispatch }) => {
    const response = await ax.post('product/create', data)
    dispatch(getProducts())
    return response.data
  }
)
export const editProduct = createAsyncThunk(
  'product/update',
  async (data: FormData, thunkAPI) => {
    if (typeof data.get('image') === 'object') {
      const imageFormData = new FormData()
      imageFormData.append('id', data.get('id') as string)
      imageFormData.append('image', data.get('image') as Blob)
      thunkAPI.dispatch(updateImageProduct(imageFormData))
    }
    data.delete('image')
    const response = await ax.post('product/update', data)
    thunkAPI.dispatch(getProducts())
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (data: any, thunkAPI) => {
    const response = await ax.post('product/delete', data)
    thunkAPI.dispatch(getProducts())
    return response.data
  }
)
export const updateImageProduct = createAsyncThunk(
  'product/update-image',
  async (data: any) => {
    const response = await ax.post('product/update-image', data)
    return response.data
  }
)
export const importProducts = createAsyncThunk(
  'product/import',
  async (data: FormData, thunkAPI) => {
    const response = await ax.post('product/import', data)
    thunkAPI.dispatch(getProducts())

    return response.data
  }
)

export const addProductToStock = createAsyncThunk(
  'stock/add',
  async (data: FormData, thunkAPI) => {
    const response = await ax.post('stock/add', data)
    thunkAPI.dispatch(getProducts())
    return response.data
  }
)

export const getTaxes = createAsyncThunk('product/tax/get', async () => {
  const response = await ax.post('/product/tax/get')
  return response.data.data as Array<Tax>
})

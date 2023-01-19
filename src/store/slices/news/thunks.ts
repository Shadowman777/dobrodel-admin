import { createAsyncThunk } from '@reduxjs/toolkit'
import ax from 'utils/ax'
import {
  AddNewsProductPayload,
  NewsDetailPayload,
  NewsList,
  UpdateProductStatusPayload,
  UpdateStatusPayload
} from './types'
import { RootState } from '../../rootStorage'
import { NewsDetail } from '../../../types/news'

export const getNews = createAsyncThunk(
  'news/get-all',
  async (_payload, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    const response = await ax.post('/news/get-all', {
      offset: state.news.items.offset,
      limit: state.news.items.limit
    })
    return response.data.data as NewsList
  }
)

export const getNewsDetail = createAsyncThunk(
  'news/get',
  async (payload: NewsDetailPayload) => {
    const response = await ax.post('/news/get', payload)
    return response.data.data as NewsDetail
  }
)

export const createNews = createAsyncThunk(
  'news/create',
  async (data: FormData, thunkAPI) => {
    const response = await ax.post('/news/create', data)
    thunkAPI.dispatch(getNews())
    return response.data
  }
)

export const editNews = createAsyncThunk(
  'news/edit',
  async (data: FormData, thunkAPI) => {
    const imgProps = ['image_url', 'image_preview_url']
    imgProps.forEach((prop) => {
      if (typeof data.get(prop) === 'string') {
        data.delete(prop)
      }
    })
    const response = await ax.post('/news/edit', data)
    thunkAPI.dispatch(getNews())
    return response.data
  }
)

export const updateNewsStatus = createAsyncThunk(
  'news/delete',
  async (data: UpdateStatusPayload, thunkAPI) => {
    const response = await ax.post('/news/delete', data)
    thunkAPI.dispatch(getNews())
    return response.data
  }
)

export const updateNewsProductStatus = createAsyncThunk(
  'news/recovery-promotion-product',
  async (data: UpdateProductStatusPayload, thunkAPI) => {
    const response = await ax.post('/news/recovery-promotion-product', data)
    const state = thunkAPI.getState() as RootState
    thunkAPI.dispatch(
      getNewsDetail({
        id_news: state.news.detail.data!.id
      })
    )
    return response.data
  }
)
export const addNewsProduct = createAsyncThunk(
  'news/add-promotion-product',
  async (data: AddNewsProductPayload, thunkAPI) => {
    const response = await ax.post('/news/add-promotion-product', data)
    const state = thunkAPI.getState() as RootState
    thunkAPI.dispatch(
      getNewsDetail({
        id_news: state.news.detail.data!.id
      })
    )
    return response.data
  }
)

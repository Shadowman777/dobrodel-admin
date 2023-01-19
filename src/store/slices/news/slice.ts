import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import newsBuilder from './builder'
import { NewsState } from './types'

const initialState: NewsState = {
  model: {
    open: false,
    error: ''
  },
  detail: {
    loading: false,
    data: undefined
  },
  items: {
    limit: 50,
    offset: 0,
    count: 0,
    loading: false,
    news: []
  }
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    toggleOpenCreateNews: (state, action: PayloadAction<boolean>) => {
      state.model.open = action.payload
      state.model.error = ''
    }
  },
  extraReducers: newsBuilder
})

export const { toggleOpenCreateNews } = newsSlice.actions

export const newsReducer = newsSlice.reducer

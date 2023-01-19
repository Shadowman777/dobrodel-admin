import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { NewsState } from './types'
import { createNews, editNews, getNews, getNewsDetail } from './thunks'

export default (builder: ActionReducerMapBuilder<NewsState>) => {
  builder.addCase(getNews.pending, (state) => {
    state.items.loading = true
  })
  builder.addCase(getNews.fulfilled, (state, action) => {
    state.items = { ...state.items, ...action.payload, loading: false }
  })
  builder.addCase(getNewsDetail.pending, (state) => {
    state.detail.loading = true
    state.detail.data = undefined
  })
  builder.addCase(getNewsDetail.fulfilled, (state, action) => {
    state.detail.loading = false
    state.detail.data = action.payload
  })
  builder.addCase(createNews.fulfilled, (state, action) => {
    state.model.error =
      action.payload.code === 'error' ? action.payload.message : ''
    if (!state.model.error) {
      state.model.open = false
    }
  })
  builder.addCase(editNews.fulfilled, (state, action) => {
    state.model.error =
      action.payload.code === 'error' ? action.payload.message : ''
    if (!state.model.error) {
      state.model.open = false
    }
  })
  builder.addCase(createNews.rejected, (state, action) => {
    state.model.error = action.error.message as string
  })
  builder.addCase(editNews.rejected, (state, action) => {
    state.model.error = action.error.message as string
  })
}

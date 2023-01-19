import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PromocodeRequest } from 'types/promocodes'
import { PromocodeState } from './types'
import promocodeBuilder from './builder'

const initialState: PromocodeState = {
  model: {
    open: false,
    error: ''
  },
  detail: {
    loading: false,
    data: undefined
  },
  items: {
    count: 0,
    data: [],
    loading: false
  },
  filters: {
    name: undefined,
    type: undefined,
    date_create_start: undefined,
    date_create_end: undefined,
    offset: 0,
    limit: 50
  },
  types: []
}

export const promocodeSlice = createSlice({
  name: 'promocode',
  initialState,
  reducers: {
    toggleOpenModelPromocode: (
      state,
      action: PayloadAction<boolean | number>
    ) => {
      state.model.open = action.payload
      state.model.error = ''
    },
    clearDetail: (state) => {
      state.detail.loading = false
      state.detail.data = undefined
    },
    setConfig: (state, action: PayloadAction<Partial<PromocodeRequest>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      }
    }
  },
  extraReducers: promocodeBuilder
})

export const { toggleOpenModelPromocode, clearDetail, setConfig } =
  promocodeSlice.actions

export const promocodeReducer = promocodeSlice.reducer

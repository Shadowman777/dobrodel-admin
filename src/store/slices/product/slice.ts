import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductsList, ProductState } from './types'
import productBuilders from './builder'

const initialState: ProductState = {
  model: {
    error: '',
    open: false
  },
  stockModel: {
    error: '',
    open: false
  },
  detail: {
    loading: false,
    data: undefined
  },
  taxes: {
    data: [],
    loading: false
  },
  items: {
    limit: 50,
    offset: 0,
    count: 0,
    loading: false,
    sort: 'id_desc',
    filters: {},
    products: []
  }
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleOpenCreateProduct: (state, action: PayloadAction<boolean>) => {
      state.model.open = action.payload
      state.model.error = ''
    },
    toggleOpenAddToStock: (state, action: PayloadAction<boolean>) => {
      state.stockModel.open = action.payload
      state.stockModel.error = ''
    },
    setConfig: (state, action: PayloadAction<Partial<ProductsList>>) => {
      state.items = {
        ...state.items,
        ...action.payload
      }
    }
  },
  extraReducers: productBuilders
})

export const { toggleOpenAddToStock, toggleOpenCreateProduct, setConfig } =
  productSlice.actions

export const productReducer = productSlice.reducer

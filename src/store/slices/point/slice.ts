import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import pointBuilder from './builder'
import { PointState } from './types'

const initialState: PointState = {
  createModel: {
    error: '',
    open: false
  },
  sort: {},
  items: [],
  dates: [],
  deliveryDatePointId: undefined
}

export const pointSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    toggleOpenCreatePoint: (state, action: PayloadAction<boolean>) => {
      state.createModel.open = action.payload
      state.createModel.error = ''
    },
    setDeliveryDatePointId: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.deliveryDatePointId = action.payload
    },
    setSort(state, action: PayloadAction<any>) {
      state.sort = action.payload
    }
  },
  extraReducers: pointBuilder
})

export const { toggleOpenCreatePoint, setDeliveryDatePointId, setSort } =
  pointSlice.actions

export const pointReducer = pointSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './types'
import userBuilders from './builder'

const initialState: UserState = {
  items: {
    data: [],
    loading: false
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: userBuilders
})

export const userReducer = userSlice.reducer

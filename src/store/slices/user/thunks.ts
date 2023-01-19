import { createAsyncThunk } from '@reduxjs/toolkit'
import ax from 'utils/ax'
import { User } from '../../../types/users'

export const getUsers = createAsyncThunk('user/get-all', async () => {
  const response = await ax.post('customer/get-all')
  return response.data.data as User[]
})

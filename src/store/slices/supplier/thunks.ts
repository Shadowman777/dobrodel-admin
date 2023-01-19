import { createAsyncThunk } from '@reduxjs/toolkit'
import ax from 'utils/ax'
import { Supplier } from '../../../types/suppliers'

export const getSuppliers = createAsyncThunk('supplier/get-all', async () => {
  const response = await ax.post('/supplier/get-all')
  return response.data.data as Supplier[]
})

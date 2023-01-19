import { createAsyncThunk } from '@reduxjs/toolkit'
import { DriverOrderConfirmPayload } from 'types/driver'
import ax from 'utils/ax'

export const confirmOrder = createAsyncThunk(
  'driver/order/confirm',
  async (data: DriverOrderConfirmPayload) => {
    const response = await ax.post('driver/order/confirm', data)
    return response.data
  }
)

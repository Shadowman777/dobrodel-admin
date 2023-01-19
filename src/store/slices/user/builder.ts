import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { getUsers } from './thunks'
import { UserState } from './types'

export default (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.items.data = action.payload || []
    state.items.loading = false
  })
  builder.addCase(getUsers.pending, (state) => {
    state.items.loading = true
  })
}

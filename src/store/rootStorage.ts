import store from './configureStore'
import { rootReducer } from './slices/rootSlices'

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

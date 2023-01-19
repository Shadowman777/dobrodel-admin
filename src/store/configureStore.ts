import {
  AnyAction,
  configureStore,
  ConfigureStoreOptions
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger'

import * as Redux from 'redux'
import { rootReducer } from './slices/rootSlices'

const logger = createLogger()

const persistConfig = {
  key: 'dobrodel-admin',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

type AppState = typeof persistedReducer

const storeConfig: ConfigureStoreOptions<
  AppState,
  AnyAction,
  [ThunkMiddleware<AppState, AnyAction>, Redux.Middleware]
> = {
  reducer: persistedReducer,
  middleware: [thunk, logger]
}

const store = configureStore(storeConfig)

export default store

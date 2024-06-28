import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'
import DashBoardSlice from './Slices/DashBoardSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth:authSlice,
      dashboard:DashBoardSlice,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import SlippageSlice from './reducers/SlippageSlice'
import CurrencyReservsSlice from './reducers/CurrencyReservsSlice'
import SwapDetailsSlice from './reducers/SwapDetailsSlice'
import PoolsSlice from './reducers/PoolsSlice'
import UserSlice from './reducers/UserSlice'

const rootReducer = combineReducers({
  SlippageSlice,
  CurrencyReservsSlice,
  SwapDetailsSlice,
  PoolsSlice,
  UserSlice,
})

export const setupStore = () => configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import SlippageSlice from './reducers/SlippageSlice'
import CurrencyReservsSlice from './reducers/CurrencyReservsSlice'
import SwapDetailsSlice from './reducers/SwapDetailsSlice'

const rootReducer = combineReducers({
  SlippageSlice,
  CurrencyReservsSlice,
  SwapDetailsSlice,
})

export const setupStore = () => configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

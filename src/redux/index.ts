import { combineReducers, configureStore } from '@reduxjs/toolkit'
import SlippageSlice from './reducers/SlippageSlice'
import CurrencyReservsSlice from './reducers/CurrencyReservsSlice'

const rootReducer = combineReducers({
  SlippageSlice,
  CurrencyReservsSlice,
})

export const setupStore = () => configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

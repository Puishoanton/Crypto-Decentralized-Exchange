import { combineReducers, configureStore } from '@reduxjs/toolkit'
import SlippageSlice from './reducers/SlippageSlice'

const rootReducer = combineReducers({
  SlippageSlice,
})

export const setupStore = () => configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

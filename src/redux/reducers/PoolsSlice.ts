import { CoinsType, PoolPair } from './../../models/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  pairs: [] as PoolPair[] | [],
}

const PoolsSilce = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    pairsInit: (state, action: PayloadAction<CoinsType[]>) => {
      state.pairs = action.payload.reduce((acc, firstCoin, index) => {
        for (let i = index + 1; i < action.payload.length; i++) {
          const secondCoin = action.payload[i]
          acc.push({
            apr: 0,
            id: `${firstCoin.name} - ${secondCoin.name}`,
            firstCoin,
            secondCoin,
            currentLiquidity: 0,
          })
        }
        return acc
      }, [] as PoolPair[])
    },
    addCurrentLiquidity: (
      state,
      action: PayloadAction<{ id: string; currentLiquidity: number }>
    ) => {
      state.pairs.map(pair => {
        if (pair.id === action.payload.id) {
          return (pair.currentLiquidity += action.payload.currentLiquidity)
        }
        return pair
      })
    },
    removeCurrentLiquidity: (
      state,
      action: PayloadAction<{ id: string; currentLiquidity: number; error: string }>
    ) => {
      !action.payload.error &&
        state.pairs.map(pair => {
          if (pair.id === action.payload.id) {
            return (pair.currentLiquidity -= action.payload.currentLiquidity)
          }
          return pair
        })
    },
  },
})

export default PoolsSilce.reducer
export const { pairsInit, addCurrentLiquidity, removeCurrentLiquidity } = PoolsSilce.actions

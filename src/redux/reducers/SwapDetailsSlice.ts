import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CoinsType } from '../../models/index'

type initialStateType = {
  firstCoin: {
    coin: CoinsType
    tradeValue: number
  }
  secondCoin: {
    coin: CoinsType
    tradeValue: number
  }
}

const initialState: initialStateType = {
  firstCoin: {
    coin: {} as CoinsType,
    tradeValue: 0,
  },
  secondCoin: {
    coin: {} as CoinsType,
    tradeValue: 0,
  },
}

const SwapDetailsSlice = createSlice({
  name: 'Swap Details',
  initialState,
  reducers: {
    selectCoinForFirstInput: (state, action: PayloadAction<CoinsType>) => {
      state.firstCoin.coin = action.payload
    },
    selectCoinForSecondInput: (state, action: PayloadAction<CoinsType>) => {
      state.secondCoin.coin = action.payload
    },
    setupTradeValueForFirstInput: (state, action: PayloadAction<number>) => {
      state.firstCoin.tradeValue = action.payload
    },
    setupTradeValueForSecondInput: (state, action: PayloadAction<number>) => {
      state.secondCoin.tradeValue = action.payload
    },
  },
})

export default SwapDetailsSlice.reducer
export const {
  selectCoinForFirstInput,
  selectCoinForSecondInput,
  setupTradeValueForFirstInput,
  setupTradeValueForSecondInput,
} = SwapDetailsSlice.actions

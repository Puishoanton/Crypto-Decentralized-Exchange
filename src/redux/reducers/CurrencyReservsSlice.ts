import { CoinsType } from '../../models/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import coinsImg from '../../assets/coinImports/coins'

type initialStateType = {
  tokens: CoinsType[]
  TradePair: CoinsType[] | []
}

const initialState: initialStateType = {
  tokens: [
    {
      id: 1,
      name: 'APT',
      price: 4,
      picture: coinsImg.apt,
      CurrencyReservs: 3250,
      CurrencyReservsUSDT: 13000,
      layer: 'Layer Zero',
      selected: false,
    },
    {
      id: 2,
      name: 'USDT',
      price: 1,
      picture: coinsImg.usdt,
      CurrencyReservs: 10000,
      CurrencyReservsUSDT: 10000,
      layer: 'Tron chain',
      selected: false,
    },
    {
      id: 3,
      name: 'BTC',
      price: 16600,
      picture: coinsImg.btc,
      CurrencyReservs: 10,
      CurrencyReservsUSDT: 170000,
      layer: 'Bitcoin chain',
      selected: false,
    },
    {
      id: 4,
      name: 'EHT',
      price: 1150,
      picture: coinsImg.eth,
      CurrencyReservs: 26,
      CurrencyReservsUSDT: 30000,
      layer: 'Ethereum chain',
      selected: false,
    },
    {
      id: 5,
      name: 'BNB',
      price: 235,
      picture: coinsImg.bnb,
      CurrencyReservs: 65,
      CurrencyReservsUSDT: 15550,
      layer: 'BSC chain',
      selected: false,
    },
    {
      id: 6,
      name: 'TWT',
      price: 1.3,
      picture: coinsImg.twt,
      CurrencyReservs: 10000,
      CurrencyReservsUSDT: 13500,
      layer: 'BSC chain',
      selected: false,
    },
    {
      id: 7,
      name: 'GLMR',
      price: 0.3,
      picture: coinsImg.glmr,
      CurrencyReservs: 100000,
      CurrencyReservsUSDT: 31000,
      layer: 'Moonriver chain',
      selected: false,
    },
    {
      id: 8,
      name: 'DOT',
      price: 4.5,
      picture: coinsImg.dot,
      CurrencyReservs: 10000,
      CurrencyReservsUSDT: 45000,
      layer: 'Polkadot chain',
      selected: false,
    },
    {
      id: 9,
      name: 'SOL',
      price: 6,
      picture: coinsImg.sol,
      CurrencyReservs: 10000,
      CurrencyReservsUSDT: 61000,
      layer: 'Solana chain',
      selected: false,
    },
    {
      id: 10,
      name: 'KSM',
      price: 25,
      picture: coinsImg.ksm,
      CurrencyReservs: 1000,
      CurrencyReservsUSDT: 26000,
      layer: 'Kusama chain',
      selected: false,
    },
    {
      id: 11,
      name: 'OP',
      price: 0.9,
      picture: coinsImg.op,
      CurrencyReservs: 100000,
      CurrencyReservsUSDT: 92000,
      layer: 'Optimism chain',
      selected: false,
    },
    {
      id: 12,
      name: 'STG',
      price: 0.3,
      picture: coinsImg.stg,
      CurrencyReservs: 100000,
      CurrencyReservsUSDT: 29000,
      layer: 'Layer zero',
      selected: false,
    },
  ],
  TradePair: [],
  
}

const CurrencyReservsSlice = createSlice({
  name: 'reservs',
  initialState,
  reducers: {
    disabledCoinsHandler: (state, action: PayloadAction<CoinsType[]>) => {
      state.TradePair = [...action.payload]
    },
  },
})

export default CurrencyReservsSlice.reducer
export const { disabledCoinsHandler } = CurrencyReservsSlice.actions

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  tokens: {
    id: number
    name: string
    price: number
    picture: string
    CurrencyReservs: number
    CurrencyReservsUSDT: number
  }[]
}

const initialState: initialStateType = {
  tokens: [
    {
      id: 1,
      name: 'APT',
      price: 4,
      picture: 'Apt',
      CurrencyReservs: 3562,
      CurrencyReservsUSDT: 12691,
    },
    {
      id: 2,
      name: 'USDT',
      price: 1,
      picture: 'Apt',
      CurrencyReservs: 12691,
      CurrencyReservsUSDT: 12691,
    },
    {
      id: 3,
      name: 'BTC',
      price: 16600,
      picture: 'Apt',
      CurrencyReservs: 5,
      CurrencyReservsUSDT: 84000,
    },
    {
      id: 4,
      name: 'EHT',
      price: 1150,
      picture: 'Apt',
      CurrencyReservs: 26,
      CurrencyReservsUSDT: 30000,
    },
    {
      id: 5,
      name: 'BNB',
      price: 235,
      picture: 'Apt',
      CurrencyReservs: 65,
      CurrencyReservsUSDT: 15500,
    },
  ],
}

const CurrencyReservsSlice = createSlice({
  name: 'reservs',
  initialState,
  reducers: {
    // setUpCurrentProcent: (state, action: PayloadAction<number>) => {
    //   state.current = action.payload
    // },
  },
})

export default CurrencyReservsSlice.reducer
// export const { setUpCurrentProcent } = SlippageSlice.actions

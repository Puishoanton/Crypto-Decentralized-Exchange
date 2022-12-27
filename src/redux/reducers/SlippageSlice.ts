import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  tolerance: number[]
  current: number
}

const initialState: initialStateType = {
  tolerance: [0.5, 1, 1.5],
  current: 0.5,
}

const SlippageSlice = createSlice({
  name: 'slippage',
  initialState,
  reducers: {
    setUpCurrentProcent: (state, action: PayloadAction<number>) => {
      state.current = action.payload
    },
  },
})

export default SlippageSlice.reducer
export const { setUpCurrentProcent } = SlippageSlice.actions

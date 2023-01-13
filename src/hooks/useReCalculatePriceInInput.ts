import { Dispatch, SetStateAction, useEffect } from 'react'
import { priceCalc } from 'src/utils/priceCalc'
import { CoinsType } from '../models/index'
export const useReCalcPrice = (
  firstCoin: CoinsType,
  secondCoin: CoinsType,
  firstInputSwapValue: number,
  setSecondInputSwapValue: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    setSecondInputSwapValue(
      firstInputSwapValue !== 0
        ? firstInputSwapValue *
            priceCalc(
              firstCoin.CurrencyReservs,
              firstCoin.CurrencyReservsUSDT,
              firstInputSwapValue,
              secondCoin.price
            )
        : 0
    )
  }, [firstCoin, firstInputSwapValue, secondCoin, setSecondInputSwapValue])
}

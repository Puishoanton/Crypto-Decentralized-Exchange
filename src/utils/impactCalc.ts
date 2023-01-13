import { CoinsType } from '../models/index'
export const impactCalc = (inputValue: number, token: CoinsType): number => {
  return +(
    ((+inputValue * token.price * (1 - 0.003)) /
      (token.CurrencyReservs * token.price + +inputValue * token.price * (1 - 0.003))) *
    100
  ).toFixed(5)
}

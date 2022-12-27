import { CoinsType } from './../types/index'
export const impactCalc = (inputValue: string | number, token: CoinsType): string => {
  return (
    ((+inputValue * token?.price * (1 - 0.003)) /
      (token?.CurrencyReservs * token?.price + +inputValue * token?.price * (1 - 0.003))) *
    100
  ).toFixed(5)
}

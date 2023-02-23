export const priceCalc = (
  firstCurrencyReservs: number,
  firstCurrencyReservsUSDT: number,
  tradeValue: number,
  secondCoinPrice: number
) => {
  const x = firstCurrencyReservs
  const y = firstCurrencyReservsUSDT
  const deltaX = tradeValue
  // const deltaY = (y * deltaX) / (x + deltaX)
  //
  // price depends how many coins in reservs (x) and tradeValue (deltaX)
  const price = (y - (y * deltaX) / (x + deltaX)) / (x + deltaX)
  return +(price / secondCoinPrice).toFixed(5)
}

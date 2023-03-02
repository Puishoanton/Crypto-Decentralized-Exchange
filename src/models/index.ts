export type NavigationType = {
  title: string
  path: string
}
export type CoinsType = {
  id: number
  name: string
  price: number
  picture: string
  CurrencyReservs: number
  CurrencyReservsUSDT: number
  layer: string
  selected: boolean
}
export type Coin = {
  coin: CoinsType
  tradeValue: number
}

export type PoolPair = {
  id: string
  firstCoin: CoinsType
  secondCoin: CoinsType
  apr: number
  currentLiquidity: number
}
export type CoinId = { id: string; balance: number; price: number }
export type WalletId = { id: string; balance: number }


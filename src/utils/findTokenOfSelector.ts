import { CoinsType } from '../types/index'
export const findToken = (coins: CoinsType[], selectedToken: number): CoinsType => {
  return coins.find(coin => coin.id === selectedToken) as CoinsType
}

import { useEffect, useState } from 'react'
import { useAppSelector } from './useRedux'

export const useSearchToken = (searchingInputValue: string) => {
  const { tokens } = useAppSelector(state => state.CurrencyReservsSlice)
  const [sortetCoinList, setSortetCoinList] = useState(tokens)
  useEffect(() => {
    setSortetCoinList(
      tokens.filter(coin => coin.name.toLowerCase().includes(searchingInputValue.toLowerCase()))
    )
  }, [searchingInputValue])

  return { sortetCoinList }
}

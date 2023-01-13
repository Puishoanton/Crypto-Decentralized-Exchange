import { CoinsType } from '../models/index'
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react'

export const useModalCoinList = (coins: CoinsType[]) => {
  //

  const [isCoinListShown, setIsCoinListShown] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [selectedToken, setSelectedToken] = useState(0)
  const [sortetCoinList, setSortetCoinList] = useState(coins)
  //
  const coinListHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsCoinListShown(true)
  }
  const searchToken = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
      setSortetCoinList(
        coins.filter(coin => coin.name.toLowerCase().includes(e.target.value.toLowerCase()))
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coins, searchInput]
  )

  return {
    isCoinListShown,
    setIsCoinListShown,
    setSearchInput,
    selectedToken,
    setSelectedToken,
    sortetCoinList,
    setSortetCoinList,
    coinListHandler,
    searchToken,
  }
}

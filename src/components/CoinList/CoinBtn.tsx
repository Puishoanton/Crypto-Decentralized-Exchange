import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { CoinsType } from 'src/models'

type CoinBtnProps = {
  token: CoinsType
  selectCoinAction: any
  setCoinModal: (isVisible: boolean) => void
}

const CoinBtn: FC<CoinBtnProps> = ({ token, selectCoinAction, setCoinModal }) => {
  const { TradePair } = useAppSelector(state => state.CurrencyReservsSlice)
  const dispatch = useAppDispatch()
  const [disbledCoin, setDisbledCoin] = useState(false)
  useEffect(() => {
    if (token === TradePair[0] || token === TradePair[1]) {
      setDisbledCoin(true)
    } else {
      setDisbledCoin(false)
    }
  }, [TradePair, token])

  return (
    <button
      disabled={disbledCoin}
      onClick={() => {
        if (!disbledCoin) {
          setCoinModal(false)
          dispatch(selectCoinAction(token))
        }
      }}>
      <img src={token.picture} alt={token.name} />
      <div>
        <p>{token.name}</p>
        <p>{token.layer}</p>
      </div>
    </button>
  )
}

export default CoinBtn

import { ChangeEvent, FC } from 'react'
import { CoinsType } from 'src/@types'
import styles from './CoinList.module.scss'
type CoinListProps = {
  coins: CoinsType[]
  setSelectedToken: (id: number) => void

  setIsCoinListShown: (shown: boolean) => void
  sortetCoinList: CoinsType[]
  searchToken: (e: ChangeEvent<HTMLInputElement>) => void
}

const CoinList: FC<CoinListProps> = ({
  coins,
  setSelectedToken,
  searchToken,
  sortetCoinList,
  setIsCoinListShown,
}) => {
  return (
    <div className={styles['coin-list']}>
      <input type='text' onChange={e => searchToken(e)} />
      <ol>
        {sortetCoinList.map(token => (
          <li
            onClick={() => {
              setSelectedToken(token.id)
              setIsCoinListShown(false)
            }}
            key={token.id}>
            {token.name}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default CoinList

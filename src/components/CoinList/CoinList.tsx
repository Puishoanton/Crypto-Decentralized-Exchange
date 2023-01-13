import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useSearchToken } from 'src/hooks/useSearchToken'
import CoinBtn from './CoinBtn'
import styles from './CoinList.module.scss'
type CoinListProps = {
  setCoinModal: Dispatch<SetStateAction<boolean>>
  selectCoinAction: any
}

const CoinList: FC<CoinListProps> = props => {
  const [inputValue, setInputValue] = useState('')
  const { sortetCoinList } = useSearchToken(inputValue)

  return (
    <div className={styles['coin-list']}>
      <span className={styles['header']}>Select a coin</span>
      <input
        type='text'
        placeholder='Put name or address'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <ul>
        {sortetCoinList.map(token => (
          <li key={token.id}>
            <CoinBtn
              selectCoinAction={props.selectCoinAction}
              setCoinModal={props.setCoinModal}
              token={token}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CoinList

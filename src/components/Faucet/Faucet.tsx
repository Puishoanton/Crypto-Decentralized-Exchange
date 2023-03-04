import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { useSearchToken } from 'src/hooks/useSearchToken'
import { CoinsType } from 'src/models'
import { faucet } from 'src/redux/reducers/UserSlice'
import Card from '../Card/Card'
import Button from '../UI/Button/Button'
import styles from './Faucet.module.scss'

const Faucet = () => {
  const [inputValue, setInputValue] = useState('')
  const { sortetCoinList } = useSearchToken(inputValue)
  const dispatch = useAppDispatch()
  const { wallet, isConnected } = useAppSelector(state => state.UserSlice)
  const coinFromWallet = (walletCoin: CoinsType) => wallet.find(coin => coin.id === walletCoin.name)

  return isConnected ? (
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
            <Card>
              <header className={styles['title']}>
                <img src={token.picture} alt={token.name} />
                <p>{token.name}</p>
              </header>
              <main className={styles['body']}>
                <p>{token.layer}</p>
                <p>
                  Balance: {coinFromWallet(token)?.balance} ${token.name}
                </p>
              </main>
              <footer className={styles['request']}>
                <Button title='Request coins' onClick={() => dispatch(faucet(token))} />
              </footer>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h1>Connect the wallet first</h1>
  )
}

export default Faucet

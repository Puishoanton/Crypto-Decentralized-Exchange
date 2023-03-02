import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinId, PoolPair } from 'src/models'
import { ADD_LIQUIDITY_PATH, LP_PATH } from 'src/routes/Routes'
import Card from '../Card/Card'
import styles from './Pools.module.scss'
type PoolProps = {
  pairs: PoolPair[] | []
  lpBalance: CoinId[] | []
}

const Pool: FC<PoolProps> = ({ pairs, lpBalance }) => {
  const navigate = useNavigate()
  return (
    <>
      {pairs.map((pair, index) => (
        <li className={styles['pair']} key={index}>
          <Card>
            <header className={styles['title']}>
              <div className={styles['coin']}>
                <img src={pair.firstCoin.picture} alt={pair.firstCoin.name} />
                {pair.firstCoin.name}
              </div>
              -
              <div className={styles['coin']}>
                <img src={pair.secondCoin.picture} alt={pair.secondCoin.name} />
                {pair.secondCoin.name}
              </div>
            </header>
            <main className={styles['body']}>
              <div className={styles['liquidity']}>
                Liquidity: {pair.currentLiquidity.toFixed(2)}$
              </div>
              <div className={styles['apr']}>APR - {pair.apr}%</div>
              <div className={styles['your-liquidity']}>
                Your Liquidity: {lpBalance.find(el => el.id === pair.id)?.balance || 0} LP
              </div>
            </main>
            <footer className={styles['btns']}>
              <button onClick={() => navigate(ADD_LIQUIDITY_PATH)}>+</button>
              <button onClick={() => navigate(LP_PATH)}>-</button>
            </footer>
          </Card>
        </li>
      ))}
    </>
  )
}

export default Pool

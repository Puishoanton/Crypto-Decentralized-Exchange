import { FC } from 'react'
import { CoinsType } from 'src/models'
import Card from '../Card/Card'
import styles from './Pools.module.scss'
type PoolProps = {
  pairs: [CoinsType, CoinsType][]
}

const Pool: FC<PoolProps> = ({ pairs }) => {
  return (
    <Card>
      {pairs.map((coins, index) => (
        <section className={styles['pair']} key={index}>
          <div>{coins[0].name}</div> - <div>{coins[1].name}</div>
          <div>APR - 12%</div>
          <div>
            <div>
              <div>{coins[0].name}</div> - 1000
              <div>{coins[1].name}</div> - 4000
            </div>
            <div>
              Max: 10000 USDT
              <div className={styles['qqq']}>
                <div className={styles['qq']}></div>
              </div>
            </div>
          </div>
          <div>
            Your liquidity
            <div>
              <div>{coins[0].name}</div> - 300
              <div>{coins[1].name}</div> - 75
            </div>
          </div>
          <div>+ -</div>
        </section>
      ))}
    </Card>
  )
}

export default Pool

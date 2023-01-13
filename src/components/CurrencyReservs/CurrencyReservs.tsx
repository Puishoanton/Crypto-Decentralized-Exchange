import { FC } from 'react'
import { CoinsType } from 'src/models'
import Card from '../Card/Card'
import styles from './CurrencyReservs.module.scss'

type CurrencyReservsProps = {
  firstCoin: CoinsType
  secondCoin: CoinsType
}

const CurrencyReservs: FC<CurrencyReservsProps> = ({ firstCoin, secondCoin }) => {
  return (
    <>
      {firstCoin.id && secondCoin.id && (
        <Card>
          <div className={styles['reservs']}>
            <p>Currency Reservs</p>
            <div className={styles['coins']}>
              <div className={styles['coin']}>
                <div>
                  <img src={firstCoin.picture} alt={firstCoin.name} />
                  <p>{firstCoin.name}</p>
                </div>
                <p>
                  {new Intl.NumberFormat(['ban', 'id']).format(
                    firstCoin.name === 'USDT'
                      ? secondCoin.CurrencyReservsUSDT
                      : firstCoin.CurrencyReservs
                  )}
                </p>
              </div>
              <div className={styles['coin']}>
                <div>
                  <img src={secondCoin.picture} alt={secondCoin.name} />
                  <p>{secondCoin.name}</p>
                </div>
                <p>
                  {new Intl.NumberFormat(['ban', 'id']).format(
                    secondCoin.name === 'USDT'
                      ? firstCoin.CurrencyReservsUSDT
                      : secondCoin.CurrencyReservs
                  )}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

export default CurrencyReservs

import { FC } from 'react'
import { useAfterSlippage } from 'src/hooks/useAfterSlippage'
import { CoinsType } from 'src/models'
import arrow from '../../assets/arrow.svg'
import Popup from '../UI/Popup/Popup'
import styles from './Swap.module.scss'

type TradeDetailsProps = {
  firstCoinFromSelector: {
    coin: CoinsType
    tradeValue: number
  }
  secondCoinFromSelector: {
    coin: CoinsType
    tradeValue: number
  }
  isTradeDetails: boolean
  setIsTradeDetails: (b: boolean) => void
  positionOfInputs: boolean
  current: number
  swappingCoinPrice: number
}

const TradeDetails: FC<TradeDetailsProps> = ({
  firstCoinFromSelector,
  secondCoinFromSelector,
  isTradeDetails,
  setIsTradeDetails,
  current,
  swappingCoinPrice,
}) => {
  const rootClass = [styles['show-details']]
  isTradeDetails && rootClass.push(styles['show-details-active'])
  const afterSlippageValue = useAfterSlippage(current, secondCoinFromSelector.tradeValue)
  return (
    <>
      <div onClick={() => setIsTradeDetails(!isTradeDetails)} className={rootClass.join(' ')}>
        <span>
          1 {firstCoinFromSelector.coin.name} = {swappingCoinPrice}{' '}
          {secondCoinFromSelector.coin.name}
          (including fee)
        </span>
        <img
          style={{ transform: `${isTradeDetails ? 'rotate(0deg)' : 'rotate(180deg)'}` }}
          width={16}
          height={16}
          src={arrow}
          alt='Arrow'
        />
      </div>
      <Popup classes='details' isOpen={isTradeDetails}>
        <div className={styles['output']}>
          <span>Expected Output:</span>
          <span>
            {(firstCoinFromSelector.tradeValue * firstCoinFromSelector.coin.price) /
              secondCoinFromSelector.coin.price}{' '}
            {secondCoinFromSelector.coin.name}
          </span>
        </div>
        <div className={styles['after-slippage']}>
          <span>Minimum received after slippage ({current}%):</span>
          <span>
            {afterSlippageValue} {secondCoinFromSelector.coin.name}
          </span>
        </div>
      </Popup>
    </>
  )
}

export default TradeDetails

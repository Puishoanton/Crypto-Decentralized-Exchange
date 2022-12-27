import { FC } from 'react'
import { CoinsType } from 'src/types'
import arrow from '../../assets/arrow.svg'
import Popup from '../UI/Popup/Popup'
import styles from './Swap.module.scss'

type TradeDetailsProps = {
  tokenFromSelector: CoinsType
  tokenFromSelector1: CoinsType
  isTradeDetails: boolean
  setIsTradeDetails: (b: boolean) => void
  positionOfInputs: boolean
  inputValue1: string | number
  inputValue2: string | number

  current: number
}

const TradeDetails: FC<TradeDetailsProps> = ({
  tokenFromSelector,
  tokenFromSelector1,
  isTradeDetails,
  setIsTradeDetails,
  positionOfInputs,
  inputValue1,
  inputValue2,
  current,
}) => {
  const rootClass = [styles['show-details']]
  isTradeDetails && rootClass.push(styles['show-details-active'])

  return (
    <>
      {inputValue1 && inputValue2 ? (
        <>
          <div onClick={() => setIsTradeDetails(!isTradeDetails)} className={rootClass.join(' ')}>
            <span>
              1 {positionOfInputs ? tokenFromSelector?.name : tokenFromSelector1?.name} =
              {positionOfInputs ? (
                <>
                  {' '}
                  {tokenFromSelector1?.price * tokenFromSelector?.price} {tokenFromSelector1?.name}
                </>
              ) : (
                <>
                  {' '}
                  {tokenFromSelector1?.price / tokenFromSelector?.price} {tokenFromSelector?.name}
                </>
              )}{' '}
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
                {positionOfInputs ? (
                  <>
                    {inputValue2} {tokenFromSelector1?.name}
                  </>
                ) : (
                  <>
                    {inputValue1} {tokenFromSelector?.name}
                  </>
                )}
              </span>
            </div>
            <div className={styles['after-slippage']}>
              <span>Minimum received after slippage ({current}%):</span>
              <span>
                {positionOfInputs ? (
                  <>
                    {+inputValue2 - (+inputValue1 * current) / 100} {tokenFromSelector1?.name}
                  </>
                ) : (
                  <>
                    {+inputValue1 - (+inputValue2 * current) / 100} {tokenFromSelector?.name}
                  </>
                )}
              </span>
            </div>
          </Popup>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default TradeDetails

import { ChangeEvent, useEffect, useState } from 'react'
import { useOutside } from 'src/hooks/useOutside'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { disabledCoinsHandler } from 'src/redux/reducers/CurrencyReservsSlice'
import { addCurrentLiquidity } from 'src/redux/reducers/PoolsSlice'
import {
  selectCoinForFirstInput,
  selectCoinForSecondInput,
  setupTradeValueForFirstInput,
  setupTradeValueForSecondInput,
} from 'src/redux/reducers/SwapDetailsSlice'
import { addLpBalance, balanceCheck, errorCleaner } from 'src/redux/reducers/UserSlice'
import Card from '../Card/Card'
import CoinList from '../CoinList/CoinList'
import InputField from '../InputField/InputField'
import PageDescription from '../PageDescription/PageDescription'
import Slippage from '../Slippage/Slippage'
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import styles from './AddLiquidity.module.scss'

const AddLiquidity = () => {
  const dispatch = useAppDispatch()
  //
  // This is states for trade value in inputs 1 and 2
  const [firstInputSwapValue, setFirstInputSwapValue] = useState(+'')
  const [secondInputSwapValue, setSecondInputSwapValue] = useState(+'')
  const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstInputSwapValue(+e.target.value)
    setSecondInputSwapValue((+e.target.value * firstCoin.coin.price) / secondCoin.coin.price)
    dispatch(setupTradeValueForFirstInput(+e.target.value))
    dispatch(
      setupTradeValueForSecondInput(
        (+e.target.value * firstCoin.coin.price) / secondCoin.coin.price
      )
    )
  }

  //
  // This is state for modal of coins list
  const [coinModal, setCoinModal] = useState(false)

  //
  // This is state from redux with selected coins in first and second inputs
  const { firstCoin, secondCoin } = useAppSelector(state => state.SwapDetailsSlice)

  //
  // This is state used for identifying on which coin slector we clicked
  const [selectedSwapField, setSelectedSwapField] = useState('')

  //
  // This useEffect need for setup disabled tokens in coins list
  useEffect(() => {
    dispatch(disabledCoinsHandler([firstCoin.coin, secondCoin.coin]))
  }, [dispatch, firstCoin, secondCoin])

  //
  // This is state from redux used for slippage tolerance and current selected slippage tolerance
  const { tolerance, current } = useAppSelector(state => state.SlippageSlice)
  const [slippageInputValue, setSlippageInputValue] = useState<number | string>(current)
  const {
    contentRef: slippageContentRef,
    isShow: slippageIsShow,
    openRef: slippageOpenRef,
    setIsShow: slippageSetIsShow,
  } = useOutside(false)
  //

  //
  // Error in case of insuficient balance
  const { error } = useAppSelector(state => state.UserSlice)

  //
  // Fee calculating
  const fee = ((firstInputSwapValue * 0.3) / 100).toFixed(5)

  // Balance on the wallet
  const { wallet } = useAppSelector(state => state.UserSlice)
  return (
    <>
      <Card>
        <form className={styles['create-pool']}>
          <header className={styles['header']}>
            <h1>Add liquidity</h1>
            <Slippage
              isPopup={slippageIsShow}
              setIsPopup={slippageSetIsShow}
              openRef={slippageOpenRef}
              contentRef={slippageContentRef}
              current={current}
              setSlippageInputValue={setSlippageInputValue}
              slippageInputValue={slippageInputValue}
              tolerance={tolerance}
            />
          </header>
          <main className={styles['main']}>
            <div className={styles['inputs']}>
              <InputField
                wallet={wallet}
                coinModal={coinModal}
                id={'firstSwapCoinSelector'}
                inputValue={firstInputSwapValue}
                selectedCoin={firstCoin.coin}
                setCoinModal={setCoinModal}
                setSelectedSwapField={setSelectedSwapField}
                disabled={false}
                onChangeValueInput={onChangeValueInput}
              />
              <InputField
                wallet={wallet}
                disabled={true}
                coinModal={coinModal}
                id={'secondSwapCoinSelector'}
                inputValue={secondInputSwapValue}
                selectedCoin={secondCoin.coin}
                setCoinModal={setCoinModal}
                setSelectedSwapField={setSelectedSwapField}
                onChangeValueInput={onChangeValueInput}
              />
            </div>
            {firstCoin.coin.name && secondCoin.coin.name && (
              <>
                <div className={styles['fee']}>
                  <span>Fee (0.3%):</span>
                  <span>
                    {fee} {firstCoin.coin.name}
                  </span>
                </div>
              </>
            )}
          </main>
          <footer className={styles['footer']}>
            {error && (
              <div className={styles['error']}>
                {error}
                <div onClick={() => dispatch(errorCleaner())} className={styles['close']}>
                  -
                </div>
              </div>
            )}
            <Button
              onClick={e => {
                e.preventDefault()
                dispatch(
                  addCurrentLiquidity({
                    id: `${firstCoin.coin.name} - ${secondCoin.coin.name}`,
                    currentLiquidity:
                      firstCoin.tradeValue * firstCoin.coin.price +
                      secondCoin.tradeValue * secondCoin.coin.price,
                  })
                )
                dispatch(errorCleaner())
                dispatch(
                  balanceCheck({
                    firstCoin,
                    secondCoin,
                  })
                )
                dispatch(
                  addLpBalance({
                    firstCoin,
                    secondCoin,
                    fee,
                  })
                )
              }}
              title='Add liquidity'
            />
          </footer>
        </form>
      </Card>
      <Modal isVisibleNotification={coinModal} setIsVisibleNotification={setCoinModal}>
        <CoinList
          selectCoinAction={
            selectedSwapField === 'firstSwapCoinSelector'
              ? selectCoinForFirstInput
              : selectCoinForSecondInput
          }
          setCoinModal={setCoinModal}
        />
      </Modal>
      <PageDescription />
    </>
  )
}

export default AddLiquidity

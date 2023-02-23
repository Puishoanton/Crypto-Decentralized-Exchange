import { ChangeEvent, useEffect, useState } from 'react'
import arrowUp from 'src/assets/arrow-up.svg'
import { useOutside } from 'src/hooks/useOutside'
import { useReCalcPrice } from 'src/hooks/useReCalculatePriceInInput'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import {
  balanceCheckForSwap,
  currencyReservsErrorCleaner,
  disabledCoinsHandler,
  swapCalculatingReservs,
} from 'src/redux/reducers/CurrencyReservsSlice'
import {
  selectCoinForFirstInput,
  selectCoinForSecondInput,
  setupTradeValueForFirstInput,
  setupTradeValueForSecondInput,
} from 'src/redux/reducers/SwapDetailsSlice'
import { impactCalc } from 'src/utils/impactCalc'
import { priceCalc } from 'src/utils/priceCalc'
import swap from '../../assets/swap.svg'
import Card from '../Card/Card'
import CoinList from '../CoinList/CoinList'
import CurrencyReservs from '../CurrencyReservs/CurrencyReservs'
import InputField from '../InputField/InputField'
import PageDescription from '../PageDescription/PageDescription'
import Slippage from '../Slippage/Slippage'
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import styles from './Swap.module.scss'
import TradeDetails from './TradeDetails'
import {
  changeBalanceAfterSwapping,
  errorCleaner,
  userBalanceCheckForSwap,
} from 'src/redux/reducers/UserSlice'

const Swap = () => {
  const dispatch = useAppDispatch()
  //
  // This is states for trade value in inputs 1 and 2
  const [firstInputSwapValue, setFirstInputSwapValue] = useState(0)
  const [secondInputSwapValue, setSecondInputSwapValue] = useState(0)
  const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstInputSwapValue(+e.target.value)
    setSecondInputSwapValue(
      +e.target.value !== 0
        ? +e.target.value *
            priceCalc(
              firstCoin.coin.CurrencyReservs,
              firstCoin.coin.CurrencyReservsUSDT,
              +e.target.value,
              secondCoin.coin.price
            )
        : 0
    )
    dispatch(setupTradeValueForFirstInput(+e.target.value))
    dispatch(
      setupTradeValueForSecondInput(
        +e.target.value !== 0
          ? +e.target.value *
              priceCalc(
                firstCoin.coin.CurrencyReservs,
                firstCoin.coin.CurrencyReservsUSDT,
                +e.target.value,
                secondCoin.coin.price
              )
          : 0
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

  // ReCalculate if token in selector was changed
  useReCalcPrice(firstCoin.coin, secondCoin.coin, firstInputSwapValue, setSecondInputSwapValue)
  //
  // This state for reversing inputs
  const [isInputsReversed, setIsInputsReversed] = useState(false)
  const reverseInputHandler = () => {
    setIsInputsReversed(!isInputsReversed)
    dispatch(selectCoinForFirstInput(secondCoin.coin))
    dispatch(selectCoinForSecondInput(firstCoin.coin))

    dispatch(
      setupTradeValueForSecondInput(
        firstInputSwapValue !== 0
          ? firstInputSwapValue *
              priceCalc(
                secondCoin.coin.CurrencyReservs,
                secondCoin.coin.CurrencyReservsUSDT,
                firstInputSwapValue,
                firstCoin.coin.price
              )
          : 0
      )
    )
  }

  //
  // State for showing trade details element
  const [isTradeDetails, setIsTradeDetails] = useState(false)

  //
  // Calculating a price of swapping coin
  const swappingCoinPrice = priceCalc(
    firstCoin.coin.CurrencyReservs,
    firstCoin.coin.CurrencyReservsUSDT,
    firstCoin.tradeValue,
    secondCoin.coin.price
  )

  //
  // Calculanting how trade value influence on coin price (price impact)
  const [impactCalcElement, setImpactCalcElement] = useState(0)
  const colorForImpact = (impactCalc: number) => {
    if (+impactCalc < 0.2) {
      return styles['impact-green']
    } else if (+impactCalc < 0.5) {
      return styles['impact-yellow']
    } else if (+impactCalc > 0.5) {
      return styles['impact-red']
    }
  }
  useEffect(() => {
    setImpactCalcElement(impactCalc(firstInputSwapValue, firstCoin.coin) || 0)
  }, [firstCoin.coin, firstInputSwapValue, isInputsReversed])

  // Balance on the wallet
  const { wallet } = useAppSelector(state => state.UserSlice)
  const { error } = useAppSelector(state => state.CurrencyReservsSlice)
  //Reserv
  const { tokens } = useAppSelector(state => state.CurrencyReservsSlice)
  const firstCoinReserv = tokens.find(coin => coin.id === firstCoin.coin.id)
  const secondCoinReserv = tokens.find(coin => coin.id === secondCoin.coin.id)
  //fee
  const fee = ((firstInputSwapValue * 0.3) / 100).toFixed(5)
  return (
    <>
      <Card>
        <form className={styles['swap']}>
          <header className={styles['header']}>
            <h1>Swap</h1>
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
                inputValue={firstCoin.coin.id && secondCoin.coin.id ? firstInputSwapValue : -1}
                selectedCoin={firstCoin.coin}
                setCoinModal={setCoinModal}
                setSelectedSwapField={setSelectedSwapField}
                disabled={firstCoin.coin.id && secondCoin.coin.id ? false : true}
                onChangeValueInput={onChangeValueInput}
              />
              <InputField
                wallet={wallet}
                disabled={true}
                coinModal={coinModal}
                id={'secondSwapCoinSelector'}
                inputValue={firstCoin.coin.id && secondCoin.coin.id ? secondInputSwapValue : -1}
                selectedCoin={secondCoin.coin}
                setCoinModal={setCoinModal}
                setSelectedSwapField={setSelectedSwapField}
                onChangeValueInput={onChangeValueInput}
              />

              <div onClick={reverseInputHandler} className={styles['change']}>
                <img src={isInputsReversed ? arrowUp : swap} alt='ArrowUp' />
              </div>
            </div>
            {firstCoin.coin.name && secondCoin.coin.name && (
              <>
                <TradeDetails
                  swappingCoinPrice={swappingCoinPrice}
                  current={current}
                  isTradeDetails={isTradeDetails}
                  setIsTradeDetails={setIsTradeDetails}
                  positionOfInputs={isInputsReversed}
                  firstCoinFromSelector={firstCoin}
                  secondCoinFromSelector={secondCoin}
                />
                <div className={styles['impact-fee']}>
                  <div className={styles['impact']}>
                    <span>Price Impact: </span>
                    <span className={colorForImpact(impactCalcElement)}>{impactCalcElement}%</span>
                  </div>
                  <div className={styles['fee']}>
                    <span>Fee (0.3%):</span>
                    <span>
                      {fee} {firstCoin.coin.name}
                    </span>
                  </div>
                </div>
              </>
            )}
          </main>
          <footer className={styles['footer']}>
            {error && (
              <div className={styles['error']}>
                {error}
                <div
                  onClick={() => {
                    dispatch(errorCleaner())
                    dispatch(currencyReservsErrorCleaner())
                  }}
                  className={styles['close']}>
                  -
                </div>
              </div>
            )}
            <Button
              title='Swap'
              onClick={e => {
                e.preventDefault()
                dispatch(errorCleaner())
                dispatch(currencyReservsErrorCleaner())
                dispatch(
                  balanceCheckForSwap({
                    firstCoin,
                    secondCoin,
                    wallet,
                  })
                )

                dispatch(swapCalculatingReservs({ firstCoin, secondCoin, fee, error }))
                dispatch(userBalanceCheckForSwap({ firstCoin, secondCoin }))
                dispatch(changeBalanceAfterSwapping({ firstCoin, secondCoin, fee }))
              }}
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
      <CurrencyReservs
        firstCoinReserv={firstCoinReserv?.CurrencyReservs || 0}
        secondCoinReserv={secondCoinReserv?.CurrencyReservs || 0}
        firstCoin={firstCoin.coin}
        secondCoin={secondCoin.coin}
      />
      <PageDescription />
    </>
  )
}

export default Swap

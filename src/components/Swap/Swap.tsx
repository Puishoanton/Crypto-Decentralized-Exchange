import { useState } from 'react'
import { useInputsChange } from 'src/hooks/useInputsChange'
import { useModalCoinList } from 'src/hooks/useModalCoinList'
import { useOutside } from 'src/hooks/useOutside'
import { useAppSelector } from 'src/hooks/useRedux'
import { findToken } from 'src/utils/findTokenOfSelector'
import { impactCalc } from 'src/utils/impactCalc'
// import Apt from '../../assets/apt.svg'
import arrowUp from '../../assets/arrow-up.svg'
import swap from '../../assets/swap.svg'
import CoinField from '../CoinField/CoinField'
import CoinList from '../CoinList/CoinList'
import Slippage from '../Slippage/Slippage'
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import styles from './Swap.module.scss'
import TradeDetails from './TradeDetails'

// const coins = [
//   { id: 1, name: 'APT', price: 4, picture: Apt },
//   { id: 2, name: 'USDT', price: 1, picture: Apt },
//   { id: 3, name: 'BTC', price: 16600, picture: Apt },
//   { id: 4, name: 'EHT', price: 1150, picture: Apt },
//   { id: 5, name: 'BNB', price: 235, picture: Apt },
// ]

const Swap = () => {
  //
  // All coins
  const { tokens } = useAppSelector(state => state.CurrencyReservsSlice)

  //
  // change inputs position
  const [positionOfInputs, setPositionOfInputs] = useState(true)
  //
  // Setting window for slippage
  const {
    contentRef: slippageContentRef,
    isShow: slippageIsShow,
    openRef: slippageOpenRef,
    setIsShow: slippageSetIsShow,
  } = useOutside(false)

  //
  // Modal window for selecting token for swapping
  //   1
  const {
    isCoinListShown,
    setIsCoinListShown,
    selectedToken,
    setSelectedToken,
    sortetCoinList,
    coinListHandler,
    searchToken,
  } = useModalCoinList(tokens)
  //   2
  const {
    isCoinListShown: isCoinListShown1,
    setIsCoinListShown: setIsCoinListShown1,
    selectedToken: selectedToken1,
    setSelectedToken: setSelectedToken1,
    sortetCoinList: sortetCoinList1,
    coinListHandler: coinListHandler1,
    searchToken: searchToken1,
  } = useModalCoinList(tokens)

  //
  // Selected token from modal
  const tokenFromSelector = findToken(tokens, selectedToken)
  const tokenFromSelector1 = findToken(tokens, selectedToken1)

  //
  // inputs onChange
  const { input1Handler, input2Handler, inputValue1, inputValue2 } = useInputsChange(
    tokenFromSelector,
    tokenFromSelector1
  )

  //
  // Slippage settings
  const { tolerance, current } = useAppSelector(state => state.SlippageSlice)
  const [slippageInputValue, setSlippageInputValue] = useState<number | string>(current)

  //
  // Show details
  const [isTradeDetails, setIsTradeDetails] = useState(false)

  //
  // Claculate impact
  const impactCalc1 = impactCalc(inputValue1, tokenFromSelector)
  const impactCalc2 = impactCalc(inputValue2, tokenFromSelector1)
  // Color for impact
  const colorForImpact = (impactCalc1: string, impactCalc2: string) => {
    if ((+impactCalc1 || +impactCalc2) < 0.2) {
      return styles['impact-green']
    } else if ((+impactCalc1 || +impactCalc2) < 0.5) {
      return styles['impact-yellow']
    } else if ((+impactCalc1 || +impactCalc2) > 0.5) {
      return styles['impact-red']
    }
  }

  return (
    <>
      <form className={styles['swap']}>
        <header className={styles['header']}>
          <div>Swap</div>
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
            {positionOfInputs ? (
              <>
                <CoinField
                  classes='input-1'
                  coinListHandler={coinListHandler}
                  inputHandler={input1Handler}
                  inputValue={inputValue1}
                  isCoinListShown={isCoinListShown}
                  tokenFromSelector={tokenFromSelector}
                  tokenFromSelector1={tokenFromSelector1}
                  fieldNumber={1}
                />
                <CoinField
                  classes='input-2'
                  coinListHandler={coinListHandler1}
                  inputHandler={input2Handler}
                  inputValue={inputValue2}
                  isCoinListShown={isCoinListShown}
                  tokenFromSelector={tokenFromSelector}
                  tokenFromSelector1={tokenFromSelector1}
                  fieldNumber={2}
                />
              </>
            ) : (
              <>
                <CoinField
                  classes='input-2'
                  coinListHandler={coinListHandler1}
                  inputHandler={input2Handler}
                  inputValue={inputValue2}
                  isCoinListShown={isCoinListShown}
                  tokenFromSelector={tokenFromSelector}
                  tokenFromSelector1={tokenFromSelector1}
                  fieldNumber={2}
                />
                <CoinField
                  classes='input-1'
                  coinListHandler={coinListHandler}
                  inputHandler={input1Handler}
                  inputValue={inputValue1}
                  isCoinListShown={isCoinListShown}
                  tokenFromSelector={tokenFromSelector}
                  tokenFromSelector1={tokenFromSelector1}
                  fieldNumber={1}
                />
              </>
            )}
            <div
              onClick={() => setPositionOfInputs(!positionOfInputs)}
              className={styles['change']}>
              <img src={positionOfInputs ? arrowUp : swap} alt='ArrowUp' />
            </div>
          </div>

          <TradeDetails
            current={current}
            inputValue1={inputValue1}
            inputValue2={inputValue2}
            isTradeDetails={isTradeDetails}
            positionOfInputs={positionOfInputs}
            setIsTradeDetails={setIsTradeDetails}
            tokenFromSelector={tokenFromSelector}
            tokenFromSelector1={tokenFromSelector1}
          />

          <div className={styles['impact-fee']}>
            <div className={styles['impact']}>
              <span>Price Impact: </span>
              <span className={colorForImpact(impactCalc1, impactCalc2)}>
                {positionOfInputs ? <>{impactCalc1}%</> : <>{impactCalc2}%</>}
              </span>
            </div>
            <div className={styles['fee']}>
              <span>Fee (0.3%):</span>
              <span>
                {positionOfInputs ? (
                  <>
                    {((+inputValue1 * 0.3) / 100).toFixed(3)} {tokenFromSelector?.name}
                  </>
                ) : (
                  <>
                    {((+inputValue2 * 0.3) / 100).toFixed(3)} {tokenFromSelector1?.name}
                  </>
                )}
              </span>
            </div>
          </div>
        </main>
        <footer className={styles['footer']}>
          <Button title='Connect wallet' />
        </footer>
      </form>
      <>
        <Modal
          isVisibleNotification={isCoinListShown}
          setIsVisibleNotification={setIsCoinListShown}>
          <CoinList
            coins={tokens}
            searchToken={searchToken}
            setSelectedToken={setSelectedToken}
            sortetCoinList={sortetCoinList}
            setIsCoinListShown={setIsCoinListShown}
          />
        </Modal>
        <Modal
          isVisibleNotification={isCoinListShown1}
          setIsVisibleNotification={setIsCoinListShown1}>
          <CoinList
            coins={tokens}
            searchToken={searchToken1}
            setSelectedToken={setSelectedToken1}
            sortetCoinList={sortetCoinList1}
            setIsCoinListShown={setIsCoinListShown1}
          />
        </Modal>
      </>
    </>
  )
}

export default Swap

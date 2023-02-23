import { useEffect, useState } from 'react'
import { useOutside } from 'src/hooks/useOutside'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { CoinId } from 'src/models'
import { pairsInit, removeCurrentLiquidity } from 'src/redux/reducers/PoolsSlice'
import {
  selectCoinForFirstInput,
  selectCoinForSecondInput,
} from 'src/redux/reducers/SwapDetailsSlice'
import { errorCleaner, lpCheck, removeLpBalance } from 'src/redux/reducers/UserSlice'
import Card from '../Card/Card'
import CoinList from '../CoinList/CoinList'
import Slippage from '../Slippage/Slippage'
import Button from '../UI/Button/Button'
import ChooseCoinBtn from '../UI/ChooseTokenBtn/ChooseCoinBtn'
import Modal from '../UI/Modal/Modal'
import SwapInput from '../UI/SwapInput/SwapInput'
import styles from './RedeemLp.module.scss'

const RedeemLp = () => {
  const dispatch = useAppDispatch()
  const { pairs } = useAppSelector(state => state.PoolsSlice)
  const { tokens } = useAppSelector(state => state.CurrencyReservsSlice)
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
  // This is state for modal of coins list
  const [coinModal, setCoinModal] = useState(false)

  // This is state from redux with selected coins in first and second inputs
  const { firstCoin, secondCoin } = useAppSelector(state => state.SwapDetailsSlice)

  //
  // This is state used for identifying on which coin slector we clicked
  const [selectedSwapField, setSelectedSwapField] = useState('')

  //
  // This is states for trade value in input
  const [inputValue, setInputValue] = useState(+'')

  useEffect(() => {
    if (!pairs.length) {
      dispatch(pairsInit(tokens))
    }
  }, [dispatch, pairs.length, tokens])

  const { error, lpBalance } = useAppSelector(state => state.UserSlice)
  const currentPair: CoinId | undefined = lpBalance.find(
    pair => pair.id === `${firstCoin.coin.name} - ${secondCoin.coin.name}`
  )
  const secondCoinOutput = (
    ((inputValue / 2) * +(currentPair?.price || 0)) /
    secondCoin.coin.price
  ).toFixed(2)
  const firstCoinOutput = (
    ((inputValue / 2) * +(currentPair?.price || 0)) /
    firstCoin.coin.price
  ).toFixed(2)
  return (
    <>
      <Card>
        <section className={styles['redeem']}>
          <header className={styles['header']}>
            <h1>Redeem LP</h1>
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
            <div className={styles['chooseBtns']}>
              <ChooseCoinBtn
                id={'firstSwapCoinSelector'}
                coinModal={coinModal}
                setCoinModal={setCoinModal}
                selectedCoin={firstCoin.coin}
                setSelectedSwapField={setSelectedSwapField}
              />
              <ChooseCoinBtn
                id={'secondSwapCoinSelector'}
                coinModal={coinModal}
                setCoinModal={setCoinModal}
                selectedCoin={secondCoin.coin}
                setSelectedSwapField={setSelectedSwapField}
              />
            </div>
            {firstCoin.coin.name && secondCoin.coin.name && (
              <>
                <div className={styles['amount']}>
                  <div className={styles['balance']}>
                    <h2>Redeem Amount</h2>
                    <h6>Balance LP: {currentPair?.balance || 0}</h6>
                  </div>
                  <p className={styles['input']}>
                    <SwapInput
                      disabled={firstCoin.coin.id && secondCoin.coin.id ? false : true}
                      swapInputValue={firstCoin.coin.id && secondCoin.coin.id ? inputValue : -1}
                      onChangeValueInput={e => setInputValue(+e.target.value)}
                    />
                  </p>
                </div>
                <div className={styles['output']}>
                  <h2>Output</h2>
                  <div className={styles['coins']}>
                    <div className={styles['coin']}>
                      <div className={styles['coinPreview']}>
                        <img src={firstCoin.coin.picture} alt={firstCoin.coin.name} />
                        {firstCoin.coin.name}
                      </div>{' '}
                      {firstCoinOutput}
                    </div>
                    <div className={styles['coin']}>
                      <div className={styles['coinPreview']}>
                        <img src={secondCoin.coin.picture} alt={secondCoin.coin.name} />
                        <span>{secondCoin.coin.name}</span>
                      </div>{' '}
                      {secondCoinOutput}
                    </div>
                  </div>
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
                  lpCheck({
                    firstCoin,
                    secondCoin,
                    tradeValue: inputValue,
                  })
                )
                dispatch(
                  removeLpBalance({
                    firstCoin,
                    secondCoin,
                    // fee,
                    inputLpValue: inputValue,
                    lpPrice: currentPair?.price || 0,
                  })
                )
                dispatch(
                  removeCurrentLiquidity({
                    id: `${firstCoin.coin.name} - ${secondCoin.coin.name}`,
                    currentLiquidity: inputValue * (currentPair?.price || 0),
                    error,
                  })
                )
              }}
              title='Redeem LP'
            />
          </footer>
        </section>
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
    </>
  )
}

export default RedeemLp

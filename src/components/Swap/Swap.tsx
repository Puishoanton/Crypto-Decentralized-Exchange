import { useRef, useState } from 'react'
import { useInputsChange } from 'src/hooks/useInputsChange'
import { useModalCoinList } from 'src/hooks/useModalCoinList'
import { findToken } from 'src/utils/findTokenOfSelector'
import Apt from '../../assets/apt.svg'
import arrowUp from '../../assets/arrow-up.svg'
import swap from '../../assets/swap.svg'
import CoinField from '../CoinField/CoinField'
import CoinList from '../CoinList/CoinList'
import Slippage from '../Slippage/Slippage'
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import styles from './Swap.module.scss'

const coins = [
  { id: 1, name: 'APT', price: 4, picture: Apt },
  { id: 2, name: 'USDT', price: 1, picture: Apt },
  { id: 3, name: 'BTC', price: 16600, picture: Apt },
  { id: 4, name: 'EHT', price: 1150, picture: Apt },
  { id: 5, name: 'BNB', price: 235, picture: Apt },
]

const Swap = () => {
  const [positionOfInputs, setPositionOfInputs] = useState(true)
  //
  // Setting window for slippage
  const [isSettingPopup, setIsSettingPopup] = useState(false)
  const settingRef = useRef(null)

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
  } = useModalCoinList(coins)
  //   2
  const {
    isCoinListShown: isCoinListShown1,
    setIsCoinListShown: setIsCoinListShown1,
    selectedToken: selectedToken1,
    setSelectedToken: setSelectedToken1,
    sortetCoinList: sortetCoinList1,
    coinListHandler: coinListHandler1,
    searchToken: searchToken1,
  } = useModalCoinList(coins)

  //
  // Selected token from modal
  const tokenFromSelector = findToken(coins, selectedToken)
  const tokenFromSelector1 = findToken(coins, selectedToken1)

  //
  // inputs onChange
  const { input1Handler, input2Handler, inputValue1, inputValue2 } = useInputsChange(
    tokenFromSelector,
    tokenFromSelector1
  )


  return (
    <>
      <form className={styles['swap']}>
        <header className={styles['header']}>
          <div>Swap</div>
          <Slippage
            isSettingPopup={isSettingPopup}
            setIsSettingPopup={setIsSettingPopup}
            settingRef={settingRef}
          />
        </header>
        <main className={styles['main']}>
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
          <div onClick={() => setPositionOfInputs(!positionOfInputs)} className={styles['change']}>
            <img src={positionOfInputs ? arrowUp : swap} alt='ArrowUp' />
          </div>
        </main>
        <footer className={styles['footer']}>
          <Button title='Connect wallet' />
        </footer>
      </form>
      <Modal isVisibleNotification={isCoinListShown} setIsVisibleNotification={setIsCoinListShown}>
        <CoinList
          coins={coins}
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
          coins={coins}
          searchToken={searchToken1}
          setSelectedToken={setSelectedToken1}
          sortetCoinList={sortetCoinList1}
          setIsCoinListShown={setIsCoinListShown1}
        />
      </Modal>
    </>
  )
}

export default Swap

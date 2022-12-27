import { FC, RefObject } from 'react'
import { useAppDispatch } from 'src/hooks/useRedux'
import settings from '../../assets/settings.svg'
import { setUpCurrentProcent } from '../../redux/reducers/SlippageSlice'
import Popup from '../UI/Popup/Popup'
import styles from './Slippage.module.scss'

type SlippageProps = {
  setIsPopup: (b: boolean) => void
  contentRef: RefObject<HTMLDivElement>
  openRef: RefObject<HTMLButtonElement>
  isPopup: boolean
  tolerance: number[]
  current: number
  slippageInputValue: number | string
  setSlippageInputValue: (value: number | string) => void
}

const Slippage: FC<SlippageProps> = ({
  setIsPopup,
  contentRef,
  openRef,
  isPopup,
  current,
  setSlippageInputValue,
  slippageInputValue,
  tolerance,
}) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <button
        ref={openRef}
        className={styles['slippage']}
        onClick={e => {
          e.preventDefault()
          setIsPopup(!isPopup)
        }}>
        <img src={settings} alt='Settings' />
      </button>
      <Popup divRef={contentRef} isOpen={isPopup} classes={'slippage-modal'}>
        <header className={styles['slippage-header']}>Settings</header>
        <main className={styles['slippage-main']}>
          <div className={styles['slippage-tolerance']}>
            <span>Slippage Tolerance:</span>
            <div className={styles['btns']}>
              {tolerance.map(btn => (
                <button
                  onClick={e => {
                    e.preventDefault()
                    dispatch(setUpCurrentProcent(btn))
                    setSlippageInputValue(btn)
                  }}
                  className={styles['porcent']}
                  key={btn}>
                  {btn}%
                </button>
              ))}
            </div>
          </div>
          <div className={styles['auto-custom-tolerance']}>
            <button
              onClick={e => {
                e.preventDefault()
                setSlippageInputValue(0.5)
                dispatch(setUpCurrentProcent(0.5))
              }}
              title='Auto'>
              Auto{' '}
            </button>
            <input
              value={slippageInputValue}
              onChange={e => {
                setSlippageInputValue(e.target.value)
                dispatch(setUpCurrentProcent(+e.target.value))
              }}
              placeholder='0.5%'
              type='number'
            />
            %
          </div>
        </main>
      </Popup>
    </>
  )
}

export default Slippage

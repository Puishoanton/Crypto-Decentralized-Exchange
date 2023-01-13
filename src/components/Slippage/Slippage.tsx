import { Dispatch, FC, RefObject, SetStateAction } from 'react'
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
  setSlippageInputValue: Dispatch<SetStateAction<number | string>>
}

const Slippage: FC<SlippageProps> = props => {
  const dispatch = useAppDispatch()

  return (
    <>
      <button
        ref={props.openRef}
        className={styles['slippage']}
        onClick={e => {
          e.preventDefault()
          props.setIsPopup(!props.isPopup)
        }}>
        <img src={settings} alt='Settings' />
      </button>
      <Popup divRef={props.contentRef} isOpen={props.isPopup} classes={'slippage-modal'}>
        <header className={styles['slippage-header']}>Settings</header>
        <main className={styles['slippage-main']}>
          <div className={styles['slippage-tolerance']}>
            <span>Slippage Tolerance:</span>
            <div className={styles['btns']}>
              {props.tolerance.map(btn => (
                <button
                  onClick={e => {
                    e.preventDefault()
                    dispatch(setUpCurrentProcent(btn))
                    props.setSlippageInputValue(btn)
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
                props.setSlippageInputValue(0.5)
                dispatch(setUpCurrentProcent(0.5))
              }}
              title='Auto'>
              Auto{' '}
            </button>
            <input
              value={props.slippageInputValue}
              onChange={e => {
                props.setSlippageInputValue(e.target.value)
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

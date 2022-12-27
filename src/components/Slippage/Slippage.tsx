import { FC, RefObject, useState } from 'react'
import styles from './Slippage.module.scss'
import settings from '../../assets/settings.svg'
import Popup from '../UI/Popup/Popup'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { setUpCurrentProcent } from '../../redux/reducers/SlippageSlice'

type SlippageProps = {
  setIsSettingPopup: (b: boolean) => void
  settingRef: RefObject<HTMLDivElement>
  isSettingPopup: boolean
}

const Slippage: FC<SlippageProps> = ({ setIsSettingPopup, settingRef, isSettingPopup }) => {
  const { tolerance, current } = useAppSelector(state => state.SlippageSlice)
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<number | string>(current)
  return (
    <>
      <button
        className={styles['slippage']}
        onClick={e => {
          e.preventDefault()
          setIsSettingPopup(!isSettingPopup)
        }}>
        <img src={settings} alt='Settings' />
      </button>
      <Popup divRef={settingRef} isOpen={isSettingPopup} classes={'slippage-modal'}>
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
                    setValue(btn)
                    console.log(current)
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
                setValue(0.5)
                dispatch(setUpCurrentProcent(0.5))
              }}
              title='Auto'>
              Auto{' '}
            </button>
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder='0.5%'
              type='number'
            />
          </div>
        </main>
      </Popup>
    </>
  )
}

export default Slippage

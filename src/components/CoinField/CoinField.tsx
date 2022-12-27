import { FC } from 'react'
import { CoinsType } from 'src/@types'
import arrow from '../../assets/arrow.svg'
import styles from './CoinField.module.scss'

type CoinFieldProps = {
  classes: string
  tokenFromSelector: CoinsType
  tokenFromSelector1: CoinsType
  inputValue: number | string
  inputHandler: (e: any) => void
  coinListHandler: (e: any) => void
  isCoinListShown: boolean
  fieldNumber: number
}

const CoinField: FC<CoinFieldProps> = ({
  classes,
  tokenFromSelector,
  tokenFromSelector1,
  inputValue,
  inputHandler,
  coinListHandler,
  isCoinListShown,
  fieldNumber,
}) => {
  return (
    <div className={[styles['input'], styles[classes]].join(' ')}>
      <input
        disabled={!tokenFromSelector || !!!tokenFromSelector1}
        placeholder='0.0'
        type='number'
        value={inputValue}
        onChange={e => inputHandler(e)}
      />
      <button onClick={e => coinListHandler(e)} className={styles['select-coin']}>
        {fieldNumber === 1 ? (
          tokenFromSelector ? (
            <img className={styles['coin']} src={tokenFromSelector.picture} alt='TokenIcon' />
          ) : null
        ) : tokenFromSelector1 ? (
          <img className={styles['coin']} src={tokenFromSelector1.picture} alt='TokenIcon' />
        ) : null}
        <span>
          {fieldNumber === 1
            ? tokenFromSelector?.name || 'Select token'
            : tokenFromSelector1?.name || 'Select token'}{' '}
        </span>
        <img
          className={
            isCoinListShown ? [styles['arrow'], styles['arrow-open']].join(' ') : styles['arrow']
          }
          src={arrow}
          alt='Arrow'
        />
      </button>
    </div>
  )
}

export default CoinField

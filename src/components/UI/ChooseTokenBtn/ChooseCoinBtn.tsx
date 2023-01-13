import { FC } from 'react'
import { CoinsType } from 'src/models'
import styles from './ChooseTokenBtn.module.scss'
import arrow from '../../../assets/arrow.svg'

type ChooseCoinBtnProps = {
  id: string
  coinModal: boolean
  setCoinModal: (b: boolean) => void
  selectedCoin: CoinsType
  setSelectedSwapField: (field: string) => void
}

const ChooseCoinBtn: FC<ChooseCoinBtnProps> = props => {
  return (
    <button
      id={props.id}
      onClick={(e: any) => {
        e.preventDefault()
        props.setCoinModal(true)
        props.setSelectedSwapField(e.target.id)
      }}
      className={styles['select-coin']}>
      {props.selectedCoin.picture && (
        <img
          id={props.id}
          className={styles['coin']}
          src={props.selectedCoin.picture}
          alt={props.selectedCoin.name}
        />
      )}
      <span id={props.id}>{props.selectedCoin.name || 'Select token'}</span>
      <img
        id={props.id}
        className={
          props.coinModal ? [styles['arrow'], styles['arrow-open']].join(' ') : styles['arrow']
        }
        src={arrow}
        alt='Arrow'
      />
    </button>
  )
}

export default ChooseCoinBtn

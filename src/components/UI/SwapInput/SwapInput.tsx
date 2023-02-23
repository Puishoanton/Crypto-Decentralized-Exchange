import { ChangeEvent, FC } from 'react'
import styles from './SwapInput.module.scss'

type SwapInputProps = {
  disabled: boolean
  swapInputValue: number
  onChangeValueInput: (e: ChangeEvent<HTMLInputElement>) => void
}

const SwapInput: FC<SwapInputProps> = props => {
  return (
    <input
      maxLength={7}
      disabled={props.disabled}
      className={styles['swap-input']}
      placeholder='0,0'
      type='number'
      value={props.swapInputValue === -1 ? '' : props.swapInputValue}
      onChange={e => props.onChangeValueInput(e)}
    />
  )
}

export default SwapInput

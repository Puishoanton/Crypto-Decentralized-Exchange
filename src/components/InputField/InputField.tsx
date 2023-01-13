import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { CoinsType } from 'src/models'
import ChooseCoinBtn from '../UI/ChooseTokenBtn/ChooseCoinBtn'
import SwapInput from '../UI/SwapInput/SwapInput'
import styles from './InputField.module.scss'

type InputFieldProps = {
  disabled: boolean
  id: string
  coinModal: boolean
  setCoinModal: Dispatch<SetStateAction<boolean>>
  selectedCoin: CoinsType
  inputValue: number
  // setInputValue: Dispatch<SetStateAction<number>>
  // setInputValueOpositInput: Dispatch<SetStateAction<number>>
  // setupTradeValueAction: (inputValue: number) => void
  // setupTradeValueActionForOpositInput: (inputValue: number) => void
  onChangeValueInput: (e: ChangeEvent<HTMLInputElement>) => void
  setSelectedSwapField: Dispatch<SetStateAction<string>>
}

const InputField: FC<InputFieldProps> = props => {
  return (
    <div className={styles['swap-field']}>
      <SwapInput
        disabled={props.disabled}
        onChangeValueInput={props.onChangeValueInput}
        // swapSetInputValue={props.setInputValue}
        swapInputValue={props.inputValue}
        // setupTradeValueAction={props.setupTradeValueAction}
        // setupTradeValueActionForOpositInput={props.setupTradeValueActionForOpositInput}
        // swapSetInputValueOpositInput={props.setInputValueOpositInput}
      />
      <ChooseCoinBtn
        id={props.id}
        coinModal={props.coinModal}
        setSelectedSwapField={props.setSelectedSwapField}
        selectedCoin={props.selectedCoin}
        setCoinModal={props.setCoinModal}
      />
    </div>
  )
}

export default InputField

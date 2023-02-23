import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { CoinsType, WalletId } from 'src/models'
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
  onChangeValueInput: (e: ChangeEvent<HTMLInputElement>) => void
  setSelectedSwapField: Dispatch<SetStateAction<string>>
  wallet: WalletId[]
}

const InputField: FC<InputFieldProps> = props => {
  const currentCoin = props.wallet.find(coin => coin.id === props.selectedCoin.name)

  return (
    <div className={styles['swap-field']}>
      <div className={styles['input-balance']}>
        <SwapInput
          disabled={props.disabled}
          onChangeValueInput={props.onChangeValueInput}
          swapInputValue={props.inputValue}
        />
        {props.selectedCoin.name && (
          <div className={styles['balance']}>
            Balance: {currentCoin?.balance} {props.selectedCoin.name}
          </div>
        )}
      </div>
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

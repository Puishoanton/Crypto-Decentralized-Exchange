import { ChangeEvent, FC } from 'react'
// import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
// import { priceCalc } from 'src/utils/priceCalc'
import styles from './SwapInput.module.scss'

type SwapInputProps = {
  disabled: boolean
  swapInputValue: number
  onChangeValueInput: (e: ChangeEvent<HTMLInputElement>) => void
  // swapSetInputValueOpositInput: (inputValue: number) => void
  // swapSetInputValue: (inputValue: number) => void
  // setupTradeValueAction: any
  // setupTradeValueActionForOpositInput: any
}

const SwapInput: FC<SwapInputProps> = props => {
  // const dispatch = useAppDispatch()
  // const { firstCoin, secondCoin } = useAppSelector(state => state.SwapDetailsSlice)

  // const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   props.swapSetInputValue(+e.target.value)
  //   props.swapSetInputValueOpositInput(
  //     +e.target.value !== 0
  //       ? +e.target.value *
  //           priceCalc(
  //             firstCoin.coin.CurrencyReservs,
  //             firstCoin.coin.CurrencyReservsUSDT,
  //             +e.target.value,
  //             secondCoin.coin.price
  //           )
  //       : 0
  //   )
  //   dispatch(props.setupTradeValueAction(+e.target.value))
  //   dispatch(
  //     props.setupTradeValueActionForOpositInput(
  //       +e.target.value !== 0
  //         ? +e.target.value *
  //             priceCalc(
  //               firstCoin.coin.CurrencyReservs,
  //               firstCoin.coin.CurrencyReservsUSDT,
  //               +e.target.value,
  //               secondCoin.coin.price
  //             )
  //         : 0
  //     )
  //   )
  // }

  return (
    <input
      disabled={props.disabled}
      className={styles['swap-input']}
      placeholder='0,0'
      type='number'
      value={props.swapInputValue}
      // onChange={e => onChangeValueInput(e)}
      onChange={e => props.onChangeValueInput(e)}
    />
  )
}

export default SwapInput

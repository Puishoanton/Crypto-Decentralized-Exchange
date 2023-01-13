import { CoinsType } from '../models/index'
import { useEffect, useState } from 'react'

export const useInputsChange = (tokenFromSelector: CoinsType, tokenFromSelector1: CoinsType) => {
  const [inputValue1, setInputValue1] = useState<number | string>('')
  const [inputValue2, setInputValue2] = useState<number | string>('')
  const input1Handler = (e: any) => {
    setInputValue1(+e.target.value)
    setInputValue2((+e.target.value * tokenFromSelector.price) / tokenFromSelector1.price)
  }
  const input2Handler = (e: any) => {
    setInputValue2(+e.target.value)
    setInputValue1((tokenFromSelector1.price * +e.target.value) / tokenFromSelector.price)
  }
  useEffect(() => {
    setInputValue1((tokenFromSelector1?.price * +inputValue2) / tokenFromSelector?.price || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenFromSelector])
  useEffect(() => {
    setInputValue2((tokenFromSelector?.price * +inputValue1) / tokenFromSelector1?.price || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenFromSelector1])

  return { input1Handler, input2Handler, inputValue1, inputValue2 }
}

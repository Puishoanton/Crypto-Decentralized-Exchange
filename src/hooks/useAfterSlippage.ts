import { useEffect, useState } from 'react'
export const useAfterSlippage = (currentSlippage: number, tradeValue: number) => {
  const [afterSlippageValue, setAfterSlippageValue] = useState(
    (tradeValue - tradeValue * (currentSlippage / 100)).toFixed(5) || 0
  )

  useEffect(() => {
    setAfterSlippageValue((tradeValue - tradeValue * (currentSlippage / 100)).toFixed(5))
  }, [tradeValue, currentSlippage])
  return afterSlippageValue
}

import React from 'react'
import Card from '../Card/Card'
import styles from './PageDescription.module.scss'

const PageDescription = () => {
  return (
    <Card>
      Welcome to Liquidswap Liquidswap is the biggest AMM on Aptos, the safest and most scalable L1
      blockchain. The DEX runs on Aptos mainnet. To start, bridge some crypto to Aptos using
      LayerZero or Wormhole Portal – or withdraw APT from a centralized exchange to an Aptos wallet.
      Liquidswap supports both regular uncorrelated swaps (like Uniswap) and stable swaps (like
      Curve). If you swap between USDT and USDC, you’ll be using the stable swap mode and a
      different liquidity curve to minimize slippage. To see your balance in Pontem Wallet, import
      the required token using the addresses published in Liquidswap Docs.
    </Card>
  )
}

export default PageDescription

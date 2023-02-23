import SwapPage from '../pages/SwapPage'
import Greating from 'src/pages/GreatingPage'
import AddLiquidityPage from 'src/pages/AddLiquidityPage'
import LPPage from 'src/pages/LPPage'
import PoolsPage from 'src/pages/PoolsPage'
import FaucetPage from 'src/pages/FaucetPage'

export const MAIN_PATH = '/'
export const SWAP_PATH = '/swap'
export const POOLS_PATH = '/pools'
export const ADD_LIQUIDITY_PATH = '/create-pools'
export const LP_PATH = '/redeem-lp'
export const FAUCET_PATH = '/FAUCET'

export const routes = [
  { path: MAIN_PATH, element: <Greating /> },
  { path: SWAP_PATH, element: <SwapPage /> },
  { path: POOLS_PATH, element: <PoolsPage /> },
  { path: ADD_LIQUIDITY_PATH, element: <AddLiquidityPage /> },
  { path: LP_PATH, element: <LPPage /> },
  { path: FAUCET_PATH, element: <FaucetPage /> },
]

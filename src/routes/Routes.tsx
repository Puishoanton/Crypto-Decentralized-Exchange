import SwapPage from '../pages/SwapPage'
import Greating from 'src/pages/GreatingPage'
import CreatePoolPage from 'src/pages/CreatePoolPage'
import LPPage from 'src/pages/LPPage'
import PoolsPage from 'src/pages/PoolsPage'
import BridgePage from 'src/pages/BridgePage'

export const MAIN_PATH = '/'
export const SWAP_PATH = '/swap'
export const POOLS_PATH = '/pools'
export const CREATE_POOL_PATH = '/create-pools'
export const LP_PATH = '/redeem-lp'
export const BRIDGE_PATH = '/bridge'

export const routes = [
  { path: MAIN_PATH, element: <Greating /> },
  { path: SWAP_PATH, element: <SwapPage /> },
  { path: POOLS_PATH, element: <PoolsPage /> },
  { path: CREATE_POOL_PATH, element: <CreatePoolPage /> },
  { path: LP_PATH, element: <LPPage /> },
  { path: BRIDGE_PATH, element: <BridgePage /> },
]

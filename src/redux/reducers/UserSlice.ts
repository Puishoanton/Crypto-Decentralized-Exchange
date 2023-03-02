import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coin, CoinId, CoinsType, WalletId } from 'src/models'

type initialStateProps = {
  isConnected: boolean
  wallet: WalletId[]
  lpBalance: CoinId[] | []
  error: string
}
const initialState: initialStateProps = {
  isConnected: false,
  wallet: [
    { id: 'APT', balance: 100 },
    { id: 'USDT', balance: 100 },
    { id: 'BTC', balance: 100 },
    { id: 'ETH', balance: 100 },
    { id: 'BNB', balance: 100 },
    { id: 'TWT', balance: 100 },
    { id: 'GLMR', balance: 100 },
    { id: 'DOT', balance: 100 },
    { id: 'SOL', balance: 100 },
    { id: 'KSM', balance: 100 },
    { id: 'OP', balance: 100 },
    { id: 'STG', balance: 100 },
  ],
  lpBalance: [],
  error: '',
}

export const WalletMap = initialState.wallet.reduce((acc: { [key: string]: WalletId }, coin) => {
  acc[coin.id] = coin
  return acc
}, {})

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectWallet: state => {
      state.isConnected = !state.isConnected
    },
    userBalanceCheckForSwap: (
      state,
      action: PayloadAction<{
        firstCoin: Coin
        secondCoin: Coin
      }>
    ) => {
      const firstCoinWalletBalance = state.wallet.reduce((acc, coin) => {
        if (coin.id === action.payload.firstCoin.coin.name) {
          acc = coin.balance
          return acc
        }

        return acc
      }, 0)
      // const tradeValueInUsdt =
      //   action.payload.firstCoin.tradeValue * action.payload.firstCoin.coin.price
      // const secondCoinReservBalanceInUsdt =
      //   action.payload.secondCoin.coin.CurrencyReservs * action.payload.secondCoin.coin.price

      if (action.payload.firstCoin.tradeValue >= firstCoinWalletBalance) {
        state.error = `Insuficient ${action.payload.firstCoin.coin.name} balance`
      }
      // if (tradeValueInUsdt > secondCoinReservBalanceInUsdt) {
      //   state.error = `Insuficient ${action.payload.secondCoin.coin.name} reserv`
      // }
    },
    balanceCheck: (
      state,
      action: PayloadAction<{
        firstCoin: Coin
        secondCoin: Coin
      }>
    ) => {
      const selectedCoinsBalance = state.wallet.reduce(
        (acc, coin) => {
          if (coin.id === action.payload.firstCoin.coin.name) {
            acc.firstBalance = coin.balance
            return acc
          }

          if (coin.id === action.payload.secondCoin.coin.name) {
            acc.secondBalance = coin.balance
            return acc
          }

          return acc
        },
        {
          firstBalance: 0,
          secondBalance: 0,
        }
      )
      const isEnoughFirstCoin =
        selectedCoinsBalance.firstBalance > action.payload.firstCoin.tradeValue
      const isEnoughSecondCoin =
        selectedCoinsBalance.secondBalance >= action.payload.secondCoin.tradeValue

      if (!(isEnoughFirstCoin && isEnoughSecondCoin)) {
        isEnoughFirstCoin
          ? (state.error = `Insuficient ${action.payload.secondCoin.coin.name} balance`)
          : (state.error = `Insuficient ${action.payload.firstCoin.coin.name} balance`)
      }
    },
    lpCheck: (
      state,
      action: PayloadAction<{
        firstCoin: Coin
        secondCoin: Coin
        tradeValue: number
      }>
    ) => {
      const id = `${action.payload.firstCoin.coin.name} - ${action.payload.secondCoin.coin.name}`
      const currentPair: CoinId | undefined = state.lpBalance.find(pair => pair.id === id)

      if ((currentPair?.balance || 0) < action.payload.tradeValue)
        state.error = 'Insuficient LP balance'
    },
    errorCleaner: state => {
      state.error = ''
    },
    addLpBalance: (
      state,
      action: PayloadAction<{
        firstCoin: Coin
        secondCoin: Coin
        fee: string
      }>
    ) => {
      const id = `${action.payload.firstCoin.coin.name} - ${action.payload.secondCoin.coin.name}`
      const currentPair: CoinId | undefined = state.lpBalance.find(pair => pair.id === id)
      const userLiquidity =
        action.payload.firstCoin.tradeValue * action.payload.firstCoin.coin.price +
        action.payload.secondCoin.tradeValue * action.payload.secondCoin.coin.price
      const lpBalance = action.payload.firstCoin.tradeValue + action.payload.secondCoin.tradeValue
      const coinPair = {
        id,
        balance: action.payload.firstCoin.tradeValue + action.payload.secondCoin.tradeValue,
        price: userLiquidity / lpBalance,
      }
      const decreaseSelectedCoinBalance = (coin: WalletId) => {
        const isFirstCoinPresentInWallet = coin.id === action.payload.firstCoin.coin.name
        const isSecondCoinPresentInWallet = coin.id === action.payload.secondCoin.coin.name

        if (isFirstCoinPresentInWallet && !state.error) {
          coin.balance -= action.payload.firstCoin.tradeValue + +action.payload.fee
        }

        if (isSecondCoinPresentInWallet && !state.error) {
          coin.balance -= action.payload.secondCoin.tradeValue
        }

        return coin
      }
      state.wallet.map(decreaseSelectedCoinBalance)
      if (!state.lpBalance.length && !state.error) {
        state.lpBalance[0] = coinPair
        // state.lpBalance.push(coinPair)
      } else if (!currentPair && !state.error) {
        // state.lpBalance.push(coinPair)
        state.lpBalance = [...state.lpBalance, coinPair]
      } else if (currentPair && !state.error) {
        currentPair.balance +=
          action.payload.firstCoin.tradeValue + action.payload.secondCoin.tradeValue
      }
    },
    removeLpBalance: (
      state,
      action: PayloadAction<{
        firstCoin: Coin
        secondCoin: Coin
        // fee: string
        inputLpValue: number
        lpPrice: number
      }>
    ) => {
      const id = `${action.payload.firstCoin.coin.name} - ${action.payload.secondCoin.coin.name}`
      const currentPair: CoinId | undefined = state.lpBalance.find(pair => pair.id === id)
      const increaseSelectedCoinBalance = (coin: WalletId) => {
        const isFirstCoinPresentInWallet = coin.id === action.payload.firstCoin.coin.name
        const isSecondCoinPresentInWallet = coin.id === action.payload.secondCoin.coin.name

        if (isFirstCoinPresentInWallet && !state.error) {
          coin.balance +=
            ((action.payload.inputLpValue / 2) * action.payload.lpPrice) /
            action.payload.firstCoin.coin.price
          // coin.balance += action.payload.firstCoin.tradeValue - +action.payload.fee
        }

        if (isSecondCoinPresentInWallet && !state.error) {
          coin.balance +=
            ((action.payload.inputLpValue / 2) * action.payload.lpPrice) /
            action.payload.secondCoin.coin.price
        }

        return coin
      }
      state.wallet.map(increaseSelectedCoinBalance)

      if (currentPair && !state.error) {
        currentPair.balance -= action.payload.inputLpValue
      }
    },
    changeBalanceAfterSwapping: (
      state,
      action: PayloadAction<{
        firstCoin: Coin
        secondCoin: Coin
        fee: string
      }>
    ) => {
      if (!state.error) {
        state.wallet.map(coin =>
          coin.id === action.payload.firstCoin.coin.name
            ? (coin.balance -= action.payload.firstCoin.tradeValue + +action.payload.fee)
            : coin
        )
        state.wallet.map(coin =>
          coin.id === action.payload.secondCoin.coin.name
            ? (coin.balance += action.payload.secondCoin.tradeValue)
            : coin
        )
      }
    },
    faucet: (state, action: PayloadAction<CoinsType>) => {
      state.wallet.map(coin => (coin.id === action.payload.name ? (coin.balance += 100) : coin))
    },
  },
})

export default UserSlice.reducer
export const {
  addLpBalance,
  balanceCheck,
  errorCleaner,
  removeLpBalance,
  lpCheck,
  connectWallet,
  userBalanceCheckForSwap,
  changeBalanceAfterSwapping,
  faucet,
} = UserSlice.actions

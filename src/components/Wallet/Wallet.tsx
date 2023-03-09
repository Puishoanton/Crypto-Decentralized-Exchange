// import { FC } from 'react'
// import { WalletId } from 'src/models'
// import styles from './Wallet.module.scss'

// type WalletProps = {
//   wallet: WalletId[]
// }

// const Wallet: FC<WalletProps> = ({ wallet }) => {
//   return (
//     <section className={styles['wallet']}>
//       <header className={styles['account']}>
//         Account
//         <p>0x88DC...560</p>
//       </header>
//       <main className={styles['body']}>
//         {wallet.map(coin => (
//           <div key={coin.id}>
//             {coin.balance} {coin.id}
//           </div>
//         ))}
//       </main>
//       <footer className={styles['footer']}>Don't see you coins?</footer>
//     </section>
//   )
// }

// export default Wallet
import { useState } from 'react'
import { useAppSelector } from 'src/hooks/useRedux'
import styles from './Wallet.module.scss'

const Wallet = () => {
  const user = ''
  const network = [
    'Ethereum Chain',
    'Binance Smart Chain',
    'Bitcoin Chain',
    'Tron Chain',
    'Polkadot Chain',
    'Moonriver Chain',
    'Optimism Chain',
    'Solana Chain',
    'Layer Zero',
  ]
  const { history: transactions, wallet: assets } = useAppSelector(state => state.UserSlice)
  const [activeTab, setActiveTab] = useState('assets')
  const { tokens } = useAppSelector(state => state.CurrencyReservsSlice)
  const currentCoin = (id: string) => tokens.find(token => token.name === id)
  const totalBalance = assets
    .reduce((acc, asset) => acc + (currentCoin(asset.id)?.price || 0) * asset.balance, 0)
    .toFixed(2)

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['logo']}>Logo</div>
        <div className={styles['selector']}>
          <select className={styles['selector']}>
            {network.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className={styles['profile']}>
          <img src={user} alt='User' />
        </div>
      </div>
      <div className={styles['main']}>
        <div className={styles['user']}>
          <div className={styles['icon']}>
            <img src={user} alt='User' />
          </div>
          <div className={styles['balance']}>${totalBalance}</div>
          <div className={styles['actions']}>
            <button className={styles['action']}>Recieve</button>
            <button className={styles['action']}>Send</button>
            <button className={styles['action']}>Swap</button>
          </div>
        </div>
        <div className={styles['tabs']}>
          <div
            className={`${styles['tab']} ${activeTab === 'assets' ? styles['active'] : ''}`}
            onClick={() => setActiveTab('assets')}>
            Assets
          </div>
          <div
            className={`${styles['tab']} ${activeTab === 'transactions' ? styles['active'] : ''}`}
            onClick={() => setActiveTab('transactions')}>
            Transactions
          </div>
        </div>
        {activeTab === 'assets' && (
          <div className={styles['assets']}>
            {assets.map(asset => (
              <div key={asset.id} className={styles['asset']}>
                <div className={styles['assetName']}>
                  <img src={currentCoin(asset.id)?.picture} alt={currentCoin(asset.id)?.name} />
                  {asset.id}
                </div>
                <div className={styles['assetBalance']}>{asset.balance}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'transactions' && (
          <div className={styles['transactions']}>
            {transactions.map(transaction => (
              <div key={transaction} className={styles['transaction']}>
                {transaction}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles['footer']}>Don't see your token? Token import</div>
    </div>
  )
}

export default Wallet

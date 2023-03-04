import { FC } from 'react'
import { WalletId } from 'src/models'
import styles from './Wallet.module.scss'

type WalletProps = {
  wallet: WalletId[]
}

const Wallet: FC<WalletProps> = ({ wallet }) => {
  return (
    <section className={styles['wallet']}>
      <header className={styles['account']}>
        Account
        <p>0x88DC...560</p>
      </header>
      <main className={styles['body']}>
        {wallet.map(coin => (
          <div key={coin.id}>
            {coin.balance} {coin.id}
          </div>
        ))}
      </main>
      <footer className={styles['footer']}>Don't see you coins?</footer>
    </section>
  )
}

export default Wallet

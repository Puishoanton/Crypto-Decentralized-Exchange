import { FC } from 'react'
import styles from './Transactions.module.scss'

type TransProps = {
  transactions: string[]
}

const Transaction: FC<TransProps> = ({ transactions }) => {
  return (
    <div className={styles['transactions']}>
      {transactions.map(transaction => (
        <div key={transaction} className={styles['transaction']}>
          {transaction}
        </div>
      ))}
    </div>
  )
}

export default Transaction

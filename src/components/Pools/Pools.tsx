import { useEffect } from 'react'
import { useAppSelector } from 'src/hooks/useRedux'
import { CoinsType } from 'src/models'
import Pool from './Pool'
import styles from './Pools.module.scss'

const Pools = () => {
  const { tokens } = useAppSelector(state => state.CurrencyReservsSlice)

  const pairs = tokens.reduce((acc, coin, index) => {
    for (let i = index + 1; i < tokens.length; i++) {
      acc.push([coin, tokens[i]])
    }
    return acc
  }, [] as [CoinsType, CoinsType][])

  return (
    <section className={styles['pairs']}>
      <Pool pairs={pairs} />
    </section>
  )
}

export default Pools

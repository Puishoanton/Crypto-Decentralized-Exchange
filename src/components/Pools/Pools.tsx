import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { pairsInit } from 'src/redux/reducers/PoolsSlice'
import Pool from './Pool'
import styles from './Pools.module.scss'

const Pools = () => {
  const { tokens } = useAppSelector(state => state.CurrencyReservsSlice)
  const dispatch = useAppDispatch()
  const { pairs } = useAppSelector(state => state.PoolsSlice)
  const { lpBalance } = useAppSelector(state => state.UserSlice)
  useEffect(() => {
    if (!pairs.length) {
      dispatch(pairsInit(tokens))
    }
  }, [dispatch, pairs.length, tokens])
  return (
    <>
      <h1 className={styles['header']}>Liquidity pools </h1>
      <ul className={styles['pairs']}>
        <Pool pairs={pairs} lpBalance={lpBalance} />
      </ul>
    </>
  )
}

export default Pools

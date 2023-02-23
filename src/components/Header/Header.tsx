import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { NavigationType } from 'src/models'
import { connectWallet } from 'src/redux/reducers/UserSlice'
import {
  ADD_LIQUIDITY_PATH,
  FAUCET_PATH,
  LP_PATH,
  MAIN_PATH,
  POOLS_PATH,
  SWAP_PATH,
} from 'src/routes/Routes'
import notification from '../../assets/notification.svg'
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import Selector from '../UI/Selector/Selector'
import styles from './Header.module.scss'

const Header = () => {
  const services: NavigationType[] = [
    { title: 'Swap', path: SWAP_PATH },
    { title: 'Pools', path: POOLS_PATH },
    { title: 'Add Liquidity', path: ADD_LIQUIDITY_PATH },
    { title: 'Redeem LP', path: LP_PATH },
    { title: 'Faucet', path: FAUCET_PATH },
  ]
  const windowOuterWidth = window.outerWidth
  const [isVisibleNotification, setIsVisibleNotification] = useState(false)
  const dispatch = useAppDispatch()
  const { isConnected, wallet } = useAppSelector(state => state.UserSlice)
  const [isVisibleWallet, setIsVisibleWallet] = useState(false)

  return (
    <>
      <header className={styles['header']}>
        <Link to={MAIN_PATH} className={styles['logo']}>
          Logo
        </Link>
        {windowOuterWidth >= 768 ? (
          <ul className={styles['navigation']}>
            {services.map((opt: NavigationType, index: number) => (
              <li className={styles['link']} key={opt.title}>
                <Link to={opt.path}>{opt.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles['selector']}>
            <Selector options={services} />
          </div>
        )}

        <div className={styles['notification-wallet']}>
          <button
            onClick={() => {
              setIsVisibleNotification(!isVisibleNotification)
            }}
            className={styles['notification']}>
            <img src={notification} alt='Notification' />
          </button>
          {isConnected ? (
            <div className={styles['profile']} onClick={() => setIsVisibleWallet(!isVisibleWallet)}>
              <div className={styles['avatar']}></div>
              <p>0x88DC...560</p>
            </div>
          ) : (
            <Button
              title='Connect a Wallet'
              className='wallet'
              onClick={() => dispatch(connectWallet())}
            />
          )}
        </div>
      </header>
      <Modal
        isVisibleNotification={isVisibleNotification}
        setIsVisibleNotification={setIsVisibleNotification}
      />
      <Modal isVisibleNotification={isVisibleWallet} setIsVisibleNotification={setIsVisibleWallet}>
        {wallet.map(coin => (
          <div key={coin.id}>
            {coin.id} - {coin.balance}
          </div>
        ))}
      </Modal>
    </>
  )
}

export default Header

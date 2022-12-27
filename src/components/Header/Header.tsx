import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavigationType } from 'src/types'
import {
  BRIDGE_PATH,
  CREATE_POOL_PATH,
  LP_PATH,
  MAIN_PATH,
  POOLS_PATH,
  SWAP_PATH,
} from 'src/routes/Routes'
import notification from '../../assets/notification.svg'
import Button from '../../components/UI/Button/Button'
import Modal from '../../components/UI/Modal/Modal'
import Selector from '../../components/UI/Selector/Selector'
import styles from './Header.module.scss'

const Header = () => {
  const services: NavigationType[] = [
    { title: 'Swap', path: SWAP_PATH },
    { title: 'Pools', path: POOLS_PATH },
    { title: 'Create Pool', path: CREATE_POOL_PATH },
    { title: 'Redeem LP', path: LP_PATH },
    { title: 'Bridge', path: BRIDGE_PATH },
  ]
  const windowOuterWidth = window.outerWidth
  const [isVisibleNotification, setIsVisibleNotification] = useState(false)
  return (
    <>
      <header className={styles['header']}>
        <Link to={MAIN_PATH} className={styles['logo']}>
          Logo
        </Link>
        {windowOuterWidth >= 768 ? (
          <nav className={styles['navigation']}>
            <div className={[styles['swap'], styles['link']].join(' ')}>Swap</div>
            <div className={[styles['pool'], styles['link']].join(' ')}>Pools</div>
            <div className={[styles['create-pool'], styles['link']].join(' ')}>Create Pool</div>
            <div className={[styles['redeem-LP'], styles['link']].join(' ')}>Redeem LP</div>
            <div className={[styles['bridge'], styles['link']].join(' ')}>Bridge</div>
          </nav>
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
          <Button title='Connect a Wallet' className='wallet' />
        </div>
      </header>
      <Modal
        isVisibleNotification={isVisibleNotification}
        setIsVisibleNotification={setIsVisibleNotification}
      />
    </>
  )
}

export default Header

import { FC } from 'react'
import styles from './Modal.module.scss'

type ModalProps = {
  children?: any
  isVisibleNotification: boolean
  setIsVisibleNotification: (bol: boolean) => void
}

const Modal: FC<ModalProps> = ({ children, isVisibleNotification, setIsVisibleNotification }) => {
  const rootClass = [styles['modal']]
  isVisibleNotification && rootClass.push(styles['show-modal'])
  return (
    <div className={rootClass.join(' ')}>
      <div onClick={() => setIsVisibleNotification(false)} className={styles['background']} />
      <div className={styles['content']}>{children || <div>Lorem ipsum dolor sit amet.</div>}</div>
    </div>
  )
}

export default Modal

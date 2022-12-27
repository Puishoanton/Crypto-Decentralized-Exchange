import { FC, ReactNode, RefObject } from 'react'
import styles from './Popup.module.scss'

type PopupProps = {
  children: ReactNode
  isOpen: boolean
  divRef?: RefObject<HTMLDivElement>
  classes: string
}

const Popup: FC<PopupProps> = ({ children, classes, isOpen, divRef }) => {
  const rootPopup = [styles.popup, styles[classes]]
  isOpen && rootPopup.push(styles.active)
  return (
    <div ref={divRef} className={rootPopup.join(' ')}>
      {children}
    </div>
  )
}

export default Popup

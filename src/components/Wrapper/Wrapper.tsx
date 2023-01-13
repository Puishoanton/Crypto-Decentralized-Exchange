import { FC, ReactNode } from 'react'
import styles from './Wrapper.module.scss'

type WrapperProps = {
  children: any
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <main className={styles['main']}>{children}</main>
}

export default Wrapper

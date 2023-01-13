import { FC, ReactNode } from 'react'
import styles from './Card.module.scss'

type CardProps = {
  children: ReactNode
}

const Card: FC<CardProps> = ({ children }) => {
  return <section className={styles['card']}>{children}</section>
}

export default Card

import { FC } from 'react'
import styles from './Main.module.scss'

type MainProps = {
  children: any
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <>
      <main className={styles['main']}>
        <section className={styles['card']}>{children}</section>
        <div className={styles['info']}></div>
      </main>
    </>
  )
}

export default Main

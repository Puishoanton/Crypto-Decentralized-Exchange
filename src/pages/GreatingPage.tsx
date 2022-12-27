import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/UI/Button/Button'
import { SWAP_PATH } from 'src/routes/Routes'
import styles from '../components/Main/Main.module.scss'

const Greating = () => {
  return (
    <>
      <header className={styles['header']}>
        Welcome <br /> to my pet project!
      </header>
      <main className={styles['main-content']}>
        This is a decentralized exchange invented by me.
      </main>
      <footer className={styles['start']}>
        <Link to={SWAP_PATH}>
          <Button title="Let's start!" />
        </Link>
      </footer>
    </>
  )
}

export default Greating

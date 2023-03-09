import { Link } from 'react-router-dom'
import Card from 'src/components/Card/Card'
import Button from 'src/components/UI/Button/Button'
import { SWAP_PATH } from 'src/routes/Routes'
import styles from '../components/Card/Card.module.scss'

const Greating = () => {
  return (
    <Card>
      <header className={styles['header']}>
        Welcome <br /> to my pet project!
      </header>
      <main className={styles['main-content']}>
        This is a decentralized exchange invented by me. Here you can try how the DEX works, make
        Swaps, add liquidity to pools and redeem it, and request coins from the faucet. During the
        development of this DEX, I learned how exchanges work.
      </main>
      <footer className={styles['start']}>
        <Link to={SWAP_PATH}>
          <Button title="Let's start!" />
        </Link>
      </footer>
    </Card>
  )
}

export default Greating

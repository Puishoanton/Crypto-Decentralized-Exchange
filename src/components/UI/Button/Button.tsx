import { FC } from 'react'
import { useAppSelector } from 'src/hooks/useRedux'
import styles from './Button.module.scss'

type ButtonProps = {
  title: string
  className?: string
  onClick?: (e?: any) => void
}

const Button: FC<ButtonProps> = ({ title, className, onClick }) => {
  const { isConnected } = useAppSelector(state => state.UserSlice)
  return (
    <button
      disabled={!isConnected}
      onClick={onClick}
      className={[styles['button'], styles[className || ''], isConnected ? '' : styles['disabled'] ].join(' ')}>
      {isConnected ? title : 'Find the button for connecting wallet'}
    </button>
  )
}

export default Button

import React, { FC } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  title: string
  className?: string
  onClick?: (e?: any) => void
}

const Button: FC<ButtonProps> = ({ title, className, onClick }) => {
  return (
    <button onClick={onClick} className={[styles['button'], styles[className || '']].join(' ')}>
      {title}
    </button>
  )
}

export default Button

import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavigationType } from 'src/@types'
import { useOutside } from 'src/hooks/useOutside'

import arrow from '../../../assets/arrow.svg'

interface SelectorProps {
  options: NavigationType[]
}

const Selector: FC<SelectorProps> = ({ options }) => {
  const [currentOption, setCurrentOption] = useState(0)
  const { contentRef, isShow, openRef, setIsShow } = useOutside(false)
  return (
    <>
      <div ref={openRef} onClick={() => setIsShow(!isShow)}>
        <div>{options[currentOption].title}</div>
        <img
          style={{ transform: `${isShow ? 'rotate(0deg)' : 'rotate(180deg)'}` }}
          width={16}
          height={16}
          src={arrow}
          alt='Arrow'
        />
      </div>
      <ul ref={contentRef} style={{ display: isShow ? 'block' : 'none' }}>
        {options.map((opt: NavigationType, index: number) => (
          <li
            key={opt.title}
            onClick={() => {
              setIsShow(false)
              setCurrentOption(index)
            }}>
            <Link to={opt.path}>{opt.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Selector

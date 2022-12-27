import { useEffect, useRef, useState } from 'react'
export const useOutside = (isVisible: boolean) => {
  const [isShow, setIsShow] = useState(isVisible)
  const openRef = useRef<any>(null)
  const contentRef = useRef<any>(null)
  const clickHandle = ({ target }: any): void => {
    if (
      openRef &&
      !openRef.current?.contains(target as Node) &&
      !contentRef.current?.contains(target as Node)
    ) {
      setIsShow(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', clickHandle)
    return () => {
      document.removeEventListener('click', clickHandle)
    }
  }, [])
  return {
    openRef,
    contentRef,
    isShow,
    setIsShow,
  }
}

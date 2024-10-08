import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

const useCustomWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: undefined | number
    height: undefined | number
  }>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 200)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

export default useCustomWindowSize

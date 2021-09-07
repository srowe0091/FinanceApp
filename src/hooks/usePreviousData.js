import { useRef, useEffect } from 'react'

export const usePreviousData = data => {
  const ref = useRef(null)

  useEffect(() => {
    if (data !== null) {
      ref.current = data
    }
  }, [data])

  return data || ref.current
}

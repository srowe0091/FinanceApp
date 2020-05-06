import { useState, useCallback } from 'react'

export const useToolbarTransition = () => {
  const [toolbarTransition, toggleStyle] = useState(false)
  const scrollHandler = useCallback(e => toggleStyle(e.detail.scrollTop > 30), [])

  return { toolbarTransition, scrollHandler }
}
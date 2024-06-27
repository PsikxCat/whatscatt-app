import { useState, useEffect, useRef, useCallback } from 'react'

interface ComponentVisibleHook {
  ref: React.RefObject<HTMLDivElement>
  isComponentVisible: boolean
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useComponentVisible(initialIsVisible: boolean): ComponentVisibleHook {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsComponentVisible(false)
      }
    },
    [ref],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [handleClickOutside])

  return { ref, isComponentVisible, setIsComponentVisible }
}

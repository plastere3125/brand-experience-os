'use client'
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

export type RealityMode = 'structure' | 'perspective'

type RealityContextType = {
  mode: RealityMode
  shift: () => void
  reset: () => void
}

const RealityContext = createContext<RealityContextType>({
  mode: 'structure',
  shift: () => {},
  reset: () => {},
})

export function RealityProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<RealityMode>('structure')

  useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])

  const shift = useCallback(() => setMode('perspective'), [])
  const reset = useCallback(() => setMode('structure'), [])

  return (
    <RealityContext.Provider value={{ mode, shift, reset }}>
      {children}
    </RealityContext.Provider>
  )
}

export const useReality = () => useContext(RealityContext)

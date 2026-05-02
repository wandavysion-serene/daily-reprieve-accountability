'use client'

import { useEffect, useRef, useState } from 'react'

type TimerProps = {
  initialMinutes?: number
}

export default function Timer({ initialMinutes = 5 }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60)
  const [running, setRunning] = useState(false)

  const intervalRef = useRef<number | null>(null)

  const start = () => {
    if (running) return

    setRunning(true)

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const pause = () => {
    if (!intervalRef.current) return

    clearInterval(intervalRef.current)
    intervalRef.current = null
    setRunning(false)
  }

  const reset = () => {
    pause()
    setSecondsLeft(initialMinutes * 60)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const format = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        cursor: 'move',
        userSelect: 'none',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* DISPLAY (always visible once rendered) */}
      <div
        style={{
          fontSize: '3rem',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        {format(secondsLeft)}
      </div>

      {/* CONTROLS (static, NOT draggable) */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
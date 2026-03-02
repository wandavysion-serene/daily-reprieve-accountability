'use client'

import { useState, useEffect, useRef } from 'react'

interface TimerProps {
  startSeconds?: number
}

export default function Timer({ startSeconds = 0 }: TimerProps) {
  const [seconds, setSeconds] = useState(startSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  // Start timer
  const startTimer = () => {
    if (!running) {
        setRunning(true)
        intervalRef.current = window.setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalRef.current!)
                    setRunning(false)
                    return 0
                }
            return prev - 1
            })
        }, 1000)
    }
  }
  // Pause timer
  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setRunning(false)
    }
  }

  // Reset timer
  const resetTimer = () => {
    pauseTimer() // stop the interval
    setSeconds(startSeconds) // reset to original starting value
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Convert seconds to mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0')
    const s = (sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        style={{
          fontSize: '3rem',
          margin: '2rem 0',
          fontWeight: 600,
        }}
      >
        {formatTime(seconds)}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={startTimer}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Start
        </button>

        <button
          onClick={pauseTimer}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Pause
        </button>

        <button
          onClick={resetTimer}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </main>
  )
}
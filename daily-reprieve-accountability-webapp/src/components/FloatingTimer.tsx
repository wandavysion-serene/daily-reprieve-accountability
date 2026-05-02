'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  initialMinutes: number
  onClose?: () => void
}

export default function FloatingTimer({ initialMinutes, onClose }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60)
  const [running, setRunning] = useState(false)

  const intervalRef = useRef<number | null>(null)

  const [pos, setPos] = useState({ x: 100, y: 100 })
  const dragRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })

  // TIMER LOGIC
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

  const format = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  // DRAG LOGIC
  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = true
    offsetRef.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!dragRef.current) return
    setPos({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    })
  }

  const onMouseUp = () => {
    dragRef.current = false
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        top: pos.y,
        left: pos.x,
        zIndex: 9999,
        cursor: 'grab',
        fontFamily: 'var(--font-body)',
        background: 'rgba(255,255,255,0.95)',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* DISPLAY */}
      <div style={{ fontSize: '3rem', textAlign: 'center' }}>
        {format(secondsLeft)}
      </div>

      {/* CONTROLS */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
        {onClose && <button onClick={onClose}>Close</button>}
      </div>
    </div>
  )
}
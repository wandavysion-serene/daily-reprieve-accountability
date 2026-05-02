'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { meetingFlow, Step } from '@/lib/meetingFlow'
import Image from 'next/image'

export default function StepPage() {
  const router = useRouter()
  const params = useParams()

  const stepParam = Array.isArray(params?.step)
    ? params.step[0]
    : params?.step

  const currentStep: Step | undefined = meetingFlow.find(
    (s) => s.id.toLowerCase() === stepParam?.toLowerCase()
  )

  if (!currentStep) return <p>Step not found.</p>

  // ----------------------------
  // STATE
  // ----------------------------
  const [newcomerPresent, setNewcomerPresent] = useState(false)

  // TIMER (host-controlled minutes)
  const [minutes, setMinutes] = useState(
    Math.floor((currentStep.timerSeconds ?? 0) / 60)
  )

  const [secondsLeft, setSecondsLeft] = useState(minutes * 60)
  const [running, setRunning] = useState(false)

  const intervalRef = useRef<number | null>(null)

  // DRAG STATE (ONLY FOR TIMER)
  const [pos, setPos] = useState({ x: 120, y: 120 })
  const dragRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })

  // ----------------------------
  // TIMER LOGIC
  // ----------------------------
  const startTimer = () => {
    if (running) return

    setSecondsLeft(minutes * 60)
    setRunning(true)

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          intervalRef.current = null
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setRunning(false)
  }

  const resetTimer = () => {
    pauseTimer()
    setSecondsLeft(minutes * 60)
  }

  // ----------------------------
  // DRAGGING (ONLY TIMER)
  // ----------------------------
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

  // ----------------------------
  // NAVIGATION
  // ----------------------------
  const isFinalStep = !currentStep.next

  const handleNext = () => {
    if (currentStep.next) {
      router.push(`/meeting/${currentStep.next}`)
    }
  }

  const showNewcomerChoice = stepParam === 'newcomer-check'

  // ----------------------------
  // FORMAT
  // ----------------------------
  const format = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* TOP INSTRUCTION */}
      <p
        style={{
          fontSize: '1.2rem',
          textAlign: 'center',
          whiteSpace: 'pre-line',
          marginBottom: '0.1rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        Please turn your cameras off and mute yourselves so that we don’t disturb one another
      </p>

      {/* CONTENT */}
      {currentStep.contentBlocks?.map((block, idx) => {
        switch (block.type) {
          case 'p1':
            return (
              <p
                key={idx}
                style={{
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  margin: '0.5rem 0',
                }}
              >
                {block.text}
              </p>
            )

          case 'image':
            return (
              <Image
                key={idx}
                src={block.src}
                alt={block.alt || ''}
                width={1400}
                height={900}
                style={{
                  width: '95vw',
                  maxWidth: '1100px',
                  height: 'auto',
                  borderRadius: '12px',
                  margin: '0.1rem 0',
                }}
              />
            )

          case 'ul':
            return (
              <ul key={idx} style={{ textAlign: 'left' }}>
                {block.items.map((i, j) => (
                  <li key={j}>{i}</li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={idx} style={{ textAlign: 'left' }}>
                {block.items.map((i, j) => (
                  <li key={j}>{i}</li>
                ))}
              </ol>
            )

          default:
            return null
        }
      })}

      {/* TIMER CONTROLS */}
      {currentStep.timerSeconds !== undefined && (
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={startTimer}>Start</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Reset</button>
          </div>

          {/* MINUTES INPUT */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem' }}>
              Timer (minutes)
            </label>

            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              style={{
                width: '120px',
                textAlign: 'center',
                padding: '0.4rem',
              }}
            />
          </div>
        </div>
      )}

      {/* FLOATING TIMER */}
      {running && (
        <div
          onMouseDown={onMouseDown}
          style={{
            position: 'fixed',
            top: pos.y,
            left: pos.x,
            zIndex: 9999,
            cursor: 'grab',
            padding: '1rem 1.5rem',
            background: 'rgba(0,0,0,0.85)',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '2.2rem',
            userSelect: 'none',
          }}
        >
          {format(secondsLeft)}
        </div>
      )}

      {/* NAV */}
      {isFinalStep ? (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button onClick={() => router.push('/meeting/welcome')}>
            Back to Beginning
          </button>
          <button onClick={() => router.push('/')}>Close</button>
        </div>
      ) : (
        <button onClick={handleNext} style={{ marginTop: '2rem' }}>
          Next
        </button>
      )}

      {/* NEWCOMER */}
      {showNewcomerChoice && (
        <div style={{ marginTop: '2rem' }}>
          <label>
            <input
              type="radio"
              checked={!newcomerPresent}
              onChange={() => setNewcomerPresent(false)}
            />
            No
          </label>

          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              checked={newcomerPresent}
              onChange={() => setNewcomerPresent(true)}
            />
            Yes
          </label>
        </div>
      )}
    </main>
  )
}
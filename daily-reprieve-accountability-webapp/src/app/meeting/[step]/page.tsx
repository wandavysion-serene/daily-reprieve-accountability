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
  // FLAGS
  // ----------------------------
  const isImageFocusStep =
    currentStep.id === 'silent-meditation-image' ||
    currentStep.id === 'step-work-image'

  const isFirstStep = currentStep.id === 'welcome'

  // ----------------------------
  // STATE
  // ----------------------------
  const [newcomerPresent, setNewcomerPresent] = useState(false)

  // IMAGE SELECTION
  const [imageSelections, setImageSelections] = useState<Record<number, string>>(
    {}
  )

  // TIMER
  const [minutes, setMinutes] = useState(
    Math.floor((currentStep.timerSeconds ?? 0) / 60)
  )
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60)
  const [running, setRunning] = useState(false)

  const intervalRef = useRef<number | null>(null)

  // DRAG TIMER
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
  // DRAGGING
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
  // NAVIGATION (FIXED)
  // ----------------------------
  const isFinalStep = !currentStep.next

  const getNextStep = () => {
    if (currentStep.conditionalNext) {
      for (const cond of currentStep.conditionalNext) {
        if (cond.condition === 'newcomerPresent' && newcomerPresent) {
          return cond.goTo
        }
      }
    }
    return currentStep.next
  }

  const handleNext = () => {
    const nextStep = getNextStep()
    if (nextStep) {
      router.push(`/meeting/${nextStep}`)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const showNewcomerChoice = stepParam === 'newcomer-check'

  // ----------------------------
  // FORMAT TIMER
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
      {/* TITLE */}
      {!isImageFocusStep && (
        <h1 style={{ marginBottom: '1rem' }}>{currentStep.title}</h1>
      )}

      {/* SPECIAL INSTRUCTION */}
      {isImageFocusStep && (
        <p
          style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            marginBottom: '0.1rem',
          }}
        >
          Please turn your cameras off and mute yourselves so that we don’t disturb one another
        </p>
      )}

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

          case 'image': {
            const selectedSrc = imageSelections[idx] || block.src

            return (
              <div key={idx} style={{ textAlign: 'center' }}>
                <Image
                  src={selectedSrc}
                  alt={block.alt || ''}
                  width={1400}
                  height={900}
                  style={{
                    width: '95vw',
                    maxWidth: '1100px',
                    height: 'auto',
                    borderRadius: '12px',
                  }}
                />

                {block.options && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      justifyContent: 'center',
                      marginTop: '2rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    {block.options.map((opt, i) => {
                      const isSelected = selectedSrc === opt

                      return (
                        <Image
                          key={i}
                          src={opt}
                          alt=""
                          width={80}
                          height={60}
                          onClick={() =>
                            setImageSelections((prev) => ({
                              ...prev,
                              [idx]: opt,
                            }))
                          }
                          style={{
                            cursor: 'pointer',
                            borderRadius: '6px',
                            border: isSelected
                              ? '3px solid #0070f3'
                              : '2px solid transparent',
                            opacity: isSelected ? 1 : 0.7,
                          }}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

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
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={startTimer}>Start</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Reset</button>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <label>Timer (minutes)</label>
            <br />
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              style={{ width: '100px', textAlign: 'center' }}
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
            padding: '1rem',
            background: 'black',
            color: 'white',
            borderRadius: '10px',
            fontSize: '2rem',
          }}
        >
          {format(secondsLeft)}
        </div>
      )}

      {/* NAVIGATION */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        {!isFirstStep && <button onClick={handleBack}>Back</button>}

        <button onClick={() => router.push('/meeting/welcome')}>
          Back to Beginning
        </button>

        {!isFinalStep && <button onClick={handleNext}>Next</button>}
      </div>

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
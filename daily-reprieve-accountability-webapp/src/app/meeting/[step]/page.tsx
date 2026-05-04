'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { meetingFlow, Step } from '@/lib/meetingFlow'
import Image from 'next/image'

/* ----------------------------
   SERENITY TOGGLE (STABLE)
----------------------------- */
function SerenityToggle({
  weVersion,
  iVersion,
}: {
  weVersion: string
  iVersion: string
}) {
  const [mode, setMode] = useState<'we' | 'i'>('we')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          background: '#e5e5e5',
          borderRadius: '999px',
          padding: '4px',
          width: '180px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: mode === 'we' ? 4 : '50%',
            width: 'calc(50% - 4px)',
            height: 'calc(100% - 8px)',
            background: '#111',
            borderRadius: '999px',
            transition: '0.25s ease',
          }}
        />

        <div
          onClick={() => setMode('we')}
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '6px 0',
            zIndex: 1,
            cursor: 'pointer',
            color: mode === 'we' ? '#fff' : '#333',
            fontWeight: 600,
          }}
        >
          We
        </div>

        <div
          onClick={() => setMode('i')}
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '6px 0',
            zIndex: 1,
            cursor: 'pointer',
            color: mode === 'i' ? '#fff' : '#333',
            fontWeight: 600,
          }}
        >
          I
        </div>
      </div>

      <p
        style={{
          marginTop: '1rem',
          fontSize: '1.2rem',
          whiteSpace: 'pre-line',
          textAlign: 'center',
          lineHeight: '1.6',
        }}
      >
        {mode === 'we' ? weVersion : iVersion}
      </p>
    </div>
  )
}

/* ----------------------------
   PAGE
----------------------------- */
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

  const isImageFocusStep =
    currentStep.id === 'silent-meditation-image' ||
    currentStep.id === 'step-work-image'

  const isFirstStep = currentStep.id === 'welcome'

  /* ----------------------------
     STATE
  ----------------------------- */
  const [newcomerPresent, setNewcomerPresent] = useState(false)

  const [imageSelections, setImageSelections] = useState<Record<string, string>>({})

  const [minutes, setMinutes] = useState(
    Math.floor((currentStep.timerSeconds ?? 0) / 60)
  )

  const initialSecondsRef = useRef(
    Math.floor((currentStep.timerSeconds ?? 0) / 60) * 60
  )

  const [secondsLeft, setSecondsLeft] = useState(initialSecondsRef.current)
  const [running, setRunning] = useState(false)
  const [showFloatingTimer, setShowFloatingTimer] = useState(false)

  const intervalRef = useRef<number | null>(null)

  const [isLocked, setIsLocked] = useState(false)

  /* ----------------------------
     TIMER
  ----------------------------- */
  const startTimer = () => {
    if (running) return

    setRunning(true)
    setShowFloatingTimer(true)
    setIsLocked(true)

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
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRunning(false)
  }

  const resetTimer = () => {
    pauseTimer()
    setSecondsLeft(initialSecondsRef.current)
  }

  /* ----------------------------
     DRAG TIMER
  ----------------------------- */
  const [pos, setPos] = useState({ x: 120, y: 120 })
  const dragRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })

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

  /* ----------------------------
     NAV
  ----------------------------- */
  const isFinalStep = !currentStep.next

  const handleNext = () => {
    let nextStep = currentStep.next

    if (currentStep.conditionalNext?.length) {
      for (const cond of currentStep.conditionalNext) {
        if (cond.condition === 'newcomerPresent' && newcomerPresent) {
          nextStep = cond.goTo
          break
        }
      }
    }

    if (nextStep) {
      router.push(`/meeting/${nextStep}`)
    }
  }

  const handleBack = () => router.back()

  const showNewcomerChoice = stepParam === 'newcomer-check'

  const format = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  /* ----------------------------
     RENDER
  ----------------------------- */
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
      {!isImageFocusStep && (
        <h1 style={{ marginBottom: '1rem' }}>{currentStep.title}</h1>
      )}

      {isImageFocusStep && (
        <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
          Please turn your cameras off and mute yourselves so that we don’t disturb one another
        </p>
      )}

      {/* CONTENT */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>

          {currentStep.contentBlocks?.map((block, idx) => {
            switch (block.type) {

              case 'p1':
                return (
                  <p
                    key={idx}
                    style={{
                      fontSize: '1.2rem',
                      textAlign: 'justify',
                      whiteSpace: 'pre-line',
                      margin: '0.75rem 0',
                      lineHeight: '1.6',
                    }}
                  >
                    {block.text}
                  </p>
                )
              case 'p2': 
                return ( 
                  <p 
                    key={idx} 
                    style={{ 
                      fontSize: '1.1rem', 
                      textAlign: 'justify', 
                      whiteSpace: 'pre-line', 
                      margin: '1.5rem 0', 
                      color: 'red', 
                      fontStyle: 'italic', 
                      fontWeight: 700, 
                      lineHeight: '1.6', 
                    }} 
                    > 
                      {block.text} 
                    </p> 
                  )
                case 'p3': 
                return ( 
                  <p 
                    key={idx} 
                    style={{ 
                      fontSize: '1.1rem', 
                      textAlign: 'justify', 
                      whiteSpace: 'pre-line', 
                      margin: '1.5rem 0', 
                      color: 'red', 
                      fontStyle: 'italic', 
                      fontWeight: 400, 
                      lineHeight: '1.6', 
                    }} 
                    > 
                      {block.text} 
                    </p> 
                  )

              case 'image': {
                const selectedSrc =
                  imageSelections[`${idx}`] || block.src

                return (
                  <div key={idx} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <Image
                      src={selectedSrc}
                      alt={block.alt || ''}
                      width={1400}
                      height={900}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                      }}
                    />

                    {/* ✅ THUMBNAILS FIXED */}
                    {block.options?.length ? (
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          justifyContent: 'center',
                          marginTop: '1rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        {block.options.map((opt, i) => (
                          <Image
                            key={i}
                            src={opt}
                            alt=""
                            width={80}
                            height={60}
                            onClick={() =>
                              setImageSelections((prev) => ({
                                ...prev,
                                [`${idx}`]: opt,
                              }))
                            }
                            style={{
                              cursor: 'pointer',
                              borderRadius: '6px',
                              opacity: selectedSrc === opt ? 1 : 0.6,
                              border: selectedSrc === opt ? '2px solid #0070f3' : '2px solid transparent',
                            }}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              }

              case 'serenity':
                return (
                  <div key={idx} style={{ margin: '2rem 0' }}>
                    <SerenityToggle
                      weVersion={block.weVersion}
                      iVersion={block.iVersion}
                    />
                  </div>
                )

              default:
                return null
            }
          })}
          {currentStep.links?.length ? (
            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {currentStep.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0070f3',
                    textDecoration: 'underline',
                    fontSize: '1rem',
                  }}
                >
                  {link.text}
                </a>
              ))}
            </div>
          ) : null}

        </div>
      </div>

      {/* TIMER */}
      {currentStep.timerSeconds !== undefined && (
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={startTimer}>Start</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Reset</button>
          </div>

          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)' }}>
              Set timer :
            </span>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              disabled={isLocked}
              onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
              style={{
                width: '80px',
                textAlign: 'center',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                padding: '0.4rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                opacity: isLocked ? 0.5 : 1,
                cursor: isLocked ? 'not-allowed' : 'text',
              }}
            />
            <span style={{ fontFamily: 'var(--font-body)' }}>
              minutes
            </span>
          </div>

        </div>
      )}
      {/* FLOATING TIMER */}
      {showFloatingTimer && (
        <div
          onMouseDown={onMouseDown}
          style={{
            position: 'fixed',
            top: pos.y,
            left: pos.x,
            padding: '1rem',
            zIndex: 9999,
            background: 'white',
            color: 'black',
            borderRadius: '10px',
            fontSize: '2rem',
            border: '1px solid #ddd',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'grab',

            // 🔒 stability fix
            width: '7ch',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontWeight: '700',
            lineHeight: '1',
          }}
        >
          {format(secondsLeft)}
        </div>
      )}

      {/* NAV */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        {!isFirstStep && <button onClick={handleBack}>Back</button>}
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
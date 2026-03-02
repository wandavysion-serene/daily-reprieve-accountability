'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { meetingFlow, Step } from '@/lib/meetingFlow'
import Timer from '@/app/timer/page'
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

  const isFinalStep = !currentStep.next

  const [newcomerPresent, setNewcomerPresent] = useState(false)
  const [useWeVersion, setUseWeVersion] = useState(true)

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
    if (nextStep) router.push(`/meeting/${nextStep}`)
  }

  const showNewcomerChoice = currentStep.id === 'newcomer-check'
  const showSerenityToggle = currentStep.id === 'serenity-prayer'

  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
        {currentStep.title}
      </h1>

      {/* Serenity Toggle */}
      {showSerenityToggle && (
        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              borderRadius: '999px',
              backgroundColor: '#eee',
              padding: '4px',
            }}
          >
            <button
              onClick={() => setUseWeVersion(false)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: !useWeVersion ? '#111' : 'transparent',
                color: !useWeVersion ? '#fff' : '#333',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
            >
              I
            </button>

            <button
              onClick={() => setUseWeVersion(true)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: useWeVersion ? '#111' : 'transparent',
                color: useWeVersion ? '#fff' : '#333',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
            >
              We
            </button>
          </div>
        </div>
      )}

      {/* Render Content Blocks */}
      {currentStep.contentBlocks &&
        currentStep.contentBlocks.map((block, idx) => {
          switch (block.type) {
            case 'p1':
              return (
                <p
                  key={idx}
                  style={{
                    fontSize: '1.25rem',
                    margin: '2rem 0',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
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
                    fontSize: '0.9rem',
                    margin: '1rem 0',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    color: '#555',
                    fontStyle: 'italic',
                  }}
                >
                  {block.text}
                </p>
              )

            case 'ul':
              return (
                <ul
                  key={idx}
                  style={{
                    marginTop: '1rem',
                    textAlign: 'left',
                    paddingLeft: '2rem',
                    fontSize: '1.1rem',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {block.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )

            case 'ol':
              return (
                <ol
                  key={idx}
                  style={{
                    marginTop: '1rem',
                    textAlign: 'left',
                    paddingLeft: '2rem',
                    fontSize: '1.1rem',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {block.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                      {item}
                    </li>
                  ))}
                </ol>
              )

            case 'image':
              return (
                <Image
                  key={idx}
                  src={block.src}
                  alt={block.alt || ''}
                  width={block.width || 600}
                  height={400}
                  style={{
                    margin: '2rem 0',
                    borderRadius: '8px',
                  }}
                />
              )

            case 'serenity':
              return (
                <p
                  key={idx}
                  style={{
                    fontSize: '1.5rem',
                    margin: '2rem 0',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    fontWeight: 500,
                  }}
                >
                  {useWeVersion ? block.weVersion : block.iVersion}
                </p>
              )

            default:
              return null
          }
        })}

      {/* Meta Instructions */}
      {currentStep.metaInstructions && (
        <ul
          style={{
            color: 'red',
            fontStyle: 'italic',
            marginTop: '1rem',
            textAlign: 'left',
            paddingLeft: '2rem',
          }}
        >
          {currentStep.metaInstructions.map((instr, idx) => (
            <li
              key={idx}
              style={{
                whiteSpace: 'pre-line',
                marginBottom: '0.5rem',
              }}
            >
              {instr}
            </li>
          ))}
        </ul>
      )}

      {/* External Link */}
      {currentStep.link && (
        <a
          href={currentStep.link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            marginTop: '1.5rem',
            color: '#0070f3',
            textDecoration: 'underline',
            fontSize: '1.1rem',
            cursor: 'pointer',
          }}
        >
          {currentStep.link.text}
        </a>
      )}

      {/* Timer */}
      {currentStep.timerSeconds && (
        <Timer startSeconds={currentStep.timerSeconds} />
      )}

      {/* Newcomer Choice */}
      {showNewcomerChoice && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Is there a newcomer present?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <label>
              <input
                type="radio"
                name="newcomer"
                value="no"
                checked={!newcomerPresent}
                onChange={() => setNewcomerPresent(false)}
              />{' '}
              No
            </label>
            <label>
              <input
                type="radio"
                name="newcomer"
                value="yes"
                checked={newcomerPresent}
                onChange={() => setNewcomerPresent(true)}
              />{' '}
              Yes
            </label>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        {isFinalStep ? (
          <>
            <button
              onClick={() => router.push('/meeting/welcome')}
              style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}
            >
              Back to Beginning
            </button>

            <button
              onClick={() => router.push('/')}
              style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}
            >
              Close
            </button>
          </>
        ) : (
          <button
            onClick={handleNext}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1.25rem',
              fontWeight: 500,
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#111',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {showNewcomerChoice
              ? newcomerPresent
                ? 'Go to Newcomer Script'
                : 'Continue with Regular Script'
              : 'Next'}
          </button>
        )}
      </div>
    </main>
  )
}
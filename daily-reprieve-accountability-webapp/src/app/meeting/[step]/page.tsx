'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { meetingFlow, Step } from '@/lib/meetingFlow'
import Timer from '@/app/timer/page'

export default function StepPage() {
  const router = useRouter()
  const params = useParams()
  const stepParam = Array.isArray(params?.step) ? params.step[0] : params?.step

  const [newcomerPresent, setNewcomerPresent] = useState(false)

  const currentStep: Step | undefined = meetingFlow.find(
    (s) => s.id.toLowerCase() === stepParam?.toLowerCase()
  )

  if (!currentStep) return <p>Step not found.</p>

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

  // Only show newcomer radio buttons on the 'newcomer-check' step
  const showNewcomerChoice = stepParam === 'newcomer-check'

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
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
        {currentStep.title}
      </h1>
      <p
        style={{
          fontSize: '1.25rem',
          margin: '2rem 0',
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
      >
        {currentStep.content}
      </p>

      {/* Render meta instructions if they exist */}
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

      {currentStep.link && (
        <a
          href={currentStep.link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            marginBottom: '1rem',
            color: '#0070f3',
            textDecoration: 'underline',
            fontSize: '1.1rem',
            whiteSpace: 'pre-line',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {currentStep.link.text}
        </a>
      )}

      {currentStep.timerSeconds && (
        <Timer startSeconds={currentStep.timerSeconds} />
      )}

      {showNewcomerChoice && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Is there a newcomer present?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <label>
              <input
                type="radio"
                name="newcomer"
                value="no"
                checked={!newcomerPresent} // default: regular script
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

      <button
        onClick={handleNext}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1.25rem',
          fontWeight: '500',
          fontStyle: 'italic',
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
    </main>
  )
}
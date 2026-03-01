'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { meetingFlow, Step } from '@/lib/meetingFlow'

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
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900 }}>
        {currentStep.title}
      </h1>
      <p style={{ fontSize: '1.25rem', margin: '2rem 0', textAlign: 'center' }}>
        {currentStep.content}
      </p>

      {stepParam === 'welcome' && (
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>
            Is there a newcomer present?
          </label>
          <input
            type="checkbox"
            checked={newcomerPresent}
            onChange={(e) => setNewcomerPresent(e.target.checked)}
            style={{ width: '20px', height: '20px' }}
          />
        </div>
      )}

      <button
        onClick={handleNext}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          borderRadius: '0.5rem',
          border: 'none',
          backgroundColor: '#111',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        {stepParam === 'welcome'
          ? newcomerPresent
            ? 'Go to Newcomer Script'
            : 'Continue with Regular Script'
          : 'Next'}
      </button>
    </main>
  )
}
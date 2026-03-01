'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { meetingFlow, Step } from '@/lib/meetingFlow'

type StepPageProps = {
  params: { step: string }
}

export default function StepPage({ params }: StepPageProps) {
  const router = useRouter()
  const [newcomerPresent, setNewcomerPresent] = useState(false)

  const currentStep: Step | undefined = meetingFlow.find(
    (s) => s.id === params.step
  )

  if (!currentStep) return <p>Step not found.</p>

  // Determine next step considering conditionalNext
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
    <main style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)' }}>{currentStep.title}</h1>
      <p>{currentStep.content}</p>

      {params.step === 'newcomer-check' && (
        <div style={{ margin: '1rem 0' }}>
          <label>
            <input
              type="checkbox"
              checked={newcomerPresent}
              onChange={(e) => setNewcomerPresent(e.target.checked)}
            />{' '}
            Newcomer present
          </label>
        </div>
      )}

      <button
        onClick={handleNext}
        style={{
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 'bold',
        }}
      >
        Next
      </button>
    </main>
  )
}
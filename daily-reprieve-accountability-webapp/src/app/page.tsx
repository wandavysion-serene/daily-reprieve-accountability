'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const startMeeting = () => {
    router.push('/meeting/welcome')
  }

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'var(--font-body)',
        backgroundColor: '#f7f7f7',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1rem' }}>
        Daily Reprieve Accountability Tool
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        Host your meeting smoothly — follow the script, track steps, and start timers with ease.
      </p>
      <button onClick={startMeeting}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111')}
      >
        Start Meeting
      </button>
    </main>
  )
}
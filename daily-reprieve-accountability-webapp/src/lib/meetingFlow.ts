export type Step = {
  id: string
  title: string
  content: string
  next?: string
  conditionalNext?: {
    condition: string
    goTo: string
  }[]
}

export const meetingFlow: Step[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    content:
      'Welcome to the SAA Daily Reprieve Accountability meeting. ' +
      'If there are any newcomers, please come off mute and introduce yourselves.',
    conditionalNext: [
      { condition: 'newcomerPresent', goTo: 'newcomer-script' },
    ],
    next: 'regular-script', // default if no newcomers
  },
  {
    id: 'newcomer-script',
    title: 'Newcomer Script',
    content:
      'Welcome newcomers! Please read these instructions carefully to understand the meeting flow...',
    next: 'meditation',
  },
  {
    id: 'regular-script',
    title: 'Regular Script',
    content:
      'We will continue with the regular meeting script. Please follow along with the readings.',
    next: 'meditation',
  },
]
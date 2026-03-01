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
    id: 'opening',
    title: 'Opening',
    content: 'Welcome to the Daily Reprieve Accountability meeting.',
    next: 'serenity-prayer',
  },
  {
    id: 'serenity-prayer',
    title: 'Serenity Prayer',
    content: 'God, grant me the serenity to accept the things I cannot change...',
    next: 'newcomer-check',
  },
  {
    id: 'newcomer-check',
    title: 'Newcomer Check',
    content: 'Is there a newcomer present?',
    conditionalNext: [
      { condition: 'newcomerPresent', goTo: 'newcomer-script' },
    ],
    next: 'meditation',
  },
  {
    id: 'newcomer-script',
    title: 'Newcomer Script',
    content: 'Welcome newcomers! Please read these instructions...',
    next: 'meditation',
  },
  {
    id: 'meditation',
    title: 'Meditation',
    content: 'Click start to begin a 5-minute meditation timer.',
    next: 'readings',
  },
  {
    id: 'readings',
    title: 'Readings',
    content: 'Please read the designated passages from the Big Book...',
    next: 'closing',
  },
  {
    id: 'closing',
    title: 'Closing',
    content: 'Thank you for attending. See you tomorrow!',
  },
]
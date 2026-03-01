export type Step = {
  id: string
  title: string
  content: string
  metaInstructions?: string []
  link?: { url: string; text: string }
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
      'Hi, my name is ___ , and I’m a sex addict.\n\nWelcome to the Daily Reprieve SAA Accountability Meeting.' + 
      '\n\n' +
      'This meeting supports our daily recovery through readings, meditation, and step work.' +
      '\n\n' +
      'We read from the AA Big Book Morning Prayers, Voices of Recovery, and Answers in the Heart.\n This is followed by a short meditation and 10 minutes for individual step work.' +
      '\n\n' +
      'We then open the floor for brief shares of gratitude, intentions, commitments, or letting go.' +
      '\n\n' +
      'Once a week, we may hear a First Step presentation.\n To schedule a day, please speak with your sponsor and the First Step coordinator.' +
      '\n\n' +
      'This meeting lasts one hour.\n',
    next: 'safety',
  },
  {
    id: 'safety',
    title: 'Safety Instructions',
    content:
      'For everyone’s safety, participants should display their first name and last initial.\n' +
      'The co-host will request this in chat and rename the participant as needed.\n\n If there’s no response, ' +
      'the request will be made verbally during the meeting.\n\n Participants who still don’t respond will be moved to the waiting room\n until they identify themselves.',
    next: 'business-portion',
  },
  {
    id: 'business-portion',
    title: 'Business Portion',
    content:
      'Before we begin the readings, a quick note about service:\n we have a host and two co-host roles available each meeting,\n including one who monitors the Waiting Room.',
    metaInstructions: [
      'Host highlights any upcoming first step presentations',
      'Host only reads upcoming service roles that are highlighted\n and asks for volunteers to post in chat for upcoming positions not filled\n\n',
    ],
    link: {
      url: 'https://docs.google.com/spreadsheets/d/13124SPKkXLbqlh-Odi8OzG_7ThjMSH9_CY677Tigztg/edit#gid=0',
      text: 'DRA Service Sign-Up Sheet'
    },
    next: 'newcomer-check',
  },
  {
    id: 'business-portion',
    title: 'Business Portion',
    content:
      'Before we begin the readings, a quick note about service:\n we have a host and two co-host roles available each meeting,\n including one who monitors the Waiting Room.' +
      '\n\n' +
      '\t● Host highlights any upcoming first step presentations\n' +
      '\t● Host only reads upcoming service roles that are highlighted\n and asks for volunteers to post in chat for upcoming positions not filled.' +
      '\n\n' +
      'Screen share the DRA Service Sign-Up Sheet:\n https://docs.google.com/spreadsheets/d/xxxxxxxxxxxx/edit#gid=0',
    next: 'newcomer-check',
  },
  {
    id: 'newcomer-check',
    title: 'Newcomer Check',
    content:
      'Is there anyone new to the SAA fellowship or to this group?\n\n' +
      'If someone is new to the meeting but not new to SAA: Welcome ____!',
    conditionalNext: [
      { condition: 'newcomerPresent', goTo: 'newcomer-intro' },
    ],
    next: 'reading-portion',
  },
  {
    id: 'reading-portion',
    title: 'Reading Portion',
    content:
      'We’ll start our reading portion and our AA Big Book morning prayers. ' +
      'If you’d like to read, please raise your hand on Zoom, by clicking “raise hand” in the participant or reaction tab on the toolbar, or by pressing *9 if you’re calling in. ' +
      'The host will call on members in the order in which they raised their hands.',
    next: 'meditation', // or whatever the next step is
  },
  {
    id: 'newcomer-intro',
    title: 'Newcomer Introduction',
    content:
      'We’d like to welcome you to our meeting. We know the courage it takes walking into this space for the first time. ' +
      'All of us in this space were in your shoes at one time. After we’ve finished our opening readings, we’ll open up for introductions and share.',
    next: 'reading-portion',
  },
]
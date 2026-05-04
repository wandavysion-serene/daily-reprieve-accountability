type ContentBlock =
  | { type: 'p1'; text: string }
  | { type: 'p2'; text: string }
  | { type: 'p3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | {
      type: 'image'
      src: string
      alt?: string
      width?: number
      options?: string[] // 👈 NEW
    }
  | {
      type: 'serenity'
      weVersion: string
      iVersion: string
    }

export type Step = {
  id: string
  title: string
  contentBlocks?: ContentBlock[]
  links?: {
    url: string
    text: string
  }[]
  timerSeconds?: number
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
    contentBlocks: [
      { 
        type: 'p1',
        text : '\nHi, my name is _______ , and I’m a sex addict.' + '\n\n' +
        'Welcome to the Daily Reprieve SAA Accountability Meeting. This meeting supports our daily recovery through readings, meditation, and step work. We read from the AA Big Book Morning Prayers, Voices of Recovery, and Answers in the Heart. This is followed by a short meditation and 10 minutes for individual step work. We then open the floor for brief shares of gratitude, intentions, commitments, or letting go.' +
        '\n\n' +
        'Once a week, we may hear a First Step presentation. To schedule a day, please speak with your sponsor and the First Step coordinator.' +
        '\n\n' +
        'This meeting lasts one hour.\n'
      }
    ],
    next: 'safety',
  },
  {
    id: 'safety',
    title: 'Safety Instructions',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        '\nFor everyone’s safety, participants should display their first name and last initial. The co-host will request this in chat and rename the participant as needed.' +
        '\n\n' +
        'If there’s no response, the request will be made verbally during the meeting. Participants who still don’t respond will be moved to the waiting room until they identify themselves.',
      }
    ],
    next: 'business-portion',
  },
  {
    id: 'business-portion',
    title: 'Business Portion',
    contentBlocks: [
      { 
        type: 'p1',
        text: 
          '\nBefore we begin the readings, a quick note about service: we have a host and two co-host roles available each meeting, including one who monitors the Waiting Room.' +
          '\n\n' +
          'I will now pull up the service sign-up sheet that one of my co-hosts has pasted in the chat and go over where we have vacancies to fill'
      },
      { 
        type: 'p2',
        text: 
          'Screen share DRA Service Sign Up Sheet\n'
      },
      { 
        type: 'p3',
        text:
          '• \u2009Host highlights any upcoming first step presentations\n' +
          '• \u2009Host only reads upcoming service roles that are highlighted and asks\n' +
          '\u2009\u2009\u2009for volunteers to post in chat for upcoming positions not filled.\n'
      }
    ],
    next: 'signal-announcement',
  },
  {
    id: 'signal-announcement',
    title: 'Signal Group Announcement',
    contentBlocks: [
      {
        type: 'p1',
        text:
          '\nJust so you all know, there is group messaging for this daily reprieve accountability meeting on the Signal app. My co-host will provide the link to join in the chat.'
      },
      {
        type: 'p2',
        text: '[Co-host posts Signal App link]'
      },
      {
        type: 'p1',
        text:
          'This is a place where you can get support for recovery at all hours, because we have members all over the world.\n\n' +
          'Download the app on your device first and set up a free account for the link to work. It’s limited to current and past members of our group.\n\n' +
          'We also have a phone list to facilitate sponsorships and communication between members. We will share this during fellowship, which is right after the meeting.'
      }
    ],
    next: 'newcomer-check',
  },
  {
    id: 'newcomer-check',
    title: 'Newcomer Check',
    contentBlocks: [
      { 
        type: 'p1',
        text : '\nIs there anyone new to the SAA fellowship or to this group?'
      },
      { 
        type: 'p2',
        text : 'If someone is new to the meeting but not new to SAA:'
      },
      { 
        type: 'p1',
        text : 'Welcome, ____! We are glad you could join us today. Just so you are aware, we are a 7 days a week meeting; my co-host will now post our timings in the chat. Adjust for your time zone and join us again if you would like to.',
      },
      { 
        type: 'p2',
        text : 'If no-one is new to SAA in general OR this meeting in particular:'
      },
      { 
        type: 'p1',
        text : 'Welcome back, everyone! Glad to have you all join us again. Since we don’t have any newcomers either to SAA in general or to this meeting in particular, I assume you all know the drill. Let us go right into our reading portion, then',
      }
    ],
    conditionalNext: [
      { condition: 'newcomerPresent', goTo: 'newcomer-intro' },
    ],
    next: 'reading-portion',
  },
  {
    id: 'reading-portion',
    title: 'Reading Portion',
    contentBlocks: [
      { 
        type: 'p1',
        text :
        '\nWe’ll now start the reading portion of our meeting from the AA Big Book morning prayers.' +
        '\n\n' +
        'If you’d like to read, please raise your hand on Zoom, by clicking “raise hand” in the participant or reaction tab on the toolbar, or by pressing *9 if you’re calling in.' +
        '\n\n' +
        'I will call on members in the order in which they raise their hands.\n\n'
      }
    ],
    links: [
      {
        url: 'https://docs.google.com/document/d/1pv4HEY3du_dpiwxAOpec-48nKR8h0f3ZmdS7MysJE4A/edit?tab=t.0',
        text: 'AA Big Book Morning Prayers'
      },
      {
        url: 'https://saa-recovery.org/daily-meditation-from-voices-of-recovery/',
        text: 'Voices of Recovery'
      },
      {
        url: 'https://pdfhost.io/v/fj39e2vbx_Answers_in_the_Heart_Daily_Meditations',
        text: 'Answers in the Heart'
      }
    ],
    next: 'silent-meditation',
  },
  {
    id: 'newcomer-intro',
    title: 'Newcomer Introduction',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        '\nTo _______ :' + '\n\n' +
        'We’d like to welcome you to our meeting.' + '\n\n' +
        'We know the courage it takes walking into this space for the first time.\nAll of us in this space were in your shoes at one time.' + '\n\n' +
        'After we’ve finished our opening readings, we’ll open up for introductions and share.\nThis is a time when you may share your experience on the topic or the reading.' + '\n\n' +
        'We avoid crosstalk or interruptions when another person is sharing.\nWe also don’t offer advice or criticism.' + '\n\n' +
        'We will then finish the meeting with silent meditation and independent step work.\nStick around after the meeting if you have any questions.' +  '\n\n' +
        'SAA recommends that you come to at least 6 meetings and talk to as many\n members of the fellowship as possible before you decide whether SAA\n has anything to offer you. You’ll find that each meeting is a little bit different,\n but each meeting shares and works the same program called the Twelve Steps.' + '\n\n' +
        'The twelve-step program is what worked for us. SAA is much more than meetings.\nSAA is a fellowship of sex addicts in action, like the action being taken in this meeting\n through commitment to daily step work. We work the steps and help others do the same.\nWe encourage you to make finding a sponsor a priority.\n A sponsor can show you how to work the steps.' + '\n\n' +
        'It is our sincerest hope that you find what you’re looking for.' +  '\n\n' +
        'May we have a volunteer give a brief three-minute lead on step one?',
      }
    ],
    next: 'step-one-lead',
  },
  {
    id: 'step-one-lead',
    title: 'Step One Lead Share',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        '\nThank you, _____ , for your share! We appreciate you stepping up and sharing your journey with us.' + '\n\n' +
        'Now that we have gone over what this program can do for you, woe would also like to share the Twelve Steps.' + '\n\n' + 
        'Can I get a volunteer to read the Steps?',
      }
    ],
    links: [
      {
        url: 'https://saa-recovery.org/our-program/the-twelve-steps/',
        text: 'SAA The Twelve Steps'
      }
    ],
    next: 'reading-portion',
  },
  {
    id: 'silent-meditation',
    title: 'Silent Meditation',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        '\nThat brings us to the end of our readings.' + '\n\n' +
        'We will now take five minutes for silent meditation.' +
        '\n\n' +
        'I’ll start the timer and let you know when time’s up. Feel free to use this time for any mindfulness or meditation practice that supports you.' +
        '\n\n' +
        'Please mute yourself and turn off your camera to avoid distractions.' +
        '\n\n' +
        'I will be starting the timer shortly.'
      }],
    next: 'silent-meditation-image',
  },
  {
    id: 'silent-meditation-image',
    title: 'Silent Meditation in Progress',
    contentBlocks: [
      {
        type: 'image',
        src: '/images/01_Silent-Meditation.png',
        alt: 'Silent meditation',
        width: 700,
        options: [
          '/images/01_Silent-Meditation.png',
          '/images/02_Silent-Meditation.png',
          '/images/03_Silent-Meditation.png',
          '/images/04_Silent-Meditation.png',
          '/images/05_Silent-Meditation.png',
        ],
      }
    ],
    timerSeconds: 300,
    next: 'step-work',
  },
  {
    id: 'step-work',
    title: 'Ten Minutes for Stepwork',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        '\nThat concludes our meditation.' +
        '\n\n' +
        'We will now take 10 minutes for independent step work.' + 
        '\n\n' +
        'This can be written step work, journaling, reflection, or anything that supports your recovery.' + 
        '\n\n' +
        'Before we begin, we’ll go around and briefly share what we plan to focus on.' + 
        '\n\n' +
        'To share click “Raise Hand” under the Participants or Reactions tab, or press *9 if you’re calling in.' + 
        '\n\n' +
        'Or you can comment in the Chat.'
      }],
    next: 'step-work-contd',
  },
  {
    id: 'step-work-contd',
    title: 'Ten Minutes for Stepwork (contd.)',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        '\nThank you all for sharing what you will be working on' + 
        '\n\n' +
        'Again, I will request that you please mute yourself and turn off your camera so we don’t distract each other. I will be starting a 10-minute timer shortly and will let you know when time’s up.' +
        '\n\n' 
      }],
    next: 'step-work-image',
  },
  {
    id: 'step-work-image',
    title: 'Shhh... Stepwork in Progress',
    contentBlocks: [
      {
        type: 'image',
        src: '/images/01_Stepwork in progress.png',
        alt: 'Stepwork in progress',
        width: 700,
        options: [
          '/images/01_Stepwork in progress.png',
          '/images/02_Stepwork in progress.png',
          '/images/03_Stepwork in progress.png',
        ],
      }
    ],
    timerSeconds: 600,
    next: 'stepwork-conclusion',
  },
  {
    id: 'stepwork-conclusion',
    title: 'Stepwork Conclusion and Sharing Guidelines',
    contentBlocks: [{ 
        type: 'p1',
        text : 
        '\nThat brings us to the end of our step work. We’ll now close by going around the room for brief shares, up to two minutes each.' + 
        '\n\n' + 
        'You’re welcome to share gratitude, set an intention, make a commitment for the day, leave something at the door, or just check in.' +
        '\n\n' + 
        'As a quick reminder, please follow SAA sharing guidelines:' + 
        '\n\n' +
        '- \u2009Speak from your own experience using “I” statements' +
        '\n' +
        '- \u2009Avoid explicit or graphic details, or naming specific people or places' +
        '\n' +
        '- \u2009And please don’t interrupt or speak directly to others' +
        '\n\n' +
        'We also don’t give advice unless it’s asked for, and we ask that outside topics like politics or religion be left out.' +
        '\n\n' +
        'If you’d like to share, please raise your hand using the Reactions tab, or press *9 if you’re calling in. I’ll call on people in the order in which they raise their hands.' +
        '\n\n' +
        'Shares are limited to two minutes. Would someone be willing to volunteer as our timer and give a gentle time reminder?'
      }
    ],
    next: 'seventh-tradition',
  },
  {
    id: 'seventh-tradition',
    title: 'Seventh Tradition',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        '\nThat seems to be all we have time for today, thank you all who shared! *'
      },
      { 
        type: 'p2',
        text : '[ Host mentions to participants whose hands are raised, who did not get a chance to share, that they can share during fellowship ]'
      },
      { 
        type: 'p1',
        text : 
        'I would now like to take a moment to talk about our 7th tradition.' +
        '\n\n' +
        'Our seventh tradition states that we ought to be fully self-supporting and so we invite those of you who would like to support the work of our International Service Office (ISO) — which helps maintain meeting lists, develop literature, and support the fellowship behind the scenes to donate using the link pasted in the chat.' +
        '\n\n' +
        'There’s also a link if you’d like to learn more about what the ISO does.\n'
      }
    ],
    next: 'conclusion',
  },
  {
    id: 'conclusion',
    title: 'Conclusion',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        '\nYou’re welcome to stick around after the meeting for fellowship to ask questions, or just connect if you need support. If you notice someone hasn’t been around for a while, we encourage members of the same gender to check in on them and let them know they’re missed.' + 
        '\n\n' + 
        'Let us now take a brief moment of silence for the addicts and their families who still suffer (in and out of these rooms), and then close our meeting with the Serenity Prayer.'
      },
      { 
        type: 'p2',
        text : '[ Host has discretion to use singular or we version ]'
      },
    ],
    next: 'serenity-prayer',
  },
  {
    id: 'serenity-prayer',
    title: 'Serenity Prayer',
    contentBlocks: [
      {
        type: 'serenity',
        weVersion:
          'God, grant us the serenity to accept the things we cannot change,\n' +
          'courage to change the things we can,\n' +
          'and wisdom to know the difference.\n\n' +
          'Keep coming back, it works if you work it\n' +
          'because you’re all worth it',
        iVersion:
          'God, grant me the serenity to accept the things I cannot change,\n' +
          'courage to change the things I can,\n' +
          'and wisdom to know the difference.\n\n' +
          'Keep coming back, it works if you work it\n' +
          'because you’re all worth it',
      }
    ]
  }
]
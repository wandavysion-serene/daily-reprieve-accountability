type ContentBlock =
  | { type: 'p1'; text: string }
  | { type: 'p2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'image'; src: string; alt?: string; width?: number }
  | {
      type: 'serenity'
      weVersion: string
      iVersion: string
    }

export type Step = {
  id: string
  title: string
  contentBlocks?: ContentBlock[]
  metaInstructions?: string[]
  link?: { url: string; text: string }
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
        text : 'Hi, my name is ___ , and I’m a sex addict.\n\nWelcome to the Daily Reprieve SAA Accountability Meeting.' + 
        '\n\n' +
        'This meeting supports our daily recovery through readings, meditation, and step work.' +
        '\n\n' +
        'We read from the AA Big Book Morning Prayers, Voices of Recovery, and Answers in the Heart.\n This is followed by a short meditation and 10 minutes for individual step work.' +
        '\n\n' +
        'We then open the floor for brief shares of gratitude, intentions, commitments, or letting go.' +
        '\n\n' +
        'Once a week, we may hear a First Step presentation.\n To schedule a day, please speak with your sponsor and the First Step coordinator.' +
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
      'For everyone’s safety, participants should display their first name and last initial.\n' +
      'The co-host will request this in chat and rename the participant as needed.\n\n If there’s no response, ' +
      'the request will be made verbally during the meeting.\n\n Participants who still don’t respond will be moved to the waiting room\n until they identify themselves.',
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
        text : 
      'Before we begin the readings, a quick note about service:\n we have a host and two co-host roles available each meeting,\n including one who monitors the Waiting Room.',}],
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
    id: 'newcomer-check',
    title: 'Newcomer Check',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
      'Is there anyone new to the SAA fellowship or to this group?\n\n' +
      'If someone is new to the meeting but not new to SAA: Welcome ____!',}],
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
      'We’ll now start the reading portion of our meeting from the AA Big Book morning prayers.' +
      '\n\n' +
      'If you’d like to read, please raise your hand on Zoom, by clicking “raise hand”\nin the participant or reaction tab on the toolbar,\nor by pressing *9 if you’re calling in.' +
      '\n\n' +
      'The host will call on members in the order in which they raised their hands.',}],
    link: {
      url: 'https://docs.google.com/document/d/1pv4HEY3du_dpiwxAOpec-48nKR8h0f3ZmdS7MysJE4A/edit?tab=t.0',
      text: 'AA Big Book Morning Prayers'
    },
    next: 'silent-meditation',
  },
  {
    id: 'newcomer-intro',
    title: 'Newcomer Introduction',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
      'We’d like to welcome you to our meeting.' +
      '\n\n' +
      'We know the courage it takes walking into this space for the first time.\nAll of us in this space were in your shoes at one time.' +
      '\n\n' +
      'After we’ve finished our opening readings, we’ll open up for introductions and share.\nThis is a time when you may share your experience on the topic or the reading.' +
      '\n\n' +
      'We avoid crosstalk or interruptions when another person is sharing.\nWe also don’t offer advice or criticism.' +
      '\n\n' +
      'We will then finish the meeting with silent meditation and independent step work.\nStick around after the meeting if you have any questions.' + 
      '\n\n' +
      'SAA recommends that you come to at least 6 meetings and talk to as many\n members of the fellowship as possible before you decide whether SAA\n has anything to offer you. You’ll find that each meeting is a little bit different,\n but each meeting shares and works the same program called the Twelve Steps.' +
      '\n\n' +
      'The twelve-step program is what worked for us. SAA is much more than meetings.\nSAA is a fellowship of sex addicts in action, like the action being taken in this meeting\n through commitment to daily step work. We work the steps and help others do the same.\nWe encourage you to make finding a sponsor a priority.\n A sponsor can show you how to work the steps.' +
      '\n\n' +
      'It is our sincerest hope that you find what you’re looking for.' + 
      '\n\n' +
      'May we have a volunteer give a brief three-minute lead on step one?',}],
    next: 'step-one-lead',
  },
  {
    id: 'step-one-lead',
    title: 'Step One Lead Share',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
      'Thank you, _____ , for your share! We appreciate you stepping up\n and sharing your journey with us.' +
      '\n\n' +
      'We’d also like to share the 12 Steps.\n Do we have a volunteer to read the Steps?',}],
    next: 'twelve-steps',
  },
  {
    id: 'twelve-steps',
    title: 'Twelve Steps of SAA',
    contentBlocks: [
      { 
        type: 'ol',
        items: [
        'We admitted we were powerless over addictive sexual behavior - that our lives had become unmanageable.',
        'Came to believe that a Power greater than ourselves could restore us to sanity.',
        'Made a decision to turn our will and our lives over to the care of God as we understood God.',
        'Made a searching and fearless moral inventory of ourselves.',
        'Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.',
        'Were entirely ready to have God remove all these defects of character.',
        'Humbly asked God to remove our shortcomings.',
        'Made a list of all persons we had harmed and became willing to make amends to them all.',
        'Made direct amends to such people wherever possible, except when to do so would injure them or others.',
        'Continued to take personal inventory and when we were wrong promptly admitted it.',
        'Sought through prayer and meditation to improve our conscious contact with God as we understood God, praying only for knowledge of God’s will for us and the power to carry that out',
        'Having had a spiritual awakening as the result of these steps, we tried to carry this message to other sex addicts and to practice these principles in our lives.'
      
      ]
    },
    {
      type: 'p2',
      text:
      'These steps are the heart of our program. They contain a depth that we could hardly have guessed when we started.\nOver time, we establish a relationship with a Power greater than ourselves, each of us\ncoming to an understanding of a Higher Power that is personal for us.' + 
      '\n\n' +
      'The SAA program offers a spiritual solution to our addiction, without requiring adherence to any specific set of beliefs or practices.' + 
      '\n\n' +
      'But the steps are more than a series of exercises. They provide basic principles for living.\nMost of us find opportunities on a daily basis to apply one or more of the steps to some challenge in our life.\nOver time, the spiritual principles in the steps become integrated into our thoughts, feelings, and behavior.\nWe find that we are not only working the steps — we are living them.' + 
      '\n\n' +
      'Excerpted from Sex Addicts Anonymous pages 21 and following.'
    }],
    next: 'reading-portion',
  },
  {
    id: 'silent-meditation',
    title: 'Silent Meditation',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        'That wraps up our reading. Now we’ll take five minutes for silent meditation.' +
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
        src: '/images/meditation-in-progress.jpg',
        alt: 'Peaceful meditation background',
        width: 700,
      },
      { 
        type: 'p1',
        text : 
        'Please turn your cameras off and mute yourselves so that we don’t disturb one another'
      }],
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
        'That concludes our meditation.' +
        '\n\n' +
        'Now we’ll take 10 minutes for independent step work.' + 
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
        'Thanks for sharing!' + 
        '\n\n' +
        'Please mute yourself and turn off your camera so we don’t distract each other.\nI’m starting a 10-minute timer now and will let you know when time’s up.' +
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
        src: '/images/step-work-in-progress.jpg',
        alt: 'Peaceful meditation background',
        width: 700,
      },
      { 
        type: 'p1',
        text : 
        'Please turn your cameras off and mute yourselves so that we don’t disturb one another'
      }],
    timerSeconds: 600,
    next: 'stepwork-conclusion',
  },
  {
    id: 'stepwork-conclusion',
    title: 'Stepwork Conclusion',
    contentBlocks: [{ 
        type: 'p1',
        text : 
        'That brings us to the end of our step work. We’ll now close by going around the room for brief shares,\nup to two minutes each. You’re welcome to share gratitude, set an intention,\nmake a commitment for the day, leave something at the door, or just check in.'
      }],
    next: 'sharing-guidelines',
  },
  {
    id: 'sharing-guidelines',
    title: 'Sharing Guidelines',
    contentBlocks: [
      { 
        type: 'p1',
        text : 
        'As a quick reminder, please follow SAA sharing guidelines:'
      },
      { 
        type: 'ul',
        items : 
        [
          'Speak from your own experience using “I” statements',
          'Avoid explicit or graphic details, or naming specific people or places',
          'And please don’t interrupt or speak directly to others'
        ]
      },
      { 
        type: 'p1',
        text : 
        'We also don’t give advice unless it’s asked for, and we ask\n' + 
        'that outside topics like politics or religion be left out.' +
        '\n\n' +
        'If you’d like to share, please raise your hand using the Reactions tab,\nor press *9 if you’re calling in. I’ll call on people in order.' +
        '\n\n' +
        'Shares are limited to two minutes.\nWould someone be willing to volunteer\nas our timer and give a gentle time reminder?'
      },
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
        'That seems to be all we have time for today, thank you all who shared!*' +
        '\n\n' +
        'If you have your hand raised and did not get to chance to share yet,\nplease keep your hand raised; we would be happy to hear from you\nin fellowship, which happens right after the meeting officially ends' +
        '\n\n' +
        'Just as a reminder: our seventh tradition states that we ought to be fully self-supporting\n' +
        'and so we invite those of you who would like to support the work of our International Service Office (ISO)\n' + 
        '— which helps maintain meeting lists, develop literature, and support the fellowship behind the scenes —\n'+
        'to donate using the link below.' +
        '\n\n' +
        'There’s also a link if you’d like to learn more about what the ISO does.'
      }
    ],
    metaInstructions: [
      'Host mentions to participants whose hands are raised, who did not get a chance to share, that they can share during fellowship' +
      '\n\n' +
      '',
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
        'You’re welcome to stick around after the meeting for fellowship to ask questions,\n' + 
        'or just connect if you need support. If you notice someone hasn’t been around for a while,\nwe encourage members of the same gender to check in on them and let them know they’re missed.' + 
        '\n\n' + 
        'Let’s take a brief moment of silence for the addicts and their families\n who still suffer, then close with the Serenity Prayer.'
      }
    ],
    metaInstructions: [
      'Host has discretion to use singular or we version' +
      '\n\n' +
      '',
    ],
    timerSeconds: 10,
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
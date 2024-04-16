import * as WorkSessionCard from '@/components/experiments/work-session-card'

export type TExperiment = {
  title: string
  description: string
  tags: string[]
  status: 'WIP' | 'Final'
  prototypes: TPrototype[]
}

export type TPrototype = {
  component: React.ReactNode
  description: string
}

export const experimentsData: TExperiment[] = [
  {
    title: 'Work session card',
    description: `Shows some initial information regarding a user's work session, such as time range, related project, and more. The card should expand to reveal additional information, such as the notes taken during the work session.`,
    tags: ['react', 'tailwindcss', 'next.js', 'framer motion'],
    status: 'WIP',
    prototypes: [
      {
        component: <WorkSessionCard.V1 />,
        description: 'Initial design & animation for desktop',
      },
      {
        component: <WorkSessionCard.V2 />,
        description: 'An idea for "expanding" on mobile',
      },
      {
        component: <WorkSessionCard.V3 />,
        description: 'Using Vaul for mobile?',
      },
    ],
  },
]

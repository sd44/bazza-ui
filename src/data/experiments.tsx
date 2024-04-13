import * as WorkSessionCard from '@/components/experiments/work-session-card'

export type TExperiment = {
  title: string
  description: string
  tags: string[]
  prototypes: TPrototype[]
}

export type TPrototype = {
  component: React.ReactNode
}

export const experimentsData: TExperiment[] = [
  {
    title: 'Work session card',
    description: `Shows some initial information regarding a user's work session, such as time range, related project, and more. The card should expand to reveal additional information, such as the notes taken during the work session.`,
    tags: ['react', 'tailwindcss', 'next.js', 'framer motion'],
    prototypes: [
      {
        component: <WorkSessionCard.V1 />,
      },
    ],
  },
]

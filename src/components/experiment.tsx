import { TExperiment } from '@/data/experiments'
import { Badge } from './ui/badge'
import Prototype from './prototype'
import PrototypeGallery from './prototype-gallery'

export default function Experiment({
  experiment,
}: {
  experiment: TExperiment
}) {
  const { title, description, tags, prototypes } = experiment
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-12 xl:gap-24">
      <div className="lg:max-w-[250px] space-y-4">
        <h2 className="font-semibold text-lg font-mono tracking-tighter">
          {title}
        </h2>
        <div className="flex gap-1 flex-wrap">
          {tags.map((t) => (
            <Badge
              variant="secondary"
              className="font-medium"
              key={t}
            >
              {t}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
      <PrototypeGallery prototypes={prototypes} />
    </div>
  )
}

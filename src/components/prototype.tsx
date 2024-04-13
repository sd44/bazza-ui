import { FlaskConical } from 'lucide-react'

type TPrototype = {
  number: number
  title: React.ReactNode | string
  description: React.ReactNode | string
  component: React.ReactNode
}

export default function Prototype() {
  return (
    <div className="flex flex-col gap-6">
      <Title
        title="Solid behaviour... for desktop"
        number={1}
      />
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum
        turpis quam, semper bibendum ante ultrices at. Ut diam ligula,
        ullamcorper a faucibus sit amet, facilisis eget libero. Proin a eros nec
        justo consequat dictum eget non massa. Duis ac augue in turpis pharetra
        suscipit fermentum in ipsum. Donec suscipit convallis neque at vehicula.
        Vivamus vitae molestie metus. Phasellus in purus maximus, malesuada quam
        non, finibus purus. Nullam nec hendrerit lacus. Nullam semper vehicula
        mi at luctus. Donec convallis varius mi. Nam pellentesque dictum orci,
        in iaculis est hendrerit in.
      </Description>
      <Sandbox />
    </div>
  )
}

interface TitleProps {
  number: number
  title: string | React.ReactNode
}

const Title = ({ number, title }: TitleProps) => (
  <h2 className="text-xl font-mono font-medium tracking-tighter">
    <div className="flex gap-2 items-center">
      <FlaskConical className="size-8" />
      <span className="font-extrabold">Prototype {number}</span>
      <span>/</span>
      <span>{title}</span>
    </div>
  </h2>
)

interface DescriptionProps {
  children?: React.ReactNode
}

const Description = ({ children }: DescriptionProps) => (
  <div className="text-zinc-500">{children}</div>
)

interface SandboxProps {
  children?: React.ReactNode
}

const Sandbox = ({ children }: SandboxProps) => (
  <div className="relative min-h-[500px] shadow-sm rounded-3xl">
    <div className="absolute inset-0 bg-circuit-board opacity-[.03] blur-[2px]" />
    {children}
  </div>
)

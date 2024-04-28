'use client'

import { useCallback, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Command as CommandPrimitive } from 'cmdk'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { LoaderCircle, Tag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { nanoid } from 'nanoid'
import { sleep } from '@/lib/utils'

const initialTags: MultiSelectOption[] = [
  { label: 'Food/Drink', value: nanoid(6) },
  { label: 'Groceries', value: nanoid(6) },
  { label: 'Transportation', value: nanoid(6) },
]

export default function V3() {
  const [tags, setTags] = useState(initialTags)

  async function createTagAsync({ label }: { label: string }) {
    await sleep(2000)
    const newTag = { label: label, value: nanoid(6) }
    setTags((prev) => [...prev, newTag])

    return newTag
  }

  return (
    <div>
      <MultiSelect
        options={tags}
        createOption={createTagAsync}
      />
    </div>
  )
}

interface MultiSelectOption {
  value: string | number
  label: string
}

interface MultiSelectProps {
  options?: MultiSelectOption[]
  createOption?: ({
    label,
  }: Pick<MultiSelectOption, 'label'>) =>
    | Promise<MultiSelectOption>
    | MultiSelectOption
}

function MultiSelect({ options = [], createOption }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [selected, setSelected] = useState<MultiSelectOption[]>([])

  const selectables = options.filter(
    (o) => !selected.some((s) => s.value === o.value),
  )

  function handleUnselect(option: MultiSelectOption) {
    setSelected((prev) => prev.filter((p) => p.value !== option.value))
  }

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (
          createOption &&
          e.key === 'Enter' &&
          input.value.trim().length > 0 &&
          !options.find((o) => o.label === input.value.trim())
        ) {
          e.preventDefault()
          // Add a new tag
          setLoading(true)
          const newTag = await createOption({ label: input.value })
          setLoading(false)

          setSelected((prev) => [...prev, newTag])
          setInputValue('')

          setTimeout(() => input.focus(), 1)
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [createOption, options],
  )

  console.log('options:', options)
  console.log('selected:', selected)
  console.log('selectables:', selectables)

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="bg-background border border-input rounded-md px-3 py-2 w-[400px] text-sm">
        <div className="flex gap-1 flex-wrap">
          {selected.map((s) => (
            <Badge
              key={s.value}
              className="inline-flex gap-1 hover:"
            >
              {s.label}
              <Button
                className="h-fit p-0.5 rounded-full"
                onClick={() => handleUnselect(s)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            disabled={loading}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select tags..."
            className="ml-1 flex-1 outline-none"
          />
        </div>
      </div>
      <div className="relative">
        {open && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandEmpty>
                {loading ? (
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <LoaderCircle className="h-4 w-4 animate-spin" /> Creating
                    tag...
                  </span>
                ) : inputValue.trim().length > 0 &&
                  !options.find((o) => o.label === inputValue.trim()) ? (
                  <span className="text-muted-foreground">
                    Create a new tag:{' '}
                    <span className="text-primary">{inputValue}</span>
                  </span>
                ) : (
                  <span> No results found.</span>
                )}
              </CommandEmpty>
              <CommandGroup className="h-full overflow-auto">
                {!loading &&
                  selectables.map((s) => (
                    <CommandItem
                      key={s.value}
                      value={s.label}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue('')
                        setSelected((prev) => [...prev, s])
                      }}
                    >
                      {s.label}
                    </CommandItem>
                  ))}
                {loading ? (
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <LoaderCircle className="h-4 w-4 animate-spin" /> Creating
                    tag...
                  </span>
                ) : (
                  inputValue.trim().length > 0 &&
                  !options.find((o) => o.label === inputValue.trim()) && (
                    <div className="flex justify-center">
                      <span className="text-muted-foreground">
                        Create a new tag:{' '}
                        <span className="text-primary">{inputValue}</span>
                      </span>
                    </div>
                  )
                )}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </div>
    </Command>
  )
}

'use client'

import { useCallback, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { sleep } from '@/lib/utils'
import { Command as CommandPrimitive } from 'cmdk'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const tagsFromDB: MultiSelectOption[] = [
  { label: 'Food/Drink', value: 0 },
  { label: 'Groceries', value: 1 },
  { label: 'Transportation', value: 2 },
]

export default function V2() {
  const [tags, setTags] = useState(tagsFromDB)

  async function createTag(label: string) {
    await sleep(2000)
    setTags((prev) => [...prev, { label: label, value: label }])
  }

  return (
    <div>
      <MultiSelect options={tags} />
    </div>
  )
}

interface MultiSelectOption {
  value: string | number
  label: string
}

interface MultiSelectProps {
  options?: MultiSelectOption[]
}

function MultiSelect({ options = [] }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
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
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Enter') {
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
    [],
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
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((s) => (
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
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </div>
    </Command>
  )
}

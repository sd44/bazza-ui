'use client'

import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
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
import { nanoid } from 'nanoid'
import { cn } from '@/lib/utils'

const initialTags: MultiSelectOption[] = [
  { label: 'Food/Drink', id: nanoid(6) },
  {
    label: 'Groceries',
    id: nanoid(6),
  },
  { label: 'Transportation', id: nanoid(6) },
]

export default function V4() {
  const [selectedTags, setSelectedTags] = useState<MultiSelectOption[]>([])

  return (
    <div>
      <MultiSelect
        options={initialTags}
        value={selectedTags}
        setValue={setSelectedTags}
      />
    </div>
  )
}

interface MultiSelectOption {
  id?: string | number
  label: string
}

interface MultiSelectProps {
  options?: MultiSelectOption[]
  value: MultiSelectOption[]
  setValue: Dispatch<SetStateAction<MultiSelectOption[]>>
}

function MultiSelect({ options = [], value, setValue }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')

  const searchInput =
    inputValue.trim().length > 0 ? inputValue.trim() : undefined

  const searchMatchesExistingOption = Boolean(
    options.find((o) => o.label === searchInput) ||
      value.find((s) => s.label === searchInput),
  )

  const selectables = options.filter(
    (o) => !value.some((v) => v.label === o.label),
  )

  function handleUnselect(option: MultiSelectOption) {
    setValue((prev) => prev.filter((p) => p.label !== option.label))
  }

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Enter' && searchInput && !searchMatchesExistingOption) {
          e.preventDefault()

          setValue((prev) => [...prev, { label: searchInput }])
          setInputValue('')

          setTimeout(() => input.focus(), 1)
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setValue((prev) => {
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
    [setValue, searchInput, searchMatchesExistingOption],
  )

  console.log('options:', options)
  console.log('value:', value)
  console.log('selectables:', selectables)
  console.log('searchInput:', searchInput)
  console.log('searchMatchesExistingOption:', searchMatchesExistingOption)
  console.log('=======================================')

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="bg-background border border-input rounded-md px-3 py-2 w-[400px] text-sm">
        <div className="flex gap-1 flex-wrap">
          {value.map((v) => (
            <Badge
              variant="secondary"
              key={v.label}
              className={cn('inline-flex gap-1 select-none')}
            >
              {v.label}
              <Button
                className="h-fit p-0.5 rounded-full bg-transparent hover:bg-transparent"
                onClick={() => handleUnselect(v)}
              >
                <X className="h-3 w-3 text-primary" />
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
              {(!searchInput || searchMatchesExistingOption) && (
                <CommandEmpty>
                  <span>No results found.</span>
                </CommandEmpty>
              )}
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((s) => (
                  <CommandItem
                    key={s.label}
                    value={s.label}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={() => {
                      setInputValue('')
                      setValue((prev) => [...prev, s])
                    }}
                  >
                    {s.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              {searchInput && !searchMatchesExistingOption && (
                <CommandGroup>
                  <CommandItem value={searchInput}>
                    <span className="inline-flex items-center gap-2">
                      Create a new tag:
                      <Badge className={cn('inline-flex gap-1 select-none')}>
                        {searchInput}
                      </Badge>
                    </span>
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </div>
        )}
      </div>
    </Command>
  )
}

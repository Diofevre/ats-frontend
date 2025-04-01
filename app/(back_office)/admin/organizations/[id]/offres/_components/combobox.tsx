'use client'

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComboboxProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  emptyMessage?: string
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Sélectionner une option...",
  emptyMessage = "Aucun résultat trouvé."
}: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const selectedLabel = options.find((option) => option.value === value)?.label
  const containerRef = React.useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={cn(
          "h-12 px-3 w-full rounded-md border border-input bg-white text-sm ring-offset-background flex items-center justify-between cursor-pointer",
          isOpen && "border-blue-500 ring-2 ring-blue-500"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-900">{selectedLabel || placeholder}</span>
        <Search className="h-4 w-4 text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md border border-gray-200 shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-2 py-3 text-sm text-gray-500 text-center">{emptyMessage}</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "px-2 py-2 text-sm cursor-pointer hover:bg-gray-100",
                    value === option.value && "bg-gray-100"
                  )}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                    setSearchTerm("")
                  }}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
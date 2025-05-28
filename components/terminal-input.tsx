"use client"

import { useState } from "react"

interface TerminalInputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
}

export function TerminalInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  error,
}: TerminalInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="text-[#00e5ff] text-sm">
          {label} {required && <span className="text-[#ff5370]">*</span>}
        </label>
        {error && <span className="text-[#ff5370] text-xs">{error}</span>}
      </div>
      <div
        className={`border ${
          error ? "border-[#ff5370]" : focused ? "border-[#00e5ff]" : "border-[#00e5ff50]"
        } bg-[#05152599] transition-colors`}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-3 py-2 bg-transparent text-[#00e5ff] outline-none font-mono"
          required={required}
        />
      </div>
    </div>
  )
}

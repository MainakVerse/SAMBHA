"use client"

import { useEffect, useState } from "react"

interface TerminalTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TerminalText({ text, speed = 50, className = "", onComplete }: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <div className={`font-mono ${className}`}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">_</span>}
    </div>
  )
}

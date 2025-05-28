"use client"

import { useState, useEffect } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("INITIALIZING PROTOCOL")

  // Total loading time in milliseconds (currently set to 8 seconds)
  const totalLoadTime = 8000
  // How often to update the progress (every 100ms)
  const updateInterval = 100
  // Calculate increment per interval
  const incrementPerInterval = 100 / (totalLoadTime / updateInterval)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Calculate new progress value
        const newProgress = prevProgress + incrementPerInterval

        // Check if we've reached or exceeded 100%
        if (newProgress >= 100) {
          // Clear the interval immediately
          clearInterval(interval)
          // Set status text immediately
          setStatusText("ACCESS GRANTED")
          // Call onComplete after a short delay
          setTimeout(() => {
            onComplete()
          }, 1000)
          // Return exactly 100 to avoid exceeding 100%
          return 100
        }

        // Update status text based on progress thresholds
        if (newProgress >= 0 && newProgress < 20) {
          setStatusText("INITIALIZING PROTOCOL")
        } else if (newProgress >= 20 && newProgress < 40) {
          setStatusText("ESTABLISHING CONNECTION")
        } else if (newProgress >= 40 && newProgress < 60) {
          setStatusText("VERIFYING CREDENTIALS")
        } else if (newProgress >= 60 && newProgress < 80) {
          setStatusText("LOADING ASSETS")
        } else if (newProgress >= 80) {
          setStatusText("PREPARING INTERFACE")
        }

        return newProgress
      })
    }, updateInterval)

    // Clean up interval on component unmount
    return () => clearInterval(interval)
  }, [incrementPerInterval, updateInterval, onComplete])

  return (
    <div className="grid-bg flex flex-col items-center justify-center min-h-screen">
      <h1 className="protocol-title glitch">WELCOME TO SAMBHA</h1>
      <div className="content-box">
        <div className="version">v1.0.0</div>
        <div className="status-container">
          <div>{statusText}</div>
          <div>{Math.floor(progress)}%</div>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="security-info">
          
          <div>ENTERING THE CASTLE OF POSSIBILITIES...</div>
        </div>
      </div>
    </div>
  )
}

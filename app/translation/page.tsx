"use client"

import { useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { Navbar } from "@/components/navbar"

import { Footer } from "@/components/footer"
import CodeTranslator from "@/components/code-translator"

export default function Translate() {
  const [loading, setLoading] = useState(true)

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  return (
    <div className="grid-bg">
      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Navbar />
          <CodeTranslator />
          <Footer />
        </>
      )}
    </div>
  )
}

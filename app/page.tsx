"use client"

import { useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { AboutSection } from "@/components/about-section"

import { Footer } from "@/components/footer"
import { VideoSection } from "@/components/video-section"

export default function Home() {
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
          <HeroSection />
          <FeaturesSection />          
          <AboutSection />
          <VideoSection />
          
          <Footer />
        </>
      )}
    </div>
  )
}

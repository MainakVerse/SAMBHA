import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { SoundProvider } from "@/context/SoundContext"
import SoundButton from "@/components/SoundButton"


export const metadata: Metadata = {
  title: "SAMBHA",
  description: "AI powered code review, translation, and documentation assistant",
    generator: 'v1.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SoundProvider>
            
            <SoundButton />
            <div className="scanline"></div>
            {children}
          </SoundProvider>
       
      </body>
    </html>
  )
}

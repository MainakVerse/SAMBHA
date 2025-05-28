"use client"

import { useState } from "react"
import Link from "next/link"


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900 border-b border-[#00e5ff30]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="protocol-title text-xl">SAMBHA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/translation" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                &gt; TRANSLATION
              </Link>
              <Link href="/documentation" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                &gt; DOCUMENTATION
              </Link>
              <Link href="/code-review" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                &gt; CODE REVIEW
              </Link>
              <Link href="/pr-template" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                &gt; PR TEMPLATE
              </Link>
          </nav>

          

          <button
      className="md:hidden text-[#00e5ff] p-2 rounded-lg hover:bg-[#00e5ff1a] transition-colors"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle Menu"
    >
      {isMenuOpen ? (
        // Close icon (X)
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        // Hamburger icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-[#00e5ff30] bg-[#05152599] backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <Link href="/translation" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                &gt; TRANSLATION
              </Link>
              <Link href="/documentation" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                &gt; DOCUMENTATION
              </Link>
              <Link href="/code-review" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                &gt; CODE REVIEW
              </Link>
              <Link href="/pr-template" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>
                &gt; PR TEMPLATE
              </Link>
              
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

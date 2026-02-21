"use client"

import { useState, useEffect } from "react"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
        scrolled
          ? "bg-[#FAF9F6]/90 backdrop-blur-sm shadow-[0_1px_0_0_#E0DCD5]"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-14 md:h-16">
        <a
          href="#"
          className="font-serif text-[#1A1A1A] text-[13px] md:text-[14px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-50"
          style={{ fontWeight: 400 }}
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          Solomei AI
        </a>
      </div>
    </header>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const scrollToSection = useCallback(
    (href: string) => {
      setMenuOpen(false)
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    },
    []
  )

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Platform", href: "#platform" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-[#FAF9F6]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-14 py-5 md:py-6">
          {/* Logo - left side */}
          <a
            href="#"
            className="text-[#1A1A1A] text-[13px] md:text-[14px] tracking-[0.25em] uppercase font-serif font-medium transition-opacity duration-300 hover:opacity-50"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#")
            }}
          >
            Solomei AI
          </a>

          {/* Hamburger button - always visible */}
          <button
            className="relative z-[60] flex flex-col justify-center items-center w-8 h-8 gap-[7px] group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-[22px] h-[1px] transition-all duration-500 ease-in-out origin-center ${
                menuOpen ? "bg-[#FAF9F6] rotate-45 translate-y-[4px]" : "bg-[#1A1A1A]"
              }`}
            />
            <span
              className={`block w-[22px] h-[1px] transition-all duration-500 ease-in-out origin-center ${
                menuOpen ? "bg-[#FAF9F6] -rotate-45 -translate-y-[4px]" : "bg-[#1A1A1A]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-700 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark background */}
        <div
          className={`absolute inset-0 bg-[#1A1A1A] transition-opacity duration-700 ease-in-out ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu content */}
        <nav
          className="relative z-10 flex flex-col items-center justify-center h-full"
          aria-label="Main navigation"
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`block text-[#FAF9F6] text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-[0.08em] py-4 md:py-5 transition-all duration-700 ease-in-out hover:opacity-60 ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: menuOpen ? `${150 + i * 100}ms` : "0ms",
              }}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.href)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

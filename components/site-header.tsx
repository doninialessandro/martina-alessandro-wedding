"use client"

import { useState, useEffect, useCallback } from "react"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      setTimeout(() => {
        if (href === "#") {
          window.scrollTo({ top: 0, behavior: "smooth" })
          return
        }
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          scrolled
            ? "bg-[#FAF9F6]/95 backdrop-blur-sm shadow-[0_1px_0_0_#E0DCD5]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-5 md:py-6">
          {/* Logo — serif, elegant, matching solomei.ai's exact style */}
          <a
            href="#"
            className="text-[#1A1A1A] text-[15px] md:text-[16px] tracking-[0.2em] uppercase font-serif transition-opacity duration-300 hover:opacity-50"
            style={{ fontWeight: 400, letterSpacing: "0.2em" }}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#")
            }}
          >
            Solomei AI
          </a>

          {/* Menu toggle — thin monoline, consistent with site's line weight */}
          <button
            className="relative z-[60] flex items-center justify-center w-7 h-7"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="overflow-visible"
            >
              <line
                x1="1" y1="6" x2="19" y2="6"
                stroke={menuOpen ? "#FAF9F6" : "#1A1A1A"}
                strokeWidth="1"
                className="origin-center transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{
                  transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
                  transformOrigin: "center",
                }}
              />
              <line
                x1="1" y1="14" x2="19" y2="14"
                stroke={menuOpen ? "#FAF9F6" : "#1A1A1A"}
                strokeWidth="1"
                className="origin-center transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{
                  transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
                  transformOrigin: "center",
                }}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-600 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#1A1A1A] transition-opacity duration-600 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <nav
          className="relative z-10 flex flex-col items-center justify-center h-full gap-1"
          aria-label="Main navigation"
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`block text-[#FAF9F6] text-3xl md:text-4xl lg:text-5xl font-serif tracking-[0.06em] py-4 md:py-5 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] hover:text-[#C4A882] ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: menuOpen ? `${200 + i * 80}ms` : "0ms",
                fontWeight: 400,
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

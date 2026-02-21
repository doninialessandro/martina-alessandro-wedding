"use client"

import { useState, useEffect, useCallback } from "react"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return }
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }, 120)
  }, [])

  const links = [
    { label: "About", href: "#about" },
    { label: "Platform", href: "#platform" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <>
      {/* ── Fixed header bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          scrolled
            ? "bg-[#FAF9F6]/90 backdrop-blur-sm"
            : "bg-transparent"
        }`}
        style={{
          boxShadow: scrolled ? "0 1px 0 0 #E0DCD5" : "none",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-[72px]">
          {/* Logo — matches original: title-case, regular weight, serif, small size */}
          <a
            href="#"
            className="font-serif text-[#1A1A1A] text-[14px] md:text-[15px] tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-50"
            style={{ fontWeight: 400 }}
            onClick={(e) => { e.preventDefault(); scrollTo("#") }}
          >
            Solomei AI
          </a>

          {/* Hamburger — thin single-weight lines matching site's monoline aesthetic */}
          <button
            className="relative z-[60] flex items-center justify-center w-8 h-8 -mr-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="overflow-visible">
              {/* Top line → rotates to form X */}
              <line
                x1="0" y1="1" x2="22" y2="1"
                stroke={menuOpen ? "#FAF9F6" : "#1A1A1A"}
                strokeWidth="1"
                style={{
                  transition: "all 0.45s cubic-bezier(0.33,1,0.68,1)",
                  transformOrigin: "11px 8px",
                  transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              />
              {/* Bottom line → rotates to form X */}
              <line
                x1="0" y1="15" x2="22" y2="15"
                stroke={menuOpen ? "#FAF9F6" : "#1A1A1A"}
                strokeWidth="1"
                style={{
                  transition: "all 0.45s cubic-bezier(0.33,1,0.68,1)",
                  transformOrigin: "11px 8px",
                  transform: menuOpen ? "rotate(-45deg)" : "rotate(0deg)",
                }}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay navigation ── */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-[#1A1A1A]"
          onClick={() => setMenuOpen(false)}
        />

        {/* Navigation links */}
        <nav
          className="relative z-10 flex flex-col items-center justify-center h-full gap-2"
          aria-label="Main navigation"
        >
          {links.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`block text-[#FAF9F6] font-serif text-3xl md:text-4xl lg:text-5xl tracking-[0.04em] py-4 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] hover:text-[#C4A882] ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontWeight: 400,
                transitionDelay: menuOpen ? `${180 + i * 80}ms` : "0ms",
              }}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

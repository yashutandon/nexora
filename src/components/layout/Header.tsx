"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Flame } from "lucide-react"
import { Link as ViewTransitionsLink } from "next-view-transitions"

import { ThemeToggleButton } from "../ui/theme-style"

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false)
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
        <div
          className={`
            w-full max-w-6xl
            rounded-b-2xl border-b border-x
            transition-all duration-300 ease-in-out
            ${scrolled
              ? "border-black/10 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20"
              : "border-black/6 dark:border-white/6"
            }
            bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md
          `}
        >
          <div className="flex items-center justify-between px-4 sm:px-5 h-14">

            <Link href="/" className="flex items-center gap-2 group select-none">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-600 dark:bg-red-500 text-white transition-transform duration-200 group-hover:scale-110">
                <Flame size={14} strokeWidth={2.2} />
              </span>
              <span
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="font-semibold text-[22px] tracking-tight text-zinc-900 dark:text-zinc-100 leading-none"
              >
                Nexora
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => (
                <ViewTransitionsLink
                  key={link.href}
                  href={link.href}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="px-3 py-1.5 text-[13.5px] font-medium text-zinc-600 dark:text-zinc-400 rounded-lg hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150"
                >
                  {link.label}
                </ViewTransitionsLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggleButton />

              <ViewTransitionsLink
                href="/get-started"
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-[13px] font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-white transition-colors duration-150"
              >
                Get started
              </ViewTransitionsLink>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150"
              >
                {menuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
              </button>
            </div>
          </div>

          <div
            className={`
              sm:hidden overflow-hidden transition-all duration-300 ease-in-out
              ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="border-t border-black/6 dark:border-white/6 px-3 py-2 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <ViewTransitionsLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="px-3 py-2.5 text-[14px] font-medium text-zinc-600 dark:text-zinc-400 rounded-lg hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150"
                >
                  {link.label}
                </ViewTransitionsLink>
              ))}
              <div className="pt-2 pb-1">
                <ViewTransitionsLink
                  href="/get-started"
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="flex items-center justify-center w-full py-2.5 rounded-lg text-[13.5px] font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-white transition-colors duration-150"
                >
                  Get started
                </ViewTransitionsLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header
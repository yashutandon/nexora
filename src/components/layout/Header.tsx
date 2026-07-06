"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link as ViewTransitionsLink } from "next-view-transitions";

import { NexoraLogo } from "../ui/NexoraLogo";
import { ThemeToggleButton } from "../ui/theme-style";
import { UserNav } from "./UserNav";
import { navConfig } from "@/config/nav";
import { siteConfig } from "@/config/site";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 pt-4 pb-2 pointer-events-none">
      <div
        className={`
          pointer-events-auto w-full max-w-5xl rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${scrolled
            ? "border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl shadow-black/10 dark:shadow-black/40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl py-2 px-4"
            : "border-transparent bg-transparent py-4 px-2"
          }
        `}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group select-none ml-2">
            <div className="flex items-center justify-center w-8 h-8 transition-transform duration-300 group-hover:scale-110">
              <NexoraLogo className="w-full h-full" />
            </div>
            <span
              className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Nexora
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
            {navConfig.filter(link => !link.disabled).map((link) => (
              <ViewTransitionsLink
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 rounded-full hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
              >
                {link.label}
              </ViewTransitionsLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 mr-2">
            <ThemeToggleButton />
            <UserNav />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out px-2
            ${menuOpen ? "max-h-72 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
          `}
        >
          <div className="flex flex-col gap-1 py-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
            {navConfig.filter(link => !link.disabled).map((link) => (
              <ViewTransitionsLink
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-300 rounded-xl hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </ViewTransitionsLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
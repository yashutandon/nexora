import Link from "next/link"
import { Flame } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "Components", href: "/components" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "GitHub", href: "https://github.com" },
    { label: "NPM", href: "https://npmjs.com" },
    { label: "Releases", href: "/releases" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Contact", href: "/contact" },
  ],
}

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-black/6 dark:border-white/6">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-6xl py-12">

          {/* Top section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">

            {/* Brand col */}
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 select-none w-fit">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-600 dark:bg-red-500 text-white">
                  <Flame size={14} strokeWidth={2.2} />
                </span>
                <span
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="font-semibold text-[22px] tracking-tight text-zinc-900 dark:text-zinc-100 leading-none"
                >
                  Nexora
                </span>
              </Link>
              <p
                style={{ fontFamily: "var(--font-dm-sans)" }}
                className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-45"
              >
                Open source Next.js component library for modern web apps.
              </p>
            </div>

            {/* Link cols */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="flex flex-col gap-3">
                <p
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500"
                >
                  {group}
                </p>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                        className="text-[13.5px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-black/6 dark:border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[12px] text-zinc-400 dark:text-zinc-500"
            >
              © {new Date().getFullYear()} Nexora. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "License"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="text-[12px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-150"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
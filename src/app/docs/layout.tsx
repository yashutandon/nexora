import { Metadata } from "next"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to build beautiful interfaces with Nexora UI.",
}

const docsConfig = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs#installation" },
      { title: "CLI", href: "/docs#cli" },
    ],
  },
  {
    title: "Architecture",
    items: [
      { title: "Components", href: "/docs#components" },
      { title: "Theming", href: "/docs#theming" },
    ],
  },
  {
    title: "Pro Features",
    items: [
      { title: "Premium Blocks", href: "/docs#pro" },
    ],
  },
]

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row pt-24 px-4 md:px-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-[250px] shrink-0 md:border-r border-zinc-200 dark:border-white/10 pr-0 md:pr-6 pb-10 md:pb-0 h-auto md:h-[calc(100vh-6rem)] md:sticky top-24 z-10 bg-white dark:bg-zinc-950">
          <ScrollArea className="h-full w-full pr-4">
            <div className="space-y-8">
              {docsConfig.map((group, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
                    {group.title}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {group.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 md:pl-10 pb-24">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}

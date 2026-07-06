import * as React from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

export function HeroSection({
  className,
  title = "Ship your startup in days, not weeks",
  subtitle = "The ultimate Next.js component library for building modern, premium SaaS applications. Beautifully designed, accessible, and ready for production.",
  badgeText = "Introducing Nexora UI v2.0",
  ...props
}: HeroSectionProps) {
  return (
    <div className={cn("relative overflow-hidden bg-white dark:bg-black", className)} {...props}>
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 dark:opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="mx-auto max-w-2xl text-center">
          
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-900/10 dark:ring-white/10 hover:ring-zinc-900/20 dark:hover:ring-white/20 transition-all flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              {badgeText}
              <a href="#" className="font-semibold text-zinc-900 dark:text-white">
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl text-balance">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 text-balance">
            {subtitle}
          </p>
          
          {/* Actions */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="group rounded-full bg-zinc-900 dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Get started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white flex items-center gap-2 group">
              View on GitHub
            </a>
          </div>

          {/* Dashboard Preview / Mockup */}
          <div className="mt-16 sm:mt-24">
            <div className="relative rounded-xl bg-zinc-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-zinc-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="rounded-md bg-white dark:bg-zinc-950 shadow-2xl ring-1 ring-zinc-900/10 dark:ring-white/10 flex items-center justify-center aspect-video overflow-hidden relative">
                {/* Mockup Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-zinc-500 opacity-20 blur-[100px]"></div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Your App Screenshot Here</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

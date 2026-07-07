"use client"

import * as React from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
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
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-2xl text-center"
        >
          
          {/* Badge */}
          <motion.div variants={item} className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-900/10 dark:ring-white/10 hover:ring-zinc-900/20 dark:hover:ring-white/20 transition-all flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              {badgeText}
              <a href="#" className="font-semibold text-zinc-900 dark:text-white">
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={item} className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl text-balance">
            {title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p variants={item} className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 text-balance">
            {subtitle}
          </motion.p>
          
          {/* Actions */}
          <motion.div variants={item} className="mt-10 flex items-center justify-center gap-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="group rounded-full bg-zinc-900 dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-zinc-900 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] dark:shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Get started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <a href="#" className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white flex items-center gap-2 group hover:opacity-80 transition-opacity">
              View on GitHub
            </a>
          </motion.div>


        </motion.div>
      </div>
    </div>
  )
}

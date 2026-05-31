"use client"

import { useRef } from "react"
import { Link as ViewTransitionsLink } from "next-view-transitions"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { ArrowRight, Flame, Star, Check, Zap } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
}

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: (d: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
}

const FEATURES = [
  "Tailwind CSS v4 native",
  "Dark mode out of the box",
  "Accessible & ARIA compliant",
]

const STATS = [
  { label: "Components", val: "120+" },
  { label: "Templates", val: "40+" },
  { label: "Downloads", val: "12k" },
]

const COMPONENTS = [
  {
    name: "Button",
    tag: "Form",
    desc: "18 variants",
    dot: "bg-blue-500",
    pill: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-200 dark:ring-blue-500/20",
  },
  {
    name: "DataTable",
    tag: "Data",
    desc: "Sort & filter",
    dot: "bg-violet-500",
    pill: "text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-500/10 ring-1 ring-violet-200 dark:ring-violet-500/20",
  },
  {
    name: "Sidebar",
    tag: "Layout",
    desc: "Collapsible",
    dot: "bg-emerald-500",
    pill: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-emerald-200 dark:ring-emerald-500/20",
  },
  {
    name: "Toast",
    tag: "Feedback",
    desc: "4 types",
    dot: "bg-amber-500",
    pill: "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 ring-1 ring-amber-200 dark:ring-amber-500/20",
  },
]

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -48])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient glow — subtle, stays in bg */}
      <div className="pointer-events-none absolute -top-24 left-1/3 w-[520px] h-[320px] rounded-full bg-red-500/5 dark:bg-red-400/6 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -right-16 w-[280px] h-[280px] rounded-full bg-violet-500/4 dark:bg-violet-400/5 blur-[100px]" />

      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center pt-12 sm:pt-12 pb-12 sm:pb-16"
      >
        {/* ─── LEFT ─── */}
        <div className="flex flex-col gap-8">

          

          {/* Headline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.07}
          >
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-[50px] sm:text-[64px] font-semibold leading-[1.02] tracking-[-0.02em] text-zinc-950 dark:text-zinc-50"
            >
              Ship faster
              <br />
              with{" "}
              <span className="relative inline-block">
                <span className="italic text-red-600 dark:text-red-400">beautiful</span>
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-red-500/60 via-red-400/40 to-transparent rounded-full"
                />
              </span>
              <br />
              components.
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.14}
            className="text-[16px] text-zinc-500 dark:text-zinc-400 leading-[1.75] max-w-[400px]"
          >
            Nexora gives you{" "}
            <span className="text-zinc-700 dark:text-zinc-200 font-medium">120+ production-ready components</span>{" "}
            and{" "}
            <span className="text-zinc-700 dark:text-zinc-200 font-medium">40+ templates</span> — copy, paste, and ship. No configuration hell.
          </motion.p>

          {/* Checklist */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="flex flex-col gap-2.5"
          >
            {FEATURES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[13.5px] text-zinc-600 dark:text-zinc-400"
              >
                <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-red-600 dark:bg-red-500 text-white shrink-0">
                  <Check size={9} strokeWidth={3.5} />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.27}
            className="flex items-center gap-3 flex-wrap pt-1"
          >
            <ViewTransitionsLink
              href="/components"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-semibold bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition-all duration-200 shadow-sm shadow-black/10"
            >
              Browse components
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </ViewTransitionsLink>

            <ViewTransitionsLink
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-medium border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200"
            >
              Read docs
            </ViewTransitionsLink>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.34}
            className="flex items-center gap-3 pt-0.5"
          >
            {/* Avatars */}
            <div className="flex items-center -space-x-2">
              {[
                "bg-violet-200 dark:bg-violet-800",
                "bg-blue-200 dark:bg-blue-800",
                "bg-emerald-200 dark:bg-emerald-800",
                "bg-amber-200 dark:bg-amber-800",
              ].map((bg, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded-full border-2 border-white dark:border-zinc-950 ${bg} inline-block`}
                />
              ))}
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className="fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400"
                />
              ))}
            </div>

            <span className="text-[12.5px] text-zinc-400 dark:text-zinc-500">
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">2,400+</span>{" "}
              developers ship with Nexora
            </span>
          </motion.div>
        </div>

        {/* ─── RIGHT ─── */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          custom={0.18}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-105">

            {/* Main card */}
            <div className="relative rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 overflow-hidden ring-1 ring-black/[0.04] dark:ring-white/[0.04]">

              {/* Titlebar */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70 dark:bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70 dark:bg-amber-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70 dark:bg-emerald-500/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
                    nexora
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-5">

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2.5">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/40 p-3.5 flex flex-col gap-1"
                    >
                      <span
                        style={{ fontFamily: "var(--font-cormorant)" }}
                        className="text-[24px] font-semibold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight"
                      >
                        {s.val}
                      </span>
                      <span className="text-[10.5px] text-zinc-400 dark:text-zinc-500 leading-tight">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                  <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
                    Components
                  </span>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </div>

                {/* Component rows */}
                <div className="flex flex-col gap-1.5">
                  {COMPONENTS.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.55 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/30 hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-150 cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
                        <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                          {c.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${c.pill}`}
                        >
                          {c.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                          {c.desc}
                        </span>
                        <ArrowRight
                          size={11}
                          className="text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors duration-150"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-red-600 dark:bg-red-500">
                  <div className="flex items-center gap-2.5">
                    <Zap size={13} strokeWidth={2} className="text-red-200" />
                    <span className="text-[12.5px] font-semibold text-white tracking-wide">
                      View all components
                    </span>
                  </div>
                  <ArrowRight size={12} className="text-red-200/80" />
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-3.5 -right-3.5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/60 shadow-sm shadow-black/6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                v2.4.0 released
              </span>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-3.5 -left-3.5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/60 shadow-sm shadow-black/6"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={9}
                    className="fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400"
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                2.4k+ devs
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
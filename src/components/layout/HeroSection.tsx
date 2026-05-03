"use client"

import { useRef } from "react"
import { Link as ViewTransitionsLink } from "next-view-transitions"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { ArrowRight, Flame, Star, Check } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-10 left-1/4 w-125 h-75 rounded-full bg-red-500/6 dark:bg-red-400/8 blur-[100px]" />

      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-20 sm:pt-28 pb-10 sm:pb-14"
      >
        {/* LEFT */}
        <div className="flex flex-col gap-7">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex items-center gap-2"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-red-600 dark:bg-red-500 text-white">
              <Flame size={10} strokeWidth={2.5} />
            </span>
            <span className="text-[12px] font-medium tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
              Open Source · Next.js · TypeScript
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.08}
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[46px] sm:text-[58px] font-semibold leading-[1.04] tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Ship faster
            <br />
            with{" "}
            <span className="relative inline-block">
              <span className="italic text-red-600 dark:text-red-400">beautiful</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-red-500/30 dark:bg-red-400/30 rounded-full"
              />
            </span>
            <br />
            components.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.16}
            className="text-[15.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-100"
          >
            Nexora gives you 120+ production-ready components and 40+ templates — copy, paste, and ship. No configuration hell.
          </motion.p>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.22}
            className="flex flex-col gap-2"
          >
            {["Tailwind CSS v4 native", "Dark mode out of the box", "Accessible & ARIA compliant"].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 shrink-0">
                  <Check size={9} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="flex items-center gap-3 flex-wrap pt-1"
          >
            <ViewTransitionsLink
              href="/components"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13.5px] font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-white transition-all duration-150"
            >
              Browse components
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </ViewTransitionsLink>

            <ViewTransitionsLink
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13.5px] font-medium border border-black/8 dark:border-white/8 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-150"
            >
              Read docs
            </ViewTransitionsLink>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.38}
            className="flex items-center gap-2 pt-1"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400" />
              ))}
            </div>
            <span className="text-[12px] text-zinc-400 dark:text-zinc-500">
              Trusted by <span className="text-zinc-700 dark:text-zinc-300 font-medium">2,400+</span> developers
            </span>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-105">
            <div className="relative rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-zinc-900 overflow-hidden shadow-xl shadow-black/6 dark:shadow-black/30">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/6 dark:border-white/6">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                </div>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500 ml-1">
                  nexora/ui — components
                </span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: "Components", val: "120+" },
                    { label: "Templates", val: "40+" },
                    { label: "Downloads", val: "12k" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-black/5 dark:border-white/5 p-3 flex flex-col gap-1">
                      <span
                        style={{ fontFamily: "var(--font-cormorant)" }}
                        className="text-[22px] font-semibold text-zinc-900 dark:text-zinc-100 leading-none"
                      >
                        {s.val}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    { name: "Button", tag: "Form", color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10" },
                    { name: "DataTable", tag: "Data", color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10" },
                    { name: "Sidebar", tag: "Layout", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10" },
                    { name: "Toast", tag: "Feedback", color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10" },
                  ].map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-zinc-100/60 dark:hover:bg-zinc-800 transition-colors duration-150 cursor-default"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${c.color}`}>{c.tag}</span>
                        <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">{c.name}</span>
                      </div>
                      <ArrowRight size={12} className="text-zinc-300 dark:text-zinc-600" />
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-red-600 dark:bg-red-500">
                  <div className="flex items-center gap-2">
                    <Flame size={13} strokeWidth={2} className="text-red-200" />
                    <span className="text-[12.5px] font-semibold text-white">View all components</span>
                  </div>
                  <ArrowRight size={12} className="text-red-200" />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-black/8 dark:border-white/8 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">v2.4.0 released</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-3 -left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-black/8 dark:border-white/8 shadow-sm"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={9} className="fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400" />
                ))}
              </div>
              <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">2.4k+ devs</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
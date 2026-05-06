"use client"

import { useRef } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { Moon, Code2, Puzzle, Shield, Feather, Zap } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

const FEATURES = [
  {
    num: "01",
    accent: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
    icon: <Zap size={14} strokeWidth={2} />,
    title: "Lightning fast",
    desc: "Optimized for performance. Every component is tree-shakeable and zero-runtime by default.",
    delay: 0.1,
  },
  {
    num: "02",
    accent: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    icon: <Moon size={14} strokeWidth={2} />,
    title: "Dark mode native",
    desc: "Ships with dark mode out of the box. No extra classes, no extra effort.",
    delay: 0.16,
  },
  {
    num: "03",
    accent: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: <Code2 size={14} strokeWidth={2} />,
    title: "TypeScript first",
    desc: "Fully typed. Your editor knows everything before you do.",
    delay: 0.22,
  },
  {
    num: "04",
    accent: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: <Puzzle size={14} strokeWidth={2} />,
    title: "Composable",
    desc: "Mix, extend, override — nothing locked behind an abstraction.",
    delay: 0.28,
  },
  {
    num: "05",
    accent: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: <Shield size={14} strokeWidth={2} />,
    title: "Accessible by default",
    desc: "ARIA roles, keyboard nav, focus management — baked in.",
    delay: 0.34,
  },
  {
    num: "06",
    accent: "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400",
    icon: <Feather size={14} strokeWidth={2} />,
    title: "Tailwind v4 native",
    desc: "No CSS-in-JS, no runtime overhead. Just utility classes that scale with your codebase.",
    delay: 0.4,
  },
]

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="w-full max-w-6xl pt-10 sm:pt-14 pb-20 sm:pb-28">

        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="flex items-center gap-3 mb-10"
        >
          <span className="h-px w-8 bg-red-500/60" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-red-600 dark:text-red-400">
            Why Nexora
          </span>
        </motion.div>

        {/* Heading + Subtext */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.06}
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[42px] sm:text-[54px] font-semibold leading-[1.06] tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Everything you need.{" "}
            <span className="italic text-red-600 dark:text-red-400">Nothing</span>{" "}
            you don&apos;t.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.12}
            className="text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed lg:pb-1 max-w-sm"
          >
            Nexora is built around one principle — get out of your way. Components that just work, so you ship faster.
          </motion.p>
        </div>

        {/* Feature Cards — uniform 1 / 2 / 3 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map((f) => (
            <motion.div
              key={f.num}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={f.delay}
              className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-zinc-900 p-7 transition-all duration-300 hover:border-black/12 dark:hover:border-white/12"
            >
              {/* Ghost number watermark */}
              <span
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="pointer-events-none select-none absolute -bottom-4 -right-2 text-[120px] font-semibold leading-none text-zinc-100 dark:text-zinc-800 transition-all duration-300 group-hover:text-zinc-200 dark:group-hover:text-zinc-700"
              >
                {f.num}
              </span>

              {/* Icon */}
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${f.accent}`}>
                {f.icon}
              </span>

              {/* Text */}
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-[16px] font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
                <p className="text-[13.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.48}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-5 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-zinc-900"
        >
          {[
            { val: "120+", label: "Components" },
            { val: "40+",  label: "Templates" },
            { val: "12k+", label: "Downloads" },
            { val: "100%", label: "Open source" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex flex-col">
                <span
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="text-[32px] font-semibold leading-none text-zinc-900 dark:text-zinc-100"
                >
                  {s.val}
                </span>
                <span className="mt-0.5 text-[12px] text-zinc-400 dark:text-zinc-500">{s.label}</span>
              </div>
              {i < 3 && (
                <span className="ml-4 hidden h-8 w-px bg-black/[0.07] dark:bg-white/[0.07] sm:block" />
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default FeaturesSection
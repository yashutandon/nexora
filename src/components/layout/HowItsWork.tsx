"use client"

import { useRef, useState } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { Terminal, PackageOpen, Paintbrush, Rocket, Copy, Check } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

type PM = "npm" | "bun" | "yarn" | "pnpm"
const PM_LABELS: PM[] = ["npm", "bun", "yarn", "pnpm"]

type CodeLine =
  | { prompt: string; cmd: string }
  | { comment: string }
  | { line: string }
  | { blank: true }

// ─── Step definitions with detailed bullets + tips ───────────────────────────
const steps = [
  {
    num: "01",
    icon: <Terminal size={15} strokeWidth={2} />,
    title: "Install via CLI",
    desc: "Scaffold a new Next.js project and initialise Nexora with a single command. The init script auto-detects your setup and wires everything.",
    details: [
      "Creates a Next.js 14+ app with TypeScript and Tailwind CSS v4 pre-configured.",
      "Runs nexora-ui init which adds the components.json config file to your project root.",
      "Installs only the peer dependencies you actually need — nothing extra.",
      "Sets up the /lib/utils.ts helper with cn() for className merging out of the box.",
    ],
    tip: "Already have a Next.js project? Skip the first command and run nexora-ui init directly inside your existing repo.",
    accent: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10",
    border: "border-red-200 dark:border-red-500/20",
  },
  {
    num: "02",
    icon: <PackageOpen size={15} strokeWidth={2} />,
    title: "Add components",
    desc: "Pull in exactly the components you need. Each one lands directly in your /components/ui folder — no hidden node_modules magic.",
    details: [
      "Every component is copied as source code into your repo, not imported from a package.",
      "You can add multiple components in a single command by chaining names.",
      "Components are dependency-aware — if Button needs a utility, it gets added too.",
      "Run nexora-ui add --list to browse all 120+ available components before choosing.",
    ],
    tip: "Use nexora-ui diff to see what changed between your local component and the latest Nexora version — perfect for staying up to date without losing customisations.",
    accent: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-200 dark:border-violet-500/20",
  },
  {
    num: "03",
    icon: <Paintbrush size={15} strokeWidth={2} />,
    title: "Customize freely",
    desc: "Every component is plain TypeScript in your codebase. Change anything — structure, variants, logic. Nothing is locked or abstracted away.",
    details: [
      "Open any file in /components/ui and edit it like any other file in your project.",
      "Use Tailwind CSS v4 CSS variables to theme the entire library from one place.",
      "Add new variants, remove unused ones, or change the default props to match your design system.",
      "Components use class-variance-authority (cva) so extending variants is clean and type-safe.",
    ],
    tip: "Drop your brand colors into globals.css as Tailwind v4 variables and every Nexora component picks them up automatically — no per-file edits needed.",
    accent: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-500/20",
  },
  {
    num: "04",
    icon: <Rocket size={15} strokeWidth={2} />,
    title: "Ship to production",
    desc: "Build and deploy like any Next.js app. Nexora adds zero runtime overhead — there is no nexora package in your node_modules at deploy time.",
    details: [
      "The final bundle only contains the components you actually imported — full tree-shaking.",
      "No client-side Nexora SDK, no telemetry, no external network requests at runtime.",
      "Works with Vercel, Netlify, Railway, Docker, or any platform that runs Node.js.",
      "All components are ARIA-compliant and pass Lighthouse accessibility audits out of the box.",
    ],
    tip: "Run next build && next start locally before deploying to catch any type errors introduced during customisation.",
    accent: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
  },
]

// ─── Commands per package manager ────────────────────────────────────────────
const stepCommands: Record<PM, { lines: CodeLine[] }[]> = {
  npm: [
    {
      lines: [
        { prompt: "$", cmd: "npx create-next-app@latest my-app --typescript --tailwind" },
        { prompt: "$", cmd: "cd my-app" },
        { prompt: "$", cmd: "npx nexora-ui@latest init" },
      ],
    },
    {
      lines: [
        { comment: "# add a single component" },
        { prompt: "$", cmd: "npx nexora-ui@latest add button" },
        { blank: true },
        { comment: "# add multiple at once" },
        { prompt: "$", cmd: "npx nexora-ui@latest add data-table sidebar toast" },
        { blank: true },
        { comment: "# browse all available" },
        { prompt: "$", cmd: "npx nexora-ui@latest add --list" },
      ],
    },
    {
      lines: [
        { comment: "// components/ui/button.tsx — it's just your file now" },
        { line: `import { cva } from "class-variance-authority"` },
        { line: `import { cn } from "@/lib/utils"` },
        { line: `` },
        { line: `const buttonVariants = cva("rounded-lg font-medium transition-all", {` },
        { line: `  variants: {` },
        { line: `    variant: { default: "bg-zinc-900 text-white hover:bg-zinc-700",` },
        { line: `               outline: "border border-zinc-200 hover:bg-zinc-50" },` },
        { line: `    size:    { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" },` },
        { line: `  },` },
        { line: `  defaultVariants: { variant: "default", size: "md" },` },
        { line: `})` },
      ],
    },
    {
      lines: [
        { comment: "# type-check everything first" },
        { prompt: "$", cmd: "npx tsc --noEmit" },
        { blank: true },
        { comment: "# build for production" },
        { prompt: "$", cmd: "npm run build" },
        { blank: true },
        { comment: "# start production server" },
        { prompt: "$", cmd: "npm run start" },
        { blank: true },
        { comment: "// ✓  0 nexora packages in node_modules" },
        { comment: "// ✓  fully tree-shaken, ARIA-compliant, type-safe" },
      ],
    },
  ],
  bun: [
    {
      lines: [
        { prompt: "$", cmd: "bunx create-next-app@latest my-app --typescript --tailwind" },
        { prompt: "$", cmd: "cd my-app" },
        { prompt: "$", cmd: "bunx nexora-ui@latest init" },
      ],
    },
    {
      lines: [
        { comment: "# add a single component" },
        { prompt: "$", cmd: "bunx nexora-ui@latest add button" },
        { blank: true },
        { comment: "# add multiple at once" },
        { prompt: "$", cmd: "bunx nexora-ui@latest add data-table sidebar toast" },
        { blank: true },
        { comment: "# browse all available" },
        { prompt: "$", cmd: "bunx nexora-ui@latest add --list" },
      ],
    },
    {
      lines: [
        { comment: "// components/ui/button.tsx — it's just your file now" },
        { line: `import { cva } from "class-variance-authority"` },
        { line: `import { cn } from "@/lib/utils"` },
        { line: `` },
        { line: `const buttonVariants = cva("rounded-lg font-medium transition-all", {` },
        { line: `  variants: {` },
        { line: `    variant: { default: "bg-zinc-900 text-white hover:bg-zinc-700",` },
        { line: `               outline: "border border-zinc-200 hover:bg-zinc-50" },` },
        { line: `    size:    { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" },` },
        { line: `  },` },
        { line: `  defaultVariants: { variant: "default", size: "md" },` },
        { line: `})` },
      ],
    },
    {
      lines: [
        { comment: "# type-check everything first" },
        { prompt: "$", cmd: "bunx tsc --noEmit" },
        { blank: true },
        { comment: "# build for production" },
        { prompt: "$", cmd: "bun run build" },
        { blank: true },
        { comment: "# start production server" },
        { prompt: "$", cmd: "bun run start" },
        { blank: true },
        { comment: "// ✓  0 nexora packages in node_modules" },
        { comment: "// ✓  fully tree-shaken, ARIA-compliant, type-safe" },
      ],
    },
  ],
  yarn: [
    {
      lines: [
        { prompt: "$", cmd: "yarn create next-app my-app --typescript --tailwind" },
        { prompt: "$", cmd: "cd my-app" },
        { prompt: "$", cmd: "yarn dlx nexora-ui@latest init" },
      ],
    },
    {
      lines: [
        { comment: "# add a single component" },
        { prompt: "$", cmd: "yarn dlx nexora-ui@latest add button" },
        { blank: true },
        { comment: "# add multiple at once" },
        { prompt: "$", cmd: "yarn dlx nexora-ui@latest add data-table sidebar toast" },
        { blank: true },
        { comment: "# browse all available" },
        { prompt: "$", cmd: "yarn dlx nexora-ui@latest add --list" },
      ],
    },
    {
      lines: [
        { comment: "// components/ui/button.tsx — it's just your file now" },
        { line: `import { cva } from "class-variance-authority"` },
        { line: `import { cn } from "@/lib/utils"` },
        { line: `` },
        { line: `const buttonVariants = cva("rounded-lg font-medium transition-all", {` },
        { line: `  variants: {` },
        { line: `    variant: { default: "bg-zinc-900 text-white hover:bg-zinc-700",` },
        { line: `               outline: "border border-zinc-200 hover:bg-zinc-50" },` },
        { line: `    size:    { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" },` },
        { line: `  },` },
        { line: `  defaultVariants: { variant: "default", size: "md" },` },
        { line: `})` },
      ],
    },
    {
      lines: [
        { comment: "# type-check everything first" },
        { prompt: "$", cmd: "yarn tsc --noEmit" },
        { blank: true },
        { comment: "# build for production" },
        { prompt: "$", cmd: "yarn build" },
        { blank: true },
        { comment: "# start production server" },
        { prompt: "$", cmd: "yarn start" },
        { blank: true },
        { comment: "// ✓  0 nexora packages in node_modules" },
        { comment: "// ✓  fully tree-shaken, ARIA-compliant, type-safe" },
      ],
    },
  ],
  pnpm: [
    {
      lines: [
        { prompt: "$", cmd: "pnpm create next-app my-app --typescript --tailwind" },
        { prompt: "$", cmd: "cd my-app" },
        { prompt: "$", cmd: "pnpm dlx nexora-ui@latest init" },
      ],
    },
    {
      lines: [
        { comment: "# add a single component" },
        { prompt: "$", cmd: "pnpm dlx nexora-ui@latest add button" },
        { blank: true },
        { comment: "# add multiple at once" },
        { prompt: "$", cmd: "pnpm dlx nexora-ui@latest add data-table sidebar toast" },
        { blank: true },
        { comment: "# browse all available" },
        { prompt: "$", cmd: "pnpm dlx nexora-ui@latest add --list" },
      ],
    },
    {
      lines: [
        { comment: "// components/ui/button.tsx — it's just your file now" },
        { line: `import { cva } from "class-variance-authority"` },
        { line: `import { cn } from "@/lib/utils"` },
        { line: `` },
        { line: `const buttonVariants = cva("rounded-lg font-medium transition-all", {` },
        { line: `  variants: {` },
        { line: `    variant: { default: "bg-zinc-900 text-white hover:bg-zinc-700",` },
        { line: `               outline: "border border-zinc-200 hover:bg-zinc-50" },` },
        { line: `    size:    { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" },` },
        { line: `  },` },
        { line: `  defaultVariants: { variant: "default", size: "md" },` },
        { line: `})` },
      ],
    },
    {
      lines: [
        { comment: "# type-check everything first" },
        { prompt: "$", cmd: "pnpm tsc --noEmit" },
        { blank: true },
        { comment: "# build for production" },
        { prompt: "$", cmd: "pnpm build" },
        { blank: true },
        { comment: "# start production server" },
        { prompt: "$", cmd: "pnpm start" },
        { blank: true },
        { comment: "// ✓  0 nexora packages in node_modules" },
        { comment: "// ✓  fully tree-shaken, ARIA-compliant, type-safe" },
      ],
    },
  ],
}

const ctaCommands: Record<PM, string> = {
  npm:  "npx nexora-ui@latest init",
  bun:  "bunx nexora-ui@latest init",
  yarn: "yarn dlx nexora-ui@latest init",
  pnpm: "pnpm dlx nexora-ui@latest init",
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getPlainText(lines: CodeLine[]): string {
  return lines
    .map((l) => {
      if ("blank" in l) return ""
      if ("prompt" in l) return `${l.prompt} ${l.cmd}`
      if ("comment" in l) return l.comment
      if ("line" in l) return l.line
      return ""
    })
    .join("\n")
    .trim()
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      }}
      aria-label="Copy to clipboard"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/6 transition-all duration-150 shrink-0"
    >
      {copied ? (
        <><Check size={11} strokeWidth={2.5} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></>
      ) : (
        <><Copy size={11} strokeWidth={2} /><span>Copy</span></>
      )}
    </button>
  )
}

function CodeBlock({ lines }: { lines: CodeLine[] }) {
  return (
    <div className="rounded-xl bg-zinc-950 border border-white/6 overflow-hidden w-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/6">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-zinc-700" />
          <span className="w-2 h-2 rounded-full bg-zinc-700" />
          <span className="w-2 h-2 rounded-full bg-zinc-700" />
        </div>
        <CopyButton text={getPlainText(lines)} />
      </div>
      <div className="px-4 py-4 flex flex-col gap-1 font-mono text-[12.5px] leading-relaxed overflow-x-auto">
        {lines.map((line, i) => {
          if ("blank" in line) return <div key={i} className="h-2" />
          if ("prompt" in line) return (
            <div key={i} className="flex items-start gap-2 min-w-0">
              <span className="text-zinc-600 select-none shrink-0 mt-px">{line.prompt}</span>
              <span className="text-zinc-200 break-all">{line.cmd}</span>
            </div>
          )
          if ("comment" in line) return <div key={i} className="text-zinc-600">{line.comment}</div>
          if ("line" in line) return <div key={i} className="text-zinc-300">{line.line === "" ? <>&nbsp;</> : line.line}</div>
          return null
        })}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [activePM, setActivePM] = useState<PM>("npm")
  const [ctaCopied, setCtaCopied] = useState(false)

  return (
    <section className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="w-full max-w-6xl pt-10 sm:pt-14 pb-20 sm:pb-28">

        {/* ── Section label ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
          className="flex items-center gap-3 mb-10"
        >
          <span className="h-px w-8 bg-red-500/60" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-red-600 dark:text-red-400">
            How it works
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-12">
          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.06}
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[42px] sm:text-[54px] font-semibold leading-[1.06] tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            From zero to{" "}
            <span className="italic text-red-600 dark:text-red-400">shipped</span>{" "}
            in minutes.
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.12}
            className="text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed lg:pb-1 max-w-sm"
          >
            No wrapper libraries, no hidden abstractions. Nexora drops components directly into your repo — you own every line.
          </motion.p>
        </div>

        {/* ── Package manager tabs ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.16}
          className="flex items-center gap-1 mb-14 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-black/6 dark:border-white/6 w-fit"
        >
          {PM_LABELS.map((pm) => (
            <button
              key={pm}
              onClick={() => setActivePM(pm)}
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className={`
                px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all duration-200
                ${activePM === pm
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                }
              `}
            >
              {pm}
            </button>
          ))}
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Centre vertical line — desktop only */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-zinc-200 via-zinc-200/60 to-transparent dark:from-zinc-800 dark:via-zinc-800/60 hidden lg:block pointer-events-none" />

          <div className="flex flex-col">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.2 + idx * 0.1}
                className={`relative flex flex-col lg:grid lg:grid-cols-2 ${idx < steps.length - 1 ? "mb-14 lg:mb-20" : ""}`}
              >

                {/* ── LEFT — detailed guide ── */}
                <div className="lg:pr-14 xl:pr-20 flex flex-col justify-center pb-8 lg:pb-0">

                  {/* Badge row */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-9 h-9 rounded-xl border ${step.border} ${step.accent} flex items-center justify-center shrink-0`}>
                      {step.icon}
                    </div>
                    <span
                      style={{ fontFamily: "var(--font-cormorant)" }}
                      className="text-[13px] font-semibold tracking-[0.18em] uppercase text-zinc-300 dark:text-zinc-600 select-none"
                    >
                      Step {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[22px] sm:text-[24px] font-semibold text-zinc-900 dark:text-zinc-100 mb-3 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  {/* Numbered detail bullets */}
                  <ul className="flex flex-col gap-3 mb-5">
                    {step.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        <span className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${step.accent}`}>
                          {i + 1}
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tip box */}
                  {step.tip && (
                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 shrink-0 mt-px pt-0.5">Tip</span>
                      <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.tip}</p>
                    </div>
                  )}
                </div>

                {/* ── Centre dot — desktop only ── */}
                <div className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 z-10">
                  <div className={`w-10 h-10 rounded-2xl border-2 ${step.border} ${step.accent} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                </div>

                {/* ── RIGHT — code block ── */}
                <div className="lg:pl-14 xl:pl-20 flex flex-col justify-center">
                  <CodeBlock lines={stepCommands[activePM][idx].lines} />
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.65}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 px-6 py-5 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-zinc-900"
        >
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
              Ready to start building?
            </p>
            <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
              One command and you&apos;re in. No account, no signup, fully open source.
            </p>
          </div>

          <div className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl bg-zinc-950 border border-white/8 w-full sm:w-auto min-w-0 sm:min-w-[320px]">
            <span className="text-zinc-600 font-mono text-[12px] shrink-0">$</span>
            <span className="text-zinc-200 font-mono text-[12px] flex-1 truncate">
              {ctaCommands[activePM]}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(ctaCommands[activePM]).then(() => {
                  setCtaCopied(true)
                  setTimeout(() => setCtaCopied(false), 2000)
                })
              }}
              aria-label="Copy command"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/6 transition-all duration-150 shrink-0"
            >
              {ctaCopied ? (
                <><Check size={11} strokeWidth={2.5} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></>
              ) : (
                <><Copy size={11} strokeWidth={2} /><span>Copy</span></>
              )}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HowItWorksSection
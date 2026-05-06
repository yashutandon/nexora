import { ComponentConfig } from "@/types/components"

export const components: ComponentConfig[] = [
  {
    id: "button",
    name: "Button",
    category: "generic",
    description: "A versatile button component with multiple variants and states.",
    code: `"use client"

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
}

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
  const variants = {
    primary: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-white",
    secondary: "border border-black/8 dark:border-white/8 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900",
    ghost: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }
  const sizes = {
    sm: "text-[12px] px-3 py-1.5",
    md: "text-[13.5px] px-5 py-2.5",
    lg: "text-[15px] px-6 py-3",
  }
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}`,
  },
  {
    id: "card",
    name: "Card",
    category: "generic",
    description: "A clean container card with consistent border and background styling.",
    code: `import { cn } from "@/lib/utils"

interface CardProps {
  className?: string
  children: React.ReactNode
}

export const Card = ({ className, children }: CardProps) => (
  <div className={cn(
    "rounded-2xl border border-black/8 dark:border-white/8",
    "bg-white dark:bg-zinc-900 shadow-xl shadow-black/6 dark:shadow-black/30",
    className
  )}>
    {children}
  </div>
)

export const CardHeader = ({ className, children }: CardProps) => (
  <div className={cn("flex items-center gap-2 px-4 py-3 border-b border-black/6 dark:border-white/6", className)}>
    {children}
  </div>
)

export const CardContent = ({ className, children }: CardProps) => (
  <div className={cn("p-5", className)}>
    {children}
  </div>
)`,
  },
  {
    id: "badge",
    name: "Badge",
    category: "generic",
    description: "Compact label component for tags, statuses, and categories.",
    code: `import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info"

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export const Badge = ({ variant = "default", children, className }: BadgeProps) => {
  const variants = {
    default: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
    success: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    warning: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    danger:  "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
    info:    "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
  }
  return (
    <span className={cn(
      "inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md",
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}`,
  },
  {
    id: "input",
    name: "Input",
    category: "generic",
    description: "A styled text input with label, helper text, and error state support.",
    code: `import { cn } from "@/lib/utils"
import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helper?: string
  error?: string
}

export const Input = ({ label, helper, error, className, ...props }: InputProps) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
    )}
    <input
      className={cn(
        "w-full px-3 py-2 rounded-lg text-[13.5px]",
        "bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10",
        "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
        "focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50",
        "transition-all duration-150",
        error && "border-red-500/50 focus:ring-red-500/30",
        className
      )}
      {...props}
    />
    {(helper || error) && (
      <p className={cn("text-[12px]", error ? "text-red-500" : "text-zinc-400 dark:text-zinc-600")}>
        {error || helper}
      </p>
    )}
  </div>
)`,
  },
  {
    id: "animated-button",
    name: "Animated Button",
    category: "animated",
    description: "A button with shimmer and arrow micro-interaction on hover.",
    code: `"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export const AnimatedButton = ({ children }: { children: React.ReactNode }) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13.5px] font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 overflow-hidden"
  >
    <motion.span
      className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full"
      whileHover={{ translateX: "200%" }}
      transition={{ duration: 0.5 }}
    />
    {children}
    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
  </motion.button>
)`,
  },
  {
    id: "fade-in",
    name: "Fade In",
    category: "animated",
    description: "Reusable fade-up entrance animation wrapper using Framer Motion.",
    code: `"use client"

import { motion, Variants } from "framer-motion"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const FadeIn = ({ children, delay = 0, className }: FadeInProps) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={delay}
    className={className}
  >
    {children}
  </motion.div>
)`,
  },
  {
    id: "pricing-card",
    name: "Pricing Card",
    category: "saas",
    description: "A conversion-optimized pricing card with feature list and CTA.",
    code: `import { Check, Flame } from "lucide-react"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export const PricingCard = ({ name, price, description, features, highlighted = false }: PricingCardProps) => (
  <div className={\`relative flex flex-col gap-5 p-6 rounded-2xl border \${
    highlighted
      ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-800 dark:border-zinc-200 shadow-xl"
      : "bg-white dark:bg-zinc-900 border-black/8 dark:border-white/8"
  }\`}>
    {highlighted && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-red-600 text-white">
        <Flame size={10} strokeWidth={2.5} /> Most Popular
      </span>
    )}
    <p className="text-[36px] font-semibold">{price}</p>
  </div>
)`,
  },
  {
    id: "stat-card",
    name: "Stat Card",
    category: "saas",
    description: "Dashboard metric card with trend indicator and icon.",
    code: `import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  change: number
  icon: React.ReactNode
}

export const StatCard = ({ label, value, change, icon }: StatCardProps) => {
  const isPositive = change >= 0
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800">
          {icon}
        </span>
      </div>
      <p className="text-[28px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{value}</p>
      <div className={\`flex items-center gap-1.5 text-[12px] font-medium \${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}\`}>
        {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        <span>{isPositive ? "+" : ""}{change}% this month</span>
      </div>
    </div>
  )
}`,
  },
  {
    id: "chart-card",
    name: "Chart Card",
    category: "fintech",
    description: "Minimal sparkline chart card for financial data visualization.",
    code: `interface ChartCardProps {
  title: string
  value: string
  change: number
  data: number[]
  color?: string
}

export const ChartCard = ({ title, value, change, data, color = "#ef4444" }: ChartCardProps) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const normalize = (v: number) => ((v - min) / (max - min)) * 40
  const points = data.map((v, i) => \`\${(i / (data.length - 1)) * 200},\${50 - normalize(v)}\`).join(" ")

  return (
    <div className="p-4 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-zinc-900">
      <p className="text-[12px] text-zinc-500 uppercase tracking-wider">{title}</p>
      <p className="text-[26px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">{value}</p>
      <svg viewBox="0 0 200 52" className="w-full h-12 mt-3" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}`,
  },
  {
    id: "transaction-row",
    name: "Transaction Row",
    category: "fintech",
    description: "A clean transaction list item for banking and fintech dashboards.",
    code: `interface TransactionRowProps {
  name: string
  category: string
  date: string
  amount: number
  icon: React.ReactNode
}

export const TransactionRow = ({ name, category, date, amount, icon }: TransactionRowProps) => {
  const isCredit = amount > 0
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-zinc-100/60 dark:hover:bg-zinc-800 transition-colors duration-150">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-medium text-zinc-800 dark:text-zinc-200 truncate">{name}</p>
        <p className="text-[11.5px] text-zinc-400">{category} · {date}</p>
      </div>
      <p className={\`text-[14px] font-semibold \${isCredit ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-800 dark:text-zinc-200"}\`}>
        {isCredit ? "+" : "−"}$\{Math.abs(amount).toFixed(2)}
      </p>
    </div>
  )
}`,
  },
]
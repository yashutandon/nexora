import { ComponentConfig } from "@/types/components"

export const components: ComponentConfig[] = [
  {
    id: "button",
    name: "Button",
    category: "generic",
    description: "A versatile button component with multiple variants and states.",
    code: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 shadow",
        destructive: "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90 shadow-sm",
        outline: "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 shadow-sm",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,
  },
  {
    id: "card",
    name: "Card",
    category: "generic",
    description: "A clean container card with consistent border and background styling.",
    code: `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`,
  },
  {
    id: "badge",
    name: "Badge",
    category: "generic",
    description: "Compact label component for tags, statuses, and categories.",
    code: `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300",
  {
    variants: {
      variant: {
        default: "border-transparent bg-zinc-900 text-zinc-50 shadow dark:bg-zinc-50 dark:text-zinc-900",
        secondary: "border-transparent bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
        destructive: "border-transparent bg-red-500 text-zinc-50 shadow dark:bg-red-900 dark:text-zinc-50",
        outline: "text-zinc-950 dark:text-zinc-50",
        success: "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        warning: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }`,
  },
  {
    id: "input",
    name: "Input",
    category: "generic",
    description: "A styled text input with label, helper text, and error state support.",
    code: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500/50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`,
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
  {
    id: "avatar",
    name: "Avatar",
    category: "generic",
    description: "An image element with a fallback for representing the user.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "switch",
    name: "Switch",
    category: "generic",
    description: "A control that allows the user to toggle between checked and not checked.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "generic",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "generic",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "dialog",
    name: "Dialog",
    category: "generic",
    description: "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "generic",
    description: "A control that allows the user to toggle between checked and not checked.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "alert",
    name: "Alert",
    category: "generic",
    description: "Displays a callout for user attention.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "slider",
    name: "Slider",
    category: "generic",
    description: "An input where the user selects a value from within a given range.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "progress",
    name: "Progress",
    category: "generic",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "generic",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "hover-card",
    name: "Hover Card",
    category: "generic",
    description: "For sighted users to preview content available behind a link.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    category: "generic",
    description: "Displays a menu to the user—such as a set of actions or functions—triggered by a button.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "select",
    name: "Select",
    category: "generic",
    description: "Displays a list of options for the user to pick from—triggered by a button.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: "generic",
    description: "Use to show a placeholder while content is loading.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "separator",
    name: "Separator",
    category: "generic",
    description: "Visually or semantically separates content.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "toggle",
    name: "Toggle",
    category: "generic",
    description: "A two-state button that can be either on or off.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "toggle-group",
    name: "Toggle Group",
    category: "generic",
    description: "A set of two-state buttons that can be toggled on or off.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "calendar",
    name: "Calendar",
    category: "generic",
    description: "A date field component that allows users to enter and edit date.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "command",
    name: "Command",
    category: "generic",
    description: "Fast, composable, unstyled command menu for React.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "combobox",
    name: "Combobox",
    category: "generic",
    description: "Autocomplete input and command palette with a list of suggestions.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "table",
    name: "Table",
    category: "generic",
    description: "A responsive table component.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "sheet",
    name: "Sheet",
    category: "generic",
    description: "Extends the Dialog component to display content that complements the main UI.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "drawer",
    name: "Drawer",
    category: "generic",
    description: "A drawer component for React.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "sonner",
    name: "Sonner",
    category: "generic",
    description: "An opinionated toast component for React.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "carousel",
    name: "Carousel",
    category: "generic",
    description: "A carousel with motion and swipe built using Embla.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "input-otp",
    name: "Input OTP",
    category: "generic",
    description: "Accessible one-time password component with copy paste functionality.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "navigation-menu",
    name: "Navigation Menu",
    category: "generic",
    description: "A collection of links for navigating websites.",
    code: `/* Code is dynamically served from API */`,
  },

  {
    id: "label",
    name: "Label",
    category: "generic",
    description: "Renders an accessible label associated with controls.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "generic",
    description: "Displays a form textarea or a component that looks like a textarea.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "radio-group",
    name: "Radio Group",
    category: "generic",
    description: "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "popover",
    name: "Popover",
    category: "generic",
    description: "Displays rich content in a portal, triggered by a button.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    category: "generic",
    description: "Displays a menu to the user—such as a set of actions or functions—triggered by a button.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "menubar",
    name: "Menubar",
    category: "generic",
    description: "A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "alert-dialog",
    name: "Alert Dialog",
    category: "generic",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "aspect-ratio",
    name: "Aspect Ratio",
    category: "generic",
    description: "Displays content within a desired ratio.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: "generic",
    description: "Displays the path to the current resource using a hierarchy of links.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "collapsible",
    name: "Collapsible",
    category: "generic",
    description: "An interactive component which expands/collapses a panel.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "generic",
    description: "Pagination with page navigation, next and previous links.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "resizable",
    name: "Resizable",
    category: "generic",
    description: "Accessible resizable panel groups and layouts with keyboard support.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "scroll-area",
    name: "Scroll Area",
    category: "generic",
    description: "Augments native scroll functionality for custom, cross-browser styling.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    category: "generic",
    description: "A composable, themeable and customizable sidebar component.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "spinner",
    name: "Spinner",
    category: "generic",
    description: "Indicates a loading state.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "input-group",
    name: "Input Group",
    category: "generic",
    description: "A group of inputs and buttons connected together.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "hero-section",
    name: "Hero Section",
    category: "blocks",
    description: "A stunning landing page hero with waitlist input.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "dashboard-layout",
    name: "Dashboard Layout",
    category: "blocks",
    description: "A full application shell featuring a sidebar and top nav.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "footer-block",
    name: "Footer Block",
    category: "blocks",
    description: "A massive, multi-column SaaS footer.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "auth-forms",
    name: "Auth Forms",
    category: "blocks",
    description: "Sleek Login and Sign Up cards with social providers.",
    code: `/* Code is dynamically served from API */`,
  },
  {
    id: "pricing-section",
    name: "Pricing Section",
    category: "blocks",
    description: "Beautiful pricing tiers with toggles.",
    code: `/* Code is dynamically served from API */`,
  }
]
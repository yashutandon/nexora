import * as React from "react"
import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Community",
    description: "Perfect for hobbyists and side projects.",
    price: "$0",
    period: "forever",
    features: [
      "Access to 50+ basic components",
      "Open source MIT license",
      "Community support",
      "Basic documentation",
    ],
    isPopular: false,
    cta: "Get Started",
  },
  {
    name: "Pro Lifetime",
    description: "For professional developers and agencies.",
    price: "$149",
    period: "one-time",
    features: [
      "Everything in Community",
      "Access to all Premium Blocks",
      "Access to all Pro Templates",
      "Commercial use license",
      "Priority email support",
      "Lifetime updates",
    ],
    isPopular: true,
    cta: "Buy Pro Lifetime",
  }
]

export function PricingSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("py-24 sm:py-32 bg-white dark:bg-black w-full relative overflow-hidden", className)} {...props}>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.8),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Unlock the Full Power of Nexora
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Simple, transparent pricing
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          No subscriptions. No hidden fees. Pay once and get lifetime access to all premium components and blocks.
        </p>
        
        <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-4xl md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-3xl p-8 xl:p-10 relative overflow-hidden transition-all duration-300",
                plan.isPopular 
                  ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-2xl scale-100 md:scale-105 border border-zinc-800 dark:border-zinc-200" 
                  : "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-zinc-500 to-zinc-400 dark:from-zinc-400 dark:to-zinc-500 text-white text-xs font-bold uppercase tracking-wider rounded-bl-xl rounded-tr-3xl">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center justify-between gap-x-4">
                <h3 className={cn("text-xl font-bold leading-8", plan.isPopular ? "text-white dark:text-zinc-900" : "text-zinc-900 dark:text-zinc-50")}>
                  {plan.name}
                </h3>
              </div>
              <p className={cn("mt-4 text-sm leading-6", plan.isPopular ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-400")}>
                {plan.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className={cn("text-5xl font-bold tracking-tight", plan.isPopular ? "text-white dark:text-zinc-900" : "text-zinc-900 dark:text-zinc-50")}>{plan.price}</span>
                <span className={cn("text-sm font-semibold leading-6", plan.isPopular ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-400")}>/{plan.period}</span>
              </p>
              
              <button
                className={cn(
                  "mt-8 block w-full rounded-full py-3 px-3 text-center text-sm font-bold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all",
                  plan.isPopular
                    ? "bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 shadow-md"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                )}
              >
                {plan.cta}
              </button>
              
              <ul role="list" className={cn("mt-8 space-y-4 text-sm leading-6", plan.isPopular ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-400")}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3 items-center">
                    <Check className={cn("h-5 w-5 flex-none", plan.isPopular ? "text-white dark:text-zinc-900" : "text-zinc-900 dark:text-zinc-50")} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Check, Flame } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for side projects",
    features: ["5 components", "Community support", "Basic docs"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious builders",
    features: ["120+ components", "Priority support", "CLI access", "Figma kit"],
    highlighted: true,
  },
]

export const PricingPreview = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
    {plans.map((plan) => (
      <div
        key={plan.name}
        className={`relative flex flex-col gap-5 p-6 rounded-2xl border transition-all duration-200 ${
          plan.highlighted
            ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-800 dark:border-zinc-200 shadow-xl"
            : "bg-white dark:bg-zinc-900 border-black/8 dark:border-white/8"
        }`}
      >
        {plan.highlighted && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-red-600 text-white whitespace-nowrap">
            <Flame size={10} strokeWidth={2.5} /> Most Popular
          </span>
        )}
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-widest ${plan.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>
            {plan.name}
          </p>
          <p className={`text-[32px] font-semibold tracking-tight mt-1 ${plan.highlighted ? "text-white dark:text-zinc-900" : "text-zinc-900 dark:text-zinc-100"}`}>
            {plan.price}
          </p>
          <p className={`text-[12px] mt-0.5 ${plan.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>
            {plan.description}
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[12.5px]">
              <span className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 ${
                plan.highlighted
                  ? "bg-red-500/20 text-red-400"
                  : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
              }`}>
                <Check size={9} strokeWidth={3} />
              </span>
              <span className={plan.highlighted ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-400"}>
                {f}
              </span>
            </li>
          ))}
        </ul>
        <button className={`w-full py-2 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
          plan.highlighted
            ? "bg-red-600 text-white hover:bg-red-700"
            : "border border-black/8 dark:border-white/8 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        }`}>
          Get started
        </button>
      </div>
    ))}
  </div>
)
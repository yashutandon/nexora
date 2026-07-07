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
            // Inverted "most popular" card: bg uses --foreground so it's always high-contrast
            ? "bg-foreground border-border shadow-xl"
            : "bg-card border-border"
        }`}
      >
        {plan.highlighted && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground whitespace-nowrap">
            <Flame size={10} strokeWidth={2.5} /> Most Popular
          </span>
        )}
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-widest ${plan.highlighted ? "text-background/60" : "text-muted-foreground"}`}>
            {plan.name}
          </p>
          <p className={`text-[32px] font-semibold tracking-tight mt-1 ${plan.highlighted ? "text-background" : "text-foreground"}`}>
            {plan.price}
          </p>
          <p className={`text-[12px] mt-0.5 ${plan.highlighted ? "text-background/60" : "text-muted-foreground"}`}>
            {plan.description}
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[12.5px]">
              <span className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 ${
                plan.highlighted
                  ? "bg-primary/20 text-primary"
                  : "bg-primary/10 text-primary"
              }`}>
                <Check size={9} strokeWidth={3} />
              </span>
              <span className={plan.highlighted ? "text-background/80" : "text-muted-foreground"}>
                {f}
              </span>
            </li>
          ))}
        </ul>
        <button className={`w-full py-2 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
          plan.highlighted
            // Primary CTA tracks --primary
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "border border-border text-foreground hover:bg-muted"
        }`}>
          Get started
        </button>
      </div>
    ))}
  </div>
)
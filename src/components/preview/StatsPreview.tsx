import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart } from "lucide-react"

const stats = [
  { label: "Total Revenue",   value: "$48,295", change: 12.5,  icon: <DollarSign size={15} />, positive: true  },
  { label: "Active Users",    value: "2,410",   change: 8.1,   icon: <Users size={15} />,      positive: true  },
  { label: "Conversion Rate", value: "3.24%",   change: -1.4,  icon: <Activity size={15} />,   positive: false },
  { label: "Orders",          value: "1,893",   change: 5.7,   icon: <ShoppingCart size={15}/>, positive: true  },
]

export const StatsPreview = () => (
  <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
    {stats.map((s) => (
      <div
        key={s.label}
        className="flex flex-col gap-3 p-4 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-zinc-900"
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider leading-tight">
            {s.label}
          </p>
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {s.icon}
          </span>
        </div>
        <p className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {s.value}
        </p>
        <div className={`flex items-center gap-1 text-[11.5px] font-medium ${s.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
          {s.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{s.positive ? "+" : ""}{s.change}% this month</span>
        </div>
      </div>
    ))}
  </div>
)
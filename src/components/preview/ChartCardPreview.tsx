const chartData = [
  { data: [28, 35, 30, 42, 38, 50, 46, 58, 54, 62, 59, 70], label: "Revenue", value: "$70,420", change: 14.2, color: "#ef4444" },
  { data: [15, 22, 18, 28, 24, 32, 30, 38, 35, 42, 40, 48], label: "Users",   value: "48.2k",   change: 8.6,  color: "#3b82f6" },
]

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const norm = (v: number) => ((v - min) / (max - min)) * 36
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 180},${42 - norm(v)}`)
    .join(" ")

  return (
    <svg viewBox="0 0 180 44" className="w-full h-10" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ChartCardPreview = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
    {chartData.map((c) => (
      <div
        key={c.label}
        className="p-4 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-zinc-900 flex flex-col gap-2.5"
      >
        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {c.label}
        </p>
        <div className="flex items-end justify-between">
          <p className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {c.value}
          </p>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
            c.change >= 0
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-50 dark:bg-red-500/10 text-red-500"
          }`}>
            +{c.change}%
          </span>
        </div>
        <Sparkline data={c.data} color={c.color} />
      </div>
    ))}
  </div>
)
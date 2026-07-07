import { ShoppingBag, Coffee, Zap, ArrowDownLeft, CreditCard } from "lucide-react"

const transactions = [
  { name: "Stripe Inc.",   category: "Income",  date: "Today",     amount:  4250.00, icon: <ArrowDownLeft size={15} /> },
  { name: "AWS Services",  category: "Cloud",   date: "Yesterday", amount: -312.40,  icon: <Zap size={15} />           },
  { name: "Figma Pro",     category: "Tools",   date: "May 3",     amount: -45.00,   icon: <CreditCard size={15} />    },
  { name: "Notion",        category: "Tools",   date: "May 1",     amount: -16.00,   icon: <ShoppingBag size={15} />   },
  { name: "Vercel Pro",    category: "Hosting", date: "Apr 30",    amount: -20.00,   icon: <Coffee size={15} />        },
]

export const TransactionPreview = () => (
  <div className="flex flex-col gap-2 w-full max-w-sm">
    {transactions.map((t) => {
      const isCredit = t.amount > 0
      return (
        <div
          key={t.name}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 hover:bg-muted transition-colors duration-150"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-muted text-muted-foreground shrink-0">
            {t.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-foreground truncate">
              {t.name}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {t.category} · {t.date}
            </p>
          </div>
          <p className={`text-[13.5px] font-semibold shrink-0 ${isCredit ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
            {isCredit ? "+" : "−"}${Math.abs(t.amount).toFixed(2)}
          </p>
        </div>
      )
    })}
  </div>
)
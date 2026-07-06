"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"

export const CalendarPreview = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
    to: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
  })
  const [multiDates, setMultiDates] = React.useState<Date[] | undefined>([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    new Date(new Date().getFullYear(), new Date().getMonth(), 28),
  ])

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-12 w-full max-w-4xl justify-center items-start">
      {/* 1. Basic Single Date */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest text-center">1. Single Date</h3>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0a0a0a] shadow-sm overflow-hidden">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-3"
          />
        </div>
      </div>

      {/* 2. Range Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest text-center">2. Date Range</h3>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0a0a0a] shadow-sm overflow-hidden">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            className="p-3"
          />
        </div>
      </div>

      {/* 3. Multiple Dates */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest text-center">3. Multiple Dates</h3>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0a0a0a] shadow-sm overflow-hidden">
          <Calendar
            mode="multiple"
            selected={multiDates}
            onSelect={setMultiDates}
            className="p-3"
          />
        </div>
      </div>
    </div>
  )
}

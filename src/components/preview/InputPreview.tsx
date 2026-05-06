"use client"

import { useState } from "react"
import { Eye, EyeOff, Search } from "lucide-react"

export const InputPreview = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm">
      {/* Default */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 rounded-lg text-[13.5px] bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all duration-150"
        />
        <p className="text-[12px] text-zinc-400 dark:text-zinc-600">
          We&apos;ll never share your email.
        </p>
      </div>

      {/* Search with icon */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
          Search
        </label>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-8 pr-3 py-2 rounded-lg text-[13.5px] bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all duration-150"
          />
        </div>
      </div>

      {/* Password with toggle */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            className="w-full px-3 pr-9 py-2 rounded-lg text-[13.5px] bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all duration-150"
          />
          <button
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            {show ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
      </div>

      {/* Error state */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
          Username
        </label>
        <input
          type="text"
          defaultValue="taken_username"
          className="w-full px-3 py-2 rounded-lg text-[13.5px] bg-white dark:bg-zinc-900 border border-red-500/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-150"
        />
        <p className="text-[12px] text-red-500">
          This username is already taken.
        </p>
      </div>
    </div>
  )
}
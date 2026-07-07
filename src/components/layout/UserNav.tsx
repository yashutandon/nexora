"use client"

import { LogOut, User } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import Link from "next/link"

export const UserNav = () => {
  const { user, isAuthenticated, logout } = useAuthStore()

  if (!isAuthenticated || !user) {
    return (
      <Link
        href="/login"
        style={{ fontFamily: "var(--font-dm-sans)" }}
        className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-[13px] font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-white transition-colors duration-150"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="relative group">
      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden ring-2 ring-transparent hover:ring-zinc-300 transition-all">
        {user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
        ) : (
          <User size={16} className="text-zinc-500" />
        )}
      </button>
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1">
        <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
          <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">{user?.name}</p>
          <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
          <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {user?.role || "USER"}
          </span>
        </div>
        <a
          href="/dashboard"
          className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors mb-1"
        >
          <User size={14} />
          Dashboard
        </a>
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  )
}


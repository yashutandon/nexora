"use client";

import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="py-10 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Dashboard</h1>
        <p className="text-zinc-500 mt-2">Manage your account and subscription.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            {user?.image ? (
              <img src={user.image} alt="Profile" className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            )}
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{user?.name}</p>
              <p className="text-sm text-zinc-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Subscription Plan</h2>
            <p className="text-sm text-zinc-500 mb-4">Current access level for Nexora UI components.</p>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-zinc-700 dark:text-zinc-300">Status:</span>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                user?.role === "PRO" 
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              }`}>
                {user?.role === "PRO" ? "PRO MEMBER" : "FREE USER"}
              </span>
            </div>
          </div>

          {user?.role !== "PRO" && (
            <a href="/pricing" className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-white transition-colors">
              Upgrade to Pro
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

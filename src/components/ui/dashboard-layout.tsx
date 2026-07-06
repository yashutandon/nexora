import * as React from "react"
import { Bell, Home, Settings, Users, LayoutDashboard, Search, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardLayout({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("min-h-screen bg-zinc-50 dark:bg-zinc-950 flex w-full", className)}>
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 lg:flex lg:flex-col">
        <div className="flex h-14 items-center border-b border-zinc-200 dark:border-zinc-800 px-6 font-semibold text-zinc-900 dark:text-zinc-50">
          <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-zinc-100 mr-2"></div>
          Acme Inc.
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium gap-1">
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 transition-all hover:text-zinc-900 dark:hover:text-zinc-50">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 dark:text-zinc-400 transition-all hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <Users className="h-4 w-4" /> Team
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 dark:text-zinc-400 transition-all hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <Settings className="h-4 w-4" /> Settings
            </a>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
            <div>
              <p className="text-zinc-900 dark:text-zinc-50">Jane Doe</p>
              <p className="text-xs">jane@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 justify-between lg:justify-end">
          <button className="lg:hidden text-zinc-500 dark:text-zinc-400">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </button>
          
          <div className="w-full flex-1 lg:w-auto lg:flex-none">
            <div className="relative max-w-md lg:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <input
                type="search"
                placeholder="Search..."
                className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 pl-9"
              />
            </div>
          </div>
          
          <button className="rounded-full h-8 w-8 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </button>
        </header>
        
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl text-zinc-900 dark:text-zinc-50">Dashboard</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                You have no projects
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                You can start selling as soon as you add a project.
              </p>
              <button className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2">
                Add Project
              </button>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

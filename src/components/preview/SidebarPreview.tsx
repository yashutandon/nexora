"use client"

import * as React from "react"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export const SidebarPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl items-center">
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest text-center">1. App Sidebar Layout</h3>
        <div className="flex justify-center w-full">
          {/* We use a fixed height container to demonstrate the sidebar without it taking over the whole screen */}
          <div className="h-[400px] w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 flex relative">
            <SidebarProvider defaultOpen>
              <Sidebar className="absolute h-full border-r border-zinc-200 dark:border-zinc-800">
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <main className="flex-1 flex flex-col pl-[--sidebar-width]">
                <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 bg-white dark:bg-[#0a0a0a]">
                  <SidebarTrigger />
                  <span className="ml-4 font-semibold text-sm">Dashboard</span>
                </div>
                <div className="flex-1 p-6">
                  <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 h-full flex items-center justify-center">
                    <p className="text-sm text-zinc-500">Main Content Area</p>
                  </div>
                </div>
              </main>
            </SidebarProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

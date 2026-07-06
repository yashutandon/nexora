"use client"

import * as React from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  Command as CommandIcon,
} from "lucide-react"

export const CommandPreview = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Command Palette Dialog */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Dialog (Command Palette)</h3>
        <p className="text-sm text-zinc-500">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
          {" "}or click the button below to open the command palette.
        </p>
        <Button 
          variant="outline" 
          className="w-full justify-start text-sm text-zinc-500"
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Search documentation...
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>

      {/* 2. In-Page Command Menu */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Static Command Menu</h3>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden bg-white dark:bg-[#0a0a0a] max-w-md">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search settings..." />
            <CommandList className="max-h-[250px]">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="General">
                <CommandItem>
                  <CommandIcon className="mr-2 h-4 w-4" />
                  <span>General Settings</span>
                </CommandItem>
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Appearance">
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Theme</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

    </div>
  )
}

"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { 
  User, 
  CreditCard, 
  Settings, 
  Keyboard, 
  Users, 
  UserPlus, 
  Mail, 
  MessageSquare, 
  PlusCircle, 
  LifeBuoy, 
  Cloud, 
  LogOut 
} from "lucide-react"

export const DropdownMenuPreview = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<boolean>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<boolean>(false)
  const [showPanel, setShowPanel] = React.useState<boolean>(false)
  
  const [position, setPosition] = React.useState("bottom")

  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Dropdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 2. With Icons & Shortcuts */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Icons & Shortcuts</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Advanced Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <span className="ml-auto text-xs tracking-widest text-zinc-500">⇧⌘P</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <span className="ml-auto text-xs tracking-widest text-zinc-500">⌘B</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <span className="ml-auto text-xs tracking-widest text-zinc-500">⌘S</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/30">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">⇧⌘Q</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 3. Checkboxes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. Checkbox Items</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">View Display</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              disabled
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 4. Radio Group */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Radio Group</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Panel Position</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 5. Nested Sub-menus */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">5. Nested Sub-menus</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Invite Users</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Invite via...</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  )
}

"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CreditCard, Settings, Bell } from "lucide-react"

export const TabsPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Tabs */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">1. Basic</h3>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="p-4 bg-card border border-border rounded-lg mt-2 shadow-sm">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password" className="p-4 bg-card border border-border rounded-lg mt-2 shadow-sm">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>

      {/* 2. With Icons */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">2. With Icons</h3>
        <Tabs defaultValue="general" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general" className="flex gap-2"><Settings size={14} /> General</TabsTrigger>
            <TabsTrigger value="billing" className="flex gap-2"><CreditCard size={14} /> Billing</TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2"><Bell size={14} /> Alerts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 3. Underline / Segmented Control style — active indicator tracks --foreground */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">3. Underline / Minimal</h3>
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-12 p-0 space-x-6">
            <TabsTrigger
              value="code"
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 h-full text-muted-foreground data-[state=active]:text-foreground"
            >
              Code
            </TabsTrigger>
            <TabsTrigger
              value="issues"
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 h-full text-muted-foreground data-[state=active]:text-foreground"
            >
              Issues
            </TabsTrigger>
            <TabsTrigger
              value="pr"
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 h-full text-muted-foreground data-[state=active]:text-foreground"
            >
              Pull Requests
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 4. Vertical Layout */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">4. Vertical</h3>
        <Tabs defaultValue="profile" className="flex flex-row gap-6 w-full h-[200px]">
          <TabsList className="flex flex-col h-auto bg-transparent items-start w-32 space-y-1">
            <TabsTrigger value="profile" className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">Profile</TabsTrigger>
            <TabsTrigger value="account" className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">Account</TabsTrigger>
            <TabsTrigger value="emails"  className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none">Emails</TabsTrigger>
          </TabsList>
          <div className="flex-1 border-l border-border pl-6">
            <TabsContent value="profile" className="mt-0">Profile content goes here.</TabsContent>
            <TabsContent value="account" className="mt-0">Account settings go here.</TabsContent>
            <TabsContent value="emails"  className="mt-0">Email preferences go here.</TabsContent>
          </div>
        </Tabs>
      </div>

    </div>
  )
}

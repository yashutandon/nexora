"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const TextareaPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-sm mx-auto">
      {/* 1. Basic Textarea */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic Textarea</h3>
        <Textarea placeholder="Type your message here." />
      </div>

      {/* 2. With Label */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. With Label & Description</h3>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Your message</Label>
          <Textarea placeholder="Type your message here." id="message" />
          <p className="text-sm text-zinc-500">
            Your message will be copied to the support team.
          </p>
        </div>
      </div>

      {/* 3. With Button */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. With Button</h3>
        <div className="grid w-full gap-2">
          <Textarea placeholder="Type your message here." />
          <Button>Send message</Button>
        </div>
      </div>

      {/* 4. Disabled */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Disabled</h3>
        <Textarea disabled placeholder="Type your message here." />
      </div>
    </div>
  )
}

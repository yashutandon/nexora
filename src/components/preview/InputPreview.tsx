"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const InputPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-sm mx-auto">
      {/* 1. Basic Input */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic</h3>
        <Input type="email" placeholder="Email" />
      </div>

      {/* 2. With Label */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. With Label</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </div>

      {/* 3. With Button */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. With Button</h3>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
      </div>

      {/* 4. File Input */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. File Input</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
      </div>

      {/* 5. Disabled */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">5. Disabled</h3>
        <Input disabled type="email" placeholder="Email" />
      </div>

    </div>
  )
}
"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Search, Copy } from "lucide-react"

export const InputGroupPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-sm mx-auto items-center">
      {/* 1. Basic Icon Addon */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Icon Addon</h3>
        <InputGroup>
          <InputGroupAddon>
            <Search className="h-4 w-4 text-zinc-500" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search documentation..." />
        </InputGroup>
      </div>

      {/* 2. Text Addon */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Text Addon</h3>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="nexora.ui" />
          <InputGroupAddon>
            <InputGroupText>.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* 3. Button Addon */}
      <div className="space-y-4 w-full">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. Button Addon</h3>
        <InputGroup>
          <InputGroupInput value="npm i @nexora/ui" readOnly />
          <InputGroupAddon>
            <InputGroupButton variant="secondary">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}

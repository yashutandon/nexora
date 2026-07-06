"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe, Apple, Code2, Cpu } from "lucide-react"

export const SelectPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Select */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic Select</h3>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* 2. Grouped List */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Grouped Items</h3>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot (Out of stock)
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* 3. With Icons */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. With Icons</h3>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select platform..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <span>Web Application</span>
              </div>
            </SelectItem>
            <SelectItem value="ios">
              <div className="flex items-center gap-2">
                <Apple className="h-4 w-4 text-zinc-500" />
                <span>iOS Application</span>
              </div>
            </SelectItem>
            <SelectItem value="api">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-500" />
                <span>REST API</span>
              </div>
            </SelectItem>
            <SelectItem value="hardware">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-500" />
                <span>Hardware Integration</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 4. Form Context */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. In Form Context</h3>
        <div className="space-y-2 max-w-[280px]">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Role
          </label>
          <Select defaultValue="user">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="user">Standard User</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
            Select the permission level for this user.
          </p>
        </div>
      </div>

    </div>
  )
}

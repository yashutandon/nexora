"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

export const SheetPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Sheet (Right) */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic (Right Slide)</h3>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Settings</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* 2. Side Variations */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Position Variations</h3>
        <div className="grid grid-cols-2 gap-4">
          {SHEET_SIDES.map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="secondary" className="w-full capitalize">
                  {side}
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle className="capitalize">{side} Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the {side} edge of the screen.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>

    </div>
  )
}

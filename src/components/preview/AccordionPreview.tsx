"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Shield, Zap, Globe } from "lucide-react"

export const AccordionPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Accordion */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">1. Basic Single</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* 2. Multiple Open */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">2. Multiple Open</h3>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Nexora?</AccordionTrigger>
            <AccordionContent>
              Nexora is a collection of re-usable components that you can copy and paste into your apps.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need to install it?</AccordionTrigger>
            <AccordionContent>
              No. You can just copy and paste the code into your project.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* 3. With Icons */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">3. With Leading Icons</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex gap-3 justify-start">
              <Shield className="h-4 w-4 text-emerald-500" />
              Security Features
            </AccordionTrigger>
            <AccordionContent className="pl-7">
              End-to-end encryption and enterprise-grade security protocols are built-in by default.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="flex gap-3 justify-start">
              <Zap className="h-4 w-4 text-yellow-500" />
              Performance
            </AccordionTrigger>
            <AccordionContent className="pl-7">
              Lightning fast delivery powered by global edge networks and automated optimization.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="flex gap-3 justify-start">
              <Globe className="h-4 w-4 text-blue-500" />
              Global Reach
            </AccordionTrigger>
            <AccordionContent className="pl-7">
              Deploy to over 35 edge regions worldwide with a single click.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* 4. Outline Boxed Variant */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">4. Boxed Variant</h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border border-border rounded-lg px-4 bg-card shadow-sm data-[state=open]:ring-1 data-[state=open]:ring-foreground transition-all">
            <AccordionTrigger className="border-b-0 hover:no-underline py-4">Account Settings</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Manage your personal information, subscription, and billing details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-border rounded-lg px-4 bg-card shadow-sm data-[state=open]:ring-1 data-[state=open]:ring-foreground transition-all">
            <AccordionTrigger className="border-b-0 hover:no-underline py-4">Notifications</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Choose what emails you want to receive and when.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  )
}

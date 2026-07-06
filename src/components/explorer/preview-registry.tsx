
import { PricingPreview } from "../preview/PricingPreview"
import { StatsPreview } from "../preview/StatsPreview"
import { ChartCardPreview } from "../preview/ChartCardPreview"
import { TransactionPreview } from "../preview/TransactionPreview"
import { AnimatedButtonPreview } from "../preview/AnimatedButtonPreview"
import { FadeInPreview } from "../preview/FadeInPreview"

import { AvatarPreview } from "../preview/AvatarPreview"
import { SwitchPreview } from "../preview/SwitchPreview"
import { AccordionPreview } from "../preview/AccordionPreview"
import { TabsPreview } from "../preview/TabsPreview"
import { DialogPreview } from "../preview/DialogPreview"
import { CheckboxPreview } from "../preview/CheckboxPreview"
import { AlertPreview } from "../preview/AlertPreview"

import { SliderPreview } from "../preview/SliderPreview"
import { ProgressPreview } from "../preview/ProgressPreview"
import { TooltipPreview } from "../preview/TooltipPreview"
import { HoverCardPreview } from "../preview/HoverCardPreview"
import { DropdownMenuPreview } from "../preview/DropdownMenuPreview"
import { SelectPreview } from "../preview/SelectPreview"
import { SkeletonPreview } from "../preview/SkeletonPreview"
import { SeparatorPreview } from "../preview/SeparatorPreview"
import { TogglePreview } from "../preview/TogglePreview"
import { ToggleGroupPreview } from "../preview/ToggleGroupPreview"

import { CalendarPreview } from "../preview/CalendarPreview"
import { CommandPreview } from "../preview/CommandPreview"
import { ComboboxPreview } from "../preview/ComboboxPreview"
import { TablePreview } from "../preview/TablePreview"
import { SheetPreview } from "../preview/SheetPreview"
import { DrawerPreview } from "../preview/DrawerPreview"
import { SonnerPreview } from "../preview/SonnerPreview"
import { CarouselPreview } from "../preview/CarouselPreview"
import { InputOtpPreview } from "../preview/InputOtpPreview"
import { NavigationMenuPreview } from "../preview/NavigationMenuPreview"

import { ButtonPreview } from "../preview/ButtonPreview"
import { BadgePreview } from "../preview/BadgePreview"
import { CardPreview } from "../preview/CardPreview"
import { InputPreview } from "../preview/InputPreview"
import { LabelPreview } from "../preview/LabelPreview"
import { TextareaPreview } from "../preview/TextareaPreview"
import { RadioGroupPreview } from "../preview/RadioGroupPreview"
import { PopoverPreview } from "../preview/PopoverPreview"
import { ContextMenuPreview } from "../preview/ContextMenuPreview"
import { MenubarPreview } from "../preview/MenubarPreview"

import { AlertDialogPreview } from "../preview/AlertDialogPreview"
import { AspectRatioPreview } from "../preview/AspectRatioPreview"
import { BreadcrumbPreview } from "../preview/BreadcrumbPreview"
import { CollapsiblePreview } from "../preview/CollapsiblePreview"
import { PaginationPreview } from "../preview/PaginationPreview"
import { ResizablePreview } from "../preview/ResizablePreview"
import { ScrollAreaPreview } from "../preview/ScrollAreaPreview"
import { SidebarPreview } from "../preview/SidebarPreview"
import { SpinnerPreview } from "../preview/SpinnerPreview"
import { InputGroupPreview } from "../preview/InputGroupPreview"

import { HeroSection } from "../ui/hero-section"
import { DashboardLayout } from "../ui/dashboard-layout"
import { FooterBlock } from "../ui/footer-block"
import { AuthForms } from "../ui/auth-forms"
import { PricingSection } from "../ui/pricing-section"

export const previewRegistry: Record<string, React.ComponentType> = {

  "animated-button": AnimatedButtonPreview,
  "fade-in":         FadeInPreview,
  "pricing-card":    PricingPreview,
  "stat-card":       StatsPreview,
  "chart-card":      ChartCardPreview,
  "transaction-row": TransactionPreview,

  // Batch 1 Components
  "avatar":          AvatarPreview,
  "switch":          SwitchPreview,
  "accordion":       AccordionPreview,
  "tabs":            TabsPreview,
  "dialog":          DialogPreview,
  "checkbox":        CheckboxPreview,
  "alert":           AlertPreview,

  // Batch 2 Components
  "slider":          SliderPreview,
  "progress":        ProgressPreview,
  "tooltip":         TooltipPreview,
  "hover-card":      HoverCardPreview,
  "dropdown-menu":   DropdownMenuPreview,
  "select":          SelectPreview,
  "skeleton":        SkeletonPreview,
  "separator":       SeparatorPreview,
  "toggle":          TogglePreview,
  "toggle-group":    ToggleGroupPreview,

  // Batch 3 Components
  "calendar":        CalendarPreview,
  "command":         CommandPreview,
  "combobox":        ComboboxPreview,
  "table":           TablePreview,
  "sheet":           SheetPreview,
  "drawer":          DrawerPreview,
  "sonner":          SonnerPreview,
  "carousel":        CarouselPreview,
  "input-otp":       InputOtpPreview,
  "navigation-menu": NavigationMenuPreview,

  // Batch 4 Components
  "button":          ButtonPreview,
  "badge":           BadgePreview,
  "card":            CardPreview,
  "input":           InputPreview,
  "label":           LabelPreview,
  "textarea":        TextareaPreview,
  "radio-group":     RadioGroupPreview,
  "popover":         PopoverPreview,
  "context-menu":    ContextMenuPreview,
  "menubar":         MenubarPreview,

  // Batch 5 Components
  "alert-dialog":    AlertDialogPreview,
  "aspect-ratio":    AspectRatioPreview,
  "breadcrumb":      BreadcrumbPreview,
  "collapsible":     CollapsiblePreview,
  "pagination":      PaginationPreview,
  "resizable":       ResizablePreview,
  "scroll-area":     ScrollAreaPreview,
  "sidebar":         SidebarPreview,
  "spinner":         SpinnerPreview,
  "input-group":     InputGroupPreview,

  // Blocks
  "hero-section":     HeroSection,
  "dashboard-layout": DashboardLayout,
  "footer-block":     FooterBlock,
  "auth-forms":       AuthForms,
  "pricing-section":  PricingSection,
}
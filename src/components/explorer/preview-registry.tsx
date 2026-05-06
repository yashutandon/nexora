import { ButtonPreview } from "../preview/ButtonPreview"
import { CardPreview } from "../preview/CardPreview"
import { BadgePreview } from "../preview/BadgePreview"
import { InputPreview } from "../preview/InputPreview"
import { PricingPreview } from "../preview/PricingPreview"
import { StatsPreview } from "../preview/StatsPreview"
import { ChartCardPreview } from "../preview/ChartCardPreview"
import { TransactionPreview } from "../preview/TransactionPreview"
import { AnimatedButtonPreview } from "../preview/AnimatedButtonPreview"
import { FadeInPreview } from "../preview/FadeInPreview"

export const previewRegistry: Record<string, React.ComponentType> = {
  "button":          ButtonPreview,
  "card":            CardPreview,
  "badge":           BadgePreview,
  "input":           InputPreview,
  "animated-button": AnimatedButtonPreview,
  "fade-in":         FadeInPreview,
  "pricing-card":    PricingPreview,
  "stat-card":       StatsPreview,
  "chart-card":      ChartCardPreview,
  "transaction-row": TransactionPreview,
}
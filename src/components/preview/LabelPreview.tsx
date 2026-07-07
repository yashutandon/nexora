import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LabelPreview() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms-label" />
        <Label htmlFor="terms-label">Accept terms and conditions</Label>
      </div>
    </div>
  )
}

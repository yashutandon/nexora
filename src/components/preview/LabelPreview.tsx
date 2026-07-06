import { Label } from "@/components/ui/label"

export function LabelPreview() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="terms-label" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        <Label htmlFor="terms-label">Accept terms and conditions</Label>
      </div>
    </div>
  )
}

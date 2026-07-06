import { Input } from "@/components/ui/input"

export function InputPreview() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
    </div>
  )
}
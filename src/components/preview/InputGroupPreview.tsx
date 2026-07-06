import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function InputGroupPreview() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
        <Input type="text" placeholder="Search..." className="pl-9" />
      </div>
      <Button type="submit">Search</Button>
    </div>
  )
}

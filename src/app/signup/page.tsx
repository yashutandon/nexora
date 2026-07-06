import { AuthForms } from "@/components/ui/auth-forms"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Sign Up - Nexora UI",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
      <AuthForms mode="signup" />
    </div>
  )
}

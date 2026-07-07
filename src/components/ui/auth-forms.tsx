"use client"

import * as React from "react"
import { Globe, Mail, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/useAuthStore"
import { apiClient } from "@/lib/apiClient"
import { useRouter } from "next/navigation"

export function AuthForms({ className, mode = "login", ...props }: React.HTMLAttributes<HTMLDivElement> & { mode?: "login" | "signup" }) {
  const [isLogin, setIsLogin] = React.useState(mode === "login")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  // Form State
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  
  const { checkAuth, isAuthenticated } = useAuthStore()
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      if (isLogin) {
        await apiClient.post("/auth/login", { email, password })
      } else {
        await apiClient.post("/auth/register", { name, email, password })
      }
      
      // Update global store
      await checkAuth()
      router.push("/dashboard")
    } catch (err) {
      const errorResponse = (err as { response?: { data?: { message?: string } } })?.response;
      setError(errorResponse?.data?.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col md:flex-row gap-8 justify-center items-start w-full max-w-4xl mx-auto", className)} {...props}>
      
      {/* Login Card */}
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 p-8">
        <div className="flex flex-col space-y-2 text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isLogin ? "Enter your email to sign in to your account" : "Enter your details to get started"}
          </p>
        </div>
        
        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md">
                  {error}
                </div>
              )}

              {!isLogin && (
                <div className="grid gap-1">
                  <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    type="text"
                    required
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:focus:ring-zinc-300 dark:text-zinc-50"
                  />
                </div>
              )}
              
              <div className="grid gap-1">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:focus:ring-zinc-300 dark:text-zinc-50"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:focus:ring-zinc-300 dark:text-zinc-50"
                />
              </div>
              
              <button disabled={isLoading} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 mt-2 disabled:opacity-70">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
          
          <div className="text-center text-sm">
             <button onClick={() => setIsLogin(!isLogin)} type="button" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">
               {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
             </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:text-zinc-50 h-10 px-4 py-2 gap-2">
              <Globe className="h-4 w-4" />
              Github
            </button>
            <button type="button" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:text-zinc-50 h-10 px-4 py-2 gap-2">
              <Mail className="h-4 w-4" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

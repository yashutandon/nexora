"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Terminal, AlertCircle, Info, CheckCircle2 } from "lucide-react"

export const AlertPreview = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      {/* 1. Default Alert */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Default</h3>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>

      {/* 2. Destructive (Error) */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Destructive / Error</h3>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </div>

      {/* 3. Info / Primary */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. Info</h3>
        <Alert className="border-blue-500/50 text-blue-600 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400">
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            A new software update is available. Please update your client.
          </AlertDescription>
        </Alert>
      </div>

      {/* 4. Success */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">4. Success</h3>
        <Alert className="border-emerald-500/50 text-emerald-600 dark:text-emerald-400 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your payment was processed successfully.
          </AlertDescription>
        </Alert>
      </div>
      
    </div>
  )
}

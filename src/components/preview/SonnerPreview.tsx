"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export const SonnerPreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* 1. Basic Toast */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic Toast</h3>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </div>

      {/* 2. Success/Error Variants */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">2. Success & Error</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900"
            onClick={() =>
              toast.success("Profile updated successfully")
            }
          >
            Success Toast
          </Button>
          <Button
            variant="outline"
            className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900"
            onClick={() =>
              toast.error("Failed to update profile", {
                description: "Please check your network connection and try again.",
              })
            }
          >
            Error Toast
          </Button>
        </div>
      </div>

      {/* 3. Promise Toast */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">3. Promise Loading</h3>
        <Button
          variant="secondary"
          onClick={() => {
            const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
            toast.promise(promise, {
              loading: 'Loading your data...',
              success: 'Data loaded successfully!',
              error: 'Failed to load data',
            });
          }}
        >
          Simulate Loading (2s)
        </Button>
      </div>
    </div>
  )
}

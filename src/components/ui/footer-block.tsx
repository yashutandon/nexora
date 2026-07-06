import * as React from "react"
import { Globe, MessageCircle, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

export function FooterBlock({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer className={cn("bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800", className)} {...props}>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          <div className="space-y-8">
            <span className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-zinc-50">Nexora</span>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 max-w-xs">
              Making the world a better place through constructing elegant hierarchies and premium user interfaces.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300">
                <span className="sr-only">Website</span>
                <Globe className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300">
                <span className="sr-only">Community</span>
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300">
                <span className="sr-only">Careers</span>
                <Briefcase className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Marketing</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Analytics</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Commerce</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Insights</a></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Pricing</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Documentation</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Guides</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">API Status</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">About</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Blog</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Jobs</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Press</a></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Claim</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Privacy</a></li>
                  <li><a href="#" className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
        <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            &copy; 2026 Nexora, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

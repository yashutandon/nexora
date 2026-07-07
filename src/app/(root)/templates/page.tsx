"use client"

import { Lock, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    id: "saas-dashboard",
    name: "SaaS Dashboard UI",
    description: "A complete admin dashboard with charts, data tables, and metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500",
    isPro: true,
  },
  {
    id: "marketing-hero",
    name: "Marketing Hero Pack",
    description: "10 high-converting hero sections for your next landing page.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500",
    isPro: true,
  },
  {
    id: "auth-flows",
    name: "Authentication Flows",
    description: "Login, Signup, and Password reset screens with beautiful animations.",
    image: "https://images.unsplash.com/photo-1614064641913-a5f10b833215?auto=format&fit=crop&q=80&w=800&h=500",
    isPro: true,
  },
  {
    id: "waitlist",
    name: "Viral Waitlist",
    description: "A minimal, high-converting waitlist page with email capture.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=500",
    isPro: false,
  },
]

export default function TemplatesPage() {
  return (
    <main className="flex-1 w-full pt-32 pb-24 px-4 bg-white dark:bg-black min-h-screen">
      
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            Beautifully crafted templates
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Don&apos;t want to build from scratch? Use our premium blocks and templates to launch your next project in hours, not weeks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="group relative flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 opacity-90"
                />
                {template.isPro && (
                  <div className="absolute top-4 right-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                    <Sparkles className="w-3 h-3" />
                    Pro
                  </div>
                )}
                
                {/* Overlay for Pro templates if not purchased */}
                {template.isPro && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/pricing">
                      <button className="bg-white text-zinc-950 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Lock className="w-4 h-4" />
                        Unlock Pro
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  {template.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-1">
                  {template.description}
                </p>
                <div className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-50 group-hover:opacity-70 transition-opacity">
                  {template.isPro ? "View Details" : "Get Source Code"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </main>
  )
}

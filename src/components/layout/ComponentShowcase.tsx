"use client";

import { motion } from "motion/react";
import { Check, ChevronRight, Play, Settings, Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function ComponentShowcase() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6"
          >
            Components that feel alive
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            A curated collection of highly polished, interactive elements designed to make your SaaS product stand out.
          </motion.p>
        </div>

        {/* Bento Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-2 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 p-8 hover:border-red-500/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Interactive Buttons</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Multiple variants with built-in loading and success states.</p>
            
            <div className="flex flex-wrap gap-4 items-center justify-center p-8 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-zinc-100 dark:border-zinc-800/80">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:scale-105 active:scale-95 transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)]">
                <Sparkles size={16} /> Premium
              </button>
              
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 transition-all">
                Primary Action <ArrowRight size={16} />
              </button>

              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:border-zinc-300 dark:hover:border-zinc-600 active:scale-95 transition-all">
                <Settings size={16} /> Settings
              </button>
            </div>
          </motion.div>

          {/* Card 2: Badges & Tags */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 p-8 hover:border-blue-500/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Dynamic Badges</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Status indicators and labels.</p>
            
            <div className="flex flex-col gap-4 items-center justify-center p-8 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-zinc-100 dark:border-zinc-800/80 h-[180px]">
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-500/30">New Feature</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-500/30">Online</span>
              </div>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-500/30">Warning</span>
                <span className="px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold border border-red-200 dark:border-red-500/30">Error</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Inputs & Controls */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 p-8 hover:border-emerald-500/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Sleek Inputs</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Glowing focus states.</p>
            
            <div className="flex flex-col gap-4 items-center justify-center p-8 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-zinc-100 dark:border-zinc-800/80 h-[220px]">
              <div className="w-full relative group/input">
                <input 
                  type="text" 
                  placeholder="Enter email address..." 
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg p-1.5 hover:scale-105 transition-transform">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Interactive Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 lg:col-span-2 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 p-8 hover:border-purple-500/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Beautiful Cards</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Data presentation that feels premium and thoughtful.</p>
            
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center p-8 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-zinc-100 dark:border-zinc-800/80">
              
              {/* Profile Card */}
              <div className="w-full md:w-64 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-lg shadow-black/5 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-0.5">
                    <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-full border-2 border-transparent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Alex Designer</h4>
                    <p className="text-xs text-zinc-500">Pro Member</p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                </div>
              </div>

              {/* Stats Card */}
              <div className="w-full md:w-64 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-lg shadow-black/5 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    +12.5% <ChevronRight size={12} />
                  </span>
                </div>
                <h4 className="font-bold text-2xl text-zinc-900 dark:text-zinc-100 mb-1">84.2k</h4>
                <p className="text-xs text-zinc-500">Active sessions</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
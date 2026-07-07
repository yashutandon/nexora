"use client";

import { motion } from "motion/react";
import { Copy, Layout, Zap, Lock } from "lucide-react";

const features = [
  {
    title: "Feature-Sliced Architecture",
    description: "Built for scale. Components are organized by domain rather than type.",
    icon: Layout,
    colSpan: "md:col-span-2",
  },
  {
    title: "Production Grade",
    description: "Axios, Zustand, Zod, and Tailwind setup out of the box.",
    icon: Zap,
    colSpan: "md:col-span-1",
  },
  {
    title: "Secure & Fast",
    description: "API clients that automatically handle tokens.",
    icon: Lock,
    colSpan: "md:col-span-1",
  },
  {
    title: "Copy & Paste",
    description: "You own the code. No obscure npm packages. Just paste and tweak.",
    icon: Copy,
    colSpan: "md:col-span-2",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
            Everything you need. <br className="hidden sm:block" />
            Nothing you don&apos;t.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Nexora UI isn&apos;t just a component library. It&apos;s an entire architectural template designed to save you weeks of setup time.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${feature.colSpan}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

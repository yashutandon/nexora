"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Terminal, PackageOpen, Paintbrush, Rocket, Copy, Check } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Terminal,
    title: "Install via CLI",
    desc: "Scaffold a new Next.js project and initialise Nexora with a single command. The init script auto-detects your setup and wires everything.",
    code: "npx create-next-app@latest my-app\nnpx nexora-ui init",
  },
  {
    num: "02",
    icon: PackageOpen,
    title: "Add components",
    desc: "Pull in exactly the components you need. Each one lands directly in your /components/ui folder — no hidden node_modules magic.",
    code: "npx nexora-ui add button card dialog",
  },
  {
    num: "03",
    icon: Paintbrush,
    title: "Customize freely",
    desc: "Every component is plain TypeScript in your codebase. Change anything — structure, variants, logic. Nothing is locked or abstracted away.",
    code: "// Edit src/components/ui/button.tsx\nexport const Button = ({ ... }) => {\n  return <button className=\"...\" />\n}",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Ship to production",
    desc: "Build and deploy like any Next.js app. Nexora adds zero runtime overhead — there is no nexora package in your node_modules at deploy time.",
    code: "npm run build\nnpm start",
  },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
      title="Copy code"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
};

export default function HowItWorksSection() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6"
          >
            How it works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            Four simple steps to integrate production-grade components into your Next.js application.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Glowing Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-red-500 via-red-500/50 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            />
          </div>

          <div className="space-y-24">
            {STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={step.num} className="relative flex flex-col md:flex-row items-center w-full group">
                  
                  {/* Glowing Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-4 border-zinc-50 dark:border-zinc-900 shadow-sm z-10">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                      <step.icon size={16} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content Container (Left or Right) */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <div className={`text-sm font-bold tracking-widest text-red-500 mb-2 ${isEven ? "md:justify-end" : "justify-start"} flex items-center gap-2`}>
                        STEP {step.num}
                      </div>
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                        {step.desc}
                      </p>

                      {/* Mac Terminal Code Block */}
                      <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-2xl text-left mt-6">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/50 border-b border-zinc-800">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          </div>
                          <CopyButton text={step.code} />
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-[13px] leading-relaxed font-mono text-zinc-300">
                            <code>{step.code}</code>
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

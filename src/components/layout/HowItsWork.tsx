"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  memo,
} from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  Check,
  Copy,
  PackageOpen,
  Paintbrush,
  Rocket,
  Terminal,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Utility ──────────────────────────────────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Types ────────────────────────────────────────────────────────────────────
type PackageManager = "npm" | "bun" | "yarn" | "pnpm";
const PACKAGE_MANAGERS: PackageManager[] = ["npm", "bun", "yarn", "pnpm"];

type Language = "shell" | "typescript" | "javascript" | "bash";

interface ShikiToken {
  content: string;
  color?: string;
  fontStyle?: number;
}

interface ShikiLine {
  tokens: ShikiToken[];
}

interface HighlightState {
  key: string;
  lines: ShikiLine[] | null;
  isReady: boolean;
}

type SyntaxToken =
  | { type: "cmd"; text: string; }
  | { type: "flag"; text: string; }
  | { type: "arg"; text: string; }
  | { type: "pkg"; text: string; }
  | { type: "keyword"; text: string; }
  | { type: "string"; text: string; }
  | { type: "fn"; text: string; }
  | { type: "obj"; text: string; }
  | { type: "op"; text: string; }
  | { type: "plain"; text: string; };

type CodeLine =
  | { kind: "shell"; tokens: SyntaxToken[]; }
  | { kind: "comment"; text: string; }
  | { kind: "code"; tokens: SyntaxToken[]; }
  | { kind: "blank"; };

// ─── Shiki singleton loader ───────────────────────────────────────────────────
type HighlighterInstance = {
  codeToTokens: (
    code: string,
    opts: { lang: string; theme: string; }
  ) => { tokens: ShikiToken[][]; };
};

let highlighterPromise: Promise<HighlighterInstance> | null = null;

async function getHighlighter(): Promise<HighlighterInstance> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const { createHighlighter } = await import("shiki");
      return createHighlighter({
        themes: ["github-dark", "github-light"],
        langs: ["shell", "typescript", "javascript", "bash"],
      }) as Promise<HighlighterInstance>;
    })();
  }
  return highlighterPromise;
}

const subscribeToThemeClass = (onStoreChange: () => void) => {
  if (typeof document === "undefined") return () => { };

  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
};

const getIsDarkTheme = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

const getServerIsDarkTheme = () => true;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getPlainText(lines: CodeLine[]): string {
  if (!lines || lines.length === 0) return "";
  return lines
    .map((line) => {
      if (line.kind === "blank") return "";
      if (line.kind === "comment") return line.text;
      if (line.kind === "shell")
        return `$ ${line.tokens.map((t) => t.text).join("")}`;
      return line.tokens.map((t) => t.text).join("");
    })
    .join("\n")
    .trim();
}

function codeLinestoRaw(lines: CodeLine[]): { code: string; lang: Language; } {
  if (!lines || lines.length === 0) return { code: "", lang: "bash" };

  const hasCode = lines.some((l) => l.kind === "code");
  const lang: Language = hasCode ? "typescript" : "bash";

  const code = lines
    .map((line) => {
      if (line.kind === "blank") return "";
      if (line.kind === "comment") return line.text;
      if (line.kind === "shell")
        return line.tokens.map((t) => t.text).join("");
      return line.tokens.map((t) => t.text).join("");
    })
    .join("\n")
    .trim();

  return { code, lang };
}

// ─── Step content ─────────────────────────────────────────────────────────────
interface Step {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  details: string[];
  tip: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    icon: <Terminal size={15} strokeWidth={2} />,
    title: "Install via CLI",
    desc: "Scaffold a new Next.js project and initialise Nexora with a single command. The init script auto-detects your setup and wires everything.",
    details: [
      "Creates a Next.js 16+ app with TypeScript and Tailwind CSS v4 pre-configured.",
      "Runs nexora-ui init which adds the components.json config file to your project root.",
      "Installs only the peer dependencies you actually need — nothing extra.",
      "Sets up the /lib/utils.ts helper with cn() for className merging out of the box.",
    ],
    tip: "Already have a Next.js project? Skip the first command and run nexora-ui init directly inside your existing repo.",
    accent: "text-red-500 dark:text-red-400",
    accentBg: "bg-red-500/10",
    accentBorder: "border-red-500/20",
  },
  {
    num: "02",
    icon: <PackageOpen size={15} strokeWidth={2} />,
    title: "Add components",
    desc: "Pull in exactly the components you need. Each one lands directly in your /components/ui folder — no hidden node_modules magic.",
    details: [
      "Every component is copied as source code into your repo, not imported from a package.",
      "You can add multiple components in a single command by chaining names.",
      "Components are dependency-aware — if Button needs a utility, it gets added too.",
      "Run nexora-ui add --list to browse all 120+ available components before choosing.",
    ],
    tip: "Use nexora-ui diff to see what changed between your local component and the latest Nexora version — perfect for staying up to date without losing customisations.",
    accent: "text-violet-600 dark:text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
  },
  {
    num: "03",
    icon: <Paintbrush size={15} strokeWidth={2} />,
    title: "Customize freely",
    desc: "Every component is plain TypeScript in your codebase. Change anything — structure, variants, logic. Nothing is locked or abstracted away.",
    details: [
      "Open any file in /components/ui and edit it like any other file in your project.",
      "Use Tailwind CSS v4 CSS variables to theme the entire library from one place.",
      "Add new variants, remove unused ones, or change the default props to match your design system.",
      "Components use class-variance-authority (cva) so extending variants is clean and type-safe.",
    ],
    tip: "Drop your brand colors into globals.css as Tailwind v4 variables and every Nexora component picks them up automatically — no per-file edits needed.",
    accent: "text-blue-600 dark:text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
  },
  {
    num: "04",
    icon: <Rocket size={15} strokeWidth={2} />,
    title: "Ship to production",
    desc: "Build and deploy like any Next.js app. Nexora adds zero runtime overhead — there is no nexora package in your node_modules at deploy time.",
    details: [
      "The final bundle only contains the components you actually imported — full tree-shaking.",
      "No client-side Nexora SDK, no telemetry, no external network requests at runtime.",
      "Works with Vercel, Netlify, Railway, Docker, or any platform that runs Node.js.",
      "All components are ARIA-compliant and pass Lighthouse accessibility audits out of the box.",
    ],
    tip: "Run next build && next start locally before deploying to catch any type errors introduced during customisation.",
    accent: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
  },
];

// ─── Code snippets ────────────────────────────────────────────────────────────
const STEP_COMMANDS: Record<PackageManager, CodeLine[][]> = {
  npm: [
    // Step 01 – Install
    [
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "npx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "create-next-app@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "my-app" },
          { type: "plain", text: " " },
          { type: "flag", text: "--typescript" },
          { type: "plain", text: " " },
          { type: "flag", text: "--tailwind" },
        ],
      },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "cd" },
          { type: "plain", text: " " },
          { type: "arg", text: "my-app" },
        ],
      },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "npx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "init" },
        ],
      },
    ],
    // Step 02 – Add components
    [
      { kind: "comment", text: "# add a single component" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "npx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "arg", text: "button" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# add multiple at once" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "npx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "arg", text: "data-table" },
          { type: "plain", text: " " },
          { type: "arg", text: "sidebar" },
          { type: "plain", text: " " },
          { type: "arg", text: "toast" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# browse all available" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "npx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "flag", text: "--list" },
        ],
      },
    ],
    // Step 03 – Customize
    [
      { kind: "comment", text: "// components/ui/button.tsx — it's just your file now" },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "import" },
          { type: "plain", text: " { " },
          { type: "fn", text: "cva" },
          { type: "plain", text: " } " },
          { type: "keyword", text: "from" },
          { type: "plain", text: " " },
          { type: "string", text: '"class-variance-authority"' },
        ],
      },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "import" },
          { type: "plain", text: " { " },
          { type: "fn", text: "cn" },
          { type: "plain", text: " } " },
          { type: "keyword", text: "from" },
          { type: "plain", text: " " },
          { type: "string", text: '"@/lib/utils"' },
        ],
      },
      { kind: "blank" },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "const" },
          { type: "plain", text: " " },
          { type: "obj", text: "buttonVariants" },
          { type: "plain", text: " " },
          { type: "op", text: "=" },
          { type: "plain", text: " " },
          { type: "fn", text: "cva" },
          { type: "op", text: "(" },
          { type: "string", text: '"rounded-lg font-medium transition-all"' },
          { type: "op", text: ", {" },
        ],
      },
      {
        kind: "code",
        tokens: [{ type: "plain", text: "  variants: " }, { type: "op", text: "{" }],
      },
      {
        kind: "code",
        tokens: [
          { type: "plain", text: "    variant: " },
          { type: "op", text: "{" },
          { type: "plain", text: " default: " },
          { type: "string", text: '"bg-zinc-900 text-white"' },
          { type: "plain", text: "," },
        ],
      },
      {
        kind: "code",
        tokens: [
          { type: "plain", text: "               outline: " },
          { type: "string", text: '"border border-zinc-200"' },
          { type: "plain", text: " " },
          { type: "op", text: "}," },
        ],
      },
      {
        kind: "code",
        tokens: [
          { type: "plain", text: "    size: " },
          { type: "op", text: "{" },
          { type: "plain", text: " sm: " },
          { type: "string", text: '"px-3 py-1.5 text-xs"' },
          { type: "plain", text: ", md: " },
          { type: "string", text: '"px-4 py-2 text-sm"' },
          { type: "plain", text: " " },
          { type: "op", text: "}," },
        ],
      },
      { kind: "code", tokens: [{ type: "op", text: "  }," }] },
      {
        kind: "code",
        tokens: [
          { type: "plain", text: "  defaultVariants: " },
          { type: "op", text: "{" },
          { type: "plain", text: " variant: " },
          { type: "string", text: '"default"' },
          { type: "plain", text: ", size: " },
          { type: "string", text: '"md"' },
          { type: "plain", text: " " },
          { type: "op", text: "}," },
        ],
      },
      { kind: "code", tokens: [{ type: "op", text: "})" }] },
    ],
    // Step 04 – Ship
    [
      { kind: "comment", text: "# type-check everything first" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "npx" },
          { type: "plain", text: " " },
          { type: "cmd", text: "tsc" },
          { type: "plain", text: " " },
          { type: "flag", text: "--noEmit" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# build for production" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "npm" },
          { type: "plain", text: " " },
          { type: "arg", text: "run" },
          { type: "plain", text: " " },
          { type: "arg", text: "build" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# start production server" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "npm" },
          { type: "plain", text: " " },
          { type: "arg", text: "run" },
          { type: "plain", text: " " },
          { type: "arg", text: "start" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "// ✓  0 nexora packages in node_modules" },
      { kind: "comment", text: "// ✓  fully tree-shaken, ARIA-compliant, type-safe" },
    ],
  ],

  bun: [
    [
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "bunx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "create-next-app@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "my-app" },
          { type: "plain", text: " " },
          { type: "flag", text: "--typescript" },
          { type: "plain", text: " " },
          { type: "flag", text: "--tailwind" },
        ],
      },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "cd" },
          { type: "plain", text: " " },
          { type: "arg", text: "my-app" },
        ],
      },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "bunx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "init" },
        ],
      },
    ],
    [
      { kind: "comment", text: "# add a single component" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "bunx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "arg", text: "button" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# add multiple at once" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "bunx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "arg", text: "data-table" },
          { type: "plain", text: " " },
          { type: "arg", text: "sidebar" },
          { type: "plain", text: " " },
          { type: "arg", text: "toast" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# browse all available" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "bunx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "flag", text: "--list" },
        ],
      },
    ],
    [
      { kind: "comment", text: "// components/ui/button.tsx — it's just your file now" },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "import" },
          { type: "plain", text: " { " },
          { type: "fn", text: "cva" },
          { type: "plain", text: " } " },
          { type: "keyword", text: "from" },
          { type: "plain", text: " " },
          { type: "string", text: '"class-variance-authority"' },
        ],
      },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "import" },
          { type: "plain", text: " { " },
          { type: "fn", text: "cn" },
          { type: "plain", text: " } " },
          { type: "keyword", text: "from" },
          { type: "plain", text: " " },
          { type: "string", text: '"@/lib/utils"' },
        ],
      },
      { kind: "blank" },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "const" },
          { type: "plain", text: " " },
          { type: "obj", text: "buttonVariants" },
          { type: "plain", text: " " },
          { type: "op", text: "=" },
          { type: "plain", text: " " },
          { type: "fn", text: "cva" },
          { type: "op", text: "(" },
          { type: "string", text: '"rounded-lg font-medium transition-all"' },
          { type: "op", text: ", { variants: { variant: { default: " },
          { type: "string", text: '"bg-zinc-900"' },
          { type: "op", text: " } } })" },
        ],
      },
    ],
    [
      { kind: "comment", text: "# type-check everything first" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "bunx" },
          { type: "plain", text: " " },
          { type: "cmd", text: "tsc" },
          { type: "plain", text: " " },
          { type: "flag", text: "--noEmit" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# build for production" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "bun" },
          { type: "plain", text: " " },
          { type: "arg", text: "run" },
          { type: "plain", text: " " },
          { type: "arg", text: "build" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# start production server" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "bun" },
          { type: "plain", text: " " },
          { type: "arg", text: "run" },
          { type: "plain", text: " " },
          { type: "arg", text: "start" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "// ✓  0 nexora packages in node_modules" },
      { kind: "comment", text: "// ✓  fully tree-shaken, ARIA-compliant, type-safe" },
    ],
  ],

  yarn: [
    [
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "yarn" },
          { type: "plain", text: " " },
          { type: "arg", text: "create" },
          { type: "plain", text: " " },
          { type: "pkg", text: "next-app" },
          { type: "plain", text: " " },
          { type: "arg", text: "my-app" },
          { type: "plain", text: " " },
          { type: "flag", text: "--typescript" },
          { type: "plain", text: " " },
          { type: "flag", text: "--tailwind" },
        ],
      },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "cd" },
          { type: "plain", text: " " },
          { type: "arg", text: "my-app" },
        ],
      },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "yarn" },
          { type: "plain", text: " " },
          { type: "arg", text: "dlx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "init" },
        ],
      },
    ],
    [
      { kind: "comment", text: "# add a single component" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "yarn" },
          { type: "plain", text: " " },
          { type: "arg", text: "dlx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "arg", text: "button" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# add multiple at once" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "yarn" },
          { type: "plain", text: " " },
          { type: "arg", text: "dlx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "arg", text: "data-table" },
          { type: "plain", text: " " },
          { type: "arg", text: "sidebar" },
          { type: "plain", text: " " },
          { type: "arg", text: "toast" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# browse all available" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "yarn" },
          { type: "plain", text: " " },
          { type: "arg", text: "dlx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "flag", text: "--list" },
        ],
      },
    ],
    [
      { kind: "comment", text: "// components/ui/button.tsx — it's just your file now" },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "import" },
          { type: "plain", text: " { " },
          { type: "fn", text: "cva" },
          { type: "plain", text: " } " },
          { type: "keyword", text: "from" },
          { type: "plain", text: " " },
          { type: "string", text: '"class-variance-authority"' },
        ],
      },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "import" },
          { type: "plain", text: " { " },
          { type: "fn", text: "cn" },
          { type: "plain", text: " } " },
          { type: "keyword", text: "from" },
          { type: "plain", text: " " },
          { type: "string", text: '"@/lib/utils"' },
        ],
      },
      { kind: "blank" },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "const" },
          { type: "plain", text: " " },
          { type: "obj", text: "buttonVariants" },
          { type: "plain", text: " " },
          { type: "op", text: "=" },
          { type: "plain", text: " " },
          { type: "fn", text: "cva" },
          { type: "op", text: "(" },
          { type: "string", text: '"rounded-lg font-medium transition-all"' },
          { type: "op", text: ", { variants: { variant: { default: " },
          { type: "string", text: '"bg-zinc-900"' },
          { type: "op", text: " } } })" },
        ],
      },
    ],
    [
      { kind: "comment", text: "# type-check everything first" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "yarn" },
          { type: "plain", text: " " },
          { type: "cmd", text: "tsc" },
          { type: "plain", text: " " },
          { type: "flag", text: "--noEmit" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# build for production" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "yarn" },
          { type: "plain", text: " " },
          { type: "arg", text: "build" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# start production server" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "yarn" },
          { type: "plain", text: " " },
          { type: "arg", text: "start" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "// ✓  0 nexora packages in node_modules" },
      { kind: "comment", text: "// ✓  fully tree-shaken, ARIA-compliant, type-safe" },
    ],
  ],

  pnpm: [
    [
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "pnpm" },
          { type: "plain", text: " " },
          { type: "arg", text: "create" },
          { type: "plain", text: " " },
          { type: "pkg", text: "next-app" },
          { type: "plain", text: " " },
          { type: "arg", text: "my-app" },
          { type: "plain", text: " " },
          { type: "flag", text: "--typescript" },
          { type: "plain", text: " " },
          { type: "flag", text: "--tailwind" },
        ],
      },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "cd" },
          { type: "plain", text: " " },
          { type: "arg", text: "my-app" },
        ],
      },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "pnpm" },
          { type: "plain", text: " " },
          { type: "arg", text: "dlx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "init" },
        ],
      },
    ],
    [
      { kind: "comment", text: "# add a single component" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "pnpm" },
          { type: "plain", text: " " },
          { type: "arg", text: "dlx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "arg", text: "button" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# add multiple at once" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "pnpm" },
          { type: "plain", text: " " },
          { type: "arg", text: "dlx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "arg", text: "data-table" },
          { type: "plain", text: " " },
          { type: "arg", text: "sidebar" },
          { type: "plain", text: " " },
          { type: "arg", text: "toast" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# browse all available" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "pnpm" },
          { type: "plain", text: " " },
          { type: "arg", text: "dlx" },
          { type: "plain", text: " " },
          { type: "pkg", text: "nexora-ui@latest" },
          { type: "plain", text: " " },
          { type: "arg", text: "add" },
          { type: "plain", text: " " },
          { type: "flag", text: "--list" },
        ],
      },
    ],
    [
      { kind: "comment", text: "// components/ui/button.tsx — it's just your file now" },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "import" },
          { type: "plain", text: " { " },
          { type: "fn", text: "cva" },
          { type: "plain", text: " } " },
          { type: "keyword", text: "from" },
          { type: "plain", text: " " },
          { type: "string", text: '"class-variance-authority"' },
        ],
      },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "import" },
          { type: "plain", text: " { " },
          { type: "fn", text: "cn" },
          { type: "plain", text: " } " },
          { type: "keyword", text: "from" },
          { type: "plain", text: " " },
          { type: "string", text: '"@/lib/utils"' },
        ],
      },
      { kind: "blank" },
      {
        kind: "code",
        tokens: [
          { type: "keyword", text: "const" },
          { type: "plain", text: " " },
          { type: "obj", text: "buttonVariants" },
          { type: "plain", text: " " },
          { type: "op", text: "=" },
          { type: "plain", text: " " },
          { type: "fn", text: "cva" },
          { type: "op", text: "(" },
          { type: "string", text: '"rounded-lg font-medium transition-all"' },
          { type: "op", text: ", { variants: { variant: { default: " },
          { type: "string", text: '"bg-zinc-900"' },
          { type: "op", text: " } } })" },
        ],
      },
    ],
    [
      { kind: "comment", text: "# type-check everything first" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "pnpm" },
          { type: "plain", text: " " },
          { type: "cmd", text: "tsc" },
          { type: "plain", text: " " },
          { type: "flag", text: "--noEmit" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# build for production" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "pnpm" },
          { type: "plain", text: " " },
          { type: "arg", text: "build" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "# start production server" },
      {
        kind: "shell",
        tokens: [
          { type: "cmd", text: "pnpm" },
          { type: "plain", text: " " },
          { type: "arg", text: "start" },
        ],
      },
      { kind: "blank" },
      { kind: "comment", text: "// ✓  0 nexora packages in node_modules" },
      { kind: "comment", text: "// ✓  fully tree-shaken, ARIA-compliant, type-safe" },
    ],
  ],
};

const CTA_COMMANDS: Record<PackageManager, string> = {
  npm: "npx nexora-ui@latest init",
  bun: "bunx nexora-ui@latest init",
  yarn: "yarn dlx nexora-ui@latest init",
  pnpm: "pnpm dlx nexora-ui@latest init",
};

// ─── Blinking Cursor ──────────────────────────────────────────────────────────
const BlinkingCursor = memo(function BlinkingCursor() {
  return (
    <span
      className="inline-block w-0.5 h-3.5 ml-0.5 align-middle bg-current opacity-0"
      style={{ animation: "blink-cursor 1.1s step-start infinite" }}
      aria-hidden="true"
    />
  );
});

// ─── Copy Button ──────────────────────────────────────────────────────────────
interface CopyButtonProps {
  getText: () => string;
  className?: string;
}

const CopyButton = memo(function CopyButton({ getText, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleCopy = useCallback(async () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available in some environments
    }
  }, [getText]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
      style={{
        transform: pressed ? "scale(0.88)" : "scale(1)",
        transition: "transform 0.12s ease",
      }}
      className={cn(
        "relative flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5",
        "text-[11px] font-medium select-none transition-colors duration-150",
        "text-zinc-400 hover:text-zinc-200 hover:bg-white/6",
        "dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-white/5",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, scale: 0.75, y: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: -2 }}
            transition={{ duration: 0.14 }}
            className="flex items-center gap-1.5 text-emerald-400"
          >
            <Check size={11} strokeWidth={3} />
            <span>Copied</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.75, y: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: -2 }}
            transition={{ duration: 0.14 }}
            className="flex items-center gap-1.5"
          >
            <Copy size={11} strokeWidth={2} />
            <span>Copy</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
});

// ─── Shiki Code Renderer ──────────────────────────────────────────────────────
interface ShikiCodeProps {
  code: string;
  lang: Language;
  showLineNumbers?: boolean;
  isDark?: boolean;
}

const ShikiCode = memo(function ShikiCode({
  code,
  lang,
  showLineNumbers = false,
  isDark = true,
}: ShikiCodeProps) {
  const [highlight, setHighlight] = useState<HighlightState | null>(null);
  const hasCode = Boolean(code.trim());
  const highlightKey = `${lang}:${isDark ? "dark" : "light"}:${code}`;
  const isCurrentHighlight = highlight?.key === highlightKey;
  const lines = hasCode ? (isCurrentHighlight ? highlight.lines : null) : [];
  const isReady = hasCode ? Boolean(isCurrentHighlight && highlight.isReady) : true;

  useEffect(() => {
    if (!hasCode) return;

    let cancelled = false;

    getHighlighter()
      .then((hl) => {
        if (cancelled) return;
        try {
          const result = hl.codeToTokens(code, {
            lang,
            theme: isDark ? "github-dark" : "github-light",
          });
          const parsed: ShikiLine[] = result.tokens.map((lineTokens) => ({
            tokens: lineTokens,
          }));
          setHighlight({ key: highlightKey, lines: parsed, isReady: false });
          setTimeout(() => {
            if (!cancelled) {
              setHighlight({ key: highlightKey, lines: parsed, isReady: true });
            }
          }, 40);
        } catch {
          setHighlight({ key: highlightKey, lines: null, isReady: true });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHighlight({ key: highlightKey, lines: null, isReady: true });
        }
      });

    return () => { cancelled = true; };
  }, [code, lang, isDark, hasCode, highlightKey]);

  // Skeleton shimmer while Shiki loads
  if (!lines) {
    const lineCount = Math.min(code.split("\n").length || 3, 10);
    return (
      <div className="flex flex-col gap-2.5 px-5 py-4 animate-pulse">
        {Array.from({ length: lineCount }).map((_, i) => (
          <div
            key={i}
            className="h-3.5 rounded-md bg-white/4 dark:bg-white/4"
            style={{ width: `${50 + ((i * 29) % 45)}%` }}
          />
        ))}
      </div>
    );
  }

  const isShellLang = lang === "bash" || lang === "shell";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{ duration: 0.28 }}
      className="overflow-x-auto py-4"
      style={{
        fontFamily:
          "'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, 'Menlo', monospace",
      }}
    >
      <table className="w-full border-collapse">
        <tbody>
          {lines.map((line, lineIdx) => {
            const isBlankLine = line.tokens.every((t) => !t.content.trim());
            const isCommentLine =
              line.tokens.length > 0 &&
              (line.tokens[0]?.content?.trimStart().startsWith("#") ||
                line.tokens[0]?.content?.trimStart().startsWith("//"));

            const showPrompt =
              isShellLang && !isCommentLine && !isBlankLine;

            return (
              <tr
                key={lineIdx}
                className="group/line transition-colors duration-75 hover:bg-white/2.5"
              >
                {/* Line numbers */}
                {showLineNumbers && (
                  <td
                    className="w-10 select-none pr-4 pl-5 text-right align-top text-[11.5px] leading-[1.8] text-zinc-600 group-hover/line:text-zinc-500"
                    aria-hidden="true"
                  >
                    {isBlankLine ? "" : lineIdx + 1}
                  </td>
                )}

                {/* Shell prompt column */}
                {isShellLang && (
                  <td
                    className={cn(
                      "w-4 select-none align-top text-[13px] leading-[1.8] pr-2.5 shrink-0",
                      showLineNumbers ? "pl-0" : "pl-5",
                      "text-zinc-600 dark:text-zinc-600",
                    )}
                    aria-hidden="true"
                  >
                    {showPrompt ? "$" : ""}
                  </td>
                )}

                {/* Code tokens */}
                <td
                  className={cn(
                    "text-[13px] leading-[1.8] whitespace-pre pr-5 align-top",
                    !showLineNumbers && !isShellLang && "pl-5",
                  )}
                >
                  {line.tokens.map((token, ti) => (
                    <span
                      key={ti}
                      style={{
                        color: token.color,
                        fontStyle: token.fontStyle === 1 ? "italic" : undefined,
                        fontWeight: token.fontStyle === 2 ? "bold" : undefined,
                      }}
                    >
                      {token.content}
                    </span>
                  ))}
                  {/* Blinking cursor on last non-blank line */}
                  {lineIdx === lines.length - 1 && !isBlankLine && (
                    <BlinkingCursor />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
});

// ─── CodeBlock ────────────────────────────────────────────────────────────────
interface CodeBlockProps {
  lines: CodeLine[];
  title?: string;
  showLineNumbers?: boolean;
  forceDark?: boolean;
}

const CodeBlock = memo(function CodeBlock({
  lines,
  title,
  showLineNumbers = false,
  forceDark,
}: CodeBlockProps) {
  // ← Guard: nothing to render
  const [isHovered, setIsHovered] = useState(false);
  const documentIsDark = useSyncExternalStore(
    subscribeToThemeClass,
    getIsDarkTheme,
    getServerIsDarkTheme,
  );
  const isDark = forceDark ?? documentIsDark;

  const { code, lang } = codeLinestoRaw(lines);
  const getText = useCallback(() => getPlainText(lines), [lines]);
  const label = title ?? (lang === "typescript" ? "button.tsx" : "terminal");

  // â† Guard: nothing to render
  if (!lines || lines.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 0; }
          45%, 55% { opacity: 1; }
        }
      `}</style>

      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          boxShadow: isHovered
            ? isDark
              ? "0 0 0 1px rgba(255,255,255,0.09), 0 8px 40px rgba(0,0,0,0.6), 0 0 70px rgba(255,255,255,0.02)"
              : "0 0 0 1px rgba(0,0,0,0.09), 0 8px 40px rgba(0,0,0,0.16)"
            : isDark
              ? "0 0 0 1px rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.45)"
              : "0 0 0 1px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.08)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl",
          "bg-[#f6f8fa] border border-zinc-200/80",
          "dark:bg-[#0d1117] dark:border-white/6",
        )}
      >
        {/* Depth gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl dark:opacity-100 opacity-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Header */}
        <div
          className={cn(
            "relative flex items-center justify-between px-4 py-2.75",
            "border-b border-zinc-200/80 bg-white/70",
            "dark:border-white/5 dark:bg-white/2",
          )}
          style={{ backdropFilter: "blur(8px)" }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.75" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_5px_rgba(255,95,87,0.55)]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_5px_rgba(254,188,46,0.45)]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_5px_rgba(40,200,64,0.45)]" />
          </div>

          {/* Filename / title — centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            <Terminal
              size={10}
              strokeWidth={2}
              className="text-zinc-400 dark:text-zinc-600"
              aria-hidden="true"
            />
            <span className="text-[11px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500 select-none">
              {label}
            </span>
          </div>

          <CopyButton getText={getText} />
        </div>

        {/* Code area */}
        <ShikiCode
          code={code}
          lang={lang}
          showLineNumbers={showLineNumbers}
          isDark={isDark}
        />
      </motion.div>
    </>
  );
});

// ─── StepCard ────────────────────────────────────────────────────────────────
interface StepCardProps {
  step: Step;
  stepIndex: number;
  lines: CodeLine[];
  isLast: boolean;
  inView: boolean;
}

const StepCard = memo(function StepCard({
  step,
  stepIndex,
  lines,
  isLast,
  inView,
}: StepCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={0.2 + stepIndex * 0.1}
      className={cn(
        "relative flex flex-col lg:grid lg:grid-cols-2",
        !isLast && "mb-14 lg:mb-20",
      )}
    >
      {/* Left: explanation */}
      <div className="flex flex-col justify-center pb-8 lg:pb-0 lg:pr-14 xl:pr-20">
        {/* Badge row */}
        <div className="mb-5 flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
              step.accentBg,
              step.accentBorder,
              step.accent,
            )}
            aria-hidden="true"
          >
            {step.icon}
          </div>
          <span className="select-none font-mono text-[11.5px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
            Step {step.num}
          </span>
        </div>

        <h3 className="mb-3 text-[22px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100 sm:text-[24px]">
          {step.title}
        </h3>

        <p className="mb-6 text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {step.desc}
        </p>

        <ul className="mb-5 flex flex-col gap-3" aria-label={`Details for step ${step.num}`}>
          {step.details.map((detail, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold",
                  step.accentBg,
                  step.accent,
                )}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <aside
          className={cn(
            "flex items-start gap-3 rounded-xl border px-4 py-3",
            "border-zinc-100 bg-zinc-50 dark:border-white/5 dark:bg-zinc-800/50",
          )}
        >
          <span className="mt-px shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Tip
          </span>
          <p className="text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            {step.tip}
          </p>
        </aside>
      </div>

      {/* Centre connector dot (desktop) */}
      <div
        className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 lg:flex"
        aria-hidden="true"
      >
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-2xl border-2",
            step.accentBg,
            step.accentBorder,
            step.accent,
          )}
        >
          {step.icon}
        </div>
      </div>

      {/* Right: CodeBlock */}
      <div className="flex flex-col justify-center lg:pl-14 xl:pl-20">
        <CodeBlock lines={lines} />
      </div>
    </motion.div>
  );
});

// ─── HowItWorksSection ────────────────────────────────────────────────────────
export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [activePM, setActivePM] = useState<PackageManager>("npm");
  const [ctaCopied, setCtaCopied] = useState(false);
  const [ctaPressed, setCtaPressed] = useState(false);

  const handleCtaCopy = useCallback(async () => {
    setCtaPressed(true);
    setTimeout(() => setCtaPressed(false), 150);
    try {
      await navigator.clipboard.writeText(CTA_COMMANDS[activePM]);
      setCtaCopied(true);
      setTimeout(() => setCtaCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [activePM]);

  return (
    <section className="relative flex w-full justify-center px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="w-full max-w-6xl pb-20 pt-10 sm:pb-28 sm:pt-14">

        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-10 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-red-400/60 dark:bg-red-500/60" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-red-500 dark:text-red-400">
            How it works
          </span>
        </motion.div>

        {/* Heading */}
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.06}
            className="font-serif text-[42px] font-semibold leading-[1.06] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[54px]"
          >
            From zero to{" "}
            <em className="text-red-500 not-italic dark:text-red-400">shipped</em>{" "}
            in minutes.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.12}
            className="max-w-sm text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400 lg:pb-1"
          >
            No wrapper libraries, no hidden abstractions. Nexora drops components directly into your
            repo — you own every line.
          </motion.p>
        </div>

        {/* Package-manager tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.16}
          className={cn(
            "mb-14 flex w-fit items-center gap-1 rounded-xl border p-1",
            "border-zinc-200 bg-zinc-100",
            "dark:border-white/6 dark:bg-zinc-800/60",
          )}
          role="tablist"
          aria-label="Select package manager"
        >
          {PACKAGE_MANAGERS.map((pm) => (
            <button
              key={pm}
              type="button"
              role="tab"
              aria-selected={activePM === pm}
              onClick={() => setActivePM(pm)}
              className={cn(
                "cursor-pointer rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold transition-all duration-200",
                activePM === pm
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300",
              )}
            >
              {pm}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rule */}
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 lg:block",
              "bg-linear-to-b from-zinc-200 via-zinc-200/50 to-transparent",
              "dark:from-zinc-800 dark:via-zinc-800/50",
            )}
            aria-hidden="true"
          />

          <div className="flex flex-col">
            {STEPS.map((step, idx) => (
              <StepCard
                key={step.num}
                step={step}
                stepIndex={idx}
                lines={STEP_COMMANDS[activePM][idx] ?? []}  // ← safe fallback
                isLast={idx === STEPS.length - 1}
                inView={inView}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.65}
          className={cn(
            "mt-16 flex flex-col items-start gap-5 rounded-2xl border px-6 py-5",
            "sm:flex-row sm:items-center sm:justify-between",
            "border-zinc-200 bg-white dark:border-white/[0.07] dark:bg-zinc-900",
          )}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
              Ready to start building?
            </p>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-500">
              One command and you&apos;re in. No account, no signup, fully open source.
            </p>
          </div>

          <div
            className={cn(
              "flex w-full items-center gap-2 rounded-xl border py-2 pl-3 pr-2",
              "sm:w-auto sm:min-w-[320px]",
              "border-zinc-200 bg-zinc-50 dark:border-white/8 dark:bg-zinc-950",
            )}
          >
            <span
              className="shrink-0 font-mono text-[12px] text-zinc-300 dark:text-zinc-600 select-none"
              aria-hidden="true"
            >
              $
            </span>
            <span className="flex-1 truncate font-mono text-[12px] text-zinc-700 dark:text-zinc-200">
              {CTA_COMMANDS[activePM]}
            </span>
            <button
              type="button"
              onClick={handleCtaCopy}
              aria-label={ctaCopied ? "Copied!" : "Copy command"}
              style={{
                transform: ctaPressed ? "scale(0.88)" : "scale(1)",
                transition: "transform 0.12s ease",
              }}
              className={cn(
                "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5",
                "text-[11px] font-medium transition-colors duration-150",
                "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600",
                "dark:text-zinc-500 dark:hover:bg-white/6 dark:hover:text-zinc-300",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {ctaCopied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.14 }}
                    className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400"
                  >
                    <Check size={11} strokeWidth={3} />
                    <span>Copied</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.14 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy size={11} strokeWidth={2} />
                    <span>Copy</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

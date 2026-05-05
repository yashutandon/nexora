"use client";

import React, {
  useState,
  useRef,
  useCallback,
  memo,
  useEffect,
  useSyncExternalStore,
} from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  Bell,
  Check,
  ChevronDown,
  Copy,
  Layers,
  LayoutGrid,
  Loader2,
  Moon,
  Search,
  Sparkles,
  Star,
  Sun,
  User,
  X,
  Zap,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Animation variants ────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Shiki singleton ───────────────────────────────────────────────────────
type HighlighterInstance = {
  codeToTokens: (
    code: string,
    opts: { lang: string; theme: string; }
  ) => { tokens: { content: string; color?: string; fontStyle?: number; }[][]; };
};

type TokenRow = { content: string; color?: string; fontStyle?: number; }[];

interface CodeHighlightState {
  key: string;
  tokenLines: TokenRow[] | null;
  ready: boolean;
}

let highlighterPromise: Promise<HighlighterInstance> | null = null;
async function getHighlighter(): Promise<HighlighterInstance> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const { createHighlighter } = await import("shiki");
      return createHighlighter({
        themes: ["github-dark", "github-light"],
        langs: ["tsx", "typescript"],
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

// ─── Category definitions ──────────────────────────────────────────────────
type CategoryId = "buttons" | "inputs" | "cards" | "feedback" | "navigation";

interface Category {
  id: CategoryId;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const CATEGORIES: Category[] = [
  {
    id: "buttons",
    label: "Buttons",
    icon: <Zap size={13} strokeWidth={2} />,
    description: "Interactive action triggers with variants, sizes, and states",
  },
  {
    id: "inputs",
    label: "Inputs",
    icon: <Search size={13} strokeWidth={2} />,
    description: "Form controls — text fields, toggles, selects",
  },
  {
    id: "cards",
    label: "Cards",
    icon: <LayoutGrid size={13} strokeWidth={2} />,
    description: "Content containers with rich layout options",
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: <Bell size={13} strokeWidth={2} />,
    description: "Alerts, badges, toasts, and status indicators",
  },
  {
    id: "navigation",
    label: "Navigation",
    icon: <Layers size={13} strokeWidth={2} />,
    description: "Tabs, breadcrumbs, and navigation patterns",
  },
];

// ─── Code snippets per category ────────────────────────────────────────────
const CATEGORY_CODE: Record<CategoryId, string> = {
  buttons: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">
        Get started
      </Button>
      <Button variant="outline">
        Learn more
      </Button>
      <Button variant="ghost">
        Cancel
      </Button>
      <Button variant="destructive">
        Delete
      </Button>
      <Button disabled>
        <Loader2 className="animate-spin" />
        Loading...
      </Button>
    </div>
  )
}`,

  inputs: `import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Select } from "@/components/ui/select"

export function InputDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Input
        placeholder="Search components..."
        prefix={<Search size={14} />}
      />
      <Select defaultValue="react">
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </Select>
      <div className="flex items-center gap-3">
        <Toggle defaultChecked />
        <span className="text-sm">Dark mode</span>
      </div>
    </div>
  )
}`,

  cards: `import { Card } from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Nexora UI</CardTitle>
        <CardDescription>
          Beautiful components, zero lock-in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-500">
          Every component lives in your codebase.
          Own it, extend it, ship it.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Get started free
        </Button>
      </CardFooter>
    </Card>
  )
}`,

  feedback: `import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/toast"

export function FeedbackDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="success">
        <CheckCircle size={16} />
        Component added successfully.
      </Alert>
      <Alert variant="warning">
        <AlertTriangle size={16} />
        Peer dependency missing.
      </Alert>
      <div className="flex gap-2 flex-wrap">
        <Badge>New</Badge>
        <Badge variant="outline">Beta</Badge>
        <Badge variant="destructive">Breaking</Badge>
      </div>
    </div>
  )
}`,

  navigation: `import { Tabs } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb"

export function NavigationDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
        <BreadcrumbItem>Button</BreadcrumbItem>
      </Breadcrumb>
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}`,
};

// ─── Live previews per category ────────────────────────────────────────────

// Buttons preview
function ButtonsPreview() {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="flex flex-wrap gap-2.5">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[13px] font-medium hover:bg-zinc-700 dark:hover:bg-white transition-colors duration-150 shadow-sm">
          <Sparkles size={13} strokeWidth={2} />
          Get started
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-200 text-[13px] font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-150">
          Learn more
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 text-[13px] font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150">
          Cancel
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-[13px] font-medium hover:bg-red-600 transition-colors duration-150">
          <X size={13} strokeWidth={2.5} />
          Delete
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[12px] font-medium hover:bg-zinc-700 dark:hover:bg-white transition-colors">
          Small
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[14px] font-medium hover:bg-zinc-700 dark:hover:bg-white transition-colors">
          Large
        </button>
        <button
          onClick={handleLoad}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-[13px] font-medium disabled:opacity-60 transition-all"
        >
          {loading ? (
            <Loader2 size={13} strokeWidth={2} className="animate-spin" />
          ) : (
            <Check size={13} strokeWidth={2.5} />
          )}
          {loading ? "Loading…" : "Click me"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {["violet", "blue", "emerald", "amber"].map((c) => (
          <button
            key={c}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-colors",
              c === "violet" && "bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20",
              c === "blue" && "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
              c === "emerald" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
              c === "amber" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20",
            )}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

// Inputs preview
function InputsPreview() {
  const [toggleOn, setToggleOn] = useState(true);
  const [darkToggle, setDarkToggle] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selected, setSelected] = useState("React");
  const frameworks = ["React", "Vue", "Svelte", "Solid"];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      {/* Search input */}
      <div className="relative">
        <Search size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          className="w-full pl-8 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[13px] text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all"
          placeholder="Search components…"
        />
      </div>

      {/* Select */}
      <div className="relative">
        <button
          onClick={() => setSelectOpen(!selectOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[13px] text-zinc-800 dark:text-zinc-200 focus:outline-none"
        >
          <span>{selected}</span>
          <ChevronDown size={13} strokeWidth={2} className={cn("text-zinc-400 transition-transform", selectOpen && "rotate-180")} />
        </button>
        <AnimatePresence>
          {selectOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.14 }}
              className="absolute top-full mt-1 left-0 right-0 z-10 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden"
            >
              {frameworks.map((f) => (
                <button
                  key={f}
                  onClick={() => { setSelected(f); setSelectOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-[13px] text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors",
                    selected === f ? "text-zinc-900 dark:text-zinc-100 font-medium" : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {selected === f && <Check size={12} strokeWidth={2.5} />}
                  {selected !== f && <span className="w-3" />}
                  {f}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {[
          { label: "Notifications", icon: <Bell size={13} />, val: toggleOn, set: setToggleOn },
          { label: "Dark mode", icon: darkToggle ? <Moon size={13} /> : <Sun size={13} />, val: darkToggle, set: setDarkToggle },
        ].map(({ label, icon, val, set }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[13px] text-zinc-600 dark:text-zinc-400">
              {icon}
              <span>{label}</span>
            </div>
            <button
              onClick={() => set(!val)}
              className={cn(
                "relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none",
                val ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-700"
              )}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className={cn(
                  "absolute top-0.5 w-4 h-4 rounded-full shadow-sm",
                  val ? "bg-white dark:bg-zinc-900" : "bg-white dark:bg-zinc-500"
                )}
                style={{ left: val ? "calc(100% - 18px)" : "2px" }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cards preview
function CardsPreview() {
  const [starred, setStarred] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {/* Main card */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
        <div className="h-24 bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
              <Sparkles size={14} strokeWidth={2} className="text-white dark:text-zinc-900" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-1.5">
            <h4 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">Nexora UI</h4>
            <button
              onClick={() => setStarred(!starred)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                size={14}
                strokeWidth={2}
                className={cn(
                  "transition-colors",
                  starred ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-600"
                )}
              />
            </button>
          </div>
          <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
            Beautiful components, zero lock-in. Own every line.
          </p>
          <button className="w-full py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[12.5px] font-medium hover:bg-zinc-700 dark:hover:bg-white transition-colors">
            Get started free
          </button>
        </div>
      </div>

      {/* Compact stat cards */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Components", val: "120+", color: "text-violet-600 dark:text-violet-400" },
          { label: "Downloads", val: "12k+", color: "text-emerald-600 dark:text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3">
            <p className={cn("text-[20px] font-semibold leading-none mb-1", s.color)}>{s.val}</p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Feedback preview
function FeedbackPreview() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const alerts = [
    { id: "success", icon: <Check size={13} strokeWidth={2.5} />, label: "Success", msg: "Component added successfully.", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20", text: "text-emerald-700 dark:text-emerald-400" },
    { id: "warning", icon: <Bell size={13} strokeWidth={2} />, label: "Warning", msg: "Peer dependency missing.", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20", text: "text-amber-700 dark:text-amber-400" },
    { id: "error", icon: <X size={13} strokeWidth={2.5} />, label: "Error", msg: "Build failed. Check logs.", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-200 dark:border-red-500/20", text: "text-red-700 dark:text-red-400" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Alerts */}
      {alerts.filter(a => !dismissed.includes(a.id)).map((a) => (
        <motion.div
          key={a.id}
          layout
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8, height: 0 }}
          className={cn("flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border", a.bg, a.border)}
        >
          <span className={cn("mt-px shrink-0", a.text)}>{a.icon}</span>
          <p className={cn("text-[12.5px] flex-1 leading-relaxed", a.text)}>{a.msg}</p>
          <button onClick={() => setDismissed(p => [...p, a.id])} className={cn("shrink-0 opacity-50 hover:opacity-100 transition-opacity", a.text)}>
            <X size={12} strokeWidth={2.5} />
          </button>
        </motion.div>
      ))}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[
          { label: "New", bg: "bg-zinc-900 dark:bg-zinc-100", text: "text-white dark:text-zinc-900" },
          { label: "Beta", bg: "border border-zinc-300 dark:border-zinc-700", text: "text-zinc-600 dark:text-zinc-400" },
          { label: "Breaking", bg: "bg-red-500", text: "text-white" },
          { label: "Stable", bg: "bg-emerald-500/10 border border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400" },
        ].map((b) => (
          <span key={b.label} className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-semibold", b.bg, b.text)}>
            {b.label}
          </span>
        ))}
      </div>

      {/* Toast trigger */}
      <button
        onClick={showToast}
        className="mt-1 w-fit inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[12.5px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <Bell size={13} strokeWidth={2} />
        Show toast
      </button>

      {/* Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg"
          >
            <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Check size={12} strokeWidth={2.5} className="text-emerald-500" />
            </span>
            <p className="text-[12.5px] text-zinc-700 dark:text-zinc-300 font-medium">Component added to your project</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Navigation preview
function NavigationPreview() {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "docs">("preview");
  const tabs = [
    { id: "preview" as const, label: "Preview" },
    { id: "code" as const, label: "Code" },
    { id: "docs" as const, label: "Docs" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12.5px]">
        {["Home", "Docs", "Components", "Button"].map((crumb, i, arr) => (
          <React.Fragment key={crumb}>
            <span className={cn(i === arr.length - 1 ? "text-zinc-900 dark:text-zinc-100 font-medium" : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer transition-colors")}>
              {crumb}
            </span>
            {i < arr.length - 1 && <span className="text-zinc-300 dark:text-zinc-700">/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center gap-0.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 w-fit border border-zinc-200 dark:border-white/6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-3.5 py-1.5 rounded-md text-[12.5px] font-medium transition-colors duration-150 z-10",
                activeTab === tab.id
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              )}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md bg-white dark:bg-zinc-900 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-[12.5px] text-zinc-500 dark:text-zinc-400 min-h-13"
          >
            {activeTab === "preview" && "Live component renders here with all variants visible."}
            {activeTab === "code" && <code className="font-mono text-[11.5px] text-zinc-600 dark:text-zinc-400">{"<Button variant=\"default\">Click me</Button>"}</code>}
            {activeTab === "docs" && "Full API reference with prop types, defaults, and examples."}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* User avatar group */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {["bg-violet-400", "bg-blue-400", "bg-emerald-400", "bg-amber-400"].map((c, i) => (
            <div key={i} className={cn("w-7 h-7 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white", c)}>
              <User size={12} strokeWidth={2} />
            </div>
          ))}
        </div>
        <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">2,400+</span> developers shipping with Nexora
        </p>
      </div>
    </div>
  );
}

const PREVIEWS: Record<CategoryId, React.ReactNode> = {
  buttons: <ButtonsPreview />,
  inputs: <InputsPreview />,
  cards: <CardsPreview />,
  feedback: <FeedbackPreview />,
  navigation: <NavigationPreview />,
};

// ─── Shiki highlighted code panel ─────────────────────────────────────────
interface CodePanelProps {
  code: string;
  isDark: boolean;
}

const CodePanel = memo(function CodePanel({ code, isDark }: CodePanelProps) {
  const [highlight, setHighlight] = useState<CodeHighlightState | null>(null);
  const [copied, setCopied] = useState(false);
  const highlightKey = `${isDark ? "dark" : "light"}:${code}`;
  const isCurrentHighlight = highlight?.key === highlightKey;
  const tokenLines = isCurrentHighlight ? highlight.tokenLines : null;
  const ready = Boolean(isCurrentHighlight && highlight.ready);

  useEffect(() => {
    let cancelled = false;

    getHighlighter().then((hl) => {
      if (cancelled) return;
      try {
        const result = hl.codeToTokens(code, {
          lang: "tsx",
          theme: isDark ? "github-dark" : "github-light",
        });
        setHighlight({
          key: highlightKey,
          tokenLines: result.tokens,
          ready: false,
        });
        setTimeout(() => {
          if (!cancelled) {
            setHighlight({
              key: highlightKey,
              tokenLines: result.tokens,
              ready: true,
            });
          }
        }, 30);
      } catch {
        setHighlight({ key: highlightKey, tokenLines: null, ready: true });
      }
    });
    return () => { cancelled = true; };
  }, [code, isDark, highlightKey]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* */ }
  }, [code]);

  return (
    <div className={cn(
      "relative flex flex-col h-full rounded-xl overflow-hidden border",
      "border-zinc-200 dark:border-white/6",
      "bg-[#f6f8fa] dark:bg-[#0d1117]",
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between px-4 py-2.5 border-b shrink-0",
        "border-zinc-200 dark:border-white/5",
        "bg-white/70 dark:bg-white/2",
      )}>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_4px_rgba(255,95,87,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[0_0_4px_rgba(254,188,46,0.4)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[0_0_4px_rgba(40,200,64,0.4)]" />
        </div>
        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600 select-none font-mono">
          component.tsx
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span key="c" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-1 text-emerald-500">
                <Check size={10} strokeWidth={3} /><span>Copied</span>
              </motion.span>
            ) : (
              <motion.span key="x" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-1">
                <Copy size={10} strokeWidth={2} /><span>Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-auto flex-1 px-0 py-3" style={{ fontFamily: "'JetBrains Mono','Fira Code',ui-monospace,monospace" }}>
        {!tokenLines ? (
          <div className="flex flex-col gap-2 px-5 py-2 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 rounded bg-zinc-200 dark:bg-white/4" style={{ width: `${48 + (i * 17 % 44)}%` }} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.25 }}>
            <table className="w-full border-collapse">
              <tbody>
                {tokenLines.map((lineTokens, li) => (
                  <tr key={li} className="hover:bg-white/2 transition-colors group">
                    <td className="select-none pl-4 pr-3 text-right text-[11px] leading-[1.75] text-zinc-400/50 dark:text-zinc-700 w-8 align-top group-hover:text-zinc-400 dark:group-hover:text-zinc-600 transition-colors">
                      {li + 1}
                    </td>
                    <td className="pr-5 text-[12px] leading-[1.75] whitespace-pre align-top">
                      {lineTokens.map((token, ti) => (
                        <span key={ti} style={{ color: token.color, fontStyle: token.fontStyle === 1 ? "italic" : undefined, fontWeight: token.fontStyle === 2 ? "bold" : undefined }}>
                          {token.content}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
});

// ─── Main export ───────────────────────────────────────────────────────────
export default function ComponentShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState<CategoryId>("buttons");
  const isDark = useSyncExternalStore(
    subscribeToThemeClass,
    getIsDarkTheme,
    getServerIsDarkTheme,
  );

  return (
    <section className="relative flex w-full justify-center px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="w-full max-w-6xl pt-10 sm:pt-14 pb-20 sm:pb-28">

        {/* Section label */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0} className="mb-10 flex items-center gap-3">
          <span className="h-px w-8 bg-red-500/60" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-red-600 dark:text-red-400">
            Component showcase
          </span>
        </motion.div>

        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-12">
          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.06}
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-[42px] sm:text-[54px] font-semibold leading-[1.06] tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            See it.{" "}
            <span className="italic text-red-600 dark:text-red-400">Use it.</span>{" "}
            Own it.
          </motion.h2>
          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.12}
            className="text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed lg:pb-1 max-w-sm"
          >
            Every component is interactive, accessible, and fully typed. Preview live, copy the code, drop it in.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.16}
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Component categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-200 border",
                activeCategory === cat.id
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-white/[0.07] hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-white/12"
              )}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Main split panel */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.22}
          className={cn(
            "rounded-2xl border overflow-hidden",
            "border-zinc-200 dark:border-white/[0.07]",
            "bg-white dark:bg-zinc-900",
            "shadow-sm"
          )}
        >
          {/* Panel header bar */}
          <div className={cn(
            "flex items-center justify-between px-5 py-3 border-b",
            "border-zinc-100 dark:border-white/5",
            "bg-zinc-50/80 dark:bg-white/2"
          )}>
            <div className="flex items-center gap-2">
              {CATEGORIES.find(c => c.id === activeCategory)?.icon}
              <span className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
                {CATEGORIES.find(c => c.id === activeCategory)?.label}
              </span>
              <span className="hidden sm:inline text-[12px] text-zinc-400 dark:text-zinc-600">
                — {CATEGORIES.find(c => c.id === activeCategory)?.description}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/6">
                <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">tsx</span>
              </div>
            </div>
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-110">
            {/* Left: Live preview */}
            <div className={cn(
              "flex flex-col",
              "border-b lg:border-b-0 lg:border-r",
              "border-zinc-100 dark:border-white/5"
            )}>
              {/* Preview header */}
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-zinc-100 dark:border-white/4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]" />
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Live preview</span>
              </div>

              {/* Preview area */}
              <div className="flex-1 flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    {PREVIEWS[activeCategory]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Code panel */}
            <div className="flex flex-col min-h-75 lg:min-h-0">
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-zinc-100 dark:border-white/4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.6)]" />
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Code</span>
              </div>
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="h-full"
                  >
                    <CodePanel code={CATEGORY_CODE[activeCategory]} isDark={isDark} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.32}
          className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 rounded-xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-zinc-900"
        >
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">120+ components</span> across 12 categories, all open source.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[12.5px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <SiGithub size={14} strokeWidth={2} />
              View on GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[12.5px] font-medium hover:bg-zinc-700 dark:hover:bg-white transition-colors"
            >
              Browse all →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

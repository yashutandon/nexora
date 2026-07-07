"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useStore } from "zustand";
import { Moon, Sun, Monitor, Check, ChevronDown, Copy, Search, RotateCcw, Download, Undo2, Redo2 } from "lucide-react";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { themes } from "@/registry/themes";
import { SANS_FONTS, SERIF_FONTS, MONO_FONTS, FontOption } from "@/registry/fonts";
import { hexToRgba } from "@/lib/color";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeExportDialog } from "@/components/builder/ThemeExportDialog";

const COLOR_GROUPS = [
  { title: "PRIMARY", items: [{ key: "--primary", label: "Background" }, { key: "--primary-foreground", label: "Foreground" }] },
  { title: "SECONDARY", items: [{ key: "--secondary", label: "Background" }, { key: "--secondary-foreground", label: "Foreground" }] },
  { title: "ACCENT", items: [{ key: "--accent", label: "Background" }, { key: "--accent-foreground", label: "Foreground" }] },
  { title: "BASE", items: [{ key: "--background", label: "Background" }, { key: "--foreground", label: "Foreground" }] },
  { title: "CARD", items: [{ key: "--card", label: "Background" }, { key: "--card-foreground", label: "Foreground" }] },
  { title: "POPOVER", items: [{ key: "--popover", label: "Background" }, { key: "--popover-foreground", label: "Foreground" }] },
  { title: "MUTED", items: [{ key: "--muted", label: "Background" }, { key: "--muted-foreground", label: "Foreground" }] },
  { title: "DESTRUCTIVE", items: [{ key: "--destructive", label: "Background" }, { key: "--destructive-foreground", label: "Foreground" }] },
  { title: "BORDER & INPUT", items: [{ key: "--border", label: "Border" }, { key: "--input", label: "Input" }, { key: "--ring", label: "Ring" }] },
];

type Tab = "Colors" | "Typography" | "Other";
const TABS: Tab[] = ["Colors", "Typography", "Other"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 py-3 border-b border-border last:border-b-0">
      <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{title}</p>
      {children}
    </div>
  );
}

function RangeRow({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground font-mono">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 accent-primary cursor-pointer"
      />
    </div>
  );
}

function FontSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: FontOption[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 rounded-md border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ThemeCustomizer() {
  const { setTheme: setMode, resolvedTheme } = useTheme();
  const {
    theme,
    radius,
    shadow,
    typography,
    customVariables,
    setTheme,
    setRadius,
    setShadow,
    setTypography,
    setCustomVariable,
    resetCustomVariables,
    resetAll,
  } = useThemeConfig();

  const { undo, redo, pastStates, futureStates } = useStore(useThemeConfig.temporal, (state) => state);

  const [mounted, setMounted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<Tab>("Colors");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Keyboard shortcuts for Undo/Redo
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (pastStates.length > 0) undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) {
        e.preventDefault();
        if (futureStates.length > 0) redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, pastStates.length, futureStates.length]);

  if (!mounted) return null;

  const mode = resolvedTheme === "dark" ? "dark" : "light";
  const activeTheme = themes.find((t) => t.name === theme) ?? themes[0];



  const filteredGroups = COLOR_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <aside className="w-full h-full border-r border-border bg-card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border flex items-center justify-between bg-muted/40 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2 justify-start gap-2 text-sm font-medium max-w-[160px]">
              <div className="flex gap-0.5 shrink-0">
                {["--primary", "--secondary", "--accent"].map((k) => (
                  <span
                    key={k}
                    className="w-2.5 h-2.5 rounded-sm border border-black/10"
                    style={{ backgroundColor: customVariables?.[mode]?.[k] || activeTheme?.cssVars?.[mode]?.[k] || "#000" }}
                  />
                ))}
              </div>
              <span className="truncate">{activeTheme?.label || "Default"}</span>
              <ChevronDown className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52 max-h-80 overflow-y-auto">
            {themes.map((t) => (
              <DropdownMenuItem key={t.name} onClick={() => setTheme(t.name)} className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {["--primary", "--secondary", "--accent"].map((k) => (
                    <span
                      key={k}
                      className="w-2.5 h-2.5 rounded-sm border border-black/10"
                      style={{ backgroundColor: t.cssVars[mode]?.[k] }}
                    />
                  ))}
                </div>
                <span className="flex-1 truncate">{t.label}</span>
                {t.name === theme && <Check className="w-3.5 h-3.5 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            title={mode === "dark" ? "Light mode" : "Dark mode"}
          >
            {mode === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </Button>
          
          <div className="w-px h-4 bg-border mx-0.5" />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => undo()}
            disabled={pastStates.length === 0}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => redo()}
            disabled={futureStates.length === 0}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </Button>

          <div className="w-px h-4 bg-border mx-0.5" />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground mr-1"
            onClick={resetAll}
            title="Reset everything to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
          <ThemeExportDialog />
        </div>
      </div>

      {/* Tabs — all 3 are now real */}
      <div className="flex items-center gap-1 px-3 border-b border-border bg-muted/40 shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs font-medium py-2.5 px-1 border-b-2 transition-colors ${
              activeTab === tab
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Colors tab */}
      {activeTab === "Colors" && (
        <>
          <div className="px-3 py-2.5 border-b border-border shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 rounded-md bg-background border border-border text-xs focus:outline-none focus:ring-1 focus:ring-ring transition-shadow placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-6">
            <Accordion type="multiple" defaultValue={["PRIMARY", "BASE"]} className="w-full">
              {filteredGroups.map((group) => (
                <AccordionItem value={group.title} key={group.title} className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline text-[10px] font-semibold tracking-widest text-muted-foreground uppercase hover:text-foreground transition-colors [&[data-state=open]>svg]:rotate-180">
                    {group.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-0.5 flex flex-col gap-1.5">
                    {group.items.map((item) => {
                      const themeVal = activeTheme?.cssVars?.[mode]?.[item.key] || "";
                      const val = customVariables?.[mode]?.[item.key] || themeVal;
                      const isHex = val.startsWith("#");

                      return (
                        <div
                          key={item.key}
                          className="flex items-center gap-2 h-9 w-full rounded-md border border-border bg-background px-1.5"
                        >
                          <div className="relative w-7 h-7 rounded-sm overflow-hidden border border-border shrink-0 cursor-pointer">
                            <input
                              type="color"
                              value={isHex ? val : "#000000"}
                              onInput={(e) => setCustomVariable(mode, item.key, (e.target as HTMLInputElement).value)}
                              className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer opacity-0"
                            />
                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: val || "transparent" }} />
                          </div>

                          <span className="flex-1 text-xs font-medium text-foreground truncate">{item.label}</span>

                          <input
                            type="text"
                            value={val}
                            onChange={(e) => setCustomVariable(mode, item.key, e.target.value)}
                            className="w-[84px] bg-transparent text-xs text-muted-foreground text-right focus:outline-none focus:text-foreground uppercase font-mono"
                          />
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <button
              onClick={resetCustomVariables}
              className="mt-3 text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Clear custom colors (keep theme)
            </button>
          </div>
        </>
      )}

      {/* Typography tab */}
      {activeTab === "Typography" && (
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <Section title="Font Family">
            <FontSelect label="Sans" value={typography.fontSans} options={SANS_FONTS} onChange={(v) => setTypography({ fontSans: v })} />
            <FontSelect label="Serif" value={typography.fontSerif} options={SERIF_FONTS} onChange={(v) => setTypography({ fontSerif: v })} />
            <FontSelect label="Mono" value={typography.fontMono} options={MONO_FONTS} onChange={(v) => setTypography({ fontMono: v })} />
          </Section>

          <Section title="Spacing">
            <RangeRow
              label="Letter spacing"
              value={typography.letterSpacing}
              min={-0.05}
              max={0.05}
              step={0.005}
              unit="em"
              onChange={(v) => setTypography({ letterSpacing: v })}
            />
          </Section>

          <Section title="Preview">
            <div
              className="rounded-md border border-border p-3 bg-background"
              style={{ fontFamily: typography.fontSans, letterSpacing: `${typography.letterSpacing}em` }}
            >
              <p className="text-lg font-semibold text-foreground" style={{ fontFamily: typography.fontSerif }}>
                Aa Bb Cc — Heading
              </p>
              <p className="text-sm text-muted-foreground mt-1">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-xs mt-1.5 text-foreground" style={{ fontFamily: typography.fontMono }}>
                const theme = &quot;nexora&quot;;
              </p>
            </div>
          </Section>
        </div>
      )}

      {/* Other tab — radius + shadow */}
      {activeTab === "Other" && (
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <Section title="Radius">
            <RangeRow label="Corner radius" value={radius} min={0} max={1.5} step={0.05} unit="rem" onChange={setRadius} />
            <div className="flex gap-2 pt-1">
              {[0, 0.3, 0.5, 0.75, 1].map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={`flex-1 h-10 border bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center ${
                    radius === r ? "border-primary" : "border-border"
                  }`}
                  style={{ borderRadius: `${r}rem` }}
                  title={`${r}rem`}
                >
                  <span className="w-4 h-4 bg-primary" style={{ borderRadius: `${r}rem` }} />
                </button>
              ))}
            </div>
          </Section>

          <Section title="Shadow">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-md overflow-hidden border border-border shrink-0 cursor-pointer">
                <input
                  type="color"
                  value={shadow.color}
                  onChange={(e) => setShadow({ color: e.target.value })}
                  className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer opacity-0"
                />
                <div className="w-full h-full pointer-events-none" style={{ backgroundColor: shadow.color }} />
              </div>
              <input
                type="text"
                value={shadow.color}
                onChange={(e) => setShadow({ color: e.target.value })}
                className="flex-1 h-8 rounded-md border border-border bg-background px-2 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <RangeRow label="Opacity" value={shadow.opacity} min={0} max={1} step={0.05} onChange={(v) => setShadow({ opacity: v })} />
            <RangeRow label="Blur" value={shadow.blur} min={0} max={40} step={1} unit="px" onChange={(v) => setShadow({ blur: v })} />
            <RangeRow label="Spread" value={shadow.spread} min={-10} max={10} step={1} unit="px" onChange={(v) => setShadow({ spread: v })} />
            <RangeRow label="Offset X" value={shadow.offsetX} min={-20} max={20} step={1} unit="px" onChange={(v) => setShadow({ offsetX: v })} />
            <RangeRow label="Offset Y" value={shadow.offsetY} min={-20} max={20} step={1} unit="px" onChange={(v) => setShadow({ offsetY: v })} />
          </Section>

          <Section title="Preview">
            <div className="flex items-center justify-center py-6 bg-muted/30 rounded-md">
              <div
                className="w-24 h-16 bg-card border border-border"
                style={{
                  borderRadius: `${radius}rem`,
                  boxShadow: `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(shadow.color, shadow.opacity)}`,
                }}
              />
            </div>
          </Section>
        </div>
      )}
    </aside>
  );
}
"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, LayoutTemplate, Search, X } from "lucide-react";

import { previewRegistry } from "@/components/explorer/preview-registry";
import { DefaultPreview } from "@/components/preview/DefaultPreview";
import { PreviewContainer } from "@/components/ui1/PreviewContainer";
import { PreviewToolbar } from "@/components/builder/PreviewToolbar";
import { ResponsiveFrame } from "@/components/builder/ResponsiveFrame";
import { components as componentConfigs } from "@/config/components";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/hooks/use-builder-store";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PreviewItem {
  readonly id: string;
  readonly name: string;
  readonly category: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  generic: "Generic",
  animated: "Animated",
  saas: "SaaS",
  fintech: "Fintech",
  blocks: "Blocks",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Converts a kebab-case id to a Title Case name as a fallback. */
function idToName(id: string): string {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface PickerItemProps {
  item: PreviewItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const PickerItem = memo(function PickerItem({
  item,
  isSelected,
  onSelect,
}: PickerItemProps) {
  return (
    <button
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(item.id)}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors text-left",
        isSelected
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground hover:bg-muted"
      )}
    >
      <span className="truncate">{item.name}</span>
      {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-2" aria-hidden />}
    </button>
  );
});
PickerItem.displayName = "PickerItem";

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * PreviewSwitcher — Theme Editor right panel.
 *
 * Renders a sticky toolbar with a component picker and category filters,
 * then renders the selected preview component inside the shared
 * PreviewContainer (dot-grid + vignette) so theme CSS vars are always applied.
 *
 * Reads from:
 *  - previewRegistry (the live component map)
 *  - componentConfigs (names, categories from config/components.ts)
 *
 * Writes to: nothing external — all state is local UI state.
 */
export const PreviewSwitcher = memo(function PreviewSwitcher() {
  const { selectedComponentId: selectedId, setSelectedComponentId: setSelectedId } = useBuilderStore();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  /** Ref on the trigger <button> — used to calculate fixed dropdown position. */
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  /** Viewport-relative coords for the portaled dropdown. */
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);

  // ── Build item list once — registry keys + config metadata ──────────────
  const allItems = useMemo<PreviewItem[]>(() => {
    const configMap = new Map(componentConfigs.map((c) => [c.id, c]));
    return Object.keys(previewRegistry).map((id) => {
      const config = configMap.get(id);
      return {
        id,
        name: config?.name ?? idToName(id),
        category: config?.category ?? "blocks",
      };
    });
  }, []);

  // ── Sorted unique categories ─────────────────────────────────────────────
  const categories = useMemo<string[]>(() => {
    const order = ["all", "generic", "animated", "saas", "fintech", "blocks"];
    const present = new Set(allItems.map((i) => i.category));
    return order.filter((c) => c === "all" || present.has(c));
  }, [allItems]);

  // ── Filtered + grouped items for the picker list ──────────────────────────
  const groupedItems = useMemo<Map<string, PreviewItem[]>>(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = allItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = !q || item.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    const groups = new Map<string, PreviewItem[]>();
    for (const item of filtered) {
      if (!groups.has(item.category)) groups.set(item.category, []);
      groups.get(item.category)!.push(item);
    }
    return groups;
  }, [allItems, searchQuery, activeCategory]);

  const selectedItem = useMemo(
    () => allItems.find((i) => i.id === selectedId),
    [allItems, selectedId]
  );

  // ── Handlers ─────────────────────────────────────────────────────────────

  const openPicker = useCallback(() => {
    // Capture the trigger's viewport position before opening so the dropdown
    // can be positioned with `position: fixed` via a portal.
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 6, left: rect.left });
    }
    setIsPickerOpen(true);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }, []);

  const closePicker = useCallback(() => {
    setIsPickerOpen(false);
    setSearchQuery("");
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
      closePicker();
    },
    [closePicker]
  );

  const handleCategoryPillClick = useCallback(
    (cat: string) => {
      setActiveCategory(cat);
      openPicker();
    },
    [openPicker]
  );


  // ── Close on Escape ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPickerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePicker();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isPickerOpen, closePicker]);

  const ActivePreview = previewRegistry[selectedId];
  const totalCount = allItems.length;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">

      {/* ── Sticky toolbar ─────────────────────────────────────────────────── */}
      <div className="shrink-0 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-2.5 flex-wrap">

          {/* Component picker trigger — z-[9999] keeps it above the backdrop */}
          <div className="relative z-[9999]">
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={isPickerOpen}
              aria-haspopup="listbox"
              onClick={isPickerOpen ? closePicker : openPicker}
              className={cn(
                "flex items-center gap-2 h-8 px-3 rounded-lg border text-sm font-medium transition-all duration-150",
                "bg-background border-border text-foreground",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isPickerOpen && "border-primary/50 ring-1 ring-primary/20 bg-muted"
              )}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden />
              <span className="max-w-[150px] truncate">
                {selectedItem?.name ?? "Select preview"}
              </span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-200",
                  isPickerOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
          </div>

          {/* ── Portaled backdrop + dropdown ─────────────────────────────── */}
          {isPickerOpen && dropdownPos && createPortal(
            <>
              {/*
                Transparent full-viewport backdrop.
                z-9998 = above canvas, below dropdown (z-9999).
                Clicking it calls closePicker via onClick — no pointerdown
                race conditions, no ref timing issues.
              */}
              <div
                aria-hidden
                className="fixed inset-0 z-[9998]"
                onClick={closePicker}
              />

              {/* Dropdown panel — z-9999 sits above the backdrop */}
              <div
                role="dialog"
                aria-label="Choose a preview component"
                style={{ top: dropdownPos.top, left: dropdownPos.left }}
                className={cn(
                  "fixed z-[9999] w-[320px] rounded-xl",
                  "border border-border bg-popover shadow-xl shadow-black/[0.12]",
                  "flex flex-col overflow-hidden",
                  "animate-in fade-in-0 zoom-in-95 duration-150"
                )}
              >
                {/* Search row */}
                <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
                  <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search previews…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    aria-label="Search preview components"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden />
                    </button>
                  )}
                </div>

                {/* Category filter chips */}
                <div className="flex gap-1 px-2 py-1.5 border-b border-border overflow-x-auto no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "shrink-0 px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors",
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {CATEGORY_LABELS[cat] ?? cat}
                    </button>
                  ))}
                </div>

                {/* Items */}
                <div
                  className="max-h-72 overflow-y-auto overscroll-contain"
                  role="listbox"
                  aria-label="Preview components"
                >
                  {groupedItems.size === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      No previews found
                    </div>
                  ) : (
                    Array.from(groupedItems.entries()).map(([category, items]) => (
                      <div key={category}>
                        {activeCategory === "all" && (
                          <div
                            className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground sticky top-0 bg-popover/95 backdrop-blur-sm"
                            aria-hidden
                          >
                            {CATEGORY_LABELS[category] ?? category}
                          </div>
                        )}
                        {items.map((item) => (
                          <PickerItem
                            key={item.id}
                            item={item}
                            isSelected={item.id === selectedId}
                            onSelect={handleSelect}
                          />
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>,
            document.body
          )}

          {/* Category quick-filter pills */}
          <div
            className="flex items-center gap-1 overflow-x-auto no-scrollbar"
            role="toolbar"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryPillClick(cat)}
                className={cn(
                  "shrink-0 h-7 px-2.5 rounded-full text-xs font-medium transition-colors border",
                  isPickerOpen && activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-muted-foreground hover:text-foreground border-border bg-background hover:bg-muted"
                )}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>

          {/* Counter — right-aligned */}
          <span className="ml-auto text-xs text-muted-foreground tabular-nums shrink-0">
            {totalCount} previews
          </span>
        </div>
      </div>

      {/* ── Viewport toolbar ───────────────────────────────────────────────── */}
      <PreviewToolbar />

      {/* ── Preview area — ResponsiveFrame handles device/zoom layout ────── */}
      <ResponsiveFrame>
        <PreviewContainer>
          {ActivePreview ? (
            <ActivePreview />
          ) : (
            <DefaultPreview componentName={selectedItem?.name ?? selectedId} />
          )}
        </PreviewContainer>
      </ResponsiveFrame>
    </div>
  );
});

PreviewSwitcher.displayName = "PreviewSwitcher";

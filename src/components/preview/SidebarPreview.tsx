"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  BarChart2,
  Settings,
  Bell,
  Search,
  Users,
  TrendingUp,
  ShoppingCart,
  Home,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

// ---------- Types ----------

export interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  href?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  positive: boolean;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  read?: boolean;
}

export interface CurrentUser {
  name: string;
  email: string;
}

export interface SidebarPreviewProps {
  brandName?: string;
  brandInitial?: string;
  navItems?: NavItem[];
  stats?: StatItem[];
  activity?: ActivityItem[];
  user?: CurrentUser;
  defaultActiveNavId?: string;
  onNavChange?: (item: NavItem) => void;
  onExport?: () => void;
  onUpgrade?: () => void;
  onUserMenuOpen?: () => void;
}

// ---------- Defaults (used only if the consumer doesn't pass real data) ----------

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "analytics", icon: BarChart2, label: "Analytics" },
  { id: "users", icon: Users, label: "Users" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const DEFAULT_STATS: StatItem[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    icon: TrendingUp,
    positive: true,
  },
  {
    id: "active-users",
    label: "Active Users",
    value: "2,350",
    change: "+15.3%",
    icon: Users,
    positive: true,
  },
  {
    id: "new-orders",
    label: "New Orders",
    value: "1,247",
    change: "+8.7%",
    icon: ShoppingCart,
    positive: true,
  },
];

const DEFAULT_ACTIVITY: ActivityItem[] = [
  { id: "act-1", user: "Alice", action: "purchased Pro plan", time: "2m ago", read: false },
  { id: "act-2", user: "Bob", action: "invited to workspace", time: "14m ago", read: false },
  { id: "act-3", user: "Deploy #142", action: "succeeded", time: "1h ago", read: true },
  { id: "act-4", user: "Ticket #88", action: "needs attention", time: "3h ago", read: false },
];

const DEFAULT_USER: CurrentUser = {
  name: "Nexora User",
  email: "user@nexora.dev",
};

export function SidebarPreview({
  brandName = "Nexora",
  brandInitial,
  navItems = DEFAULT_NAV_ITEMS,
  stats = DEFAULT_STATS,
  activity = DEFAULT_ACTIVITY,
  user = DEFAULT_USER,
  defaultActiveNavId,
  onNavChange,
  onExport,
  onUpgrade,
  onUserMenuOpen,
}: SidebarPreviewProps) {
  const [activeNavId, setActiveNavId] = useState<string>(
    defaultActiveNavId ?? navItems[0]?.id ?? ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = useMemo(
    () => activity.filter((item) => !item.read).length,
    [activity]
  );

  const filteredActivity = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activity;
    return activity.filter(
      (item) =>
        item.user.toLowerCase().includes(q) ||
        item.action.toLowerCase().includes(q)
    );
  }, [activity, searchQuery]);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setNotifOpen(false);
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleNavClick(item: NavItem) {
    setActiveNavId(item.id);
    onNavChange?.(item);
  }

  function handleUserMenuToggle() {
    setUserMenuOpen((prev) => {
      const next = !prev;
      if (next) onUserMenuOpen?.();
      return next;
    });
  }

  const initials =
    brandInitial ?? (brandName.trim().charAt(0).toUpperCase() || "N");
  const userInitial = user.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="h-[540px] w-full rounded-lg border border-border bg-background overflow-hidden flex text-sm shadow-sm">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-border bg-card flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center gap-2 px-4 border-b border-border shrink-0">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-primary-foreground">
              {initials}
            </span>
          </div>
          <span className="font-semibold text-sm text-foreground truncate">
            {brandName}
          </span>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 p-2 space-y-0.5 overflow-y-auto"
          aria-label="Main navigation"
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-1 pb-2">
            Main
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeNavId;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-colors text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-2 border-t border-border shrink-0 relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={handleUserMenuToggle}
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-medium text-foreground truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
            <ChevronRight
              className={`w-3 h-3 text-muted-foreground shrink-0 transition-transform ${
                userMenuOpen ? "rotate-90" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {userMenuOpen && (
            <div
              role="menu"
              className="absolute bottom-full left-2 right-2 mb-1 rounded-md border border-border bg-popover shadow-md overflow-hidden z-10"
            >
              <button
                type="button"
                role="menuitem"
                className="w-full text-left px-3 py-2 text-xs text-popover-foreground hover:bg-accent transition-colors"
              >
                Profile settings
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full text-left px-3 py-2 text-xs text-popover-foreground hover:bg-accent transition-colors border-t border-border"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <div className="h-14 border-b border-border flex items-center px-4 gap-3 bg-card shrink-0">
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              className="h-8 pl-8 text-xs bg-background"
              placeholder="Search activity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search recent activity"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative" ref={notifRef}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative text-muted-foreground"
                onClick={() => setNotifOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={notifOpen}
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
                )}
              </Button>

              {notifOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-1 w-64 rounded-md border border-border bg-popover shadow-md overflow-hidden z-10"
                >
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-xs font-semibold text-popover-foreground">
                      Notifications
                    </p>
                  </div>
                  {activity.length === 0 ? (
                    <p className="px-3 py-4 text-xs text-muted-foreground text-center">
                      You&apos;re all caught up.
                    </p>
                  ) : (
                    activity.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="px-3 py-2 border-t border-border first:border-t-0 flex items-start justify-between gap-2"
                      >
                        <span className="text-xs text-popover-foreground">
                          <span className="font-medium">{item.user}</span>{" "}
                          {item.action}
                        </span>
                        {!item.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <Button size="sm" className="h-8 text-xs px-3" onClick={onUpgrade}>
              Upgrade
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-4 space-y-3 bg-background">
          {/* Page heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Dashboard
              </h2>
              <p className="text-xs text-muted-foreground">
                Welcome back, {user.name}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={onExport}
            >
              Export
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.id} className="shadow-none border-border">
                  <CardHeader className="flex flex-row items-center justify-between p-3 pb-1 space-y-0">
                    <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </CardTitle>
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <div className="text-lg font-bold text-foreground">
                      {stat.value}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] mt-0.5 font-normal px-1.5 py-0 ${
                        stat.positive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Activity */}
          <Card className="shadow-none border-border">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-xs font-semibold text-foreground">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredActivity.length === 0 ? (
                <p className="px-3 py-4 text-xs text-muted-foreground text-center">
                  No activity matches &quot;{searchQuery}&quot;.
                </p>
              ) : (
                filteredActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2 border-t border-border first:border-t-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold text-muted-foreground">
                          {item.user[0]}
                        </span>
                      </div>
                      <span className="text-xs text-foreground truncate">
                        <span className="font-medium">{item.user}</span>{" "}
                        {item.action}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                      {item.time}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
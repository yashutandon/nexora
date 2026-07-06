export interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
}

export const navConfig: NavItem[] = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];

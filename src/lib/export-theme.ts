import { ThemeConfig } from "@/registry/themes";
import { hexToRgba } from "@/lib/color";

export interface ExportState {
  radius: number;
  shadow: {
    color: string;
    opacity: number;
    blur: number;
    spread: number;
    offsetX: number;
    offsetY: number;
  };
  typography: {
    fontSans: string;
    fontSerif: string;
    fontMono: string;
    letterSpacing: number;
  };
  customVariables: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

/**
 * Helper to build shared variables that are the same in both light and dark mode.
 */
function getSharedVars(state: ExportState): string[] {
  const { radius, shadow, typography } = state;
  const shadowValue = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(shadow.color, shadow.opacity)}`;

  return [
    `--radius: ${radius}rem;`,
    `--font-sans: ${typography.fontSans};`,
    `--font-serif: ${typography.fontSerif};`,
    `--font-mono: ${typography.fontMono};`,
    `--tracking-normal: ${typography.letterSpacing}em;`,
    `--shadow-color: ${shadow.color};`,
    `--shadow-opacity: ${shadow.opacity};`,
    `--shadow-blur: ${shadow.blur}px;`,
    `--shadow-spread: ${shadow.spread}px;`,
    `--shadow-offset-x: ${shadow.offsetX}px;`,
    `--shadow-offset-y: ${shadow.offsetY}px;`,
    `--shadow: ${shadowValue};`,
  ];
}

/**
 * Export Format 1: Standard shadcn globals.css
 */
export function exportToCSS(activeTheme: ThemeConfig, state: ExportState): string {
  const lightVars = { ...activeTheme.cssVars.light, ...state.customVariables.light };
  const darkVars = { ...activeTheme.cssVars.dark, ...state.customVariables.dark };
  const sharedVars = getSharedVars(state);

  return `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer base {
  :root {
    ${Object.entries(lightVars).map(([k, v]) => `${k}: ${v};`).join("\n    ")}
    ${sharedVars.join("\n    ")}
  }

  .dark {
    ${Object.entries(darkVars).map(([k, v]) => `${k}: ${v};`).join("\n    ")}
  }
}`;
}

/**
 * Export Format 2: Tailwind v4 @theme inline block
 * Maps the raw CSS variables into Tailwind utility classes.
 */
export function exportToTailwindV4(activeTheme: ThemeConfig, state: ExportState): string {
  // We can include the raw CSS and the @theme block together
  const rawCSS = exportToCSS(activeTheme, state);
  
  const themeBlock = `
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-heading: var(--font-serif);
  
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
}`;

  return `${rawCSS}\n${themeBlock}`;
}

/**
 * Export Format 3: Design Tokens (JSON)
 */
export function exportToJSON(activeTheme: ThemeConfig, state: ExportState): string {
  const lightVars = { ...activeTheme.cssVars.light, ...state.customVariables.light };
  const darkVars = { ...activeTheme.cssVars.dark, ...state.customVariables.dark };
  
  const { radius, shadow, typography } = state;
  const shadowValue = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(shadow.color, shadow.opacity)}`;

  const tokens = {
    theme: activeTheme.name,
    colors: {
      light: lightVars,
      dark: darkVars,
    },
    radii: {
      default: `${radius}rem`,
      sm: `calc(${radius}rem * 0.6)`,
      md: `calc(${radius}rem * 0.8)`,
      lg: `${radius}rem`,
    },
    shadows: {
      default: shadowValue,
    },
    typography: {
      fonts: {
        sans: typography.fontSans,
        serif: typography.fontSerif,
        mono: typography.fontMono,
      },
      letterSpacing: `${typography.letterSpacing}em`,
    }
  };

  return JSON.stringify(tokens, null, 2);
}

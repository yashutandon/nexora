"use client";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { themes } from "@/registry/themes";
import { SANS_FONTS, SERIF_FONTS, MONO_FONTS, buildGoogleFontsUrl, FontOption } from "@/registry/fonts";
import { hexToRgba } from "@/lib/color";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

function findFont(fonts: FontOption[], value: string): FontOption | undefined {
  return fonts.find((f) => f.value === value);
}

export function ThemeInjector() {
  const state = useThemeConfig();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Only load the 3 fonts actually selected — never the whole font picker.
  const fontsToLoad = useMemo(() => {
    const sans = findFont(SANS_FONTS, state.typography.fontSans);
    const serif = findFont(SERIF_FONTS, state.typography.fontSerif);
    const mono = findFont(MONO_FONTS, state.typography.fontMono);
    return [sans, serif, mono].filter(Boolean) as FontOption[];
  }, [state.typography.fontSans, state.typography.fontSerif, state.typography.fontMono]);

  useEffect(() => {
    if (!mounted) return;
    const url = buildGoogleFontsUrl(fontsToLoad);
    if (!url) return;

    const id = "nexora-google-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (link.href !== url) link.href = url;
  }, [mounted, fontsToLoad]);

  if (!mounted) return null;

  const activeTheme = themes.find((t) => t.name === state.theme) || themes[0];
  const mode = resolvedTheme === "dark" ? "dark" : "light";

  const colorVars = {
    ...activeTheme?.cssVars?.[mode],
    ...(state.customVariables?.[mode] || {}),
  };

  const { shadow, typography, radius } = state;
  const shadowValue = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(
    shadow.color,
    shadow.opacity
  )}`;

  const vars: Record<string, string> = {
    ...colorVars,
    "--radius": `${radius}rem`,
    "--font-sans": typography.fontSans,
    "--font-serif": typography.fontSerif,
    "--font-mono": typography.fontMono,
    "--tracking-normal": `${typography.letterSpacing}em`,
    "--shadow-color": shadow.color,
    "--shadow-opacity": `${shadow.opacity}`,
    "--shadow-blur": `${shadow.blur}px`,
    "--shadow-spread": `${shadow.spread}px`,
    "--shadow-offset-x": `${shadow.offsetX}px`,
    "--shadow-offset-y": `${shadow.offsetY}px`,
    "--shadow": shadowValue,
  };

  const cssVarString = Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

  return (
    <style id="nexora-theme-injector" suppressHydrationWarning>
      {`:root { ${cssVarString} } body { font-family: var(--font-sans); letter-spacing: var(--tracking-normal); }`}
    </style>
  );
}
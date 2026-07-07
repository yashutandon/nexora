export type FontOption = {
  label: string;
  value: string; // CSS font-family stack used directly in the DOM
  googleFont?: string; // Google Fonts family query param, omit for system fonts
};

export const SANS_FONTS: FontOption[] = [
  { label: "Inter", value: "Inter, sans-serif", googleFont: "Inter:wght@400;500;600;700" },
  { label: "Geist", value: "Geist, sans-serif", googleFont: "Geist:wght@400;500;600;700" },
  { label: "System UI", value: "ui-sans-serif, system-ui, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif", googleFont: "Roboto:wght@400;500;700" },
  { label: "Poppins", value: "Poppins, sans-serif", googleFont: "Poppins:wght@400;500;600;700" },
  { label: "Manrope", value: "Manrope, sans-serif", googleFont: "Manrope:wght@400;500;600;700" },
];

export const SERIF_FONTS: FontOption[] = [
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Merriweather", value: "Merriweather, serif", googleFont: "Merriweather:wght@400;700" },
  { label: "Playfair Display", value: "'Playfair Display', serif", googleFont: "Playfair+Display:wght@400;600;700" },
  { label: "Lora", value: "Lora, serif", googleFont: "Lora:wght@400;500;600" },
];

export const MONO_FONTS: FontOption[] = [
  { label: "Geist Mono", value: "'Geist Mono', monospace", googleFont: "Geist+Mono:wght@400;500;600" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace", googleFont: "JetBrains+Mono:wght@400;500;600" },
  { label: "Fira Code", value: "'Fira Code', monospace", googleFont: "Fira+Code:wght@400;500;600" },
  { label: "System Mono", value: "ui-monospace, SFMono-Regular, monospace" },
];

/**
 * Builds a single Google Fonts stylesheet URL for only the fonts
 * currently in use — we never bulk-import every option in the picker.
 */
export function buildGoogleFontsUrl(fonts: FontOption[]): string {
  const families = fonts
    .filter((f): f is FontOption & { googleFont: string } => Boolean(f.googleFont))
    .map((f) => `family=${f.googleFont}`)
    .join("&");
  return families ? `https://fonts.googleapis.com/css2?${families}&display=swap` : "";
}
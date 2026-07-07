"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { themes } from "@/registry/themes";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui1/CodeBlock";

import {
  exportToCSS,
  exportToTailwindV4,
  exportToJSON,
} from "@/lib/export-theme";

export function ThemeExportDialog() {
  const state = useThemeConfig();
  const [activeTab, setActiveTab] = React.useState("css");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeTheme = themes.find((t) => t.name === state.theme) || themes[0];

  const cssCode = exportToCSS(activeTheme, state);
  const tailwindCode = exportToTailwindV4(activeTheme, state);
  const jsonCode = exportToJSON(activeTheme, state);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="h-8 text-xs font-medium gap-1.5 px-3 bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-border bg-muted/30">
          <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
            Export Theme
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Copy the generated code to use your customized theme in a real project.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[60vh] min-h-[400px]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <div className="px-6 py-2 border-b border-border bg-background">
              <TabsList className="h-9">
                <TabsTrigger value="css" className="text-xs">globals.css</TabsTrigger>
                <TabsTrigger value="tailwind" className="text-xs">Tailwind v4</TabsTrigger>
                <TabsTrigger value="json" className="text-xs">Design Tokens (JSON)</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="css" className="flex-1 p-6 overflow-hidden mt-0 data-[state=inactive]:hidden outline-none">
              <div className="h-full overflow-hidden rounded-xl">
                <CodeBlock code={cssCode} language="css" className="h-full border-none rounded-none" />
              </div>
            </TabsContent>

            <TabsContent value="tailwind" className="flex-1 p-6 overflow-hidden mt-0 data-[state=inactive]:hidden outline-none">
              <div className="h-full overflow-hidden rounded-xl">
                <CodeBlock code={tailwindCode} language="css" className="h-full border-none rounded-none" />
              </div>
            </TabsContent>

            <TabsContent value="json" className="flex-1 p-6 overflow-hidden mt-0 data-[state=inactive]:hidden outline-none">
              <div className="h-full overflow-hidden rounded-xl">
                <CodeBlock code={jsonCode} language="json" className="h-full border-none rounded-none" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

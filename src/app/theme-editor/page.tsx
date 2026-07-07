import { ThemeCustomizer } from "@/components/theme-customizer";
import { PreviewSwitcher } from "@/components/builder/PreviewSwitcher";
import { ComponentPropsEditor } from "@/components/builder/ComponentPropsEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Editor - Nexora UI",
  description: "Customize the theme and see the preview in real-time.",
};

export default function ThemeEditorPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 flex overflow-hidden min-h-0">
        <ResizablePanelGroup 
          orientation="horizontal" 
          className="h-full"
        >
          <ResizablePanel
            defaultSize={316}
            minSize={10}
            maxSize={330}
            className="h-full min-w-0"
          >
            <ThemeCustomizer />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={74} className="h-full min-w-0">
            <PreviewSwitcher />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={210}
            minSize={10}
            maxSize={330}
            className="h-full min-w-0"
          >
            <ComponentPropsEditor />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
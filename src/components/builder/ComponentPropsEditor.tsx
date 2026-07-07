"use client"
import * as React from "react";
import { useBuilderStore } from "@/hooks/use-builder-store";
import { components } from "@/config/components";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings2 } from "lucide-react";

export function ComponentPropsEditor() {
  const { selectedComponentId, componentProps, setComponentProp } = useBuilderStore();

  const config = components.find((c) => c.id === selectedComponentId);
  const controls = config?.controls;

  if (!controls || Object.keys(controls).length === 0) {
    return (
      <div className="flex flex-col h-full bg-background border-l border-border">
        <div className="p-4 border-b border-border flex items-center gap-2 text-sm font-semibold">
          <Settings2 className="w-4 h-4" />
          Properties
        </div>
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-muted-foreground text-sm">
          <Settings2 className="w-8 h-8 mb-4 opacity-20" />
          <p>No configurable properties for<br /><strong>{config?.name || selectedComponentId}</strong></p>
        </div>
      </div>
    );
  }

  const currentProps = componentProps[selectedComponentId] || {};

  return (
    <div className="flex flex-col h-full bg-background border-l border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Settings2 className="w-4 h-4" />
          Properties
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          {config.name}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(controls).map(([key, control]) => {
          // Resolve current value, fallback to default
          const val = currentProps[key] !== undefined ? currentProps[key] : control.defaultValue;

          return (
            <div key={key} className="space-y-3">
              <Label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground flex items-center justify-between">
                {control.label || key}
                {control.type === "boolean" && (
                  <Switch
                    checked={Boolean(val)}
                    onCheckedChange={(checked) => setComponentProp(selectedComponentId, key, checked)}
                  />
                )}
              </Label>

              {control.type === "select" && control.options && (
                <Select
                  value={String(val)}
                  onValueChange={(v) => setComponentProp(selectedComponentId, key, v)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {control.options.map((opt) => (
                      <SelectItem key={opt} value={opt} className="text-xs">
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {control.type === "string" && (
                <Input
                  type="text"
                  className="h-8 text-xs"
                  value={String(val)}
                  onChange={(e) => setComponentProp(selectedComponentId, key, e.target.value)}
                />
              )}
              
              {control.type === "number" && (
                <Input
                  type="number"
                  className="h-8 text-xs"
                  value={Number(val)}
                  onChange={(e) => setComponentProp(selectedComponentId, key, Number(e.target.value))}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

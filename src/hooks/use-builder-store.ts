import { create } from "zustand";

interface BuilderState {
  selectedComponentId: string;
  componentProps: Record<string, Record<string, any>>;
  setSelectedComponentId: (id: string) => void;
  setComponentProp: (componentId: string, propKey: string, value: any) => void;
  resetComponentProps: (componentId: string) => void;
}

const DEFAULT_PREVIEW_ID = "sidebar";

export const useBuilderStore = create<BuilderState>((set) => ({
  selectedComponentId: DEFAULT_PREVIEW_ID,
  componentProps: {},
  
  setSelectedComponentId: (id: string) =>
    set({ selectedComponentId: id }),

  setComponentProp: (componentId, propKey, value) =>
    set((state) => ({
      componentProps: {
        ...state.componentProps,
        [componentId]: {
          ...(state.componentProps[componentId] || {}),
          [propKey]: value,
        },
      },
    })),

  resetComponentProps: (componentId) =>
    set((state) => {
      const newProps = { ...state.componentProps };
      delete newProps[componentId];
      return { componentProps: newProps };
    }),
}));

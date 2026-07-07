export type Category = "generic" | "animated" | "saas" | "fintech" | "blocks"

export type ControlType = "select" | "boolean" | "string" | "number";

export interface ComponentControl {
  type: ControlType;
  options?: string[]; // Used for 'select'
  defaultValue?: string | boolean | number;
  label?: string;
}

export interface ComponentConfig {
  id: string
  name: string
  category: Category
  description: string
  code?: string
  isPremium?: boolean
  controls?: Record<string, ComponentControl>;
  // NOTE: no `preview` here — components are not serializable across RSC boundary
}

export interface SidebarCategory {
  id: Category
  label: string
  components: ComponentConfig[]
}
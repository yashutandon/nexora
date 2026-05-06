export type Category = "generic" | "animated" | "saas" | "fintech"

export interface ComponentConfig {
  id: string
  name: string
  category: Category
  description: string
  code: string
  // NOTE: no `preview` here — components are not serializable across RSC boundary
}

export interface SidebarCategory {
  id: Category
  label: string
  components: ComponentConfig[]
}
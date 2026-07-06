import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarPreview() {
  return (
    <div className="h-[400px] w-full border rounded-lg overflow-hidden flex relative">
      <Sidebar className="absolute h-full border-r bg-zinc-50 dark:bg-zinc-900/50 hidden md:flex w-64 flex-col gap-4 py-4 px-3">
        <SidebarHeader className="font-semibold px-2">
          Dashboard
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full text-left font-medium">Home</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full text-left">Analytics</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full text-left">Settings</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="text-sm text-zinc-500 px-2">
          v1.0.0
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-6 md:ml-64">
        <h2 className="text-xl font-bold">Main Content</h2>
        <p className="text-zinc-500 mt-2">The sidebar is on the left.</p>
      </div>
    </div>
  )
}

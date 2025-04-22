import { Calendar, Home, SquareChartGantt, Settings,Users } from "lucide-react"
import { Badge } from "../ui/badge"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Add Partner",
    url: "/dashboard/partner",
    icon: Users,
  },
  {
    title: "Add Invoice",
    url: "/dashboard/invoice",
    icon: Calendar,
  },
  {
    title: "Add Stock",
    url: "/dashboard/stock",
    icon: SquareChartGantt,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel><Badge className="font-[family-name:var(--font-outfit)] font-semibold text-xl bg-green-500">ABS Stock Management</Badge></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="mt-4" size={25}/>
                      <span className="text-lg font-[family-name:var(--font-outfit)] mt-4">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

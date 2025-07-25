import { LayoutDashboard, Heart, Calendar, FileText, Settings, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: 'dashboard' | 'swipe' | 'interviews' | 'summary') => void;
}

const items = [
  { 
    title: "Dashboard", 
    url: "dashboard", 
    icon: LayoutDashboard 
  },
  { 
    title: "Swipe", 
    url: "swipe", 
    icon: Heart 
  },
  { 
    title: "Interviews", 
    url: "interviews", 
    icon: Calendar 
  },
  { 
    title: "Summary", 
    url: "summary", 
    icon: FileText 
  },
];

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold">Lovable</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.url as any)}
                    className={`${
                      activeView === item.url 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    } transition-colors`}
                  >
                    <item.icon className="w-5 h-5" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-muted transition-colors">
                <Settings className="w-5 h-5" />
                {!collapsed && <span>Settings</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
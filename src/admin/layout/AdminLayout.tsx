import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard, Image, Type, ShoppingBag, Layers, ExternalLink } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";

export function AdminLayout() {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-sidebar">
                <Sidebar className="border-r border-sidebar-border">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Content Management</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/admin">
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/admin/collections">
                                                <Layers className="w-4 h-4" />
                                                <span>Collections</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/admin/products">
                                                <ShoppingBag className="w-4 h-4" />
                                                <span>Products</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel>Site Configuration</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/admin/hero">
                                                <Image className="w-4 h-4" />
                                                <span>Hero Section</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/admin/philosophy">
                                                <Type className="w-4 h-4" />
                                                <span>Philosophy</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup className="mt-auto">
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/" target="_blank">
                                                <ExternalLink className="w-4 h-4" />
                                                <span>View Site</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 overflow-auto bg-background flex flex-col min-h-screen">
                    <AdminHeader />
                    <div className="p-8 flex-1">
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}

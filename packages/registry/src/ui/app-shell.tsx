"use client";

import * as React from "react";
import { Menu, X, ChevronLeft, ChevronRight, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  brand: {
    name: string;
    logo: React.ReactNode;
  };
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onNavItemClick?: (item: NavItem) => void;
}

export function AppShell({
  children,
  navItems,
  brand,
  user,
  onNavItemClick,
}: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* 1. Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-card/50 backdrop-blur-md transition-all duration-300 ease-in-out relative z-20",
          isSidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center px-4 border-b border-border gap-3">
          <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 text-primary">
            {brand.logo}
          </div>
          {!isSidebarCollapsed && (
            <span className="font-bold text-lg tracking-tight truncate animate-in fade-in duration-200">
              {brand.name}
            </span>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavItemClick?.(item)}
                className={cn(
                  "flex items-center w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                  item.active
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isSidebarCollapsed ? "mx-auto" : "mr-3")} />
                {!isSidebarCollapsed && (
                  <span className="truncate animate-in fade-in duration-200">{item.title}</span>
                )}
                {isSidebarCollapsed && (
                  <div className="absolute left-16 bg-popover text-popover-foreground border border-border shadow-md rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30">
                    {item.title}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Collapse Trigger button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -right-3 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors shadow-sm z-30"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </aside>

      {/* 2. Mobile Drawer Navigation Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 w-64 bg-card border-r border-border z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 text-primary">
              {brand.logo}
            </div>
            <span className="font-bold text-lg tracking-tight truncate">
              {brand.name}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleMobile}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  onNavItemClick?.(item);
                  setIsMobileOpen(false);
                }}
                className={cn(
                  "flex items-center w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  item.active
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Topbar Header */}
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/60 backdrop-blur-md px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobile}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:flex items-center relative max-w-xs w-60">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-full rounded-xl border border-border/60 bg-muted/30 pl-9 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-muted/50 rounded-xl">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9 border border-border shadow-sm">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">
                        {user.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl overflow-hidden mt-1 shadow-md" align="end">
                  <DropdownMenuLabel className="font-normal px-3 py-2.5">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer px-3 py-2">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer px-3 py-2">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer px-3 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}

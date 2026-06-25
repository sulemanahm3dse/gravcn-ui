"use client";

import * as React from "react";
import { Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THEMES = [
  { name: "Neutral", class: "theme-neutral", color: "bg-zinc-500" },
  { name: "Amber", class: "theme-amber", color: "bg-amber-500" },
  { name: "Blue", class: "theme-blue", color: "bg-blue-500" },
  { name: "Cyan", class: "theme-cyan", color: "bg-cyan-500" },
  { name: "Emerald", class: "theme-emerald", color: "bg-emerald-500" },
  { name: "Fuchsia", class: "theme-fuchsia", color: "bg-fuchsia-500" },
  { name: "Green", class: "theme-green", color: "bg-green-500" },
  { name: "Indigo", class: "theme-indigo", color: "bg-indigo-500" },
  { name: "Lime", class: "theme-lime", color: "bg-lime-500" },
  { name: "Orange", class: "theme-orange", color: "bg-orange-500" },
  { name: "Pink", class: "theme-pink", color: "bg-pink-500" },
];

export function ThemeSelector() {
  const [activeTheme, setActiveTheme] = React.useState("Neutral");

  React.useEffect(() => {
    const saved = localStorage.getItem("ui-library-theme") || "theme-neutral";
    const found = THEMES.find((t) => t.class === saved) || THEMES[0];
    setActiveTheme(found.name);
    
    const root = document.documentElement;
    THEMES.forEach((t) => root.classList.remove(t.class));
    if (found.class !== "theme-neutral") {
      root.classList.add(found.class);
    }
  }, []);

  const selectTheme = (theme: typeof THEMES[0]) => {
    setActiveTheme(theme.name);
    localStorage.setItem("ui-library-theme", theme.class);
    const root = document.documentElement;
    THEMES.forEach((t) => root.classList.remove(t.class));
    if (theme.class !== "theme-neutral") {
      root.classList.add(theme.class);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg hover:bg-muted/80">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Customize Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] rounded-xl p-1 shadow-md border border-border bg-popover text-popover-foreground">
        {THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => selectTheme(theme)}
            className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <div className={`h-3 w-3 rounded-full ${theme.color}`} />
            <span className={activeTheme === theme.name ? "font-semibold text-primary" : ""}>
              {theme.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface RegistryComponent {
  name: string;
  type: "registry:ui";
  dependencies: string[];
  registryDependencies: string[];
  files: string[];
}

export const registryComponents: RegistryComponent[] = [
  {
    name: "data-table",
    type: "registry:ui",
    dependencies: ["@tanstack/react-table", "lucide-react"],
    registryDependencies: ["table", "dropdown-menu", "button", "input"],
    files: ["ui/data-table.tsx"],
  },
  {
    name: "multi-select",
    type: "registry:ui",
    dependencies: ["lucide-react", "@radix-ui/react-popover", "class-variance-authority"],
    registryDependencies: ["badge", "command", "popover", "button"],
    files: ["ui/multi-select.tsx"],
  },
  {
    name: "app-shell",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "avatar", "dropdown-menu"],
    files: ["ui/app-shell.tsx"],
  },
];

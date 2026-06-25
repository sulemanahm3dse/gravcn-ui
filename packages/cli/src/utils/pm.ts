import fs from "fs-extra";
import path from "path";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export async function detectPackageManager(cwd: string = process.cwd()): Promise<PackageManager> {
  if (await fs.pathExists(path.resolve(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (await fs.pathExists(path.resolve(cwd, "yarn.lock"))) {
    return "yarn";
  }
  if (await fs.pathExists(path.resolve(cwd, "bun.lockb")) || await fs.pathExists(path.resolve(cwd, "bun.lock"))) {
    return "bun";
  }
  return "npm";
}

export function getInstallCommand(pm: PackageManager, dependencies: string[], isDev = false): string {
  if (dependencies.length === 0) return "";

  const depStr = dependencies.join(" ");

  switch (pm) {
    case "pnpm":
      return `pnpm add ${isDev ? "-D " : ""}${depStr}`;
    case "yarn":
      return `yarn add ${isDev ? "-D " : ""}${depStr}`;
    case "bun":
      return `bun add ${isDev ? "-d " : ""}${depStr}`;
    case "npm":
    default:
      return `npm install ${isDev ? "--save-dev " : ""}${depStr}`;
  }
}

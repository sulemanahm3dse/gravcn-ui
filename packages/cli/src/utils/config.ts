import fs from "fs-extra";
import path from "path";

export interface Config {
  tsx: boolean;
  aliases: {
    components: string;
    utils: string;
    ui?: string;
  };
}

export const CONFIG_FILE = "components.json";

export async function getConfig(cwd: string = process.cwd()): Promise<Config | null> {
  const configPath = path.resolve(cwd, CONFIG_FILE);

  if (!await fs.pathExists(configPath)) {
    return null;
  }

  try {
    const rawConfig = await fs.readJson(configPath);
    return rawConfig as Config;
  } catch (error) {
    return null;
  }
}

export async function writeConfig(config: Config, cwd: string = process.cwd()): Promise<void> {
  const configPath = path.resolve(cwd, CONFIG_FILE);
  await fs.writeJson(configPath, config, { spaces: 2 });
}

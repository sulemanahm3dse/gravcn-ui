import path from "path";
import fs from "fs-extra";
import { registryComponents } from "../src/registry.js";

const REGISTRY_DIST = path.resolve(process.cwd(), "../../apps/www/public/registry");

async function build() {
  await fs.ensureDir(REGISTRY_DIST);

  const index = [];

  for (const component of registryComponents) {
    const files = [];

    for (const filePath of component.files) {
      const sourcePath = path.resolve(process.cwd(), "src", filePath);
      const content = await fs.readFile(sourcePath, "utf8");

      const baseName = path.basename(filePath, path.extname(filePath));
      const registryPath = `components/${baseName}/${path.basename(filePath)}`;

      files.push({
        path: registryPath,
        content,
        type: component.type,
      });
    }

    const registryItem = {
      name: component.name,
      dependencies: component.dependencies,
      registryDependencies: component.registryDependencies,
      files,
    };

    await fs.writeJson(path.join(REGISTRY_DIST, `${component.name}.json`), registryItem, { spaces: 2 });

    index.push({
      name: component.name,
      dependencies: component.dependencies,
      registryDependencies: component.registryDependencies,
    });
  }

  await fs.writeJson(path.join(REGISTRY_DIST, "index.json"), index, { spaces: 2 });
  console.log("✓ Registry compiled successfully to apps/www/public/registry");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});

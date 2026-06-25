export function transformImports(content: string, config: { aliases: { components: string; utils: string; ui?: string } }): string {
  let transformed = content;

  // 1. Replace registry imports: '@/registry/default/ui/button' -> user's ui alias
  const uiAlias = config.aliases.ui || `${config.aliases.components}/ui`;
  transformed = transformed.replace(/["']@\/registry\/[^/]+\/ui\/([^"']+)["']/g, `"${uiAlias}/$1"`);

  // 2. Replace utils imports: '@/lib/utils' -> user's utils alias
  const utilsAlias = config.aliases.utils;
  transformed = transformed.replace(/["']@\/lib\/utils["']/g, `"${utilsAlias}"`);

  // 3. Replace UI components imports: '@/components/ui/button' -> user's ui alias
  transformed = transformed.replace(/["']@\/components\/ui\/([^"']+)["']/g, `"${uiAlias}/$1"`);

  // 3. Replace other general components imports: '@/components/xxx' -> user's components alias
  const componentsAlias = config.aliases.components;
  transformed = transformed.replace(/["']@\/components\/([^"']+)["']/g, (match, path) => {
    if (path.startsWith("ui/")) {
      return match; // Already transformed above
    }
    return `"${componentsAlias}/${path}"`;
  });

  return transformed;
}

import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from './ComponentPreview';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Package, Wrench } from 'lucide-react';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    h2: (props: any) => {
      const H2 = defaultMdxComponents.h2 as any;
      if (!H2) return <h2 {...props} />;
      
      const id = props.id || '';
      let Icon = null;
      
      if (id === 'installation') Icon = Package;
      else if (id === 'usage-example') Icon = Wrench;

      if (Icon) {
        return (
          <H2 {...props}>
            <span className="flex items-center gap-2">
              <Icon className="h-6 w-6" />
              {props.children}
            </span>
          </H2>
        );
      }
      return <H2 {...props} />;
    },
    Tab,
    Tabs,
    ComponentPreview,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

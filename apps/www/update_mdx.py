import os
import re

components_dir = "content/docs/components"

def to_pascal_case(kebab_str):
    return ''.join(word.capitalize() for word in kebab_str.split('-'))

def process_file(filepath, filename):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Replace CodeBlockTabs with Tabs
    # Original:
    # <CodeBlockTabs defaultValue="npm" groupId="package-manager">
    #   <CodeBlockTabsList>
    #     <CodeBlockTabsTrigger value="npm">npm</CodeBlockTabsTrigger>
    #     ...
    #   </CodeBlockTabsList>
    #   <CodeBlockTab value="npm">
    #     ```bash
    #     npx @gravcn/cli add {component}
    #     ```
    #   </CodeBlockTab>
    #   ...
    # </CodeBlockTabs>

    # Replacement:
    # <Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
    #   <Tab value="npm">
    #     ```bash
    #     ...
    #     ```
    #   </Tab>
    #   ...
    # </Tabs>

    # First, remove CodeBlockTabsList entirely
    content = re.sub(r'<CodeBlockTabsList>[\s\S]*?</CodeBlockTabsList>\s*', '', content)
    
    # Replace opening <CodeBlockTabs ...> with <Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
    content = re.sub(r'<CodeBlockTabs[^>]*>', r"<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>", content)
    
    # Replace closing </CodeBlockTabs>
    content = content.replace('</CodeBlockTabs>', '</Tabs>')
    
    # Replace CodeBlockTab
    content = content.replace('<CodeBlockTab', '<Tab')
    content = content.replace('</CodeBlockTab>', '</Tab>')

    # 2. Add title="demo/ComponentName.tsx" to Usage Example code block
    # We find "## 🛠️ Usage Example\n\n```tsx" and change it to "## 🛠️ Usage Example\n\n```tsx title="demo/ComponentName.tsx""
    
    component_name = to_pascal_case(filename.replace('.mdx', ''))
    title_str = f'title="demo/{component_name}.tsx"'
    
    # Match ```tsx exactly without a title
    # Note: Some files might already have it, or might use ```tsx
    
    usage_pattern = r'(## 🛠️ Usage Example[\s\S]*?```tsx)(?!\s*title)'
    content = re.sub(usage_pattern, r'\1 ' + title_str, content)
    
    # Just in case some have different emoji or no emoji
    alt_usage_pattern = r'(## Usage Example[\s\S]*?```tsx)(?!\s*title)'
    content = re.sub(alt_usage_pattern, r'\1 ' + title_str, content)

    with open(filepath, 'w') as f:
        f.write(content)

for filename in os.listdir(components_dir):
    if filename.endswith(".mdx"):
        process_file(os.path.join(components_dir, filename), filename)

# Also process index.mdx
index_path = "content/docs/index.mdx"
if os.path.exists(index_path):
    process_file(index_path, "index.mdx")

print("Updated all MDX files")

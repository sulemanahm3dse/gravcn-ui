import os
import re

components_dir = "content/docs/components"

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Remove the emojis from headings
    content = content.replace("## 📦 Installation", "## Installation")
    content = content.replace("## 🛠️ Usage Example", "## Usage Example")

    with open(filepath, 'w') as f:
        f.write(content)

for filename in os.listdir(components_dir):
    if filename.endswith(".mdx"):
        process_file(os.path.join(components_dir, filename))

index_path = "content/docs/index.mdx"
if os.path.exists(index_path):
    process_file(index_path)

print("Removed emojis from MDX files")

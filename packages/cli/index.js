#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Basic ANSI colors for terminal output
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

// Change this to your live domain once deployed (e.g., https://nexora.com)
const BASE_URL = 'http://localhost:3000'; 

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const componentId = args[1];

  if (!command) {
    console.log(`\n${colors.bold}${colors.cyan}◆ Nexora UI CLI${colors.reset}\n`);
    console.log(`Usage: npx nexora-ui <command> [options]\n`);
    console.log(`Commands:`);
    console.log(`  init              Initialize your project and install dependencies`);
    console.log(`  add <component>   Add a component to your project`);
    console.log(`\nExamples:`);
    console.log(`  npx nexora-ui init`);
    console.log(`  npx nexora-ui add button\n`);
    process.exit(0);
  }

  if (command === 'init') {
    console.log(`\n${colors.cyan}Initializing Nexora UI...${colors.reset}`);
    
    // Create components.json
    const componentsJson = {
      $schema: "https://nexora.com/schema.json",
      style: "default",
      rsc: true,
      tailwind: {
        config: "tailwind.config.ts",
        css: "app/globals.css",
        baseColor: "zinc",
        cssVariables: true
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils"
      }
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'components.json'), 
      JSON.stringify(componentsJson, null, 2), 
      'utf8'
    );
    console.log(`${colors.green}✔ Created components.json${colors.reset}`);

    // Create lib/utils.ts
    const libDir = path.join(process.cwd(), 'lib');
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }

    const utilsTs = `import { type ClassValue, clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n`;
    fs.writeFileSync(path.join(libDir, 'utils.ts'), utilsTs, 'utf8');
    console.log(`${colors.green}✔ Created lib/utils.ts${colors.reset}`);

    console.log(`\n${colors.bold}Next steps:${colors.reset}`);
    console.log(`1. Install dependencies: ${colors.cyan}npm install clsx tailwind-merge lucide-react${colors.reset}`);
    console.log(`2. Add a component:      ${colors.cyan}npx nexora-ui add button${colors.reset}\n`);
    process.exit(0);
  }

  if (command !== 'add') {
    console.log(`${colors.red}Error: Unknown command '${command}'${colors.reset}`);
    process.exit(1);
  }

  if (!componentId) {
    console.log(`${colors.red}Error: Please specify a component to add.${colors.reset}`);
    console.log(`${colors.dim}Example: npx nexora-ui add button${colors.reset}`);
    process.exit(1);
  }

  console.log(`\n${colors.cyan}Fetching ${componentId} from Nexora UI...${colors.reset}`);

  try {
    const res = await fetch(`${BASE_URL}/api/components/${componentId}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        console.log(`${colors.red}✖ Component '${componentId}' not found.${colors.reset}`);
      } else {
        console.log(`${colors.red}✖ Failed to fetch component (HTTP ${res.status}).${colors.reset}`);
      }
      process.exit(1);
    }

    const componentData = await res.json();
    const componentCode = componentData.code;

    // Create components/ui directory if it doesn't exist
    const targetDir = path.join(process.cwd(), 'components', 'ui');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, `${componentId}.tsx`);
    
    // Check if file already exists
    if (fs.existsSync(targetFile)) {
      console.log(`${colors.yellow}⚠ Warning: components/ui/${componentId}.tsx already exists. Overwriting...${colors.reset}`);
    }

    // Write the component code
    fs.writeFileSync(targetFile, componentCode, 'utf8');

    console.log(`${colors.green}✔ Successfully added ${componentId} to components/ui/${componentId}.tsx${colors.reset}\n`);
    
  } catch (error) {
    console.log(`${colors.red}✖ Error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

main();

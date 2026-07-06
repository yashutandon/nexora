import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const UI_DIR = path.join(__dirname, '../src/components/ui')
const OUTPUT_FILE = path.join(__dirname, '../public/registry.json')

async function buildRegistry() {
  console.log('Building component registry...')
  
  if (!fs.existsSync(UI_DIR)) {
    console.error(`Error: UI directory not found at ${UI_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(UI_DIR).filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
  
  const registry = {}

  for (const file of files) {
    const componentId = file.replace('.tsx', '').replace('.ts', '')
    const filePath = path.join(UI_DIR, file)
    const code = fs.readFileSync(filePath, 'utf8')
    
    registry[componentId] = {
      id: componentId,
      code: code,
      // For a real production app, you would parse the code to extract exact dependencies.
      // Here we provide a safe default.
      dependencies: ["lucide-react", "clsx", "tailwind-merge", "class-variance-authority"]
    }
  }

  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2), 'utf8')
  
  console.log(`✅ Registry built successfully! Indexed ${Object.keys(registry).length} components.`)
  console.log(`Output: ${OUTPUT_FILE}`)
}

buildRegistry()

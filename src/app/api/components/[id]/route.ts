import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    const filePath = path.join(process.cwd(), "src", "components", "ui", `${id}.tsx`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Component ${id} not found.` },
        { status: 404 }
      )
    }

    const code = fs.readFileSync(filePath, "utf8")

    return NextResponse.json({
      id: id,
      name: id,
      category: "ui",
      dependencies: ["lucide-react", "clsx", "tailwind-merge", "class-variance-authority"],
      code: code,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch component code." },
      { status: 500 }
    )
  }
}

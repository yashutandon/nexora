import { notFound } from "next/navigation"
import { components } from "@/config/components"
import { ComponentView } from "@/components/explorer/ComponentView"

export function generateStaticParams() {
  return components.map((comp) => ({
    slug: comp.id,
  }))
}

export default async function ComponentDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = components.find((c) => c.id === slug)

  if (!component) {
    notFound()
  }

  return <ComponentView component={component} />
}

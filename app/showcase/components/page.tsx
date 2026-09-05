import Link from "next/link"
import { COMPONENT_ITEMS } from "@/lib/showcase-nav"

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-muted-foreground">
          Liste de tous les composants shadcn/ui installés dans ce design
          system. Cliquez sur un nom pour voir ses variants et ses états.
        </p>
      </header>

      <div>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          All Components
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4">
          {COMPONENT_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

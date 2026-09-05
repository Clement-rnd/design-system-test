"use client"

import Link from "next/link"
import { COMPONENT_ITEMS } from "@/lib/showcase-nav"
import { useLanguage } from "@/lib/language-provider"

const STRINGS = {
  fr: {
    intro:
      "Liste de tous les composants shadcn/ui installés dans ce design system. Cliquez sur un nom pour voir ses variants et ses états.",
    all: "Tous les composants",
  },
  en: {
    intro:
      "List of every shadcn/ui component installed in this design system. Click a name to see its variants and states.",
    all: "All Components",
  },
}

export default function ComponentsIndexPage() {
  const { lang } = useLanguage()
  const s = STRINGS[lang]

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-muted-foreground">{s.intro}</p>
      </header>

      <div>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          {s.all}
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

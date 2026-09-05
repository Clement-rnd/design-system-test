"use client"

import Link from "next/link"
import { FOUNDATION_ITEMS } from "@/lib/showcase-nav"
import { useLanguage } from "@/lib/language-provider"

const STRINGS = {
  fr: {
    intro:
      "Liste des fondations de ce design system : couleurs, typographie, spacing, radius et shadows. Cliquez sur un nom pour voir le détail des tokens.",
    all: "Toutes les fondations",
  },
  en: {
    intro:
      "List of this design system's foundations: colors, typography, spacing, radius and shadows. Click a name to see the token details.",
    all: "All Foundations",
  },
}

export default function FoundationsIndexPage() {
  const { lang } = useLanguage()
  const s = STRINGS[lang]

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Foundations</h1>
        <p className="text-muted-foreground">{s.intro}</p>
      </header>

      <div>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          {s.all}
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4">
          {FOUNDATION_ITEMS.map((item) => (
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

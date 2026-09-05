"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { Sun03Icon, Moon02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/lib/language-provider"

export function FloatingBar() {
  const { resolvedTheme, setTheme } = useTheme()
  const { lang, setLang } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-popover p-1 text-popover-foreground shadow-lg">
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <HugeiconsIcon icon={isDark ? Sun03Icon : Moon02Icon} size={16} />
        </Button>

        <Separator orientation="vertical" className="h-5" />

        <div className="flex items-center gap-0.5 px-0.5">
          {(["fr", "en"] as const).map((l) => (
            <Button
              key={l}
              variant={lang === l ? "secondary" : "ghost"}
              size="sm"
              className="h-7 rounded-full px-2.5 text-xs uppercase"
              onClick={() => setLang(l)}
            >
              {l}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

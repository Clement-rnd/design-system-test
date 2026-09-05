"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { COMPONENT_ITEMS, FOUNDATION_ITEMS } from "@/lib/showcase-nav"

const NAV_GROUPS = [
  {
    label: "Foundations",
    overviewHref: "/showcase/tokens",
    items: FOUNDATION_ITEMS,
  },
  {
    label: "Components",
    overviewHref: "/showcase/components",
    items: COMPONENT_ITEMS,
  },
]

export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <nav className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-1 overflow-y-auto border-r border-sidebar-border bg-sidebar p-4 text-sm text-sidebar-foreground md:flex">
        {NAV_GROUPS.map((group) => {
          const groupActive = pathname === group.overviewHref
          return (
            <div key={group.label} className="mb-1">
              <Link
                href={group.overviewHref}
                className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold tracking-wide uppercase hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                  groupActive
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground/70"
                }`}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} aria-hidden />
                {group.label}
              </Link>
              <div className="ml-2 flex flex-col gap-0.5 pl-3">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-2 py-1 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="min-w-0 flex-1 px-8 py-10">{children}</div>
    </div>
  )
}

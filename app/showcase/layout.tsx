"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

type NavItem = { label: string; href: string }
type NavGroup = { label: string; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Foundations",
    items: [
      { label: "Colors", href: "/showcase/tokens#colors" },
      { label: "Border radius", href: "/showcase/tokens#radius" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Button", href: "/showcase#button" },
      { label: "Card", href: "/showcase#card" },
      { label: "Input", href: "/showcase#input" },
      { label: "Label", href: "/showcase#label" },
      { label: "Select", href: "/showcase#select" },
      { label: "Switch", href: "/showcase#switch" },
      { label: "Dialog", href: "/showcase#dialog" },
      { label: "Dropdown Menu", href: "/showcase#dropdown-menu" },
      { label: "Tabs", href: "/showcase#tabs" },
      { label: "Badge", href: "/showcase#badge" },
      { label: "Tooltip", href: "/showcase#tooltip" },
      { label: "Separator", href: "/showcase#separator" },
      { label: "Checkbox", href: "/showcase#checkbox" },
      { label: "Radio Group", href: "/showcase#radio-group" },
      { label: "Textarea", href: "/showcase#textarea" },
      { label: "Table", href: "/showcase#table" },
    ],
  },
]

export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <nav className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-1 overflow-y-auto border-r border-sidebar-border bg-sidebar p-4 text-sm text-sidebar-foreground md:flex">
        {NAV_GROUPS.map((group) => {
          const groupPath = group.items[0]?.href.split("#")[0]
          const groupActive = pathname === groupPath
          return (
            <div key={group.label} className="mb-1">
              <p
                className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold tracking-wide uppercase ${
                  groupActive
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground/70"
                }`}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} aria-hidden />
                {group.label}
              </p>
              <div className="ml-2 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
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

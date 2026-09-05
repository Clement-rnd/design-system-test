"use client"

import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-provider"

const STRINGS = {
  fr: {
    intro_pre: "Aperçu des 3 niveaux de tokens définis dans",
    intro_post:
      ": primitives brutes, mapping sémantique (light/dark), et échelle de radius.",
    colorsTitle: "Primitives · couleurs",
    colorsDesc:
      "Palettes brutes du niveau 1. Non utilisées directement dans les composants · uniquement par les tokens sémantiques ci-dessous.",
    brandLabel:
      "brand-* (provisoire = copie du gris neutre, en attente d'une couleur de marque)",
    redLabel: "red-* (destructive)",
    blueLabel: "blue-* (info · couleur par défaut, en attente du code de marque)",
    greenLabel: "green-* (success · couleur par défaut, en attente du code de marque)",
    amberLabel: "amber-* (warning · couleur par défaut, en attente du code de marque)",
    semLightTitle: "Sémantique · light",
    semLightDesc:
      "Tokens consommés par les composants shadcn, en thème clair. Chaque swatch référence une primitive via var(). info/success/warning : couleurs par défaut en attendant les codes de la marque.",
    usageExample: "Exemple d'usage (composant Badge)",
    semDarkTitle: "Sémantique · dark",
    semDarkDesc: "Les mêmes tokens sémantiques, recalculés en thème sombre (classe .dark).",
    chartTitle: "Chart & sidebar",
    chartDesc:
      "Tokens additionnels : couleurs de graphiques et thème de la sidebar (light à gauche, dark à droite).",
    sidebarLight: "Sidebar · light",
    sidebarDark: "Sidebar · dark",
    typographyDesc:
      "Familles, tailles et graisses de police disponibles (échelle par défaut de Tailwind CSS + Inter et Geist Mono chargées dans layout.tsx).",
    families: "Familles",
    sizes: "Tailles (text-xs → text-6xl)",
    weights: "Graisses",
    spacingDesc:
      "Échelle d'espacement par défaut de Tailwind CSS, dérivée de l'unité --spacing (0.25rem).",
    radiusDesc:
      "Échelle dérivée de --radius (0.625rem) via calc(). Modifier --radius met à jour toute l'échelle.",
    shadowsDesc: "Échelle d'ombres par défaut de Tailwind CSS.",
  },
  en: {
    intro_pre: "Overview of the 3 token levels defined in",
    intro_post:
      ": raw primitives, semantic mapping (light/dark), and the radius scale.",
    colorsTitle: "Primitives · colors",
    colorsDesc:
      "Raw level-1 palettes. Not used directly in components · only consumed by the semantic tokens below.",
    brandLabel:
      "brand-* (temporary = copy of the neutral gray, until a brand color is chosen)",
    redLabel: "red-* (destructive)",
    blueLabel: "blue-* (info · default color, pending the brand's final code)",
    greenLabel: "green-* (success · default color, pending the brand's final code)",
    amberLabel: "amber-* (warning · default color, pending the brand's final code)",
    semLightTitle: "Semantic · light",
    semLightDesc:
      "Tokens consumed by the shadcn components, in light theme. Each swatch references a primitive via var(). info/success/warning: default colors until the brand's codes are provided.",
    usageExample: "Usage example (Badge component)",
    semDarkTitle: "Semantic · dark",
    semDarkDesc: "The same semantic tokens, recomputed for the dark theme (.dark class).",
    chartTitle: "Chart & sidebar",
    chartDesc:
      "Additional tokens: chart colors and the sidebar theme (light on the left, dark on the right).",
    sidebarLight: "Sidebar · light",
    sidebarDark: "Sidebar · dark",
    typographyDesc:
      "Font families, sizes and weights available (Tailwind CSS default scale + Inter and Geist Mono loaded in layout.tsx).",
    families: "Families",
    sizes: "Sizes (text-xs → text-6xl)",
    weights: "Weights",
    spacingDesc:
      "Tailwind CSS default spacing scale, derived from the --spacing unit (0.25rem).",
    radiusDesc:
      "Scale derived from --radius (0.625rem) via calc(). Changing --radius updates the whole scale.",
    shadowsDesc: "Tailwind CSS default shadow scale.",
  },
}

const GRAY_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const BRAND_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const RED_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const BLUE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const GREEN_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const AMBER_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const RADIUS_STEPS = [
  { name: "sm", var: "--radius-sm" },
  { name: "md", var: "--radius-md" },
  { name: "lg (base)", var: "--radius-lg" },
  { name: "xl", var: "--radius-xl" },
  { name: "2xl", var: "--radius-2xl" },
  { name: "3xl", var: "--radius-3xl" },
  { name: "4xl", var: "--radius-4xl" },
]

const SEMANTIC_TOKENS = [
  { name: "background", pair: "foreground" },
  { name: "card", pair: "card-foreground" },
  { name: "popover", pair: "popover-foreground" },
  { name: "primary", pair: "primary-foreground" },
  { name: "secondary", pair: "secondary-foreground" },
  { name: "muted", pair: "muted-foreground" },
  { name: "accent", pair: "accent-foreground" },
  { name: "destructive", pair: null },
  { name: "info", pair: "info-foreground" },
  { name: "success", pair: "success-foreground" },
  { name: "warning", pair: "warning-foreground" },
  { name: "border", pair: null },
  { name: "input", pair: null },
  { name: "ring", pair: null },
]

const STATUS_BADGES = [
  { label: "Info", className: "bg-info text-info-foreground" },
  { label: "Success", className: "bg-success text-success-foreground" },
  { label: "Warning", className: "bg-warning text-warning-foreground" },
]

const FONT_FAMILIES = [
  { name: "font-sans", var: "--font-sans", sample: "Inter · texte courant" },
  { name: "font-mono", var: "--font-geist-mono", sample: "Geist Mono · code, valeurs" },
  { name: "font-heading", var: "--font-heading", sample: "Titres (= font-sans)" },
]

const FONT_SIZES = [
  { name: "text-xs", var: "--text-xs" },
  { name: "text-sm", var: "--text-sm" },
  { name: "text-base", var: "--text-base" },
  { name: "text-lg", var: "--text-lg" },
  { name: "text-xl", var: "--text-xl" },
  { name: "text-2xl", var: "--text-2xl" },
  { name: "text-3xl", var: "--text-3xl" },
  { name: "text-4xl", var: "--text-4xl" },
  { name: "text-5xl", var: "--text-5xl" },
  { name: "text-6xl", var: "--text-6xl" },
]

const FONT_WEIGHTS = [
  { name: "font-normal", value: 400 },
  { name: "font-medium", value: 500 },
  { name: "font-semibold", value: 600 },
  { name: "font-bold", value: 700 },
]

const SPACING_STEPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32]

const SHADOW_STEPS = [
  "shadow-2xs",
  "shadow-xs",
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-2xl",
]

const CHART_TOKENS = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]

const SIDEBAR_TOKENS = [
  { name: "sidebar", pair: "sidebar-foreground" },
  { name: "sidebar-primary", pair: "sidebar-primary-foreground" },
  { name: "sidebar-accent", pair: "sidebar-accent-foreground" },
  { name: "sidebar-border", pair: null },
  { name: "sidebar-ring", pair: null },
]

function Section({
  title,
  description,
  id,
  children,
}: {
  title: string
  description?: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <section
      className="scroll-mt-20 space-y-4"
      id={id ?? title.toLowerCase().replace(/\s+/g, "-")}
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
      <Separator />
    </section>
  )
}

function ColorScale({
  label,
  prefix,
  steps,
}: {
  label: string
  prefix: string
  steps: number[]
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-3">
        {steps.map((step) => (
          <div key={step} className="w-20 shrink-0 space-y-1.5">
            <div
              className="h-14 w-full rounded-lg border border-border"
              style={{ backgroundColor: `var(--${prefix}-${step})` }}
            />
            <p className="text-center text-[11px] whitespace-nowrap text-muted-foreground">
              {prefix}-{step}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SemanticSwatch({
  name,
  pair,
}: {
  name: string
  pair: string | null
}) {
  return (
    <div className="space-y-1.5">
      <div
        className="flex h-16 w-full items-center justify-center rounded-lg border border-border text-xs font-medium"
        style={{
          backgroundColor: `var(--${name})`,
          color: pair ? `var(--${pair})` : "var(--foreground)",
        }}
      >
        Aa
      </div>
      <p className="text-center text-[11px] text-muted-foreground">
        --{name}
        {pair ? ` / --${pair}` : ""}
      </p>
    </div>
  )
}

export default function TokensPage() {
  const { lang } = useLanguage()
  const s = STRINGS[lang]

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Design Tokens</h1>
        <p className="text-muted-foreground">
          {s.intro_pre}{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            app/globals.css
          </code>
          {s.intro_post}
        </p>
      </header>

        <Section id="colors" title={s.colorsTitle} description={s.colorsDesc}>
          <div className="space-y-8">
            <ColorScale label="gray-*" prefix="gray" steps={GRAY_STEPS} />
            <ColorScale label={s.brandLabel} prefix="brand" steps={BRAND_STEPS} />
            <ColorScale label={s.redLabel} prefix="red" steps={RED_STEPS} />
            <ColorScale label={s.blueLabel} prefix="blue" steps={BLUE_STEPS} />
            <ColorScale label={s.greenLabel} prefix="green" steps={GREEN_STEPS} />
            <ColorScale label={s.amberLabel} prefix="amber" steps={AMBER_STEPS} />
          </div>
        </Section>

        <Section title={s.semLightTitle} description={s.semLightDesc}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {SEMANTIC_TOKENS.map((t) => (
                <SemanticSwatch key={t.name} name={t.name} pair={t.pair} />
              ))}
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {s.usageExample}
              </p>
              <div className="flex flex-wrap gap-3">
                {STATUS_BADGES.map((b) => (
                  <Badge key={b.label} className={b.className}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title={s.semDarkTitle} description={s.semDarkDesc}>
          <div className="dark grid grid-cols-2 gap-4 rounded-lg bg-background p-4 sm:grid-cols-3 md:grid-cols-4">
            {SEMANTIC_TOKENS.map((t) => (
              <SemanticSwatch key={t.name} name={t.name} pair={t.pair} />
            ))}
          </div>
        </Section>

        <Section title={s.chartTitle} description={s.chartDesc}>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                chart-1 → chart-5
              </p>
              <div className="flex flex-wrap gap-3">
                {CHART_TOKENS.map((c) => (
                  <div key={c} className="w-20 shrink-0 space-y-1.5">
                    <div
                      className="h-14 w-full rounded-lg border border-border"
                      style={{ backgroundColor: `var(--${c})` }}
                    />
                    <p className="text-center text-[11px] whitespace-nowrap text-muted-foreground">
                      --{c}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  {s.sidebarLight}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {SIDEBAR_TOKENS.map((t) => (
                    <SemanticSwatch key={t.name} name={t.name} pair={t.pair} />
                  ))}
                </div>
              </div>
              <div className="dark rounded-lg bg-background p-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  {s.sidebarDark}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {SIDEBAR_TOKENS.map((t) => (
                    <SemanticSwatch key={t.name} name={t.name} pair={t.pair} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="typography" title="Typography" description={s.typographyDesc}>
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                {s.families}
              </p>
              <div className="space-y-3">
                {FONT_FAMILIES.map((f) => (
                  <div key={f.name} className="flex items-baseline gap-4">
                    <span className="w-32 shrink-0 text-xs whitespace-nowrap text-muted-foreground">
                      {f.name}
                    </span>
                    <span className="text-lg" style={{ fontFamily: `var(${f.var})` }}>
                      {f.sample}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                {s.sizes}
              </p>
              <div className="space-y-3">
                {FONT_SIZES.map((f) => (
                  <div key={f.name} className="flex items-baseline gap-4">
                    <span className="w-20 shrink-0 text-xs whitespace-nowrap text-muted-foreground">
                      {f.name}
                    </span>
                    <span style={{ fontSize: `var(${f.var})` }}>
                      Aa Design System
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                {s.weights}
              </p>
              <div className="space-y-3">
                {FONT_WEIGHTS.map((w) => (
                  <div key={w.name} className="flex items-baseline gap-4">
                    <span className="w-32 shrink-0 text-xs whitespace-nowrap text-muted-foreground">
                      {w.name} ({w.value})
                    </span>
                    <span className="text-lg" style={{ fontWeight: w.value }}>
                      Aa Design System
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="spacing" title="Spacing" description={s.spacingDesc}>
          <div className="space-y-2">
            {SPACING_STEPS.map((step) => (
              <div key={step} className="flex items-center gap-4">
                <span className="w-20 shrink-0 text-xs whitespace-nowrap text-muted-foreground">
                  spacing-{step}
                </span>
                <div
                  className="h-4 rounded bg-primary"
                  style={{ width: `calc(var(--spacing) * ${step})` }}
                />
                <span className="text-xs text-muted-foreground">
                  {step * 0.25}rem
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="radius" title="Radius" description={s.radiusDesc}>
          <div className="flex flex-wrap gap-4">
            {RADIUS_STEPS.map((r) => (
              <div key={r.name} className="w-28 shrink-0 space-y-1.5 text-center">
                <div
                  className="mx-auto h-16 w-16 border-2 border-foreground bg-muted"
                  style={{ borderRadius: `var(${r.var})` }}
                />
                <p className="text-[11px] font-medium whitespace-nowrap">{r.name}</p>
                <p className="text-[11px] whitespace-nowrap text-muted-foreground">
                  var({r.var})
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="shadows" title="Shadows" description={s.shadowsDesc}>
          <div className="flex flex-wrap gap-6">
            {SHADOW_STEPS.map((s) => (
              <div key={s} className="w-24 shrink-0 space-y-2 text-center">
                <div
                  className={`mx-auto h-16 w-16 rounded-lg bg-card ${s}`}
                />
                <p className="text-[11px] text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>
        </Section>
    </div>
  )
}

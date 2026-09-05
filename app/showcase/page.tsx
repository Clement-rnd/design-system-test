"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLanguage } from "@/lib/language-provider"

/** Classes reproduisant l'anneau de focus-visible des composants, pour en
 * simuler l'état sans exiger un focus clavier réel du visiteur. */
const SIMULATED_FOCUS =
  "border-ring ring-3 ring-ring/50 outline-none rounded-lg"

const STRINGS = {
  fr: {
    intro:
      "Aperçu de chaque composant shadcn/ui installé, avec ses variants et ses états (hover réel via CSS, disabled, focus simulé).",
    button: {
      desc: "Variants et tailles, avec états disabled et focus simulé.",
      variants: "Variants (hover actif au survol)",
      sizes: "Tailles",
      disabled: "Disabled",
      focus: "Focus (simulé)",
    },
    card: {
      desc: "Composition header / content / footer.",
      title: "Notifications",
      badge: "Nouveau",
      body: "Gérez vos préférences de notification.",
      footerNote: "Vous recevrez un résumé quotidien par email.",
      cancel: "Annuler",
      save: "Enregistrer",
    },
    input: {
      desc: "États normal, disabled et focus simulé.",
      normal: "Normal",
      disabled: "Disabled",
      focus: "Focus (simulé)",
      emailPlaceholder: "nom@exemple.fr",
      disabledPlaceholder: "Champ désactivé",
      focusPlaceholder: "Champ focus",
    },
    label: {
      desc: "Association avec un champ de formulaire.",
      email: "Adresse email",
    },
    select: {
      desc: "Menu déroulant avec groupe d'options.",
      normal: "Normal",
      disabled: "Disabled",
      choose: "Choisir un fruit",
      fruits: "Fruits",
      apple: "Pomme",
      banana: "Banane",
      grape: "Raisin",
      unavailable: "Indisponible",
    },
    switch: {
      desc: "Tailles et états checked / disabled.",
      off: "Off",
      on: "On",
      disabled: "Disabled",
      disabledChecked: "Disabled + checked",
    },
    dialog: {
      desc: "Fenêtre modale déclenchée par un bouton.",
      open: "Ouvrir le dialogue",
      title: "Confirmer l'action",
      body: "Cette action est irréversible. Voulez-vous continuer ?",
      cancel: "Annuler",
      confirm: "Confirmer",
    },
    dropdown: {
      desc: "Menu contextuel avec item destructif.",
      open: "Ouvrir le menu",
      account: "Mon compte",
      profile: "Profil",
      settings: "Paramètres",
      billing: "Facturation (disabled)",
      delete: "Supprimer le compte",
    },
    tabs: {
      desc: "Navigation par onglets, variant default et line.",
      account: "Compte",
      password: "Mot de passe",
      disabled: "Désactivé",
      accountBody: "Modifiez vos informations de compte ici.",
      passwordBody: "Modifiez votre mot de passe ici.",
      disabledBody: "Contenu indisponible.",
      tabA: "Onglet A",
      tabB: "Onglet B",
      lineBody: 'Variant "line".',
      secondTab: "Deuxième onglet.",
    },
    badge: { desc: "Variants disponibles." },
    tooltip: {
      desc: "Info-bulle affichée au survol ou au focus.",
      hover: "Survolez-moi",
      hoverBody: "Ceci est une info-bulle",
      disabled: "Disabled",
      disabledBody: "Non disponible",
    },
    separator: {
      desc: "Séparateur horizontal et vertical.",
      above: "Section au-dessus",
      below: "Section en dessous",
      left: "Gauche",
      right: "Droite",
    },
    checkbox: {
      desc: "États unchecked, checked et disabled.",
      unchecked: "Non coché",
      checked: "Coché",
      disabled: "Disabled",
      disabledChecked: "Disabled + coché",
    },
    radio: {
      desc: "Sélection unique parmi plusieurs options.",
      option1: "Option 1",
      option2: "Option 2",
      option3: "Option 3 (disabled)",
    },
    textarea: {
      desc: "États normal, disabled et focus simulé.",
      normal: "Normal",
      disabled: "Disabled",
      focus: "Focus (simulé)",
      placeholder: "Votre message...",
      disabledPlaceholder: "Champ désactivé",
      focusPlaceholder: "Champ focus",
    },
    table: {
      desc: "Tableau avec en-tête, corps et légende.",
      caption: "Liste des dernières factures.",
      invoice: "Facture",
      status: "Statut",
      method: "Méthode",
      amount: "Montant",
      paid: "Payée",
      pending: "En attente",
      failed: "Échouée",
      card: "Carte bancaire",
      transfer: "Virement",
    },
  },
  en: {
    intro:
      "Overview of every shadcn/ui component installed, with its variants and states (real hover via CSS, disabled, simulated focus).",
    button: {
      desc: "Variants and sizes, with disabled and simulated focus states.",
      variants: "Variants (hover active on rollover)",
      sizes: "Sizes",
      disabled: "Disabled",
      focus: "Focus (simulated)",
    },
    card: {
      desc: "Header / content / footer composition.",
      title: "Notifications",
      badge: "New",
      body: "Manage your notification preferences.",
      footerNote: "You'll receive a daily summary by email.",
      cancel: "Cancel",
      save: "Save",
    },
    input: {
      desc: "Normal, disabled and simulated focus states.",
      normal: "Normal",
      disabled: "Disabled",
      focus: "Focus (simulated)",
      emailPlaceholder: "name@example.com",
      disabledPlaceholder: "Disabled field",
      focusPlaceholder: "Focused field",
    },
    label: {
      desc: "Paired with a form field.",
      email: "Email address",
    },
    select: {
      desc: "Dropdown menu with an option group.",
      normal: "Normal",
      disabled: "Disabled",
      choose: "Choose a fruit",
      fruits: "Fruits",
      apple: "Apple",
      banana: "Banana",
      grape: "Grape",
      unavailable: "Unavailable",
    },
    switch: {
      desc: "Sizes and checked / disabled states.",
      off: "Off",
      on: "On",
      disabled: "Disabled",
      disabledChecked: "Disabled + checked",
    },
    dialog: {
      desc: "Modal window triggered by a button.",
      open: "Open dialog",
      title: "Confirm action",
      body: "This action cannot be undone. Do you want to continue?",
      cancel: "Cancel",
      confirm: "Confirm",
    },
    dropdown: {
      desc: "Context menu with a destructive item.",
      open: "Open menu",
      account: "My account",
      profile: "Profile",
      settings: "Settings",
      billing: "Billing (disabled)",
      delete: "Delete account",
    },
    tabs: {
      desc: "Tab navigation, default and line variants.",
      account: "Account",
      password: "Password",
      disabled: "Disabled",
      accountBody: "Edit your account information here.",
      passwordBody: "Change your password here.",
      disabledBody: "Content unavailable.",
      tabA: "Tab A",
      tabB: "Tab B",
      lineBody: '"line" variant.',
      secondTab: "Second tab.",
    },
    badge: { desc: "Available variants." },
    tooltip: {
      desc: "Tooltip shown on hover or focus.",
      hover: "Hover me",
      hoverBody: "This is a tooltip",
      disabled: "Disabled",
      disabledBody: "Not available",
    },
    separator: {
      desc: "Horizontal and vertical separator.",
      above: "Section above",
      below: "Section below",
      left: "Left",
      right: "Right",
    },
    checkbox: {
      desc: "Unchecked, checked and disabled states.",
      unchecked: "Unchecked",
      checked: "Checked",
      disabled: "Disabled",
      disabledChecked: "Disabled + checked",
    },
    radio: {
      desc: "Single selection among several options.",
      option1: "Option 1",
      option2: "Option 2",
      option3: "Option 3 (disabled)",
    },
    textarea: {
      desc: "Normal, disabled and simulated focus states.",
      normal: "Normal",
      disabled: "Disabled",
      focus: "Focus (simulated)",
      placeholder: "Your message...",
      disabledPlaceholder: "Disabled field",
      focusPlaceholder: "Focused field",
    },
    table: {
      desc: "Table with header, body and caption.",
      caption: "A list of recent invoices.",
      invoice: "Invoice",
      status: "Status",
      method: "Method",
      amount: "Amount",
      paid: "Paid",
      pending: "Pending",
      failed: "Failed",
      card: "Credit card",
      transfer: "Bank transfer",
    },
  },
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-20 space-y-4" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        {children}
      </div>
      <Separator />
    </section>
  )
}

function StateLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-xs font-medium text-muted-foreground">
      {children}
    </span>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>
}

export default function ShowcasePage() {
  const { lang } = useLanguage()
  const s = STRINGS[lang]

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Design System Showcase</h1>
        <p className="text-muted-foreground">{s.intro}</p>
      </header>

        <Section title="Button" description={s.button.desc}>
          <div className="space-y-6">
            <div>
              <StateLabel>{s.button.variants}</StateLabel>
              <Row>
                <Button variant="default">Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </Row>
            </div>
            <div>
              <StateLabel>{s.button.sizes}</StateLabel>
              <Row>
                <Button size="xs">Extra small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </Row>
            </div>
            <div>
              <StateLabel>{s.button.disabled}</StateLabel>
              <Row>
                <Button disabled>Default</Button>
                <Button variant="outline" disabled>
                  Outline
                </Button>
                <Button variant="destructive" disabled>
                  Destructive
                </Button>
              </Row>
            </div>
            <div>
              <StateLabel>{s.button.focus}</StateLabel>
              <Row>
                <Button className={SIMULATED_FOCUS}>Default</Button>
                <Button variant="outline" className={SIMULATED_FOCUS}>
                  Outline
                </Button>
              </Row>
            </div>
          </div>
        </Section>

        <Section title="Card" description={s.card.desc}>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>{s.card.title}</CardTitle>
              <CardDescription>{s.card.body}</CardDescription>
              <CardAction>
                <Badge variant="secondary">{s.card.badge}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.card.footerNote}</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm">
                {s.card.cancel}
              </Button>
              <Button size="sm">{s.card.save}</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Input" description={s.input.desc}>
          <div className="grid max-w-sm gap-4">
            <div>
              <StateLabel>{s.input.normal}</StateLabel>
              <Input placeholder={s.input.emailPlaceholder} />
            </div>
            <div>
              <StateLabel>{s.input.disabled}</StateLabel>
              <Input placeholder={s.input.disabledPlaceholder} disabled />
            </div>
            <div>
              <StateLabel>{s.input.focus}</StateLabel>
              <Input placeholder={s.input.focusPlaceholder} className={SIMULATED_FOCUS} />
            </div>
          </div>
        </Section>

        <Section title="Label" description={s.label.desc}>
          <div className="grid max-w-sm gap-1.5">
            <Label htmlFor="showcase-email">{s.label.email}</Label>
            <Input id="showcase-email" type="email" placeholder={s.input.emailPlaceholder} />
          </div>
        </Section>

        <Section title="Select" description={s.select.desc}>
          <div className="grid max-w-sm gap-4">
            <div>
              <StateLabel>{s.select.normal}</StateLabel>
              <Select defaultValue="apple">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={s.select.choose} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{s.select.fruits}</SelectLabel>
                    <SelectItem value="apple">{s.select.apple}</SelectItem>
                    <SelectItem value="banana">{s.select.banana}</SelectItem>
                    <SelectItem value="grape">{s.select.grape}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <StateLabel>{s.select.disabled}</StateLabel>
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={s.select.unavailable} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        <Section title="Switch" description={s.switch.desc}>
          <div className="space-y-4">
            <Row>
              <div className="flex items-center gap-2">
                <Switch id="switch-off" />
                <Label htmlFor="switch-off">{s.switch.off}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-on" defaultChecked />
                <Label htmlFor="switch-on">{s.switch.on}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-disabled" disabled />
                <Label htmlFor="switch-disabled">{s.switch.disabled}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-disabled-checked" disabled defaultChecked />
                <Label htmlFor="switch-disabled-checked">{s.switch.disabledChecked}</Label>
              </div>
            </Row>
          </div>
        </Section>

        <Section title="Dialog" description={s.dialog.desc}>
          <Dialog>
            <DialogTrigger render={<Button>{s.dialog.open}</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{s.dialog.title}</DialogTitle>
                <DialogDescription>{s.dialog.body}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">{s.dialog.cancel}</Button>} />
                <DialogClose render={<Button>{s.dialog.confirm}</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Dropdown Menu" description={s.dropdown.desc}>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">{s.dropdown.open}</Button>} />
            <DropdownMenuContent>
              <DropdownMenuLabel>{s.dropdown.account}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{s.dropdown.profile}</DropdownMenuItem>
              <DropdownMenuItem>{s.dropdown.settings}</DropdownMenuItem>
              <DropdownMenuItem disabled>{s.dropdown.billing}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">{s.dropdown.delete}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Tabs" description={s.tabs.desc}>
          <div className="space-y-6">
            <Tabs defaultValue="account" className="max-w-md">
              <TabsList>
                <TabsTrigger value="account">{s.tabs.account}</TabsTrigger>
                <TabsTrigger value="password">{s.tabs.password}</TabsTrigger>
                <TabsTrigger value="disabled" disabled>
                  {s.tabs.disabled}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="text-sm text-muted-foreground">
                {s.tabs.accountBody}
              </TabsContent>
              <TabsContent value="password" className="text-sm text-muted-foreground">
                {s.tabs.passwordBody}
              </TabsContent>
              <TabsContent value="disabled" className="text-sm text-muted-foreground">
                {s.tabs.disabledBody}
              </TabsContent>
            </Tabs>
            <Tabs defaultValue="a" className="max-w-md">
              <TabsList variant="line">
                <TabsTrigger value="a">{s.tabs.tabA}</TabsTrigger>
                <TabsTrigger value="b">{s.tabs.tabB}</TabsTrigger>
              </TabsList>
              <TabsContent value="a" className="text-sm text-muted-foreground">
                {s.tabs.lineBody}
              </TabsContent>
              <TabsContent value="b" className="text-sm text-muted-foreground">
                {s.tabs.secondTab}
              </TabsContent>
            </Tabs>
          </div>
        </Section>

        <Section title="Badge" description={s.badge.desc}>
          <Row>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </Row>
        </Section>

        <Section title="Tooltip" description={s.tooltip.desc}>
          <Row>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline">{s.tooltip.hover}</Button>} />
              <TooltipContent>{s.tooltip.hoverBody}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" disabled>{s.tooltip.disabled}</Button>} />
              <TooltipContent>{s.tooltip.disabledBody}</TooltipContent>
            </Tooltip>
          </Row>
        </Section>

        <Section title="Separator" description={s.separator.desc}>
          <div className="space-y-4">
            <div>
              <p className="text-sm">{s.separator.above}</p>
              <Separator className="my-3" />
              <p className="text-sm">{s.separator.below}</p>
            </div>
            <div className="flex h-8 items-center gap-3 text-sm">
              <span>{s.separator.left}</span>
              <Separator orientation="vertical" />
              <span>{s.separator.right}</span>
            </div>
          </div>
        </Section>

        <Section title="Checkbox" description={s.checkbox.desc}>
          <Row>
            <div className="flex items-center gap-2">
              <Checkbox id="cb-1" />
              <Label htmlFor="cb-1">{s.checkbox.unchecked}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb-2" defaultChecked />
              <Label htmlFor="cb-2">{s.checkbox.checked}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb-3" disabled />
              <Label htmlFor="cb-3">{s.checkbox.disabled}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb-4" disabled defaultChecked />
              <Label htmlFor="cb-4">{s.checkbox.disabledChecked}</Label>
            </div>
          </Row>
        </Section>

        <Section title="Radio Group" description={s.radio.desc}>
          <RadioGroup defaultValue="option-1" className="max-w-xs">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-1" id="r1" />
              <Label htmlFor="r1">{s.radio.option1}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-2" id="r2" />
              <Label htmlFor="r2">{s.radio.option2}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-3" id="r3" disabled />
              <Label htmlFor="r3">{s.radio.option3}</Label>
            </div>
          </RadioGroup>
        </Section>

        <Section title="Textarea" description={s.textarea.desc}>
          <div className="grid max-w-sm gap-4">
            <div>
              <StateLabel>{s.textarea.normal}</StateLabel>
              <Textarea placeholder={s.textarea.placeholder} />
            </div>
            <div>
              <StateLabel>{s.textarea.disabled}</StateLabel>
              <Textarea placeholder={s.textarea.disabledPlaceholder} disabled />
            </div>
            <div>
              <StateLabel>{s.textarea.focus}</StateLabel>
              <Textarea placeholder={s.textarea.focusPlaceholder} className={SIMULATED_FOCUS} />
            </div>
          </div>
        </Section>

        <Section title="Table" description={s.table.desc}>
          <Table>
            <TableCaption>{s.table.caption}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{s.table.invoice}</TableHead>
                <TableHead>{s.table.status}</TableHead>
                <TableHead>{s.table.method}</TableHead>
                <TableHead className="text-right">{s.table.amount}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>
                  <Badge variant="secondary">{s.table.paid}</Badge>
                </TableCell>
                <TableCell>{s.table.card}</TableCell>
                <TableCell className="text-right">250,00 €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell>
                  <Badge variant="outline">{s.table.pending}</Badge>
                </TableCell>
                <TableCell>{s.table.transfer}</TableCell>
                <TableCell className="text-right">150,00 €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV003</TableCell>
                <TableCell>
                  <Badge variant="destructive">{s.table.failed}</Badge>
                </TableCell>
                <TableCell>{s.table.card}</TableCell>
                <TableCell className="text-right">350,00 €</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
    </div>
  )
}

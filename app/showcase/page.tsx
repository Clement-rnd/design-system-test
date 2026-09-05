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

/** Classes reproduisant l'anneau de focus-visible des composants, pour en
 * simuler l'état sans exiger un focus clavier réel du visiteur. */
const SIMULATED_FOCUS =
  "border-ring ring-3 ring-ring/50 outline-none rounded-lg"

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
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Design System Showcase</h1>
        <p className="text-muted-foreground">
          Aperçu de chaque composant shadcn/ui installé, avec ses variants et
          ses états (hover réel via CSS, disabled, focus simulé).
        </p>
      </header>

        <Section title="Button" description="Variants et tailles, avec états disabled et focus simulé.">
          <div className="space-y-6">
            <div>
              <StateLabel>Variants (hover actif au survol)</StateLabel>
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
              <StateLabel>Tailles</StateLabel>
              <Row>
                <Button size="xs">Extra small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </Row>
            </div>
            <div>
              <StateLabel>Disabled</StateLabel>
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
              <StateLabel>Focus (simulé)</StateLabel>
              <Row>
                <Button className={SIMULATED_FOCUS}>Default</Button>
                <Button variant="outline" className={SIMULATED_FOCUS}>
                  Outline
                </Button>
              </Row>
            </div>
          </div>
        </Section>

        <Section title="Card" description="Composition header / content / footer.">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Gérez vos préférences de notification.</CardDescription>
              <CardAction>
                <Badge variant="secondary">Nouveau</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Vous recevrez un résumé quotidien par email.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm">
                Annuler
              </Button>
              <Button size="sm">Enregistrer</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Input" description="États normal, disabled et focus simulé.">
          <div className="grid max-w-sm gap-4">
            <div>
              <StateLabel>Normal</StateLabel>
              <Input placeholder="nom@exemple.fr" />
            </div>
            <div>
              <StateLabel>Disabled</StateLabel>
              <Input placeholder="Champ désactivé" disabled />
            </div>
            <div>
              <StateLabel>Focus (simulé)</StateLabel>
              <Input placeholder="Champ focus" className={SIMULATED_FOCUS} />
            </div>
          </div>
        </Section>

        <Section title="Label" description="Association avec un champ de formulaire.">
          <div className="grid max-w-sm gap-1.5">
            <Label htmlFor="showcase-email">Adresse email</Label>
            <Input id="showcase-email" type="email" placeholder="nom@exemple.fr" />
          </div>
        </Section>

        <Section title="Select" description="Menu déroulant avec groupe d'options.">
          <div className="grid max-w-sm gap-4">
            <div>
              <StateLabel>Normal</StateLabel>
              <Select defaultValue="apple">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir un fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Pomme</SelectItem>
                    <SelectItem value="banana">Banane</SelectItem>
                    <SelectItem value="grape">Raisin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <StateLabel>Disabled</StateLabel>
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Indisponible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        <Section title="Switch" description="Tailles et états checked / disabled.">
          <div className="space-y-4">
            <Row>
              <div className="flex items-center gap-2">
                <Switch id="switch-off" />
                <Label htmlFor="switch-off">Off</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-on" defaultChecked />
                <Label htmlFor="switch-on">On</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-disabled" disabled />
                <Label htmlFor="switch-disabled">Disabled</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-disabled-checked" disabled defaultChecked />
                <Label htmlFor="switch-disabled-checked">Disabled + checked</Label>
              </div>
            </Row>
          </div>
        </Section>

        <Section title="Dialog" description="Fenêtre modale déclenchée par un bouton.">
          <Dialog>
            <DialogTrigger render={<Button>Ouvrir le dialogue</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer l&apos;action</DialogTitle>
                <DialogDescription>
                  Cette action est irréversible. Voulez-vous continuer ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">Annuler</Button>} />
                <DialogClose render={<Button>Confirmer</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Dropdown Menu" description="Menu contextuel avec item destructif.">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">Ouvrir le menu</Button>} />
            <DropdownMenuContent>
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuItem disabled>Facturation (disabled)</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Supprimer le compte</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Tabs" description="Navigation par onglets, variant default et line.">
          <div className="space-y-6">
            <Tabs defaultValue="account" className="max-w-md">
              <TabsList>
                <TabsTrigger value="account">Compte</TabsTrigger>
                <TabsTrigger value="password">Mot de passe</TabsTrigger>
                <TabsTrigger value="disabled" disabled>
                  Désactivé
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="text-sm text-muted-foreground">
                Modifiez vos informations de compte ici.
              </TabsContent>
              <TabsContent value="password" className="text-sm text-muted-foreground">
                Modifiez votre mot de passe ici.
              </TabsContent>
              <TabsContent value="disabled" className="text-sm text-muted-foreground">
                Contenu indisponible.
              </TabsContent>
            </Tabs>
            <Tabs defaultValue="a" className="max-w-md">
              <TabsList variant="line">
                <TabsTrigger value="a">Onglet A</TabsTrigger>
                <TabsTrigger value="b">Onglet B</TabsTrigger>
              </TabsList>
              <TabsContent value="a" className="text-sm text-muted-foreground">
                Variant &quot;line&quot;.
              </TabsContent>
              <TabsContent value="b" className="text-sm text-muted-foreground">
                Deuxième onglet.
              </TabsContent>
            </Tabs>
          </div>
        </Section>

        <Section title="Badge" description="Variants disponibles.">
          <Row>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </Row>
        </Section>

        <Section title="Tooltip" description="Info-bulle affichée au survol ou au focus.">
          <Row>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline">Survolez-moi</Button>} />
              <TooltipContent>Ceci est une info-bulle</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" disabled>Disabled</Button>} />
              <TooltipContent>Non disponible</TooltipContent>
            </Tooltip>
          </Row>
        </Section>

        <Section title="Separator" description="Séparateur horizontal et vertical.">
          <div className="space-y-4">
            <div>
              <p className="text-sm">Section au-dessus</p>
              <Separator className="my-3" />
              <p className="text-sm">Section en dessous</p>
            </div>
            <div className="flex h-8 items-center gap-3 text-sm">
              <span>Gauche</span>
              <Separator orientation="vertical" />
              <span>Droite</span>
            </div>
          </div>
        </Section>

        <Section title="Checkbox" description="États unchecked, checked et disabled.">
          <Row>
            <div className="flex items-center gap-2">
              <Checkbox id="cb-1" />
              <Label htmlFor="cb-1">Non coché</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb-2" defaultChecked />
              <Label htmlFor="cb-2">Coché</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb-3" disabled />
              <Label htmlFor="cb-3">Disabled</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb-4" disabled defaultChecked />
              <Label htmlFor="cb-4">Disabled + coché</Label>
            </div>
          </Row>
        </Section>

        <Section title="Radio Group" description="Sélection unique parmi plusieurs options.">
          <RadioGroup defaultValue="option-1" className="max-w-xs">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-1" id="r1" />
              <Label htmlFor="r1">Option 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-2" id="r2" />
              <Label htmlFor="r2">Option 2</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-3" id="r3" disabled />
              <Label htmlFor="r3">Option 3 (disabled)</Label>
            </div>
          </RadioGroup>
        </Section>

        <Section title="Textarea" description="États normal, disabled et focus simulé.">
          <div className="grid max-w-sm gap-4">
            <div>
              <StateLabel>Normal</StateLabel>
              <Textarea placeholder="Votre message..." />
            </div>
            <div>
              <StateLabel>Disabled</StateLabel>
              <Textarea placeholder="Champ désactivé" disabled />
            </div>
            <div>
              <StateLabel>Focus (simulé)</StateLabel>
              <Textarea placeholder="Champ focus" className={SIMULATED_FOCUS} />
            </div>
          </div>
        </Section>

        <Section title="Table" description="Tableau avec en-tête, corps et légende.">
          <Table>
            <TableCaption>Liste des dernières factures.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Facture</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>
                  <Badge variant="secondary">Payée</Badge>
                </TableCell>
                <TableCell>Carte bancaire</TableCell>
                <TableCell className="text-right">250,00 €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell>
                  <Badge variant="outline">En attente</Badge>
                </TableCell>
                <TableCell>Virement</TableCell>
                <TableCell className="text-right">150,00 €</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV003</TableCell>
                <TableCell>
                  <Badge variant="destructive">Échouée</Badge>
                </TableCell>
                <TableCell>Carte bancaire</TableCell>
                <TableCell className="text-right">350,00 €</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
    </div>
  )
}

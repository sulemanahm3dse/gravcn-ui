"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Import Extensions
import { MultiSelect } from "@/components/extensions/multi-select";
import { DataTable } from "@/components/extensions/data-table";
import { AppShell } from "@/components/extensions/app-shell";

// Import Primitives for previews
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Terminal, User, Settings, LayoutDashboard, FileText, Menu, Sparkles } from "lucide-react";

interface ComponentPreviewProps {
  name: string;
  className?: string;
}

export function ComponentPreview({ name, className }: ComponentPreviewProps) {
  // MultiSelect State
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<string[]>(["react", "nextjs"]);
  const frameworkOptions = [
    { label: "React", value: "react" },
    { label: "Next.js", value: "nextjs" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ];

  // DataTable Config
  interface Payment {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  }
  const paymentColumns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }: any) => {
        const amount = parseFloat(row.getValue("amount"));
        return <div className="font-medium">${amount.toFixed(2)}</div>;
      },
    },
  ];
  const paymentData: Payment[] = [
    { id: "PAY-1001", amount: 100, status: "success", email: "alice@example.com" },
    { id: "PAY-1002", amount: 250, status: "pending", email: "bob@example.com" },
    { id: "PAY-1003", amount: 80, status: "processing", email: "charlie@example.com" },
    { id: "PAY-1004", amount: 450, status: "success", email: "david@example.com" },
    { id: "PAY-1005", amount: 120, status: "failed", email: "eve@example.com" },
  ];

  const renderPreview = () => {
    switch (name) {
      case "multi-select":
        return (
          <div className="w-full max-w-md mx-auto p-4">
            <MultiSelect
              options={frameworkOptions}
              value={selectedFrameworks}
              onChange={setSelectedFrameworks}
              placeholder="Select frameworks..."
            />
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Selected value: {JSON.stringify(selectedFrameworks)}
            </div>
          </div>
        );

      case "data-table":
        return (
          <div className="w-full max-w-3xl mx-auto p-2">
            <DataTable columns={paymentColumns} data={paymentData} searchKey="email" />
          </div>
        );

      case "app-shell":
        return (
          <div className="w-full max-w-3xl mx-auto border border-border rounded-xl overflow-hidden shadow-lg h-[400px]">
            <AppShell
              brand={{
                name: "SaaSPro",
                logo: <LayoutDashboard className="h-5 w-5 text-primary" />
              }}
              navItems={[
                { title: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { title: "Documents", href: "#", icon: FileText },
                { title: "Settings", href: "#", icon: Settings },
              ]}
              user={{
                name: "John Doe",
                email: "john@example.com",
                avatarUrl: "https://github.com/shadcn.png"
              }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                  <p className="text-muted-foreground">Here is the preview layout inside the App Shell.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2350</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AppShell>
          </div>
        );

      case "button":
        return (
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        );

      case "badge":
        return (
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        );

      case "avatar":
        return (
          <div className="flex justify-center">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        );

      case "accordion":
        return (
          <div className="w-full max-w-md mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it customizable?</AccordionTrigger>
                <AccordionContent>
                  Yes! All components are directly imported as source files into your project.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Everything is built on accessible Radix primitives.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );

      case "alert":
        return (
          <div className="w-full max-w-md mx-auto">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your project using the CLI.
              </AlertDescription>
            </Alert>
          </div>
        );

      case "alert-dialog":
        return (
          <div className="flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );

      case "card":
        return (
          <Card className="w-[380px] mx-auto">
            <CardHeader>
              <CardTitle>Create Project</CardTitle>
              <CardDescription>Deploy your web app in a single step.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Select a cloud provider to automatically configure environments.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        );

      case "dialog":
        return (
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p className="text-sm">Profile fields and options would render here.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );

      case "popover":
        return (
          <div className="flex justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Settings</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notifications</h4>
                    <p className="text-xs text-muted-foreground">
                      Configure email digests and push alerts.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );

      case "table":
        return (
          <div className="w-full max-w-md mx-auto border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV-01</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV-02</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell className="text-right">$120.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );

      case "tabs":
        return (
          <Tabs defaultValue="account" className="w-[400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="border border-border p-4 rounded-xl mt-2 bg-card">
              <p className="text-sm">Manage your profile name and email address.</p>
            </TabsContent>
            <TabsContent value="security" className="border border-border p-4 rounded-xl mt-2 bg-card">
              <p className="text-sm">Configure multi-factor auth and active sessions.</p>
            </TabsContent>
          </Tabs>
        );

      case "dropdown-menu":
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl border border-border bg-popover text-popover-foreground shadow-md p-1">
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="h-px bg-border my-1" />
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );

      case "input":
        return (
          <div className="w-full max-w-sm mx-auto">
            <Input type="email" placeholder="Email Address" className="rounded-xl border-border" />
          </div>
        );

      case "textarea":
        return (
          <div className="w-full max-w-sm mx-auto">
            <Textarea placeholder="Type your message here..." className="rounded-xl border-border" />
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" className="rounded-md border-border" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Accept terms and conditions
            </label>
          </div>
        );

      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <label htmlFor="airplane-mode" className="text-sm font-medium cursor-pointer">
              Airplane Mode
            </label>
          </div>
        );

      case "sheet":
        return (
          <div className="flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-l border-border p-6 shadow-xl">
                <SheetHeader className="space-y-1">
                  <SheetTitle className="text-lg font-bold">Edit profile</SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground">
                    Make changes to your profile here. Click save when you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <p className="text-sm text-muted-foreground">Inside sheet content panel.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        );

      case "tooltip":
        return (
          <div className="flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-popover text-popover-foreground border border-border px-3 py-1.5 rounded-lg shadow-md text-xs">
                  <p className="flex items-center gap-1 font-medium"><Sparkles className="h-3 w-3 text-primary animate-pulse" /> Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );

      case "skeleton":
        return (
          <div className="flex items-center space-x-4 w-full max-w-sm mx-auto">
            <Skeleton className="h-12 w-12 rounded-full bg-muted/60" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full bg-muted/60" />
              <Skeleton className="h-4 w-5/6 bg-muted/60" />
            </div>
          </div>
        );

      case "chart":
        const chartData = [
          { month: "January", desktop: 186, mobile: 80 },
          { month: "February", desktop: 305, mobile: 200 },
          { month: "March", desktop: 237, mobile: 120 },
          { month: "April", desktop: 73, mobile: 190 },
          { month: "May", desktop: 209, mobile: 130 },
          { month: "June", desktop: 214, mobile: 140 },
        ];
        const chartConfig = {
          desktop: {
            label: "Desktop",
            color: "var(--primary)",
          },
          mobile: {
            label: "Mobile",
            color: "var(--muted-foreground)",
          },
        };
        return (
          <div className="w-full max-w-sm mx-auto">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        );

      default:
        return <div className="text-muted-foreground text-sm">Preview not found for {name}</div>;
    }
  };

  return (
    <div
      className={cn(
        "group relative my-4 flex min-h-[350px] w-full items-center justify-center rounded-xl border border-border bg-gradient-to-br from-background/40 to-muted/20 p-10 md:p-12 transition-colors overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,119,198,0.08), rgba(255,255,255,0))`,
      }}
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px] pointer-events-none opacity-40" />
      <div className="relative z-10 flex w-full items-center justify-center">
        {renderPreview()}
      </div>
    </div>
  );
}

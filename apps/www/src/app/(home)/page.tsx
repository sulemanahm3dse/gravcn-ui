import Link from 'next/link';
import { ArrowRight, Code2, Shield, Calendar, Users, HelpCircle, Check, ArrowUpRight, DollarSign, Terminal } from 'lucide-react';
import { CodeBlock, CodeBlockTab, CodeBlockTabs, CodeBlockTabsList, CodeBlockTabsTrigger, Pre } from 'fumadocs-ui/components/codeblock';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center space-y-8 mb-24 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer mx-auto">
          <span>Introducing v1.0.0</span>
          <ArrowRight className="h-3 w-3" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground font-sans mx-auto leading-tight">
          Build stunning interfaces with<br/>
          <span className="inline-flex items-center gap-3 mt-4">
            <Logo className="h-12 w-12 md:h-16 md:w-16 text-primary drop-shadow-md" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">gravcn/ui</span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A premium collection of customizable and extensible components built on top of shadcn/ui. Copy, paste, and make it your own.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md group"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-border bg-card hover:bg-muted/50 font-semibold transition-all"
          >
            GitHub
          </a>
        </div>

        {/* Installation Preview */}
        <div className="mt-12 max-w-2xl mx-auto text-left">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground ml-2">
            <Terminal className="h-4 w-4" />
            <span>Install via CLI</span>
          </div>
          <CodeBlockTabs defaultValue="npm" groupId="package-manager">
            <CodeBlockTabsList>
              <CodeBlockTabsTrigger value="npm">npm</CodeBlockTabsTrigger>
              <CodeBlockTabsTrigger value="pnpm">pnpm</CodeBlockTabsTrigger>
              <CodeBlockTabsTrigger value="yarn">yarn</CodeBlockTabsTrigger>
              <CodeBlockTabsTrigger value="bun">bun</CodeBlockTabsTrigger>
            </CodeBlockTabsList>
            <CodeBlockTab value="npm">
              <CodeBlock>
                <Pre>npx @gravcn/cli init</Pre>
              </CodeBlock>
            </CodeBlockTab>
            <CodeBlockTab value="pnpm">
              <CodeBlock>
                <Pre>pnpm dlx @gravcn/cli init</Pre>
              </CodeBlock>
            </CodeBlockTab>
            <CodeBlockTab value="yarn">
              <CodeBlock>
                <Pre>yarn dlx @gravcn/cli init</Pre>
              </CodeBlock>
            </CodeBlockTab>
            <CodeBlockTab value="bun">
              <CodeBlock>
                <Pre>bunx @gravcn/cli init</Pre>
              </CodeBlock>
            </CodeBlockTab>
          </CodeBlockTabs>
        </div>
      </div>

      {/* Components Showcase Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700 delay-200">
        {/* Card 1: Buttons & Inputs Form */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button size="sm" className="h-8 text-xs px-3">
                Button <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
              <Button variant="secondary" size="sm" className="h-8 text-xs px-3">
                Secondary
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs px-3">
                Outline
              </Button>
            </div>
            
            <div className="space-y-2">
              <Input placeholder="Name" disabled className="bg-muted/20" />
              <Textarea placeholder="Message" disabled className="bg-muted/20 resize-none h-20" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-1">
                <Badge>Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
              <div className="flex gap-1 items-center">
                <Avatar className="h-6 w-6 border border-border">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 border border-border -ml-2">
                  <AvatarFallback className="text-[10px]">A</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 border border-border -ml-2">
                  <AvatarFallback className="text-[10px]">B</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-4 mt-6 flex justify-between items-center text-xs text-muted-foreground">
            <span>Alert Dialog</span>
            <span className="font-semibold text-foreground flex items-center gap-1">
              Button Group <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Contribution History Chart */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-foreground">Contribution History</h3>
              <p className="text-xs text-muted-foreground">Last 6 months of activity</p>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="flex items-end justify-between h-28 pt-2">
              {[
                { label: 'Dec', value: 'h-16' },
                { label: 'Jan', value: 'h-24' },
                { label: 'Feb', value: 'h-20' },
                { label: 'Mar', value: 'h-28' },
                { label: 'Apr', value: 'h-14' },
                { label: 'May', value: 'h-26' },
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-8 ${bar.value} bg-foreground/85 rounded-md transition-all hover:bg-foreground`} />
                  <span className="text-[10px] text-muted-foreground font-medium">{bar.label}</span>
                </div>
              ))}
            </div>

            <Tabs defaultValue="upcoming" className="w-full pt-4 border-t border-border/60">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="upcoming" className="text-[10px] uppercase tracking-wider font-semibold">Upcoming</TabsTrigger>
                <TabsTrigger value="savings" className="text-[10px] uppercase tracking-wider font-semibold">Savings</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="mt-4 space-y-0.5">
                <p className="text-xs font-bold text-foreground">May 2026</p>
                <p className="text-[10px] text-muted-foreground">Scheduled</p>
              </TabsContent>
              <TabsContent value="savings" className="mt-4 space-y-0.5">
                <p className="text-xs font-bold text-foreground">Accelerated</p>
                <p className="text-[10px] text-muted-foreground">Recurring</p>
              </TabsContent>
            </Tabs>
          </div>
          <Button className="w-full mt-6">
            View Full Report
          </Button>
        </div>

        {/* Card 3: Milestone Goal Creator */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-foreground">Set a new milestone</h3>
              <p className="text-xs text-muted-foreground">Define your financial target and we'll help you pace.</p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase text-muted-foreground">Goal Name</label>
                <Input
                  placeholder="e.g. New Car, Home Downpayment"
                  disabled
                  className="h-9 text-xs bg-muted/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold uppercase text-muted-foreground">Target Amount</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2.5 text-xs text-muted-foreground">$</span>
                    <Input
                      placeholder="15,000"
                      disabled
                      className="h-9 pl-6 text-xs bg-muted/20"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold uppercase text-muted-foreground">Target Date</label>
                  <Input
                    placeholder="Dec 2026"
                    disabled
                    className="h-9 text-xs bg-muted/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Button className="w-full">
              Create Goal
            </Button>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </div>

        {/* Card 4: Mobile Scanner Connection */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center space-y-4 py-4">
            {/* Elegant SVG QR Mockup */}
            <div className="p-3 bg-white border border-border rounded-xl shadow-inner dark:bg-zinc-100">
              <svg className="w-24 h-24 text-zinc-900" viewBox="0 0 100 100" fill="currentColor">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="10" y="10" width="10" height="10" fill="white" />
                <rect x="70" y="0" width="30" height="30" />
                <rect x="80" y="10" width="10" height="10" fill="white" />
                <rect x="0" y="70" width="30" height="30" />
                <rect x="10" y="80" width="10" height="10" fill="white" />
                <rect x="40" y="40" width="20" height="20" />
                <rect x="45" y="45" width="10" height="10" fill="white" />
                <rect x="40" y="0" width="10" height="10" />
                <rect x="50" y="20" width="10" height="10" />
                <rect x="70" y="40" width="10" height="10" />
                <rect x="90" y="50" width="10" height="10" />
                <rect x="0" y="40" width="10" height="10" />
                <rect x="20" y="50" width="10" height="10" />
                <rect x="80" y="80" width="20" height="20" />
              </svg>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-sm">Scan to connect your mobile device</h4>
              <p className="text-xs text-muted-foreground leading-relaxed px-4">
                Open the Ledger mobile app and scan this code to link your device.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-4 flex items-center justify-between text-xs text-muted-foreground mt-4">
            <span>Transfer Funds</span>
            <Button variant="link" className="p-0 h-auto font-semibold text-foreground flex items-center gap-1 text-xs">
              Confirm Transaction <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Card 5: Navigation lists (Planning & Support) */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <Accordion type="single" collapsible defaultValue="planning" className="w-full -mt-2">
            <AccordionItem value="planning" className="border-border">
              <AccordionTrigger className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider py-3 hover:no-underline">Planning</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 text-foreground font-semibold hover:underline cursor-pointer">
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                    Documents
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full bg-border" />
                    Budget
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full bg-border" />
                    Reports
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support" className="border-border border-b-0">
              <AccordionTrigger className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider py-3 hover:no-underline">Support</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Help Center
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    <Code2 className="h-3.5 w-3.5" />
                    Docs
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    <Users className="h-3.5 w-3.5" />
                    Contact Us
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="border-t border-border pt-4 mt-6 flex justify-between items-center text-xs text-muted-foreground">
            <span>Payout Threshold</span>
            <span className="text-foreground font-semibold flex items-center gap-1">
              Configure Settings <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Card 6: Showcase stats / features card */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Quick Action</h3>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Active
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-xl border border-border flex items-center gap-3">
              <div className="p-2 bg-foreground text-background rounded-lg">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Available balance</p>
                <p className="text-base font-bold text-foreground">$82,459.00</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Daily Limit</span>
                <span className="font-bold text-foreground">$5,000.00</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div className="bg-foreground h-full w-[65%]" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button className="flex-1">
              Transfer
            </Button>
            <Button variant="outline" size="icon">
              <Shield className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

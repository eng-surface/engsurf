import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, MessageSquare, Code2, Rocket, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/custom-tool")({
  head: () => ({
    meta: [
      { title: "Request a Custom Tool — EngSurface" },
      {
        name: "description",
        content:
          "Need a bespoke automation tool for your engineering workflow? Describe your requirements and the EngSurface team will build it for you.",
      },
      { property: "og:title", content: "Request a Custom Tool — EngSurface" },
      {
        property: "og:description",
        content:
          "Bespoke CATIA, Siemens NX, Excel VBA and Python automation tools built to your exact specification.",
      },
    ],
  }),
  component: CustomToolPage,
});

// ─── Schema ───────────────────────────────────────────────────────────────────
const platforms = ["CATIA V5/V6", "Siemens NX", "Excel / VBA", "Python", "Other"] as const;
const budgets = ["< €500", "€500 – €1 500", "€1 500 – €5 000", "€5 000+", "Not sure yet"] as const;

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  platform: z.enum(platforms, { required_error: "Please select a platform" }),
  budget: z.enum(budgets, { required_error: "Please select a budget range" }),
  description: z.string().min(40, "Please describe your workflow in at least 40 characters"),
});

type FormData = z.infer<typeof schema>;

// ─── Process steps ────────────────────────────────────────────────────────────
const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Submit your request",
    body: "Fill in the form with your workflow description, target platform and budget range.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Scoping call",
    body: "We schedule a short call to clarify requirements and confirm the technical approach.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build & review",
    body: "Development starts with a mid-point review so you can provide feedback early.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Delivery & support",
    body: "You receive the signed installer, documentation and 6 months of support.",
  },
];

// ─── What we build ────────────────────────────────────────────────────────────
const capabilities = [
  "CATIA V5/V6 macros and CAA V5 automation",
  "Siemens NX Open API scripts and journals",
  "Excel VBA workbooks and add-ins",
  "Python CLI tools and desktop GUIs",
  "BOM extraction and report generation",
  "Drawing automation and title block population",
  "Batch file conversion and export pipelines",
  "PLM / PDM data integration scripts",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
function CustomToolPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Custom tool request:", data);
    toast.success("Request received! We'll be in touch within 2 business days.");
    reset();
  }

  return (
    <div>
      {/* ── Hero ── */}
      <section className="surface-hero grid-lines text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rise-in max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Custom build</p>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Your workflow. Your tool.
            </h1>
            <p className="mt-4 max-w-xl leading-relaxed text-navy-foreground/70">
              Can't find exactly what you need in the catalogue? Describe your repetitive task and
              we'll design and deliver an automation tool built around your exact environment.
            </p>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">How it works</p>
        <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
          From idea to production in 4 steps
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className="relative rounded-xl border border-border bg-card p-6 shadow-sm">
              <span className="absolute right-5 top-5 font-mono text-3xl font-bold text-border">
                {step}
              </span>
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-navy">
                <Icon className="size-5 text-accent" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold pr-10">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Form + Capabilities ── */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl border border-border bg-card p-8 shadow-sm"
              noValidate
            >
              <h2 className="font-display text-xl font-semibold">Describe your requirements</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                The more detail you provide, the more accurate our scoping will be.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ct-name">Full name *</Label>
                  <Input
                    id="ct-name"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ct-email">Email address *</Label>
                  <Input
                    id="ct-email"
                    type="email"
                    placeholder="jane@company.com"
                    autoComplete="email"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="ct-company">Company / Organisation (optional)</Label>
                  <Input
                    id="ct-company"
                    placeholder="Acme Aerospace"
                    autoComplete="organization"
                    {...register("company")}
                  />
                </div>

                {/* Platform */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ct-platform">Target platform *</Label>
                  <select
                    id="ct-platform"
                    {...register("platform")}
                    className={[
                      "h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                      errors.platform ? "border-destructive" : "border-input",
                    ].join(" ")}
                  >
                    <option value="">Select a platform…</option>
                    {platforms.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.platform && (
                    <p className="text-xs text-destructive">{errors.platform.message}</p>
                  )}
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ct-budget">Budget range *</Label>
                  <select
                    id="ct-budget"
                    {...register("budget")}
                    className={[
                      "h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                      errors.budget ? "border-destructive" : "border-input",
                    ].join(" ")}
                  >
                    <option value="">Select a range…</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p className="text-xs text-destructive">{errors.budget.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="ct-desc">Workflow description *</Label>
                  <textarea
                    id="ct-desc"
                    rows={7}
                    placeholder="e.g. We need a CATIA V5 macro that reads an Excel BOM and automatically creates part files named by part number, then populates title block attributes from the spreadsheet columns…"
                    {...register("description")}
                    className={[
                      "w-full resize-none rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      errors.description ? "border-destructive" : "border-input",
                    ].join(" ")}
                  />
                  {errors.description && (
                    <p className="text-xs text-destructive">{errors.description.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="teal"
                size="lg"
                className="mt-6 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Submit request"}
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                No commitment required — we'll send a scoping proposal first.
              </p>
            </form>

            {/* Capabilities sidebar */}
            <aside className="flex flex-col gap-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-base font-semibold">What we build</h3>
                <ul className="mt-4 space-y-3">
                  {capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-base font-semibold">Typical timeline</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex justify-between gap-4">
                    <span>Simple macro / script</span>
                    <span className="font-mono text-xs text-foreground">1 – 2 weeks</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Mid-complexity tool</span>
                    <span className="font-mono text-xs text-foreground">2 – 5 weeks</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Full desktop application</span>
                    <span className="font-mono text-xs text-foreground">6 – 12 weeks</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

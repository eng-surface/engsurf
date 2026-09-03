import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  Star,
  Zap,
  ShieldCheck,
  RefreshCw,
  Hexagon,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EngSurface — Engineering Automation Tools" },
      {
        name: "description",
        content:
          "Marketplace of automation tools for CATIA, Siemens NX, Excel VBA and Python engineering workflows. Built by engineers, tested in production.",
      },
      { property: "og:title", content: "EngSurface — Engineering Automation Tools" },
      {
        property: "og:description",
        content:
          "Browse automation tools for CATIA, Siemens NX, Excel VBA and Python. Ready-to-use, documented and versioned.",
      },
    ],
  }),
  component: Index,
});

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Published tools", value: `${products.length}+` },
  { label: "Total downloads", value: `${(products.reduce((s, p) => s + p.downloads, 0) / 1000).toFixed(0)}k+` },
  { label: "Automation categories", value: `${categories.length}` },
  { label: "Avg. rating", value: `${(products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)}★` },
];

// ─── Why EngSurface cards ─────────────────────────────────────────────────────
const reasons = [
  {
    icon: ShieldCheck,
    title: "Signed & virus-scanned",
    body: "Every release is digitally signed and scanned before publishing. No surprises on your workstation.",
  },
  {
    icon: RefreshCw,
    title: "12 months of updates",
    body: "Paid tools include a full year of compatibility updates as CAD vendors ship new versions.",
  },
  {
    icon: Zap,
    title: "Instant download",
    body: "No account required for free tools. Paid tools unlock immediately after checkout.",
  },
  {
    icon: Cpu,
    title: "Built by engineers",
    body: "Every tool comes from a real production need — documented, versioned and battle-tested.",
  },
];

// ─── Compatibility list ───────────────────────────────────────────────────────
const compat = [
  { label: "CATIA V5-6", range: "R2018 → R2024" },
  { label: "Siemens NX", range: "1980 → 2412" },
  { label: "Excel / VBA", range: "2016 → Microsoft 365" },
  { label: "Python", range: "3.10 and above" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
function Index() {
  const featured = products.slice(0, 3);

  return (
    <div>
      <Hero />
      <StatsBar />
      <CategoriesSection />
      <FeaturedSection products={featured} />
      <WhySection />
      <CompatibilitySection />
      <CtaBanner />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="surface-hero grid-lines text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="rise-in mx-auto max-w-3xl text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 bg-navy-foreground/8 px-4 py-1.5 text-xs font-medium text-navy-foreground/80">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            Engineering automation marketplace
          </span>

          {/* Headline */}
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Automate the repetitive.{" "}
            <span className="text-gradient-teal">Ship faster.</span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
            Ready-to-use automation tools for CATIA, Siemens NX, Excel VBA and Python.
            Documented, versioned and validated against current software builds.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="teal" size="xl">
              <Link to="/products">
                Browse all tools <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              className="border border-navy-foreground/25 bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20"
            >
              <Link to="/products" search={{ price: "free" }}>
                <Download className="size-4" /> Free tools
              </Link>
            </Button>
          </div>

          {/* Social proof micro-line */}
          <p className="mt-8 flex items-center justify-center gap-2 text-xs text-navy-foreground/50">
            <Star className="size-3.5 fill-accent text-accent" />
            Trusted by engineering teams across aerospace, automotive and manufacturing
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center px-6 py-8 text-center">
            <span className="font-display text-3xl font-semibold text-foreground">{s.value}</span>
            <span className="mt-1 text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Categories section ───────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Categories</p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            Four automation disciplines
          </h2>
        </div>
        <Link
          to="/categories"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          View all categories <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <Link
              key={c.id}
              to="/products"
              search={{ category: c.id }}
              className="card-lift group flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-navy px-2.5 py-1 font-mono text-[11px] text-navy-foreground">
                  {c.short}
                </span>
                <Hexagon className="size-4 text-accent opacity-60" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{c.name}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
                {count} tools available
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ─── Featured products ────────────────────────────────────────────────────────
function FeaturedSection({ products }: { products: typeof import("@/data/products").products }) {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Featured</p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              Most downloaded tools
            </h2>
          </div>
          <Link
            to="/products"
            search={{ sort: "popular" }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            See full catalogue <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why EngSurface ───────────────────────────────────────────────────────────
function WhySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Why EngSurface</p>
        <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
          Tools you can actually trust
        </h2>
        <p className="mt-3 text-muted-foreground">
          Every tool in the catalogue follows the same release process — no experiments, no half-baked
          scripts shipped to production.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-navy">
              <Icon className="size-5 text-accent" />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Compatibility ────────────────────────────────────────────────────────────
function CompatibilitySection() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Compatibility</p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            Tested on current builds
          </h2>
          <p className="mt-3 text-muted-foreground">
            All tools are validated against the most widely used versions in the industry.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {compat.map((c) => (
            <div
              key={c.label}
              className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-8 text-center shadow-sm"
            >
              <span className="font-display text-lg font-semibold">{c.label}</span>
              <span className="mt-1 font-mono text-xs text-muted-foreground">{c.range}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className="surface-hero grid-lines text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Can't find what you need?
          </h2>
          <p className="mt-4 text-base text-navy-foreground/70">
            Describe your workflow and we'll build a custom tool for your exact environment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="teal" size="xl">
              <Link to="/custom-tool">
                Request a custom tool <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              className="border border-navy-foreground/25 bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20"
            >
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

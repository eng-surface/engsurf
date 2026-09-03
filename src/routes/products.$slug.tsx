import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download,
  Star,
  FileText,
  CheckCircle2,
  Cpu,
  History,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/site/ProductCard";
import {
  categoryName,
  formatPrice,
  getProduct,
  relatedProducts,
  type Product,
} from "@/data/products";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tool not found — EngSurface" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const title = `${p.title} v${p.version} — EngSurface`;
    return {
      meta: [
        { title },
        { name: "description", content: p.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  component: ProductPage,
});

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={"inline-flex items-center gap-0.5 " + className}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            "size-4 " + (i <= Math.round(rating) ? "fill-accent text-accent" : "text-border")
          }
        />
      ))}
    </span>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = relatedProducts(product);

  return (
    <div>
      <ProductHero product={product} />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="space-y-14">
          <section>
            <h2 className="font-display text-2xl font-semibold">Overview</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Key features</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <Gallery product={product} />

          <section>
            <h2 className="font-display text-2xl font-semibold">Video tutorial</h2>
            <div className="mt-5 aspect-video overflow-hidden rounded-xl border border-border bg-navy-deep">
              <iframe
                className="size-full"
                src={`https://www.youtube.com/embed/${product.youtubeId}`}
                title={`${product.title} tutorial`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          <Reviews product={product} />

          <section>
            <h2 className="font-display text-2xl font-semibold">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-4">
              {product.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section>
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
              <History className="size-5 text-accent" /> Version history
            </h2>
            <ol className="mt-5 space-y-4 border-l border-border pl-6">
              {product.history.map((h) => (
                <li key={h.version} className="relative">
                  <span className="absolute -left-[1.9rem] top-1.5 size-2.5 rounded-full bg-accent" />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-medium">v{h.version}</span>
                    <span className="text-xs text-muted-foreground">{h.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{h.notes}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <Sidebar product={product} />
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold">Related tools</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProductHero({ product }: { product: Product }) {
  return (
    <div className="surface-hero grid-lines text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="rise-in">
          <nav className="flex items-center gap-2 text-xs text-navy-foreground/60">
            <Link to="/products" className="hover:text-accent">
              Products
            </Link>
            <span>/</span>
            <Link
              to="/products"
              search={{ category: product.category }}
              className="hover:text-accent"
            >
              {categoryName(product.category)}
            </Link>
          </nav>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{product.title}</h1>
          <p className="mt-4 max-w-xl leading-relaxed text-navy-foreground/70">
            {product.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-navy-foreground/70">
                {product.rating.toFixed(1)} ({product.reviewsCount} reviews)
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-navy-foreground/70">
              <Download className="size-4" />
              {product.downloads.toLocaleString()} downloads
            </span>
            <span className="rounded-md border border-navy-foreground/20 px-2 py-1 font-mono text-xs">
              v{product.version}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.compatibility.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy-foreground/20 bg-navy-foreground/5 px-3 py-1 text-xs"
              >
                <Cpu className="size-3.5 text-accent" /> {c}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-navy-foreground/15 shadow-2xl">
          <img
            src={product.image}
            alt={`${product.title} main interface`}
            width={1400}
            height={900}
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold">Screenshots</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-border">
        <img
          src={product.screenshots[active]}
          alt={`${product.title} screenshot ${active + 1}`}
          loading="lazy"
          width={1400}
          height={900}
          className="w-full object-cover"
        />
      </div>
      <div className="mt-3 flex gap-3">
        {product.screenshots.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show screenshot ${i + 1}`}
            className={
              "h-16 w-24 overflow-hidden rounded-md border transition-colors " +
              (i === active ? "border-accent" : "border-border hover:border-accent/50")
            }
          >
            <img
              src={s}
              alt=""
              loading="lazy"
              width={1400}
              height={900}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function Reviews({ product }: { product: Product }) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold">Reviews &amp; ratings</h2>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2">
          <span className="font-display text-2xl font-semibold">{product.rating.toFixed(1)}</span>
          <div>
            <Stars rating={product.rating} />
            <p className="text-xs text-muted-foreground">{product.reviewsCount} verified reviews</p>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {product.reviews.map((r, i) => (
          <article key={i} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{r.author}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
              <div className="text-right">
                <Stars rating={r.rating} />
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Sidebar({ product }: { product: Product }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="font-display text-3xl font-semibold">{formatPrice(product.price)}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {product.price === 0
            ? "Free download, unlimited seats"
            : "Single seat, 12 months of updates"}
        </p>

        <Button
          variant="teal"
          size="xl"
          className="mt-5 w-full"
          onClick={() => toast.success(`Preparing ${product.title} v${product.version} download…`)}
        >
          <Download className="size-4" /> Download v{product.version}
        </Button>

        <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Category</dt>
            <dd className="text-right font-medium">{categoryName(product.category)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Version</dt>
            <dd className="font-mono">{product.version}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Updated</dt>
            <dd>{product.updated}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Downloads</dt>
            <dd>{product.downloads.toLocaleString()}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-start gap-2 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
          Signed installer, virus-scanned on every release.
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-base font-semibold">Documentation</h3>
        <ul className="mt-4 space-y-2">
          {product.docs.map((d) => (
            <li key={d.label}>
              <button
                onClick={() => toast.success(`Downloading ${d.label}`)}
                className="flex w-full items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-left text-sm transition-colors hover:border-accent hover:bg-secondary"
              >
                <FileText className="size-4 text-accent" />
                <span className="flex-1">{d.label}</span>
                <span className="text-xs text-muted-foreground">{d.size}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

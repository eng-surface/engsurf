import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Tool Categories — EngSurface" },
      {
        name: "description",
        content:
          "CATIA automation, Siemens NX automation, Excel VBA automation and Python engineering applications.",
      },
      { property: "og:title", content: "Tool Categories — EngSurface" },
      {
        property: "og:description",
        content: "Explore EngSurface automation categories for CAD, manufacturing and analysis.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Categories</p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Four automation disciplines
        </h1>
        <p className="mt-3 text-muted-foreground">
          Each category follows the same release process: documented, versioned and validated
          against current software builds.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <Link
              key={c.id}
              to="/products"
              search={{ category: c.id }}
              className="card-lift group rounded-xl border border-border bg-card p-7"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-navy px-2.5 py-1 font-mono text-[11px] text-navy-foreground">
                  {c.short}
                </span>
                <span className="text-xs text-muted-foreground">{c.tools} tools planned</span>
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold">{c.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {count} available now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

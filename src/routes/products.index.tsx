import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products, type CategoryId } from "@/data/products";

type PriceFilter = "all" | "free" | "paid";
type SortKey = "popular" | "rating" | "newest";

interface ProductSearch {
  q?: string;
  category?: CategoryId | "all";
  price?: PriceFilter;
  sort?: SortKey;
}

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    q: typeof search.q === "string" ? search.q.slice(0, 80) : undefined,
    category: (search.category as ProductSearch["category"]) ?? undefined,
    price: (search.price as PriceFilter) ?? undefined,
    sort: (search.sort as SortKey) ?? undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Engineering Tools — EngSurface" },
      {
        name: "description",
        content:
          "Search and filter automation tools for CATIA, Siemens NX, Excel VBA and Python by category, price and rating.",
      },
      { property: "og:title", content: "All Engineering Tools — EngSurface" },
      {
        property: "og:description",
        content: "Browse the full EngSurface catalogue of engineering automation tools.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const q = search.q ?? "";
  const category = search.category ?? "all";
  const price = search.price ?? "all";
  const sort = search.sort ?? "popular";

  const setSearch = (patch: ProductSearch) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesTerm =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.tagline.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      const matchesCategory = category === "all" || p.category === category;
      const matchesPrice =
        price === "all" || (price === "free" ? p.price === 0 : p.price > 0);
      return matchesTerm && matchesCategory && matchesPrice;
    });
    return [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "newest") return b.updated.localeCompare(a.updated);
      return b.downloads - a.downloads;
    });
  }, [q, category, price, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Catalogue</p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Engineering automation tools
        </h1>
        <p className="mt-3 text-muted-foreground">
          {products.length} published tools, verified against current CATIA, NX, Excel and Python
          releases.
        </p>
      </header>

      <div className="mt-8 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setSearch({ q: e.target.value })}
            placeholder="Search tools, e.g. drawing, BOM, tolerance…"
            aria-label="Search products"
            maxLength={80}
            className="h-11 pl-9"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 pr-1 text-xs font-medium text-muted-foreground">
            <SlidersHorizontal className="size-3.5" /> Category
          </span>
          <FilterChip active={category === "all"} onClick={() => setSearch({ category: "all" })}>
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              active={category === c.id}
              onClick={() => setSearch({ category: c.id })}
            >
              {c.short}
            </FilterChip>
          ))}

          <span className="ml-2 pr-1 text-xs font-medium text-muted-foreground">Price</span>
          {(["all", "free", "paid"] as PriceFilter[]).map((p) => (
            <FilterChip key={p} active={price === p} onClick={() => setSearch({ price: p })}>
              {p === "all" ? "All" : p === "free" ? "Free" : "Paid"}
            </FilterChip>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="sort" className="text-xs font-medium text-muted-foreground">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSearch({ sort: e.target.value as SortKey })}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="popular">Most downloaded</option>
              <option value="rating">Highest rated</option>
              <option value="newest">Recently updated</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "tool" : "tools"} found
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="font-display text-lg font-semibold">No tools match those filters</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a broader search, or request the tool you need.
          </p>
          <Button
            variant="navy"
            className="mt-5"
            onClick={() => setSearch({ q: "", category: "all", price: "all" })}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
        (active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

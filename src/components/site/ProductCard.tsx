import { Link } from "@tanstack/react-router";
import { Star, Download } from "lucide-react";
import { categoryName, formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="card-lift group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={`${product.title} interface preview`}
          loading="lazy"
          width={1400}
          height={900}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-navy/90 px-2 py-1 text-[11px] font-medium text-navy-foreground backdrop-blur">
          {categoryName(product.category)}
        </span>
        <span
          className={
            "absolute right-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold " +
            (product.price === 0
              ? "bg-accent text-accent-foreground"
              : "bg-background/90 text-foreground")
          }
        >
          {formatPrice(product.price)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold leading-snug">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.tagline}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-medium text-foreground">
            <Star className="size-3.5 fill-accent text-accent" />
            {product.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Download className="size-3.5" />
            {product.downloads.toLocaleString()}
          </span>
          <span className="ml-auto font-mono text-[11px]">v{product.version}</span>
        </div>
      </div>
    </Link>
  );
}

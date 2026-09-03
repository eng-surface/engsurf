import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Hexagon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/custom-tool", label: "Custom Tool" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-navy">
            <Hexagon className="size-5 text-accent" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Eng<span className="text-accent">Surface</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/products">
              <Search className="size-4" /> Search tools
            </Link>
          </Button>
          <Button asChild variant="teal" size="sm" className="hidden sm:inline-flex">
            <Link to="/products" search={{ price: "free" }}>
              Browse free tools
            </Link>
          </Button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-border lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

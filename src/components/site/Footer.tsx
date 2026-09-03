import { Link } from "@tanstack/react-router";
import { Hexagon, Youtube, Linkedin, Github, Mail } from "lucide-react";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="surface-navy mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:pr-8">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-navy-foreground/10">
              <Hexagon className="size-5 text-accent" strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg font-semibold">
              Eng<span className="text-accent">Surface</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/65">
            Engineering automation tools for CAD, manufacturing and simulation teams. Built by
            engineers, tested in production environments.
          </p>
          <div className="mt-5 flex gap-3">
            {[Youtube, Linkedin, Github, Mail].map((Icon, i) => (
              <span
                key={i}
                className="grid size-9 place-items-center rounded-md border border-navy-foreground/15 text-navy-foreground/70 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-foreground">Categories</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/65">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/products"
                  search={{ category: c.id }}
                  className="transition-colors hover:text-accent"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-foreground">Resources</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/65">
            <li>
              <Link to="/tutorials" className="hover:text-accent">
                Video tutorials
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-accent">
                All tools
              </Link>
            </li>
            <li>
              <Link to="/custom-tool" className="hover:text-accent">
                Request a custom tool
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-foreground">Compatibility</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/65">
            <li>CATIA V5-6R2018 → R2024</li>
            <li>Siemens NX 1980 → 2412</li>
            <li>Excel 2016 → Microsoft 365</li>
            <li>Python 3.10+</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-navy-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} EngSurface. All rights reserved.</p>
          <p>CATIA, Siemens NX, Excel and Python are trademarks of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}

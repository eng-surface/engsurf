import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";

export const Route = createFileRoute("/tutorials")({
  head: () => ({
    meta: [
      { title: "Video Tutorials — EngSurface" },
      {
        name: "description",
        content:
          "Watch walkthroughs for CATIA, NX, Excel VBA and Python automation tools published by EngSurface.",
      },
      { property: "og:title", content: "Video Tutorials — EngSurface" },
      {
        property: "og:description",
        content: "Step-by-step video walkthroughs for every EngSurface automation tool.",
      },
    ],
  }),
  component: TutorialsPage,
});

function TutorialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Tutorials</p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Learn each tool in under ten minutes
        </h1>
        <p className="mt-3 text-muted-foreground">
          Every release ships with a recorded walkthrough covering installation, configuration and a
          real production example.
        </p>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {products.slice(0, 6).map((p) => (
          <article key={p.slug}>
            <div className="aspect-video overflow-hidden rounded-xl border border-border bg-navy-deep">
              <iframe
                className="size-full"
                src={`https://www.youtube.com/embed/${p.youtubeId}`}
                title={`${p.title} tutorial`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className="mt-4 font-display text-base font-semibold">{p.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

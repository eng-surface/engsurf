import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Linkedin, Youtube, Github, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — EngSurface" },
      {
        name: "description",
        content:
          "Get in touch with the EngSurface team for support, licensing questions or custom tool requests.",
      },
      { property: "og:title", content: "Contact — EngSurface" },
      {
        property: "og:description",
        content: "Reach out for support, questions or custom automation tool requests.",
      },
    ],
  }),
  component: ContactPage,
});

// ─── Schema ───────────────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

// ─── Info cards ───────────────────────────────────────────────────────────────
const infoCards = [
  {
    icon: Mail,
    title: "Email us",
    body: "Drop us a message anytime — we reply within 1 business day.",
    action: "contact@engsurface.com",
    href: "mailto:contact@engsurface.com",
  },
  {
    icon: Clock,
    title: "Response time",
    body: "Support requests are answered Monday – Friday, 9 AM – 6 PM CET.",
    action: null,
    href: null,
  },
  {
    icon: MessageSquare,
    title: "Community",
    body: "Browse the tutorials and discussions on our YouTube and LinkedIn channels.",
    action: "Follow us",
    href: "https://linkedin.com",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    // Simulate async send — replace with your real endpoint later
    await new Promise((r) => setTimeout(r, 800));
    console.log("Contact form:", data);
    toast.success("Message sent! We'll reply within 1 business day.");
    reset();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Contact</p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Get in touch</h1>
        <p className="mt-3 text-muted-foreground">
          Have a question about a tool, a licensing issue, or want to discuss a custom build?
          Fill in the form and we'll get back to you promptly.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-border bg-card p-8 shadow-sm"
          noValidate
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
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
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
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
          </div>

          {/* Subject */}
          <div className="mt-6 flex flex-col gap-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g. Question about CATIA BOM Extractor"
              {...register("subject")}
              className={errors.subject ? "border-destructive" : ""}
            />
            {errors.subject && (
              <p className="text-xs text-destructive">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="mt-6 flex flex-col gap-1.5">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              rows={6}
              placeholder="Describe your question or request in detail…"
              {...register("message")}
              className={[
                "w-full resize-none rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50",
                errors.message ? "border-destructive" : "border-input",
              ].join(" ")}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="teal"
            size="lg"
            className="mt-8 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </Button>
        </form>

        {/* ── Sidebar info ── */}
        <aside className="flex flex-col gap-5">
          {infoCards.map(({ icon: Icon, title, body, action, href }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-navy">
                <Icon className="size-5 text-accent" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              {action && href && (
                <a
                  href={href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  {action}
                </a>
              )}
            </div>
          ))}

          {/* Social links */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-base font-semibold">Follow EngSurface</h3>
            <div className="mt-4 flex gap-3">
              {[
                { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Github, href: "https://github.com", label: "GitHub" },
                { Icon: Mail, href: "mailto:contact@engsurface.com", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

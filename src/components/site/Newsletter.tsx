import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.string().trim().email("Enter a valid email address").max(255);

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="surface-hero grid-lines overflow-hidden rounded-2xl px-6 py-12 text-navy-foreground sm:px-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            New tools, every month
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy-foreground/70">
            Release notes, automation techniques and early access to beta builds. No marketing
            noise — one email per release.
          </p>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const result = emailSchema.safeParse(email);
              if (!result.success) {
                toast.error(result.error.issues[0].message);
                return;
              }
              toast.success("You're subscribed. Check your inbox to confirm.");
              setEmail("");
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              maxLength={255}
              className="h-12 border-navy-foreground/20 bg-navy-foreground/10 text-navy-foreground placeholder:text-navy-foreground/45 sm:max-w-sm"
            />
            <Button type="submit" variant="teal" size="xl">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

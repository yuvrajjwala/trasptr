import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageSquare, Plane } from "lucide-react";

import heroSuv from "@/assets/hero-suv.jpg";
import { AppScreen } from "@/components/eb/app-shell";

export const Route = createFileRoute("/_authenticated/track")({
  head: () => ({
    meta: [
      { title: "Track Your Chauffeur — Eagle Black Limo" },
      {
        name: "description",
        content:
          "Follow your assigned chauffeur, vehicle details and arrival window for your Eagle Black Limo transfer.",
      },
      { property: "og:title", content: "Track Your Chauffeur — Eagle Black Limo" },
      {
        property: "og:description",
        content: "Chauffeur, vehicle and arrival details for your transfer.",
      },
    ],
  }),
  component: Track,
});

const TIMELINE = [
  { label: "Booking confirmed", time: "08:04 AM", done: true },
  { label: "Chauffeur assigned", time: "08:12 AM", done: true },
  { label: "En route to pickup", time: "Est. 08:18 AM", done: false },
  { label: "Arrival at pickup", time: "Est. 08:30 AM", done: false },
] as const;

function Track() {
  return (
    <AppScreen>
      <div className="px-7 pt-14">
        <span className="eb-eyebrow text-[0.625rem] text-gold/85">Live status</span>
        <h1 className="mt-2.5 font-display text-[2rem] font-light leading-none tracking-tight text-foreground">
          Track Chauffeur
        </h1>
        <p className="mt-3 text-[0.875rem] text-muted-foreground">
          Arriving in approximately 12 minutes.
        </p>
      </div>

      <section className="mt-9 px-7">
        <div className="eb-elevated overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center gap-4 p-5">
            <img
              src={heroSuv}
              alt="Luxury black SUV"
              width={1024}
              height={1536}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-[0.9375rem] font-medium text-foreground">
                Marcus D.
              </h2>
              <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">
                Cadillac Escalade · EBL 214
              </p>
              <span className="mt-2 inline-flex items-center gap-2 text-[0.75rem] text-gold">
                <Plane className="h-3.5 w-3.5" strokeWidth={1.5} />
                Flight monitored
              </span>
            </div>
          </div>

          <div className="mx-5 h-px eb-hairline" />

          <div className="grid grid-cols-2 gap-3 p-5">
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-[0.8125rem] text-foreground transition-colors hover:bg-surface-raised"
            >
              <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
              Call
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-[0.8125rem] text-foreground transition-colors hover:bg-surface-raised"
            >
              <MessageSquare className="h-4 w-4 text-gold" strokeWidth={1.5} />
              Message
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10 px-7">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <span className="eb-eyebrow text-[0.625rem] text-gold/85">Journey</span>
          <ol className="mt-6 space-y-6">
            {TIMELINE.map(({ label, time, done }) => (
              <li key={label} className="flex items-start gap-4">
                <span
                  className={
                    done
                      ? "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold"
                      : "mt-1.5 h-2 w-2 shrink-0 rounded-full border border-border"
                  }
                />
                <span className="flex-1 text-[0.875rem] text-foreground">
                  {label}
                </span>
                <span className="text-[0.75rem] text-muted-foreground">{time}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </AppScreen>
  );
}

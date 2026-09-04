import { createFileRoute } from "@tanstack/react-router";
import { Plane, Building2, Clock } from "lucide-react";

import { AppScreen } from "@/components/eb/app-shell";

export const Route = createFileRoute("/_authenticated/rides")({
  head: () => ({
    meta: [
      { title: "My Rides — Eagle Black Limo" },
      {
        name: "description",
        content:
          "Review upcoming and completed chauffeured journeys with Eagle Black Limo across Chicago and the western suburbs.",
      },
      { property: "og:title", content: "My Rides — Eagle Black Limo" },
      {
        property: "og:description",
        content: "Upcoming and completed chauffeured journeys at a glance.",
      },
    ],
  }),
  component: Rides,
});

const RIDES = [
  {
    title: "O'Hare International Airport",
    meta: "Friday, Sep 18 · 08:30 AM",
    route: "Oak Brook, IL → Terminal 1",
    status: "Confirmed",
    Icon: Plane,
  },
  {
    title: "Corporate Transfer",
    meta: "Tuesday, Sep 22 · 07:15 AM",
    route: "Hinsdale, IL → 300 N LaSalle",
    status: "Scheduled",
    Icon: Building2,
  },
  {
    title: "Hourly Chauffeur · 4 hrs",
    meta: "Saturday, Aug 30 · 05:00 PM",
    route: "Downtown Chicago",
    status: "Completed",
    Icon: Clock,
  },
] as const;

function Rides() {
  return (
    <AppScreen>
      <div className="px-7 pt-14">
        <span className="eb-eyebrow text-[0.625rem] text-gold/85">Itinerary</span>
        <h1 className="mt-2.5 font-display text-[2rem] font-light leading-none tracking-tight text-foreground">
          My Rides
        </h1>
        <p className="mt-3 text-[0.875rem] text-muted-foreground">
          Upcoming and past chauffeured journeys.
        </p>
      </div>

      <div className="mt-9 space-y-3 px-7">
        {RIDES.map(({ title, meta, route, status, Icon }) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background text-gold">
                <Icon className="h-[17px] w-[17px]" strokeWidth={1.25} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="min-w-0 text-[0.9375rem] font-medium leading-snug text-foreground">
                    {title}
                  </h2>
                  <span className="shrink-0 rounded-full border border-border px-3 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {status}
                  </span>
                </div>
                <p className="mt-2 text-[0.8125rem] text-muted-foreground">{meta}</p>
                <p className="mt-1.5 text-[0.8125rem] text-foreground/80">{route}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppScreen>
  );
}

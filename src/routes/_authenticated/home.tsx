import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpDown,
  Bell,
  Building2,
  CalendarClock,
  ChevronRight,
  Clock,
  Headphones,
  MapPin,
  Navigation,
  Plane,
  Route as RouteIcon,
  ShieldCheck,
  Sofa,
  Sparkles,
} from "lucide-react";

import heroSuv from "@/assets/hero-suv.jpg";
import { supabase } from "@/integrations/supabase/client";
import { AppScreen, SectionHeading } from "@/components/eb/app-shell";
import { GoldButton } from "@/components/eb/ui";
import { formatPickupDate, formatPickupTime, type BookingRow } from "@/lib/bookings";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({
    meta: [
      { title: "Your Chauffeur Dashboard — Eagle Black Limo" },
      {
        name: "description",
        content:
          "Book a private chauffeur, review your next airport transfer and manage executive travel across Chicago and the western suburbs.",
      },
      {
        property: "og:title",
        content: "Your Chauffeur Dashboard — Eagle Black Limo",
      },
      {
        property: "og:description",
        content:
          "Book a private chauffeur and manage executive travel with Eagle Black Limo.",
      },
    ],
  }),
  component: HomeScreen,
});

const SERVICES = [
  {
    title: "Airport Transfer",
    description: "O'Hare & Midway pickups",
    Icon: Plane,
  },
  {
    title: "Point-to-Point",
    description: "Travel directly to your destination",
    Icon: Navigation,
  },
  {
    title: "Corporate Travel",
    description: "Professional travel, simplified",
    Icon: Building2,
  },
  {
    title: "Hourly Chauffeur",
    description: "Flexible travel on your schedule",
    Icon: Clock,
  },
  {
    title: "Weddings & Occasions",
    description: "Arrive in exceptional style",
    Icon: Sparkles,
  },
  {
    title: "Long-Distance Travel",
    description: "Comfort beyond the city",
    Icon: RouteIcon,
  },
] as const;

const QUICK_ACTIONS = [
  { title: "Book Airport Ride", Icon: Plane, to: "/booking" },
  { title: "Track Chauffeur", Icon: MapPin, to: "/track" },
  { title: "Book Hourly", Icon: CalendarClock, to: "/booking" },
  { title: "Get Support", Icon: Headphones, to: "/profile" },
] as const;

const TRUST = [
  { title: "Professional Chauffeurs", Icon: ShieldCheck },
  { title: "Flight Monitoring", Icon: Plane },
  { title: "Luxury Comfort", Icon: Sofa },
] as const;

function AddressRow({
  kind,
  label,
  value,
}: {
  kind: "pickup" | "destination";
  label: string;
  value: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-raised/60"
    >
      <span
        className={
          kind === "pickup"
            ? "h-2 w-2 shrink-0 rounded-full bg-gold"
            : "h-2 w-2 shrink-0 rounded-[2px] border border-ivory/70"
        }
      />
      <span className="min-w-0 flex-1">
        <span className="eb-eyebrow block text-[0.5625rem] text-muted-foreground">
          {label}
        </span>
        <span className="mt-1.5 block truncate text-[0.9375rem] text-foreground">
          {value}
        </span>
      </span>
      <ChevronRight
        className="h-4 w-4 shrink-0 text-muted-foreground"
        strokeWidth={1.5}
      />
    </button>
  );
}

function HomeScreen() {
  return (
    <AppScreen>
      {/* Top bar */}
      <header className="flex items-start justify-between gap-4 px-7 pt-14">
        <div className="min-w-0">
          <span className="eb-eyebrow text-[0.625rem] text-gold/85">
            Friday, Sep 4
          </span>
          <h1 className="mt-2.5 font-display text-[2rem] font-light leading-none tracking-tight text-foreground">
            Good Morning, Alex
          </h1>
          <p className="mt-3 text-[0.875rem] text-muted-foreground">
            Where would you like to go?
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-gold"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-gold" />
          </Link>
          <Link
            to="/profile"
            aria-label="Profile"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-surface-raised font-display text-[0.9375rem] tracking-widest text-gold"
          >
            AR
          </Link>
        </div>
      </header>

      {/* Booking card */}
      <section className="mt-9 px-7">
        <div className="eb-elevated overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="px-5 pb-5 pt-6">
            <h2 className="font-display text-[1.625rem] font-light leading-none tracking-tight text-foreground">
              Book Your Chauffeur
            </h2>
            <p className="mt-2.5 text-[0.8125rem] text-muted-foreground">
              Luxury travel, on your schedule
            </p>
          </div>

          <div className="relative mx-5 rounded-xl border border-border bg-background/60">
            <AddressRow
              kind="pickup"
              label="Pickup"
              value="Oak Brook, IL 60523"
            />
            <div className="mx-5 h-px eb-hairline" />
            <AddressRow
              kind="destination"
              label="Destination"
              value="Add destination"
            />
            <button
              type="button"
              aria-label="Swap pickup and destination"
              className="absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface-raised text-gold transition-colors hover:bg-surface"
            >
              <ArrowUpDown className="h-[15px] w-[15px]" strokeWidth={1.5} />
            </button>
          </div>

          <div className="px-5 pb-6 pt-5">
            <Link to="/booking" className="block">
              <GoldButton>Plan a Ride</GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mt-12">
        <div className="px-7">
          <SectionHeading eyebrow="Trip Services" title="Choose Your Service" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 px-7">
          {SERVICES.map(({ title, description, Icon }) => (
            <Link
              key={title}
              to="/booking"
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:bg-surface-raised"
            >
              <Icon className="h-5 w-5 text-gold" strokeWidth={1.25} />
              <span className="mt-5 block text-[0.875rem] font-medium leading-snug text-foreground">
                {title}
              </span>
              <span className="mt-1.5 block text-[0.75rem] leading-relaxed text-muted-foreground">
                {description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Next ride */}
      <section className="mt-12 px-7">
        <SectionHeading eyebrow="Upcoming" title="Your Next Ride" />
        <article className="eb-elevated mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-start gap-4 p-5">
            <img
              src={heroSuv}
              alt="Luxury black SUV"
              width={1024}
              height={1536}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 text-[0.9375rem] font-medium leading-snug text-foreground">
                  Chicago O&rsquo;Hare Int&rsquo;l Airport
                </h3>
                <span className="shrink-0 rounded-full border border-gold/40 px-3 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  Confirmed
                </span>
              </div>
              <p className="mt-3 text-[0.8125rem] text-muted-foreground">
                Friday, Sep 18 &nbsp;·&nbsp; Pickup 08:30 AM
              </p>
            </div>
          </div>

          <div className="mx-5 h-px eb-hairline" />

          <div className="px-5 py-5">
            <div className="flex gap-4">
              <div className="flex flex-col items-center pt-1.5">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span className="my-1 w-px flex-1 bg-border" />
                <span className="h-2 w-2 rounded-[2px] border border-ivory/70" />
              </div>
              <div className="flex-1 space-y-5">
                <div>
                  <span className="eb-eyebrow block text-[0.5625rem] text-muted-foreground">
                    Pickup
                  </span>
                  <span className="mt-1 block text-[0.875rem] text-foreground">
                    Oak Brook, IL
                  </span>
                </div>
                <div>
                  <span className="eb-eyebrow block text-[0.5625rem] text-muted-foreground">
                    Destination
                  </span>
                  <span className="mt-1 block text-[0.875rem] text-foreground">
                    O&rsquo;Hare International Airport
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-[0.75rem] text-muted-foreground">
                <Plane className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                Flight monitored
              </span>
              <Link
                to="/rides"
                className="inline-flex h-10 items-center rounded-xl border border-gold/40 px-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
              >
                View Ride
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* Quick actions */}
      <section className="mt-12 px-7">
        <SectionHeading eyebrow="Shortcuts" title="Quick Actions" />
        <div className="mt-6 grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map(({ title, Icon, to }) => (
            <Link
              key={title}
              to={to}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-4 text-left transition-colors hover:bg-surface-raised"
            >
              <Icon className="h-[17px] w-[17px] shrink-0 text-gold" strokeWidth={1.25} />
              <span className="text-[0.8125rem] leading-snug text-foreground">
                {title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mt-12 px-7">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <span className="eb-eyebrow text-[0.625rem] text-gold/85">
            Why Eagle Black Limo
          </span>
          <div className="mt-6 space-y-5">
            {TRUST.map(({ title, Icon }) => (
              <div key={title} className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background">
                  <Icon className="h-[17px] w-[17px] text-gold" strokeWidth={1.25} />
                </span>
                <span className="text-[0.875rem] text-foreground">{title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="eb-gold-rule mx-auto mt-10 w-16" />
      </section>
    </AppScreen>
  );
}

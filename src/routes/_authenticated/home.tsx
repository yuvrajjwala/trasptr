import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpDown,
  Bell,
  Building2,
  CalendarClock,
  ChevronRight,
  Flag,
  Gem,
  Headphones,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Sofa,
  Sparkles,
  Wine,
} from "lucide-react";

import heroSuv from "@/assets/hero-suv.jpg";
import { supabase } from "@/integrations/supabase/client";
import { AppScreen, SectionHeading } from "@/components/eb/app-shell";
import { GoldButton } from "@/components/eb/ui";
import { formatPickupDate, formatPickupTime, type BookingRow } from "@/lib/bookings";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({
    meta: [
      { title: "Your Chauffeur Dashboard — TRNSPTR" },
      {
        name: "description",
        content:
          "Book a private chauffeur, review your next airport transfer and manage executive travel across Chicago and the western suburbs.",
      },
      {
        property: "og:title",
        content: "Your Chauffeur Dashboard — TRNSPTR",
      },
      {
        property: "og:description",
        content:
          "Book a private chauffeur and manage executive travel with TRNSPTR.",
      },
    ],
  }),
  component: HomeScreen,
});

const SERVICES = [
  { title: "Airport Transfer", description: "Call for More Information", Icon: Plane },
  { title: "Business Service", description: "Call for More Information", Icon: Building2 },
  { title: "Golf Outings", description: "Call for More Information", Icon: Flag },
  { title: "Special Occasions", description: "Call for More Information", Icon: Sparkles },
  { title: "Weddings", description: "Call for More Information", Icon: Gem },
  { title: "Wine Tours", description: "Call for More Information", Icon: Wine },
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
  const { user } = Route.useRouteContext();
  const email = user.email ?? "Member";
  const name = email.split("@")[0] ?? email;
  const initials = name.slice(0, 2).toUpperCase();
  const greetingHour = new Date().getHours();
  const greeting =
    greetingHour < 12 ? "Good Morning" : greetingHour < 18 ? "Good Afternoon" : "Good Evening";
  const dateLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const { data: nextRide } = useQuery({
    queryKey: ["next-ride"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .gte("pickup_at", new Date().toISOString())
        .order("pickup_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as BookingRow | null;
    },
  });

  return (
    <AppScreen>
      {/* Top bar */}
      <header className="flex items-start justify-between gap-4 px-7 pt-14">
        <div className="min-w-0">
          <span className="eb-eyebrow text-[0.625rem] text-gold/85">
            {dateLabel}
          </span>
          <h1 className="mt-2.5 font-display text-[2rem] font-light leading-none tracking-tight text-foreground">
            {greeting}, {name}
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
          </Link>
          <Link
            to="/profile"
            aria-label="Profile"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-surface-raised font-display text-[0.9375rem] tracking-widest text-gold"
          >
            {initials}
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
          <p className="mt-3 max-w-[20rem] text-[0.875rem] leading-relaxed text-muted-foreground">
            White Glove Transportation services for all occasions.
          </p>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 px-7">
          {SERVICES.map(({ title, description, Icon }) => (
            <Link
              key={title}
              to="/booking"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 text-left transition-all duration-300 hover:border-gold/40 hover:bg-surface-raised hover:shadow-[0_18px_44px_-30px_oklch(0.7054_0.1524_236.9/0.6)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 eb-gold-rule group-hover:opacity-100"
              />
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background text-gold transition-colors duration-300 group-hover:border-gold/45">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.25} />
              </span>
              <h3 className="mt-5 text-[0.875rem] font-medium leading-snug text-foreground">
                {title}
              </h3>
              <span className="mt-auto flex items-center gap-1.5 pt-4 text-[0.6875rem] leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-gold/90">
                <Phone className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                {description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Next ride */}
      <section className="mt-12 px-7">
        <SectionHeading eyebrow="Upcoming" title="Your Next Ride" />
        {nextRide ? (
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
                    {nextRide.service_title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-gold/40 px-3 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    {nextRide.status}
                  </span>
                </div>
                <p className="mt-3 text-[0.8125rem] text-muted-foreground">
                  {formatPickupDate(nextRide.pickup_at)} &nbsp;·&nbsp; Pickup{" "}
                  {formatPickupTime(nextRide.pickup_at)}
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
                      {nextRide.pickup}
                    </span>
                  </div>
                  <div>
                    <span className="eb-eyebrow block text-[0.5625rem] text-muted-foreground">
                      Destination
                    </span>
                    <span className="mt-1 block text-[0.875rem] text-foreground">
                      {nextRide.destination ?? "On your schedule"}
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
        ) : (
          <article className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface p-6 text-center">
            <p className="text-[0.9375rem] text-foreground">No upcoming rides.</p>
            <p className="mt-2 text-[0.8125rem] text-muted-foreground">
              Arrange a chauffeured journey and it will appear here.
            </p>
            <Link to="/booking" className="mt-6 block">
              <GoldButton>Plan a Ride</GoldButton>
            </Link>
          </article>
        )}
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
            Why TRNSPTR
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

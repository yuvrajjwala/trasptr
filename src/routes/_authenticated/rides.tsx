import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2, CalendarClock, Clock, Plane } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { AppScreen } from "@/components/eb/app-shell";
import { GoldButton } from "@/components/eb/ui";
import { Link } from "@tanstack/react-router";
import {
  formatPickupDate,
  formatPickupTime,
  isUpcoming,
  type BookingRow,
} from "@/lib/bookings";

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

function serviceIcon(service: string) {
  switch (service) {
    case "airport":
      return Plane;
    case "corporate":
      return Building2;
    case "hourly":
      return Clock;
    default:
      return CalendarClock;
  }
}

function RideCard({ booking }: { booking: BookingRow }) {
  const Icon = serviceIcon(booking.service);
  const upcoming = isUpcoming(booking.pickup_at);
  const route = booking.destination
    ? `${booking.pickup} → ${booking.destination}`
    : booking.pickup;

  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background text-gold">
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.25} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="min-w-0 text-[0.9375rem] font-medium leading-snug text-foreground">
              {booking.service_title}
            </h2>
            <span
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em]",
                upcoming
                  ? "border-gold/40 text-gold"
                  : "border-border text-muted-foreground",
              )}
            >
              {upcoming ? booking.status : "Completed"}
            </span>
          </div>
          <p className="mt-2 text-[0.8125rem] text-muted-foreground">
            {formatPickupDate(booking.pickup_at)} · {formatPickupTime(booking.pickup_at)}
          </p>
          <p className="mt-1.5 text-[0.8125rem] text-foreground/80">{route}</p>
        </div>
      </div>
    </article>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Rides() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("pickup_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BookingRow[];
    },
  });

  const upcoming =
    bookings?.filter((b) => isUpcoming(b.pickup_at)).reverse() ?? [];
  const past = bookings?.filter((b) => !isUpcoming(b.pickup_at)) ?? [];

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

      {isLoading ? (
        <div className="mt-9 px-7 text-[0.875rem] text-muted-foreground">
          Loading your rides…
        </div>
      ) : null}

      {!isLoading && bookings && bookings.length === 0 ? (
        <div className="mt-9 px-7">
          <div className="rounded-2xl border border-border bg-surface p-6 text-center">
            <p className="text-[0.9375rem] text-foreground">
              No journeys yet.
            </p>
            <p className="mt-2 text-[0.8125rem] text-muted-foreground">
              Arrange your first chauffeured ride and it will appear here.
            </p>
            <Link to="/booking" className="mt-6 block">
              <GoldButton>Plan a Ride</GoldButton>
            </Link>
          </div>
        </div>
      ) : null}

      {upcoming.length > 0 ? (
        <section className="mt-9 px-7">
          <span className="eb-eyebrow text-[0.625rem] text-muted-foreground">
            Upcoming
          </span>
          <div className="mt-4 space-y-3">
            {upcoming.map((b) => (
              <RideCard key={b.id} booking={b} />
            ))}
          </div>
        </section>
      ) : null}

      {past.length > 0 ? (
        <section className="mt-10 px-7">
          <span className="eb-eyebrow text-[0.625rem] text-muted-foreground">
            Completed
          </span>
          <div className="mt-4 space-y-3">
            {past.map((b) => (
              <RideCard key={b.id} booking={b} />
            ))}
          </div>
        </section>
      ) : null}
    </AppScreen>
  );
}

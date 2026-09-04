import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Building2, CalendarClock, Clock, Plane, Receipt } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { AppScreen } from "@/components/eb/app-shell";
import { GoldButton } from "@/components/eb/ui";
import { Segmented } from "@/components/eb/ride-ui";
import { cn } from "@/lib/utils";
import { DEMO_RIDES, type DemoRide } from "@/lib/demo";
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
          "Review upcoming, completed and cancelled chauffeured journeys with Eagle Black Limo across Chicago and the western suburbs.",
      },
      { property: "og:title", content: "My Rides — Eagle Black Limo" },
      {
        property: "og:description",
        content: "Upcoming, completed and cancelled journeys at a glance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Rides,
});

const TABS = ["Upcoming", "Completed", "Cancelled"] as const;
type Tab = (typeof TABS)[number];

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

function bookingToRide(b: BookingRow): DemoRide {
  return {
    id: b.id,
    reference: `EBL-${b.id.slice(0, 5).toUpperCase()}`,
    title: b.service_title,
    pickup: b.pickup,
    destination: b.destination ?? "On your schedule",
    date: formatPickupDate(b.pickup_at),
    time: formatPickupTime(b.pickup_at),
    vehicle: "Luxury Black SUV",
    status: "confirmed",
    amount: b.estimate_total,
    ...(b.flight ? { flight: b.flight } : {}),
    airport: b.service === "airport",
  };
}

function RideCard({ ride }: { ride: DemoRide }) {
  const Icon = ride.airport ? Plane : CalendarClock;
  const cancelled = ride.status === "cancelled";
  const completed = ride.status === "completed";

  return (
    <article
      className={cn(
        "rounded-2xl border bg-surface p-5 transition-opacity",
        cancelled ? "border-border/60 opacity-55" : "border-border",
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background",
            cancelled ? "text-muted-foreground" : "text-gold",
          )}
        >
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.25} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="min-w-0 text-[0.9375rem] font-medium leading-snug text-foreground">
              {ride.title}
            </h2>
            <span
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em]",
                ride.status === "confirmed"
                  ? "border-gold/40 text-gold"
                  : "border-border text-muted-foreground",
              )}
            >
              {ride.status}
            </span>
          </div>
          <p className="mt-2 text-[0.8125rem] text-foreground/80">
            {ride.pickup} → {ride.destination}
          </p>
          <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">
            {ride.date} • {ride.time}
          </p>

          {completed ? (
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/5 pt-4">
              <span className="text-[0.75rem] text-muted-foreground">
                {ride.vehicle} · ${ride.amount.toFixed(2)}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-gold"
              >
                <Receipt className="h-3.5 w-3.5" strokeWidth={1.5} />
                View Receipt
              </button>
            </div>
          ) : null}

          {!completed && !cancelled ? (
            <Link
              to="/ride-details"
              className="mt-4 inline-block text-[0.75rem] uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-soft"
            >
              View Details
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function Rides() {
  const [tab, setTab] = useState<Tab>("Upcoming");

  const { data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("pickup_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as BookingRow[];
    },
  });

  const saved = (bookings ?? [])
    .filter((b) => isUpcoming(b.pickup_at))
    .map(bookingToRide);

  const upcoming = [
    ...saved,
    ...DEMO_RIDES.filter((r) => r.status === "confirmed"),
  ];
  const completed = DEMO_RIDES.filter((r) => r.status === "completed");
  const cancelled = DEMO_RIDES.filter((r) => r.status === "cancelled");

  const list =
    tab === "Upcoming" ? upcoming : tab === "Completed" ? completed : cancelled;

  return (
    <AppScreen>
      <div className="px-7 pt-14">
        <span className="eb-eyebrow text-[0.625rem] text-gold/85">Itinerary</span>
        <h1 className="mt-2.5 font-display text-[2rem] font-light leading-none tracking-tight text-foreground">
          My Rides
        </h1>
        <p className="mt-3 text-[0.875rem] text-muted-foreground">
          Upcoming, completed and cancelled chauffeured journeys.
        </p>
      </div>

      <div className="mt-7 px-7">
        <Segmented options={TABS} value={tab} onChange={setTab} />
      </div>

      <div className="mt-6 space-y-3 px-7">
        {list.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-6 text-center">
            <p className="text-[0.9375rem] text-foreground">
              Nothing here yet.
            </p>
            <p className="mt-2 text-[0.8125rem] text-muted-foreground">
              Arrange a chauffeured ride and it will appear in this list.
            </p>
            <Link to="/booking" className="mt-6 block">
              <GoldButton>Plan a Ride</GoldButton>
            </Link>
          </div>
        ) : (
          list.map((ride) => <RideCard key={ride.id} ride={ride} />)
        )}
      </div>
    </AppScreen>
  );
}

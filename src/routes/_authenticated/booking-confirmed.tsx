import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Plane } from "lucide-react";

import { AppScreen } from "@/components/eb/app-shell";
import { GoldButton, OutlineButton } from "@/components/eb/ui";
import {
  DetailRow,
  Panel,
  RIDE_TIMELINE,
  StatusTimeline,
} from "@/components/eb/ride-ui";
import { FEATURED_RIDE, PAYMENT_SUMMARY, ESTIMATED_TOTAL } from "@/lib/demo";

export const Route = createFileRoute("/_authenticated/booking-confirmed")({
  head: () => ({
    meta: [
      { title: "Reservation Confirmed — East Wind Limo" },
      {
        name: "description",
        content:
          "Your chauffeur is reserved. Review your booking reference, itinerary, vehicle and payment summary.",
      },
      {
        property: "og:title",
        content: "Reservation Confirmed — East Wind Limo",
      },
      {
        property: "og:description",
        content: "Booking reference, itinerary, vehicle and payment summary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookingConfirmed,
});

function BookingConfirmed() {
  const ride = FEATURED_RIDE;

  return (
    <AppScreen>
      <div className="flex flex-col items-center px-7 pt-16 text-center">
        <span className="relative grid h-20 w-20 place-items-center rounded-full border border-gold/35 bg-surface">
          <span className="absolute inset-[-10px] rounded-full border border-gold/12" />
          <Check className="h-8 w-8 text-gold" strokeWidth={1.1} />
        </span>
        <span className="mt-8 eb-eyebrow text-[0.625rem] text-gold/85">
          Confirmed
        </span>
        <h1 className="mt-3 font-display text-[2.125rem] font-light leading-tight tracking-tight text-foreground">
          Your Chauffeur
          <br />
          Is Reserved
        </h1>
        <p className="mt-4 text-[0.875rem] leading-relaxed text-muted-foreground">
          A confirmation has been sent to your inbox. We look forward to
          receiving you.
        </p>
        <span className="mt-7 rounded-full border border-gold/35 px-5 py-2 text-[0.75rem] uppercase tracking-[0.2em] text-gold">
          {ride.reference}
        </span>
      </div>

      <div className="mt-10 space-y-4 px-7">
        <Panel eyebrow="Itinerary">
          <div className="divide-y divide-white/5">
            <DetailRow label="Date" value={ride.date} />
            <DetailRow label="Pickup Time" value={ride.time} />
            <DetailRow label="Pickup" value={ride.pickup} />
            <DetailRow label="Destination" value={ride.destination} />
            <DetailRow label="Vehicle" value={ride.vehicle} />
            {ride.flight ? (
              <DetailRow label="Flight" value={ride.flight} />
            ) : null}
          </div>
        </Panel>

        <Panel eyebrow="Status">
          <StatusTimeline steps={RIDE_TIMELINE} current={0} />
        </Panel>

        <Panel eyebrow="Payment">
          <div className="divide-y divide-white/5">
            {PAYMENT_SUMMARY.map((line) => (
              <DetailRow key={line.label} label={line.label} value={line.value} />
            ))}
            <DetailRow label="Total" value={ESTIMATED_TOTAL} emphasis />
          </div>
        </Panel>

        {ride.airport ? (
          <div className="flex items-start gap-4 rounded-2xl border border-gold/25 bg-surface-raised p-5">
            <Plane className="mt-0.5 h-[17px] w-[17px] shrink-0 text-gold" strokeWidth={1.25} />
            <div>
              <p className="text-[0.875rem] text-foreground">
                Your flight will be monitored
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                We track {ride.flight} and adjust your pickup automatically for
                delays, at no extra cost.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-9 space-y-3 px-7">
        <Link to="/ride-details" className="block">
          <GoldButton>View My Ride</GoldButton>
        </Link>
        <Link to="/home" className="block">
          <OutlineButton>Back to Home</OutlineButton>
        </Link>
      </div>
    </AppScreen>
  );
}

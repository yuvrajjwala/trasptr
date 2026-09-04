import { createFileRoute, Link } from "@tanstack/react-router";
import { Headphones, PencilLine, Plane, XCircle } from "lucide-react";

import { AppScreen } from "@/components/eb/app-shell";
import { GoldButton } from "@/components/eb/ui";
import {
  DetailRow,
  Panel,
  RIDE_TIMELINE,
  ScreenHeader,
  StatusTimeline,
} from "@/components/eb/ride-ui";
import { FEATURED_RIDE, PAYMENT_SUMMARY, ESTIMATED_TOTAL } from "@/lib/demo";

export const Route = createFileRoute("/_authenticated/ride-details")({
  head: () => ({
    meta: [
      { title: "Ride Details — Eagle Black Limo" },
      {
        name: "description",
        content:
          "Full itinerary, vehicle, flight information, add-ons and payment summary for your Eagle Black Limo reservation.",
      },
      { property: "og:title", content: "Ride Details — Eagle Black Limo" },
      {
        property: "og:description",
        content: "Itinerary, vehicle, add-ons and payment summary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RideDetails,
});

function RideDetails() {
  const ride = FEATURED_RIDE;

  return (
    <AppScreen>
      <ScreenHeader
        eyebrow={ride.reference}
        title="Ride Details"
        description={ride.title}
        backTo="/rides"
      />

      <div className="mt-9 space-y-4 px-7">
        <Panel eyebrow="Booking Status">
          <StatusTimeline steps={RIDE_TIMELINE} current={0} />
        </Panel>

        <Panel eyebrow="Pickup & Destination">
          <div className="space-y-5">
            <div className="flex gap-4">
              <span className="mt-1.5 flex flex-col items-center">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span className="my-1 h-10 w-px bg-border" />
                <span className="h-2 w-2 rounded-full border border-gold" />
              </span>
              <div className="flex-1 space-y-6">
                <div>
                  <span className="eb-eyebrow text-[0.5625rem] text-muted-foreground">
                    Pickup
                  </span>
                  <p className="mt-1.5 text-[0.875rem] text-foreground">
                    {ride.pickup}
                  </p>
                </div>
                <div>
                  <span className="eb-eyebrow text-[0.5625rem] text-muted-foreground">
                    Destination
                  </span>
                  <p className="mt-1.5 text-[0.875rem] text-foreground">
                    {ride.destination}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel eyebrow="Schedule">
          <div className="divide-y divide-white/5">
            <DetailRow label="Date" value={ride.date} />
            <DetailRow label="Pickup Time" value={ride.time} />
            <DetailRow label="Passengers" value="2 guests · 3 bags" />
          </div>
        </Panel>

        <Panel eyebrow="Vehicle">
          <div className="divide-y divide-white/5">
            <DetailRow label="Class" value={ride.vehicle} />
            <DetailRow label="Capacity" value="Up to 6 guests" />
          </div>
        </Panel>

        {ride.airport ? (
          <Panel eyebrow="Flight Information">
            <div className="divide-y divide-white/5">
              <DetailRow label="Flight" value={ride.flight ?? "—"} />
              <DetailRow label="Airline" value="United Airlines" />
              <DetailRow label="Status" value="On time (demo)" emphasis />
            </div>
            <p className="mt-4 flex items-center gap-2 text-[0.75rem] text-muted-foreground">
              <Plane className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
              Flight monitoring is simulated in this prototype.
            </p>
          </Panel>
        ) : null}

        <Panel eyebrow="Selected Add-ons">
          <ul className="space-y-3">
            {(ride.addons ?? []).map((addon) => (
              <li
                key={addon}
                className="flex items-center gap-3 text-[0.875rem] text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {addon}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel eyebrow="Payment Summary">
          <div className="divide-y divide-white/5">
            {PAYMENT_SUMMARY.map((line) => (
              <DetailRow key={line.label} label={line.label} value={line.value} />
            ))}
            <DetailRow label="Total" value={ESTIMATED_TOTAL} emphasis />
          </div>
        </Panel>

        <Panel eyebrow="Special Instructions">
          <p className="text-[0.875rem] leading-relaxed text-muted-foreground">
            {ride.instructions ?? "No special instructions provided."}
          </p>
        </Panel>
      </div>

      <div className="mt-9 space-y-3 px-7">
        <Link to="/track" className="block">
          <GoldButton>Track Chauffeur</GoldButton>
        </Link>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <button
            type="button"
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-raised"
          >
            <PencilLine className="h-[17px] w-[17px] text-gold" strokeWidth={1.25} />
            <span className="flex-1 text-[0.875rem] text-foreground">
              Modify Ride
            </span>
          </button>
          <div className="mx-5 h-px eb-hairline" />
          <Link
            to="/driver-assigned"
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-raised"
          >
            <UserRound className="h-[17px] w-[17px] text-gold" strokeWidth={1.25} />
            <span className="flex-1 text-[0.875rem] text-foreground">
              Your Chauffeur
            </span>
          </Link>
          <div className="mx-5 h-px eb-hairline" />
          <button
            type="button"
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-raised"
          >
            <Headphones className="h-[17px] w-[17px] text-gold" strokeWidth={1.25} />
            <span className="flex-1 text-[0.875rem] text-foreground">
              Contact Support
            </span>
          </button>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl text-[0.75rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-destructive"
        >
          <XCircle className="h-4 w-4" strokeWidth={1.5} />
          Cancel Ride
        </button>
      </div>
    </AppScreen>
  );
}

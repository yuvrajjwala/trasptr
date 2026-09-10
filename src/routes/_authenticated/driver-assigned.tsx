import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MessageSquare, Phone, Star } from "lucide-react";

import chauffeur from "@/assets/chauffeur-dorin.jpg";
import { AppScreen } from "@/components/eb/app-shell";
import { GoldButton } from "@/components/eb/ui";
import { Panel, ScreenHeader, DetailRow } from "@/components/eb/ride-ui";
import { CHAUFFEUR } from "@/lib/demo";

export const Route = createFileRoute("/_authenticated/driver-assigned")({
  head: () => ({
    meta: [
      { title: "Chauffeur Assigned — East Wind Limo" },
      {
        name: "description",
        content:
          "Meet your assigned East Wind Limo chauffeur, view vehicle details and estimated arrival time.",
      },
      { property: "og:title", content: "Chauffeur Assigned — East Wind Limo" },
      {
        property: "og:description",
        content: "Your chauffeur, vehicle and estimated arrival time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DriverAssigned,
});

function DriverAssigned() {
  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="Chauffeur"
        title="Your Chauffeur Has Been Assigned"
        description="You will be met personally at your pickup point."
        backTo="/ride-details"
      />

      <div className="mt-9 px-7">
        <div className="eb-elevated overflow-hidden rounded-2xl border border-gold/25 bg-surface">
          <div className="flex items-center gap-5 p-6">
            <img
              src={chauffeur}
              alt="Dorin, executive chauffeur"
              width={512}
              height={512}
              loading="lazy"
              className="h-20 w-20 shrink-0 rounded-full border border-gold/30 object-cover"
            />
            <div className="min-w-0">
              <h2 className="font-display text-[1.625rem] font-light leading-none tracking-tight text-foreground">
                {CHAUFFEUR.name}
              </h2>
              <p className="mt-2 eb-eyebrow text-[0.5625rem] text-gold/85">
                {CHAUFFEUR.title}
              </p>
              <p className="mt-3 flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1.25} />
                {CHAUFFEUR.rating} · {CHAUFFEUR.trips.toLocaleString()} journeys
              </p>
            </div>
          </div>

          <div className="mx-6 h-px eb-hairline" />

          <div className="px-6 py-2">
            <div className="divide-y divide-white/5">
              <DetailRow label="Vehicle" value={CHAUFFEUR.vehicle} />
              <DetailRow label="Plate" value={CHAUFFEUR.plate} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-6 pt-4">
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-border bg-background text-[0.8125rem] text-foreground transition-colors hover:bg-surface-raised"
            >
              <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
              Call
            </button>
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-border bg-background text-[0.8125rem] text-foreground transition-colors hover:bg-surface-raised"
            >
              <MessageSquare className="h-4 w-4 text-gold" strokeWidth={1.5} />
              Message
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 px-7">
        <Panel>
          <div className="flex items-center gap-4">
            <Clock className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.25} />
            <div>
              <span className="eb-eyebrow text-[0.5625rem] text-muted-foreground">
                Estimated arrival
              </span>
              <p className="mt-1.5 font-display text-[1.5rem] font-light leading-none tracking-tight text-foreground">
                {CHAUFFEUR.eta}
              </p>
            </div>
          </div>
        </Panel>
        <p className="mt-4 text-center text-[0.75rem] text-muted-foreground">
          Calling and messaging are simulated in this prototype.
        </p>
      </div>

      <div className="mt-8 px-7">
        <Link to="/track" className="block">
          <GoldButton>Track Chauffeur</GoldButton>
        </Link>
      </div>
    </AppScreen>
  );
}

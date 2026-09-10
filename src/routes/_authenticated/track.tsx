import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, MapPin, MessageSquare, Navigation, Phone } from "lucide-react";

import { Screen } from "@/components/eb/ui";
import { StatusTimeline, TRACK_TIMELINE } from "@/components/eb/ride-ui";
import { BottomNav } from "@/components/eb/app-shell";
import { CHAUFFEUR, FEATURED_RIDE } from "@/lib/demo";

export const Route = createFileRoute("/_authenticated/track")({
  head: () => ({
    meta: [
      { title: "Live Chauffeur Tracking — TRNSPTR" },
      {
        name: "description",
        content:
          "Follow your TRNSPTR chauffeur en route to your pickup, with live route, vehicle details and arrival window.",
      },
      {
        property: "og:title",
        content: "Live Chauffeur Tracking — TRNSPTR",
      },
      {
        property: "og:description",
        content: "Your chauffeur, route and arrival window in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Track,
});

/* A stylised, entirely static map surface — no map provider involved. */
function MapCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[oklch(0.115_0.004_70)]">
      {/* subtle grid of city blocks */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 430 720"
      >
        <defs>
          <linearGradient id="ebRoute" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.14 236.9)" />
            <stop offset="100%" stopColor="oklch(0.8 0.11 236.9)" />
          </linearGradient>
          <radialGradient id="ebGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.7054 0.1524 236.9 / 0.20)" />
            <stop offset="100%" stopColor="oklch(0.7054 0.1524 236.9 / 0)" />
          </radialGradient>
        </defs>

        {/* blocks */}
        <g stroke="oklch(1 0 0 / 0.045)" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 62 + 20} x2="430" y2={i * 62 + 20} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 54 + 16} y1="0" x2={i * 54 + 16} y2="720" />
          ))}
        </g>

        {/* arterial roads */}
        <g stroke="oklch(1 0 0 / 0.09)" strokeWidth="7" strokeLinecap="round">
          <line x1="-10" y1="206" x2="440" y2="206" />
          <line x1="-10" y1="514" x2="440" y2="514" />
          <line x1="124" y1="-10" x2="124" y2="730" />
          <line x1="322" y1="-10" x2="322" y2="730" />
        </g>

        {/* parkland accent */}
        <rect
          x="232"
          y="238"
          width="150"
          height="150"
          rx="10"
          fill="oklch(0.20 0.012 150 / 0.5)"
        />
        {/* water */}
        <path
          d="M0 640 C 90 610, 150 690, 250 660 C 340 634, 390 700, 430 676 L430 720 L0 720 Z"
          fill="oklch(0.22 0.03 240 / 0.55)"
        />

        <circle cx="196" cy="392" r="150" fill="url(#ebGlow)" />

        {/* suggested route */}
        <path
          d="M96 596 L96 514 L124 514 L124 300 L232 300 L232 206 L316 206 L316 128"
          fill="none"
          stroke="url(#ebRoute)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M96 596 L96 514 L124 514 L124 300 L232 300 L232 206 L316 206 L316 128"
          fill="none"
          stroke="oklch(0.98 0 0 / 0.35)"
          strokeWidth="1"
          strokeDasharray="4 10"
          strokeLinecap="round"
        />
      </svg>

      {/* markers */}
      <Marker
        style={{ left: "22.3%", top: "82.8%" }}
        label="Pickup"
        icon={<MapPin className="h-4 w-4" strokeWidth={1.6} />}
      />
      <Marker
        style={{ left: "73.5%", top: "17.8%" }}
        label="Destination"
        icon={<Navigation className="h-4 w-4" strokeWidth={1.6} />}
      />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: "28.8%", top: "41.7%" }}
      >
        <span className="absolute inset-[-14px] animate-ping rounded-full bg-gold/15" />
        <span className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-background text-gold shadow-[0_10px_30px_-12px_oklch(0_0_0/0.9)]">
          <Car className="h-[18px] w-[18px]" strokeWidth={1.4} />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 eb-scrim" />
    </div>
  );
}

function Marker({
  style,
  label,
  icon,
}: {
  style: React.CSSProperties;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
      style={style}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-gold">
        {icon}
      </span>
      <span className="rounded-full border border-border bg-background/85 px-2.5 py-1 text-[0.5625rem] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

function Track() {
  return (
    <Screen>
      <div className="relative min-h-screen pb-32">
        <div className="absolute inset-x-0 top-0 h-[62vh]">
          <MapCanvas />
        </div>

        <div className="relative flex items-center justify-between px-7 pt-14">
          <span className="rounded-full border border-border bg-background/80 px-4 py-2 text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
            Live · {FEATURED_RIDE.reference}
          </span>
          <span className="rounded-full border border-gold/35 bg-background/80 px-4 py-2 text-[0.5625rem] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
            {CHAUFFEUR.eta} away
          </span>
        </div>

        {/* Bottom sheet */}
        <div className="relative mt-[52vh] px-4">
          <div className="eb-elevated rounded-3xl border border-border bg-surface/95 backdrop-blur-md">
            <div className="flex justify-center pt-3">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>

            <div className="px-6 pt-5">
              <span className="eb-eyebrow text-[0.625rem] text-gold/85">
                En route
              </span>
              <h1 className="mt-2.5 font-display text-[1.75rem] font-light leading-tight tracking-tight text-foreground">
                Your Chauffeur Is On The Way
              </h1>
              <p className="mt-3 text-[0.875rem] text-muted-foreground">
                {CHAUFFEUR.name} · Luxury Black SUV
              </p>
              <p className="mt-1.5 text-[0.875rem] text-gold">
                Estimated arrival: {CHAUFFEUR.eta}
              </p>
            </div>

            <div className="mx-6 mt-6 h-px eb-hairline" />

            <div className="px-6 py-6">
              <StatusTimeline steps={TRACK_TIMELINE} current={1} compact />
            </div>

            <div className="grid grid-cols-2 gap-3 px-6 pb-7">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-border bg-background text-[0.8125rem] text-foreground transition-colors hover:bg-surface-raised"
              >
                <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
                Contact
              </button>
              <Link
                to="/ride-details"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-gold/40 bg-background text-[0.8125rem] text-gold transition-colors hover:bg-surface-raised"
              >
                <MessageSquare className="h-4 w-4" strokeWidth={1.5} />
                Trip Details
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}

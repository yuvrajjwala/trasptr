import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import onboardTime from "@/assets/onboard-time.jpg";
import onboardFlight from "@/assets/onboard-flight.jpg";
import onboardComfort from "@/assets/onboard-comfort.jpg";
import { GoldButton, Screen, StepDots } from "@/components/eb/ui";

const SLIDES = {
  "1": {
    eyebrow: "Precision",
    title: "Your Time Matters",
    description:
      "Professional chauffeur service designed around your schedule.",
    image: onboardTime,
    alt: "Executive checking a wristwatch beside a black luxury SUV",
    amenity: null as string | null,
    cta: "Continue",
  },
  "2": {
    eyebrow: "Awareness",
    title: "We Track Your Flight",
    description:
      "Share your flight details and your chauffeur stays informed about delays and arrival changes.",
    image: onboardFlight,
    alt: "Private terminal window at night overlooking a jet on the tarmac",
    amenity: null as string | null,
    cta: "Continue",
  },
  "3": {
    eyebrow: "Comfort",
    title: "Ride in Complete Comfort",
    description:
      "Experience refined travel in our luxury black SUV with exceptional comfort and personalized service.",
    image: onboardComfort,
    alt: "Quilted black leather rear cabin of a luxury SUV",
    amenity: "Premium Massage Seating Available",
    cta: "Start Your Journey",
  },
} as const;

type StepKey = keyof typeof SLIDES;

export const Route = createFileRoute("/onboarding/$step")({
  head: ({ params }) => {
    const slide = SLIDES[(params.step as StepKey) in SLIDES ? (params.step as StepKey) : "1"];
    return {
      meta: [
        { title: `${slide.title} — East Wind Limo` },
        { name: "description", content: slide.description },
        { property: "og:title", content: `${slide.title} — East Wind Limo` },
        { property: "og:description", content: slide.description },
      ],
    };
  },
  component: Onboarding,
});

function Onboarding() {
  const { step } = Route.useParams();
  const navigate = useNavigate();
  const key: StepKey = (step in SLIDES ? step : "1") as StepKey;
  const slide = SLIDES[key];
  const index = Number(key);

  const advance = () => {
    if (index < 3) {
      navigate({ to: "/onboarding/$step", params: { step: String(index + 1) } });
    } else {
      navigate({ to: "/create-account" });
    }
  };

  return (
    <Screen>
      <div className="flex min-h-screen flex-col">
        <div className="relative h-[52vh] min-h-[340px] w-full overflow-hidden">
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            width={1024}
            height={1024}
            className="h-full w-full animate-in fade-in object-cover duration-700"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 eb-scrim" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-7 pt-12">
            <span className="eb-eyebrow text-[0.5625rem] text-ivory/70">
              East Wind
            </span>
            <Link
              to="/sign-in"
              className="eb-eyebrow text-[0.5625rem] text-muted-foreground transition-colors hover:text-gold"
            >
              Skip
            </Link>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-7 pb-12 pt-8">
          <span className="eb-eyebrow text-gold/90">{slide.eyebrow}</span>
          <h1 className="mt-4 font-display text-[2.25rem] font-light leading-[1.1] tracking-tight text-foreground">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-[20rem] text-[0.9375rem] leading-relaxed text-muted-foreground">
            {slide.description}
          </p>

          {slide.amenity ? (
            <div className="mt-7 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-4">
              <Sparkles className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="min-w-0 text-[0.8125rem] tracking-wide text-ivory">
                {slide.amenity}
              </span>
            </div>
          ) : null}

          <div className="flex-1" />

          <div className="mb-8 flex items-center justify-between">
            <StepDots step={index} total={3} />
            <span className="eb-eyebrow text-[0.5625rem] text-muted-foreground">
              {index} of 3
            </span>
          </div>

          <GoldButton onClick={advance}>{slide.cta}</GoldButton>
        </div>
      </div>
    </Screen>
  );
}

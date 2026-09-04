import { createFileRoute, useNavigate } from "@tanstack/react-router";

import heroSuv from "@/assets/hero-suv.jpg";
import { GoldButton, Screen, TextLink, Wordmark } from "@/components/eb/ui";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Travel Beyond the Ordinary — Eagle Black Limo" },
      {
        name: "description",
        content:
          "Professional chauffeur service, airport transfers and executive travel in luxury black SUVs across Chicagoland.",
      },
      { property: "og:title", content: "Travel Beyond the Ordinary — Eagle Black Limo" },
      {
        property: "og:description",
        content:
          "Professional chauffeur service, airport transfers and executive travel in luxury black SUVs.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();

  return (
    <Screen>
      <div className="relative flex min-h-screen flex-col">
        <img
          src={heroSuv}
          alt="Black luxury SUV on a Chicago street at night"
          width={1024}
          height={1536}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 eb-scrim" />

        <div className="relative flex flex-1 flex-col px-7 pb-12 pt-14">
          <Wordmark size="sm" className="self-center" />

          <div className="flex-1" />

          <span className="eb-eyebrow text-gold/90">
            Private Chauffeur Service
          </span>
          <h1 className="mt-5 font-display text-[2.75rem] font-light leading-[1.06] tracking-tight text-foreground">
            Travel Beyond
            <br />
            the Ordinary
          </h1>
          <p className="mt-5 max-w-[19rem] text-[0.9375rem] leading-relaxed text-muted-foreground">
            Professionally chauffeured black SUVs for airport transfers,
            corporate travel and evenings that deserve precision. Chicago and
            the western suburbs.
          </p>

          <GoldButton className="mt-10" onClick={() => navigate({ to: "/onboarding/$step", params: { step: "1" } })}>
            Get Started
          </GoldButton>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Already with us? <TextLink to="/sign-in">Sign In</TextLink>
          </p>
        </div>
      </div>
    </Screen>
  );
}

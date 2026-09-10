import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import splashDetail from "@/assets/splash-detail.jpg";
import { Screen, Wordmark } from "@/components/eb/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "East Wind Limo — Luxury in Every Mile" },
      {
        name: "description",
        content:
          "Private chauffeur and black SUV service for Chicago and the western suburbs. Executive travel, airport transfers, quiet luxury.",
      },
      { property: "og:title", content: "East Wind Limo — Luxury in Every Mile" },
      {
        property: "og:description",
        content:
          "Private chauffeur and black SUV service for Chicago and the western suburbs.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const enter = window.setTimeout(() => setEntered(true), 80);
    const go = window.setTimeout(() => navigate({ to: "/welcome" }), 2600);
    return () => {
      window.clearTimeout(enter);
      window.clearTimeout(go);
    };
  }, [navigate]);

  return (
    <Screen>
      <button
        type="button"
        onClick={() => navigate({ to: "/welcome" })}
        className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-left"
        aria-label="Enter East Wind Limo"
      >
        <img
          src={splashDetail}
          alt=""
          width={1024}
          height={1024}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] w-full object-cover opacity-45"
        />
        <div className="pointer-events-none absolute inset-0 eb-scrim" />

        <div
          className={`relative flex flex-col items-center transition-all duration-1000 ease-out ${
            entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <Wordmark size="lg" />
          <span className="mt-8 h-px w-16 eb-gold-rule" />
          <p className="mt-8 font-display text-lg font-light italic tracking-wide text-muted-foreground">
            Luxury in Every Mile
          </p>
        </div>

        <p className="absolute bottom-14 eb-eyebrow text-[0.5625rem] text-muted-foreground/70">
          Chicago &middot; Western Suburbs
        </p>
      </button>
    </Screen>
  );
}

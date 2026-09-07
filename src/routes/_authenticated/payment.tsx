import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Plus, ShieldCheck, Wallet } from "lucide-react";

import { AppScreen } from "@/components/eb/app-shell";
import { GoldButton, Field } from "@/components/eb/ui";
import { ScreenHeader, Panel } from "@/components/eb/ride-ui";
import { ESTIMATED_TOTAL } from "@/lib/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/payment")({
  head: () => ({
    meta: [
      { title: "Payment — Three Black Limousine LLC" },
      {
        name: "description",
        content:
          "Choose a payment method and confirm your chauffeured reservation with Three Black Limousine LLC.",
      },
      { property: "og:title", content: "Payment — Three Black Limousine LLC" },
      {
        property: "og:description",
        content: "Select a card or PayPal and confirm your reservation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Payment,
});

const METHODS = [
  {
    id: "card",
    title: "Credit / Debit Card",
    detail: "Visa ending 4417 · Expires 09/28",
    Icon: CreditCard,
  },
  {
    id: "paypal",
    title: "PayPal",
    detail: "dorin@eagleblack.demo",
    Icon: Wallet,
  },
] as const;

function Processing() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/96 px-10 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <span className="relative grid h-24 w-24 place-items-center">
          <span className="absolute inset-0 rounded-full border border-gold/15" />
          <span className="absolute inset-0 animate-[spin_2.6s_linear_infinite] rounded-full border border-transparent border-t-gold/70" />
          <ShieldCheck className="h-7 w-7 text-gold" strokeWidth={1.1} />
        </span>
        <h2 className="mt-10 font-display text-[1.75rem] font-light tracking-tight text-foreground">
          Securing Your Reservation
        </h2>
        <p className="mt-3 text-[0.875rem] text-muted-foreground">
          Please wait while we confirm your booking.
        </p>
        <span className="mt-8 h-px w-24 eb-gold-rule" />
      </div>
    </div>
  );
}

function Payment() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("card");
  const [adding, setAdding] = useState(false);
  const [processing, setProcessing] = useState(false);

  const confirm = () => {
    setProcessing(true);
    window.setTimeout(() => {
      navigate({ to: "/booking-confirmed" });
    }, 2400);
  };

  return (
    <AppScreen>
      {processing ? <Processing /> : null}

      <ScreenHeader
        eyebrow="Checkout"
        title="Payment"
        description="Select how you would like to settle this reservation."
        backTo="/booking"
      />

      <div className="mt-9 space-y-3 px-7">
        {METHODS.map(({ id, title, detail, Icon }) => {
          const active = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              className={cn(
                "flex w-full items-center gap-4 rounded-2xl border bg-surface p-5 text-left transition-colors duration-300",
                active
                  ? "border-gold/45 bg-surface-raised"
                  : "border-border hover:bg-surface-raised",
              )}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background text-gold">
                <Icon className="h-[17px] w-[17px]" strokeWidth={1.25} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] text-foreground">
                  {title}
                </span>
                <span className="mt-1 block text-[0.75rem] text-muted-foreground">
                  {detail}
                </span>
              </span>
              <span
                className={cn(
                  "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border",
                  active ? "border-gold" : "border-input",
                )}
              >
                {active ? (
                  <span className="h-2 w-2 rounded-full bg-gold" />
                ) : null}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="flex w-full items-center gap-4 rounded-2xl border border-dashed border-input bg-transparent p-5 text-left transition-colors hover:border-gold/40"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-gold">
            <Plus className="h-[17px] w-[17px]" strokeWidth={1.25} />
          </span>
          <span className="flex-1 text-[0.9375rem] text-foreground">
            Add New Card
          </span>
        </button>
      </div>

      {adding ? (
        <div className="mt-4 px-7">
          <Panel eyebrow="New card">
            <div className="space-y-5">
              <Field
                label="Card Number"
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
              />
              <Field label="Cardholder Name" placeholder="Dorin Popescu" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry Date" placeholder="09 / 28" inputMode="numeric" />
                <Field label="CVV" placeholder="•••" inputMode="numeric" />
              </div>
              <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
                Prototype only — card details are not stored, transmitted or
                charged.
              </p>
            </div>
          </Panel>
        </div>
      ) : null}

      <div className="mt-8 px-7">
        <Panel>
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eb-eyebrow text-[0.625rem] text-muted-foreground">
                Estimated Total
              </span>
              <p className="mt-2 font-display text-[2rem] font-light leading-none tracking-tight text-gold">
                {ESTIMATED_TOTAL}
              </p>
            </div>
            <span className="pb-1 text-right text-[0.75rem] leading-relaxed text-muted-foreground">
              Includes gratuity
              <br />
              and meet &amp; greet
            </span>
          </div>
        </Panel>
      </div>

      <div className="mt-8 px-7">
        <GoldButton onClick={confirm} disabled={processing}>
          Confirm &amp; Book
        </GoldButton>
        <p className="mt-4 flex items-center justify-center gap-2 text-[0.75rem] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
          Simulated secure checkout — no payment is taken.
        </p>
      </div>
    </AppScreen>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Headphones,
  LogOut,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { AppScreen } from "@/components/eb/app-shell";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — TRNSPTR" },
      {
        name: "description",
        content:
          "Manage saved addresses, payment preferences and notification settings for your TRNSPTR account.",
      },
      { property: "og:title", content: "Your Profile — TRNSPTR" },
      {
        property: "og:description",
        content: "Manage saved addresses, payment and notification preferences.",
      },
    ],
  }),
  component: Profile,
});

const ROWS = [
  { title: "Saved Addresses", Icon: MapPin },
  { title: "Payment Methods", Icon: CreditCard },
  { title: "Notifications", Icon: Bell },
  { title: "Privacy & Security", Icon: ShieldCheck },
  { title: "Support", Icon: Headphones },
] as const;

function Profile() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();
  const [signingOut, setSigningOut] = useState(false);

  const email = user.email ?? "Member";
  const initials = email.slice(0, 2).toUpperCase();

  const signOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    setSigningOut(false);
    navigate({ to: "/welcome" });
  };

  return (
    <AppScreen>
      <div className="px-7 pt-14">
        <span className="eb-eyebrow text-[0.625rem] text-gold/85">Account</span>
        <h1 className="mt-2.5 font-display text-[2rem] font-light leading-none tracking-tight text-foreground">
          {email.split("@")[0]}
        </h1>
        <p className="mt-3 text-[0.875rem] text-muted-foreground">{email}</p>
      </div>

      <div className="mt-9 px-7">
        <div className="flex items-center gap-5 rounded-2xl border border-gold/25 bg-surface-raised p-5">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/40 bg-background font-display text-[1.125rem] tracking-widest text-gold">
            {initials}
          </span>
          <div className="min-w-0">
            <span className="eb-eyebrow text-[0.5625rem] text-muted-foreground">
              Membership
            </span>
            <p className="mt-1.5 font-display text-[1.25rem] font-light tracking-tight text-foreground">
              Executive Black
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface mx-7">
        {ROWS.map(({ title, Icon }, i) => (
          <div key={title}>
            {i > 0 ? <div className="mx-5 h-px eb-hairline" /> : null}
            <button
              type="button"
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-raised"
            >
              <Icon className="h-[17px] w-[17px] shrink-0 text-gold" strokeWidth={1.25} />
              <span className="flex-1 text-[0.875rem] text-foreground">{title}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 px-7">
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border text-[0.8125rem] text-muted-foreground transition-colors hover:text-gold"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          {signingOut ? "Signing Out…" : "Sign Out"}
        </button>
      </div>
    </AppScreen>
  );
}

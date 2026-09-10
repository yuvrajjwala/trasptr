import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MailCheck, AlertCircle } from "lucide-react";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { Field, GoldButton, Screen, TextLink, Wordmark } from "@/components/eb/ui";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Your Password — East Wind Limo" },
      {
        name: "description",
        content:
          "Request a secure reset link for your East Wind Limo chauffeur account.",
      },
      { property: "og:title", content: "Reset Your Password — East Wind Limo" },
      {
        property: "og:description",
        content: "Request a secure reset link for your East Wind Limo account.",
      },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/sign-in` },
    );
    setBusy(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  };

  return (
    <Screen>
      <div className="flex min-h-screen flex-col px-7 pb-12 pt-14">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center">
          <Link
            to="/sign-in"
            aria-label="Back to sign in"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Wordmark size="sm" />
          <span className="h-10 w-10" />
        </div>

        <div className="mt-20">
          <span className="eb-eyebrow text-gold/90">Account Recovery</span>
          <h1 className="mt-4 font-display text-[2.25rem] font-light leading-tight tracking-tight text-foreground">
            Reset Your Password
          </h1>
          <p className="mt-4 max-w-[20rem] text-[0.9375rem] leading-relaxed text-muted-foreground">
            Enter the email address associated with your account and we will
            send a secure link to set a new password.
          </p>
        </div>

        <form className="mt-10 flex flex-col gap-6" onSubmit={submit}>
          <Field
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error ? (
            <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" strokeWidth={1.5} />
              <span className="min-w-0 text-[0.8125rem] leading-relaxed text-foreground/90">
                {error}
              </span>
            </div>
          ) : null}
          <GoldButton type="submit" disabled={busy}>
            {busy ? "Sending…" : "Send Reset Link"}
          </GoldButton>
        </form>

        {sent ? (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-4">
            <MailCheck className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
            <span className="min-w-0 text-[0.8125rem] leading-relaxed text-ivory">
              A reset link is on its way. Please check your inbox.
            </span>
          </div>
        ) : null}

        <div className="flex-1" />

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Remembered it? <TextLink to="/sign-in">Sign In</TextLink>
        </p>
      </div>
    </Screen>
  );
}

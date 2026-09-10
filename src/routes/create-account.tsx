import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, AlertCircle } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  CheckboxRow,
  Field,
  GoldButton,
  Screen,
  TextLink,
  Wordmark,
} from "@/components/eb/ui";

export const Route = createFileRoute("/create-account")({
  head: () => ({
    meta: [
      { title: "Create Account — TRNSPTR" },
      {
        name: "description",
        content:
          "Create your TRNSPTR account to book luxury black SUV chauffeur service across Chicago and the western suburbs.",
      },
      { property: "og:title", content: "Create Account — TRNSPTR" },
      {
        property: "og:description",
        content:
          "Create your account for luxury black SUV chauffeur service in Chicagoland.",
      },
    ],
  }),
  component: CreateAccount,
});

function CreateAccount() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }

    setBusy(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setBusy(false);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      await supabase.from("profiles").upsert({
        id: userId,
        full_name: fullName,
        phone,
      });
    }

    setBusy(false);
    navigate({ to: "/home" });
  };

  return (
    <Screen>
      <div className="flex min-h-screen flex-col px-7 pb-12 pt-14">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center">
          <Link
            to="/welcome"
            aria-label="Back"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Wordmark size="sm" />
          <span className="h-10 w-10" />
        </div>

        <h1 className="mt-12 font-display text-[2.25rem] font-light leading-tight tracking-tight text-foreground">
          Create Account
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          A few details and your chauffeur is a tap away.
        </p>

        <form className="mt-9 flex flex-col gap-5" onSubmit={submit}>
          <Field
            label="Full Name"
            placeholder="Jonathan Reed"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Field
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field
            label="Phone Number"
            type="tel"
            inputMode="tel"
            placeholder="(312) 555-0148"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Field
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <div className="mt-2">
            <CheckboxRow checked={agreed} onChange={setAgreed}>
              I agree to the Terms of Service and Privacy Policy of TRNSPTR
              Limo.
            </CheckboxRow>
          </div>

          {error ? (
            <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" strokeWidth={1.5} />
              <span className="min-w-0 text-[0.8125rem] leading-relaxed text-foreground/90">
                {error}
              </span>
            </div>
          ) : null}

          <GoldButton type="submit" className="mt-4" disabled={busy}>
            {busy ? "Creating…" : "Create Account"}
          </GoldButton>
        </form>

        <div className="flex-1" />

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Already have an account? <TextLink to="/sign-in">Sign In</TextLink>
        </p>
      </div>
    </Screen>
  );
}

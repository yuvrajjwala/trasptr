import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Apple, ChevronLeft, AlertCircle } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import {
  CheckboxRow,
  Divider,
  Field,
  GoldButton,
  OutlineButton,
  Screen,
  TextLink,
  Wordmark,
} from "@/components/eb/ui";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — Three Black Limousine LLC" },
      {
        name: "description",
        content:
          "Sign in to your Three Black Limousine LLC account to book a private chauffeur or review upcoming transfers.",
      },
      { property: "og:title", content: "Sign In — Three Black Limousine LLC" },
      {
        property: "og:description",
        content: "Sign in to book a private chauffeur with Three Black Limousine LLC.",
      },
    ],
  }),
  component: SignIn,
});

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.66 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.95S8.78 6.28 12 6.28c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.68 3.75 14.53 2.9 12 2.9 6.98 2.9 2.9 6.98 2.9 12s4.08 9.1 9.1 9.1c5.25 0 8.73-3.69 8.73-8.89 0-.6-.06-1.05-.15-1.51Z"
      />
    </svg>
  );
}

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate({ to: "/home" });
  };

  const signInWithGoogle = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (result.redirected) return;
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

        <h1 className="mt-14 font-display text-[2.25rem] font-light leading-tight tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          Sign in to arrange your next chauffeured journey.
        </p>

        <form className="mt-10 flex flex-col gap-6" onSubmit={submit}>
          <Field
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between gap-4">
            <CheckboxRow checked={remember} onChange={setRemember}>
              Remember me
            </CheckboxRow>
            <TextLink to="/forgot-password" className="shrink-0 text-[0.8125rem]">
              Forgot Password
            </TextLink>
          </div>

          {error ? (
            <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" strokeWidth={1.5} />
              <span className="min-w-0 text-[0.8125rem] leading-relaxed text-foreground/90">
                {error}
              </span>
            </div>
          ) : null}

          <GoldButton type="submit" className="mt-2" disabled={busy}>
            {busy ? "Signing In…" : "Sign In"}
          </GoldButton>
        </form>

        <div className="mt-10">
          <Divider label="or continue with" />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <OutlineButton type="button">
              <Apple className="h-[18px] w-[18px]" strokeWidth={1.5} />
              Apple
            </OutlineButton>
            <OutlineButton type="button" onClick={signInWithGoogle}>
              <GoogleGlyph />
              Google
            </OutlineButton>
          </div>
        </div>

        <div className="flex-1" />

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Don&rsquo;t have an account?{" "}
          <TextLink to="/create-account">Create Account</TextLink>
        </p>
      </div>
    </Screen>
  );
}

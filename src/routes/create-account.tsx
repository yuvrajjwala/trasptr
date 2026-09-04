import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

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
      { title: "Create Account — Eagle Black Limo" },
      {
        name: "description",
        content:
          "Create your Eagle Black Limo account to book luxury black SUV chauffeur service across Chicago and the western suburbs.",
      },
      { property: "og:title", content: "Create Account — Eagle Black Limo" },
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

        <form
          className="mt-9 flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/home" });
          }}
        >
          <Field label="Full Name" placeholder="Jonathan Reed" autoComplete="name" />
          <Field
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
          />
          <Field
            label="Phone Number"
            type="tel"
            inputMode="tel"
            placeholder="(312) 555-0148"
            autoComplete="tel"
          />
          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <Field
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />

          <div className="mt-2">
            <CheckboxRow>
              I agree to the Terms of Service and Privacy Policy of Eagle Black
              Limo.
            </CheckboxRow>
          </div>

          <GoldButton type="submit" className="mt-4">
            Create Account
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

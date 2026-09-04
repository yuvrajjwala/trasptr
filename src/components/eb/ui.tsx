import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { useId, useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------- Shell ---------- */

export function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen w-full bg-background">
      <div
        className={cn(
          "relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Wordmark ---------- */

export function Wordmark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-[1.375rem]",
    md: "text-[1.75rem]",
    lg: "text-[2.5rem]",
  } as const;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span
        className={cn(
          "font-display font-light leading-none tracking-[0.18em] text-ivory",
          sizes[size],
        )}
      >
        EAGLE BLACK
      </span>
      <span className="mt-2 eb-eyebrow text-gold/85">Limousine</span>
    </div>
  );
}

/* ---------- Buttons ---------- */

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"button">;

export function GoldButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-14 w-full items-center justify-center rounded-xl bg-gold px-6",
        "text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground",
        "transition-all duration-300 active:scale-[0.985] hover:bg-gold-soft",
        "shadow-[0_16px_40px_-20px_oklch(0.79_0.082_84/0.5)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-6 py-4",
        "text-sm font-medium text-foreground transition-colors duration-300 hover:bg-surface-raised",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TextLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      className={cn(
        "text-sm text-gold underline-offset-4 transition-colors hover:text-gold-soft",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/* ---------- Form fields ---------- */

export function Field({
  label,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: ComponentProps<"input">["inputMode"];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const resolved = isPassword && show ? "text" : type;

  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="eb-eyebrow text-[0.625rem] text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={resolved}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          className={cn(
            "h-13 w-full rounded-xl border border-input bg-surface px-4 py-4 text-[0.9375rem] text-foreground",
            "placeholder:text-muted-foreground/60 outline-none transition-colors duration-300",
            "focus:border-gold/60 focus:ring-2 focus:ring-ring",
            isPassword && "pr-12",
          )}
        />
        {isPassword ? (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-gold"
          >
            {show ? (
              <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.5} />
            ) : (
              <Eye className="h-[18px] w-[18px]" strokeWidth={1.5} />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function CheckboxRow({
  children,
  defaultChecked = false,
}: {
  children: ReactNode;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      type="button"
      onClick={() => setChecked((v) => !v)}
      className="flex items-start gap-3 text-left"
      aria-pressed={checked}
    >
      <span
        className={cn(
          "mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors duration-200",
          checked ? "border-gold bg-gold" : "border-input bg-surface",
        )}
      >
        {checked ? (
          <Check
            className="h-3 w-3 text-primary-foreground"
            strokeWidth={3}
          />
        ) : null}
      </span>
      <span className="min-w-0 text-[0.8125rem] leading-relaxed text-muted-foreground">
        {children}
      </span>
    </button>
  );
}

/* ---------- Misc ---------- */

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 eb-hairline" />
      <span className="eb-eyebrow text-[0.625rem] text-muted-foreground">
        {label}
      </span>
      <span className="h-px flex-1 eb-hairline" />
    </div>
  );
}

export function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-[3px] rounded-full transition-all duration-500",
            i + 1 === step ? "w-8 bg-gold" : "w-3 bg-border",
          )}
        />
      ))}
    </div>
  );
}

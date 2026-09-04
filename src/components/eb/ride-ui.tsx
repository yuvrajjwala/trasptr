import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------- Header with back affordance ---------- */

export function ScreenHeader({
  eyebrow,
  title,
  description,
  backTo,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  backTo?: string;
}) {
  return (
    <div className="px-7 pt-14">
      {backTo ? (
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={backTo as any}
          className="mb-6 inline-flex items-center gap-2 text-[0.75rem] text-muted-foreground transition-colors hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          Back
        </Link>
      ) : null}
      <span className="eb-eyebrow text-[0.625rem] text-gold/85">{eyebrow}</span>
      <h1 className="mt-2.5 font-display text-[2rem] font-light leading-none tracking-tight text-foreground">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Card ---------- */

export function Panel({
  eyebrow,
  children,
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-surface p-6",
        className,
      )}
    >
      {eyebrow ? (
        <span className="eb-eyebrow text-[0.625rem] text-gold/85">
          {eyebrow}
        </span>
      ) : null}
      <div className={eyebrow ? "mt-5" : undefined}>{children}</div>
    </section>
  );
}

export function DetailRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-2.5">
      <span className="shrink-0 text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span
        className={cn(
          "min-w-0 text-right text-[0.875rem]",
          emphasis ? "font-medium text-gold" : "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}

/* ---------- Status timeline ---------- */

export function StatusTimeline({
  steps,
  current,
  compact = false,
}: {
  steps: readonly string[];
  current: number;
  compact?: boolean;
}) {
  return (
    <ol className={compact ? "space-y-4" : "space-y-5"}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === steps.length - 1;
        return (
          <li key={label} className="relative flex items-start gap-4">
            <span className="relative flex flex-col items-center">
              <span
                className={cn(
                  "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border transition-colors",
                  done || active
                    ? "border-gold"
                    : "border-border",
                )}
              >
                <span
                  className={cn(
                    "h-[7px] w-[7px] rounded-full",
                    done
                      ? "bg-gold"
                      : active
                        ? "animate-pulse bg-gold"
                        : "bg-transparent",
                  )}
                />
              </span>
              {!last ? (
                <span
                  className={cn(
                    "mt-1 w-px flex-1",
                    compact ? "h-6" : "h-8",
                    done ? "bg-gold/40" : "bg-border",
                  )}
                />
              ) : null}
            </span>
            <span
              className={cn(
                "pt-0 text-[0.875rem]",
                active
                  ? "text-gold"
                  : done
                    ? "text-foreground"
                    : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export const RIDE_TIMELINE = [
  "Confirmed",
  "Chauffeur Assigned",
  "On The Way",
  "Completed",
] as const;

export const TRACK_TIMELINE = [
  "Chauffeur Assigned",
  "En Route",
  "Arrived",
  "Trip Started",
] as const;

/* ---------- Segmented tabs ---------- */

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-xl border border-border bg-surface p-1">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "flex-1 rounded-lg px-3 py-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
            value === opt
              ? "bg-surface-raised text-gold"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

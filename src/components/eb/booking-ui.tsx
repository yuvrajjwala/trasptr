import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { Check, Info, Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export const BOOKING_STEPS = ["Trip", "Vehicle", "Options", "Review"] as const;

export function BookingProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {BOOKING_STEPS.map((label, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <div key={label} className="flex flex-1 flex-col gap-2">
            <span
              className={cn(
                "h-[2px] w-full rounded-full transition-colors duration-500",
                active ? "bg-gold" : done ? "bg-gold/45" : "bg-border",
              )}
            />
            <span
              className={cn(
                "text-[0.5625rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500",
                active
                  ? "text-gold"
                  : done
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50",
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function StepHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <span className="eb-eyebrow text-[0.625rem] text-gold/85">{eyebrow}</span>
      <h1 className="mt-2.5 font-display text-[1.875rem] font-light leading-tight tracking-tight text-foreground">
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

export function SelectCard({
  title,
  description,
  Icon,
  selected,
  onSelect,
  note,
}: {
  title: string;
  description?: string | undefined;
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  selected: boolean;
  onSelect: () => void;
  note?: string | undefined;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
        selected
          ? "border-gold/50 bg-surface-raised shadow-[0_18px_44px_-30px_oklch(0.79_0.082_84/0.6)]"
          : "border-border bg-surface hover:bg-surface-raised",
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300",
            selected
              ? "border-gold/45 bg-background text-gold"
              : "border-border bg-background text-muted-foreground",
          )}
        >
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.25} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-medium leading-snug text-foreground">
          {title}
        </span>
        {description ? (
          <span className="mt-1.5 block text-[0.75rem] leading-relaxed text-muted-foreground">
            {description}
          </span>
        ) : null}
        {note ? (
          <span className="mt-2.5 block text-[0.6875rem] leading-relaxed text-gold/80">
            {note}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-300",
          selected ? "border-gold bg-gold" : "border-input",
        )}
      >
        {selected ? (
          <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
        ) : null}
      </span>
    </button>
  );
}

export function InputField({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & ComponentProps<"input">) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="eb-eyebrow text-[0.625rem] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="h-13 w-full rounded-xl border border-input bg-surface px-4 py-4 text-[0.9375rem] text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/60 focus:border-gold/60 focus:ring-2 focus:ring-ring"
      />
      {hint ? (
        <span className="text-[0.6875rem] text-muted-foreground/80">{hint}</span>
      ) : null}
    </div>
  );
}

export function SegmentedControl({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {label ? (
        <span className="eb-eyebrow text-[0.625rem] text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div className="grid grid-flow-col gap-1 rounded-xl border border-border bg-surface p-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "h-11 rounded-lg text-[0.8125rem] transition-colors duration-300",
              value === opt
                ? "bg-surface-raised text-gold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 9,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4">
      <span className="text-[0.875rem] text-foreground">{label}</span>
      <span className="flex items-center gap-4">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold disabled:opacity-35"
          disabled={value <= min}
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
        <span className="w-5 text-center font-display text-[1.25rem] font-light text-foreground">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold disabled:opacity-35"
          disabled={value >= max}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </span>
    </div>
  );
}

export function NoticeCard({
  title,
  body,
  Icon = Info,
  children,
}: {
  title: string;
  body: string;
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gold/25 bg-surface-raised p-5">
      <div className="flex gap-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/35 bg-background text-gold">
          <Icon className="h-4 w-4" strokeWidth={1.25} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[0.875rem] font-medium leading-snug text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
            {body}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <span className="eb-eyebrow shrink-0 text-[0.5625rem] text-muted-foreground">
        {label}
      </span>
      <span className="text-right text-[0.875rem] leading-snug text-foreground">
        {value}
      </span>
    </div>
  );
}

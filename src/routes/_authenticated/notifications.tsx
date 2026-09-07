import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, ChevronLeft, Plane, UserRound } from "lucide-react";

import { AppScreen } from "@/components/eb/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Three Black Limousine LLC" },
      {
        name: "description",
        content:
          "Booking confirmations, chauffeur assignments, flight status updates and ride reminders for your Three Black Limousine LLC transfers.",
      },
      { property: "og:title", content: "Notifications — Three Black Limousine LLC" },
      {
        property: "og:description",
        content:
          "Booking confirmations, chauffeur assignments and flight updates from Three Black Limousine LLC.",
      },
    ],
  }),
  component: Notifications,
});

const ITEMS = [
  {
    title: "Booking Confirmed",
    body: "Your airport transfer to O'Hare on Friday, Sep 18 at 08:30 AM is confirmed.",
    time: "Today · 8:04 AM",
    Icon: CheckCircle2,
    unread: true,
  },
  {
    title: "Chauffeur Assigned",
    body: "Marcus D. will be your chauffeur. Black Cadillac Escalade · Plate TBL 214.",
    time: "Today · 7:52 AM",
    Icon: UserRound,
    unread: true,
  },
  {
    title: "Flight Status Update",
    body: "United UA 1123 is now scheduled to arrive 12 minutes early at Terminal 1.",
    time: "Yesterday · 9:41 PM",
    Icon: Plane,
    unread: false,
  },
  {
    title: "Upcoming Ride Reminder",
    body: "Your hourly chauffeur service begins tomorrow at 05:00 PM in Downtown Chicago.",
    time: "Wed · 4:15 PM",
    Icon: CalendarClock,
    unread: false,
  },
] as const;

function Notifications() {
  return (
    <AppScreen>
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-7 pt-14">
        <Link
          to="/home"
          aria-label="Back"
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </Link>
        <span className="text-center eb-eyebrow text-[0.625rem] text-muted-foreground">
          Notifications
        </span>
        <span className="h-10 w-10" />
      </header>

      <div className="px-7 pt-10">
        <h1 className="font-display text-[2rem] font-light leading-none tracking-tight text-foreground">
          Your Updates
        </h1>
        <p className="mt-3 text-[0.875rem] text-muted-foreground">
          2 unread notifications
        </p>
      </div>

      <div className="mt-8 space-y-3 px-7">
        {ITEMS.map(({ title, body, time, Icon, unread }) => (
          <article
            key={title}
            className={cn(
              "relative rounded-2xl border p-5 transition-colors",
              unread
                ? "border-gold/25 bg-surface-raised"
                : "border-border bg-surface",
            )}
          >
            <div className="flex gap-4">
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full border",
                  unread
                    ? "border-gold/40 bg-background text-gold"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                <Icon className="h-[17px] w-[17px]" strokeWidth={1.25} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2
                    className={cn(
                      "text-[0.9375rem] leading-snug",
                      unread ? "font-medium text-foreground" : "text-foreground/85",
                    )}
                  >
                    {title}
                  </h2>
                  {unread ? (
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  ) : null}
                </div>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {body}
                </p>
                <span className="mt-3 block text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground/70">
                  {time}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppScreen>
  );
}

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CalendarRange, Home, MapPin, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Screen } from "@/components/eb/ui";

const TABS = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/rides", label: "My Rides", Icon: CalendarRange },
  { to: "/track", label: "Track", Icon: MapPin },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-[430px] border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="grid grid-cols-4 px-3 pb-6 pt-3">
          {TABS.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center gap-2 py-1 text-muted-foreground transition-colors data-[status=active]:text-gold"
            >
              <span className="relative flex flex-col items-center">
                <span className="mb-2 h-px w-6 bg-transparent transition-colors group-data-[status=active]:bg-gold" />
                <Icon className="h-[19px] w-[19px]" strokeWidth={1.5} />
              </span>
              <span className="text-[0.625rem] font-medium uppercase tracking-[0.16em]">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function AppScreen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Screen>
      <div className={cn("flex min-h-screen flex-col pb-32", className)}>
        {children}
      </div>
      <BottomNav />
    </Screen>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <span className="eb-eyebrow text-[0.625rem] text-gold/85">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-2 font-display text-[1.5rem] font-light leading-none tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

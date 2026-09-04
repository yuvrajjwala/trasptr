// Shared booking types and helpers used across the booking flow, rides and home.

export type BookingService =
  | "airport"
  | "p2p"
  | "corporate"
  | "hourly"
  | "wedding"
  | "long";

export interface BookingAddon {
  id: string;
  title: string;
}

export interface BookingRow {
  id: string;
  service: string;
  service_title: string;
  pickup: string;
  destination: string | null;
  pickup_at: string;
  passengers: number;
  luggage: number;
  airport: string | null;
  direction: string | null;
  airline: string | null;
  flight: string | null;
  hours: number | null;
  stops: number | null;
  addons: BookingAddon[] | string[];
  instructions: string | null;
  estimate_total: number;
  status: string;
  created_at: string;
}

export function formatPickupDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function formatPickupTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function isUpcoming(iso: string): boolean {
  return new Date(iso).getTime() >= Date.now();
}

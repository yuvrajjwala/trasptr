// Frontend-only demo data used by the payment, confirmation, ride detail,
// chauffeur and live tracking screens. No backend involved.

export type RideStatus = "confirmed" | "completed" | "cancelled";

export interface DemoRide {
  id: string;
  reference: string;
  title: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  vehicle: string;
  status: RideStatus;
  amount: number;
  flight?: string;
  airport?: boolean;
  addons?: string[];
  instructions?: string;
}

export const DEMO_RIDES: DemoRide[] = [
  {
    id: "ewl-28419",
    reference: "TRN-28419",
    title: "O'Hare Airport Transfer",
    pickup: "Oak Brook, IL 60523",
    destination: "O'Hare International — Terminal 1",
    date: "Sep 18, 2026",
    time: "08:30 AM",
    vehicle: "Luxury Black SUV",
    status: "confirmed",
    amount: 185,
    flight: "UA 1123",
    airport: true,
    addons: ["Meet & Greet", "Bottled Water Service"],
    instructions: "Please call on arrival. Two large suitcases.",
  },
  {
    id: "ewl-28502",
    reference: "TRN-28502",
    title: "Corporate Transfer",
    pickup: "Willis Tower, Chicago",
    destination: "Hinsdale, IL",
    date: "Sep 22, 2026",
    time: "06:15 PM",
    vehicle: "Executive Sedan",
    status: "confirmed",
    amount: 140,
    addons: ["Silent Ride"],
  },
  {
    id: "ewl-27884",
    reference: "TRN-27884",
    title: "Midway Airport Transfer",
    pickup: "Naperville, IL",
    destination: "Midway International",
    date: "Aug 29, 2026",
    time: "05:45 AM",
    vehicle: "Luxury Black SUV",
    status: "completed",
    amount: 172,
    flight: "AA 2210",
    airport: true,
  },
  {
    id: "ewl-27610",
    reference: "TRN-27610",
    title: "Evening Point-to-Point",
    pickup: "Elmhurst, IL",
    destination: "The Langham, Chicago",
    date: "Aug 14, 2026",
    time: "07:00 PM",
    vehicle: "Executive Sedan",
    status: "completed",
    amount: 128,
  },
  {
    id: "ewl-27455",
    reference: "TRN-27455",
    title: "Wedding Transfer",
    pickup: "Downers Grove, IL",
    destination: "Drake Hotel, Chicago",
    date: "Aug 02, 2026",
    time: "03:30 PM",
    vehicle: "Stretch Limousine",
    status: "cancelled",
    amount: 320,
  },
];

export const FEATURED_RIDE = DEMO_RIDES[0] as DemoRide;

export const CHAUFFEUR = {
  name: "Dorin",
  title: "Executive Chauffeur",
  rating: 4.98,
  trips: 1284,
  vehicle: "Luxury Black SUV — Cadillac Escalade",
  plate: "TRN 214",
  eta: "12 min",
};

export const PAYMENT_SUMMARY = [
  { label: "Base fare", value: "$150.00" },
  { label: "Meet & greet", value: "$15.00" },
  { label: "Gratuity (20%)", value: "$20.00" },
];

export const ESTIMATED_TOTAL = "$185.00";

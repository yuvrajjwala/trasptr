import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Baby,
  Building2,
  Check,
  ChevronLeft,
  Clock,
  Gauge,
  Handshake,
  Luggage,
  MapPin,
  MessageSquare,
  Navigation,
  Plane,
  Route as RouteIcon,
  Sparkles,
  Users,
} from "lucide-react";

import vehicleSuv from "@/assets/vehicle-suv.jpg";
import {
  BookingProgress,
  InputField,
  NoticeCard,
  SegmentedControl,
  SelectCard,
  StepHeading,
  Stepper,
  SummaryRow,
} from "@/components/eb/booking-ui";
import { GoldButton, Screen } from "@/components/eb/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Arrange a Chauffeur — Eagle Black Limo" },
      {
        name: "description",
        content:
          "Select your service, trip details, vehicle and add-ons, then review an estimated quote for your private chauffeured journey.",
      },
      { property: "og:title", content: "Arrange a Chauffeur — Eagle Black Limo" },
      {
        property: "og:description",
        content:
          "Select service, trip details, vehicle and add-ons for your private chauffeured journey.",
      },
    ],
  }),
  component: Booking,
});

const SERVICES = [
  { id: "airport", title: "Airport Transfer", description: "O'Hare & Midway pickups", Icon: Plane },
  { id: "p2p", title: "Point-to-Point", description: "Travel directly to your destination", Icon: Navigation },
  { id: "corporate", title: "Corporate Travel", description: "Professional travel, simplified", Icon: Building2 },
  { id: "hourly", title: "Hourly Chauffeur", description: "Flexible travel on your schedule", Icon: Clock },
  { id: "wedding", title: "Weddings & Special Occasions", description: "Arrive in exceptional style", Icon: Sparkles },
  { id: "long", title: "Long-Distance Travel", description: "Comfort beyond the city", Icon: RouteIcon },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

const ADDONS = [
  {
    id: "seat",
    title: "Child Safety Seat",
    description: "Installed and inspected before pickup",
    note: "An additional fee may apply.",
    Icon: Baby,
    price: 20,
  },
  {
    id: "meet",
    title: "Meet & Greet",
    description: "Chauffeur waits inside with a name board",
    note: undefined,
    Icon: Handshake,
    price: 0,
  },
  {
    id: "stop",
    title: "Extra Stop",
    description: "One additional stop along your route",
    note: undefined,
    Icon: MapPin,
    price: 0,
  },
] as const;

const AIRPORTS = [
  "O'Hare International Airport",
  "Chicago Midway International Airport",
] as const;

const STEP_LABELS: Record<number, number> = { 0: 0, 1: 0, 2: 1, 3: 2, 4: 3 };

function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [service, setService] = useState<ServiceId>("airport");
  const [pickup, setPickup] = useState("Oak Brook, IL 60523");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("2026-09-18");
  const [time, setTime] = useState("08:30");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [airport, setAirport] = useState<string>(AIRPORTS[0]);
  const [direction, setDirection] = useState("Arrival");
  const [airline, setAirline] = useState("United Airlines");
  const [flight, setFlight] = useState("UA 1123");
  const [hours, setHours] = useState(4);
  const [stops, setStops] = useState(2);
  const [addons, setAddons] = useState<string[]>(["meet"]);
  const [instructions, setInstructions] = useState("");

  const isAirport = service === "airport";
  const isHourly = service === "hourly";
  const serviceMeta = SERVICES.find((s) => s.id === service)!;

  const outsideCity = useMemo(
    () =>
      !/chicago/i.test(pickup) ||
      (destination.length > 0 && !/chicago|o'hare|ohare|midway/i.test(destination)),
    [pickup, destination],
  );

  const addonTotal = addons.reduce(
    (sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0),
    0,
  );
  const base = isHourly ? hours * 95 : 165;
  const total = base + addonTotal;

  const toggleAddon = (id: string) =>
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const back = () => (step === 0 ? navigate({ to: "/home" }) : setStep(step - 1));

  return (
    <Screen>
      <div className="flex min-h-screen flex-col pb-12">
        <header className="px-7 pt-14">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
            <button
              type="button"
              onClick={back}
              aria-label="Back"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <span className="eb-eyebrow text-center text-[0.625rem] text-muted-foreground">
              Arrange a Chauffeur
            </span>
            <Link
              to="/home"
              className="text-right text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-gold"
            >
              Exit
            </Link>
          </div>
          <div className="mt-8">
            <BookingProgress current={STEP_LABELS[step] ?? 0} />
          </div>
        </header>

        <main className="flex-1 px-7 pt-10">
          {step === 0 ? (
            <section className="space-y-8">
              <StepHeading
                eyebrow="Step 1 of 5"
                title="Select Your Service"
                description="Choose the journey you would like us to arrange."
              />
              <div className="space-y-3">
                {SERVICES.map(({ id, title, description, Icon }) => (
                  <SelectCard
                    key={id}
                    title={title}
                    description={description}
                    Icon={Icon}
                    selected={service === id}
                    onSelect={() => setService(id)}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {step === 1 && !isHourly ? (
            <section className="space-y-8">
              <StepHeading
                eyebrow="Step 2 of 5"
                title="Trip Details"
                description={`${serviceMeta.title} · tell us where and when.`}
              />

              <div className="space-y-5">
                <InputField
                  label="Pickup Location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup address"
                />
                <InputField
                  label="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                />
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    label="Pickup Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <InputField
                    label="Pickup Time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <Stepper
                  label="Passengers"
                  value={passengers}
                  onChange={setPassengers}
                  min={1}
                  max={7}
                />
                <Stepper label="Luggage" value={luggage} onChange={setLuggage} max={8} />
              </div>

              {isAirport ? (
                <div className="space-y-5">
                  <div className="eb-gold-rule w-12" />
                  <span className="eb-eyebrow block text-[0.625rem] text-gold/85">
                    Flight Details
                  </span>
                  <div className="space-y-3">
                    {AIRPORTS.map((a) => (
                      <SelectCard
                        key={a}
                        title={a}
                        Icon={Plane}
                        selected={airport === a}
                        onSelect={() => setAirport(a)}
                      />
                    ))}
                  </div>
                  <SegmentedControl
                    label="Trip Direction"
                    options={["Arrival", "Departure"]}
                    value={direction}
                    onChange={setDirection}
                  />
                  <InputField
                    label="Airline"
                    value={airline}
                    onChange={(e) => setAirline(e.target.value)}
                    placeholder="e.g. United Airlines"
                  />
                  <InputField
                    label="Flight Number"
                    value={flight}
                    onChange={(e) => setFlight(e.target.value)}
                    placeholder="e.g. UA 1123"
                  />
                  <NoticeCard
                    Icon={Plane}
                    title="Flight Monitoring Included"
                    body="We monitor your flight and adjust your pickup experience around eligible flight schedule changes."
                  />
                </div>
              ) : null}

              {outsideCity ? (
                <NoticeCard
                  Icon={MapPin}
                  title="Location-Based Mileage Notice"
                  body="This journey may include applicable deadhead mileage based on your pickup or drop-off location."
                />
              ) : null}
            </section>
          ) : null}

          {step === 1 && isHourly ? (
            <section className="space-y-8">
              <StepHeading
                eyebrow="Step 2 of 5"
                title="Hourly Chauffeur"
                description="Your chauffeur remains with you for the duration you book."
              />

              <div className="space-y-5">
                <Stepper
                  label="Number of Hours"
                  value={hours}
                  onChange={setHours}
                  min={2}
                  max={12}
                />
                <InputField
                  label="Start Location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter start address"
                />
                <InputField
                  label="Estimated Route / Service Area"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Downtown Chicago & North Shore"
                />
                <Stepper label="Expected Stops" value={stops} onChange={setStops} max={10} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    label="Start Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <InputField
                    label="Start Time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <NoticeCard
                Icon={Gauge}
                title="Your Hourly Allowance"
                body="Your booking includes up to 20 miles per booked hour."
              >
                <div className="mt-4 rounded-xl border border-border bg-background px-4 py-4">
                  <div className="flex items-center justify-between text-[0.8125rem] text-muted-foreground">
                    <span>{hours} Hours</span>
                    <span>×</span>
                    <span>20 Miles</span>
                    <span>=</span>
                    <span className="font-display text-[1.25rem] font-light text-gold">
                      {hours * 20} mi
                    </span>
                  </div>
                  <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted-foreground/80">
                    {hours} Hours × 20 Miles = {hours * 20} Included Miles
                  </p>
                </div>
                <p className="mt-4 text-[0.75rem] text-muted-foreground/85">
                  Additional mileage may be billed separately.
                </p>
              </NoticeCard>

              {outsideCity ? (
                <NoticeCard
                  Icon={MapPin}
                  title="Location-Based Mileage Notice"
                  body="This journey may include applicable deadhead mileage based on your pickup or drop-off location."
                />
              ) : null}
            </section>
          ) : null}

          {step === 2 ? (
            <section className="space-y-8">
              <StepHeading
                eyebrow="Step 3 of 5"
                title="Select Your Vehicle"
                description="Every journey is chauffeured in a meticulously maintained black SUV."
              />

              <button
                type="button"
                aria-pressed
                className="eb-elevated w-full overflow-hidden rounded-2xl border border-gold/50 bg-surface text-left"
              >
                <div className="relative">
                  <img
                    src={vehicleSuv}
                    alt="Luxury black SUV lit in a private garage"
                    width={1280}
                    height={832}
                    loading="lazy"
                    className="h-44 w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-gold/45 bg-background/80 px-3 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    Premium Massage Seating
                  </span>
                  <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-gold">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-[1.5rem] font-light leading-none tracking-tight text-foreground">
                    Luxury Black SUV
                  </h2>
                  <div className="mt-4 flex items-center gap-6 text-[0.8125rem] text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Users className="h-4 w-4 text-gold" strokeWidth={1.25} />
                      Up to 6 passengers
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Luggage className="h-4 w-4 text-gold" strokeWidth={1.25} />
                      Up to 6 bags
                    </span>
                  </div>
                  <div className="mx-0 my-5 h-px eb-hairline" />
                  <ul className="space-y-3">
                    {[
                      "Premium Comfort",
                      "Complimentary Water",
                      "Professional Chauffeur",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-[0.875rem] text-foreground"
                      >
                        <Check className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>

              <p className="text-center text-[0.75rem] text-muted-foreground/80">
                Additional vehicle classes available on request.
              </p>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="space-y-8">
              <StepHeading
                eyebrow="Step 4 of 5"
                title="Additional Options"
                description="Refine the details of your journey."
              />
              <div className="space-y-3">
                {ADDONS.map(({ id, title, description, note, Icon }) => (
                  <SelectCard
                    key={id}
                    title={title}
                    description={description}
                    note={addons.includes(id) ? note : undefined}
                    Icon={Icon}
                    selected={addons.includes(id)}
                    onSelect={() => toggleAddon(id)}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="eb-eyebrow text-[0.625rem] text-muted-foreground">
                  Special Instructions
                </span>
                <textarea
                  rows={4}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Anything we should know about your journey?"
                  className="w-full resize-none rounded-xl border border-input bg-surface px-4 py-4 text-[0.9375rem] leading-relaxed text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/60 focus:border-gold/60 focus:ring-2 focus:ring-ring"
                />
                <span className="inline-flex items-center gap-2 text-[0.6875rem] text-muted-foreground/80">
                  <MessageSquare className="h-3 w-3" strokeWidth={1.5} />
                  Shared privately with your chauffeur.
                </span>
              </div>
            </section>
          ) : null}

          {step === 4 ? (
            <section className="space-y-8">
              <StepHeading
                eyebrow="Step 5 of 5"
                title="Review Your Booking"
                description="Please confirm the details of your chauffeured journey."
              />

              <div className="rounded-2xl border border-border bg-surface p-5">
                <SectionTitle title="Journey" onEdit={() => setStep(0)} />
                <div className="mt-1 divide-y divide-hairline">
                  <SummaryRow label="Service" value={serviceMeta.title} />
                  <SummaryRow label="Pickup" value={pickup || "—"} />
                  <SummaryRow
                    label={isHourly ? "Service Area" : "Destination"}
                    value={
                      isHourly
                        ? destination || "Chicagoland"
                        : isAirport
                          ? airport
                          : destination || "—"
                    }
                  />
                  <SummaryRow label="Date & Time" value={`${date} · ${time}`} />
                  {isHourly ? (
                    <SummaryRow
                      label="Duration"
                      value={`${hours} hours · ${hours * 20} included miles`}
                    />
                  ) : null}
                  {isAirport ? (
                    <SummaryRow
                      label="Flight"
                      value={`${airline} ${flight} · ${direction}`}
                    />
                  ) : null}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <SectionTitle title="Vehicle & Guests" onEdit={() => setStep(2)} />
                <div className="mt-1 divide-y divide-hairline">
                  <SummaryRow label="Vehicle" value="Luxury Black SUV" />
                  <SummaryRow label="Passengers" value={`${passengers}`} />
                  <SummaryRow label="Luggage" value={`${luggage}`} />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <SectionTitle title="Add-ons" onEdit={() => setStep(3)} />
                <div className="mt-1 divide-y divide-hairline">
                  {addons.length ? (
                    addons.map((id) => (
                      <SummaryRow
                        key={id}
                        label="Selected"
                        value={ADDONS.find((a) => a.id === id)?.title ?? id}
                      />
                    ))
                  ) : (
                    <SummaryRow label="Selected" value="None" />
                  )}
                  {instructions ? (
                    <SummaryRow label="Instructions" value={instructions} />
                  ) : null}
                </div>
              </div>

              {isAirport ? (
                <NoticeCard
                  Icon={Plane}
                  title="Flight Monitoring Included"
                  body="We monitor your flight and adjust your pickup experience around eligible flight schedule changes."
                />
              ) : null}

              {isHourly ? (
                <NoticeCard
                  Icon={Gauge}
                  title="Your Hourly Allowance"
                  body={`Includes up to 20 miles per booked hour — ${hours} hours × 20 miles = ${hours * 20} included miles. Additional mileage may be billed separately.`}
                />
              ) : null}

              {outsideCity ? (
                <NoticeCard
                  Icon={MapPin}
                  title="Location-Based Mileage Notice"
                  body="This journey may include applicable deadhead mileage based on your pickup or drop-off location."
                />
              ) : null}

              <div className="rounded-2xl border border-gold/25 bg-surface-raised p-5">
                <span className="eb-eyebrow text-[0.625rem] text-gold/85">
                  Estimated Pricing
                </span>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-[0.875rem] text-muted-foreground">
                    Ride Estimate
                  </span>
                  <span className="font-display text-[2rem] font-light leading-none text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="my-5 h-px eb-hairline" />
                <div className="space-y-3 text-[0.875rem]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle Service</span>
                    <span className="text-foreground">${base.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected Add-ons</span>
                    <span className="text-foreground">${addonTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="my-5 h-px eb-hairline" />
                <div className="flex items-center justify-between">
                  <span className="eb-eyebrow text-[0.625rem] text-muted-foreground">
                    Estimated Total
                  </span>
                  <span className="font-display text-[1.5rem] font-light text-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="mt-4 text-[0.6875rem] leading-relaxed text-muted-foreground/80">
                  All amounts shown are estimated and may change based on final
                  routing, waiting time and applicable mileage.
                </p>
              </div>
            </section>
          ) : null}
        </main>

        <footer className="sticky bottom-0 mt-10 border-t border-border bg-background/95 px-7 pb-8 pt-5 backdrop-blur-sm">
          <GoldButton
            onClick={() => (step === 4 ? undefined : setStep(step + 1))}
            className={cn(step === 4 && "cursor-default")}
          >
            {step === 4 ? "Continue to Payment" : "Continue"}
          </GoldButton>
        </footer>
      </div>
    </Screen>
  );
}

function SectionTitle({ title, onEdit }: { title: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-[1.25rem] font-light tracking-tight text-foreground">
        {title}
      </h2>
      <button
        type="button"
        onClick={onEdit}
        className="text-[0.6875rem] uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-soft"
      >
        Edit
      </button>
    </div>
  );
}

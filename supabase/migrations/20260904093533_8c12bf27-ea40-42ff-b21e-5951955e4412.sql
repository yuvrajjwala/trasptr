create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Profiles visible to owner"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

create policy "Profiles insertable by owner"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

create policy "Profiles updatable by owner"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Profiles deletable by owner"
  on public.profiles for delete to authenticated
  using (auth.uid() = id);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  service text not null,
  service_title text not null,
  pickup text not null,
  destination text,
  pickup_at timestamptz not null,
  passengers int not null default 1,
  luggage int not null default 0,
  airport text,
  direction text,
  airline text,
  flight text,
  hours int,
  stops int,
  addons jsonb not null default '[]'::jsonb,
  instructions text,
  estimate_total numeric(10,2) not null default 0,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;

alter table public.bookings enable row level security;

create policy "Bookings readable by owner"
  on public.bookings for select to authenticated
  using (auth.uid() = user_id);

create policy "Bookings insertable by owner"
  on public.bookings for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Bookings updatable by owner"
  on public.bookings for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Bookings deletable by owner"
  on public.bookings for delete to authenticated
  using (auth.uid() = user_id);

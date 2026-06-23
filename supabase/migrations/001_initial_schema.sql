-- Pricing tiers (must exist before applications references it)
create table pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_cents integer not null,
  description text,
  active boolean not null default true
);

alter table pricing_tiers enable row level security;

create policy "Anyone can read active pricing tiers"
  on pricing_tiers for select
  using (active = true);

create policy "Authenticated users can manage pricing tiers"
  on pricing_tiers for all
  to authenticated
  using (true)
  with check (true);

-- Applications
create table applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  organization text not null,
  title text,
  attendee_type text not null,
  reason text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'declined', 'paid')),
  pricing_tier_id uuid references pricing_tiers(id),
  stripe_payment_link text,
  stripe_session_id text,
  reviewed_at timestamptz,
  paid_at timestamptz
);

alter table applications enable row level security;

create policy "Anyone can submit an application"
  on applications for insert
  with check (true);

create policy "Authenticated users can read applications"
  on applications for select
  to authenticated
  using (true);

create policy "Authenticated users can update applications"
  on applications for update
  to authenticated
  using (true)
  with check (true);

-- Contact submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false
);

alter table contact_submissions enable row level security;

create policy "Anyone can submit a contact form"
  on contact_submissions for insert
  with check (true);

create policy "Authenticated users can read contact submissions"
  on contact_submissions for select
  to authenticated
  using (true);

create policy "Authenticated users can update contact submissions"
  on contact_submissions for update
  to authenticated
  using (true)
  with check (true);

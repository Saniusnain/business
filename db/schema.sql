-- Run once against the Neon database (Neon SQL editor or psql).
create table if not exists orders (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'dispatched', 'delivered', 'cancelled')),
  customer_name text not null,
  phone text not null,
  email text,
  address text not null,
  area text not null,
  city text not null,
  postal_code text,
  notes text,
  items jsonb not null,
  subtotal integer not null check (subtotal > 0),
  payment_method text not null default 'cod',
  delivery text not null default 'bykea_on_delivery'
);

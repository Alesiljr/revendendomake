-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- Products
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  images text[] not null default '{}',
  cost_price numeric(10,2) not null default 0,
  suggested_price numeric(10,2) not null default 0,
  category_id uuid references public.categories(id) on delete set null,
  stock integer not null default 0,
  active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_products_active on public.products(active);
create index idx_products_category on public.products(category_id);

-- Leads
create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  city text,
  state text,
  source text,
  status text not null default 'novo' check (status in ('novo','contatado','convertido','descartado')),
  notes text,
  lgpd_consent boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_leads_status on public.leads(status);
create index idx_leads_created on public.leads(created_at desc);

-- Testimonials
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  reseller_name text not null,
  city text,
  photo_url text,
  result_text text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  approved boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Posts (blog)
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  content jsonb,
  excerpt text,
  cover_image text,
  author text not null default 'Revendendo Make',
  category text,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_posts_status on public.posts(status);
create index idx_posts_slug on public.posts(slug);

-- Site Settings (singleton — id always 1)
create table public.site_settings (
  id integer primary key default 1 check (id = 1),
  whatsapp_number text not null default '5511999999999',
  instagram_url text,
  tiktok_url text,
  youtube_url text,
  logo_url text,
  contact_email text,
  hero_headline text not null default 'Ganhe Dinheiro Revendendo Maquiagem',
  hero_subheadline text not null default 'Comece seu negócio hoje',
  updated_at timestamptz not null default now()
);

-- Seed site_settings
insert into public.site_settings (id) values (1) on conflict do nothing;

-- RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.leads enable row level security;
alter table public.testimonials enable row level security;
alter table public.posts enable row level security;
alter table public.site_settings enable row level security;

-- Products: public read (active only), admin write
create policy "products_public_read" on public.products for select using (active = true);
create policy "products_admin_all" on public.products for all using (auth.role() = 'authenticated');

-- Leads: public insert, admin read/update
create policy "leads_public_insert" on public.leads for insert with check (true);
create policy "leads_admin_read" on public.leads for select using (auth.role() = 'authenticated');
create policy "leads_admin_update" on public.leads for update using (auth.role() = 'authenticated');

-- Testimonials: public read (approved only), admin write
create policy "testimonials_public_read" on public.testimonials for select using (approved = true);
create policy "testimonials_admin_all" on public.testimonials for all using (auth.role() = 'authenticated');

-- Posts: public read (published only), admin write
create policy "posts_public_read" on public.posts for select using (status = 'published');
create policy "posts_admin_all" on public.posts for all using (auth.role() = 'authenticated');

-- Site settings: public read, admin update
create policy "settings_public_read" on public.site_settings for select using (true);
create policy "settings_admin_update" on public.site_settings for update using (auth.role() = 'authenticated');

-- Categories: public read, admin write
create policy "categories_public_read" on public.categories for select using (true);
create policy "categories_admin_all" on public.categories for all using (auth.role() = 'authenticated');

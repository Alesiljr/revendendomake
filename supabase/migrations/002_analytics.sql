-- Analytics: page views and button click events
create table public.page_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event_type text not null check (event_type in ('pageview', 'click', 'form_submit')),
  event_name text,
  page_path text,
  referrer text,
  created_at timestamptz not null default now()
);

create index idx_page_events_session on public.page_events(session_id);
create index idx_page_events_created on public.page_events(created_at desc);
create index idx_page_events_type on public.page_events(event_type);

-- RLS: public insert (tracker sends events), admin read
alter table public.page_events enable row level security;
create policy "events_public_insert" on public.page_events for insert with check (true);
create policy "events_admin_read" on public.page_events for select using (auth.role() = 'authenticated');

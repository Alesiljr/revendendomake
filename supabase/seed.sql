-- Sample categories
insert into public.categories (name, slug) values
  ('Batons', 'batons'),
  ('Bases', 'bases'),
  ('Sombras', 'sombras'),
  ('Máscaras', 'mascaras'),
  ('Blush', 'blush')
on conflict do nothing;

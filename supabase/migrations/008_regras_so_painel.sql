-- 22/11/2026 (pedido do dono): só quem está no painel lê e muda os dados do painel.
-- Antes, as regras "admin" aceitavam QUALQUER conta logada (auth.role() = 'authenticated'): uma conta fora do painel
-- lia os contatos (leads) direto do banco. Agora: conta em admin_users como dona, ou editora aprovada.
-- O site público não muda: as regras de leitura pública e de envio do formulário ficam iguais.
-- A chave de serviço (rotas /api/admin, que já conferem o painel) continua passando por cima das regras, como antes.
-- Voltar: rodar o mesmo alter policy com "auth.role() = 'authenticated'" no lugar de "public.e_admin()" e apagar a função.

create or replace function public.e_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid() and (role = 'owner' or approved)
  );
$$;
revoke all on function public.e_admin() from public;
grant execute on function public.e_admin() to anon, authenticated;

alter policy "products_admin_all"     on public.products      using (public.e_admin());
alter policy "leads_admin_read"       on public.leads         using (public.e_admin());
alter policy "leads_admin_update"     on public.leads         using (public.e_admin());
alter policy "testimonials_admin_all" on public.testimonials  using (public.e_admin());
alter policy "posts_admin_all"        on public.posts         using (public.e_admin());
alter policy "settings_admin_update"  on public.site_settings using (public.e_admin());
alter policy "categories_admin_all"   on public.categories    using (public.e_admin());
alter policy "events_admin_read"      on public.page_events   using (public.e_admin());

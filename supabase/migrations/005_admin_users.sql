-- Usuários do painel admin com sistema de convite e aprovação

CREATE TABLE IF NOT EXISTS admin_users (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text NOT NULL,
  role        text NOT NULL DEFAULT 'editor',   -- 'owner' | 'editor'
  approved    boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- Apenas service role acessa (todas as operações admin usam a service role key)
CREATE POLICY "service_role_only" ON admin_users USING (auth.role() = 'service_role');

-- Tokens de convite (expiram em 7 dias, uso único)
CREATE TABLE IF NOT EXISTS invite_tokens (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token       text UNIQUE NOT NULL DEFAULT gen_random_uuid()::text,
  created_by  uuid REFERENCES auth.users(id),
  used_by     uuid REFERENCES auth.users(id),
  used_at     timestamptz,
  expires_at  timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE invite_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_only" ON invite_tokens USING (auth.role() = 'service_role');

-- Origem do tráfego: de qual anúncio/campanha veio a visita
ALTER TABLE public.page_events
  ADD COLUMN utm_source   TEXT,
  ADD COLUMN utm_medium   TEXT,
  ADD COLUMN utm_campaign TEXT,
  ADD COLUMN utm_content  TEXT,
  ADD COLUMN utm_term     TEXT,
  ADD COLUMN click_id     TEXT;

-- Índice usado pelas consultas do painel agrupadas por campanha
CREATE INDEX idx_page_events_utm_campaign
  ON public.page_events(utm_campaign)
  WHERE utm_campaign IS NOT NULL;

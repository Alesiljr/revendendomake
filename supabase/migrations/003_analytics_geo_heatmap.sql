-- Add geolocation and click-coordinate columns to page_events
ALTER TABLE public.page_events
  ADD COLUMN geo_state TEXT,
  ADD COLUMN geo_city  TEXT,
  ADD COLUMN click_x   FLOAT,
  ADD COLUMN click_y   FLOAT;

-- Index used by the admin state-distribution query
CREATE INDEX idx_page_events_geo_state
  ON public.page_events(geo_state)
  WHERE geo_state IS NOT NULL;

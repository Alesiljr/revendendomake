-- Add device type tracking to page_events
ALTER TABLE public.page_events
  ADD COLUMN device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop'));

CREATE INDEX idx_page_events_device_type
  ON public.page_events(device_type)
  WHERE device_type IS NOT NULL;

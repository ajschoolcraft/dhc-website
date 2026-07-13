-- Add opt-out column to applications
ALTER TABLE applications ADD COLUMN show_on_attendee_list boolean NOT NULL DEFAULT true;

-- Table for manually-added attendees (speakers, guests, etc.)
CREATE TABLE featured_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  title text,
  organization text NOT NULL,
  added_by text
);

ALTER TABLE featured_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage featured attendees"
  ON featured_attendees FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- View that unions both sources (only public display fields)
CREATE VIEW public_attendees AS
  SELECT first_name, last_name, title, organization
  FROM applications
  WHERE status = 'registered' AND show_on_attendee_list = true
UNION ALL
  SELECT first_name, last_name, title, organization
  FROM featured_attendees;

-- RPC function for anonymous access (Supabase doesn't support RLS on views)
CREATE OR REPLACE FUNCTION get_public_attendees()
RETURNS TABLE (
  first_name text,
  last_name text,
  title text,
  organization text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT first_name, last_name, title, organization
  FROM public_attendees
  ORDER BY last_name, first_name;
$$;

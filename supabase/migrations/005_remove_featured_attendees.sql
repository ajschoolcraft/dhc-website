-- Step 1: Migrate any featured_attendees that DON'T already exist in
-- applications (matched by first_name + last_name + organization).
-- These get inserted as registered attendees so no one is lost.
INSERT INTO applications (
  first_name, last_name, title, organization,
  role_category, application_types, status,
  consent_acknowledged, topic_interests, dietary_restrictions,
  reduced_fee_interest
)
SELECT
  fa.first_name, fa.last_name, fa.title, fa.organization,
  'other', ARRAY['attend'], 'registered',
  true, ARRAY[]::text[], ARRAY[]::text[],
  false
FROM featured_attendees fa
WHERE NOT EXISTS (
  SELECT 1 FROM applications a
  WHERE lower(a.first_name) = lower(fa.first_name)
    AND lower(a.last_name) = lower(fa.last_name)
    AND lower(a.organization) = lower(fa.organization)
);

-- Step 2: Update the view to only pull from applications
CREATE OR REPLACE VIEW public_attendees AS
  SELECT first_name, last_name, title, organization
  FROM applications
  WHERE status = 'registered' AND show_on_attendee_list = true;

-- Step 3: Update the RPC function to match
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

-- Step 4: Clean up the featured_attendees table (data already migrated)
DROP POLICY "Authenticated users can manage featured attendees" ON featured_attendees;
DROP TABLE featured_attendees;

-- Add dietary restrictions fields to applications
ALTER TABLE applications
  ADD COLUMN dietary_restrictions text[] DEFAULT '{}',
  ADD COLUMN dietary_restrictions_other text;

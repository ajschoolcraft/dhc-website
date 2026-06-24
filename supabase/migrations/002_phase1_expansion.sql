-- Expand applications table

-- New contact fields
ALTER TABLE applications ADD COLUMN phone text;
ALTER TABLE applications ADD COLUMN linkedin text;
ALTER TABLE applications ADD COLUMN city text;
ALTER TABLE applications ADD COLUMN state text;
ALTER TABLE applications ADD COLUMN country text;
ALTER TABLE applications ADD COLUMN organization_website text;

-- Application type (checkboxes)
ALTER TABLE applications ADD COLUMN application_types text[] NOT NULL DEFAULT '{}';

-- Rename attendee_type to role_category
ALTER TABLE applications RENAME COLUMN attendee_type TO role_category;

-- Topic interests (select up to 5)
ALTER TABLE applications ADD COLUMN topic_interests text[] NOT NULL DEFAULT '{}';

-- Short answer questions
ALTER TABLE applications ADD COLUMN current_role_description text;
ALTER TABLE applications ADD COLUMN questions_to_explore text;
ALTER TABLE applications ADD COLUMN practical_experience text;
ALTER TABLE applications ADD COLUMN speaker_topic_proposal text;

-- Registration preferences
ALTER TABLE applications ADD COLUMN registration_category text;
ALTER TABLE applications ADD COLUMN reduced_fee_interest boolean NOT NULL DEFAULT false;
ALTER TABLE applications ADD COLUMN consent_acknowledged boolean NOT NULL DEFAULT false;

-- Expand status values
ALTER TABLE applications DROP CONSTRAINT applications_status_check;

UPDATE applications SET status = 'new' WHERE status = 'pending';
UPDATE applications SET status = 'accepted_paid' WHERE status = 'approved';
UPDATE applications SET status = 'registered' WHERE status = 'paid';

ALTER TABLE applications ADD CONSTRAINT applications_status_check
  CHECK (status IN (
    'new', 'needs_review',
    'accepted_complimentary', 'accepted_reduced', 'accepted_paid',
    'speaker_consideration', 'sponsor_followup',
    'waitlist', 'declined', 'needs_more_info',
    'registered', 'withdrawn'
  ));

ALTER TABLE applications ALTER COLUMN status SET DEFAULT 'new';

-- Expand contact_submissions for sponsorship inquiries
ALTER TABLE contact_submissions ADD COLUMN type text NOT NULL DEFAULT 'general';
ALTER TABLE contact_submissions ADD COLUMN organization text;
ALTER TABLE contact_submissions ADD COLUMN phone text;

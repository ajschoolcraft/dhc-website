export type ApplicationStatus = "pending" | "approved" | "declined" | "paid";

export type Application = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  title: string | null;
  attendee_type: string;
  reason: string | null;
  status: ApplicationStatus;
  pricing_tier_id: string | null;
  stripe_payment_link: string | null;
  stripe_session_id: string | null;
  reviewed_at: string | null;
  paid_at: string | null;
};

export type PricingTier = {
  id: string;
  name: string;
  price_cents: number;
  description: string | null;
  active: boolean;
};

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
};

export type ApplicationFormData = {
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  title: string;
  attendee_type: string;
  reason: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

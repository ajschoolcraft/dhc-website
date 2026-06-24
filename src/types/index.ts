export type ApplicationStatus =
  | "new"
  | "needs_review"
  | "accepted_complimentary"
  | "accepted_reduced"
  | "accepted_paid"
  | "speaker_consideration"
  | "sponsor_followup"
  | "waitlist"
  | "declined"
  | "needs_more_info"
  | "registered"
  | "withdrawn";

export type Application = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  organization: string;
  organization_website: string | null;
  title: string | null;
  linkedin: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  application_types: string[];
  role_category: string;
  topic_interests: string[];
  reason: string | null;
  current_role_description: string | null;
  questions_to_explore: string | null;
  practical_experience: string | null;
  speaker_topic_proposal: string | null;
  registration_category: string | null;
  reduced_fee_interest: boolean;
  consent_acknowledged: boolean;
  status: ApplicationStatus;
  pricing_tier_id: string | null;
  stripe_payment_link: string | null;
  stripe_session_id: string | null;
  reviewed_at: string | null;
  paid_at: string | null;
};

export type ApplicationFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  organization_website: string;
  title: string;
  linkedin: string;
  city: string;
  state: string;
  country: string;
  application_types: string[];
  role_category: string;
  topic_interests: string[];
  current_role_description: string;
  questions_to_explore: string;
  practical_experience: string;
  speaker_topic_proposal: string;
  registration_category: string;
  reduced_fee_interest: boolean;
  consent_acknowledged: boolean;
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
  type: string;
  organization: string | null;
  phone: string | null;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type SponsorInquiryFormData = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
  sponsor_level_interest: string;
};

export const APPLICATION_TYPES = [
  { value: "attend", label: "Attend DHC26" },
  { value: "speak", label: "Be considered as a speaker" },
  { value: "moderate", label: "Moderate a session or roundtable" },
  { value: "small_group", label: "Participate in a small-group discussion" },
  { value: "sponsor", label: "Sponsor or partner" },
  { value: "nominate", label: "Nominate someone else" },
] as const;

export const ROLE_CATEGORIES = [
  { value: "health_system_counsel", label: "Health system GC / AGC / in-house counsel" },
  { value: "digital_health_counsel", label: "In-house counsel at digital health, health IT, AI, medtech, or life sciences company" },
  { value: "product_counsel", label: "Product counsel" },
  { value: "privacy_compliance", label: "Privacy / security / data governance / compliance leader" },
  { value: "legal_ops", label: "Legal operations leader" },
  { value: "ai_governance", label: "Healthcare AI governance leader" },
  { value: "clinical_tech", label: "Clinical, operational, or technology leader involved in AI deployment" },
  { value: "government_regulator", label: "Government / regulator / policy leader" },
  { value: "academic_researcher", label: "Academic / researcher" },
  { value: "outside_counsel", label: "Outside counsel / law firm lawyer" },
  { value: "legal_tech", label: "Legal technology company" },
  { value: "healthcare_tech", label: "Healthcare technology company" },
  { value: "insurance_risk", label: "Insurance / broker / risk advisory" },
  { value: "consultant", label: "Consultant" },
  { value: "investor_vc", label: "Investor / venture capital" },
  { value: "other", label: "Other" },
] as const;

export const TOPIC_INTERESTS = [
  { value: "health_system_ai_governance", label: "Health system AI governance" },
  { value: "ai_vendor_diligence", label: "AI vendor diligence and procurement" },
  { value: "contracting_healthcare_ai", label: "Contracting for healthcare AI" },
  { value: "evidence_of_value", label: "Evidence of value and claims substantiation" },
  { value: "liability_allocation", label: "Liability and allocation of responsibility" },
  { value: "fda_samd_cds", label: "FDA, SaMD, and clinical decision support" },
  { value: "consumer_health_ai", label: "Consumer health AI, chatbots, and mental health tools" },
  { value: "privacy_cybersecurity", label: "Privacy, cybersecurity, and health data governance" },
  { value: "data_rights", label: "Data rights, de-identification, model training, and secondary use" },
  { value: "product_counsel_issues", label: "Product counsel issues for healthcare AI companies" },
  { value: "interoperability", label: "Interoperability, EHRs, APIs, and data infrastructure" },
  { value: "rural_ai_adoption", label: "AI adoption in rural or resource-constrained healthcare settings" },
  { value: "ai_legal_operations", label: "AI for legal operations in healthcare legal teams" },
  { value: "insurance_risk_transfer", label: "Insurance, risk transfer, and professional liability" },
  { value: "board_oversight", label: "Board, executive, and enterprise risk oversight" },
  { value: "us_eu_regulation", label: "U.S./EU comparative regulation" },
] as const;

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "New",
  needs_review: "Needs Review",
  accepted_complimentary: "Accepted — Complimentary",
  accepted_reduced: "Accepted — Reduced Fee",
  accepted_paid: "Accepted — Paid",
  speaker_consideration: "Speaker Consideration",
  sponsor_followup: "Sponsor Follow-up",
  waitlist: "Waitlist",
  declined: "Declined",
  needs_more_info: "Needs More Info",
  registered: "Registered",
  withdrawn: "Withdrawn",
};

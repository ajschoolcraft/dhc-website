export type Speaker = {
  id: string;
  name: string;
  credentials?: string;
  title: string;
  organization: string;
};

export type Session = {
  time: string;
  title: string;
  description?: string;
  speakerIds?: string[];
  moderatorId?: string;
  type?: "break" | "session";
};

export type Schedule = {
  date: string;
  sessions: Session[];
};

export const speakers: Record<string, Speaker> = {
  "david-schoolcraft": {
    id: "david-schoolcraft",
    name: "David Schoolcraft",
    title: "Founder, Digital Health Counsel; Partner",
    organization: "Ogden Murphy Wallace",
  },
  "jonathan-carlson": {
    id: "jonathan-carlson",
    name: "Jonathan Carlson",
    title: "Managing Director",
    organization: "Microsoft Health Futures",
  },
  "emily-schlesinger": {
    id: "emily-schlesinger",
    name: "Emily Schlesinger",
    title: "Assistant General Counsel, Healthcare",
    organization: "Microsoft",
  },
  "alya-sulaiman": {
    id: "alya-sulaiman",
    name: "Alya Sulaiman",
    title: "Chief Compliance and Privacy Officer & SVP of Regulatory Affairs",
    organization: "Datavant",
  },
  "zach-harned": {
    id: "zach-harned",
    name: "Zach Harned",
    title: "IP and Technology Transaction Attorney",
    organization: "Fenwick & West",
  },
  "william-bartholomew": {
    id: "william-bartholomew",
    name: "William Bartholomew",
    title: "Public Policy Director, Office of Responsible AI",
    organization: "Microsoft",
  },
  "stephanie-simmons": {
    id: "stephanie-simmons",
    name: "Stephanie Simmons",
    title: "Director",
    organization: "Microsoft Health Futures",
  },
  "kathleen-sullivan": {
    id: "kathleen-sullivan",
    name: "Kathleen Sullivan",
    title: "Senior Director",
    organization: "Microsoft Health Futures",
  },
  "valerie-carricaburu": {
    id: "valerie-carricaburu",
    name: "Valerie Carricaburu",
    title: "Director, Corp BD",
    organization: "Microsoft",
  },
  "adina-mueller": {
    id: "adina-mueller",
    name: "Adina Mueller",
    title: "Sr. Associate General Counsel",
    organization: "Fred Hutchinson Cancer Center",
  },
  "tayab-waseem": {
    id: "tayab-waseem",
    name: "Tayab Waseem",
    credentials: "MD, PhD",
    title: "Physician and Researcher",
    organization: "",
  },
};

export const schedule: Schedule = {
  date: "Friday, March 14, 2025",
  sessions: [
    {
      time: "8:30 AM – 9:00 AM",
      title: "Registration and Networking",
      type: "break",
    },
    {
      time: "9:00 AM – 9:15 AM",
      title: "Welcome and Opening Remarks",
      speakerIds: ["david-schoolcraft"],
    },
    {
      time: "9:15 AM – 10:00 AM",
      title: "Keynote: Innovating Towards a Healthier Future",
      description:
        "How AI will accelerate the iterative cycles of biomedicine, transforming both biological discovery and clinical delivery.",
      speakerIds: ["jonathan-carlson"],
    },
    {
      time: "10:00 AM – 10:45 AM",
      title: "Panel: Legal and Regulatory Landscape for Biomedicine",
      description:
        "Legal challenges, regulatory uncertainties, and the critical importance of self-regulation and industry-led coalitions.",
      moderatorId: "david-schoolcraft",
      speakerIds: [
        "emily-schlesinger",
        "alya-sulaiman",
        "zach-harned",
        "william-bartholomew",
      ],
    },
    {
      time: "10:45 AM – 11:15 AM",
      title: "Coffee and Networking Break",
      type: "break",
    },
    {
      time: "11:15 AM – 12:00 PM",
      title: "Panel: Enabling Effective AI Collaborations in Biomedicine",
      description:
        "The critical ingredients for effective collaboration and deployment leading to impact at scale in AI-enabled health and biomedical research.",
      moderatorId: "stephanie-simmons",
      speakerIds: [
        "kathleen-sullivan",
        "valerie-carricaburu",
        "adina-mueller",
        "tayab-waseem",
      ],
    },
    {
      time: "12:00 PM – 12:30 PM",
      title: "Q&A and Closing",
      speakerIds: ["stephanie-simmons", "david-schoolcraft"],
    },
    {
      time: "12:30 PM – 1:00 PM",
      title: "Networking and Refreshments",
      type: "break",
    },
  ],
};

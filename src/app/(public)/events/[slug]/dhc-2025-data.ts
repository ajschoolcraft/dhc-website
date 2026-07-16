export type Speaker = {
  id: string;
  name: string;
  credentials?: string;
  title: string;
  organization: string;
  bio: string;
  photo: string;
  photoPosition?: string;
};

export type Session = {
  time: string;
  title: string;
  speakerIds?: string[];
  type?: "break" | "session";
};

export type DaySchedule = {
  day: string;
  date: string;
  sessions: Session[];
};

export const speakers: Record<string, Speaker> = {
  "dave-schoolcraft": {
    id: "dave-schoolcraft",
    name: "Dave Schoolcraft",
    credentials: "JD",
    title: "Partner and Chair, Digital Health Team",
    organization: "Ogden Murphy Wallace",
    bio: "Dave Schoolcraft has worked for more than 25 years at the intersection of health care, law and all things digital. He is a Partner and Chair of the Digital Health Team at the Ogden Murphy Wallace law firm in Seattle. He provides strategic guidance to health care provider organizations and technology companies seeking to drive health system transformation. Dave has a national practice advising clients on technology licensing, artificial intelligence, data governance, health information privacy and security issues. Dave is also the founder of the Digital Health Counsel AI Summit, an annual event bringing together professionals working on the next wave of AI and data-driven innovation in health care.",
    photo: "/images/speakers/dhc-2025/dave-schoolcraft.jpg",
  },
  "stephanie-simmons": {
    id: "stephanie-simmons",
    name: "Stephanie Simmons",
    credentials: "JD, AIGP",
    title: "Director of Health AI Governance and Policy",
    organization: "Microsoft Research Health Futures",
    bio: "Stephanie Simmons has nearly 30 years of experience as an attorney, regulatory professional, and strategic advisor to technology executives and research and incubation teams. In her current role as Director of Health AI Governance and Policy at Microsoft Research Health Futures, Stephanie is known for her ability to translate emerging legal and compliance requirements into actionable guidance for scientists and engineers, collaborating across disciplines to shape the future of AI in healthcare.",
    photo: "/images/speakers/dhc-2025/stephanie-simmons.jpg",
    photoPosition: "center 30%",
  },
  "peter-lee": {
    id: "peter-lee",
    name: "Peter Lee",
    title: "President, Microsoft Research",
    organization: "Microsoft",
    bio: "Peter Lee is President, Microsoft Research, leading research across 14 worldwide laboratories. He is a member of the National Academy of Medicine and serves on the boards of several institutions in AI and medicine, including the Board of Trustees of the Mayo Clinic and the Board of Directors of the Kaiser Permanente School of Medicine. Under President Obama, he was a Commissioner on Enhancing National Cybersecurity. In 2023, he coauthored \"The AI Revolution in Medicine, GPT-4 and Beyond\" and hosted the podcast series \"The AI Revolution in Medicine, Revisited\" a follow-up to the book. He was named by Time magazine in 2024 as one of the 100 most influential people in health and life sciences.",
    photo: "/images/speakers/dhc-2025/peter-lee.jpg",
  },
  "glenn-cohen": {
    id: "glenn-cohen",
    name: "Glenn Cohen",
    credentials: "Prof.",
    title: "Professor of Law",
    organization: "Harvard Law School",
    bio: "Prof. Glenn Cohen is one of the world's leading experts on the intersection of bioethics (sometimes also called \"medical ethics\") and the law, as well as health law. He also teaches civil procedure. He has advised the U.S. Vice President on reproductive rights, discussed medical AI policy with members of the Korean Congress, and lectured to legal, medical, and industry conferences around the world. His work has been frequently covered by or appeared in PBS, NPR, ABC, NBC, CBS, CNN, MSNBC, Mother Jones, the New York Times, The Washington Post, the Boston Globe, and many other media venues.",
    photo: "/images/speakers/dhc-2025/glenn-cohen.jpg",
    photoPosition: "0% top",
  },
  "julie-barnes": {
    id: "julie-barnes",
    name: "Julie Barnes",
    title: "Strategic Advisor",
    organization: "",
    bio: "Julie Barnes is a strategic advisor to organizations that need guidance about federal health policies and how to develop relationships with policymakers and influential advocacy organizations. As a former Capitol Hill staffer, health care attorney, and policy program director, Ms. Barnes informs business strategy in several healthcare arenas, including artificial intelligence, interoperability, data privacy, public and private health insurance and new payment models, and price transparency.",
    photo: "/images/speakers/dhc-2025/rachel-gruner.jpg",
  },
  "ty-kayam": {
    id: "ty-kayam",
    name: "Ty Kayam",
    credentials: "JD",
    title: "Regulatory and Transactional Attorney, Digital Health Center of Excellence",
    organization: "FDA",
    bio: "Ty Kayam is a regulatory and transactional attorney focused on digital health and artificial intelligence. She joined the FDA as the first attorney within the Digital Health Center of Excellence, where she leads legal and policy work on AI-enabled and digital health technologies. Her portfolio includes Predetermined Change Control Plans for AI-enabled medical devices, AI-related guidance development for both devices and drug development, postmarket monitoring frameworks, clinical decision support, and MDUFA digital-health commitments. She also supports cross-agency and international harmonization efforts through FDA's engagement with IMDRF and serves on the AI Council, helping shape the Center's policy approach to AI. Ty additionally provides review and drafting support on legislative and regulatory proposals affecting AI and digital health.",
    photo: "/images/speakers/dhc-2025/maddie-haller.jpg",
  },
  "rachel-gruner": {
    id: "rachel-gruner",
    name: "Rachel Gruner",
    title: "Government Affairs Healthcare Lead",
    organization: "Microsoft AI",
    bio: "Rachel Gruner is a leading voice in the intersection of technology and healthcare policy, driven by a passion for leveraging innovation to improve health outcomes. She is currently the Government Affairs Healthcare Lead for Microsoft AI, where she plays a critical role in shaping policy and dialogue around the responsible and effective use of artificial intelligence in the health sector. Rachel brings a wealth of experience from both the public and private sectors. She spent a decade at the Department of Health and Human Services (HHS), holding key policy and leadership positions across the Centers for Disease Control and Prevention (CDC), the Surgeon General's Office, and the Office of the Assistant Secretary for Planning and Evaluation (ASPE). In these roles, she was instrumental in developing and implementing innovative health policies and programs.",
    photo: "/images/speakers/dhc-2025/ty-kayam.jpg",
  },
  "maddie-haller": {
    id: "maddie-haller",
    name: "Maddie Haller",
    credentials: "JD",
    title: "Healthcare Attorney",
    organization: "Ogden Murphy Wallace",
    bio: "Maddie Haller is a healthcare attorney with Ogden Murphy Wallace. She represents health centers, hospitals, and other clients in transactional matters of all types. She also regularly advises clients on regulatory and emerging issues relevant to healthcare organizations, including data privacy and AI governance.",
    photo: "/images/speakers/dhc-2025/julie-barnes.jpg",
    photoPosition: "20% top",
  },
  "vardit-ravitsky": {
    id: "vardit-ravitsky",
    name: "Vardit Ravitsky",
    title: "President and CEO",
    organization: "The Hastings Center",
    bio: "Vardit Ravitsky is the President and CEO of the Hastings Center, an independent, nonpartisan bioethics research institute that is among the most prestigious bioethics and health policy institutes in the world. She is a Senior Lecturer on Global Health and Social Medicine at Harvard Medical School. Previously, she was a Full Professor at the Bioethics Program, School of Public Health, University of Montreal. She is Past-President of the International Association of Bioethics, and a Fellow of the Canadian Academy of Health Sciences.",
    photo: "/images/speakers/dhc-2025/vardit-ravitsky.jpg",
  },
  "mathew-soskins": {
    id: "mathew-soskins",
    name: "Mathew Soskins",
    title: "In-House Counsel",
    organization: "CommonSpirit Health",
    bio: "As in-house counsel, Mathew Soskins helps CommonSpirit Health responsibly develop and implement emerging technologies. Matt also teaches healthcare law and bioethics at Seattle University School of Law. In his spare time, Matt loves travel, live theater, and trying to be an early adopter of new ideas and technology — especially when they confuse or scare him.",
    photo: "/images/speakers/dhc-2025/mathew-soskins.jpg",
  },
  "aimee-brice": {
    id: "aimee-brice",
    name: "Aimeé Brice",
    credentials: "JD",
    title: "Healthcare Transactions and Regulatory Attorney",
    organization: "Seattle Children's Hospital",
    bio: "Aimeé Brice is a healthcare transactions and regulatory attorney with 20 years of experience — 16 years with health systems and 4 years with a local Seattle virtual care startup during COVID. Aimée currently works for Seattle Children's Hospital.",
    photo: "/images/speakers/dhc-2025/aimee-brice.jpg",
  },
  "alifia-hasan": {
    id: "alifia-hasan",
    name: "Alifia Hasan",
    title: "Innovation Portfolio Manager",
    organization: "Duke Institute for Health Innovation (DIHI)",
    bio: "Alifia Hasan is an Innovation Portfolio Manager at DIHI and leads the project management and implementation of externally funded projects. These projects bring together domain experts, community representatives, and academic leaders to cultivate an ecosystem that promotes safe, effective, and responsible diffusion of AI/ML in healthcare. Her other projects use innovative data science techniques to help solve challenging clinical problems. Together with the DIHI team, she hopes to build products that use technology to create value for patients.",
    photo: "/images/speakers/dhc-2025/alifia-hasan.jpg",
  },
  "thomas-osborne": {
    id: "thomas-osborne",
    name: "Thomas Osborne",
    credentials: "MD",
    title: "Chief Medical Officer, Microsoft Federal; Clinical Professor, Stanford",
    organization: "Microsoft",
    bio: "Thomas Osborne is the Chief Medical Officer at Microsoft Federal, and Clinical Professor at Stanford (adjunct). He is internationally known for his advanced work at the intersection of healthcare, technology, and business that has positively transformed healthcare. Dr. Osborne earned his medical degree from Dartmouth Medical School and completed his clinical residency and fellowship at Harvard hospitals.",
    photo: "/images/speakers/dhc-2025/thomas-osborne.jpg",
  },
  "peter-hames": {
    id: "peter-hames",
    name: "Peter Hames",
    title: "VP Health",
    organization: "Microsoft AI",
    bio: "Peter Hames is VP Health, Microsoft AI. Previously, Peter co-founded digital therapeutics company Big Health, and was Board Chair of the global Digital Therapeutics Alliance. Big Health's non-drug digital treatments, including Sleepio for Insomnia Disorder and Daylight for GAD, have been shown to be safe and effective across 80+ clinical publications, including 16 RCTs. Millions of people worldwide now have fully reimbursed access to Big Health therapeutics, across the US via leading PBMs and Medicare reimbursement. In the UK, Sleepio was the first fully digital treatment to receive NICE approval in 2022. Peter holds a Master's degree in Experimental Psychology from Oxford University.",
    photo: "/images/speakers/dhc-2025/peter-hames.jpg",
  },
  "justin-brown": {
    id: "justin-brown",
    name: "Justin Brown",
    title: "Former Cabinet Secretary of Human Services",
    organization: "State of Oklahoma",
    bio: "Justin Brown served as Oklahoma's Cabinet Secretary of Human Services and Director of the Oklahoma Department of Human Services from 2019 to 2023. In July 2023, Brown stepped away from state service with confidence in the transition strategy and with a deep desire to continue human services transformation across America through independent consulting.",
    photo: "/images/speakers/dhc-2025/justin-brown.jpg",
  },
  "laura-jantos": {
    id: "laura-jantos",
    name: "Laura Jantos",
    title: "Healthcare IT Leader and Consultant",
    organization: "",
    bio: "Laura Jantos is a healthcare IT leader and consultant with over 30 years of experience designing and implementing digital health solutions. After surviving two traumatic brain injuries, she experienced firsthand the gaps patients face when navigating their own care. That journey reshaped her focus: today, she helps organizations harness digital health, AI, and patient-centered design to improve outcomes and empower individuals.",
    photo: "/images/speakers/dhc-2025/tina-burbine.jpg",
  },
  "tina-burbine": {
    id: "tina-burbine",
    name: "Tina Burbine",
    title: "Co-Founder",
    organization: "Rural Health Community",
    bio: "Tina Burbine is a recognized industry leader in healthcare and Co-Founder of the Rural Health Community. She leads the mission-driven nonprofit in creating and deploying specialized programs that address the critical needs of rural healthcare organizations. Tina applies her deep experience in care innovation to build sustainable health resiliency for rural communities. Tina holds an MBA in addition to other industry certifications and lectures at the University of Arizona BioMedical Informatics College Fellowship program.",
    photo: "/images/speakers/dhc-2025/laura-jantos.jpg",
  },
  "alya-sulaiman": {
    id: "alya-sulaiman",
    name: "Alya Sulaiman",
    credentials: "JD, CIPP/US",
    title: "Chief Compliance and Privacy Officer; SVP of Regulatory Affairs",
    organization: "Datavant",
    bio: "Alya Sulaiman leads compliance, privacy, AI governance, and regulatory affairs at Datavant. As Chief Compliance and Privacy Officer and SVP of Regulatory Affairs, she drives Datavant's compliance and privacy strategy and provides expertise on healthcare's evolving regulatory framework for data access, use, AI, and interoperability. Before joining Datavant, Alya was a partner at the law firm McDermott Will & Schulte, corporate counsel and the director of health policy and regulatory affairs for Epic, and she held roles leading privacy and legal functions at California's statewide health information exchange Manifest MedEX, a multi-specialty healthcare provider organization, and an early stage software analytics company.",
    photo: "/images/speakers/dhc-2025/alya-sulaiman.jpg",
  },
  "emily-schlesinger": {
    id: "emily-schlesinger",
    name: "Emily Schlesinger",
    credentials: "JD",
    title: "Assistant General Counsel",
    organization: "Microsoft",
    bio: "Emily Schlesinger is an Assistant General Counsel at Microsoft, specializing in healthcare AI. She advises on complex transactions, product development, and regulatory compliance. Since joining Microsoft in 2011, Emily has led major initiatives, including Nuance integration and redefining legal support for the healthcare vertical.",
    photo: "/images/speakers/dhc-2025/emily-schlesinger.jpg",
  },
  "josh-mandel": {
    id: "josh-mandel",
    name: "Josh Mandel",
    credentials: "MD",
    title: "Chief Architect, Microsoft Healthcare; Chief Architect, SMART Health IT",
    organization: "Microsoft / Harvard Medical School",
    bio: "Josh Mandel is a physician and software developer working to fuel an ecosystem of health apps with access to clinical and research data. As Chief Architect for Microsoft Healthcare, Chief Architect for SMART Health IT, and Lecturer at the Harvard Medical School Department of Biomedical Informatics, Josh works closely with the standards development community to lay groundwork for frictionless data access, authorization, analytics, and app integration. Josh leads development of the SMART on FHIR specification (the basis for US Patient Access API capabilities that certified EHRs must support) and the SMART Health Cards specification (used by pharmacies, public health departments, and healthcare providers to issue verifiable records of vaccination status).",
    photo: "/images/speakers/dhc-2025/josh-mandel.jpg",
  },
  "gurpreet-singh": {
    id: "gurpreet-singh",
    name: "Gurpreet Singh",
    title: "Senior Vice President, Interoperability Strategy and Solutions",
    organization: "ELLKAY",
    bio: "Gurpreet Singh aka GP is the Senior Vice President for Interoperability Strategy and Solutions at ELLKAY. He has been with ELLKAY for over 7 years. GP is a thought leader in the Healthcare Interoperability space over the last many years. He has been on the Advisory Board of organizations like CareQuality and CommonWell. Under his leadership, ELLKAY has become the technology service provider for CommonWell Health Alliance servicing over 260 million unique patients and handling about 12 billion transactions annually. GP is very closely associated with the White House and HHS/CMS initiatives around data interoperability and data exchange. He is a prominent voice promoting the value of enabling data exchange not just in the US, but in Canada, UK, Ireland and the Middle East.",
    photo: "/images/speakers/dhc-2025/gurpreet-singh.jpg",
  },
  "dan-liljenquist": {
    id: "dan-liljenquist",
    name: "Dan Liljenquist",
    title: "Chief Strategy Officer",
    organization: "Intermountain Health",
    bio: "Dan Liljenquist is Chief Strategy Officer at Intermountain Health, where he leads enterprise strategy, corporate development, and digital technology services. He is also the founding architect and board chair of Civica Rx, a nonprofit drug company working to make essential generic medications more affordable. Dan brings deep public policy and innovation expertise to his work, including leadership in AI-driven transformation across healthcare.",
    photo: "/images/speakers/dhc-2025/dan-liljenquist.jpg",
  },
  "jeremy-cauwels": {
    id: "jeremy-cauwels",
    name: "Jeremy Cauwels",
    credentials: "MD, FACP, FHM",
    title: "Chief Medical Officer",
    organization: "Sanford Health",
    bio: "Jeremy Cauwels serves as Sanford Health's chief medical officer. In this role, he represents physician interests to the executive leadership team and Board of Trustees. He also chairs the quality cabinet, champions the system's effort to become a highly reliable organization and oversees enterprise aspects of the medical staff. Prior to his appointment to chief physician in 2021, Cauwels led safety, quality and patient experience as senior vice president of quality. He also served as vice president and chief medical officer for Sanford Health Plan. Cauwels started with Sanford Health as a hospitalist in Sioux Falls in 2006, was promoted to director of the group and eventually became Sanford USD Medical Center's chief of staff.",
    photo: "/images/speakers/dhc-2025/jeremy-cauwels.jpg",
  },
  "david-willis": {
    id: "david-willis",
    name: "David Willis",
    title: "Vice President of Convening and Development",
    organization: "Mindshare Institute, Intermountain Health",
    bio: "David Willis serves as the Vice President of Convening and Development for the Mindshare Institute, a division of Intermountain Health focused on solving market failures that are hurting people. Dave has over 30 years experience as a management consultant and general manager, the majority of which have been spent advising the C-suite and boards at leading healthcare organizations across the globe. Passionate about helping leaders implement transformative change, Dave's career is predicated on the belief that for any strategy to be successful, it must galvanize the hearts and minds of all those involved.",
    photo: "/images/speakers/dhc-2025/david-willis.jpg",
  },
  "laura-kreofsky": {
    id: "laura-kreofsky",
    name: "Laura Kreofsky",
    title: "Lead, Microsoft Elevate Rural Health Resiliency Program",
    organization: "Microsoft",
    bio: "Laura Kreofsky's expertise is driving digital transformation for social impact. In her extensive healthcare career she has worked in both tech and operations, served the public and private sectors, led consulting firms and been an advocate and thought leader, always with a focus on serving rural and under-resourced organizations. Today, Laura leads Microsoft Elevate's Rural Health Resiliency program, which brings AI, innovation, and cyber services and solutions to rural health. Laura serves on the advisory board of healthcare professional associations and digital health startups and is a member of Delta Omega, the Public Health Honor Society.",
    photo: "/images/speakers/dhc-2025/laura-kreofsky.jpg",
    photoPosition: "30% top",
  },
  "christopher-chen": {
    id: "christopher-chen",
    name: "Christopher Chen",
    credentials: "MD, MBA",
    title: "Medical Director for Medicaid",
    organization: "WA State Health Care Authority",
    bio: "Christopher Chen is the Medical Director for Medicaid at the WA State Health Care Authority. He helps lead clinical policy and strategy at the agency, and supports initiatives in health information technology, telehealth, quality, and health equity. He is board certified in internal medicine and clinical informatics, sits on the NCQA Public Sector Advisory Council, serves as Chair Emeritus of the Medicaid Medical Director's Network and recently served as a Milbank Fellow.",
    photo: "/images/speakers/dhc-2025/christopher-chen.jpg",
  },
  "tayab-waseem": {
    id: "tayab-waseem",
    name: "Tayab Waseem",
    credentials: "MD, PhD",
    title: "Emergency Physician and AI Researcher",
    organization: "",
    bio: "Tayab Waseem is an emergency physician and AI researcher working at the intersection of medicine, technology, and policy. He serves as a technical expert on AI for the World Health Organization, has led White House OSTP initiatives on AI in healthcare, chaired national committees on AI in medicine, and served as a cofounder and Chief Scientific Officer of Stability AI. His work now focuses on uniting clinical insight, technology, and policy to ensure AI improves healthcare safely and equitably.",
    photo: "/images/speakers/dhc-2025/tayab-waseem.jpg",
    photoPosition: "center 10%",
  },
  "jp-heres": {
    id: "jp-heres",
    name: "JP Heres",
    title: "Vice President",
    organization: "Epic",
    bio: "JP Heres is Vice President at Epic, where he oversees the Community Connect program, working with health systems to support over three hundred hospitals in a hub-and-spoke model. He has led Epic's shift to software-as-a-service and now focuses on helping organizations apply AI in meaningful ways to improve healthcare delivery.",
    photo: "/images/speakers/dhc-2025/jp-heres.jpg",
  },
};

export const schedule: DaySchedule[] = [
  {
    day: "Day 1",
    date: "Wednesday, November 19th",
    sessions: [
      {
        time: "8:30 – 9:00 a.m.",
        title: "Registration, Breakfast & Networking",
        type: "break",
      },
      {
        time: "9:00 – 9:15 a.m.",
        title: "Welcome",
        speakerIds: ["dave-schoolcraft", "stephanie-simmons"],
      },
      {
        time: "9:15 – 10:00 a.m.",
        title: "Reflections on the AI Revolution in Medicine and Ecosystem Transformation",
        speakerIds: ["peter-lee"],
      },
      {
        time: "10:15 – 11:00 a.m.",
        title: "Role of the Law in Building Trust and Advancing Healthcare Innovation",
        speakerIds: ["glenn-cohen"],
      },
      {
        time: "11:15 a.m. – 12:00 p.m.",
        title: "Digital Health Policy — The Current State of Play",
        speakerIds: ["julie-barnes", "ty-kayam", "rachel-gruner"],
      },
      {
        time: "12:00 – 1:00 p.m.",
        title: "Lunch",
        type: "break",
      },
      {
        time: "1:00 – 1:45 p.m.",
        title: "AI Governance and the Foundations of Trust",
        speakerIds: [
          "maddie-haller",
          "vardit-ravitsky",
          "mathew-soskins",
          "aimee-brice",
          "alifia-hasan",
        ],
      },
      {
        time: "2:00 – 2:45 p.m.",
        title: "Consumer AI and the Patient’s Perspective",
        speakerIds: [
          "thomas-osborne",
          "peter-hames",
          "justin-brown",
          "laura-jantos",
          "tina-burbine",
        ],
      },
      {
        time: "3:00 – 3:45 p.m.",
        title: "Progress on Interoperability and Data Sharing",
        speakerIds: [
          "dave-schoolcraft",
          "alya-sulaiman",
          "emily-schlesinger",
          "josh-mandel",
          "gurpreet-singh",
        ],
      },
      {
        time: "4:00 – 4:45 p.m.",
        title: "Hub & Spoke Model as a Case Study to Strengthen Rural Health",
        speakerIds: [
          "stephanie-simmons",
          "dan-liljenquist",
          "jeremy-cauwels",
          "david-willis",
        ],
      },
      {
        time: "4:45 – 5:00 p.m.",
        title: "Day 1 Wrap-up and Day 2 Preview",
        type: "break",
      },
      {
        time: "5:00 – 6:30 p.m.",
        title: "Reception and Networking",
        type: "break",
      },
    ],
  },
  {
    day: "Day 2",
    date: "Thursday, November 20th",
    sessions: [
      {
        time: "8:30 – 9:15 a.m.",
        title: "Opening Remarks",
        speakerIds: ["dan-liljenquist"],
      },
      {
        time: "9:15 – 9:45 a.m.",
        title: "Innovation Talk — Disruptive Collaboration in Healthcare",
        speakerIds: ["david-willis"],
      },
      {
        time: "9:45 – 10:00 a.m.",
        title: "Q & A / Transition Break",
        type: "break",
      },
      {
        time: "10:00 – 11:00 a.m.",
        title: "Innovation Talks and Table Discussions — State RHT Proposals",
        speakerIds: ["laura-kreofsky", "christopher-chen"],
      },
      {
        time: "11:00 a.m. – 12:00 p.m.",
        title: "Innovation Talks and Table Discussions — Last Mile AI Implementation",
        speakerIds: ["tayab-waseem", "mathew-soskins"],
      },
      {
        time: "12:00 – 12:30 p.m.",
        title: "Transition & Get Lunch",
        type: "break",
      },
      {
        time: "12:30 – 1:30 p.m.",
        title: "Lunch Talk on Scaling Virtual Healthcare",
        speakerIds: ["jeremy-cauwels", "thomas-osborne"],
      },
      {
        time: "1:00 – 2:00 p.m.",
        title: "Policy Fireside Chat — Re-Platforming Healthcare",
        speakerIds: ["dan-liljenquist", "jp-heres"],
      },
      {
        time: "2:00 – 2:30 p.m.",
        title: "Wrap Up & Closing Remarks",
        type: "break",
      },
    ],
  },
];

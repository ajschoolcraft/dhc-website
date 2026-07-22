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
    bio: "Dave Schoolcraft has worked for more than 25 years at the intersection of health care, law and all things digital. He is a Partner and Chair of the Digital Health Team at the Ogden Murphy Wallace law firm in Seattle. He provides strategic guidance to health care provider organizations and technology companies seeking to drive health system transformation. Dave has a national practice advising clients on technology licensing, artificial intelligence, data governance, health information privacy and security issues. Dave is also the founder of the Digital Health Group, LLC which produces collaborative events for those working on the next wave of AI and data-driven innovation in health care.",
    photo: "/images/speakers/dhc-2023/dave-schoolcraft.jpg",
  },
  "jose-morey": {
    id: "jose-morey",
    name: "José Morey",
    credentials: "MD",
    title: "Chief Executive Officer and Founder",
    organization: "Ad Astra Media LLC",
    bio: "José Morey is Chief Executive Officer and Founder of Ad Astra Media LLC, an Eisenhower Fellow, and Co-Founder of Ever Medical Technologies. He is a health and technology keynote speaker, author, and consultant for NASA, Forbes, MIT, the United Nations World Food Program and the White House Office of Science and Technology Policy. He is considered the world's first Intergalactic Doctor and is often featured on Forbes, Univision, CNBC, and NASA360. He coined Puerto Rico as the future \"Silicon Island\" as appeared in Forbes, The Weekly Journal, Reddit and Hispanic Executive. Along with Frank Carbajal, he is co-author of \"LatinX Business Success\" by Wiley Publishing.",
    photo: "/images/speakers/dhc-2023/jose-morey.jpg",
  },
  "casey-moriarty": {
    id: "casey-moriarty",
    name: "Casey Moriarty",
    credentials: "JD",
    title: "Attorney, Health Care Practice Group",
    organization: "Ogden Murphy Wallace",
    bio: "Casey Moriarty is an attorney in the Ogden Murphy Wallace health care practice group. Casey represents hospitals, community health centers, provider networks, and other health care providers with transactional and compliance issues. Casey works extensively on legal issues related to patient privacy, including compliance with HIPAA, and the HITECH Act. Casey also advises health care entities on governance, compliance, and transactional issues related to the formation of clinically integrated networks, accountable care organizations, and other health reform initiatives that are focused on value-based care. Casey received his bachelor's degree from Yale University and his law degree from Seattle University.",
    photo: "/images/speakers/dhc-2023/casey-moriarty.jpg",
  },
  "maddie-haller": {
    id: "maddie-haller",
    name: "Maddie Haller",
    credentials: "JD",
    title: "Healthcare Attorney",
    organization: "Ogden Murphy Wallace",
    bio: "Maddie Haller advises healthcare organizations and digital health companies on transactional and regulatory matters of all types. Maddie's areas of focus include mergers/affiliations, health information privacy and security, and risk mitigation strategies. Before joining Ogden Murphy Wallace, Maddie clerked for Judge Mary Kay Becker of the Washington State Court of Appeals, Division One. Maddie received her JD from the University of Washington School of Law and her BA from Boston College.",
    photo: "/images/speakers/dhc-2023/maddie-haller.jpg",
  },
  "jefferson-lin": {
    id: "jefferson-lin",
    name: "Jefferson Lin",
    credentials: "JD",
    title: "Attorney",
    organization: "Fenwick",
    bio: "Jefferson Lin represents digital health, life sciences and technology companies in complex transactions. He regularly counsels clients with respect to intellectual property licensing, data privacy and security, and healthcare regulatory issues. He is also involved in corporate transactions such as mergers, asset acquisitions and venture capital investments. Jefferson received his JD from the University of Washington School of Law and his BA from Williams College.",
    photo: "/images/speakers/dhc-2023/jefferson-lin.jpg",
  },
  "elana-zana": {
    id: "elana-zana",
    name: "Elana Zana",
    credentials: "JD",
    title: "Vice President of Legal and Compliance",
    organization: "Navigating Cancer",
    bio: "Elana Zana is Vice President of Legal and Compliance at Navigating Cancer and is a former partner at Ogden Murphy Wallace. As the sole legal counsel for Navigating Cancer, Elana provides advice on data privacy and security, certification and regulatory requirements, employment, commercial contracts, general business matters, and what she enjoys most, strategizing with the product and engineering team on creating digital health tools to achieve better patient outcomes.",
    photo: "/images/speakers/dhc-2023/elana-zana.jpg",
  },
  "paul-isabelli": {
    id: "paul-isabelli",
    name: "Paul Isabelli",
    title: "COO",
    organization: "Audere",
    bio: "Paul Isabelli is COO of Audere. Having held executive leadership roles and managed product strategy and partnerships at GE Healthcare, Caradigm and Inspirata, Paul has a deep understanding of population health, data integration systems, interoperability, and regulatory compliance. At Audere, Paul has been instrumental in defining Audere's product strategy and in defining how its digital health solutions are positioned in the market.",
    photo: "/images/speakers/dhc-2023/paul-isabelli.jpg",
  },
  "adriana-lein": {
    id: "adriana-lein",
    name: "Adriana Lein",
    credentials: "JD, MSc",
    title: "Associate, Healthcare Group",
    organization: "Ogden Murphy Wallace",
    bio: "Adriana Lein is an associate in the Healthcare group of Ogden Murphy Wallace's Seattle Office. In this role, she advises healthcare providers and technology companies on matters related to digital health, health information privacy and security, employment laws, and a range of corporate transactions and regulatory issues. Prior to legal practice, Adriana's professional experiences focused on global health equity and public policy while affiliated with Duke University and the Urban Health Collaborative. She received her JD from the University of Washington where she served as the Executive Articles Editor of the Washington Law Review.",
    photo: "/images/speakers/dhc-2023/adriana-lein.jpg",
  },
  "gail-javitt": {
    id: "gail-javitt",
    name: "Gail Javitt",
    credentials: "JD",
    title: "FDA Regulatory Advisor",
    organization: "",
    bio: "Gail Javitt provides strategic FDA regulatory advice to leading life sciences companies in areas including medical devices, diagnostics, laboratory testing, clinical trials, and human cellular, and tissue-based products (HCT/Ps). She previously served as law and policy director at the Genetics and Public Policy Center, at Johns Hopkins University, developing policy options for reproductive and other genetic technologies.",
    photo: "/images/speakers/dhc-2023/gail-javitt.jpg",
  },
  "martin-stumpe": {
    id: "martin-stumpe",
    name: "Martin Stumpe",
    credentials: "PhD",
    title: "Chief of AI",
    organization: "Tempus",
    bio: "Dr. Martin Stumpe serves as the Chief of AI at Tempus. Prior to joining Tempus, he founded and led the Cancer Pathology project at Google, which uses artificial intelligence to increase the accuracy in image-based cancer detection and grading. His team also succeeded in integrating these diagnostics into optical microscopy for real-time augmented intelligence. Earlier in his career, Dr. Stumpe was part of the Kepler team at NASA Ames Research Center in Mountain View, California, where he was responsible for the development of algorithms to detect extrasolar planets from stellar light curves.",
    photo: "/images/speakers/dhc-2023/martin-stumpe.jpg",
  },
  "maggie-huston": {
    id: "maggie-huston",
    name: "Maggie Huston",
    credentials: "JD",
    title: "Deputy General Counsel",
    organization: "Tempus",
    bio: "Maggie Huston is Deputy General Counsel at Tempus, a clinical laboratory and technology company advancing precision medicine through the practical application of artificial intelligence in healthcare. At Tempus, Maggie provides guidance on clinical laboratory operations, in vitro diagnostic and artificial intelligence/machine learning product development, and use of real world data. She also drafts and negotiates a range of clinical and research collaboration agreements with healthcare providers, academic research institutions, and life sciences companies.",
    photo: "/images/speakers/dhc-2023/maggie-huston.jpg",
  },
  "don-rucker": {
    id: "don-rucker",
    name: "Don Rucker",
    credentials: "MD",
    title: "Chief Strategy Officer",
    organization: "1upHealth",
    bio: "Dr. Don Rucker is Chief Strategy Officer at 1upHealth which provides scalable serverless FHIR data pipelines that enable the modern data world. He recently served as the National Coordinator at ONC where he led the writing of the ONC 21st Century Cures Act Interoperability Rule giving patients control of their medical records using apps of the patient's choosing. Dr. Rucker pioneered the policy building the HL7 Bulk FHIR standard which enables effective use of EHR data for \"big data\" analytic and operational tools. He co-developed the world's first Windows based EMR and continued with transformative work in computerized physician order entry as well as leading policy for health information exchange.",
    photo: "/images/speakers/dhc-2023/don-rucker.jpg",
  },
  "jim-markwith": {
    id: "jim-markwith",
    name: "Jim Markwith",
    credentials: "JD",
    title: "Chief Legal Officer",
    organization: "Prescryptive Health, Inc.",
    bio: "Jim Markwith is the Chief Legal Officer at Prescryptive Health, Inc. Prior to Prescryptive he founded Markwith Law PS, a technology and transactional law firm, and served as General Counsel to the CommonWell Health Alliance, a nationwide non-profit industry consortium with over 80 Members from across the healthcare continuum. Prior to private practice Jim was Senior Vice President and Deputy General Counsel at Allscripts Healthcare, and held Senior in-house legal positions with Microsoft, Adobe Systems, and GE Healthcare IT.",
    photo: "/images/speakers/dhc-2023/jim-markwith.jpg",
  },
  "matt-kaeberlein": {
    id: "matt-kaeberlein",
    name: "Matt Kaeberlein",
    credentials: "PhD",
    title: "Chief Executive Officer",
    organization: "Optispan, Inc.",
    bio: "Dr. Matt Kaeberlein is the Chief Executive Officer at Optispan, Inc., Affiliate Professor of Oral Health Sciences at the University of Washington, and Co-Director of the Dog Aging Project. Dr. Kaeberlein's research interests are focused on understanding biological mechanisms of aging in order to facilitate translational interventions that promote healthspan and improve quality of life for people and companion animals. He is a Fellow of the American Association for the Advancement of Science (AAAS), the American Aging Association (AGE), and the Gerontological Society of America (GSA). Dr. Kaeberlein has published more than 250 scientific papers in the field of aging biology.",
    photo: "/images/speakers/dhc-2023/matt-kaeberlein.jpg",
  },
  "bob-hulse": {
    id: "bob-hulse",
    name: "Robert (Bob) Hulse",
    credentials: "JD",
    title: "Patent Attorney",
    organization: "",
    bio: "Robert (Bob) Hulse builds strategic patent portfolios in a wide range of technical fields, including computer software, electronics, electromechanical and medical devices, digital healthcare and electronic media. Bob's extensive intellectual property diligence experience on both sides of M&A and financing transactions has strengthened his ability to build effective patent portfolios that provide maximum value to his clients. His practice also involves counseling on IP matters, evaluating risks from third-party patents and assisting in efforts to design around those patents.",
    photo: "/images/speakers/dhc-2023/bob-hulse.jpg",
  },
  "daniel-hughes": {
    id: "daniel-hughes",
    name: "Daniel Hughes",
    credentials: "JD",
    title: "Partner",
    organization: "Knobbe Martens Olson & Bear",
    bio: "Daniel Hughes is a partner in the San Diego office of Knobbe Martens Olson & Bear. Daniel represents clients in all types of intellectual property disputes, with a focus on issues related to software and medical devices. Daniel regularly counsels clients on intellectual property strategies for emerging technology issues, including artificial intelligence and open source software.",
    photo: "/images/speakers/dhc-2023/daniel-hughes.jpg",
  },
  "eric-tham": {
    id: "eric-tham",
    name: "Eric Tham",
    credentials: "MD, MS, FAAP, FAMIA",
    title: "Senior Vice President and Chief Research Operations Officer",
    organization: "Seattle Children's Research Institute",
    bio: "Dr. Eric Tham is senior vice president and chief research operations officer for Seattle Children's Research Institute. Dr. Tham provides strategic and operational leadership for clinical, business and research applications including EHR, ERP, clinical research operations, research IT, clinical engineering, biostatistics and clinical informatics. He earned his MD from Northwestern University Medical School and his master's in biomedical informatics from the University of Pittsburgh School of Medicine.",
    photo: "/images/speakers/dhc-2023/eric-tham.jpg",
  },
  "ray-rasmussen": {
    id: "ray-rasmussen",
    name: "Ray Rasmussen",
    title: "Technology Executive and Consultant",
    organization: "",
    bio: "Ray Rasmussen is a seasoned technology executive with years of experience in business transformation, AI strategy, and consulting. He has led business and technical teams to define and implement world-leading business application strategies at Microsoft, where he served as a strategy leader. Ray also established and led multiple consulting firms serving large technology, legal firms, and energy companies. As a member of the global M&A leadership team at Deloitte Consulting, Ray led multi-billion-dollar mergers and business integrations.",
    photo: "/images/speakers/dhc-2023/ray-rasmussen.jpg",
  },
  "jake-heller": {
    id: "jake-heller",
    name: "Jake Heller",
    credentials: "JD",
    title: "Co-Founder",
    organization: "Casetext",
    bio: "Jake Heller was a litigator at Ropes & Gray before co-founding Casetext. He trained at Stanford Law School, where he was president of the Stanford Law Review, and clerked for Judge Michael Boudin in the US Court of Appeals for the First Circuit. Jake has been named to Forbes 30 Under 30 and the Fastcase 50 for legal innovation for his work at Casetext. He's a Silicon Valley native, and has been programming since childhood.",
    photo: "/images/speakers/dhc-2023/jake-heller.jpg",
  },
  "jim-chesmore": {
    id: "jim-chesmore",
    name: "Jim Chesmore",
    title: "Senior Vice President",
    organization: "Parker, Smith & Feek",
    bio: "Jim Chesmore is a senior vice president at Parker, Smith & Feek and an account executive in the Healthcare Practice Group. He coordinates the resources within the firm to design and implement insurance programs tailored to meet the risk management objectives of his clients. Jim directs account teams in risk analysis, exposure reviews, and account marketing strategies to provide effective, comprehensive insurance solutions. Jim concentrates on rural healthcare and his areas of expertise.",
    photo: "/images/speakers/dhc-2023/jim-chesmore.jpg",
    photoPosition: "center 20%",
  },
  "danny-shickich": {
    id: "danny-shickich",
    name: "Daniel (Danny) Shickich",
    credentials: "JD",
    title: "Litigation Department",
    organization: "Ogden Murphy Wallace",
    bio: "Daniel (Danny) Shickich is a member of the OMW's Litigation Department. A dynamic litigator with experience in both state and federal courts, Danny helps policyholders and the insurance industry resolve disputes involving insurance coverage and bad faith, including property, health, casualty, business liability, and professional liability coverages. He also assists members of the healthcare industry with contractual, regulatory, and compliance disputes, as well as administrative law proceedings.",
    photo: "/images/speakers/dhc-2023/danny-shickich.jpg",
  },
  "mike-sawyer": {
    id: "mike-sawyer",
    name: "Mike Sawyer",
    title: "Technology Banking Executive",
    organization: "PrivaPlan",
    bio: "Mike Sawyer is a recovering Technology Banking Executive with close to twenty five years of experience in leading Global teams for Fortune 100 Companies in the areas of Technology Risk, Privacy, and Security. Mike has recently joined PrivaPlan which specializes in HIPAA, Privacy, Security and related professional services and solutions.",
    photo: "/images/speakers/dhc-2023/mike-sawyer.jpg",
  },
  "lee-kuo": {
    id: "lee-kuo",
    name: "Lee Kuo",
    credentials: "JD",
    title: "Partner and Co-Chair, Health Care Practice Group",
    organization: "Ogden Murphy Wallace",
    bio: "Lee Kuo is a partner and Co-Chair of the Health Care Practice Group at Ogden Murphy Wallace, PLLC. Lee's practice focuses on advising health care clients on technology licensing, data use and sharing, patient privacy and security, and data breach matters. Lee also advises health care entities on compliance and transactional matters related to physician contracting, mergers and acquisitions, and governance. Prior to law school, Lee worked as a consultant to evaluate and implement electronic medical records and back office solutions for health care systems. She also worked as a product manager to design and develop an e-commerce solution and patient portal.",
    photo: "/images/speakers/dhc-2023/lee-kuo.jpg",
  },
  "shawnta-mosley-app": {
    id: "shawnta-mosley-app",
    name: "Shawntá Mosley-App",
    credentials: "JD",
    title: "Associate General Counsel",
    organization: "Fred Hutchinson Cancer Center",
    bio: "Shawntá Mosley-App is Associate General Counsel at Fred Hutchinson Cancer Center (\"Fred Hutch\"). In this role, Shawntá handles a broad range of legal issues relating to health care regulatory and transactional matters. Her practice focuses on IT-related transactions, mergers and acquisitions, bond financing, hospital licensing, and drafting and negotiating hospital contracts. Shawntá also provides legal advice, consultation, and policy analysis and interpretations of numerous areas of health care law such as Stark, Anti-Kickback, HIPAA and other privacy laws, and matters related to risk management and telehealth.",
    photo: "/images/speakers/dhc-2023/shawnta-mosley-app.jpg",
  },
  "tori-lallemont": {
    id: "tori-lallemont",
    name: "Tori Lallemont",
    credentials: "JD",
    title: "VP, Assistant General Counsel - Regulatory and Clinical",
    organization: "One Medical",
    bio: "Tori Lallemont serves as the VP, Assistant General Counsel - Regulatory and Clinical at One Medical, joining in February 2023. One Medical is a membership-based primary care practice on a mission to make getting quality care more affordable, accessible, and enjoyable for all through a blend of human-centered design, technology, and an exceptional team. Tori leads the legal team supporting One Medical's clinical operations, navigating regulatory issues such as Corporate Practice of Medicine, Fraud Waste and Abuse.",
    photo: "/images/speakers/dhc-2023/tori-lallemont.jpg",
  },
  "dallas-verhagen": {
    id: "dallas-verhagen",
    name: "Dallas Verhagen",
    credentials: "JD",
    title: "Head of Legal",
    organization: "Notable",
    bio: "Dallas Verhagen is Notable's Head of Legal, reporting to CEO Pranay Kapadia. As Notable's Head of Legal, Dallas manages the company's legal strategy and oversees all legal affairs at Notable, including litigation, employment matters, ethics and compliance, corporate governance and transactions, business transactions, and intellectual property.",
    photo: "/images/speakers/dhc-2023/dallas-verhagen.jpg",
  },
  "jennifer-yoo": {
    id: "jennifer-yoo",
    name: "Jennifer Yoo",
    credentials: "JD",
    title: "Healthcare Transactional Attorney",
    organization: "",
    bio: "Jennifer Yoo counsels clients operating in the healthcare industry on regulatory and transactional matters, focusing on mergers, acquisitions, joint ventures, affiliations, securities offerings, financings and various transactional matters involving health facilities, physician organizations and other healthcare providers, suppliers and life sciences companies.",
    photo: "/images/speakers/dhc-2023/jennifer-yoo.jpg",
  },
  "glenn-cohen": {
    id: "glenn-cohen",
    name: "Glenn Cohen",
    title: "Professor of Law",
    organization: "Harvard Law School",
    bio: "Prof. Glenn Cohen is one of the world's leading experts on the intersection of bioethics (sometimes also called \"medical ethics\") and the law, as well as health law. He also teaches civil procedure. He has advised the U.S. Vice President on reproductive rights, discussed medical AI policy with members of the Korean Congress, and lectured to legal, medical, and industry conferences around the world. His work has been frequently covered by or appeared in PBS, NPR, ABC, NBC, CBS, CNN, MSNBC, Mother Jones, the New York Times, The Washington Post, the Boston Globe, and many other media venues. He was the youngest professor on the faculty at Harvard Law School (tenured or untenured) both when he joined the faculty in 2008 (at age 29) and when he was tenured as a full professor in 2013 (at age 34).",
    photo: "/images/speakers/dhc-2023/glenn-cohen.jpg",
  },
};

export const schedule: DaySchedule[] = [
  {
    day: "Day 1",
    date: "Tuesday, September 12, 2023",
    sessions: [
      { time: "8:00 – 9:00 a.m.", title: "Registration, Breakfast & Networking", type: "break" },
      {
        time: "9:00 – 9:30 a.m.",
        title: "Hoodies + Suits: Empowering the Next Wave of AI and Data-Driven Innovation in Health Care",
        speakerIds: ["dave-schoolcraft"],
      },
      {
        time: "",
        title: "AI and the Future of Medicine",
        speakerIds: ["jose-morey"],
      },
      { time: "10:30 – 10:45 a.m.", title: "Break & Networking", type: "break" },
      {
        time: "10:45 a.m. – 12:00 p.m.",
        title: "Digital Health Law — Year in Review",
        speakerIds: ["casey-moriarty", "maddie-haller", "jefferson-lin"],
      },
      { time: "12:00 – 1:30 p.m.", title: "Lunch Break", type: "break" },
      {
        time: "1:30 – 2:30 p.m.",
        title: "Fulfilling the Promise of Digital Health: Equity + Access",
        speakerIds: ["elana-zana", "paul-isabelli", "adriana-lein"],
      },
      { time: "2:30 – 2:45 p.m.", title: "Break & Networking", type: "break" },
      {
        time: "2:45 – 3:30 p.m.",
        title: "Recent Changes in FDA Guidance on Machine Learning-Enabled Devices and Software as Medical Device (SaMD)",
        speakerIds: ["gail-javitt"],
      },
      {
        time: "3:30 – 4:30 p.m.",
        title: "Genomic Data, Developments in Medical Research and Related Legal Issues",
        speakerIds: ["martin-stumpe", "maggie-huston"],
      },
      { time: "4:30 – 6:00 p.m.", title: "Welcome Reception", type: "break" },
    ],
  },
  {
    day: "Day 2",
    date: "Wednesday, September 13, 2023",
    sessions: [
      { time: "8:00 – 9:00 a.m.", title: "Registration, Breakfast & Networking", type: "break" },
      {
        time: "9:00 – 9:45 a.m.",
        title: "Cures Act Interoperability and Data Liquidity in Practice",
        speakerIds: ["don-rucker", "jim-markwith"],
      },
      {
        time: "9:45 – 10:30 a.m.",
        title: "Pioneering Longevity Medicine",
        speakerIds: ["matt-kaeberlein"],
      },
      { time: "10:30 – 10:45 a.m.", title: "Break & Networking", type: "break" },
      {
        time: "10:45 – 11:30 a.m.",
        title: "Protecting Innovation at the Crossroads of AI and Healthcare: Emerging Intellectual Property Challenges",
        speakerIds: ["bob-hulse", "daniel-hughes"],
      },
      {
        time: "11:30 a.m. – 12:15 p.m.",
        title: "Data-Driven Innovation in Pediatric Care",
        speakerIds: ["eric-tham"],
      },
      { time: "12:15 – 1:30 p.m.", title: "Lunch Break", type: "break" },
      {
        time: "1:30 – 2:15 p.m.",
        title: "Practicing Law Through the AI Revolution",
        speakerIds: ["ray-rasmussen", "jake-heller"],
      },
      {
        time: "2:15 – 3:00 p.m.",
        title: "Tackling Data Security, Insurance, and Incident Response Issues in the Era of Machine Learning",
        speakerIds: ["jim-chesmore", "danny-shickich", "mike-sawyer", "lee-kuo"],
      },
      { time: "3:00 – 3:30 p.m.", title: "Break & Networking", type: "break" },
      {
        time: "3:30 – 4:15 p.m.",
        title: "Digital Health Counsel: Challenges in Advising Leaders at the Speed of Innovation",
        speakerIds: ["shawnta-mosley-app", "tori-lallemont", "dallas-verhagen", "jennifer-yoo"],
      },
      {
        time: "4:15 – 5:00 p.m.",
        title: "Emerging Liability Issues in Medical AI",
        speakerIds: ["glenn-cohen"],
      },
      { time: "5:00 – 5:15 p.m.", title: "Closing Remarks", type: "break" },
    ],
  },
];

export const schemes = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    summary: 'Income support for eligible landholding farmer families, subject to scheme rules and exclusions.',
    benefits: '₹6,000 per year in three instalments, subject to eligibility and verification.',
    audience: ['Farmers', 'Rural households'],
    eligibility: ['Applicant is a landholding farmer family under the scheme rules', 'Land records and identity details can be verified', 'Applicant is not in an excluded category'],
    documents: ['Aadhaar card', 'Landholding records', 'Bank account details', 'Mobile number'],
    officialUrl: 'https://pmkisan.gov.in/',
    tags: ['farmer', 'agriculture', 'income support', 'rural']
  },
  {
    id: 'pm-awas-urban',
    name: 'Pradhan Mantri Awas Yojana – Urban 2.0',
    category: 'Housing',
    ministry: 'Ministry of Housing and Urban Affairs',
    summary: 'Housing assistance for eligible urban families under applicable verticals and guidelines.',
    benefits: 'Assistance varies by scheme vertical, location, and eligibility.',
    audience: ['Urban households', 'First-time home applicants'],
    eligibility: ['Household meets the applicable income and category criteria', 'Household meets the scheme-specific house ownership conditions', 'Application passes official verification'],
    documents: ['Identity proof', 'Address proof', 'Income certificate or income declaration', 'Bank details', 'Other documents required by the selected vertical'],
    officialUrl: 'https://pmay-urban.gov.in/',
    tags: ['housing', 'home', 'urban', 'low income']
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY',
    category: 'Health',
    ministry: 'National Health Authority',
    summary: 'Cashless hospitalisation cover for eligible beneficiaries at empanelled hospitals.',
    benefits: 'Health cover as defined by current PM-JAY rules and state implementation.',
    audience: ['Eligible families', 'Patients'],
    eligibility: ['Eligibility depends on official beneficiary records and applicable state rules', 'Confirm beneficiary status using official channels'],
    documents: ['Beneficiary identification details', 'Identity proof as requested by the official help desk'],
    officialUrl: 'https://beneficiary.nha.gov.in/',
    tags: ['health', 'hospital', 'insurance', 'medical']
  },
  {
    id: 'nsp',
    name: 'National Scholarship Portal',
    category: 'Education',
    ministry: 'Ministry of Education and participating ministries',
    summary: 'A common portal for selected central, state, and other scholarship schemes.',
    benefits: 'Scholarship amount and conditions depend on the specific scheme.',
    audience: ['Students', 'Learners'],
    eligibility: ['Enrolment, income, academic, and category criteria vary by scholarship', 'Check the current notification for the selected scheme'],
    documents: ['Student identity details', 'Academic records', 'Bank account details', 'Income or category certificate where required'],
    officialUrl: 'https://scholarships.gov.in/',
    tags: ['student', 'scholarship', 'education', 'college']
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India',
    category: 'Business',
    ministry: 'Department of Financial Services',
    summary: 'Facilitates bank loans for eligible entrepreneurs from specified groups to set up greenfield enterprises.',
    benefits: 'Loan terms and eligibility are determined by current programme and lender guidelines.',
    audience: ['Entrepreneurs', 'Small business owners'],
    eligibility: ['Applicant and enterprise meet current programme conditions', 'Business is a qualifying greenfield enterprise', 'Lender appraisal and documentation requirements are met'],
    documents: ['Identity and address proof', 'Business plan', 'Project and financial details', 'Category proof where applicable'],
    officialUrl: 'https://www.standupmitra.in/',
    tags: ['business', 'entrepreneur', 'loan', 'startup']
  },
  {
    id: 'mudra',
    name: 'Pradhan Mantri MUDRA Yojana',
    category: 'Business',
    ministry: 'Department of Financial Services',
    summary: 'Credit support through participating lenders for eligible micro enterprises and small businesses.',
    benefits: 'Loan category, amount, terms, and approval depend on current rules and lender assessment.',
    audience: ['Micro enterprises', 'Small business owners'],
    eligibility: ['Business activity and applicant qualify under current lender and scheme guidelines', 'Credit assessment and documentation are completed'],
    documents: ['Identity proof', 'Address proof', 'Business details', 'Bank and financial documents requested by the lender'],
    officialUrl: 'https://www.mudra.org.in/',
    tags: ['business', 'micro enterprise', 'loan', 'self employed']
  },
  {
    id: 'ujjwala',
    name: 'Pradhan Mantri Ujjwala Yojana',
    category: 'Women & Family',
    ministry: 'Ministry of Petroleum and Natural Gas',
    summary: 'LPG connection support for eligible adult women in qualifying households, subject to current criteria.',
    benefits: 'Connection-related support as defined by current scheme rules.',
    audience: ['Women', 'Eligible households'],
    eligibility: ['Applicant meets current household and eligibility conditions', 'Required identity, household, and bank details can be verified'],
    documents: ['Aadhaar or accepted identity proof', 'Address and household details', 'Bank account details', 'Other documents requested by the LPG distributor'],
    officialUrl: 'https://www.pmuy.gov.in/',
    tags: ['women', 'lpg', 'cooking gas', 'family']
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana',
    category: 'Pension',
    ministry: 'Department of Financial Services',
    summary: 'A contributory pension scheme with eligibility and contribution conditions set by current rules.',
    benefits: 'Pension benefits depend on contribution choice and scheme conditions.',
    audience: ['Eligible workers', 'Adults planning retirement'],
    eligibility: ['Applicant meets the current age and account conditions', 'Applicant meets the applicable participation rules'],
    documents: ['Bank or post office savings account', 'Identity and KYC documents', 'Mobile number'],
    officialUrl: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    tags: ['pension', 'retirement', 'savings', 'worker']
  }
];

// Curated seed records based on official government announcements. These are static demo
// entries, not a live news feed; always open the linked source to confirm current details.
export const updates = [
  {
    id: 'update-pm-rahat',
    type: 'Citizen safety',
    title: 'PM RAHAT offers cashless treatment for road-accident victims',
    description: 'The government announced cashless treatment of up to ₹1.5 lakh for eligible road-accident victims, aiming to make urgent care less dependent on immediate payment.',
    category: 'Health & safety',
    ministry: 'Government of India',
    publishedAt: '13 Feb 2026',
    readTime: '45 sec',
    officialUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227542&lang=1&reg=1'
  },
  {
    id: 'update-lakhpati-didi',
    type: 'Women & livelihoods',
    title: 'Lakhpati Didi target raised to 6 crore',
    description: 'The government set a new target of supporting 6 crore Lakhpati Didis by March 2029, building on the reported milestone of 3 crore women reaching the programme’s income benchmark.',
    category: 'Women & livelihoods',
    ministry: 'Ministry of Rural Development',
    publishedAt: '13 Feb 2026',
    readTime: '40 sec',
    officialUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227542&lang=1&reg=1'
  },
  {
    id: 'update-startup-fund',
    type: 'Startups',
    title: 'Startup India Fund of Funds 2.0 gets ₹10,000 crore corpus',
    description: 'The government approved a ₹10,000 crore corpus for Fund of Funds 2.0 to support the startup ecosystem, including deep-tech ideas and early-stage innovation through investment funds.',
    category: 'Business & innovation',
    ministry: 'Department for Promotion of Industry and Internal Trade',
    publishedAt: '13 Feb 2026',
    readTime: '40 sec',
    officialUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227542&lang=1&reg=1'
  },
  {
    id: 'update-5g-hackathon',
    type: 'Innovation',
    title: 'DoT launches the 5G Innovation Hackathon 2026',
    description: 'Students, startups, MSMEs and innovators were invited to develop 5G and related technology use cases. The announcement included access to 100 5G Use Case Labs and a ₹50 lakh seed-funding pool for selected teams.',
    category: 'Technology',
    ministry: 'Department of Telecommunications',
    publishedAt: '20 Mar 2026',
    readTime: '50 sec',
    officialUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2243209&lang=1&reg=3'
  },
  {
    id: 'update-ai-skilling',
    type: 'Digital skills',
    title: 'AI skilling initiative announced for 15,000 creators',
    description: 'The Ministry of Information & Broadcasting announced a national AI skilling initiative with Google and YouTube through IICT, alongside the MyWAVES creator platform.',
    category: 'Skills & media',
    ministry: 'Ministry of Information & Broadcasting',
    publishedAt: '23 Mar 2026',
    readTime: '45 sec',
    officialUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2243949&lang=2&reg=3'
  },
  {
    id: 'update-bharatnet',
    type: 'Digital access',
    title: 'BharatNet expands rural digital connectivity',
    description: 'A government update reported that around 2.21 lakh Gram Panchayats had been made service-ready under BharatNet, while Common Service Centres continue to provide assisted digital services.',
    category: 'Digital public services',
    ministry: 'Ministry of Electronics & Information Technology',
    publishedAt: '6 Aug 2026',
    readTime: '45 sec',
    officialUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2295635&lang=1&reg=48'
  },
  {
    id: 'update-rural-employment',
    type: 'Rural livelihoods',
    title: 'VB-G RAM G Act introduces a 125-day rural employment guarantee',
    description: 'The new rural employment framework came into force on 1 July 2026, providing eligible rural households a statutory entitlement to 125 days of wage employment under the Act.',
    category: 'Jobs & rural development',
    ministry: 'Ministry of Rural Development',
    publishedAt: '1 Jul 2026',
    readTime: '50 sec',
    officialUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2279995&lang=2&reg=48'
  },
  {
    id: 'update-nidar',
    type: 'Student innovation',
    title: 'NIDAR 2.0 challenges students to build smarter drones',
    description: 'MeitY and Drone Federation India launched the second National Innovation Challenge for Drone Application and Research, with drone and component innovation tracks and a reported prize pool above ₹65 lakh.',
    category: 'Research & innovation',
    ministry: 'Ministry of Electronics & Information Technology',
    publishedAt: '13 Jul 2026',
    readTime: '50 sec',
    officialUrl: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2284236&lang=2&reg=48'
  }
];

// Historical and illustrative event cards seeded from official government event pages.
// Dates/statuses below describe the listed editions, not a promise that registration is open.
export const events = [
  {
    id: 'event-aadhaar-hackathon-2026',
    title: 'Aadhaar Data-Driven Innovation Hackathon 2026',
    dateLabel: '5–20 January 2026 · Registration closed',
    location: 'Online; shortlisted teams present in person',
    organizer: 'UIDAI with the National Informatics Centre (NIC)',
    category: 'Hackathon · Closed',
    status: 'Past event',
    description: 'Participants analysed anonymised Aadhaar enrolment and update datasets to discover insights and propose data-driven improvements.',
    officialUrl: 'https://event.data.gov.in/event/online-hackathon-on-data-driven-innovation-on-aadhaar-2026/'
  },
  {
    id: 'event-5g-innovation-2026',
    title: '5G Innovation Hackathon 2026',
    dateLabel: 'Proposals: 20 March–17 April 2026 · Closed',
    location: 'Nationwide through designated 5G Use Case Lab institutions',
    organizer: 'Department of Telecommunications, Ministry of Communications',
    category: 'Technology · Closed',
    status: 'Past event',
    description: 'A national challenge for students, startups, MSMEs and innovators building practical 5G, IoT and AI-enabled solutions. Selected teams were offered prototype support and lab access.',
    officialUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2243209&lang=1&reg=3'
  },
  {
    id: 'event-cdac-security-2026',
    title: 'C-DAC Security Hackathon 2026',
    dateLabel: '6–10 July 2026 · Listed edition closed',
    location: 'C-DAC Chennai',
    organizer: 'Centre for Development of Advanced Computing (C-DAC), MeitY',
    category: 'Cybersecurity · Closed',
    status: 'Past event',
    description: 'A 36-hour security challenge inviting ethical hackers and researchers to assess the BOSS PXE Secure Platform and report validated vulnerabilities.',
    officialUrl: 'https://www.cdac.gov.in/index.aspx?id=ev_cdac_advertisement'
  },
  {
    id: 'event-nidar-2026',
    title: 'NIDAR 2.0 — National Drone Innovation Challenge',
    dateLabel: '2026–27 edition · Check source for current deadlines',
    location: 'Hybrid launch; participation from across India',
    organizer: 'MeitY with Drone Federation India, under SwaYaan',
    category: 'Drones & research',
    status: 'Check official page',
    description: 'Student teams are challenged to build autonomous drone applications and indigenous drone components. The launch announcement describes prizes, incubation and technical support.',
    officialUrl: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2284236&lang=2&reg=48'
  },
  {
    id: 'event-cyber-kushti-2026',
    title: 'CYBER KUSHTI 2026 — Cybersecurity & AI Hackathon',
    dateLabel: 'Launched 15 August 2026 · Final-round details on source page',
    location: 'Final round associated with NCCDFI 2026',
    organizer: 'National Institute of Electronics and Information Technology (NIELIT), MeitY',
    category: 'Cybersecurity & AI',
    status: 'Check official page',
    description: 'A national cybersecurity and AI hackathon focused on evaluating human judgement in security assessment, rather than detection speed alone.',
    officialUrl: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2300120&lang=2&reg=48'
  }
];

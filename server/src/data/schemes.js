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

export const updates = [
  { id: 'update-1', type: 'Explainer', title: 'How to check a scheme before you apply', description: 'A quick checklist: eligibility, official deadline, required documents, and the application portal.', category: 'Know your rights', readTime: '45 sec', officialUrl: 'https://www.myscheme.gov.in/' },
  { id: 'update-2', type: 'Digital help', title: 'Keep your documents application-ready', description: 'Check name consistency, readable scans, current certificates, and bank details before starting an application.', category: 'Application tips', readTime: '35 sec', officialUrl: 'https://www.india.gov.in/' },
  { id: 'update-3', type: 'Safety', title: 'Avoid fake scheme links and fees', description: 'Use official government domains and never share OTPs or pay unknown agents promising guaranteed benefits.', category: 'Stay safe', readTime: '40 sec', officialUrl: 'https://www.cybercrime.gov.in/' }
];

export const events = [
  { id: 'event-1', title: 'Find a nearby Common Service Centre', dateLabel: 'Available year-round', location: 'Across India', category: 'Citizen services', description: 'Locate a service centre for supported digital and government services.', officialUrl: 'https://findmycsc.nic.in/' },
  { id: 'event-2', title: 'Explore official government announcements', dateLabel: 'Updated by official source', location: 'India', category: 'Public information', description: 'Check current releases and announcements from the Press Information Bureau.', officialUrl: 'https://pib.gov.in/' },
  { id: 'event-3', title: 'Discover public services in your state', dateLabel: 'State-specific', location: 'Choose your state', category: 'State services', description: 'Start from the National Portal of India and navigate to relevant state departments.', officialUrl: 'https://www.india.gov.in/' }
];

// ───────────────────────────────────────────────────────────────
// DEMO DATA — every scheme below is fictional.
// Replace with verified government scheme data before production.
// Set `officialSource` to a verified URL per scheme when you have one.
// ───────────────────────────────────────────────────────────────

export const DEMO_NOTICE = 'Demo Data — Replace with verified government scheme data before production.';

export const OPTIONS = {
  state: [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 'Haryana', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ].map((s) => ({ value: s, label: s })),
  category: [
    { value: 'women', label: 'Woman entrepreneur' },
    { value: 'scst', label: 'SC / ST' },
    { value: 'obc', label: 'OBC' },
    { value: 'minority', label: 'Minority community' },
    { value: 'youth', label: 'Youth (under 35)' },
    { value: 'pwd', label: 'Person with disability' },
    { value: 'general', label: 'General' },
  ],
  businessType: [
    { value: 'micro', label: 'Micro Business', hint: 'Small team, small capital' },
    { value: 'small', label: 'Small Business', hint: 'Growing team and equipment' },
    { value: 'self', label: 'Self-employed / Home-based', hint: 'Solo or family-run' },
    { value: 'shg', label: 'Self-Help Group / Cooperative', hint: 'Group-owned venture' },
  ],
  industry: [
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'food', label: 'Food Processing' },
    { value: 'agri', label: 'Agriculture & Allied' },
    { value: 'retail', label: 'Retail & Trade' },
    { value: 'services', label: 'Services' },
    { value: 'handicraft', label: 'Handicrafts & Textiles' },
    { value: 'tech', label: 'Technology' },
  ],
  stage: [
    { value: 'idea', label: 'Idea stage' },
    { value: 'early', label: 'Early (just started)' },
    { value: 'growing', label: 'Growing' },
    { value: 'established', label: 'Established' },
  ],
  turnover: [
    { value: 't0', label: 'Under ₹5 lakh' },
    { value: 't1', label: '₹5 – 25 lakh' },
    { value: 't2', label: '₹25 lakh – 1 crore' },
    { value: 't3', label: '₹1 – 5 crore' },
    { value: 't4', label: 'Above ₹5 crore' },
  ],
  location: [
    { value: 'rural', label: 'Rural' },
    { value: 'semi', label: 'Semi-urban' },
    { value: 'urban', label: 'Urban' },
  ],
  support: [
    { value: 'funding', label: 'Funding', hint: 'Seed or growth capital' },
    { value: 'subsidy', label: 'Subsidy', hint: 'Cost-sharing grants' },
    { value: 'loan', label: 'Loan', hint: 'Credit and guarantees' },
    { value: 'training', label: 'Training', hint: 'Skills and mentoring' },
    { value: 'infrastructure', label: 'Infrastructure', hint: 'Space, equipment, power' },
    { value: 'other', label: 'Other', hint: 'Something else' },
  ],
};

export const TURNOVER_ORDER = OPTIONS.turnover.map((t) => t.value);

export const EMPTY_PROFILE = {
  name: '', state: '', category: '', businessType: '', industry: '', stage: '',
  turnover: '', registered: '', registrationMonths: '', location: '', support: [],
};

export const SAMPLE_PROFILE = {
  name: 'Priya Sharma', state: 'Karnataka', category: 'women', businessType: 'micro',
  industry: 'food', stage: 'early', turnover: 't1', registered: 'yes', registrationMonths: 8,
  location: 'rural', support: ['funding', 'loan', 'training'],
};

export const DOCUMENTS = {
  identity: { label: 'Identity proof', hint: 'Any valid government photo ID' },
  registration: { label: 'Business registration', hint: 'Certificate or registration number' },
  bank: { label: 'Bank statement', hint: 'Recent statement of the business account' },
  income: { label: 'Income / business document', hint: 'Turnover declaration or return' },
  sector: { label: 'Sector certificate', hint: 'Industry or trade-specific certificate' },
  category: { label: 'Category certificate', hint: 'Proof of entrepreneur category' },
};

export const APPLICATION_STEPS = [
  { title: 'Check eligibility', text: 'Review each requirement against your profile and fix any gaps.' },
  { title: 'Prepare documents', text: 'Collect every required document and keep clear copies ready.' },
  { title: 'Open official application portal', text: 'Go to the official source for this scheme and start an application.' },
  { title: 'Submit application', text: 'Fill in the form, upload documents and submit before the deadline.' },
  { title: 'Track application', text: 'Note your reference number and check the status regularly.' },
];

// Criterion types (evaluated in src/lib/matching.js):
//  oneOf     – profile[field] must be in values
//  registered– business must be registered
//  minMonths – registered for at least `months`
//  turnover  – turnover band between min and max (inclusive)
//  support   – at least one of the selected needs is in anyOf (soft)
export const SCHEMES = [
  {
    id: 'udyam-growth',
    name: 'Udyam Growth Support — Demo Scheme',
    short: 'Udyam Growth Support',
    description: 'Growth capital for established micro and small enterprises ready to scale.',
    category: 'Funding',
    benefitSummary: 'Growth capital with a partial interest subvention (demo).',
    fitNote: 'Built for enterprises with at least a year of registration history.',
    criteria: [
      { type: 'oneOf', field: 'businessType', values: ['micro', 'small'], label: 'Business Type', requirement: 'Micro or small business', hard: true },
      { type: 'registered', label: 'Registration', requirement: 'Registered enterprise', hard: true },
      { type: 'minMonths', months: 12, label: 'Business Age', requirement: 'Minimum business registration period: 12 months', hard: true },
      { type: 'turnover', min: 't2', label: 'Annual turnover', requirement: 'Turnover of ₹25 lakh or more', hard: true },
      { type: 'support', anyOf: ['funding', 'loan'], label: 'Support needed', requirement: 'Looking for funding or a loan', hard: false },
    ],
    benefits: [
      { icon: 'wallet', title: 'Growth capital', text: 'Demo: working capital for expansion.' },
      { icon: 'percent', title: 'Interest relief', text: 'Demo: partial interest subvention.' },
      { icon: 'trending', title: 'Scale support', text: 'Demo: advisory for scaling operations.' },
    ],
    documents: ['identity', 'registration', 'bank', 'income', 'sector'],
    officialSource: null,
  },
  {
    id: 'micro-finance',
    name: 'Micro Enterprise Finance — Demo Scheme',
    short: 'Micro Enterprise Finance',
    description: 'Collateral-light credit for very small businesses and solo entrepreneurs.',
    category: 'Loan',
    benefitSummary: 'Small collateral-light loans with simple paperwork (demo).',
    fitNote: 'Suitable for your current business size and turnover.',
    criteria: [
      { type: 'oneOf', field: 'businessType', values: ['micro', 'self', 'shg'], label: 'Business Type', requirement: 'Micro, self-employed or group venture', hard: true },
      { type: 'registered', label: 'Registration', requirement: 'Registered enterprise', hard: true },
      { type: 'turnover', max: 't1', label: 'Annual turnover', requirement: 'Turnover up to ₹25 lakh', hard: true },
      { type: 'support', anyOf: ['loan', 'funding'], label: 'Support needed', requirement: 'Looking for a loan or funding', hard: false },
    ],
    benefits: [
      { icon: 'wallet', title: 'Collateral-light loan', text: 'Demo: small-ticket credit line.' },
      { icon: 'file', title: 'Simple paperwork', text: 'Demo: short, single-form application.' },
      { icon: 'percent', title: 'Flexible repayment', text: 'Demo: repayment aligned to cash flow.' },
    ],
    documents: ['identity', 'registration', 'bank', 'income'],
    officialSource: null,
  },
  {
    id: 'women-entrepreneur',
    name: 'Women Entrepreneur Support — Demo Scheme',
    short: 'Women Entrepreneur Support',
    description: 'Seed funding, mentoring and market linkages for women-led businesses.',
    category: 'Funding',
    benefitSummary: 'Seed funding plus mentoring for women-led ventures (demo).',
    fitNote: 'Matches your entrepreneur category and business stage.',
    criteria: [
      { type: 'oneOf', field: 'category', values: ['women'], label: 'Entrepreneur Category', requirement: 'Woman entrepreneur', hard: true },
      { type: 'oneOf', field: 'stage', values: ['idea', 'early', 'growing'], label: 'Business Stage', requirement: 'Idea, early or growing stage', hard: true },
      { type: 'support', anyOf: ['funding', 'training', 'subsidy'], label: 'Support needed', requirement: 'Looking for funding, subsidy or training', hard: false },
    ],
    benefits: [
      { icon: 'wallet', title: 'Seed funding', text: 'Demo: one-time grant for working capital.' },
      { icon: 'users', title: 'Mentoring', text: 'Demo: pairing with an experienced mentor.' },
      { icon: 'store', title: 'Market linkages', text: 'Demo: access to buyer networks.' },
    ],
    documents: ['identity', 'registration', 'bank', 'category'],
    officialSource: null,
  },
  {
    id: 'rural-development',
    name: 'Rural Business Development — Demo Scheme',
    short: 'Rural Business Development',
    description: 'Infrastructure and subsidy support for village and small-town enterprises.',
    category: 'Subsidy',
    benefitSummary: 'Equipment subsidy and shared facilities for rural units (demo).',
    fitNote: 'Matches your rural location and industry.',
    criteria: [
      { type: 'oneOf', field: 'location', values: ['rural', 'semi'], label: 'Location', requirement: 'Rural or semi-urban location', hard: true },
      { type: 'oneOf', field: 'industry', values: ['agri', 'food', 'handicraft', 'manufacturing'], label: 'Industry', requirement: 'Agri, food, handicraft or manufacturing', hard: true },
      { type: 'registered', label: 'Registration', requirement: 'Registered enterprise', hard: true },
      { type: 'support', anyOf: ['subsidy', 'infrastructure'], label: 'Support needed', requirement: 'Looking for subsidy or infrastructure', hard: false },
    ],
    benefits: [
      { icon: 'percent', title: 'Equipment subsidy', text: 'Demo: share of machinery cost covered.' },
      { icon: 'building', title: 'Shared facilities', text: 'Demo: common processing or storage space.' },
    ],
    documents: ['identity', 'registration', 'sector', 'bank'],
    officialSource: null,
  },
  {
    id: 'startup-seed',
    name: 'Startup Seed Boost — Demo Scheme',
    short: 'Startup Seed Boost',
    description: 'Small seed grants for brand-new ventures still finding their footing.',
    category: 'Funding',
    benefitSummary: 'Small seed grant for very early ventures (demo).',
    fitNote: 'Aimed at ventures at your current stage.',
    criteria: [
      { type: 'oneOf', field: 'stage', values: ['idea', 'early'], label: 'Business Stage', requirement: 'Idea or early stage', hard: true },
      { type: 'turnover', max: 't0', label: 'Annual turnover', requirement: 'Turnover under ₹5 lakh', hard: true },
      { type: 'support', anyOf: ['funding'], label: 'Support needed', requirement: 'Looking for funding', hard: false },
    ],
    benefits: [
      { icon: 'wallet', title: 'Seed grant', text: 'Demo: small non-repayable grant.' },
      { icon: 'users', title: 'Incubation access', text: 'Demo: workspace and mentor hours.' },
    ],
    documents: ['identity', 'bank', 'income'],
    officialSource: null,
  },
  {
    id: 'skill-mentorship',
    name: 'Skill & Mentorship Programme — Demo Scheme',
    short: 'Skill & Mentorship',
    description: 'Short courses on finance, marketing and compliance for any entrepreneur.',
    category: 'Training',
    benefitSummary: 'Free practical training and a mentor for 3 months (demo).',
    fitNote: 'Open to every stage — and you asked for training.',
    criteria: [
      { type: 'oneOf', field: 'stage', values: ['idea', 'early', 'growing', 'established'], label: 'Business Stage', requirement: 'Any stage', hard: true },
      { type: 'support', anyOf: ['training'], label: 'Support needed', requirement: 'Looking for training', hard: false },
    ],
    benefits: [
      { icon: 'book', title: 'Practical courses', text: 'Demo: finance, marketing, compliance.' },
      { icon: 'users', title: 'Mentor match', text: 'Demo: three months of guidance.' },
    ],
    documents: ['identity', 'registration'],
    officialSource: null,
  },
  {
    id: 'inclusive-credit',
    name: 'Inclusive Entrepreneur Credit — Demo Scheme',
    short: 'Inclusive Entrepreneur Credit',
    description: 'Concessional credit for entrepreneurs from SC/ST, OBC and minority communities.',
    category: 'Loan',
    benefitSummary: 'Concessional-rate credit with a longer moratorium (demo).',
    fitNote: 'Concessional credit for specific entrepreneur categories.',
    criteria: [
      { type: 'oneOf', field: 'category', values: ['scst', 'obc', 'minority'], label: 'Entrepreneur Category', requirement: 'SC/ST, OBC or minority community', hard: true },
      { type: 'registered', label: 'Registration', requirement: 'Registered enterprise', hard: true },
      { type: 'support', anyOf: ['loan', 'funding'], label: 'Support needed', requirement: 'Looking for a loan or funding', hard: false },
    ],
    benefits: [
      { icon: 'percent', title: 'Concessional rate', text: 'Demo: lower interest than market.' },
      { icon: 'clock', title: 'Longer moratorium', text: 'Demo: delayed first repayment.' },
    ],
    documents: ['identity', 'registration', 'bank', 'category'],
    officialSource: null,
  },
  {
    id: 'cluster-infra',
    name: 'Manufacturing Cluster Access — Demo Scheme',
    short: 'Manufacturing Cluster Access',
    description: 'Shared plant, testing labs and power for manufacturing clusters.',
    category: 'Infrastructure',
    benefitSummary: 'Shared plant and testing facilities at reduced cost (demo).',
    fitNote: 'Best for manufacturing units of larger size.',
    criteria: [
      { type: 'oneOf', field: 'industry', values: ['manufacturing'], label: 'Industry', requirement: 'Manufacturing units only', hard: true },
      { type: 'turnover', min: 't2', label: 'Annual turnover', requirement: 'Turnover of ₹25 lakh or more', hard: true },
      { type: 'support', anyOf: ['infrastructure', 'subsidy'], label: 'Support needed', requirement: 'Looking for infrastructure or subsidy', hard: false },
    ],
    benefits: [
      { icon: 'building', title: 'Shared plant', text: 'Demo: pay-per-use machinery.' },
      { icon: 'check', title: 'Testing labs', text: 'Demo: quality testing at reduced cost.' },
    ],
    documents: ['identity', 'registration', 'sector', 'income'],
    officialSource: null,
  },
];

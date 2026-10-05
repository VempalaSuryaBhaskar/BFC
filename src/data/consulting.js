/**
 * BFC Consulting content.
 * BFC is positioned as an advisory, expert-connect and problem-solving
 * platform. Copy here intentionally avoids claiming that BFC itself performs
 * licensed engineering, legal or financial services, and never implies
 * guaranteed outcomes.
 */

export const PROBLEM_AREAS = [
  { code: 'P-01', label: 'Execution', icon: 'wrench', text: 'Work on site is not progressing the way it was planned.' },
  { code: 'P-02', label: 'Planning', icon: 'calendarCheck', text: 'Sequencing, scheduling or phasing decisions that need a second look.' },
  { code: 'P-03', label: 'Procurement', icon: 'package', text: 'Sourcing materials, equipment or packages at the right time and terms.' },
  { code: 'P-04', label: 'Contractors', icon: 'hardhat', text: 'Finding, evaluating or working through issues with contractors.' },
  { code: 'P-05', label: 'Vendors', icon: 'truck', text: 'Identifying reliable suppliers and service providers.' },
  { code: 'P-06', label: 'Project Management', icon: 'gantt', text: 'Coordination, reporting and control across many moving parts.' },
  { code: 'P-07', label: 'Cost', icon: 'calculator', text: 'Budgets under pressure, variations and limited cost visibility.' },
  { code: 'P-08', label: 'Contracts', icon: 'contract', text: 'Scope, obligations and interpretation questions between parties.' },
  { code: 'P-09', label: 'Technical Coordination', icon: 'layers', text: 'Design, services and interface issues between disciplines.' },
  { code: 'P-10', label: 'Resources', icon: 'users', text: 'The right people, skills or capacity at the right stage.' },
  { code: 'P-11', label: 'Documentation', icon: 'files', text: 'Drawings, records and documents that are incomplete or out of sync.' },
  { code: 'P-12', label: 'Industry Expertise', icon: 'compass', text: 'Questions that need someone who has solved it before.' },
];

/** Compact 5-step flow used in the homepage "How BFC helps" section. */
export const HELP_FLOW = [
  { number: '01', title: 'Tell us the problem', text: 'A short description is enough to start.' },
  { number: '02', title: 'We understand the situation', text: 'Context, constraints and what has been tried.' },
  { number: '03', title: 'We activate the right network', text: 'People with relevant, hands-on experience.' },
  { number: '04', title: 'We connect the right expertise', text: 'Introductions with the context they need.' },
  { number: '05', title: 'You move forward', text: 'Clearer options and informed next steps.' },
];

export const SERVICES = [
  {
    id: 'project-advisory',
    icon: 'compass',
    title: 'Project Advisory',
    text: 'Practical guidance for complex project situations, from people who understand how projects run on the ground.',
  },
  {
    id: 'expert-connect',
    icon: 'expertConnect',
    title: 'Expert Connect',
    text: 'Connect with relevant technical and industry specialists suited to the specific problem you are facing.',
  },
  {
    id: 'contractor-vendor-connect',
    icon: 'hardhat',
    title: 'Contractor & Vendor Connect',
    text: 'Help identifying relevant contractors, vendors and service providers for your requirement.',
  },
  {
    id: 'project-problem-solving',
    icon: 'target',
    title: 'Project Problem Solving',
    text: 'Help diagnosing construction and project challenges, and identifying possible ways forward.',
  },
  {
    id: 'industry-intelligence',
    icon: 'chart',
    title: 'Industry Intelligence',
    text: 'Practical insights drawn from industry experience and conversations across our professional network.',
  },
  {
    id: 'strategic-advisory',
    icon: 'route',
    title: 'Strategic Advisory',
    text: 'Support for organizations navigating complex construction and infrastructure situations.',
  },
];

/** "What we help with" — Consulting page. */
export const HELP_AREAS = [
  { label: 'Project execution', icon: 'crane', text: 'Site progress, sequencing and on-ground execution challenges.' },
  { label: 'Construction management', icon: 'clipboard', text: 'Coordination, supervision and control of construction activities.' },
  { label: 'Procurement', icon: 'package', text: 'Sourcing strategy, packages, timelines and supplier options.' },
  { label: 'Contractor issues', icon: 'hardhat', text: 'Performance, capacity or coordination issues with contractors.' },
  { label: 'Vendor discovery', icon: 'search', text: 'Finding suitable vendors, suppliers and service providers.' },
  { label: 'Technical challenges', icon: 'alert', text: 'Design, engineering or interface problems that need specialist input.' },
  { label: 'Project delays', icon: 'clock', text: 'Understanding what is driving delay and what could help recovery.' },
  { label: 'Cost-related challenges', icon: 'calculator', text: 'Budget pressure, cost visibility and value-related questions.' },
  { label: 'Contract & coordination issues', icon: 'contract', text: 'Scope, responsibility and coordination questions between parties.' },
  { label: 'Resource identification', icon: 'users', text: 'Identifying people, skills and capacity for specific needs.' },
  { label: 'Industry expert access', icon: 'expertConnect', text: 'Access to experienced professionals who have dealt with similar situations.' },
];

export const PRINCIPLES = [
  {
    title: 'Understand first',
    text: 'We take time to understand the situation, the stakeholders and the constraints before suggesting anything.',
  },
  {
    title: 'Fit over familiarity',
    text: 'We look for the expertise that fits the problem, not simply whoever happens to be available.',
  },
  {
    title: 'Practical by design',
    text: 'The focus is on workable next steps you can act on, not theoretical reports.',
  },
  {
    title: 'Discreet and professional',
    text: 'Your situation is handled confidentially, with professional and ethical conduct throughout.',
  },
];

export const AUDIENCES = [
  'Project owners & clients',
  'Developers',
  'Builders',
  'Contractors',
  'Consultants',
  'Vendors & suppliers',
  'Industry stakeholders',
];

export const FAQS = [
  {
    q: 'What kind of problems can I bring to BFC?',
    a: 'Any construction or project-related challenge: execution, planning, procurement, contractors, vendors, cost, contracts, technical coordination, resources or documentation. If you are not sure whether it fits, reach out anyway and we will tell you honestly whether we can help.',
  },
  {
    q: 'Does BFC carry out engineering, legal or financial work itself?',
    a: 'BFC’s role is to understand the problem and help identify the appropriate expertise and resources. Where a situation calls for specialist engineering, legal, financial or statutory services, those are provided by appropriately qualified professionals and firms.',
  },
  {
    q: 'Will my information be kept confidential?',
    a: 'Yes. Information you share is treated confidentially and used only to understand your requirement and respond to your inquiry. Project details are shared with others only with your agreement.',
  },
  {
    q: 'Can BFC guarantee an outcome?',
    a: 'No one can honestly guarantee outcomes on a construction project. What BFC offers is a structured way to understand the problem and reach people with relevant experience, so you can make better-informed decisions.',
  },
  {
    q: 'How soon will I hear back?',
    a: '[Response timeline — to be confirmed by BFC.]',
  },
  {
    q: 'How are engagements structured?',
    a: '[Engagement model and fee structure — to be confirmed by BFC.]',
  },
];

/** Consulting inquiry form options. */
export const FORM_OPTIONS = {
  projectTypes: [
    'Residential',
    'Commercial',
    'Industrial',
    'Institutional',
    'Mixed-use',
    'Roads & highways',
    'Bridges & structures',
    'Metro & rail',
    'Water & utilities',
    'Other infrastructure',
    'Other',
  ],
  roles: [
    'Project owner / client',
    'Developer',
    'Builder',
    'Contractor',
    'Sub-contractor',
    'Consultant',
    'Architect / designer',
    'Project manager',
    'Vendor / supplier',
    'Other',
  ],
  problemCategories: [
    'Project Management',
    'Construction',
    'Procurement',
    'Contractor',
    'Vendor',
    'Technical',
    'Contracts',
    'Cost',
    'Planning',
    'Other',
  ],
  stages: [
    'Concept / feasibility',
    'Design & approvals',
    'Tendering / procurement',
    'Execution / construction',
    'Completion & handover',
    'Operations & maintenance',
    'Not sure',
  ],
  contactMethods: ['Email', 'Phone', 'WhatsApp'],
};

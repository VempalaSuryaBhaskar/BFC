/**
 * BFC Insights — PLACEHOLDER ARTICLES.
 * Titles/excerpts illustrate the editorial direction. Replace with published
 * articles. `body` is an optional array of blocks:
 *   { type: 'p' | 'h2' | 'quote', text }  or  { type: 'list', items: [] }
 * When `body` is omitted the article page renders a structured placeholder.
 */

export const INSIGHT_CATEGORIES = [
  'Construction Trends',
  'Project Management',
  'Infrastructure',
  'Contracts',
  'Procurement',
  'Technology',
  'Leadership',
  'Industry Opinions',
];

export const INSIGHTS = [
  {
    slug: 'the-industry-lacks-connection-not-expertise',
    category: 'Industry Opinions',
    title: 'The Industry Doesn’t Lack Expertise. It Lacks Connection.',
    excerpt: 'Most project problems have been solved somewhere before. The harder part is finding the person who solved them, quickly and reliably.',
    date: '2026-09-22',
    readTime: '5 min read',
    art: { pattern: 'arcs', tone: 'ember' },
    featured: true,
  },
  {
    slug: 'why-schedules-slip-before-delay-is-visible',
    category: 'Project Management',
    title: 'Why Schedules Slip Long Before the Delay Is Visible',
    excerpt: 'Delays tend to accumulate quietly through small decisions. A look at the early signals project teams can watch for.',
    date: '2026-09-08',
    readTime: '6 min read',
    art: { pattern: 'grid', tone: 'steel' },
  },
  {
    slug: 'procurement-is-a-risk-decision',
    category: 'Procurement',
    title: 'Procurement Is a Project Risk Decision, Not Just a Purchasing One',
    excerpt: 'How packaging, vendor selection and timing choices made early shape a project’s risk profile for months afterwards.',
    date: '2026-08-25',
    readTime: '7 min read',
    art: { pattern: 'truss', tone: 'graphite' },
  },
  {
    slug: 'reading-a-contract-before-it-becomes-a-dispute',
    category: 'Contracts',
    title: 'Reading a Contract Before It Becomes a Dispute',
    excerpt: 'The clauses project teams most often overlook, and why understanding them early is worth the time.',
    date: '2026-08-11',
    readTime: '6 min read',
    art: { pattern: 'contour', tone: 'paper' },
  },
  {
    slug: 'what-infrastructure-teaches-about-interfaces',
    category: 'Infrastructure',
    title: 'What Large Infrastructure Projects Teach Us About Interfaces',
    excerpt: 'On complex projects, the hardest problems often sit between packages, agencies and disciplines rather than within them.',
    date: '2026-07-28',
    readTime: '8 min read',
    art: { pattern: 'beams', tone: 'concrete' },
  },
  {
    slug: 'construction-technology-that-earns-its-place',
    category: 'Technology',
    title: 'Construction Technology That Earns Its Place on Site',
    excerpt: 'A practical lens for evaluating digital tools: adoption effort, data quality and whether site teams actually benefit.',
    date: '2026-07-14',
    readTime: '5 min read',
    art: { pattern: 'iso', tone: 'steel' },
  },
  {
    slug: 'leading-a-site-team-through-a-difficult-phase',
    category: 'Leadership',
    title: 'Leading a Site Team Through a Difficult Phase',
    excerpt: 'When pressure rises, leadership on site becomes visible. Notes on clarity, communication and keeping people aligned.',
    date: '2026-06-30',
    readTime: '4 min read',
    art: { pattern: 'arcs', tone: 'amber' },
  },
  {
    slug: 'shifts-reshaping-project-delivery',
    category: 'Construction Trends',
    title: 'Shifts Quietly Reshaping How Projects Get Delivered',
    excerpt: 'From delivery models to digital workflows and skills, the changes worth watching across construction and infrastructure.',
    date: '2026-06-16',
    readTime: '7 min read',
    art: { pattern: 'grid', tone: 'ember' },
  },
].map((article) => ({
  author: '[Author Name]',
  authorRole: '[Author Role]',
  featured: false,
  ...article,
}));

export function getInsightBySlug(slug) {
  return INSIGHTS.find((a) => a.slug === slug);
}

export function getLatestInsights(limit) {
  const sorted = [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date));
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

/**
 * BFC Talks episodes — MOCK DATA.
 * Titles, dates and durations are placeholders for layout purposes.
 *
 * To publish a real episode:
 *  - youtubeUrl: full link to the video (used by "Watch on YouTube")
 *  - youtubeId:  the video ID (e.g. 'dQw4w9WgXcQ'); when set, the episode page
 *                shows a click-to-load embedded player
 *  - thumbnail:  optional image path; when empty a branded thumbnail is generated
 *  - art:        pattern/tone for the generated thumbnail
 */

import { getGuest } from './guests';

export const TALK_CATEGORIES = [
  'Construction',
  'Infrastructure',
  'Real Estate',
  'Project Management',
  'Leadership',
  'Technology',
  'Entrepreneurship',
];

const YOUTUBE_PLACEHOLDER = 'https://www.youtube.com/'; // TODO: replace per episode

export const EPISODES = [
  {
    number: 1,
    slug: 'building-beyond-the-blueprint',
    title: 'Building Beyond the Blueprint',
    guestId: 'guest-01',
    topic: 'Construction',
    date: '2026-03-12',
    duration: '48:20',
    excerpt: 'What it takes to turn drawings into delivered projects, and the decisions that never make it onto the blueprint.',
    highlights: [
      'Where the gap between design intent and site reality usually opens',
      'Decisions on site that shape cost, quality and time',
      'What experienced teams do differently in the first months of a project',
    ],
    art: { pattern: 'beams', tone: 'ember' },
    featured: true,
    popular: true,
  },
  {
    number: 2,
    slug: 'the-real-cost-of-a-delayed-project',
    title: 'The Real Cost of a Delayed Project',
    guestId: 'guest-02',
    topic: 'Project Management',
    date: '2026-04-02',
    duration: '41:05',
    excerpt: 'Delays rarely start where they show up. A conversation on early signals, schedule realism and recovery.',
    highlights: [
      'Early warning signs that a schedule is drifting',
      'Why recovery plans fail when root causes are unclear',
      'Making progress reporting useful for decisions',
    ],
    art: { pattern: 'grid', tone: 'steel' },
    popular: true,
  },
  {
    number: 3,
    slug: 'infrastructure-that-outlasts-its-builders',
    title: 'Infrastructure That Outlasts Its Builders',
    guestId: 'guest-03',
    topic: 'Infrastructure',
    date: '2026-04-23',
    duration: '52:40',
    excerpt: 'Designing, delivering and maintaining infrastructure that has to perform for decades, not just until handover.',
    highlights: [
      'Thinking in life-cycle terms from the start',
      'Interfaces between agencies, designers and contractors',
      'What long-life assets demand from execution teams',
    ],
    art: { pattern: 'truss', tone: 'graphite' },
  },
  {
    number: 4,
    slug: 'what-developers-wish-contractors-knew',
    title: 'What Developers Wish Contractors Knew',
    guestId: 'guest-04',
    topic: 'Real Estate',
    date: '2026-05-14',
    duration: '44:55',
    excerpt: 'An honest look at the developer–contractor relationship, and how both sides can make projects run smoother.',
    highlights: [
      'Expectations that are rarely written down',
      'Communication habits that build trust on a project',
      'How commercial pressure shows up on site',
    ],
    art: { pattern: 'contour', tone: 'paper' },
    popular: true,
  },
  {
    number: 5,
    slug: 'from-site-engineer-to-founder',
    title: 'From Site Engineer to Founder',
    guestId: 'guest-05',
    topic: 'Entrepreneurship',
    date: '2026-06-04',
    duration: '57:10',
    excerpt: 'The journey from working on site to building a company in the construction ecosystem.',
    highlights: [
      'Recognizing a problem worth building a business around',
      'Lessons from the field that carry into entrepreneurship',
      'Building credibility in a relationship-driven industry',
    ],
    art: { pattern: 'arcs', tone: 'amber' },
  },
  {
    number: 6,
    slug: 'where-construction-technology-actually-works',
    title: 'Where Construction Technology Actually Works',
    guestId: 'guest-06',
    topic: 'Technology',
    date: '2026-07-02',
    duration: '46:30',
    excerpt: 'Separating useful construction technology from the hype, from the perspective of people who use it on real sites.',
    highlights: [
      'Adoption challenges on live projects',
      'Where digital tools save time, and where they add work',
      'What PropTech and ConTech founders often underestimate',
    ],
    art: { pattern: 'iso', tone: 'concrete' },
    popular: true,
  },
  {
    number: 7,
    slug: 'leading-when-the-project-goes-sideways',
    title: 'Leading When the Project Goes Sideways',
    guestId: 'guest-07',
    topic: 'Leadership',
    date: '2026-08-06',
    duration: '39:45',
    excerpt: 'Leadership under pressure: keeping teams, clients and partners aligned when a project hits trouble.',
    highlights: [
      'The first conversations to have when things go wrong',
      'Keeping site teams motivated through difficult phases',
      'Rebuilding trust with clients and partners',
    ],
    art: { pattern: 'arcs', tone: 'ember' },
  },
  {
    number: 8,
    slug: 'procurement-as-strategy',
    title: 'Procurement as Strategy, Not Paperwork',
    guestId: 'guest-08',
    topic: 'Construction',
    date: '2026-09-10',
    duration: '43:15',
    excerpt: 'Why procurement decisions made early quietly shape the cost, schedule and risk profile of a project.',
    highlights: [
      'Packaging decisions and their downstream effects',
      'Balancing price, capability and reliability',
      'Building a dependable vendor base',
    ],
    art: { pattern: 'grid', tone: 'graphite' },
  },
].map((ep) => ({
  id: `ep-${String(ep.number).padStart(2, '0')}`,
  youtubeUrl: YOUTUBE_PLACEHOLDER,
  youtubeId: '',
  thumbnail: '',
  description: `${ep.excerpt} [Full episode description — replace with the published show notes.]`,
  featured: false,
  popular: false,
  ...ep,
}));

export function getEpisodeBySlug(slug) {
  return EPISODES.find((ep) => ep.slug === slug);
}

export function getEpisodesByGuest(guestId) {
  return EPISODES.filter((ep) => ep.guestId === guestId);
}

export function getLatestEpisodes(limit) {
  const sorted = [...EPISODES].sort((a, b) => b.date.localeCompare(a.date));
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

export function getFeaturedEpisode() {
  return EPISODES.find((ep) => ep.featured) ?? getLatestEpisodes(1)[0];
}

export function withGuest(episode) {
  return { ...episode, guest: getGuest(episode.guestId) };
}

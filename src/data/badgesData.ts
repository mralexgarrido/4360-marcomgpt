import { Badge } from '../types';

export const BADGES: Badge[] = [
  {
    id: 'prompt-architect',
    name: 'Prompt Architect',
    title: 'Source-Bounded Prompt Master',
    description: 'Constructed a prompt scoring 18+ points across all 7 dimensions of the MarCom Prompt Canvas.',
    criteria: 'Score 18/21 or higher on any Station Prompt Workbench.',
    iconName: 'LayoutTemplate',
    category: 'core',
  },
  {
    id: 'source-skeptic',
    name: 'Source Skeptic',
    title: 'Hallucination & Gap Detective',
    description: 'Consistently caught unsupported assertions and invented facts in simulated AI drafts.',
    criteria: 'Complete the PR Situation Room & Operations Hallucination Hunts.',
    iconName: 'ShieldAlert',
    category: 'core',
  },
  {
    id: 'brand-guardian',
    name: 'Brand Guardian',
    title: 'Tone & Style Protector',
    description: 'Enforced institutional voice, messaging boundaries, and negative constraints without drift.',
    criteria: 'Complete Social Mission Control & Internal Voice modules.',
    iconName: 'Award',
    category: 'specialist',
  },
  {
    id: 'accessibility-ally',
    name: 'Accessibility Ally',
    title: 'WCAG & Universal Design Champion',
    description: 'Diagnosed digital barriers, composed accessible alt-text, and checked contrast & readability.',
    criteria: 'Solve the Web & UX Clinic and Social Media Alt-Text Clinics.',
    iconName: 'Eye',
    category: 'specialist',
  },
  {
    id: 'crisis-calm',
    name: 'Crisis Calm',
    title: 'Zero-Speculation Communicator',
    description: 'Navigated high-stakes PR breaking situations by isolating confirmed facts from unknowns.',
    criteria: 'Complete the PR Situation Room crisis simulation with 100% factual fidelity.',
    iconName: 'Flame',
    category: 'specialist',
  },
  {
    id: 'analytics-translator',
    name: 'Analytics Translator',
    title: 'Evidence vs Causality Clarifier',
    description: 'Separated observed funnel drop-offs from explanations and demanded validation evidence.',
    criteria: 'Solve Digital Growth Lab Causality Trap microgame.',
    iconName: 'TrendingUp',
    category: 'specialist',
  },
  {
    id: 'channel-shapeshifter',
    name: 'Channel Shapeshifter',
    title: 'Multi-Platform Strategist',
    description: 'Adapted core strategic messages across LinkedIn, Instagram, X, and Web without content distortion.',
    criteria: 'Complete the Social Mission Control Channel Remix challenge.',
    iconName: 'Share2',
    category: 'specialist',
  },
  {
    id: 'integrated-strategist',
    name: 'Integrated Strategist',
    title: 'Capstone 360° Leader',
    description: 'Demonstrated end-to-end MarCom AI leadership across operations, strategy, PR, digital, and leadership.',
    criteria: 'Complete the Integrated Capstone: 360° Challenge with mastery.',
    iconName: 'Crown',
    category: 'capstone',
  },
];

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  tagline: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'MarCom Apprentice', minXp: 0, maxXp: 300, tagline: 'Exploring foundational prompting and basic safety checks' },
  { level: 2, title: 'Operations Operator', minXp: 300, maxXp: 750, tagline: 'Mastering briefs, RACI, and structured AI workflows' },
  { level: 3, title: 'Strategic Communicator', minXp: 750, maxXp: 1400, tagline: 'Formulating audience hypotheses and channel adaptations' },
  { level: 4, title: 'Senior AI Advisor', minXp: 1400, maxXp: 2200, tagline: 'Handling crisis triage, UX diagnostics, and enterprise governance' },
  { level: 5, title: 'MarCom AI Lead', minXp: 2200, maxXp: 3500, tagline: 'Directing 360° cross-functional campaigns with complete human-in-the-loop fidelity' },
];

export function getLevelInfo(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

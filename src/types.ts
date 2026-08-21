export type LearnerMode = 'student' | 'professional';

export type StationCategory = 
  | 'foundations'
  | 'operations'
  | 'strategy'
  | 'growth'
  | 'social'
  | 'web_ux'
  | 'pr'
  | 'internal'
  | 'creative'
  | 'events'
  | 'capstone';

export interface PromptCanvasFields {
  outcome: string;
  audience: string;
  context: string;
  sources: string;
  constraints: string;
  output: string;
  verification: string;
}

export interface RubricDimensionScore {
  score: number; // 0 to 3
  feedback: string;
  strengths: string[];
  suggestions: string[];
}

export interface PromptEvaluation {
  totalScore: number; // 0 to 21
  dimensions: {
    outcome: RubricDimensionScore;
    audience: RubricDimensionScore;
    context: RubricDimensionScore;
    sources: RubricDimensionScore;
    constraints: RubricDimensionScore;
    output: RubricDimensionScore;
    verification: RubricDimensionScore;
  };
  tier: 'Fragile' | 'Usable' | 'Strong' | 'Source-Ready';
  tierColor: string;
  summary: string;
}

export interface IllustrativeOutput {
  id: string;
  title: string;
  scenarioInput: string;
  weakOutput: {
    text: string;
    flaws: string[];
    explanation: string;
  };
  strongOutput: {
    text: string;
    strengths: string[];
    verificationChecklist: string[];
    explanation: string;
  };
  copilotWorkflowNote?: string;
  chatgptWorkflowNote?: string;
}

export interface MicrogameOption {
  id: string;
  text: string;
  category: string; // e.g. 'Confirmed' | 'Unknown' | 'Action' OR 'Modern Practice' | 'SEO Museum (Outdated)'
  explanation: string;
  isCorrect?: boolean;
}

export interface MicrogameItem {
  id: string;
  type: 'hallucination_hunt' | 'card_sort' | 'causality_trap' | 'prompt_repair' | 'channel_remix' | 'accessibility_check' | 'alt_text_clinic';
  title: string;
  instruction: string;
  promptContext?: string;
  snippetText?: string; // For hallucination hunt: click on words/sentences
  unsupportedClaims?: string[]; // IDs or exact text matching
  categories?: string[]; // For card sort
  cards?: MicrogameOption[];
  feedbackIfCorrect: string;
  xpReward: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referenceSource?: string;
}

export interface StationModule {
  id: string;
  order: number;
  category: StationCategory;
  title: string;
  subtitle: string;
  umcRole: string;
  estimatedMinutes: number;
  xpReward: number;
  badgeId?: string;
  overview: string;
  umcAlignment: string;
  learningObjectives: string[];
  commonFailureModes: string[];
  brief: {
    client: string;
    situation: string;
    confirmedFacts: string[];
    unknownsOrRisks: string[];
    goal: string;
  };
  promptChallenge: {
    id: string;
    title: string;
    instructions: string;
    studentStarter: PromptCanvasFields;
    proStarter: PromptCanvasFields;
    sampleHighScoringPrompt: PromptCanvasFields;
    copilotMappingExplanation: string;
  };
  illustrativeOutputs: IllustrativeOutput[];
  microgames: MicrogameItem[];
  quiz: QuizQuestion[];
}

export interface Badge {
  id: string;
  name: string;
  title: string;
  description: string;
  criteria: string;
  iconName: string;
  requiredXp?: number;
  category: 'core' | 'specialist' | 'capstone';
}

export interface SourceCitation {
  id: string;
  author: string;
  year: string;
  title: string;
  publisher: string;
  url: string;
  summary: string;
  keyTakeaway: string;
  lastAudited: string;
  volatileStatus?: string;
}

export interface AppState {
  schemaVersion: 1;
  learnerMode: LearnerMode;
  activeStationId: string;
  completedStationIds: string[];
  completedMicrogameIds: string[];
  completedQuizIds: string[];
  reviewedBriefStationIds?: string[];
  savedPromptDrafts: Record<string, PromptCanvasFields>;
  promptScores: Record<string, number>;
  unlockedBadgeIds: string[];
  xp: number;
  streakCount: number;
  lastActiveDate: string;
  settings: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
    soundEnabled: boolean;
  };
}

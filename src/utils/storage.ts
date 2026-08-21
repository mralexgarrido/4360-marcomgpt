import { AppState, PromptCanvasFields } from '../types';
import { ALL_STATIONS } from '../data/modulesData';
import { BADGES } from '../data/badgesData';

const STORAGE_KEY = 'marcom-gpt-state-v1';

export function getDefaultState(): AppState {
  // Initialize saved drafts with starter templates for student mode
  const initialDrafts: Record<string, PromptCanvasFields> = {};
  ALL_STATIONS.forEach((station) => {
    initialDrafts[station.id] = { ...station.promptChallenge.studentStarter };
  });

  return {
    schemaVersion: 1,
    learnerMode: 'student',
    activeStationId: ALL_STATIONS[0].id,
    completedStationIds: [],
    completedMicrogameIds: [],
    completedQuizIds: [],
    reviewedBriefStationIds: [],
    savedPromptDrafts: initialDrafts,
    promptScores: {},
    unlockedBadgeIds: [],
    xp: 0,
    streakCount: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    settings: {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      soundEnabled: true,
    },
  };
}

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    if (parsed && parsed.schemaVersion === 1) {
      return {
        ...getDefaultState(),
        ...parsed,
        settings: {
          ...getDefaultState().settings,
          ...(parsed.settings || {}),
        },
      };
    }
  } catch (err) {
    console.error('Error loading app state from localStorage:', err);
  }
  return getDefaultState();
}

export function saveAppState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving app state to localStorage:', err);
  }
}

export function resetAppState(): AppState {
  localStorage.removeItem(STORAGE_KEY);
  return getDefaultState();
}

export function exportAppStateJson(state: AppState): string {
  const exportPayload = {
    app: 'MarCom GPT Learning Lab',
    exportedAt: new Date().toISOString(),
    state,
  };
  return JSON.stringify(exportPayload, null, 2);
}

export function importAppStateJson(jsonString: string): { success: boolean; newState?: AppState; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    const candidateState = parsed.state || parsed;

    if (!candidateState || candidateState.schemaVersion !== 1) {
      return { success: false, error: 'Invalid state format. Expected schemaVersion: 1.' };
    }

    // Sanitize state fields
    const sanitized: AppState = {
      schemaVersion: 1,
      learnerMode: candidateState.learnerMode === 'professional' ? 'professional' : 'student',
      activeStationId: typeof candidateState.activeStationId === 'string' ? candidateState.activeStationId : ALL_STATIONS[0].id,
      completedStationIds: Array.isArray(candidateState.completedStationIds) ? candidateState.completedStationIds : [],
      completedMicrogameIds: Array.isArray(candidateState.completedMicrogameIds) ? candidateState.completedMicrogameIds : [],
      completedQuizIds: Array.isArray(candidateState.completedQuizIds) ? candidateState.completedQuizIds : [],
      reviewedBriefStationIds: Array.isArray(candidateState.reviewedBriefStationIds) ? candidateState.reviewedBriefStationIds : [],
      savedPromptDrafts: typeof candidateState.savedPromptDrafts === 'object' ? candidateState.savedPromptDrafts : {},
      promptScores: typeof candidateState.promptScores === 'object' ? candidateState.promptScores : {},
      unlockedBadgeIds: Array.isArray(candidateState.unlockedBadgeIds) ? candidateState.unlockedBadgeIds : [],
      xp: typeof candidateState.xp === 'number' ? candidateState.xp : 0,
      streakCount: typeof candidateState.streakCount === 'number' ? candidateState.streakCount : 1,
      lastActiveDate: typeof candidateState.lastActiveDate === 'string' ? candidateState.lastActiveDate : new Date().toISOString().split('T')[0],
      settings: {
        highContrast: Boolean(candidateState.settings?.highContrast),
        largeText: Boolean(candidateState.settings?.largeText),
        reducedMotion: Boolean(candidateState.settings?.reducedMotion),
        soundEnabled: candidateState.settings?.soundEnabled !== false,
      },
    };

    saveAppState(sanitized);
    return { success: true, newState: sanitized };
  } catch (err) {
    return { success: false, error: 'Invalid JSON file. Please check the file contents.' };
  }
}

export function checkAndAwardBadges(state: AppState): { updatedBadges: string[]; newlyAwarded: string[] } {
  const currentBadges = new Set(state.unlockedBadgeIds);
  const newlyAwarded: string[] = [];

  BADGES.forEach((badge) => {
    if (currentBadges.has(badge.id)) return;

    let shouldAward = false;

    if (badge.id === 'prompt-architect') {
      // Score 18+ on any prompt
      shouldAward = Object.values(state.promptScores).some((s) => s >= 18);
    } else if (badge.id === 'source-skeptic') {
      // Complete foundations hallucination hunt & operations cardsort
      shouldAward = state.completedMicrogameIds.includes('game-foundations-hallucination') &&
                    state.completedMicrogameIds.includes('game-ops-cardsort');
    } else if (badge.id === 'brand-guardian') {
      // Complete social & internal stations
      shouldAward = state.completedStationIds.includes('station-social') ||
                    state.completedStationIds.includes('station-internal');
    } else if (badge.id === 'accessibility-ally') {
      // Complete web or alt-text clinic
      shouldAward = state.completedMicrogameIds.includes('game-social-alttext') ||
                    state.completedStationIds.includes('station-web');
    } else if (badge.id === 'crisis-calm') {
      // Complete PR station
      shouldAward = state.completedStationIds.includes('station-pr');
    } else if (badge.id === 'analytics-translator') {
      // Complete Growth station or strategy myth detector
      shouldAward = state.completedStationIds.includes('station-growth') ||
                    state.completedMicrogameIds.includes('game-strat-causality');
    } else if (badge.id === 'channel-shapeshifter') {
      // Complete social station
      shouldAward = state.completedStationIds.includes('station-social');
    } else if (badge.id === 'integrated-strategist') {
      // Complete capstone
      shouldAward = state.completedStationIds.includes('station-capstone');
    }

    if (shouldAward) {
      newlyAwarded.push(badge.id);
      currentBadges.add(badge.id);
    }
  });

  return {
    updatedBadges: Array.from(currentBadges),
    newlyAwarded,
  };
}

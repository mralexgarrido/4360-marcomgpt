/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  FileText, 
  Layers, 
  Compass, 
  AlertTriangle,
  X,
  Lock,
  RotateCcw
} from 'lucide-react';

import { AppState, LearnerMode, PromptCanvasFields } from './types';
import { ALL_STATIONS, getStationById, getNextStationId } from './data/modulesData';
import { BADGES } from './data/badgesData';
import { loadAppState, saveAppState, checkAndAwardBadges, resetAppState } from './utils/storage';

import { Navbar } from './components/Navbar';
import { StationSidebar } from './components/StationSidebar';
import { PromptWorkbench } from './components/PromptWorkbench';
import { MicrogameRunner } from './components/MicrogameRunner';
import { QuizEngine } from './components/QuizEngine';
import { IllustrativeOutputViewer } from './components/IllustrativeOutputViewer';
import { BadgesModal } from './components/BadgesModal';
import { ReadinessProfileModal } from './components/ReadinessProfileModal';
import { SourceLibraryModal } from './components/SourceLibraryModal';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { ExportImportModal } from './components/ExportImportModal';
import { ProgressDashboardModal } from './components/ProgressDashboardModal';

export default function App() {
  const [state, setState] = useState<AppState>(() => loadAppState());
  // Default to 'brief' so every station begins logically with situation and context
  const [activeTab, setActiveTab] = useState<'brief' | 'workbench' | 'microgames' | 'outputs' | 'quiz'>('brief');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showIncompleteNotice, setShowIncompleteNotice] = useState(false);
  
  // Modals state
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showReadiness, setShowReadiness] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [newBadgeAlert, setNewBadgeAlert] = useState<string | null>(null);

  // Sync to local storage whenever state changes
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const activeStation = getStationById(state.activeStationId) || ALL_STATIONS[0];
  const activeDraft = state.savedPromptDrafts[activeStation.id] || {
    ...(state.learnerMode === 'professional' ? activeStation.promptChallenge.proStarter : activeStation.promptChallenge.studentStarter)
  };

  // Station Milestone Logic
  const isStationCompleted = state.completedStationIds.includes(activeStation.id);
  const isBriefReviewed = Boolean(state.reviewedBriefStationIds?.includes(activeStation.id) || isStationCompleted);
  const promptScore = state.promptScores[activeStation.id] || 0;
  const isPromptEvaluated = promptScore >= 10 || isStationCompleted;
  const areMicrogamesSolved = activeStation.microgames.length === 0 || 
    activeStation.microgames.every((g) => state.completedMicrogameIds.includes(g.id)) || isStationCompleted;
  const isQuizPassed = activeStation.quiz.length === 0 || 
    state.completedQuizIds.includes(activeStation.id) || isStationCompleted;

  const isStationMasteryEligible = isPromptEvaluated && areMicrogamesSolved && isQuizPassed;

  const handleAwardXp = (amount: number) => {
    setState((prev) => {
      const updatedXp = prev.xp + amount;
      const candidateState = { ...prev, xp: updatedXp };
      const { updatedBadges, newlyAwarded } = checkAndAwardBadges(candidateState);
      
      if (newlyAwarded.length > 0) {
        setNewBadgeAlert(newlyAwarded[0]);
        if (!state.settings.reducedMotion) {
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch (e) {}
        }
      }

      return {
        ...candidateState,
        unlockedBadgeIds: updatedBadges,
      };
    });
  };

  const handleSetLearnerMode = (mode: LearnerMode) => {
    setState((prev) => ({ ...prev, learnerMode: mode }));
  };

  const handleSelectStation = (stationId: string) => {
    setState((prev) => ({ ...prev, activeStationId: stationId }));
    // Always start at Brief & Risks when switching station!
    setActiveTab('brief');
    setShowIncompleteNotice(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAcknowledgeBrief = () => {
    if (!state.reviewedBriefStationIds?.includes(activeStation.id)) {
      setState((prev) => {
        const reviewed = [...(prev.reviewedBriefStationIds || []), activeStation.id];
        const updatedXp = prev.xp + 10;
        const candidateState = { ...prev, reviewedBriefStationIds: reviewed, xp: updatedXp };
        const { updatedBadges } = checkAndAwardBadges(candidateState);
        return {
          ...candidateState,
          unlockedBadgeIds: updatedBadges,
        };
      });
    }
    setActiveTab('workbench');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeDraft = (fields: PromptCanvasFields) => {
    setState((prev) => ({
      ...prev,
      savedPromptDrafts: {
        ...prev.savedPromptDrafts,
        [activeStation.id]: fields,
      },
    }));
  };

  const handleSaveScore = (score: number) => {
    setState((prev) => {
      const updatedScores = {
        ...prev.promptScores,
        [activeStation.id]: Math.max(prev.promptScores[activeStation.id] || 0, score),
      };
      const candidateState = { ...prev, promptScores: updatedScores };
      const { updatedBadges, newlyAwarded } = checkAndAwardBadges(candidateState);

      if (newlyAwarded.length > 0) {
        setNewBadgeAlert(newlyAwarded[0]);
        if (!state.settings.reducedMotion) {
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch (e) {}
        }
      }

      return {
        ...candidateState,
        unlockedBadgeIds: updatedBadges,
      };
    });
  };

  const handleCompleteMicrogame = (gameId: string, xpReward: number) => {
    if (state.completedMicrogameIds.includes(gameId)) return;
    setState((prev) => {
      const updatedGames = [...prev.completedMicrogameIds, gameId];
      const updatedXp = prev.xp + xpReward;
      const candidateState = { ...prev, completedMicrogameIds: updatedGames, xp: updatedXp };
      const { updatedBadges, newlyAwarded } = checkAndAwardBadges(candidateState);

      if (newlyAwarded.length > 0) {
        setNewBadgeAlert(newlyAwarded[0]);
      }

      return {
        ...candidateState,
        unlockedBadgeIds: updatedBadges,
      };
    });
  };

  const handleCompleteQuiz = (xpReward: number) => {
    if (state.completedQuizIds.includes(activeStation.id)) return;
    setState((prev) => {
      const updatedQuizzes = [...prev.completedQuizIds, activeStation.id];
      const updatedXp = prev.xp + xpReward;
      const candidateState = { ...prev, completedQuizIds: updatedQuizzes, xp: updatedXp };
      const { updatedBadges, newlyAwarded } = checkAndAwardBadges(candidateState);

      if (newlyAwarded.length > 0) {
        setNewBadgeAlert(newlyAwarded[0]);
      }

      return {
        ...candidateState,
        unlockedBadgeIds: updatedBadges,
      };
    });
  };

  const handleMarkStationComplete = () => {
    if (isStationCompleted) return;

    if (!isStationMasteryEligible) {
      setShowIncompleteNotice(true);
      return;
    }

    setState((prev) => {
      const updatedCompleted = [...prev.completedStationIds, activeStation.id];
      const updatedXp = prev.xp + activeStation.xpReward;
      const candidateState = { ...prev, completedStationIds: updatedCompleted, xp: updatedXp };
      const { updatedBadges, newlyAwarded } = checkAndAwardBadges(candidateState);

      if (newlyAwarded.length > 0) {
        setNewBadgeAlert(newlyAwarded[0]);
      }

      if (!state.settings.reducedMotion) {
        try {
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
        } catch (e) {}
      }

      return {
        ...candidateState,
        unlockedBadgeIds: updatedBadges,
      };
    });
  };

  const nextStationId = getNextStationId(activeStation.id);

  return (
    <div className={`min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-orange-600 selection:text-white ${
      state.settings.highContrast ? 'contrast-125' : ''
    } ${state.settings.largeText ? 'text-lg' : 'text-sm'}`}>
      
      {/* Top Header */}
      <Navbar
        state={state}
        onSetLearnerMode={handleSetLearnerMode}
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onOpenMap={() => setIsMobileSidebarOpen(true)}
        onOpenProgress={() => setShowProgressModal(true)}
        onOpenBadges={() => setShowBadges(true)}
        onOpenReadiness={() => setShowReadiness(true)}
        onOpenSources={() => setShowSources(true)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenExport={() => setShowExport(true)}
      />

      {/* Main Two-Column Workflow Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Desktop Sidebar Navigation */}
        <div className="hidden lg:block">
          <StationSidebar
            state={state}
            activeStationId={activeStation.id}
            onSelectStation={handleSelectStation}
            onOpenProgress={() => setShowProgressModal(true)}
          />
        </div>

        {/* Mobile Slide-out Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
            <div className="relative w-80 max-w-full bg-zinc-900 h-full z-10 flex flex-col shadow-2xl">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                <span className="font-bold text-white">11 Learning Stations</span>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <StationSidebar
                  state={state}
                  activeStationId={activeStation.id}
                  onSelectStation={handleSelectStation}
                  onOpenProgress={() => {
                    setIsMobileSidebarOpen(false);
                    setShowProgressModal(true);
                  }}
                  onCloseMobile={() => setIsMobileSidebarOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Right Main Stage Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Badge Unlock Celebration Banner */}
          {newBadgeAlert && (
            <div className="bg-orange-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between animate-fadeIn">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-zinc-950 text-orange-400 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-wider">New Mastery Badge Unlocked!</span>
                  <h4 className="text-base font-black">
                    {BADGES.find((b) => b.id === newBadgeAlert)?.name || 'Mastery Achievement'}
                  </h4>
                  <p className="text-xs font-medium text-orange-100">
                    {BADGES.find((b) => b.id === newBadgeAlert)?.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNewBadgeAlert(null)}
                className="px-3 py-1.5 bg-zinc-950 text-white text-xs font-bold rounded-xl hover:bg-zinc-850 transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Incomplete Milestones Warning Modal */}
          {showIncompleteNotice && (
            <div className="bg-zinc-900 border-2 border-orange-500 rounded-2xl p-5 shadow-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-orange-400 font-bold">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Station Mastery Locked — Prerequisites Remaining</span>
                </div>
                <button
                  onClick={() => setShowIncompleteNotice(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                To prevent mindless progression and earn the <strong>+{activeStation.xpReward} XP</strong> station mastery credit, complete the required exercises below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div className={`p-3 rounded-xl border text-xs ${
                  isPromptEvaluated ? 'bg-zinc-950 border-orange-500/60 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}>
                  <span className="font-bold block mb-0.5">1. Prompt Canvas</span>
                  {isPromptEvaluated ? (
                    <span className="text-orange-400 font-semibold">✓ Evaluated ({promptScore}/21 pts)</span>
                  ) : (
                    <span className="text-zinc-500">Pending (Min 10 pts)</span>
                  )}
                </div>

                <div className={`p-3 rounded-xl border text-xs ${
                  areMicrogamesSolved ? 'bg-zinc-950 border-orange-500/60 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}>
                  <span className="font-bold block mb-0.5">2. Microgame</span>
                  {areMicrogamesSolved ? (
                    <span className="text-orange-400 font-semibold">✓ 100% Correct</span>
                  ) : (
                    <span className="text-zinc-500">Pending verification</span>
                  )}
                </div>

                <div className={`p-3 rounded-xl border text-xs ${
                  isQuizPassed ? 'bg-zinc-950 border-orange-500/60 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}>
                  <span className="font-bold block mb-0.5">3. Knowledge Quiz</span>
                  {isQuizPassed ? (
                    <span className="text-orange-400 font-semibold">✓ 100% Passed</span>
                  ) : (
                    <span className="text-zinc-500">Pending 100% score</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Station Hero Header */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider bg-orange-600 text-white">
                    Station {activeStation.order} of {ALL_STATIONS.length}
                  </span>
                  <span className="text-xs font-semibold text-zinc-300 bg-zinc-800 px-2.5 py-0.5 rounded-md border border-zinc-700">
                    Role: {activeStation.umcRole}
                  </span>
                  {isStationCompleted && (
                    <span className="flex items-center space-x-1 text-xs font-bold text-orange-400 bg-zinc-950 px-2.5 py-0.5 rounded-md border border-orange-600/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                      <span>Station Mastered</span>
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeStation.title}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {activeStation.overview}
                </p>
              </div>

              {/* Station Completion Button */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 flex-shrink-0">
                {!isStationCompleted ? (
                  <button
                    onClick={handleMarkStationComplete}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all active:scale-95 ${
                      isStationMasteryEligible
                        ? 'bg-orange-600 hover:bg-orange-500 text-white cursor-pointer ring-2 ring-orange-500/50'
                        : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700 cursor-pointer'
                    }`}
                  >
                    {isStationMasteryEligible ? (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Claim Station Mastery (+{activeStation.xpReward} XP)</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Complete Exercises to Master</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-xs font-bold text-orange-400 bg-zinc-950 border border-orange-500/40 px-3 py-2 rounded-xl flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>Station Mastered (+{activeStation.xpReward} XP)</span>
                  </div>
                )}

                {nextStationId && (
                  <button
                    onClick={() => handleSelectStation(nextStationId)}
                    className="flex items-center space-x-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 px-3 py-2 rounded-xl border border-zinc-700 transition-colors"
                  >
                    <span>Next Station</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                  </button>
                )}
              </div>

            </div>

            {/* Station Mastery Progress Indicator Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setActiveTab('brief')}
                className={`p-2 rounded-xl border text-left text-xs transition-all ${
                  activeTab === 'brief'
                    ? 'border-orange-500 bg-zinc-950 text-white'
                    : isBriefReviewed
                    ? 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
                    : 'border-zinc-800 bg-zinc-950/40 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold">1. Scenario Brief</span>
                  {isBriefReviewed ? <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> : <span className="text-zinc-500">○</span>}
                </div>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  {isBriefReviewed ? 'Reviewed' : 'Start here'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('workbench')}
                className={`p-2 rounded-xl border text-left text-xs transition-all ${
                  activeTab === 'workbench'
                    ? 'border-orange-500 bg-zinc-950 text-white'
                    : isPromptEvaluated
                    ? 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
                    : 'border-zinc-800 bg-zinc-950/40 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold">2. Prompt Canvas</span>
                  {isPromptEvaluated ? <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> : <span className="text-zinc-500">○</span>}
                </div>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  {promptScore ? `${promptScore}/21 pts` : 'Needs evaluation'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('microgames')}
                className={`p-2 rounded-xl border text-left text-xs transition-all ${
                  activeTab === 'microgames'
                    ? 'border-orange-500 bg-zinc-950 text-white'
                    : areMicrogamesSolved
                    ? 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
                    : 'border-zinc-800 bg-zinc-950/40 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold">3. Microgame</span>
                  {areMicrogamesSolved ? <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> : <span className="text-zinc-500">○</span>}
                </div>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  {areMicrogamesSolved ? '100% Solved' : 'Unsolved'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`p-2 rounded-xl border text-left text-xs transition-all ${
                  activeTab === 'quiz'
                    ? 'border-orange-500 bg-zinc-950 text-white'
                    : isQuizPassed
                    ? 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
                    : 'border-zinc-800 bg-zinc-950/40 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold">4. Knowledge Quiz</span>
                  {isQuizPassed ? <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> : <span className="text-zinc-500">○</span>}
                </div>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  {isQuizPassed ? '100% Passed' : '100% required'}
                </span>
              </button>
            </div>

            {/* Clear Primary Workflow Tabs in Correct Logical Sequence */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setActiveTab('brief')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'brief'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>1. Brief & Boundaries</span>
              </button>

              <button
                onClick={() => setActiveTab('workbench')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'workbench'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Prompt Workbench</span>
              </button>

              <button
                onClick={() => setActiveTab('microgames')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'microgames'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3. Microgame ({activeStation.microgames.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('outputs')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'outputs'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>4. Output Diagnostics</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'quiz'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>5. Knowledge Quiz</span>
              </button>
            </div>
          </div>

          {/* Dynamic Active Tab Content */}
          <div>
            {/* 1. SCENARIO BRIEF & BOUNDARIES */}
            {activeTab === 'brief' && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-600/20 border border-orange-600/40 px-2.5 py-0.5 rounded-full">
                      Step 1: Scenario Orientation
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">Read before prompting</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2">Assignment Brief: {activeStation.brief.client}</h3>
                  <p className="text-xs sm:text-sm text-zinc-200 mt-1 leading-relaxed">{activeStation.brief.situation}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Confirmed Facts */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      <span>Approved Confirmed Facts</span>
                    </h4>
                    <ul className="text-xs text-zinc-300 space-y-2">
                      {activeStation.brief.confirmedFacts.map((fact, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-orange-400 font-bold">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Unknowns & Critical Risks */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      <span>Critical Boundaries (Do NOT Fabricate)</span>
                    </h4>
                    <ul className="text-xs text-zinc-300 space-y-2">
                      {activeStation.brief.unknownsOrRisks.map((risk, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-orange-400 font-bold">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                  <strong className="text-white font-bold block mb-1">UMC Division Alignment:</strong>
                  {activeStation.umcAlignment}
                </div>

                {/* Step Advancement CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
                  <span className="text-xs text-zinc-400">
                    Ready to engineer the prompt using the 7-part source-bounded rubric?
                  </span>
                  <button
                    onClick={handleAcknowledgeBrief}
                    className="w-full sm:w-auto px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <span>Acknowledge Brief & Open Prompt Workbench</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. PROMPT WORKBENCH */}
            {activeTab === 'workbench' && (
              <div className="space-y-6">
                
                {/* Scenario Snapshot Bar */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-orange-400 uppercase tracking-wider text-[11px]">
                      Client Assignment: {activeStation.brief.client}
                    </span>
                    <p className="text-zinc-200 font-medium mt-0.5">
                      Goal: {activeStation.brief.goal}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('brief')}
                    className="text-orange-400 hover:text-orange-300 font-semibold flex items-center space-x-1 flex-shrink-0"
                  >
                    <span>View Confirmed Facts & Boundaries</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Prompt Canvas Workbench */}
                <PromptWorkbench
                  station={activeStation}
                  learnerMode={state.learnerMode}
                  draft={activeDraft}
                  onChangeDraft={handleChangeDraft}
                  onSaveScore={handleSaveScore}
                  onAwardXp={handleAwardXp}
                  onContinueToNext={() => setActiveTab('microgames')}
                  onBackToBrief={() => setActiveTab('brief')}
                />
              </div>
            )}

            {/* 3. INTERACTIVE MICROGAMES */}
            {activeTab === 'microgames' && (
              <div className="space-y-6">
                {activeStation.microgames.map((game) => (
                  <MicrogameRunner
                    key={game.id}
                    game={game}
                    isCompleted={state.completedMicrogameIds.includes(game.id)}
                    onComplete={(xp) => handleCompleteMicrogame(game.id, xp)}
                    onContinueToNext={() => setActiveTab('outputs')}
                  />
                ))}
              </div>
            )}

            {/* 4. WEAK VS STRONG OUTPUTS */}
            {activeTab === 'outputs' && (
              <IllustrativeOutputViewer 
                outputs={activeStation.illustrativeOutputs} 
                onContinueToNext={() => setActiveTab('quiz')}
                onBackToPrev={() => setActiveTab('microgames')}
              />
            )}

            {/* 5. KNOWLEDGE QUIZ */}
            {activeTab === 'quiz' && (
              <QuizEngine
                quiz={activeStation.quiz}
                isCompleted={state.completedQuizIds.includes(activeStation.id)}
                stationTitle={activeStation.title}
                onCompleteQuiz={handleCompleteQuiz}
                onContinueToNext={() => {
                  handleMarkStationComplete();
                }}
              />
            )}
          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 text-xs py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">MarCom GPT</span>
            <span>•</span>
            <span>Privacy-First Client-Side Simulation</span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <button onClick={() => setShowSources(true)} className="hover:text-white transition-colors">
              Source Registry
            </button>
            <button onClick={() => setShowReadiness(true)} className="hover:text-white transition-colors">
              Readiness Scorecard
            </button>
            <button onClick={() => setShowExport(true)} className="hover:text-white transition-colors">
              Privacy & Export
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showProgressModal && (
        <ProgressDashboardModal
          state={state}
          onSelectStation={handleSelectStation}
          onClose={() => setShowProgressModal(false)}
        />
      )}

      {showBadges && (
        <BadgesModal
          unlockedBadgeIds={state.unlockedBadgeIds}
          xp={state.xp}
          onClose={() => setShowBadges(false)}
        />
      )}

      {showReadiness && (
        <ReadinessProfileModal
          state={state}
          onClose={() => setShowReadiness(false)}
        />
      )}

      {showSources && (
        <SourceLibraryModal onClose={() => setShowSources(false)} />
      )}

      {showSettings && (
        <AccessibilityPanel
          settings={state.settings}
          onUpdateSettings={(newSettings) => setState((prev) => ({
            ...prev,
            settings: { ...prev.settings, ...newSettings },
          }))}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showExport && (
        <ExportImportModal
          state={state}
          onImportSuccess={(newState) => setState(newState)}
          onResetSuccess={() => setState(resetAppState())}
          onClose={() => setShowExport(false)}
        />
      )}

    </div>
  );
}

import React from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  X, 
  Printer, 
  FileText, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';
import { AppState } from '../types';
import { getLevelInfo } from '../data/badgesData';
import { ALL_STATIONS } from '../data/modulesData';

interface ReadinessProfileModalProps {
  state: AppState;
  onClose: () => void;
}

export const ReadinessProfileModal: React.FC<ReadinessProfileModalProps> = ({
  state,
  onClose,
}) => {
  const levelInfo = getLevelInfo(state.xp);
  const completedCount = state.completedStationIds.length;

  const promptScoresArr = Object.values(state.promptScores) as number[];
  const avgPromptScore = promptScoresArr.length > 0 
    ? Math.round((promptScoresArr.reduce((a: number, b: number) => a + b, 0) / promptScoresArr.length / 21) * 100)
    : 45;

  const sourceDiscipline = Math.min(100, Math.round(
    ((state.completedMicrogameIds.includes('game-foundations-hallucination') ? 35 : 0) +
     (state.completedMicrogameIds.includes('game-ops-cardsort') ? 35 : 0) +
     (state.completedStationIds.includes('station-foundations') ? 30 : 0))
  ));

  const verificationRigor = Math.min(100, Math.round(
    ((state.completedStationIds.includes('station-pr') ? 50 : 0) +
     (state.completedStationIds.includes('station-capstone') ? 50 : 0) || (avgPromptScore * 0.8))
  ));

  const audienceAdaptation = Math.min(100, Math.round(
    ((state.completedStationIds.includes('station-social') ? 50 : 0) +
     (state.completedStationIds.includes('station-strategy') ? 50 : 0) || (avgPromptScore * 0.85))
  ));

  const accessibilityStandards = Math.min(100, Math.round(
    ((state.completedMicrogameIds.includes('game-social-alttext') ? 50 : 0) +
     (state.completedStationIds.includes('station-web') ? 50 : 0) || (completedCount > 2 ? 65 : 30))
  ));

  const analyticsJudgment = Math.min(100, Math.round(
    ((state.completedMicrogameIds.includes('game-growth-museum') ? 50 : 0) +
     (state.completedStationIds.includes('station-growth') ? 50 : 0) || (completedCount > 1 ? 55 : 25))
  ));

  const crisisDiscipline = Math.min(100, Math.round(
    (state.completedStationIds.includes('station-pr') ? 100 : (state.completedMicrogameIds.includes('game-pr-triage') ? 60 : 30))
  ));

  const overallReadiness = Math.round(
    (avgPromptScore + sourceDiscipline + verificationRigor + audienceAdaptation + accessibilityStandards + analyticsJudgment + crisisDiscipline) / 7
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors no-print"
          aria-label="Close Readiness Profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-600/40">
                AI Readiness Profile
              </span>
              <span className="text-xs text-zinc-400">Institutional Competency Report</span>
            </div>
            <h3 className="text-2xl font-black text-white mt-1">
              MarCom AI Competency Scorecard
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Verified formative assessment of strategic prompting, source discipline, and critical AI verification.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-bold transition-colors no-print self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report Card</span>
          </button>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Overall Readiness Index</span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-4xl font-black text-white">{overallReadiness}%</span>
              <span className="text-sm font-semibold text-orange-400">
                {overallReadiness >= 85 ? 'Publication Ready' : overallReadiness >= 70 ? 'Advanced Practitioner' : 'Developing Competence'}
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-2 max-w-md leading-relaxed">
              Learner has completed <strong>{completedCount} of {ALL_STATIONS.length}</strong> simulation stations and earned <strong>{state.xp} XP</strong> as a <strong>{levelInfo.title}</strong>.
            </p>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-2 min-w-[200px]">
            <div className="flex justify-between">
              <span>Learner Mode:</span>
              <strong className="text-orange-400 capitalize">{state.learnerMode}</strong>
            </div>
            <div className="flex justify-between">
              <span>Badges Earned:</span>
              <strong className="text-orange-400">{state.unlockedBadgeIds.length}</strong>
            </div>
            <div className="flex justify-between">
              <span>Evaluated Date:</span>
              <span className="text-zinc-400">{new Date().toISOString().split('T')[0]}</span>
            </div>
          </div>
        </div>

        {/* Competency Bars */}
        <div className="mt-8 space-y-4">
          <h4 className="text-base font-bold text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-orange-400" />
            <span>7 Core MarCom AI Competency Dimensions</span>
          </h4>

          <div className="space-y-3.5">
            
            {/* 1. Prompt Construction */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-zinc-200">1. Source-Bounded Prompt Construction</span>
                <span className="text-orange-400 font-bold">{avgPromptScore}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${avgPromptScore}%` }} />
              </div>
            </div>

            {/* 2. Source Discipline */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-zinc-200">2. Source Discipline & Hallucination Detection</span>
                <span className="text-orange-400 font-bold">{sourceDiscipline}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${sourceDiscipline}%` }} />
              </div>
            </div>

            {/* 3. Verification Rigor */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-zinc-200">3. Human-in-the-Loop Verification Rigor</span>
                <span className="text-orange-400 font-bold">{verificationRigor}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${verificationRigor}%` }} />
              </div>
            </div>

            {/* 4. Audience Adaptation */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-zinc-200">4. Multi-Channel Audience & Voice Adaptation</span>
                <span className="text-orange-400 font-bold">{audienceAdaptation}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${audienceAdaptation}%` }} />
              </div>
            </div>

            {/* 5. Accessibility Standards */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-zinc-200">5. WCAG 2.2 Accessibility & Universal Design</span>
                <span className="text-orange-400 font-bold">{accessibilityStandards}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${accessibilityStandards}%` }} />
              </div>
            </div>

            {/* 6. Analytics Judgment */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-zinc-200">6. Analytics Judgment (Correlation ≠ Causation)</span>
                <span className="text-orange-400 font-bold">{analyticsJudgment}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${analyticsJudgment}%` }} />
              </div>
            </div>

            {/* 7. Crisis Discipline */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-zinc-200">7. Crisis Discipline & Zero-Speculation Holding</span>
                <span className="text-orange-400 font-bold">{crisisDiscipline}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${crisisDiscipline}%` }} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Layers, 
  Compass, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import { AppState } from '../types';
import { ALL_STATIONS } from '../data/modulesData';
import { BADGES, getLevelInfo } from '../data/badgesData';

interface ProgressDashboardModalProps {
  state: AppState;
  onSelectStation: (stationId: string) => void;
  onClose: () => void;
}

export const ProgressDashboardModal: React.FC<ProgressDashboardModalProps> = ({
  state,
  onSelectStation,
  onClose,
}) => {
  const levelInfo = getLevelInfo(state.xp);
  const completedStationsCount = state.completedStationIds.length;
  const totalStations = ALL_STATIONS.length;
  const overallStationProgress = Math.round((completedStationsCount / totalStations) * 100);

  // Microgames count
  const allMicrogames = ALL_STATIONS.flatMap((s) => s.microgames);
  const totalMicrogames = allMicrogames.length;
  const completedMicrogamesCount = state.completedMicrogameIds.length;
  const microgameProgress = totalMicrogames > 0 ? Math.round((completedMicrogamesCount / totalMicrogames) * 100) : 0;

  // Quizzes count
  const totalQuizzes = ALL_STATIONS.length;
  const completedQuizzesCount = state.completedQuizIds.length;
  const quizProgress = Math.round((completedQuizzesCount / totalQuizzes) * 100);

  // Prompt scores
  const promptScoresCount = Object.keys(state.promptScores).filter((k) => (state.promptScores[k] || 0) >= 10).length;
  const promptProgress = Math.round((promptScoresCount / totalStations) * 100);

  // Total possible rubric points
  const totalRubricPointsEarned = Object.values(state.promptScores).reduce((acc: number, val: number) => acc + val, 0);

  // Next recommended action
  const nextIncompleteStation = ALL_STATIONS.find((s) => !state.completedStationIds.includes(s.id)) || ALL_STATIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close Progress Dashboard"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-6 border-b border-zinc-800 space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-600/40">
              Personal Learning Standing
            </span>
            <span className="text-xs text-zinc-400">UMC AI Training Progress</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Your MarCom AI Mastery Progress
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
            Real-time standing across all 11 stations, prompt challenges, interactive microgames, and knowledge retrieval quizzes.
          </p>
        </div>

        {/* Overall Standing Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          
          {/* Level & XP */}
          <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Current Standing</span>
              <h3 className="text-xl font-black text-white mt-1 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <span>{levelInfo.title}</span>
              </h3>
              <p className="text-xs text-orange-400 font-semibold mt-0.5">Level {levelInfo.level} • {state.xp} Total XP</p>
            </div>
            <div className="space-y-1 pt-2 border-t border-zinc-800/80">
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>Next Rank: Level {levelInfo.level + 1}</span>
                <span>{state.xp} / {levelInfo.maxXp} XP</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-600 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.round((state.xp / levelInfo.maxXp) * 100))}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Curriculum Completion */}
          <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Stations Mastered</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-white">{completedStationsCount}</span>
                <span className="text-zinc-400 font-bold text-sm">/ {totalStations} Stations</span>
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                {overallStationProgress}% of complete MarCom curriculum completed.
              </p>
            </div>
            <div className="space-y-1 pt-2 border-t border-zinc-800/80">
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-600 rounded-full transition-all duration-500" 
                  style={{ width: `${overallStationProgress}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Badges & Next Action */}
          <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Badges Unlocked</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-white">{state.unlockedBadgeIds.length}</span>
                <span className="text-zinc-400 font-bold text-sm">/ {BADGES.length} Badges</span>
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                Total Rubric Score: <strong className="text-orange-400">{totalRubricPointsEarned} pts</strong>
              </p>
            </div>
            {completedStationsCount < totalStations && (
              <button
                onClick={() => {
                  onSelectStation(nextIncompleteStation.id);
                  onClose();
                }}
                className="w-full py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md"
              >
                <span>Jump to Station {nextIncompleteStation.order}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* 4 Core Pillars Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          
          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
            <div className="flex items-center space-x-2 text-zinc-300 text-xs font-bold mb-1">
              <Compass className="w-3.5 h-3.5 text-orange-400" />
              <span>Briefs Reviewed</span>
            </div>
            <div className="text-lg font-black text-white">
              {state.reviewedBriefStationIds?.length || 0} <span className="text-xs text-zinc-500 font-normal">/ {totalStations}</span>
            </div>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
            <div className="flex items-center space-x-2 text-zinc-300 text-xs font-bold mb-1">
              <FileText className="w-3.5 h-3.5 text-orange-400" />
              <span>Prompts Evaluated</span>
            </div>
            <div className="text-lg font-black text-white">
              {promptScoresCount} <span className="text-xs text-zinc-500 font-normal">/ {totalStations}</span>
            </div>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
            <div className="flex items-center space-x-2 text-zinc-300 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Microgames Solved</span>
            </div>
            <div className="text-lg font-black text-white">
              {completedMicrogamesCount} <span className="text-xs text-zinc-500 font-normal">/ {totalMicrogames}</span>
            </div>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
            <div className="flex items-center space-x-2 text-zinc-300 text-xs font-bold mb-1">
              <BookOpen className="w-3.5 h-3.5 text-orange-400" />
              <span>Quizzes Passed 100%</span>
            </div>
            <div className="text-lg font-black text-white">
              {completedQuizzesCount} <span className="text-xs text-zinc-500 font-normal">/ {totalQuizzes}</span>
            </div>
          </div>

        </div>

        {/* Station by Station Detailed Matrix */}
        <div className="mt-8 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center space-x-2">
            <Target className="w-4 h-4 text-orange-400" />
            <span>Station-by-Station Checklist & Completion Matrix</span>
          </h3>

          <div className="space-y-2">
            {ALL_STATIONS.map((station) => {
              const isStationDone = state.completedStationIds.includes(station.id);
              const isBriefDone = Boolean(state.reviewedBriefStationIds?.includes(station.id) || isStationDone);
              const promptPts = state.promptScores[station.id] || 0;
              const isPromptDone = promptPts >= 10 || isStationDone;
              const areGamesDone = station.microgames.every((g) => state.completedMicrogameIds.includes(g.id)) || isStationDone;
              const isQuizDone = state.completedQuizIds.includes(station.id) || isStationDone;

              return (
                <div 
                  key={station.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isStationDone
                      ? 'bg-zinc-950 border-orange-500/50'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                      isStationDone ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {station.order}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs font-bold text-white truncate">{station.title}</h4>
                        {isStationDone && (
                          <span className="px-2 py-0.2 rounded bg-orange-600/20 text-orange-400 text-[10px] font-bold border border-orange-600/40">
                            Mastered
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 truncate block">{station.umcRole}</span>
                    </div>
                  </div>

                  {/* Checklist Chips */}
                  <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap flex-shrink-0">
                    {/* Brief */}
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold border ${
                      isBriefDone ? 'bg-zinc-900 border-orange-500/60 text-orange-400' : 'bg-zinc-900/40 border-zinc-800 text-zinc-500'
                    }`}>
                      {isBriefDone ? '✓ Brief' : '○ Brief'}
                    </span>

                    {/* Prompt */}
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold border ${
                      isPromptDone ? 'bg-zinc-900 border-orange-500/60 text-orange-400' : 'bg-zinc-900/40 border-zinc-800 text-zinc-500'
                    }`}>
                      {isPromptDone ? `✓ Prompt (${promptPts}/21)` : '○ Prompt'}
                    </span>

                    {/* Microgame */}
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold border ${
                      areGamesDone ? 'bg-zinc-900 border-orange-500/60 text-orange-400' : 'bg-zinc-900/40 border-zinc-800 text-zinc-500'
                    }`}>
                      {areGamesDone ? '✓ Game' : '○ Game'}
                    </span>

                    {/* Quiz */}
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold border ${
                      isQuizDone ? 'bg-zinc-900 border-orange-500/60 text-orange-400' : 'bg-zinc-900/40 border-zinc-800 text-zinc-500'
                    }`}>
                      {isQuizDone ? '✓ Quiz 100%' : '○ Quiz'}
                    </span>

                    {/* Jump button */}
                    <button
                      onClick={() => {
                        onSelectStation(station.id);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[10px] font-bold transition-colors ml-1"
                    >
                      Open
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, ChevronRight, Sparkles, BookOpen, FileText, Check } from 'lucide-react';
import { StationModule, AppState } from '../types';
import { ALL_STATIONS } from '../data/modulesData';

interface StationSidebarProps {
  state: AppState;
  activeStationId: string;
  onSelectStation: (stationId: string) => void;
  onOpenProgress?: () => void;
  onCloseMobile?: () => void;
}

const TRACKS = [
  {
    title: 'Core Foundations',
    range: [1, 3],
  },
  {
    title: 'Digital & Growth',
    range: [4, 6],
  },
  {
    title: 'Public Relations & Creative',
    range: [7, 9],
  },
  {
    title: 'Events & Capstone',
    range: [10, 11],
  },
];

export const StationSidebar: React.FC<StationSidebarProps> = ({
  state,
  activeStationId,
  onSelectStation,
  onOpenProgress,
  onCloseMobile,
}) => {
  const completedCount = state.completedStationIds.length;
  const progressPercent = Math.round((completedCount / ALL_STATIONS.length) * 100);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      
      {/* Progress Header Button */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-950/90 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">Curriculum Track</span>
          <button
            onClick={onOpenProgress}
            className="font-bold text-orange-400 hover:text-orange-300 transition-colors text-[11px] underline underline-offset-2"
          >
            View Standing
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-300">
          <span>{completedCount} of {ALL_STATIONS.length} Mastered</span>
          <span className="font-bold text-orange-400">{progressPercent}%</span>
        </div>

        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stations List */}
      <div className="flex-1 p-3 space-y-4">
        {TRACKS.map((track) => {
          const trackStations = ALL_STATIONS.filter(
            (s) => s.order >= track.range[0] && s.order <= track.range[1]
          );

          return (
            <div key={track.title} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {track.title}
              </div>

              <div className="space-y-1">
                {trackStations.map((station) => {
                  const isActive = station.id === activeStationId;
                  const isCompleted = state.completedStationIds.includes(station.id);
                  const isBriefDone = Boolean(state.reviewedBriefStationIds?.includes(station.id) || isCompleted);
                  const promptScore = state.promptScores[station.id];
                  const isPromptDone = (promptScore && promptScore >= 10) || isCompleted;
                  const areGamesDone = station.microgames.every((g) => state.completedMicrogameIds.includes(g.id)) || isCompleted;
                  const isQuizDone = state.completedQuizIds.includes(station.id) || isCompleted;

                  return (
                    <button
                      key={station.id}
                      onClick={() => {
                        onSelectStation(station.id);
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex flex-col space-y-1.5 group ${
                        isActive
                          ? 'bg-zinc-800 text-white font-bold border-l-4 border-orange-500 shadow-sm'
                          : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2 min-w-0 pr-1">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                            isActive
                              ? 'bg-orange-600 text-white'
                              : isCompleted
                              ? 'bg-zinc-950 text-orange-400 border border-orange-500/40'
                              : 'bg-zinc-800 text-zinc-400 group-hover:text-white'
                          }`}>
                            {station.order < 10 ? `0${station.order}` : station.order}
                          </span>

                          <div className="truncate">
                            <p className="truncate font-semibold">{station.title}</p>
                            <p className="text-[10px] text-zinc-400 font-normal truncate">{station.umcRole}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 flex-shrink-0">
                          {isCompleted ? (
                            <span className="flex items-center space-x-0.5 text-orange-400 text-[10px] font-bold bg-zinc-950 px-1.5 py-0.5 rounded border border-orange-500/40">
                              <CheckCircle2 className="w-3 h-3 text-orange-500" />
                              <span className="hidden xl:inline">Mastered</span>
                            </span>
                          ) : (
                            <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                          )}
                        </div>
                      </div>

                      {/* Micro-Milestone Status Chips */}
                      <div className="flex items-center space-x-1 text-[9px] pt-1 border-t border-zinc-800/60">
                        <span 
                          className={`px-1.5 py-0.2 rounded font-mono ${
                            isBriefDone ? 'text-orange-400 bg-zinc-950' : 'text-zinc-500'
                          }`}
                          title={isBriefDone ? 'Brief Reviewed' : 'Brief Pending'}
                        >
                          {isBriefDone ? '✓' : '○'} Brief
                        </span>
                        <span 
                          className={`px-1.5 py-0.2 rounded font-mono ${
                            isPromptDone ? 'text-orange-400 bg-zinc-950' : 'text-zinc-500'
                          }`}
                          title={promptScore ? `Prompt Score: ${promptScore}/21` : 'Prompt Pending'}
                        >
                          {isPromptDone ? '✓' : '○'} {promptScore ? `${promptScore}p` : 'Prompt'}
                        </span>
                        <span 
                          className={`px-1.5 py-0.2 rounded font-mono ${
                            areGamesDone ? 'text-orange-400 bg-zinc-950' : 'text-zinc-500'
                          }`}
                          title={areGamesDone ? 'Microgame Solved' : 'Microgame Pending'}
                        >
                          {areGamesDone ? '✓' : '○'} Game
                        </span>
                        <span 
                          className={`px-1.5 py-0.2 rounded font-mono ${
                            isQuizDone ? 'text-orange-400 bg-zinc-950' : 'text-zinc-500'
                          }`}
                          title={isQuizDone ? 'Quiz 100% Passed' : 'Quiz Pending'}
                        >
                          {isQuizDone ? '✓' : '○'} Quiz
                        </span>
                      </div>

                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </aside>
  );
};

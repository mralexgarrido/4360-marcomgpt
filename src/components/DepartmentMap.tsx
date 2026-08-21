import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Radio,
  FileCheck,
  TrendingUp,
  Share2,
  Globe,
  Flame,
  Mail,
  Film,
  Calendar,
  Crown
} from 'lucide-react';
import { AppState, StationModule } from '../types';
import { ALL_STATIONS } from '../data/modulesData';

interface DepartmentMapProps {
  state: AppState;
  onSelectStation: (stationId: string) => void;
  onClose?: () => void;
}

const STATION_ICONS: Record<string, React.ElementType> = {
  'station-foundations': Radio,
  'station-operations': FileCheck,
  'station-strategy': TrendingUp,
  'station-growth': Globe,
  'station-social': Share2,
  'station-web': Layers,
  'station-pr': Flame,
  'station-internal': Mail,
  'station-creative': Film,
  'station-events': Calendar,
  'station-capstone': Crown,
};

export const DepartmentMap: React.FC<DepartmentMapProps> = ({
  state,
  onSelectStation,
  onClose,
}) => {
  const completedCount = state.completedStationIds.length;
  const totalStations = ALL_STATIONS.length;

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              UMC Organization Map
            </span>
            <span className="text-xs text-slate-400">11 Simulation Stations</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
            MarCom AI Flight Simulator Map
          </h2>
          <p className="text-sm text-slate-300 mt-0.5">
            Select a station to step into authentic marketing communications workflows. Practice source-bounded prompting and critical AI verification.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 min-w-[240px]">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-300">Total Station Mastery</span>
            <span className="text-amber-400 font-bold">{completedCount} of {totalStations} Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${(completedCount / totalStations) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Stations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {ALL_STATIONS.map((station) => {
          const isCompleted = state.completedStationIds.includes(station.id);
          const isActive = state.activeStationId === station.id;
          const score = state.promptScores[station.id];
          const Icon = STATION_ICONS[station.id] || Radio;

          return (
            <button
              key={station.id}
              onClick={() => {
                onSelectStation(station.id);
                if (onClose) onClose();
              }}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 relative group flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/90 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50'
                  : isCompleted
                  ? 'bg-slate-800/50 border-emerald-500/50 hover:border-emerald-400 hover:bg-slate-800'
                  : 'bg-slate-800/30 border-slate-700/70 hover:border-slate-500 hover:bg-slate-800/70'
              }`}
            >
              {/* Top Row: Icon, Station #, Badge/Status */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-xl flex items-center justify-center ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Station {station.order}
                      </span>
                      <p className="text-xs text-amber-300/90 font-medium line-clamp-1">{station.umcRole}</p>
                    </div>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mastered</span>
                    </span>
                  ) : isActive ? (
                    <span className="flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                      <Radio className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-xs text-slate-400">
                      <Circle className="w-3.5 h-3.5" />
                      <span>Available</span>
                    </span>
                  )}
                </div>

                {/* Station Title & Subtitle */}
                <h3 className="text-base font-bold text-white mt-3 group-hover:text-amber-300 transition-colors">
                  {station.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {station.overview}
                </p>
              </div>

              {/* Bottom Row: Score, Time & XP */}
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{station.estimatedMinutes}m</span>
                  </span>
                  <span className="flex items-center space-x-1 text-amber-400 font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+{station.xpReward} XP</span>
                  </span>
                </div>

                {score !== undefined && (
                  <span className="font-bold text-xs px-2 py-0.5 rounded-md bg-slate-700 text-slate-200 border border-slate-600">
                    Score: {score}/21
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

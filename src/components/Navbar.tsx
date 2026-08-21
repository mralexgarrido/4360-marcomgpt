import React from 'react';
import { 
  Compass, 
  Award, 
  BarChart3, 
  BookOpen, 
  Settings2, 
  GraduationCap, 
  Briefcase, 
  Sparkles,
  ShieldCheck,
  Menu,
  Target
} from 'lucide-react';
import { AppState, LearnerMode } from '../types';
import { getLevelInfo } from '../data/badgesData';
import { ALL_STATIONS } from '../data/modulesData';

interface NavbarProps {
  state: AppState;
  onSetLearnerMode: (mode: LearnerMode) => void;
  onToggleSidebar?: () => void;
  onOpenMap: () => void;
  onOpenProgress: () => void;
  onOpenBadges: () => void;
  onOpenReadiness: () => void;
  onOpenSources: () => void;
  onOpenSettings: () => void;
  onOpenExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  state,
  onSetLearnerMode,
  onToggleSidebar,
  onOpenMap,
  onOpenProgress,
  onOpenBadges,
  onOpenReadiness,
  onOpenSources,
  onOpenSettings,
  onOpenExport,
}) => {
  const levelInfo = getLevelInfo(state.xp);
  const completedCount = state.completedStationIds.length;
  const progressPercent = Math.round((completedCount / ALL_STATIONS.length) * 100);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950 text-white border-b border-zinc-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand */}
          <div className="flex items-center space-x-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Toggle Stations Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center space-x-3 cursor-pointer" onClick={onOpenProgress}>
              <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black text-base shadow-md">
                MC
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg text-white tracking-tight">MarCom GPT</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-600/20 text-orange-400 border border-orange-600/40">
                    AI Lab
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-normal hidden sm:block">No-Login AI Simulation for Marketing & Communications</p>
              </div>
            </div>
          </div>

          {/* Mode Toggle, Progress, and Badges */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Student vs Pro Mode */}
            <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
              <button
                onClick={() => onSetLearnerMode('student')}
                className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  state.learnerMode === 'student'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Student Mode: Rich guidance & hints"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student</span>
              </button>
              <button
                onClick={() => onSetLearnerMode('professional')}
                className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  state.learnerMode === 'professional'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Pro Mode: Realistic incomplete briefs"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pro</span>
              </button>
            </div>

            {/* Progress / Standing Button */}
            <button
              onClick={onOpenProgress}
              className="flex items-center space-x-1.5 bg-zinc-900 hover:bg-zinc-850 px-2.5 sm:px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-bold text-zinc-200 transition-colors shadow-sm"
              title="View Your Complete Progress & Standing"
            >
              <Target className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden md:inline">Standing:</span>
              <span className="text-orange-400">{completedCount}/{ALL_STATIONS.length}</span>
            </button>

            {/* Level & XP */}
            <button
              onClick={onOpenBadges}
              className="hidden lg:flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>
                <strong className="text-orange-400 font-bold">{levelInfo.title}</strong> • {state.xp} XP
              </span>
            </button>

            {/* Quick Actions */}
            <div className="flex items-center space-x-1 pl-1 sm:pl-2 border-l border-zinc-800">
              <button
                onClick={onOpenReadiness}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-lg transition-colors"
                title="AI MarCom Readiness Profile"
                aria-label="Readiness Profile"
              >
                <BarChart3 className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBadges}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-lg transition-colors relative"
                title="Mastery Badges"
                aria-label="Mastery Badges"
              >
                <Award className="w-4 h-4" />
                {state.unlockedBadgeIds.length > 0 && (
                  <span className="absolute top-1 right-1 bg-orange-600 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {state.unlockedBadgeIds.length}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenSources}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-lg transition-colors"
                title="Source Citations & Guidelines"
                aria-label="Source Citations"
              >
                <BookOpen className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSettings}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-lg transition-colors"
                title="Accessibility Preferences"
                aria-label="Accessibility Settings"
              >
                <Settings2 className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenExport}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-lg transition-colors"
                title="Privacy & Data Backup"
                aria-label="Privacy and Export"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

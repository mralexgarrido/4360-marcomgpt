import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  X,
  LayoutTemplate,
  ShieldAlert,
  Eye,
  Flame,
  TrendingUp,
  Share2,
  Crown
} from 'lucide-react';
import { BADGES, LEVELS, getLevelInfo } from '../data/badgesData';

interface BadgesModalProps {
  unlockedBadgeIds: string[];
  xp: number;
  onClose: () => void;
}

const BADGE_ICONS: Record<string, React.ElementType> = {
  'LayoutTemplate': LayoutTemplate,
  'ShieldAlert': ShieldAlert,
  'Award': Award,
  'Eye': Eye,
  'Flame': Flame,
  'TrendingUp': TrendingUp,
  'Share2': Share2,
  'Crown': Crown,
};

export const BadgesModal: React.FC<BadgesModalProps> = ({
  unlockedBadgeIds,
  xp,
  onClose,
}) => {
  const currentLevel = getLevelInfo(xp);
  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close Badges"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Level Progression Banner */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-orange-600/40">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
              L{currentLevel.level}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Current Mastery Level</span>
              <h3 className="text-2xl font-black text-white">{currentLevel.title}</h3>
              <p className="text-xs text-zinc-400">{currentLevel.tagline}</p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-zinc-300">{xp} Total XP</span>
              <span className="text-orange-400">
                {nextLevel ? `${nextLevel.minXp - xp} XP to ${nextLevel.title}` : 'Maximum Level Achieved!'}
              </span>
            </div>
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <div 
                className="h-full bg-orange-600 rounded-full transition-all duration-500"
                style={{ 
                  width: nextLevel 
                    ? `${Math.min(100, Math.max(5, ((xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100))}%` 
                    : '100%' 
                }}
              />
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-orange-400" />
              <span>Mastery Badges Shelf ({unlockedBadgeIds.length}/{BADGES.length})</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BADGES.map((badge) => {
              const isUnlocked = unlockedBadgeIds.includes(badge.id);
              const Icon = BADGE_ICONS[badge.iconName] || Award;

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                    isUnlocked
                      ? 'bg-zinc-950 border-orange-500/50 shadow-md'
                      : 'bg-zinc-950/40 border-zinc-800 opacity-60'
                  }`}
                >
                  <div className={`p-3 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isUnlocked
                      ? 'bg-orange-600 text-white shadow-md font-bold'
                      : 'bg-zinc-800 text-zinc-600'
                  }`}>
                    {isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h5 className="text-sm font-bold text-white">{badge.name}</h5>
                      {isUnlocked && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-orange-600/20 text-orange-400 border border-orange-600/40">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-orange-400 font-medium mt-0.5">{badge.title}</p>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{badge.description}</p>
                    <div className="mt-2 text-[11px] text-zinc-400 font-mono bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
                      Criteria: {badge.criteria}
                    </div>
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

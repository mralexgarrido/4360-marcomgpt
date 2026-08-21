import React from 'react';
import { Settings2, Eye, Type, Activity, X } from 'lucide-react';
import { AppState } from '../types';

interface AccessibilityPanelProps {
  settings: AppState['settings'];
  onUpdateSettings: (newSettings: Partial<AppState['settings']>) => void;
  onClose: () => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close Settings"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-600/40">
              Preferences
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Accessibility & Display Settings
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Customize contrast, text sizing, and motion preferences.
          </p>
        </div>

        {/* Toggles */}
        <div className="mt-6 space-y-4">
          
          {/* High Contrast Mode */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-zinc-900 rounded-xl text-orange-400">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm text-white font-bold block">High Contrast Mode</strong>
                <span className="text-xs text-zinc-400">Enhance border contrast and brightness</span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                settings.highContrast ? 'bg-orange-600' : 'bg-zinc-700'
              }`}
              aria-label="Toggle High Contrast"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Large Text Mode */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-zinc-900 rounded-xl text-orange-400">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm text-white font-bold block">Enlarged Text Scaling</strong>
                <span className="text-xs text-zinc-400">Scale base font sizes up for easier reading</span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ largeText: !settings.largeText })}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                settings.largeText ? 'bg-orange-600' : 'bg-zinc-700'
              }`}
              aria-label="Toggle Large Text"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.largeText ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-zinc-900 rounded-xl text-orange-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm text-white font-bold block">Reduced Motion</strong>
                <span className="text-xs text-zinc-400">Disable transitions and decorative animations</span>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                settings.reducedMotion ? 'bg-orange-600' : 'bg-zinc-700'
              }`}
              aria-label="Toggle Reduced Motion"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

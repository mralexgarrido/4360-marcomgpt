import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Download, 
  Upload, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  Lock
} from 'lucide-react';
import { AppState } from '../types';
import { exportAppStateJson, importAppStateJson, resetAppState } from '../utils/storage';

interface ExportImportModalProps {
  state: AppState;
  onImportSuccess: (newState: AppState) => void;
  onResetSuccess: () => void;
  onClose: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  state,
  onImportSuccess,
  onResetSuccess,
  onClose,
}) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isResetConfirming, setIsResetConfirming] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonStr = exportAppStateJson(state);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marcom-gpt-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importAppStateJson(content);
      if (res.success && res.newState) {
        setImportStatus('Progress restored successfully!');
        onImportSuccess(res.newState);
      } else {
        setImportStatus(`Error: ${res.error || 'Failed to parse JSON file.'}`);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetAppState();
    onResetSuccess();
    setIsResetConfirming(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close Export Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-600/40">
              Privacy by Design
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Data Privacy & Progress Portability
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Your progress, prompt drafts, and test scores stay 100% local in this browser.
          </p>
        </div>

        {/* Privacy Callout */}
        <div className="mt-5 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-start space-x-3 text-xs text-zinc-300">
          <Lock className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white font-bold block">Zero Remote Tracking</strong>
            <p className="leading-relaxed text-zinc-400">
              MarCom GPT does NOT transmit your prompt text, quiz answers, or student progress to external databases or commercial AI providers.
            </p>
          </div>
        </div>

        {/* Action Options */}
        <div className="mt-6 space-y-4">
          
          {/* Export JSON */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div>
              <strong className="text-sm text-white font-bold block">Export Progress (.json)</strong>
              <span className="text-xs text-zinc-400">Save a backup file of your badges and scores</span>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center space-x-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div>
              <strong className="text-sm text-white font-bold block">Restore / Import Progress</strong>
              <span className="text-xs text-zinc-400">Load a previously exported .json file</span>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 font-bold text-xs rounded-xl transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
            </div>
          </div>

          {importStatus && (
            <p className="text-xs text-orange-400 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
              {importStatus}
            </p>
          )}

          {/* Reset All Local Progress */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div>
              <strong className="text-sm text-white font-bold block">Reset All Local Data</strong>
              <span className="text-xs text-zinc-400">Erase all scores, badges, and cached drafts</span>
            </div>
            {!isResetConfirming ? (
              <button
                onClick={() => setIsResetConfirming(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold text-xs rounded-xl transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsResetConfirming(false)}
                  className="px-2.5 py-1.5 bg-zinc-800 text-zinc-400 text-xs rounded-xl hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

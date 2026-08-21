import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, X, CheckCircle2, Clock } from 'lucide-react';
import { SOURCE_LIBRARY } from '../data/sourceLibrary';

interface SourceLibraryModalProps {
  onClose: () => void;
}

export const SourceLibraryModal: React.FC<SourceLibraryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close Source Library"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-6 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-600/40">
              Verified Source Registry
            </span>
            <span className="text-xs text-zinc-400">Audited Guidelines & Research</span>
          </div>
          <h3 className="text-2xl font-black text-white mt-1">
            MarCom AI Source Library
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5 max-w-2xl">
            Official guidelines, research papers, and institutional frameworks referenced across the MarCom GPT curriculum.
          </p>
        </div>

        {/* Sources List */}
        <div className="mt-6 space-y-4">
          {SOURCE_LIBRARY.map((source) => (
            <div
              key={source.id}
              className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-orange-400">{source.author} ({source.year})</span>
                  <h4 className="text-base font-bold text-white mt-0.5">{source.title}</h4>
                  <p className="text-xs text-zinc-400 font-medium">{source.publisher}</p>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-800 transition-colors self-start sm:self-auto"
                >
                  <span>Official Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {source.summary}
              </p>

              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-zinc-200">
                  <strong className="text-orange-400 font-bold">Key Takeaway:</strong> {source.keyTakeaway}
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-zinc-500 font-mono flex-shrink-0">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span>Audited: {source.lastAudited}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

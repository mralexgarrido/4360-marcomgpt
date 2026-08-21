import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Check,
  ArrowRight
} from 'lucide-react';
import { IllustrativeOutput } from '../types';

interface IllustrativeOutputViewerProps {
  outputs: IllustrativeOutput[];
  onContinueToNext?: () => void;
  onBackToPrev?: () => void;
}

export const IllustrativeOutputViewer: React.FC<IllustrativeOutputViewerProps> = ({ 
  outputs,
  onContinueToNext,
  onBackToPrev,
}) => {
  if (!outputs || outputs.length === 0) return null;

  return (
    <div className="space-y-6">
      {outputs.map((item) => (
        <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
          
          {/* Header & Disclaimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-600/40">
                  4. AI Output Diagnostic
                </span>
                <span className="text-xs text-zinc-400">{item.title}</span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 font-medium">
                Scenario Input: <span className="text-zinc-400">{item.scenarioInput}</span>
              </p>
            </div>

            <div className="text-[11px] text-orange-300 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-lg">
              ⚠️ Illustrative training comparisons. Always verify against source facts.
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* WEAK OUTPUT CARD */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="flex items-center space-x-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Fragile Output (Unconstrained)</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Missing Guardrails
                  </span>
                </div>

                <div className="mt-3 p-3.5 bg-zinc-900/80 rounded-lg border border-zinc-800 text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {item.weakOutput.text}
                </div>

                <div className="mt-3 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                    Diagnostic Flaws:
                  </span>
                  <ul className="text-xs text-zinc-300 space-y-1">
                    {item.weakOutput.flaws.map((flaw, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-orange-400 font-bold">•</span>
                        <span>{flaw}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800 italic">
                {item.weakOutput.explanation}
              </p>
            </div>

            {/* STRONG OUTPUT CARD */}
            <div className="bg-zinc-950 border border-orange-500/60 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-orange-500/30">
                  <span className="flex items-center space-x-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-orange-400" />
                    <span>Source-Grounded Output</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-orange-600 text-white">
                    7-Part Canvas Prompt
                  </span>
                </div>

                <div className="mt-3 p-3.5 bg-zinc-900/80 rounded-lg border border-zinc-800 text-xs font-mono text-white whitespace-pre-wrap leading-relaxed">
                  {item.strongOutput.text}
                </div>

                <div className="mt-3 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                    Grounded Strengths:
                  </span>
                  <ul className="text-xs text-zinc-200 space-y-1">
                    {item.strongOutput.strengths.map((str, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-orange-400 font-bold">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                  Verification Checklist:
                </span>
                <ul className="text-[11px] text-zinc-400 space-y-0.5">
                  {item.strongOutput.verificationChecklist.map((v, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-orange-400 font-bold">□</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      ))}

      {/* Navigation Footer */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        {onBackToPrev ? (
          <button
            onClick={onBackToPrev}
            className="text-xs text-zinc-400 hover:text-white font-medium flex items-center space-x-1"
          >
            <span>← Back to 3. Microgame</span>
          </button>
        ) : <div />}

        {onContinueToNext && (
          <button
            onClick={onContinueToNext}
            className="flex items-center space-x-1.5 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Continue to 5. Knowledge Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

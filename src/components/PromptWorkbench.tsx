import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  ShieldCheck, 
  Sliders, 
  Layers, 
  Cpu, 
  AlertCircle,
  FileText,
  Edit3,
  Lightbulb,
  GraduationCap,
  Trash2,
  Eye,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { StationModule, PromptCanvasFields, LearnerMode, PromptEvaluation } from '../types';
import { evaluatePrompt, compileFullPrompt } from '../utils/promptScorer';

interface PromptWorkbenchProps {
  station: StationModule;
  learnerMode: LearnerMode;
  draft: PromptCanvasFields;
  onChangeDraft: (fields: PromptCanvasFields) => void;
  onSaveScore: (score: number) => void;
  onAwardXp: (amount: number) => void;
  onContinueToNext?: () => void;
  onBackToBrief?: () => void;
}

export const PromptWorkbench: React.FC<PromptWorkbenchProps> = ({
  station,
  learnerMode,
  draft,
  onChangeDraft,
  onSaveScore,
  onAwardXp,
  onContinueToNext,
  onBackToBrief,
}) => {
  const [copied, setCopied] = useState(false);
  const [showCopilotSyntax, setShowCopilotSyntax] = useState(false);
  const [showQuickBrief, setShowQuickBrief] = useState(false);
  const [showEvaluationSuccess, setShowEvaluationSuccess] = useState(false);

  // Compute live score using deterministic 7-part rubric
  const evalResult: PromptEvaluation = evaluatePrompt(draft);

  const handleFieldChange = (field: keyof PromptCanvasFields, value: string) => {
    onChangeDraft({
      ...draft,
      [field]: value,
    });
  };

  // "My Turn" / Clear to Blank Practice Template
  const handleMyTurnBlank = () => {
    onChangeDraft({
      outcome: '',
      audience: '',
      context: '',
      sources: '',
      constraints: '',
      output: '',
      verification: '',
    });
    setShowEvaluationSuccess(false);
  };

  // Load Pro Exemplar
  const handleLoadProExemplar = () => {
    onChangeDraft({
      ...station.promptChallenge.sampleHighScoringPrompt
    });
    setShowEvaluationSuccess(false);
  };

  // Load Student Starter
  const handleLoadStudentStarter = () => {
    onChangeDraft({
      ...station.promptChallenge.studentStarter
    });
    setShowEvaluationSuccess(false);
  };

  // Reset to current learner mode default
  const handleResetToStarter = () => {
    const starter = learnerMode === 'professional' 
      ? station.promptChallenge.proStarter 
      : station.promptChallenge.studentStarter;
    onChangeDraft(starter);
    setShowEvaluationSuccess(false);
  };

  const fullCompiledPrompt = compileFullPrompt(draft);

  // Count filled dimensions
  const filledDimensionsCount = Object.values(draft).filter((v) => String(v || '').trim().length > 5).length;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(fullCompiledPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onAwardXp(10);
    } catch (err) {
      // Fallback
    }
  };

  const handleScoreAndSave = () => {
    onSaveScore(evalResult.totalScore);
    onAwardXp(evalResult.totalScore * 3);
    setShowEvaluationSuccess(true);
    setTimeout(() => setShowEvaluationSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar & Live Score Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Score Badge */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-xl font-black text-white">{evalResult.totalScore}</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase">/ 21 PTS</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${evalResult.tierColor}`}>
                  {evalResult.tier} Prompt
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {filledDimensionsCount}/7 Dimensions Drafted
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 max-w-md">{evalResult.summary}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowQuickBrief(!showQuickBrief)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center space-x-1.5 ${
                showQuickBrief
                  ? 'bg-orange-600 text-white border-orange-500'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white hover:bg-zinc-750'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showQuickBrief ? 'Hide Brief' : 'View Facts & Brief'}</span>
            </button>

            <button
              onClick={() => setShowCopilotSyntax(!showCopilotSyntax)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center space-x-1.5 ${
                showCopilotSyntax 
                  ? 'bg-orange-600 text-white border-orange-500' 
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white hover:bg-zinc-750'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Copilot Mode</span>
            </button>

            <button
              onClick={handleCopyPrompt}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-100 border border-zinc-700 hover:border-zinc-600 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5"
              title="Copy for ChatGPT / Copilot / Claude"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
            </button>

            <button
              onClick={handleScoreAndSave}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evaluate & Save Score</span>
            </button>
          </div>

        </div>

        {/* Evaluation Saved Toast Alert */}
        {showEvaluationSuccess && (
          <div className="bg-zinc-950 border border-orange-500/80 p-3 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
            <div className="flex items-center space-x-2 text-orange-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Rubric Score of {evalResult.totalScore}/21 saved! (+{evalResult.totalScore * 3} XP awarded)</span>
            </div>
            <span className="text-zinc-400">Mastery prerequisite updated</span>
          </div>
        )}

        {/* 7-Part Rubric Progress Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-3 border-t border-zinc-800">
          {[
            { key: 'outcome', name: '1. Outcome', score: evalResult.dimensions.outcome.score },
            { key: 'audience', name: '2. Audience', score: evalResult.dimensions.audience.score },
            { key: 'context', name: '3. Context', score: evalResult.dimensions.context.score },
            { key: 'sources', name: '4. Sources', score: evalResult.dimensions.sources.score },
            { key: 'constraints', name: '5. Constraints', score: evalResult.dimensions.constraints.score },
            { key: 'output', name: '6. Output', score: evalResult.dimensions.output.score },
            { key: 'verification', name: '7. Verify', score: evalResult.dimensions.verification.score },
          ].map((dim) => (
            <div 
              key={dim.key}
              className={`p-2 rounded-lg border text-center transition-all ${
                dim.score === 3 
                  ? 'bg-zinc-850 border-orange-500/70 text-white' 
                  : dim.score === 2 
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-300' 
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-500'
              }`}
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider">{dim.name}</span>
              <span className="text-xs font-black mt-0.5 block">{dim.score}/3</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick In-Context Brief Drawer */}
      {showQuickBrief && (
        <div className="p-5 bg-zinc-950 border-2 border-orange-600/40 rounded-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Info className="w-4 h-4" />
              <span>Assignment Reference: {station.brief.client}</span>
            </span>
            <button
              onClick={() => setShowQuickBrief(false)}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-200 leading-relaxed">
            {station.brief.situation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
              <strong className="text-white block mb-1">Approved Confirmed Facts:</strong>
              <ul className="space-y-1 text-zinc-300">
                {station.brief.confirmedFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
              <strong className="text-orange-400 block mb-1">Unknowns / Do NOT Fabricate:</strong>
              <ul className="space-y-1 text-zinc-300">
                {station.brief.unknownsOrRisks.map((risk, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Copilot 4-Part Mapping Assistant (Collapsible) */}
      {showCopilotSyntax && (
        <div className="p-4 bg-zinc-900/90 border border-orange-600/40 rounded-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Cpu className="w-4 h-4" />
              <span>Microsoft 365 Copilot 4-Part Syntax Mapping</span>
            </span>
            <span className="text-[11px] text-zinc-400">Goal • Context • Expectations • Source</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <strong className="text-orange-400 font-bold block mb-1">1. Goal</strong>
              <p className="text-zinc-300 font-mono text-[11px]">{draft.outcome || 'Describe specific business goal...'}</p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <strong className="text-orange-400 font-bold block mb-1">2. Context</strong>
              <p className="text-zinc-300 font-mono text-[11px]">{draft.context || 'Describe target audience & operational situation...'}</p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <strong className="text-orange-400 font-bold block mb-1">3. Expectations</strong>
              <p className="text-zinc-300 font-mono text-[11px]">{draft.output || 'Format, tone, length & constraints...'}</p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <strong className="text-orange-400 font-bold block mb-1">4. Source Grounding</strong>
              <p className="text-zinc-300 font-mono text-[11px]">{draft.sources || 'Official file, policy or attached notes...'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Canvas View */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
        
        {/* Practice Mode & Starter Controls Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-zinc-800 gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>7-Part Prompt Canvas</span>
              <span className="text-xs text-orange-400 bg-orange-600/20 px-2 py-0.5 rounded border border-orange-600/40">
                Interactive Practice Desk
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Fill each dimension to construct a deterministic, source-bounded instruction for AI Chat.
            </p>
          </div>

          {/* Quick Practice Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1.5">
            
            {/* My Turn (Blank Template) */}
            <button
              onClick={handleMyTurnBlank}
              className="flex items-center space-x-1.5 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95"
              title="Clear all fields to practice writing your own prompt from scratch"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>✍️ My Turn (Blank Canvas)</span>
            </button>

            {/* Pro Exemplar */}
            <button
              onClick={handleLoadProExemplar}
              className="flex items-center space-x-1 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 px-2.5 py-1.5 rounded-lg border border-zinc-700 transition-colors"
              title="Load high-scoring verified exemplar prompt"
            >
              <Lightbulb className="w-3 h-3 text-orange-400" />
              <span>Pro Exemplar</span>
            </button>

            {/* Student Starter */}
            <button
              onClick={handleLoadStudentStarter}
              className="flex items-center space-x-1 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 px-2.5 py-1.5 rounded-lg border border-zinc-700 transition-colors"
              title="Load guided scaffold starter template"
            >
              <GraduationCap className="w-3 h-3 text-orange-400" />
              <span>Scaffold Starter</span>
            </button>

            {/* Reset Draft */}
            <button
              onClick={handleResetToStarter}
              className="flex items-center space-x-1 text-xs text-zinc-400 hover:text-white bg-zinc-850 hover:bg-zinc-800 px-2.5 py-1.5 rounded-lg border border-zinc-750 transition-colors"
              title="Reset prompt draft to station default"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

          </div>
        </div>

        {/* 7 Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. OUTCOME */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
              <span className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Outcome / Core Purpose</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-normal">
                {draft.outcome ? `${draft.outcome.length} chars` : 'What exact business outcome must this achieve?'}
              </span>
            </div>
            <textarea
              value={draft.outcome}
              onChange={(e) => handleFieldChange('outcome', e.target.value)}
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 leading-relaxed font-mono"
              placeholder="e.g. Draft an executive holding statement acknowledging the power outage and stating next update time..."
            />
          </div>

          {/* 2. AUDIENCE */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
              <span className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Audience / Persona</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-normal">
                {draft.audience ? `${draft.audience.length} chars` : 'Who will read this? What is their state of mind?'}
              </span>
            </div>
            <textarea
              value={draft.audience}
              onChange={(e) => handleFieldChange('audience', e.target.value)}
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 leading-relaxed font-mono"
              placeholder="e.g. Prospective undergraduate students, local news reporters on deadline..."
            />
          </div>

          {/* 3. CONTEXT */}
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
              <span className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Context / Operational Background</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-normal">
                {draft.context ? `${draft.context.length} chars` : 'Background facts, timing, and institutional situation'}
              </span>
            </div>
            <textarea
              value={draft.context}
              onChange={(e) => handleFieldChange('context', e.target.value)}
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 leading-relaxed font-mono"
              placeholder="e.g. The university academic senate approved the 4-course certificate for Fall launch. Virtual Zoom info session is Oct 14 at 4 PM..."
            />
          </div>

          {/* 4. SOURCES (GROUNDING) */}
          <div className="space-y-1.5 md:col-span-2 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs font-bold text-orange-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[10px]">4</span>
                <span>Sources & Grounding Directives</span>
              </span>
              <span className="text-[10px] text-orange-300/80 font-normal">CRITICAL: Explicitly forbid unverified fabrication</span>
            </div>
            <textarea
              value={draft.sources}
              onChange={(e) => handleFieldChange('sources', e.target.value)}
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 leading-relaxed font-mono mt-1"
              placeholder="e.g. Rely STRICTLY on the confirmed facts provided above. If any detail is missing or unconfirmed, mark it as [UNCONFIRMED: NEED INPUT] rather than inventing..."
            />
          </div>

          {/* 5. CONSTRAINTS */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
              <span className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[10px]">5</span>
                <span>Constraints / Exclusions</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-normal">
                {draft.constraints ? `${draft.constraints.length} chars` : 'Banned words, word counts, tone boundaries'}
              </span>
            </div>
            <textarea
              value={draft.constraints}
              onChange={(e) => handleFieldChange('constraints', e.target.value)}
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 leading-relaxed font-mono"
              placeholder="e.g. Maximum 120 words. AP Style. Do NOT use buzzwords like 'supercharge' or make speculative promises..."
            />
          </div>

          {/* 6. OUTPUT FORMAT */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
              <span className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[10px]">6</span>
                <span>Output Format & Structure</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-normal">
                {draft.output ? `${draft.output.length} chars` : 'Bullets, table, press statement, email template'}
              </span>
            </div>
            <textarea
              value={draft.output}
              onChange={(e) => handleFieldChange('output', e.target.value)}
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 leading-relaxed font-mono"
              placeholder="e.g. Return in Markdown with: 1. Headline, 2. Two short body paragraphs, 3. Bulleted event RSVP details..."
            />
          </div>

          {/* 7. VERIFICATION PROTOCOL */}
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
              <span className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[10px]">7</span>
                <span>Verification Protocol / Self-Audit</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-normal">
                {draft.verification ? `${draft.verification.length} chars` : 'How should the model verify claims?'}
              </span>
            </div>
            <textarea
              value={draft.verification}
              onChange={(e) => handleFieldChange('verification', e.target.value)}
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 leading-relaxed font-mono"
              placeholder="e.g. 1. Flag any assumption made. 2. Verify all dates match the official calendar. 3. Confirm no unverified claims exist..."
            />
          </div>

        </div>

        {/* Compiled Output Preview Drawer */}
        <div className="mt-6 pt-5 border-t border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Full Compiled System Prompt (Ready for Copying to ChatGPT / Copilot)</span>
            </span>
            <button
              onClick={handleCopyPrompt}
              className="text-xs text-orange-400 hover:text-orange-300 font-bold flex items-center space-x-1"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
            </button>
          </div>

          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {fullCompiledPrompt}
          </div>
        </div>

        {/* Step Navigation Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {onBackToBrief ? (
            <button
              onClick={onBackToBrief}
              className="text-xs text-zinc-400 hover:text-white font-medium flex items-center space-x-1"
            >
              <span>← Back to 1. Brief & Boundaries</span>
            </button>
          ) : <div />}

          <div className="flex items-center space-x-2">
            <button
              onClick={handleScoreAndSave}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Evaluate My Custom Prompt</span>
            </button>

            {onContinueToNext && (
              <button
                onClick={() => {
                  handleScoreAndSave();
                  onContinueToNext();
                }}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 active:scale-95"
              >
                <span>Continue to 3. Interactive Microgame</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

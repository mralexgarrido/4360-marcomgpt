import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  ShieldAlert,
  ArrowRight,
  Layers,
  Search,
  AlertTriangle
} from 'lucide-react';
import { MicrogameItem } from '../types';

interface MicrogameRunnerProps {
  game: MicrogameItem;
  isCompleted: boolean;
  onComplete: (xp: number) => void;
  onContinueToNext?: () => void;
}

export const MicrogameRunner: React.FC<MicrogameRunnerProps> = ({
  game,
  isCompleted,
  onComplete,
  onContinueToNext,
}) => {
  // Hallucination Hunt State
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);
  const [huntSubmitted, setHuntSubmitted] = useState(false);
  const [huntPassed, setHuntPassed] = useState(false);

  // Card Sort State
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [sortSubmitted, setSortSubmitted] = useState(false);
  const [sortPassed, setSortPassed] = useState(false);

  // Clinic Choice State
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [clinicSubmitted, setClinicSubmitted] = useState(false);
  const [clinicPassed, setClinicPassed] = useState(false);

  const handleToggleClaim = (claimText: string) => {
    if (huntSubmitted || isCompleted) return;
    if (selectedClaims.includes(claimText)) {
      setSelectedClaims(selectedClaims.filter((c) => c !== claimText));
    } else {
      setSelectedClaims([...selectedClaims, claimText]);
    }
  };

  const handleCheckHunt = () => {
    setHuntSubmitted(true);
    const targetClaims = game.unsupportedClaims || [];
    
    // Check if user selected all required claims and NO false positives
    const foundAll = targetClaims.length > 0 && targetClaims.every((claim) => 
      selectedClaims.some((sc) => sc.toLowerCase().includes(claim.toLowerCase()) || claim.toLowerCase().includes(sc.toLowerCase()))
    );
    const noExtraWrong = selectedClaims.length === targetClaims.length;
    const passed = foundAll && noExtraWrong;

    setHuntPassed(passed);

    if (passed && !isCompleted) {
      onComplete(game.xpReward);
    }
  };

  const handleSelectCardCategory = (cardId: string, category: string) => {
    if (sortSubmitted || isCompleted) return;
    setPlacements((prev) => ({ ...prev, [cardId]: category }));
  };

  const handleCheckSort = () => {
    setSortSubmitted(true);
    const cards = game.cards || [];
    const allCorrect = cards.length > 0 && cards.every((card) => placements[card.id] === card.category);

    setSortPassed(allCorrect);

    if (allCorrect && !isCompleted) {
      onComplete(game.xpReward);
    }
  };

  const handleSelectClinicOption = (optionId: string) => {
    if (clinicSubmitted || isCompleted) return;
    setSelectedOptionId(optionId);
  };

  const handleCheckClinic = () => {
    setClinicSubmitted(true);
    const cards = game.cards || [];
    const chosen = cards.find((c) => c.id === selectedOptionId);
    const passed = Boolean(chosen && chosen.isCorrect);

    setClinicPassed(passed);

    if (passed && !isCompleted) {
      onComplete(game.xpReward);
    }
  };

  const handleReset = () => {
    setSelectedClaims([]);
    setHuntSubmitted(false);
    setHuntPassed(false);
    setPlacements({});
    setSortSubmitted(false);
    setSortPassed(false);
    setSelectedOptionId(null);
    setClinicSubmitted(false);
    setClinicPassed(false);
  };

  const isSolved = isCompleted || huntPassed || sortPassed || clinicPassed;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl relative space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-600/40">
              3. Interactive Microgame
            </span>
            <span className="text-xs text-orange-400 font-semibold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+{game.xpReward} XP</span>
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">{game.title}</h3>
          <p className="text-xs text-zinc-300 mt-0.5">{game.instruction}</p>
        </div>

        <div className="flex items-center space-x-2">
          {isSolved ? (
            <span className="flex items-center space-x-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-orange-600 text-white shadow-md">
              <CheckCircle2 className="w-4 h-4" />
              <span>Solved (+{game.xpReward} XP)</span>
            </span>
          ) : (
            <span className="text-[11px] text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
              100% accuracy needed
            </span>
          )}
          <button
            onClick={handleReset}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800"
            title="Reset microgame"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GAME TYPE 1: Hallucination Hunt */}
      {game.type === 'hallucination_hunt' && game.snippetText && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs sm:text-sm leading-relaxed text-zinc-200">
            {game.snippetText.split(/(\[CLAIM_\d+: [^\]]+\])/g).map((chunk, idx) => {
              const match = chunk.match(/\[CLAIM_\d+: ([^\]]+)\]/);
              if (match) {
                const claimText = match[1];
                const isSelected = selectedClaims.includes(claimText);
                const isTarget = (game.unsupportedClaims || []).includes(claimText);

                let badgeStyle = 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:border-orange-500';
                if (isSelected) {
                  badgeStyle = 'bg-orange-600/30 border-orange-500 text-orange-200 ring-2 ring-orange-500/40';
                }
                if (huntSubmitted) {
                  if (isTarget) {
                    badgeStyle = 'bg-orange-950 border-orange-600 text-orange-300 font-bold';
                  } else if (isSelected && !isTarget) {
                    badgeStyle = 'bg-zinc-800 border-zinc-600 text-zinc-500 line-through';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleToggleClaim(claimText)}
                    disabled={huntSubmitted}
                    className={`inline-block px-2 py-0.5 my-1 mx-1 rounded-lg border text-xs font-medium cursor-pointer transition-all ${badgeStyle}`}
                  >
                    🔍 "{claimText}"
                  </button>
                );
              }
              return <span key={idx}>{chunk}</span>;
            })}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-zinc-400 font-medium">
              Selected claims: <strong className="text-orange-400">{selectedClaims.length}</strong> of {game.unsupportedClaims?.length || 3}
            </span>
            <div className="flex items-center space-x-2">
              {huntSubmitted && !huntPassed && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 transition-all flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Try Again</span>
                </button>
              )}
              {!huntSubmitted ? (
                <button
                  onClick={handleCheckHunt}
                  disabled={selectedClaims.length === 0}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Verify Hallucination Detection
                </button>
              ) : null}
            </div>
          </div>

          {huntSubmitted && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
              huntPassed 
                ? 'bg-zinc-950 border-orange-500/60 text-zinc-200' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-300'
            }`}>
              <div className="flex items-center space-x-1.5 font-bold">
                {huntPassed ? (
                  <span className="text-orange-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ Perfect Detection — All Hallucinations Caught! (+{game.xpReward} XP)</span>
                  </span>
                ) : (
                  <span className="text-zinc-400 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <span>Verification Review Needed (100% required to pass)</span>
                  </span>
                )}
              </div>
              <p>{game.feedbackIfCorrect}</p>
            </div>
          )}
        </div>
      )}

      {/* GAME TYPE 2: Card Sort */}
      {(game.type === 'card_sort' || game.type === 'causality_trap') && game.cards && game.categories && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game.cards.map((card) => {
              const currentChoice = placements[card.id];
              const isCorrect = currentChoice === card.category;

              return (
                <div 
                  key={card.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    sortSubmitted
                      ? isCorrect
                        ? 'bg-zinc-950 border-orange-500/80'
                        : 'bg-zinc-950 border-zinc-700 opacity-85'
                      : 'bg-zinc-950 border-zinc-800'
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold text-white mb-3 leading-relaxed">
                      "{card.text}"
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {game.categories?.map((cat) => {
                        const isSelected = currentChoice === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => handleSelectCardCategory(card.id, cat)}
                            disabled={sortSubmitted}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                              isSelected
                                ? 'bg-orange-600 text-white font-bold border-orange-500 shadow-sm'
                                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {sortSubmitted && (
                    <p className={`text-[11px] mt-2.5 pt-2 border-t border-zinc-850 font-medium ${isCorrect ? 'text-orange-400' : 'text-zinc-400'}`}>
                      {isCorrect ? '✓ ' : '✗ '} {card.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-zinc-400 font-medium">
              Categorized: <strong className="text-orange-400">{Object.keys(placements).length}</strong> of {game.cards.length}
            </span>
            <div className="flex items-center space-x-2">
              {sortSubmitted && !sortPassed && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 transition-all flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Try Again</span>
                </button>
              )}
              {!sortSubmitted && (
                <button
                  onClick={handleCheckSort}
                  disabled={Object.keys(placements).length < (game.cards?.length || 1)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Verify Categorization
                </button>
              )}
            </div>
          </div>

          {sortSubmitted && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
              sortPassed
                ? 'bg-zinc-950 border-orange-500/60 text-zinc-200'
                : 'bg-zinc-950 border-zinc-800 text-zinc-300'
            }`}>
              <div className="font-bold text-orange-400">
                {sortPassed ? `✓ All ${game.cards.length} Cards Accurately Categorized! (+${game.xpReward} XP)` : 'Diagnostic Review:'}
              </div>
              <p>{game.feedbackIfCorrect}</p>
            </div>
          )}
        </div>
      )}

      {/* GAME TYPE 3: Alt-Text / Prompt Clinic */}
      {(game.type === 'alt_text_clinic' || game.type === 'prompt_repair') && game.cards && (
        <div className="space-y-4">
          <div className="space-y-3">
            {game.cards.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let borderStyle = 'border-zinc-800 bg-zinc-950 hover:border-zinc-600 text-zinc-200';

              if (isSelected) {
                borderStyle = 'border-orange-500 bg-zinc-900 ring-2 ring-orange-500/40 text-white';
              }
              if (clinicSubmitted) {
                if (option.isCorrect) {
                  borderStyle = 'border-orange-500 bg-zinc-900 text-white font-semibold';
                } else if (isSelected && !option.isCorrect) {
                  borderStyle = 'border-zinc-700 bg-zinc-950 text-zinc-500';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectClinicOption(option.id)}
                  disabled={clinicSubmitted}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${borderStyle}`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-1">
                    <span className="uppercase tracking-wider text-orange-400">{option.category}</span>
                    {clinicSubmitted && option.isCorrect && (
                      <span className="text-orange-400 font-bold">✓ Best Practice Choice</span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-100 font-medium leading-relaxed">
                    {option.text}
                  </p>

                  {clinicSubmitted && (
                    <p className={`text-[11px] mt-2 font-medium ${option.isCorrect ? 'text-orange-400' : 'text-zinc-400'}`}>
                      {option.explanation}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-zinc-400 font-medium">
              {selectedOptionId ? 'Option selected' : 'Choose the best practice approach'}
            </span>
            <div className="flex items-center space-x-2">
              {clinicSubmitted && !clinicPassed && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 transition-all flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Try Again</span>
                </button>
              )}
              {!clinicSubmitted && (
                <button
                  onClick={handleCheckClinic}
                  disabled={!selectedOptionId}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Verify Decision
                </button>
              )}
            </div>
          </div>

          {clinicSubmitted && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
              clinicPassed 
                ? 'bg-zinc-950 border-orange-500/60 text-zinc-200' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-300'
            }`}>
              <div className="font-bold text-orange-400">
                {clinicPassed ? `✓ Best Practice Decision Confirmed! (+${game.xpReward} XP)` : 'Diagnostic Feedback:'}
              </div>
              <p>{game.feedbackIfCorrect}</p>
            </div>
          )}
        </div>
      )}

      {/* Step advancement */}
      {onContinueToNext && isSolved && (
        <div className="pt-2 flex justify-end border-t border-zinc-800">
          <button
            onClick={onContinueToNext}
            className="flex items-center space-x-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Continue to 4. Output Diagnostics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};

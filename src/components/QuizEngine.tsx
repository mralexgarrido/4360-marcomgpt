import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, BookOpen, RotateCcw, AlertTriangle, Award } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizEngineProps {
  quiz: QuizQuestion[];
  isCompleted: boolean;
  stationTitle: string;
  onCompleteQuiz: (xp: number) => void;
  onContinueToNext?: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quiz,
  isCompleted,
  stationTitle,
  onCompleteQuiz,
  onContinueToNext,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isAnsweredCurrent, setIsAnsweredCurrent] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const currentQ = quiz[currentIdx];
  const selectedOptionForCurrent = userAnswers[currentIdx] !== undefined ? userAnswers[currentIdx] : null;

  const handleSelectOption = (optionIdx: number) => {
    if (isAnsweredCurrent) return;
    setUserAnswers((prev) => ({ ...prev, [currentIdx]: optionIdx }));
    setIsAnsweredCurrent(true);
  };

  const handleNext = () => {
    if (currentIdx < quiz.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setIsAnsweredCurrent(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      quiz.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) {
          correctCount += 1;
        }
      });

      setQuizFinished(true);

      // ONLY award XP and mark complete if 100% correct!
      if (correctCount === quiz.length && !isCompleted) {
        onCompleteQuiz(75);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnsweredCurrent(false);
    setQuizFinished(false);
  };

  // Compute stats when finished
  const correctCount = quiz.reduce((acc, q, idx) => acc + (userAnswers[idx] === q.correctIndex ? 1 : 0), 0);
  const isPerfectScore = correctCount === quiz.length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl relative space-y-5">
      
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-600/40">
              5. Knowledge Retrieval Quiz
            </span>
            <span className="text-xs text-zinc-400">
              Question {currentIdx + 1} of {quiz.length}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">{stationTitle}</h3>
        </div>

        <div>
          {isCompleted || (quizFinished && isPerfectScore) ? (
            <span className="flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-orange-600 text-white shadow-md">
              <CheckCircle2 className="w-4 h-4" />
              <span>Quiz Mastered (+75 XP)</span>
            </span>
          ) : (
            <div className="text-[11px] text-zinc-400 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl font-medium">
              100% accuracy required for XP credit
            </div>
          )}
        </div>
      </div>

      {!quizFinished ? (
        <div className="space-y-4">
          
          {/* Question Progress bar */}
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / quiz.length) * 100}%` }}
            />
          </div>

          <p className="text-sm font-semibold text-zinc-100 leading-relaxed pt-1">
            {currentQ.question}
          </p>

          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionForCurrent === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600 hover:text-white';
              if (isAnsweredCurrent) {
                if (isCorrect) {
                  btnStyle = 'border-orange-500 bg-zinc-900 text-white font-bold ring-1 ring-orange-500/50';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-zinc-700 bg-zinc-950 text-zinc-400 line-through opacity-80';
                } else {
                  btnStyle = 'border-zinc-850 bg-zinc-950/60 text-zinc-600 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnsweredCurrent}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start space-x-3 ${btnStyle}`}
                >
                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                    isAnsweredCurrent && isCorrect
                      ? 'border-orange-500 bg-orange-600 text-white'
                      : isAnsweredCurrent && isSelected
                      ? 'border-zinc-600 bg-zinc-800 text-zinc-400'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Diagnostic Explanation Card */}
          {isAnsweredCurrent && (
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-200 animate-fadeIn space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 font-bold text-orange-400">
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {selectedOptionForCurrent === currentQ.correctIndex 
                      ? '✓ Correct Answer' 
                      : '✗ Incorrect — Verification Diagnostic'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {selectedOptionForCurrent === currentQ.correctIndex ? '+Correct' : 'Missed'}
                </span>
              </div>

              <p className="leading-relaxed text-zinc-300">{currentQ.explanation}</p>
              
              {currentQ.referenceSource && (
                <div className="text-[11px] text-zinc-400 border-t border-zinc-850 pt-1.5 font-mono">
                  Ref: {currentQ.referenceSource}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>{currentIdx < quiz.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Final Score Card */
        <div className="text-center py-6 space-y-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border ${
            isPerfectScore 
              ? 'bg-orange-600/20 border-orange-500 text-orange-400' 
              : 'bg-zinc-850 border-zinc-700 text-zinc-400'
          }`}>
            {isPerfectScore ? <Sparkles className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8 text-orange-400" />}
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-black text-white">
              {isPerfectScore ? '100% Perfect Score — Station Quiz Mastered!' : 'Quiz Attempt Finished'}
            </h4>
            <p className="text-sm text-zinc-300 font-medium">
              You scored <strong className="text-orange-400 font-bold">{correctCount} of {quiz.length}</strong> ({Math.round((correctCount / quiz.length) * 100)}%)
            </p>
          </div>

          {/* Conditional Guidance based on score */}
          {isPerfectScore ? (
            <div className="p-4 bg-zinc-950 border border-orange-500/50 rounded-xl text-xs text-zinc-200 max-w-lg mx-auto space-y-2">
              <p className="font-semibold text-orange-400">
                ✓ +75 XP Credited! Your verified institutional knowledge meets publication standards.
              </p>
              <p className="text-zinc-400">
                You have satisfied the quiz requirement for this station. Check your Station Mastery status above to complete the station!
              </p>
            </div>
          ) : (
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300 max-w-lg mx-auto space-y-2 text-left">
              <div className="flex items-center space-x-1.5 text-orange-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Zero-Tolerance Verification Standard</span>
              </div>
              <p className="leading-relaxed text-zinc-400">
                In real MarCom environments, partial accuracy in prompts or crisis communications leads to public misinformation. To unlock your <strong>+75 XP</strong> and station completion credit, you must achieve <strong>{quiz.length}/{quiz.length} (100%)</strong>.
              </p>
            </div>
          )}

          {/* Review Question-by-Question Breakdown */}
          <div className="space-y-3 text-left max-w-2xl mx-auto pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Question Summary Breakdown
            </span>
            {quiz.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctIndex;
              return (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border text-xs flex items-start space-x-3 ${
                    isCorrect ? 'bg-zinc-950 border-orange-500/40' : 'bg-zinc-950 border-zinc-800'
                  }`}
                >
                  <div className="mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-orange-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Q{idx + 1}: {q.question}</p>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 text-xs font-bold rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isPerfectScore ? 'Retake Quiz for Extra Practice' : 'Retake Quiz (Aim for 100%)'}</span>
            </button>

            {onContinueToNext && isPerfectScore && (
              <button
                onClick={onContinueToNext}
                className="flex items-center space-x-1.5 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Check Station Mastery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

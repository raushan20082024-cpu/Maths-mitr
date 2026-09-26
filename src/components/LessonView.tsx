import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Trophy,
  ChevronRight,
  RefreshCw,
  Award,
  Zap,
  ArrowRight,
  MessageCircleQuestion,
} from 'lucide-react';
import { Lesson, DifficultyLevel } from '../types/math';
import { TrigTreeSimulation } from './simulations/TrigTreeSimulation';
import { PercentageShopSimulation } from './simulations/PercentageShopSimulation';
import { RatioRecipeSimulation } from './simulations/RatioRecipeSimulation';
import { WallPaintingSimulation } from './simulations/WallPaintingSimulation';
import { SpeedDistanceSimulation } from './simulations/SpeedDistanceSimulation';
import { NumberLineSimulation } from './simulations/NumberLineSimulation';
import { SquareRootSimulation } from './simulations/SquareRootSimulation';
import { AlgebraBalanceSimulation } from './simulations/AlgebraBalanceSimulation';
import { ProfitLossSimulation } from './simulations/ProfitLossSimulation';
import { DoubtClearingDrawer } from './DoubtClearingDrawer';
import { RealWorldProjectCard } from './RealWorldProjectCard';
import { REAL_WORLD_PROJECTS } from '../data/projectsData';

interface LessonViewProps {
  lesson: Lesson;
  onAddXP: (xp: number) => void;
  onOpenSolverWithQuestion: (q: string, topic: string) => void;
  onOpenProof?: (formulaQuery: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onAddXP,
  onOpenSolverWithQuestion,
  onOpenProof,
}) => {
  // Active tab / section in lesson
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  // Doubt drawer state
  const [doubtOpen, setDoubtOpen] = useState(false);
  const [doubtContext, setDoubtContext] = useState('');

  // Practice question state
  const [selectedPracticeIdx, setSelectedPracticeIdx] = useState(0);
  const currentPractice = lesson.practiceQuestions[selectedPracticeIdx] || lesson.practiceQuestions[0];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHintLevel, setShowHintLevel] = useState<number>(0);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);

  // Challenge state
  const [challengeOption, setChallengeOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeHintOpen, setChallengeHintOpen] = useState(false);

  const openDoubt = (context: string) => {
    setDoubtContext(context);
    setDoubtOpen(true);
  };

  const handlePracticeOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handlePracticeSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentPractice.correctIndex) {
      onAddXP(25);
      setConsecutiveErrors(0);
    } else {
      setConsecutiveErrors((prev) => prev + 1);
    }
  };

  const handlePracticeNext = () => {
    if (selectedPracticeIdx < lesson.practiceQuestions.length - 1) {
      setSelectedPracticeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHintLevel(0);
    } else {
      // Completed practice
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHintLevel(0);
    }
  };

  const handleChallengeSubmit = () => {
    if (challengeOption === null) return;
    setChallengeSubmitted(true);
    if (challengeOption === lesson.challenge.correctIndex) {
      onAddXP(lesson.challenge.rewardXP || 50);
    }
  };

  // Render simulation according to type
  const renderSimulation = () => {
    switch (lesson.simulationType) {
      case 'trigonometry':
        return <TrigTreeSimulation />;
      case 'percentage':
        return <PercentageShopSimulation />;
      case 'ratio':
        return <RatioRecipeSimulation />;
      case 'geometry':
        return <WallPaintingSimulation />;
      case 'speed':
        return <SpeedDistanceSimulation />;
      case 'numbers':
        return <NumberLineSimulation />;
      case 'square':
      case 'cube':
        return <SquareRootSimulation />;
      case 'algebra':
        return <AlgebraBalanceSimulation />;
      case 'profitloss':
      case 'interest':
        return <ProfitLossSimulation />;
      case 'data':
        return <RatioRecipeSimulation />;
      default:
        return <TrigTreeSimulation />;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. TOPIC INTRODUCTION & HERO */}
      <section className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 text-[180px] leading-none select-none pointer-events-none font-bold">
          📐
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-100 border border-white/20">
            <span>पाठ 1 (Lesson 1)</span> • <span>{lesson.englishTerm}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {lesson.title}
          </h1>

          <p className="text-amber-100 text-sm sm:text-base font-medium leading-relaxed">
            {lesson.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => openDoubt('पाठ का परिचय')}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircleQuestion className="w-4 h-4" /> सर से डाउट पूछें (Ask Doubt)
            </button>
            <button
              onClick={() => onOpenSolverWithQuestion(lesson.solvedExample.problemStatement, lesson.title)}
              className="bg-white text-amber-900 hover:bg-amber-50 text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" /> 8-स्टेप सॉल्वर में खोलें
            </button>
          </div>
        </div>
      </section>

      {/* 2. REAL-LIFE STORY & HOOK */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-md">
        <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
          <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center font-black">
            1
          </span>
          <span>वास्तविक जीवन की कहानी (Real-Life Hook)</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-3">
          {lesson.realLifeHook.question}
        </h2>

        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
          <p>{lesson.realLifeHook.hookStory}</p>
          <div className="text-xs bg-white/90 text-amber-900 p-3 rounded-xl border border-amber-200 flex items-center gap-2 font-medium">
            <span className="text-lg">💡</span>
            <span>{lesson.realLifeHook.contextImgDescription}</span>
          </div>
        </div>
      </section>

      {/* 3. CONCEPT EXPLANATION */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 text-blue-700 font-bold text-xs uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-black">
            2
          </span>
          <span>अवधारणा और सूत्र (Concept & Core Formulas)</span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            {lesson.conceptExplanation.title}
          </h2>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
            {lesson.conceptExplanation.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.conceptExplanation.coreFormulas.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border-2 border-slate-200/80 hover:border-amber-300 rounded-2xl p-4.5 transition-colors space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-800">
                  {item.name}
                </span>
                <div className="flex items-center gap-1.5">
                  {onOpenProof && (
                    <button
                      onClick={() => onOpenProof(item.name)}
                      className="text-[11px] text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded font-bold transition-colors cursor-pointer border border-indigo-200"
                      title="इस फॉर्मूले की उपपत्ति / प्रमाण देखें"
                    >
                      📐 सिद्ध देखें
                    </button>
                  )}
                  <button
                    onClick={() => openDoubt(`सूत्र: ${item.name}`)}
                    className="text-[11px] text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-2 py-0.5 rounded font-bold transition-colors cursor-pointer"
                  >
                    ये सूत्र क्यों?
                  </button>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm font-bold text-amber-700">
                {item.formula}
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-700">यह क्यों काम करता है:</strong>{' '}
                {item.whyItWorks}
              </div>

              <div className="text-xs bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200 font-medium">
                🎯 {item.realLifeExample}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VISUAL EXAMPLE / INTERACTIVE LAB */}
      <section>
        <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
          <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-black">
            3
          </span>
          <span>इंटरैक्टिव लैब और दृश्य उदाहरण (Interactive Visual Lab)</span>
        </div>

        {renderSimulation()}
      </section>

      {/* 5. STEP-BY-STEP SOLVED EXAMPLE (8 STEPS) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-md space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center font-black">
              4
            </span>
            <span>हल किया गया 8-स्टेप उदाहरण (8-Step Solved Example)</span>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full">
            मानक हल प्रक्रिया (Standard Procedure)
          </span>
        </div>

        <div className="bg-amber-500/10 border-2 border-amber-300 rounded-2xl p-4.5">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            📝 मुख्य सवाल (Main Problem):
          </div>
          <p className="text-base font-extrabold text-slate-900 leading-snug">
            {lesson.solvedExample.problemStatement}
          </p>
        </div>

        {/* 8-Steps Timeline Cards */}
        <div className="space-y-3.5">
          {lesson.solvedExample.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white border-2 border-slate-100 hover:border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-800">
                      Step {step.stepNumber}: {step.title}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => openDoubt(`Step ${step.stepNumber}: ${step.title}`)}
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> डाउट? पूछो
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed pl-10.5">
                {step.content}
              </div>

              {step.keyObservation && (
                <div className="mt-2.5 ml-10.5 text-xs bg-slate-50 text-slate-600 p-2 rounded-lg border border-slate-200 font-medium">
                  👀 <strong>ध्यान दें:</strong> {step.keyObservation}
                </div>
              )}

              {step.realLifeMeaning && (
                <div className="mt-2.5 ml-10.5 text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200 font-medium flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>असल जिंदगी में मतलब:</strong> {step.realLifeMeaning}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-emerald-600 text-white p-4.5 rounded-2xl shadow-md flex items-center gap-3 text-sm">
          <span className="text-3xl">🌟</span>
          <div>
            <div className="font-bold uppercase text-xs text-emerald-100">
              निष्कर्ष (Key Takeaway)
            </div>
            <p className="font-medium text-white">{lesson.solvedExample.realLifeSummary}</p>
          </div>
        </div>
      </section>

      {/* 6. COMMON MISTAKES (आम गलतियाँ) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200/80 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 text-rose-700 font-bold text-xs uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center font-black">
            5
          </span>
          <span>छात्रों द्वारा की जाने वाली आम गलतियाँ (Common Mistakes)</span>
        </div>

        <h2 className="text-xl font-black text-slate-800">
          यहाँ सावधान रहें! (Watch out for these errors)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.commonMistakes.map((m, idx) => (
            <div
              key={idx}
              className="bg-rose-50/50 border-2 border-rose-200 rounded-2xl p-4.5 space-y-2.5"
            >
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>गलती: {m.mistake}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>यह क्यों होती है?</strong> {m.whyItHappens}
              </p>
              <div className="text-xs bg-white p-2.5 rounded-xl border border-rose-200 text-emerald-800 font-bold">
                ✅ सही तरीका: {m.correctWay}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7, 8, 9. PRACTICE QUESTION, HINT & MISTAKE EXPLANATION */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-lg space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center font-black">
              6
            </span>
            <span>अब तुम्हारी बारी! (Practice Question & Smart Feedback)</span>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full">
            +25 XP प्रति सही उत्तर
          </span>
        </div>

        <div className="space-y-3">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            सवाल {selectedPracticeIdx + 1} of {lesson.practiceQuestions.length} ({currentPractice.difficulty.toUpperCase()})
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
            {currentPractice.question}
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentPractice.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentPractice.correctIndex;
            let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300';

            if (isSubmitted) {
              if (isCorrect) {
                btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
              } else if (isSelected) {
                btnClass = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
              } else {
                btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              btnClass = 'bg-amber-100 border-amber-500 text-amber-950 font-bold shadow-xs';
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => handlePracticeOptionSelect(idx)}
                className={`p-4 rounded-2xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
              >
                <span>{opt}</span>
                {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
              </button>
            );
          })}
        </div>

        {/* Hint System */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {currentPractice.hints.map((hint, hIdx) => {
            const isRevealed = showHintLevel > hIdx;
            return (
              <div key={hIdx} className="w-full">
                {!isRevealed ? (
                  <button
                    onClick={() => setShowHintLevel(hIdx + 1)}
                    className="text-xs text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    संकेत देखें (Hint {hIdx + 1})
                  </button>
                ) : (
                  <div className="bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-900 p-3 rounded-xl flex items-start gap-2 animate-fade-in font-medium">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{hint}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submission & Feedback */}
        {!isSubmitted ? (
          <div className="flex justify-end pt-2">
            <button
              onClick={handlePracticeSubmit}
              disabled={selectedOption === null}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              उत्तर सबमिट करें (Check Answer)
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-2 animate-fade-in">
            {/* If Correct */}
            {selectedOption === currentPractice.correctIndex ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4.5 text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-black text-base text-emerald-700">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>शानदार! बिल्कुल सही उत्तर! (+25 XP) 🎉</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {currentPractice.detailedExplanation}
                </p>
                <div className="text-xs bg-white p-2.5 rounded-xl border border-emerald-200 text-emerald-900 font-bold">
                  🌍 {currentPractice.realLifeMeaning}
                </div>
              </div>
            ) : (
              /* If Wrong: NOT JUST WRONG - Detailed Mistake Explanation as requested! */
              <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4.5 text-rose-950 space-y-2">
                <div className="flex items-center gap-2 font-black text-base text-rose-700">
                  <XCircle className="w-5 h-5" />
                  <span>गलती कहाँ हुई? (Understand your mistake)</span>
                </div>

                {/* Exact mistake explanation */}
                <div className="bg-white p-3 rounded-xl border border-rose-200 text-xs sm:text-sm text-rose-900 leading-relaxed font-medium">
                  {selectedOption !== null && currentPractice.mistakeExplanations[selectedOption] ? (
                    currentPractice.mistakeExplanations[selectedOption]
                  ) : (
                    <span>
                      आपने गलत विकल्प चुना है। सूत्र को दोबारा ध्यान से लागू करें!
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-700 pt-1">
                  <strong>सही समाधान:</strong> {currentPractice.detailedExplanation}
                </div>

                <button
                  onClick={() => openDoubt(`अभ्यास सवाल: ${currentPractice.question}`)}
                  className="text-xs bg-rose-200 hover:bg-rose-300 text-rose-900 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> सर से समझें कि गलती क्यों हुई?
                </button>
              </div>
            )}

            {/* Next button */}
            <div className="flex justify-end pt-1">
              <button
                onClick={handlePracticeNext}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <span>अगला सवाल (Next Question)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 10. QUICK REVISION */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-black">
            7
          </span>
          <span>त्वरित दोहराव (Quick Revision Points)</span>
        </div>

        <h2 className="text-xl font-black text-white">
          परीक्षा और दैनिक जीवन के लिए याद रखने योग्य बातें:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lesson.quickRevisionPoints.map((pt, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5 text-xs sm:text-sm flex items-start gap-2.5 font-medium"
            >
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 11. REAL-WORLD PROJECTS (LINKED TO CURRENT TOPIC) */}
      {REAL_WORLD_PROJECTS[lesson.topicId] && (
        <RealWorldProjectCard
          project={REAL_WORLD_PROJECTS[lesson.topicId]}
          onAddXP={onAddXP}
        />
      )}

      {/* 12. CHALLENGE QUESTION */}
      <section className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 rounded-3xl p-6 sm:p-8 border-3 border-amber-400 shadow-xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-amber-900 font-black text-xs uppercase tracking-wider">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span>चुनौती भरा सवाल (Champion's Challenge)</span>
          </div>
          <span className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
            +{lesson.challenge.rewardXP} XP
          </span>
        </div>

        <div className="bg-white/90 p-5 rounded-2xl border border-amber-300 shadow-xs space-y-2">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
            {lesson.challenge.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lesson.challenge.scenario}
          </p>
          <div className="font-bold text-sm sm:text-base text-amber-900 pt-1">
            👉 {lesson.challenge.question}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lesson.challenge.options.map((opt, idx) => {
            const isSelected = challengeOption === idx;
            const isCorrect = idx === lesson.challenge.correctIndex;
            let btnClass = 'bg-white border-amber-200 text-slate-800 hover:bg-amber-50';

            if (challengeSubmitted) {
              if (isCorrect) {
                btnClass = 'bg-emerald-200 border-emerald-600 text-emerald-950 font-bold';
              } else if (isSelected) {
                btnClass = 'bg-rose-200 border-rose-600 text-rose-950 font-bold';
              }
            } else if (isSelected) {
              btnClass = 'bg-amber-200 border-amber-600 text-amber-950 font-bold';
            }

            return (
              <button
                key={idx}
                disabled={challengeSubmitted}
                onClick={() => setChallengeOption(idx)}
                className={`p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
              >
                <span>{opt}</span>
                {challengeSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
              </button>
            );
          })}
        </div>

        {/* Challenge Action */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
          <button
            onClick={() => setChallengeHintOpen(!challengeHintOpen)}
            className="text-xs text-amber-900 underline font-bold"
          >
            {challengeHintOpen ? 'संकेत छिपाएँ' : '💡 संकेत देखें (Show Hint)'}
          </button>

          {!challengeSubmitted ? (
            <button
              onClick={handleChallengeSubmit}
              disabled={challengeOption === null}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-black px-6 py-2.5 rounded-xl shadow-md text-xs sm:text-sm cursor-pointer"
            >
              चुनौती स्वीकार करें!
            </button>
          ) : (
            <div className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
              {challengeOption === lesson.challenge.correctIndex
                ? '🎉 बधाई हो! आपने यह चुनौती सफलतापूर्वक पूरी की!'
                : 'कोई बात नहीं! सही हल नीचे देखें:'}
            </div>
          )}
        </div>

        {challengeHintOpen && (
          <div className="text-xs bg-amber-50 p-3 rounded-xl border border-amber-300 text-amber-900 font-medium animate-fade-in">
            💡 <strong>संकेत:</strong> {lesson.challenge.hint}
          </div>
        )}

        {challengeSubmitted && (
          <div className="bg-white p-4 rounded-2xl border border-amber-300 text-xs sm:text-sm text-slate-800 font-medium space-y-1 animate-fade-in">
            <strong className="text-amber-800 block font-bold">समाधान का विवरण:</strong>
            <p>{lesson.challenge.solutionBreakdown}</p>
          </div>
        )}
      </section>

      {/* Embedded Doubt Drawer */}
      <DoubtClearingDrawer
        isOpen={doubtOpen}
        onClose={() => setDoubtOpen(false)}
        contextQuestion={lesson.title}
        contextStep={doubtContext}
      />
    </div>
  );
};

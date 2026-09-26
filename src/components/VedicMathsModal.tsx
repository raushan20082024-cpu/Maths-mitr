import React, { useState } from 'react';
import {
  X,
  Zap,
  Sparkles,
  Brain,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Sliders,
  Lightbulb,
  Award,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { VEDIC_MATHS_TRICKS, VedicTrick } from '../data/vedicMaths';

interface VedicMathsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXP: (xp: number) => void;
}

export const VedicMathsModal: React.FC<VedicMathsModalProps> = ({
  isOpen,
  onClose,
  onAddXP,
}) => {
  const [selectedTrickId, setSelectedTrickId] = useState<string>(
    VEDIC_MATHS_TRICKS[0].id
  );
  const activeTrick =
    VEDIC_MATHS_TRICKS.find((t) => t.id === selectedTrickId) ||
    VEDIC_MATHS_TRICKS[0];

  // Interactive Live Calculator State
  // 1. Ends in 5
  const [numEnds5, setNumEnds5] = useState<number>(65);
  const tensEnds5 = Math.floor(numEnds5 / 10);
  const frontCalcEnds5 = tensEnds5 * (tensEnds5 + 1);
  const sqEnds5Result = frontCalcEnds5 * 100 + 25;

  // 2. Multiply 11
  const [num11, setNum11] = useState<number>(45);
  const firstDigit11 = Math.floor(num11 / 10);
  const lastDigit11 = num11 % 10;
  const middleSum11 = firstDigit11 + lastDigit11;
  const res11 = num11 * 11;

  // 3. Base 100
  const [baseA, setBaseA] = useState<number>(96);
  const [baseB, setBaseB] = useState<number>(97);
  const diffA = 100 - baseA;
  const diffB = 100 - baseB;
  const crossSub = baseA - diffB;
  const prodDiff = diffA * diffB;
  const resBase = baseA * baseB;

  // 4. Multiply 99
  const [num99, setNum99] = useState<number>(47);
  const left99 = num99 - 1;
  const right99 = 99 - left99;
  const res99 = num99 * 99;

  // 5. Fast Div 5
  const [numDiv5, setNumDiv5] = useState<number>(340);
  const doubledDiv5 = numDiv5 * 2;
  const resDiv5 = (doubledDiv5 / 10).toFixed(1);

  // 6. Multiply 51 (User requested: 51 * 42 = 2142)
  const [num51, setNum51] = useState<number>(42);
  const half51 = num51 / 2;
  const res51 = num51 * 51;

  // 7. Multiply 21 (User requested: 21 * 25 = 525)
  const [num21, setNum21] = useState<number>(25);
  const fifth21 = (num21 / 5).toFixed(0);
  const res21 = num21 * 21;

  // 8. Multiply 101 (Twin Mirror: 47 * 101 = 4747)
  const [num101, setNum101] = useState<number>(47);
  const res101 = num101 * 101;

  // 9. Multiply 25 (Divide by 4 & add 00)
  const [numMul25, setNumMul25] = useState<number>(64);
  const div4Mul25 = Math.floor(numMul25 / 4);
  const resMul25 = numMul25 * 25;

  // 10. Multiply 5 (Half & add 0)
  const [numMul5, setNumMul5] = useState<number>(86);
  const halfMul5 = numMul5 / 2;
  const resMul5 = numMul5 * 5;

  // Practice Quiz State for Active Trick
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizEarnedXP, setQuizEarnedXP] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQuiz =
    activeTrick.practiceProblems[quizIdx] || activeTrick.practiceProblems[0];

  const handleSelectOption = (idx: number) => {
    if (quizSubmitted) return;
    setQuizSelected(idx);
  };

  const handleSubmitQuiz = () => {
    if (quizSelected === null) return;
    setQuizSubmitted(true);
    if (quizSelected === currentQuiz.correctIndex && !quizEarnedXP) {
      onAddXP(30);
      setQuizEarnedXP(true);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx < activeTrick.practiceProblems.length - 1) {
      setQuizIdx((prev) => prev + 1);
    } else {
      setQuizIdx(0);
    }
    setQuizSelected(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-amber-200/80 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-5 sm:p-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-4 top-2 opacity-15 text-8xl font-black pointer-events-none select-none">
            ⚡
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black shadow-inner border border-white/20">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  वैदिक गणित एवं स्पीड ट्रिक्स (Vedic Maths & Speed Tricks)
                </h2>
                <span className="hidden sm:inline-block bg-amber-300 text-amber-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  सुपर फास्ट गणना
                </span>
              </div>
              <p className="text-amber-100 text-xs sm:text-sm mt-0.5">
                कठिन गुणा-भाग को मन ही मन 2 सेकंड में हल करने के प्राचीन भारतीय जादुई सूत्र
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left trick navigation + Right interactive content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/50">
          {/* Left Column: Trick Pills (Tabs) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-amber-600" />
              <span>जादुई वैदिक सूत्र चुनें:</span>
            </div>

            <div className="space-y-2">
              {VEDIC_MATHS_TRICKS.map((trick) => {
                const isSelected = trick.id === activeTrick.id;
                return (
                  <button
                    key={trick.id}
                    onClick={() => {
                      setSelectedTrickId(trick.id);
                      setQuizIdx(0);
                      setQuizSelected(null);
                      setQuizSubmitted(false);
                      setQuizEarnedXP(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-bold'
                        : 'bg-white text-slate-800 border-slate-200/90 hover:border-amber-300 hover:bg-amber-50/40'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-black line-clamp-1">
                        {trick.sutra.split('(')[0]}
                      </div>
                      <div
                        className={`text-[11px] line-clamp-1 ${
                          isSelected ? 'text-slate-900 font-semibold' : 'text-slate-500'
                        }`}
                      >
                        {trick.englishName}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold whitespace-nowrap ml-2 ${
                        isSelected
                          ? 'bg-slate-950 text-amber-300'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {trick.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Tip Box */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-1.5 text-amber-950">
              <div className="font-bold flex items-center gap-1 text-amber-800">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>वैदिक गणित का रहस्य:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                वैदिक गणित में संख्याओं को दाहिने से बाएँ रटने के बजाय उनके पैटर्न को
                पहचाना जाता है। इससे परीक्षा में समय बचता है और दिमाग बिजली की तरह तेज होता है!
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Trick + Live Simulator + Quiz */}
          <div className="lg:col-span-8 space-y-5">
            {/* Trick Title Card */}
            <div className="bg-white rounded-2xl p-5 border-2 border-amber-200/80 shadow-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                  {activeTrick.sutra}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  अर्थ: {activeTrick.sutraMeaning}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeTrick.englishName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeTrick.description}
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-2.5 rounded-r-xl text-xs font-bold text-amber-950">
                📌 <strong>सुनहरा नियम:</strong> {activeTrick.rule}
              </div>
            </div>

            {/* LIVE INTERACTIVE VEDIC CALCULATOR */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border-2 border-amber-400/40 shadow-lg space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-3">
                <h4 className="text-sm font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>लाइव वैदिक सिम्युलेटर (Live Interactive Magic)</span>
                </h4>
                <span className="text-[11px] text-slate-400">
                  संख्या बदलकर तुरंत दिमाग में स्टेप्स देखें
                </span>
              </div>

              {/* 1. Ends in 5 Simulator */}
              {activeTrick.interactiveType === 'endsIn5' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>संख्या चुनें (Ending in 5):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        {numEnds5}²
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="115"
                      step="10"
                      value={numEnds5}
                      onChange={(e) => setNumEnds5(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>15²</span>
                      <span>35²</span>
                      <span>65²</span>
                      <span>95²</span>
                      <span>115²</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-400 block">
                        आगे का भाग: N × (N+1)
                      </span>
                      <div className="text-lg font-mono font-bold text-amber-300 mt-1">
                        {tensEnds5} × {tensEnds5 + 1} ={' '}
                        <strong className="text-amber-400">{frontCalcEnds5}</strong>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] text-slate-400 block">
                        पीछे का भाग (5²)
                      </span>
                      <div className="text-lg font-mono font-bold text-cyan-300 mt-1">
                        5² = 25
                      </div>
                    </div>

                    <div className="bg-amber-500/20 border border-amber-400 p-3 rounded-xl">
                      <span className="text-[10px] text-amber-200 block uppercase font-bold">
                        अंतिम उत्तर (Square)
                      </span>
                      <div className="text-2xl font-black text-amber-300 mt-1">
                        {sqEnds5Result}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Multiply 11 Simulator */}
              {activeTrick.interactiveType === 'multiply11' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>संख्या चुनें (× 11):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        {num11} × 11
                      </span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="98"
                      step="1"
                      value={num11}
                      onChange={(e) => setNum11(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>12</span>
                      <span>35</span>
                      <span>54</span>
                      <span>78</span>
                      <span>98</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs space-y-1 text-center sm:text-left">
                      <span className="text-slate-300 block">सैंडविच नियम:</span>
                      <div className="text-base font-mono text-cyan-300">
                        {firstDigit11} [ {firstDigit11} + {lastDigit11} ={' '}
                        {middleSum11} ] {lastDigit11}
                      </div>
                      {middleSum11 >= 10 && (
                        <span className="text-[11px] text-amber-300 font-bold block">
                          (हासिल 1 आगे जुड़कर {firstDigit11 + 1} बन गया)
                        </span>
                      )}
                    </div>

                    <div className="bg-emerald-500/20 border border-emerald-400 px-5 py-3 rounded-xl text-center">
                      <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                        अंतिम उत्तर
                      </span>
                      <div className="text-3xl font-black text-emerald-300">
                        {res11}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Base 100 Simulator */}
              {activeTrick.interactiveType === 'base100' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>पहली संख्या: {baseA}</span>
                        <span className="text-rose-400">100 से -{diffA}</span>
                      </div>
                      <input
                        type="range"
                        min="88"
                        max="99"
                        step="1"
                        value={baseA}
                        onChange={(e) => setBaseA(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>दूसरी संख्या: {baseB}</span>
                        <span className="text-rose-400">100 से -{diffB}</span>
                      </div>
                      <input
                        type="range"
                        min="88"
                        max="99"
                        step="1"
                        value={baseB}
                        onChange={(e) => setBaseB(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">
                        तिर्यक घटाव ({baseA} - {diffB})
                      </span>
                      <div className="text-xl font-black text-amber-300 mt-1">
                        {crossSub}
                      </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">
                        विचलनों का गुणा ({diffA} × {diffB})
                      </span>
                      <div className="text-xl font-black text-cyan-300 mt-1">
                        {prodDiff < 10 ? `0${prodDiff}` : prodDiff}
                      </div>
                    </div>
                    <div className="bg-amber-500/20 border border-amber-400 p-3 rounded-xl">
                      <span className="text-[10px] text-amber-200 block uppercase font-bold">
                        अंतिम उत्तर
                      </span>
                      <div className="text-2xl font-black text-amber-300 mt-1">
                        {resBase}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Multiply 99 Simulator */}
              {activeTrick.interactiveType === 'multiply99' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>संख्या चुनें (× 99):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        {num99} × 99
                      </span>
                    </div>
                    <input
                      type="range"
                      min="11"
                      max="98"
                      step="1"
                      value={num99}
                      onChange={(e) => setNum99(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">
                        बायाँ भाग ({num99} - 1)
                      </span>
                      <div className="text-xl font-black text-amber-300 mt-1">
                        {left99}
                      </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">
                        दायाँ भाग (99 - {left99})
                      </span>
                      <div className="text-xl font-black text-cyan-300 mt-1">
                        {right99 < 10 ? `0${right99}` : right99}
                      </div>
                    </div>
                    <div className="bg-emerald-500/20 border border-emerald-400 p-3 rounded-xl">
                      <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                        अंतिम उत्तर
                      </span>
                      <div className="text-2xl font-black text-emerald-300 mt-1">
                        {res99}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Fast Div 5 Simulator */}
              {activeTrick.interactiveType === 'fastDiv5' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>संख्या चुनें (÷ 5):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        {numDiv5} ÷ 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="950"
                      step="5"
                      value={numDiv5}
                      onChange={(e) => setNumDiv5(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs space-y-1">
                      <div className="text-slate-300">
                        1. संख्या का दोगुना: {numDiv5} × 2 ={' '}
                        <strong className="text-amber-300 font-bold">{doubledDiv5}</strong>
                      </div>
                      <div className="text-slate-300">
                        2. 10 से भाग (दशमलव लगाएँ): {doubledDiv5} ÷ 10 ={' '}
                        <strong className="text-cyan-300 font-bold">{resDiv5}</strong>
                      </div>
                    </div>

                    <div className="bg-emerald-500/20 border border-emerald-400 px-5 py-3 rounded-xl text-center">
                      <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                        अंतिम उत्तर
                      </span>
                      <div className="text-3xl font-black text-emerald-300">
                        {resDiv5}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Multiply 51 Simulator (User Requested: 51 * 42 = 2142) */}
              {activeTrick.interactiveType === 'multiply51' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>सम संख्या चुनें (× 51):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        51 × {num51}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="88"
                      step="2"
                      value={num51}
                      onChange={(e) => setNum51(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-500/20 border border-blue-400 p-3 rounded-xl">
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">
                        1. शुरू में संख्या का आधा (÷ 2)
                      </span>
                      <div className="text-2xl font-black text-blue-300 mt-1">
                        {num51} ÷ 2 = {half51}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        (शुरू में '{half51}')
                      </span>
                    </div>

                    <div className="bg-amber-500/20 border border-amber-400 p-3 rounded-xl">
                      <span className="text-[10px] text-amber-200 block uppercase font-bold">
                        2. अंत में वही संख्या
                      </span>
                      <div className="text-2xl font-black text-amber-300 mt-1">
                        {num51}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        (पीछे '{num51}')
                      </span>
                    </div>

                    <div className="bg-emerald-500/20 border border-emerald-400 p-3 rounded-xl">
                      <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                        3. दोनों को साथ जोड़ें
                      </span>
                      <div className="text-2xl font-black text-emerald-300 mt-1">
                        {res51}
                      </div>
                      <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">
                        {half51} + {num51} = {res51} ✓
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                    <span>
                      💡 <strong>गणितीय प्रमाण:</strong> 51 × {num51} = (50 × {num51}) + (1 × {num51}) = {50 * num51} + {num51}
                    </span>
                    <strong className="text-amber-300 font-mono text-sm">= {res51}</strong>
                  </div>
                </div>
              )}

              {/* 7. Multiply 21 Simulator (User Requested: 21 * 25 = 525) */}
              {activeTrick.interactiveType === 'multiply21' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>संख्या चुनें (× 21):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        21 × {num21}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="95"
                      step="5"
                      value={num21}
                      onChange={(e) => setNum21(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="bg-cyan-500/20 border border-cyan-400 p-3 rounded-xl">
                      <span className="text-[10px] text-cyan-200 block uppercase font-bold">
                        1. संख्या का 1/5 भाग (÷ 5)
                      </span>
                      <div className="text-2xl font-black text-cyan-300 mt-1">
                        {num21} ÷ 5 = {fifth21}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        (शुरू में '{fifth21}')
                      </span>
                    </div>

                    <div className="bg-amber-500/20 border border-amber-400 p-3 rounded-xl">
                      <span className="text-[10px] text-amber-200 block uppercase font-bold">
                        2. अंत में वही संख्या
                      </span>
                      <div className="text-2xl font-black text-amber-300 mt-1">
                        {num21}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        (पीछे '{num21}')
                      </span>
                    </div>

                    <div className="bg-emerald-500/20 border border-emerald-400 p-3 rounded-xl">
                      <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                        3. कुल उत्तर
                      </span>
                      <div className="text-2xl font-black text-emerald-300 mt-1">
                        {res21}
                      </div>
                      <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">
                        21 × {num21} = {res21} ✓
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                    <span>
                      💡 <strong>20N + N नियम:</strong> 20 × {num21} = {20 * num21} और + {num21} = {res21}
                    </span>
                    <strong className="text-cyan-300 font-mono text-sm">= {res21}</strong>
                  </div>
                </div>
              )}

              {/* 8. Multiply 101 Simulator */}
              {activeTrick.interactiveType === 'multiply101' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>2-अंकीय संख्या चुनें (× 101):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        {num101} × 101
                      </span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="98"
                      step="1"
                      value={num101}
                      onChange={(e) => setNum101(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs block">संख्या:</span>
                      <div className="text-3xl font-black text-amber-300 font-mono">
                        {num101}
                      </div>
                    </div>

                    <div className="text-2xl font-black text-slate-500">
                      ➡️ दो बार दोहराएँ ➡️
                    </div>

                    <div className="bg-emerald-500/20 border border-emerald-400 px-6 py-3 rounded-2xl">
                      <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                        अंतिम उत्तर
                      </span>
                      <div className="text-3xl font-black text-emerald-300 font-mono">
                        {res101}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        ({num101} और {num101} = {res101}!)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. Multiply 25 Simulator */}
              {activeTrick.interactiveType === 'multiply25' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>संख्या चुनें (× 25):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        {numMul25} × 25
                      </span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="96"
                      step="4"
                      value={numMul25}
                      onChange={(e) => setNumMul25(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">4 से भाग (÷ 4)</span>
                      <div className="text-2xl font-black text-amber-300 mt-1">
                        {numMul25} ÷ 4 = {div4Mul25}
                      </div>
                    </div>

                    <div className="text-2xl font-black text-slate-500">+ दो 00 +</div>

                    <div className="bg-emerald-500/20 border border-emerald-400 px-5 py-3 rounded-xl">
                      <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                        अंतिम उत्तर
                      </span>
                      <div className="text-3xl font-black text-emerald-300">
                        {resMul25}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 10. Multiply 5 Simulator */}
              {activeTrick.interactiveType === 'multiply5' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>संख्या चुनें (× 5):</span>
                      <span className="text-amber-300 font-extrabold text-sm">
                        {numMul5} × 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="98"
                      step="2"
                      value={numMul5}
                      onChange={(e) => setNumMul5(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">संख्या का आधा (÷ 2)</span>
                      <div className="text-2xl font-black text-amber-300 mt-1">
                        {numMul5} ÷ 2 = {halfMul5}
                      </div>
                    </div>

                    <div className="text-2xl font-black text-slate-500">+ एक 0 +</div>

                    <div className="bg-emerald-500/20 border border-emerald-400 px-5 py-3 rounded-xl">
                      <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                        अंतिम उत्तर
                      </span>
                      <div className="text-3xl font-black text-emerald-300">
                        {resMul5}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>स्टेप-बाई-स्टेप हल करने का तरीका:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeTrick.howItWorks.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="bg-amber-50/50 border border-amber-200/70 p-3.5 rounded-xl space-y-1 text-xs"
                  >
                    <span className="font-extrabold text-amber-900 block">
                      Step {step.stepNumber}: {step.stepTitle}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {step.explanation}
                    </p>
                    <div className="font-mono font-bold text-amber-800 bg-white/80 p-1.5 rounded border border-amber-200/50 text-[11px]">
                      {step.mathWork}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                <span className="font-bold text-amber-700 whitespace-nowrap">
                  🎯 असल जिंदगी में उपयोग:
                </span>
                <span className="text-slate-600 text-[11px]">
                  {activeTrick.realLifeUse}
                </span>
              </div>
            </div>

            {/* Quick Practice Challenge */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl p-5 border-2 border-amber-300 shadow-xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-xs uppercase tracking-wider">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>तुरंत आजमाओ (Speed Challenge Quiz):</span>
                </div>
                <span className="text-xs bg-amber-500 text-white font-black px-2.5 py-0.5 rounded-full">
                  +30 XP
                </span>
              </div>

              <div className="text-sm font-black text-slate-900">
                {currentQuiz.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {currentQuiz.options.map((opt, idx) => {
                  const isSelected = quizSelected === idx;
                  const isCorrect = idx === currentQuiz.correctIndex;
                  let btnClass = 'bg-white border-amber-200 text-slate-800 hover:bg-amber-100/60';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnClass = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                    } else if (isSelected) {
                      btnClass = 'bg-rose-500 text-white border-rose-600 font-bold';
                    }
                  } else if (isSelected) {
                    btnClass = 'bg-amber-500 text-slate-950 border-amber-600 font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3 rounded-xl border-2 text-center text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${btnClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Actions & Feedback */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
                <span className="text-amber-900 font-medium text-[11px]">
                  💡 <strong>संकेत:</strong> {currentQuiz.hint}
                </span>

                {!quizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={quizSelected === null}
                    className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-black px-5 py-2 rounded-xl text-xs cursor-pointer shadow-sm transition-all"
                  >
                    उत्तर जाँचें
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>अगला सवाल</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {quizSubmitted && (
                <div className="bg-white/90 p-3 rounded-xl border border-amber-300 text-xs text-slate-800 animate-fade-in flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <strong>माइंड टिप:</strong> {currentQuiz.mentalTip}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

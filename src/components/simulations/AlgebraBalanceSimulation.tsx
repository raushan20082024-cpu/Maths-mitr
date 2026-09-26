import React, { useState } from 'react';
import { Scale, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export const AlgebraBalanceSimulation: React.FC = () => {
  // Equation: 2x + 4 = 16  => x = 6
  const [a] = useState<number>(2);
  const [b] = useState<number>(4);
  const [c] = useState<number>(16);
  const [xGuess, setXGuess] = useState<number>(3);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const leftWeight = a * xGuess + b;
  const rightWeight = c;
  const isBalanced = leftWeight === rightWeight;
  const difference = leftWeight - rightWeight;

  // Beam tilt angle: limit between -15deg and +15deg
  const tiltDeg = Math.max(-15, Math.min(15, difference * 2));

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border-2 border-indigo-400/30 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-amber-300">
              बीजगणित भौतिक तराजू लैब (Algebra Balance Scale Lab)
            </h3>
            <p className="text-[11px] text-slate-300">
              रैखिक समीकरण (Linear Equation) का मतलब है दोनों पलड़ों को बराबर रखना!
            </p>
          </div>
        </div>
        <div className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-xl text-xs font-mono font-bold">
          समीकरण: 2x + 4 = 16
        </div>
      </div>

      {/* The Visual Balance Scale */}
      <div className="bg-slate-950/70 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative min-h-[220px]">
        {/* Support Pillar */}
        <div className="w-3 h-28 bg-slate-500 rounded-t-sm absolute bottom-8 z-0"></div>
        <div className="w-24 h-4 bg-slate-600 rounded-md absolute bottom-4 z-0"></div>

        {/* Pivot Fulcrum */}
        <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white absolute top-12 z-20 shadow-md"></div>

        {/* Tilting Beam */}
        <div
          className="w-72 sm:w-96 h-2.5 bg-amber-500 rounded-full relative z-10 transition-transform duration-300 ease-out origin-center flex items-center justify-between px-2"
          style={{ transform: `rotate(${tiltDeg}deg)` }}
        >
          {/* Left Pan Hanging Wire & Pan */}
          <div className="flex flex-col items-center -mt-2">
            <div className="w-0.5 h-14 bg-slate-400"></div>
            <div className="w-28 sm:w-32 bg-indigo-900 border-2 border-indigo-400 rounded-b-2xl p-2 text-center shadow-lg -mt-1">
              <span className="text-[10px] text-indigo-200 block font-bold">बायाँ पलड़ा (Left)</span>
              <div className="text-xs font-mono font-black text-amber-300">
                2({xGuess}) + 4 = {leftWeight} kg
              </div>
              <div className="text-[9px] text-slate-300 mt-0.5">
                2x (अज्ञात) + 4 वाट
              </div>
            </div>
          </div>

          {/* Right Pan Hanging Wire & Pan */}
          <div className="flex flex-col items-center -mt-2">
            <div className="w-0.5 h-14 bg-slate-400"></div>
            <div className="w-28 sm:w-32 bg-emerald-900 border-2 border-emerald-400 rounded-b-2xl p-2 text-center shadow-lg -mt-1">
              <span className="text-[10px] text-emerald-200 block font-bold">दायाँ पलड़ा (Right)</span>
              <div className="text-xs font-mono font-black text-emerald-300">
                16 kg (स्थिर भार)
              </div>
              <div className="text-[9px] text-slate-300 mt-0.5">
                कुल 16 वाट
              </div>
            </div>
          </div>
        </div>

        {/* Balance Status indicator */}
        <div className="mt-20 z-10">
          {isBalanced ? (
            <div className="bg-emerald-500 text-slate-950 font-black px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-lg animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>वाह! तराजू एकदम संतुलित है! x = {xGuess} सही उत्तर है! 🎉</span>
            </div>
          ) : (
            <div className="bg-amber-500/20 text-amber-300 border border-amber-400 px-3 py-1 rounded-full text-xs font-bold">
              {leftWeight < rightWeight
                ? `बायाँ पलड़ा हल्का है (कम है)! x को बढ़ाइए।`
                : `बायाँ पलड़ा भारी है! x को कम कीजिए।`}
            </div>
          )}
        </div>
      </div>

      {/* Slider for x */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-amber-300">अज्ञात चर "x" का मान बदलें: {xGuess}</span>
          <span className={isBalanced ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}>
            समीकरण: 2({xGuess}) + 4 = {leftWeight} vs 16
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="12"
          step="1"
          value={xGuess}
          onChange={(e) => setXGuess(Number(e.target.value))}
          className="w-full accent-amber-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>x = 1</span>
          <span>x = 6 (संतुलन बिंदु)</span>
          <span>x = 12</span>
        </div>
      </div>

      {/* Step-by-step algebraic simplification */}
      <div className="bg-indigo-950/60 border border-indigo-400/40 p-4 rounded-xl space-y-2 text-xs">
        <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          समीकरण को गणितीय तरीके से कैसे हल करते हैं?
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
          <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 space-y-1">
            <span className="font-bold text-indigo-300 block">Step 1: दोनों तरफ से 4 घटाएँ</span>
            <div className="font-mono text-slate-200">2x + 4 - 4 = 16 - 4</div>
            <div className="font-mono text-emerald-300 font-bold">2x = 12</div>
          </div>

          <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 space-y-1">
            <span className="font-bold text-indigo-300 block">Step 2: दोनों तरफ 2 से भाग दें</span>
            <div className="font-mono text-slate-200">2x ÷ 2 = 12 ÷ 2</div>
            <div className="font-mono text-emerald-300 font-bold">x = 6</div>
          </div>

          <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 space-y-1">
            <span className="font-bold text-amber-300 block">Step 3: उत्तर की जाँच</span>
            <div className="font-mono text-slate-200">2 × 6 + 4 = 12 + 4 = 16</div>
            <div className="font-bold text-emerald-400">LHS = RHS (सत्यापित!)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

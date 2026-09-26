import React, { useState } from 'react';
import { Thermometer, Landmark, ArrowRight, Sparkles, RefreshCw, Compass } from 'lucide-react';

export const NumberLineSimulation: React.FC = () => {
  const [mode, setMode] = useState<'temp' | 'bank' | 'numberline'>('numberline');
  const [numA, setNumA] = useState<number>(-3);
  const [numB, setNumB] = useState<number>(5);
  const [operation, setOperation] = useState<'+' | '-'>('+');

  // Banking state
  const [balance, setBalance] = useState<number>(500);
  const [amount, setAmount] = useState<number>(300);
  const [actionType, setActionType] = useState<'deposit' | 'withdraw'>('withdraw');

  // Temperature state
  const [tempBase, setTempBase] = useState<number>(-4); // Siachen
  const [tempChange, setTempChange] = useState<number>(9);

  const calculateResult = () => {
    return operation === '+' ? numA + numB : numA - numB;
  };
  const result = calculateResult();

  const finalTemp = tempBase + tempChange;
  const finalBalance = actionType === 'deposit' ? balance + amount : balance - amount;

  // Number line ticks (-10 to 10)
  const ticks = Array.from({ length: 21 }, (_, i) => i - 10);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border-2 border-indigo-400/30 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔢</span>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-amber-300">
              संख्या पद्धति लैब: संख्या रेखा और पूर्णांक (Integers & Number Line)
            </h3>
            <p className="text-[11px] text-slate-300">
              धनात्मक (+) और ऋणात्मक (-) संख्याओं को असल जिंदगी से समझें
            </p>
          </div>
        </div>

        {/* Mode selector */}
        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl text-xs">
          <button
            onClick={() => setMode('numberline')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'numberline' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            संख्या रेखा (Number Line)
          </button>
          <button
            onClick={() => setMode('temp')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'temp' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            🌡️ तापमान (Weather)
          </button>
          <button
            onClick={() => setMode('bank')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'bank' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            🏦 बैंक पासबुक (Banking)
          </button>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE NUMBER LINE */}
      {mode === 'numberline' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">
                प्रारंभिक संख्या (Number 1): {numA}
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                value={numA}
                onChange={(e) => setNumA(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">शुरुआती बिंदु तय करें</span>
            </div>

            <div className="text-center">
              <label className="text-xs font-bold text-slate-300 block mb-1">चिह्न (Operation)</label>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setOperation('+')}
                  className={`w-10 h-9 rounded-xl font-black text-lg transition-all cursor-pointer ${
                    operation === '+' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  +
                </button>
                <button
                  onClick={() => setOperation('-')}
                  className={`w-10 h-9 rounded-xl font-black text-lg transition-all cursor-pointer ${
                    operation === '-' ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  -
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-cyan-300 block mb-1">
                दूसरी संख्या (Number 2): {numB}
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                value={numB}
                onChange={(e) => setNumB(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">कदमों की संख्या</span>
            </div>
          </div>

          {/* Interactive Visual Number Line */}
          <div className="bg-indigo-950/70 border border-indigo-400/40 rounded-xl p-4 overflow-x-auto">
            <div className="text-xs font-bold text-indigo-200 mb-2 flex items-center justify-between">
              <span>⬅️ ऋणात्मक (Negative) बाईं ओर</span>
              <span className="text-amber-300 font-extrabold">0 (शून्य केंद्र)</span>
              <span>धनात्मक (Positive) दाईं ओर ➡️</span>
            </div>

            {/* The SVG number line */}
            <div className="min-w-[620px] py-4 relative">
              {/* Line */}
              <div className="h-1.5 bg-slate-600 rounded-full relative w-full">
                {/* Zero marker line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-5 bg-amber-400 rounded-xs z-10"></div>
              </div>

              {/* Ticks and Numbers */}
              <div className="flex justify-between relative mt-2 text-[11px] font-mono">
                {ticks.map((t) => {
                  const isZero = t === 0;
                  const isStart = t === numA;
                  const isEnd = t === result;
                  return (
                    <div key={t} className="flex flex-col items-center">
                      <div
                        className={`w-0.5 h-2 ${
                          isZero ? 'bg-amber-400 h-3.5 w-1' : isStart ? 'bg-cyan-400 h-3' : 'bg-slate-500'
                        }`}
                      ></div>
                      <span
                        className={`mt-1 ${
                          isZero
                            ? 'text-amber-300 font-black text-xs'
                            : isEnd
                            ? 'text-emerald-400 font-black scale-110'
                            : isStart
                            ? 'text-cyan-300 font-bold'
                            : 'text-slate-400'
                        }`}
                      >
                        {t}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Highlights for numA and result */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
                <span className="bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-2.5 py-1 rounded-lg">
                  📍 शुरुआत बिंदु: {numA}
                </span>
                <span className="bg-white/10 text-slate-300 px-2.5 py-1 rounded-lg">
                  दिशा: {operation === '+' ? 'दाएँ चलिए ➡️ (+ जोड़ना)' : 'बाएँ चलिए ⬅️ (- घटाना)'} ({Math.abs(numB)} कदम)
                </span>
                <span className="bg-emerald-500/20 border border-emerald-400 text-emerald-300 px-3 py-1 rounded-lg text-sm font-black">
                  🎯 अंतिम उत्तर = {result}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-slate-300 space-y-1">
            <span className="text-amber-300 font-bold block">💡 गणित का सुनहरा नियम:</span>
            <p>
              जब हम धनात्मक जोड़ते हैं, तो दाएँ जाते हैं। जब ऋणात्मक जोड़ते हैं (या घटाते हैं), तो बाएँ जाते हैं!
              जैसे: <strong>({numA}) {operation} ({numB}) = {result}</strong>
            </p>
          </div>
        </div>
      )}

      {/* MODE 2: TEMPERATURE */}
      {mode === 'temp' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">
                सुबह का तापमान: {tempBase}°C {tempBase < 0 ? '(बर्फ जमने से नीचे! ❄️)' : '☀️'}
              </label>
              <input
                type="range"
                min="-15"
                max="10"
                value={tempBase}
                onChange={(e) => setTempBase(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">-15°C (सियाचिन/लद्दाख) से +10°C</span>
            </div>

            <div>
              <label className="text-xs font-bold text-emerald-300 block mb-1">
                दोपहर में तापमान में वृद्धि: +{tempChange}°C
              </label>
              <input
                type="range"
                min="1"
                max="25"
                value={tempChange}
                onChange={(e) => setTempChange(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">धूप निकलने पर कितना बढ़ा</span>
            </div>
          </div>

          <div className="bg-indigo-950/70 border border-indigo-400/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 text-2xl font-black">
                🌡️
              </div>
              <div>
                <span className="text-xs text-slate-300">दोपहर का वर्तमान तापमान:</span>
                <div className={`text-3xl font-black ${finalTemp >= 0 ? 'text-emerald-400' : 'text-cyan-300'}`}>
                  {finalTemp > 0 ? `+${finalTemp}` : finalTemp}°C
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-3 rounded-xl text-xs space-y-1 text-slate-200">
              <div><strong>गणितीय समीकरण:</strong> ({tempBase}) + ({tempChange}) = {finalTemp}°C</div>
              <p className="text-[11px] text-slate-300">
                {tempBase < 0 && finalTemp >= 0
                  ? 'तापमान 0°C पार कर चुका है! बर्फ पिघलना शुरू हो जाएगी।'
                  : tempBase < 0 && finalTemp < 0
                  ? 'अभी भी तापमान शून्य से नीचे है, सर्दी बरकरार है!'
                  : 'सुहावना मौसम है!'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: BANKING (CREDIT & DEBIT) */}
      {mode === 'bank' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                खाते में पहले से जमा बैलेंस: ₹{balance}
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">
                लेन-देन का प्रकार (Transaction Type):
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setActionType('deposit')}
                  className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    actionType === 'deposit'
                      ? 'bg-emerald-600 text-white border-2 border-emerald-400'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  ➕ जमा (+ Deposit)
                </button>
                <button
                  onClick={() => setActionType('withdraw')}
                  className={`flex-1 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    actionType === 'withdraw'
                      ? 'bg-rose-600 text-white border-2 border-rose-400'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  ➖ निकासी (- Withdraw)
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              राशि (Amount): ₹{amount}
            </label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="bg-indigo-950/70 border border-indigo-400/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-300 block">नया बैंक खाता बैलेंस:</span>
              <div
                className={`text-3xl font-black ${
                  finalBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                ₹{finalBalance} {finalBalance < 0 && '(ओवरड्राफ्ट / कर्ज! ⚠️)'}
              </div>
            </div>

            <div className="bg-white/10 p-3 rounded-xl text-xs space-y-1 text-slate-200">
              <div>
                <strong>हिसाब:</strong> ₹{balance} {actionType === 'deposit' ? `+ ₹${amount}` : `- ₹${amount}`} = ₹{finalBalance}
              </div>
              <p className="text-[11px] text-slate-300">
                जमा को धनात्मक (+ve) और निकासी को ऋणात्मक (-ve) से दर्शाते हैं।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

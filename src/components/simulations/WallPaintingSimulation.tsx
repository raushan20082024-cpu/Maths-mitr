import React, { useState } from 'react';
import { Sparkles, Paintbrush, Square } from 'lucide-react';

interface WallPaintingSimulationProps {
  initialLength?: number;
  initialHeight?: number;
}

export const WallPaintingSimulation: React.FC<WallPaintingSimulationProps> = ({
  initialLength = 5,
  initialHeight = 3,
}) => {
  const [length, setLength] = useState<number>(initialLength);
  const [height, setHeight] = useState<number>(initialHeight);
  const [hasDoor, setHasDoor] = useState<boolean>(false);

  // Door is 2m x 1m = 2m²
  const doorArea = hasDoor ? 2 : 0;
  const rawArea = length * height;
  const netArea = Math.max(0, rawArea - doorArea);
  // 1 Liter paint covers 15 m²
  const paintLiters = (netArea / 15).toFixed(2);
  const cansNeeded = Math.ceil(netArea / 15);

  return (
    <div className="bg-white rounded-2xl border-2 border-rose-200/80 shadow-md p-5 my-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 font-bold rounded-full text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> क्षेत्रमिति लैब (Wall Painting Lab)
          </span>
          <h4 className="text-lg font-bold text-slate-800 mt-1">
            कमरे की दीवार का क्षेत्रफल और पेंट कैलकुलेटर
          </h4>
        </div>
        <button
          onClick={() => setHasDoor(!hasDoor)}
          className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
            hasDoor
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-slate-100 text-slate-700 border-slate-300'
          }`}
        >
          {hasDoor ? '🚪 दरवाजा हटाएँ' : '🚪 दरवाजा जोड़ें (2m × 1m)'}
        </button>
      </div>

      {/* Visual Wall Canvas */}
      <div className="bg-slate-100 p-5 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
        {/* Dimension labels */}
        <div className="text-xs font-bold text-rose-700 mb-1 bg-white px-2 py-0.5 rounded border border-rose-200">
          लंबाई (Length) = {length} मीटर
        </div>

        <div className="flex items-center gap-2 w-full max-w-md justify-center">
          <div className="text-xs font-bold text-rose-700 -rotate-90 whitespace-nowrap bg-white px-2 py-0.5 rounded border border-rose-200">
            ऊँचाई = {height} m
          </div>

          {/* Wall block */}
          <div
            className="bg-gradient-to-br from-rose-200 to-pink-300 border-4 border-rose-400 rounded-lg p-3 relative flex items-center justify-center shadow-inner transition-all duration-300"
            style={{
              width: `${Math.min(length * 40, 320)}px`,
              height: `${Math.min(height * 45, 180)}px`,
            }}
          >
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Door inside if enabled */}
            {hasDoor && (
              <div className="absolute bottom-0 left-6 w-12 h-20 bg-amber-800 border-2 border-amber-950 rounded-t flex flex-col items-center justify-center text-[10px] text-amber-100 font-bold shadow-md">
                दरवाजा
                <span className="text-[9px]">2m²</span>
              </div>
            )}

            <div className="text-center bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-rose-200 shadow-sm z-10">
              <span className="text-xs text-slate-600 block">पेंट होने वाला क्षेत्रफल</span>
              <span className="text-xl font-black text-rose-700">
                {netArea} m²
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
            <span>दीवार की लंबाई (Length):</span>
            <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded text-xs">
              {length} मीटर
            </span>
          </div>
          <input
            type="range"
            min="3"
            max="8"
            step="1"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
            <span>दीवार की ऊँचाई (Height):</span>
            <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded text-xs">
              {height} मीटर
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="5"
            step="1"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Paint Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 text-xs sm:text-sm">
          <div className="font-semibold text-rose-900 mb-1 flex items-center gap-1.5">
            <Square className="w-4 h-4 text-rose-600" /> क्षेत्रफल की गणना:
          </div>
          <div className="text-slate-700 font-mono space-y-0.5">
            <p>कुल क्षेत्रफल = {length}m × {height}m = {rawArea} m²</p>
            {hasDoor && <p className="text-amber-700">- दरवाजा = 2 m²</p>}
            <p className="font-bold text-rose-700 pt-1 border-t border-rose-200">
              नेट क्षेत्रफल = {netArea} वर्ग मीटर (m²)
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs sm:text-sm">
          <div className="font-semibold text-emerald-900 mb-1 flex items-center gap-1.5">
            <Paintbrush className="w-4 h-4 text-emerald-600" /> आवश्यक पेंट की मात्रा:
          </div>
          <div className="text-slate-700 font-mono space-y-0.5">
            <p>1 लीटर पेंट का कवरेज = 15 m²</p>
            <p>पेंट = {netArea} ÷ 15 = {paintLiters} लीटर</p>
            <p className="font-bold text-emerald-700 pt-1 border-t border-emerald-200">
              बाजार से डिब्बे चाहिए = {cansNeeded} डिब्बा ({cansNeeded} लीटर)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

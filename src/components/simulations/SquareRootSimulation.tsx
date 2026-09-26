import React, { useState } from 'react';
import { Grid, Sparkles, ShieldAlert, Award } from 'lucide-react';

export const SquareRootSimulation: React.FC = () => {
  const [tab, setTab] = useState<'tiles' | 'pythagoras'>('tiles');

  // Tiles state
  const [sideLength, setSideLength] = useState<number>(6); // 6x6 = 36 tiles
  const totalTiles = sideLength * sideLength;

  // Pythagoras state: ladder on wall
  const [wallHeight, setWallHeight] = useState<number>(4); // meters (लम्ब)
  const [baseDistance, setBaseDistance] = useState<number>(3); // meters (आधार)
  const ladderLengthSquared = wallHeight * wallHeight + baseDistance * baseDistance;
  const ladderLength = Math.sqrt(ladderLengthSquared).toFixed(2);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border-2 border-amber-400/30 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🟧</span>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-amber-300">
              वर्ग एवं वर्गमूल लैब (Square & Square Roots Lab)
            </h3>
            <p className="text-[11px] text-slate-300">
              चौकोर टाइल्स की व्यवस्था और पाइथागोरस प्रमेय का लाइव दृश्य
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl text-xs">
          <button
            onClick={() => setTab('tiles')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              tab === 'tiles' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            चौकोर टाइल्स (Area = n²)
          </button>
          <button
            onClick={() => setTab('pythagoras')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              tab === 'pythagoras' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            📐 पाइथागोरस सीढ़ी (a² + b² = c²)
          </button>
        </div>
      </div>

      {/* TAB 1: SQUARE TILES GRID */}
      {tab === 'tiles' && (
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-amber-300">कमरे की एक भुजा (Side Length): {sideLength} मीटर</span>
              <span className="text-emerald-300">कुल वर्ग टाइल्स: {totalTiles}</span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={sideLength}
              onChange={(e) => setSideLength(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>2×2 = 4</span>
              <span>6×6 = 36</span>
              <span>12×12 = 144</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Visual Grid */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center min-h-[200px]">
              <div
                className="grid gap-1 p-2 bg-amber-950/40 rounded-lg border border-amber-500/30 max-w-[220px] max-h-[220px]"
                style={{
                  gridTemplateColumns: `repeat(${sideLength}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: totalTiles }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-amber-400/80 hover:bg-amber-300 rounded-xs border border-amber-600 transition-colors shadow-xs"
                    title={`Tile #${i + 1}`}
                  ></div>
                ))}
              </div>
              <span className="text-[11px] text-slate-400 mt-2">
                {sideLength} कतारें × {sideLength} कॉलम = {totalTiles} टाइल्स
              </span>
            </div>

            {/* Math Explanation Card */}
            <div className="bg-indigo-950/60 border border-indigo-400/40 p-4 rounded-xl space-y-2.5 text-xs text-slate-200">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                वर्ग और वर्गमूल का आपसी संबंध:
              </div>
              <p>
                <strong>1. वर्ग (Square):</strong> {sideLength}² = {sideLength} × {sideLength} ={' '}
                <span className="text-amber-300 font-extrabold text-sm">{totalTiles}</span>
              </p>
              <p>
                <strong>2. वर्गमूल (Square Root):</strong> √{totalTiles} ={' '}
                <span className="text-emerald-300 font-extrabold text-sm">{sideLength}</span>
              </p>
              <div className="bg-white/10 p-2.5 rounded-lg text-[11px] text-slate-300">
                <strong>रियल-लाइफ सीख:</strong> अगर आपको 36 टाइल्स वाला चौकोर कमरा बनाना है, तो कमरे की
                हर दीवार ठीक 6 टाइल्स लंबी होनी चाहिए!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PYTHAGORAS LADDER */}
      {tab === 'pythagoras' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">
                दीवार की ऊँचाई (लम्ब / Perpendicular a): {wallHeight} मीटर
              </label>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={wallHeight}
                onChange={(e) => setWallHeight(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-cyan-300 block mb-1">
                दीवार से सीढ़ी की जमीन पर दूरी (आधार / Base b): {baseDistance} मीटर
              </label>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={baseDistance}
                onChange={(e) => setBaseDistance(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Pythagoras Result Display */}
          <div className="bg-indigo-950/70 border border-indigo-400/40 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs text-slate-300">सीढ़ी की आवश्यक लंबाई (कर्ण / Hypotenuse c):</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                {ladderLength} मीटर
              </div>
              <div className="text-xs font-mono text-slate-300">
                c = √({wallHeight}² + {baseDistance}²) = √({wallHeight * wallHeight} + {baseDistance * baseDistance}) = √{ladderLengthSquared}
              </div>
            </div>

            <div className="bg-white/10 p-3 rounded-xl text-xs space-y-1 max-w-xs text-slate-200">
              <strong className="text-amber-300 block font-bold">पाइथागोरस सूत्र (Pythagoras Formula):</strong>
              <div>कर्ण² = लम्ब² + आधार²</div>
              <div className="text-[11px] text-slate-300">
                c² = a² + b² → c = √(a² + b²)
              </div>
              <div className="text-[11px] text-emerald-300 font-bold mt-1">
                सुरक्षित सीढ़ी के लिए 4m ऊँची दीवार और 3m दूरी पर ठीक 5m लंबी सीढ़ी चाहिए (3-4-5 त्रिक)!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

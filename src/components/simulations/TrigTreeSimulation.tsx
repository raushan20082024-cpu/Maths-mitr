import React, { useState } from 'react';
import { Eye, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

interface TrigTreeSimulationProps {
  initialDistance?: number;
  initialAngle?: number;
}

export const TrigTreeSimulation: React.FC<TrigTreeSimulationProps> = ({
  initialDistance = 10,
  initialAngle = 45,
}) => {
  const [distance, setDistance] = useState<number>(initialDistance);
  const [angle, setAngle] = useState<number>(initialAngle);
  const [showHelper, setShowHelper] = useState<boolean>(true);

  // Tan(theta in radians)
  const angleRad = (angle * Math.PI) / 180;
  const tanVal = Math.tan(angleRad);
  const calculatedHeight = distance * tanVal;

  // SVG coordinate calculations (scaled)
  const svgWidth = 600;
  const svgHeight = 320;
  const groundY = 270;
  const studentX = 80;
  const treeX = Math.min(studentX + distance * 15, 520);
  const treeTopY = Math.max(groundY - calculatedHeight * 15, 40);

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-200/80 shadow-md p-5 my-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 pb-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 font-bold rounded-full text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> इंटरैक्टिव लैब (Interactive Lab)
          </span>
          <h4 className="text-lg font-bold text-slate-800 mt-1">
            पेड़ की ऊँचाई का लाइव सिम्युलेटर
          </h4>
        </div>
        <button
          onClick={() => setShowHelper(!showHelper)}
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg transition-colors font-medium"
        >
          <Eye className="w-3.5 h-3.5" />
          {showHelper ? 'त्रिभुज छिपाएँ' : 'त्रिभुज दिखाएँ'}
        </button>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="bg-gradient-to-b from-sky-50 to-amber-50/50 rounded-xl p-3 border border-sky-100 relative">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[280px]"
        >
          {/* Sky elements */}
          <circle cx="530" cy="50" r="28" fill="#FDE047" opacity="0.8" />
          <circle cx="530" cy="50" r="36" fill="#FEF08A" opacity="0.3" />

          {/* Ground */}
          <rect x="0" y={groundY} width={svgWidth} height={svgHeight - groundY} fill="#86EFAC" />
          <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} stroke="#15803D" strokeWidth="3" />

          {/* Student Figure */}
          <g transform={`translate(${studentX - 15}, ${groundY - 60})`}>
            {/* Body */}
            <circle cx="15" cy="10" r="8" fill="#F59E0B" />
            <line x1="15" y1="18" x2="15" y2="40" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <line x1="15" y1="26" x2="5" y2="35" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="26" x2="25" y2="35" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="40" x2="8" y2="60" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <line x1="15" y1="40" x2="22" y2="60" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <text x="15" y="-6" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
              आप (Observer)
            </text>
          </g>

          {/* Tree */}
          <g>
            {/* Trunk */}
            <rect
              x={treeX - 10}
              y={treeTopY + 20}
              width="20"
              height={groundY - (treeTopY + 20)}
              fill="#92400E"
              rx="4"
            />
            {/* Foliage */}
            <ellipse
              cx={treeX}
              cy={treeTopY + 25}
              rx="34"
              ry="38"
              fill="#16A34A"
            />
            <ellipse
              cx={treeX - 18}
              cy={treeTopY + 38}
              rx="24"
              ry="26"
              fill="#22C55E"
            />
            <ellipse
              cx={treeX + 18}
              cy={treeTopY + 38}
              rx="24"
              ry="26"
              fill="#15803D"
            />
            <circle
              cx={treeX}
              cy={treeTopY}
              r="22"
              fill="#4ADE80"
            />
            <text x={treeX} y={treeTopY - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803D">
              पेड़ की चोटी (Top)
            </text>
          </g>

          {/* Right Triangle Overlay */}
          {showHelper && (
            <g>
              {/* Base line (Distance) */}
              <line
                x1={studentX}
                y1={groundY}
                x2={treeX}
                y2={groundY}
                stroke="#2563EB"
                strokeWidth="3"
                strokeDasharray="4 4"
              />
              {/* Perpendicular Height line */}
              <line
                x1={treeX}
                y1={groundY}
                x2={treeX}
                y2={treeTopY}
                stroke="#DC2626"
                strokeWidth="3"
              />
              {/* Hypotenuse / Line of sight */}
              <line
                x1={studentX}
                y1={groundY}
                x2={treeX}
                y2={treeTopY}
                stroke="#D97706"
                strokeWidth="3"
              />

              {/* Right angle marker at tree base */}
              <path
                d={`M ${treeX - 14} ${groundY} L ${treeX - 14} ${groundY - 14} L ${treeX} ${groundY - 14}`}
                fill="none"
                stroke="#64748B"
                strokeWidth="2"
              />

              {/* Angle Arc at student */}
              <path
                d={`M ${studentX + 35} ${groundY} A 35 35 0 0 0 ${studentX + 35 * Math.cos(angleRad)} ${groundY - 35 * Math.sin(angleRad)}`}
                fill="none"
                stroke="#D97706"
                strokeWidth="2.5"
              />
              <text
                x={studentX + 45}
                y={groundY - 12}
                fontSize="12"
                fontWeight="bold"
                fill="#B45309"
              >
                θ = {angle}°
              </text>

              {/* Distance label */}
              <text
                x={(studentX + treeX) / 2}
                y={groundY + 20}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="#1D4ED8"
              >
                आधार (Distance) = {distance} m
              </text>

              {/* Height label */}
              <text
                x={treeX + 16}
                y={(groundY + treeTopY) / 2}
                fontSize="13"
                fontWeight="bold"
                fill="#DC2626"
              >
                लम्ब (ऊँचाई) = {calculatedHeight.toFixed(1)} m
              </text>
            </g>
          )}
        </svg>

        {/* 45 Degree Special Callout */}
        {angle === 45 && (
          <div className="absolute top-3 left-3 bg-amber-500/90 text-white text-xs px-3 py-1.5 rounded-lg shadow font-medium flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4" />
            <span>45° पर: ऊँचाई और दूरी बिल्कुल बराबर (1 : 1) होती हैं!</span>
          </div>
        )}
      </div>

      {/* Sliders & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
            <span className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-blue-600" /> पेड़ से दूरी (Distance):
            </span>
            <span className="text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded text-xs">
              {distance} मीटर
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="25"
            step="1"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>5m (पास)</span>
            <span>15m</span>
            <span>25m (दूर)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
            <span className="flex items-center gap-1.5">
              📐 उन्नयन कोण (Angle of Elevation):
            </span>
            <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded text-xs">
              {angle}° {angle === 45 && '★ (Special)'}
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="65"
            step="5"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>20°</span>
            <span>30°</span>
            <span>45°</span>
            <span>60°</span>
          </div>
        </div>
      </div>

      {/* Live Calculation Box */}
      <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-sm">
        <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
          <span>💡 लाइव गणना (Live Calculation):</span>
        </div>
        <div className="font-mono text-slate-700 text-xs sm:text-sm bg-white p-2.5 rounded-lg border border-amber-100 space-y-1">
          <p>tan({angle}°) = ऊँचाई (Height) ÷ {distance} m</p>
          <p>
            {tanVal.toFixed(3)} = ऊँचाई ÷ {distance}
          </p>
          <p className="text-emerald-700 font-bold text-sm sm:text-base pt-1 border-t border-slate-100">
            👉 ऊँचाई (Height) = {distance} × {tanVal.toFixed(3)} = <span className="bg-emerald-100 px-1.5 py-0.5 rounded">{calculatedHeight.toFixed(1)} मीटर</span>
          </p>
        </div>
      </div>
    </div>
  );
};

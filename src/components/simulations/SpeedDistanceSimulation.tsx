import React, { useState } from 'react';
import { Sparkles, Bike, Clock, Navigation } from 'lucide-react';

interface SpeedDistanceSimulationProps {
  initialDistance?: number;
  initialSpeed?: number;
}

export const SpeedDistanceSimulation: React.FC<SpeedDistanceSimulationProps> = ({
  initialDistance = 6,
  initialSpeed = 12,
}) => {
  const [distance, setDistance] = useState<number>(initialDistance);
  const [speed, setSpeed] = useState<number>(initialSpeed);

  // Time in hours and minutes
  const timeInHours = distance / speed;
  const timeInMinutes = Math.round(timeInHours * 60);

  // Departure calculation assuming 8:00 AM school prayer
  // 8:00 AM minus timeInMinutes
  const schoolHour = 8;
  const schoolMinute = 0;
  const totalMinutes = schoolHour * 60 + schoolMinute - timeInMinutes;
  const depHour = Math.floor(totalMinutes / 60);
  const depMinute = totalMinutes % 60;
  const depFormatted = `${depHour}:${depMinute < 10 ? '0' : ''}${depMinute} AM`;

  return (
    <div className="bg-white rounded-2xl border-2 border-violet-200/80 shadow-md p-5 my-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-100 pb-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-100 text-violet-800 font-bold rounded-full text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> स्पीड लैब (Speed & Time Lab)
          </span>
          <h4 className="text-lg font-bold text-slate-800 mt-1">
            साइकिल से स्कूल की यात्रा: समय का कैलकुलेटर
          </h4>
        </div>
        <div className="text-xs bg-violet-50 text-violet-800 px-3 py-1 rounded-full font-semibold border border-violet-200">
          घंटी बजने से पहले पहुँचो 🔔
        </div>
      </div>

      {/* Animated Road Visual */}
      <div className="bg-slate-800 rounded-xl p-4 relative overflow-hidden text-white">
        <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
          <span>🏠 घर (Start: 0 km)</span>
          <span className="text-amber-400 font-bold">सड़क (दूरी = {distance} km)</span>
          <span>🏫 स्कूल (Goal: 8:00 AM)</span>
        </div>

        {/* Road line with dashes */}
        <div className="h-10 bg-slate-700 rounded-lg relative flex items-center px-4 overflow-hidden border border-slate-600">
          <div className="absolute inset-x-0 h-0.5 border-t-2 border-dashed border-amber-300/60"></div>

          {/* Cyclist moving */}
          <div
            className="relative z-10 transition-all duration-500 flex items-center gap-1"
            style={{
              left: `${Math.min(90, Math.max(5, (distance / 20) * 80))}%`,
            }}
          >
            <div className="bg-violet-600 text-white p-1.5 rounded-full shadow-lg border border-violet-300">
              <Bike className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-[10px] bg-slate-900/80 px-1.5 py-0.5 rounded font-bold text-amber-300">
              {speed} km/h
            </span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
            <span className="flex items-center gap-1">
              <Navigation className="w-4 h-4 text-violet-600" /> दूरी (Distance):
            </span>
            <span className="text-violet-700 font-bold bg-violet-100 px-2 py-0.5 rounded text-xs">
              {distance} किलोमीटर
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="18"
            step="1"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-violet-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>2 km</span>
            <span>6 km (उदाहरण)</span>
            <span>18 km</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
            <span className="flex items-center gap-1">
              <Bike className="w-4 h-4 text-violet-600" /> साइकिल की चाल (Speed):
            </span>
            <span className="text-violet-700 font-bold bg-violet-100 px-2 py-0.5 rounded text-xs">
              {speed} किमी/घंटा
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="24"
            step="2"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-violet-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>6 km/h (धीमी)</span>
            <span>12 km/h (सामान्य)</span>
            <span>24 km/h (तेज)</span>
          </div>
        </div>
      </div>

      {/* Live Calculation Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <div className="bg-violet-50 p-3.5 rounded-xl border border-violet-200">
          <div className="text-xs font-bold text-violet-900 mb-1 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-violet-600" /> यात्रा का समय (Time Taken):
          </div>
          <p className="text-xs font-mono text-slate-700">
            समय = दूरी ÷ चाल = {distance} ÷ {speed}
          </p>
          <div className="text-xl font-black text-violet-700 mt-1">
            {timeInMinutes} मिनट <span className="text-xs font-normal text-slate-600">({timeInHours.toFixed(2)} घंटा)</span>
          </div>
        </div>

        <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
          <div className="text-xs font-bold text-emerald-900 mb-1">
            ⏰ घर से निकलने का सही समय:
          </div>
          <p className="text-xs text-slate-600">अगर 8:00 AM स्कूल प्रार्थना है:</p>
          <div className="text-xl font-black text-emerald-700 mt-1">
            {depFormatted}
          </div>
          <div className="text-[11px] text-emerald-800 font-medium">
            (समय पर पहुँचने के लिए ठीक {depFormatted} पर निकलें!)
          </div>
        </div>
      </div>
    </div>
  );
};

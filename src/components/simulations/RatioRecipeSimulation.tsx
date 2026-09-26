import React, { useState } from 'react';
import { Sparkles, Users, GlassWater } from 'lucide-react';

interface RatioRecipeSimulationProps {
  initialPeople?: number;
}

export const RatioRecipeSimulation: React.FC<RatioRecipeSimulationProps> = ({
  initialPeople = 6,
}) => {
  const [people, setPeople] = useState<number>(initialPeople);

  // Base rule: 2 people require 4 glasses of water, 2 lemons, 4 spoons of sugar
  // Per person: 4 / 2 = 2 glasses water, 1 lemon, 2 spoons sugar
  const waterPerPerson = 2;
  const lemonPerPerson = 1;
  const sugarPerPerson = 2;

  const totalWater = people * waterPerPerson;
  const totalLemons = people * lemonPerPerson;
  const totalSugar = people * sugarPerPerson;

  return (
    <div className="bg-white rounded-2xl border-2 border-blue-200/80 shadow-md p-5 my-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 pb-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 font-bold rounded-full text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> रेसिपी लैब (Recipe Ratio Lab)
          </span>
          <h4 className="text-lg font-bold text-slate-800 mt-1">
            नींबू शरबत: एकिक नियम (Unitary Method) लाइव
          </h4>
        </div>
        <div className="text-xs bg-blue-50 text-blue-800 px-3 py-1 rounded-full font-semibold border border-blue-200">
          स्वादिष्ट नाप-तौल 🍋
        </div>
      </div>

      {/* Guest Count Control */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
        <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-600" /> कुल लोग / मेहमान (People Count):
          </span>
          <span className="text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded-full text-sm">
            {people} लोग
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="12"
          step="1"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
          <span>1 व्यक्ति</span>
          <span>2 (मूल अनुपात)</span>
          <span>6 (उदाहरण)</span>
          <span>12 लोग</span>
        </div>
      </div>

      {/* Visual Ingredients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
        {/* Water */}
        <div className="bg-gradient-to-b from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-4 text-center">
          <div className="flex justify-center mb-1 text-blue-500">
            <GlassWater className="w-8 h-8 animate-bounce" />
          </div>
          <h5 className="text-xs font-semibold text-slate-500 uppercase">पानी (Water)</h5>
          <div className="text-2xl font-black text-sky-700 my-1">{totalWater} गिलास</div>
          <div className="text-[11px] text-slate-500 font-medium">
            (1 व्यक्ति = 2 गिलास)
          </div>
        </div>

        {/* Lemons */}
        <div className="bg-gradient-to-b from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">🍋</div>
          <h5 className="text-xs font-semibold text-slate-500 uppercase">नींबू (Lemons)</h5>
          <div className="text-2xl font-black text-amber-700 my-1">{totalLemons} नींबू</div>
          <div className="text-[11px] text-slate-500 font-medium">
            (1 व्यक्ति = 1 नींबू)
          </div>
        </div>

        {/* Sugar */}
        <div className="bg-gradient-to-b from-rose-50 to-pink-50 border-2 border-rose-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">🥄</div>
          <h5 className="text-xs font-semibold text-slate-500 uppercase">चीनी (Sugar Spoons)</h5>
          <div className="text-2xl font-black text-rose-700 my-1">{totalSugar} चम्मच</div>
          <div className="text-[11px] text-slate-500 font-medium">
            (1 व्यक्ति = 2 चम्मच)
          </div>
        </div>
      </div>

      {/* Unitary Step breakdown */}
      <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-sm">
        <h6 className="font-bold text-blue-900 mb-2">
          👉 एकिक नियम कैसे लगा? (Step-by-Step Logic):
        </h6>
        <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
          <p className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-xs">1</span>
            <span>2 लोगों के लिए चाहिए = 4 गिलास पानी</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-xs">2</span>
            <span>1 व्यक्ति के लिए चाहिए = 4 ÷ 2 = <strong>2 गिलास पानी</strong> (प्रति व्यक्ति हिस्सा)</span>
          </p>
          <p className="flex items-center gap-2 font-semibold text-blue-900 bg-white p-2 rounded-lg border border-blue-200">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">3</span>
            <span>{people} लोगों के लिए चाहिए = {people} × 2 = <strong className="text-blue-700 text-base">{totalWater} गिलास पानी!</strong></span>
          </p>
        </div>
      </div>
    </div>
  );
};

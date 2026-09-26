import React from 'react';
import {
  Sparkles,
  Flame,
  Trophy,
  BookOpen,
  MessageCircleQuestion,
  Calculator,
  Award,
  Zap,
  Atom,
  Globe2,
} from 'lucide-react';
import { TopicCategory } from '../types/math';

interface HeaderProps {
  topics: TopicCategory[];
  currentTopicId: string;
  onSelectTopic: (topicId: string) => void;
  xp: number;
  streak: number;
  onOpenSolver: () => void;
  onOpenFormulas: () => void;
  onOpenChallenge: () => void;
  onOpenDoubt: () => void;
  onOpenVedicMaths: () => void;
  onOpenFormulaProof: () => void;
  onOpenScienceDoubt?: () => void;
  onOpenSocialDoubt?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  topics,
  currentTopicId,
  onSelectTopic,
  xp,
  streak,
  onOpenSolver,
  onOpenFormulas,
  onOpenChallenge,
  onOpenDoubt,
  onOpenVedicMaths,
  onOpenFormulaProof,
  onOpenScienceDoubt,
  onOpenSocialDoubt,
}) => {
  const currentLevel = Math.floor(xp / 100) + 1;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md text-xl sm:text-2xl font-black">
              📐
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 text-base sm:text-xl tracking-tight">
                  गणित मित्र
                </span>
                <span className="text-amber-600 font-bold text-xs sm:text-sm">
                  (Math Mitr)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                कठिन Maths को आसान व मजेदार real-life सीख
              </p>
            </div>
          </div>

          {/* User Stats & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-800">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{streak} दिन</span>
            </div>

            {/* XP / Level */}
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl text-xs font-extrabold text-emerald-800">
              <Trophy className="w-3.5 h-3.5 text-emerald-600" />
              <span>{xp} XP</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-bold">
                Lvl {currentLevel}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenVedicMaths}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer border border-amber-300 active:scale-95"
                title="वैदिक गणित एवं स्पीड ट्रिक्स"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>वैदिक ट्रिक्स</span>
              </button>

              <button
                onClick={onOpenSolver}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 sm:py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="8-स्टेप सॉल्वर"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">8-स्टेप सॉल्वर</span>
              </button>

              {/* Science Button */}
              {onOpenScienceDoubt && (
                <button
                  onClick={onOpenScienceDoubt}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-black px-2.5 py-1.5 sm:py-2 rounded-xl transition-all hidden md:flex items-center gap-1.5 cursor-pointer border border-emerald-300 shadow-2xs active:scale-95"
                  title="विज्ञान शिक्षक (Science Sir) से पूछें"
                >
                  <Atom className="w-3.5 h-3.5 text-emerald-700" />
                  <span>विज्ञान</span>
                </button>
              )}

              {/* Social Science Button */}
              {onOpenSocialDoubt && (
                <button
                  onClick={onOpenSocialDoubt}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-950 text-xs font-black px-2.5 py-1.5 sm:py-2 rounded-xl transition-all hidden lg:flex items-center gap-1.5 cursor-pointer border border-blue-300 shadow-2xs active:scale-95"
                  title="सोशल साइंस शिक्षक से पूछें"
                >
                  <Globe2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>सोशल साइंस</span>
                </button>
              )}

              <button
                onClick={onOpenDoubt}
                className="bg-orange-50 hover:bg-orange-100 text-orange-950 text-xs font-bold px-2.5 py-1.5 sm:py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-orange-200 shadow-2xs"
                title="डाउट सर से पूछें (गणित • विज्ञान • सामाजिक विज्ञान)"
              >
                <span>👨‍🏫</span>
                <span className="hidden md:inline">डाउट सर</span>
                <span className="text-[10px] bg-amber-200 text-amber-950 font-black px-1.5 py-0.2 rounded-full hidden sm:inline">
                  3 विषय
                </span>
              </button>

              <button
                onClick={onOpenFormulas}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1.5 sm:py-2 rounded-xl transition-all hidden lg:flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>सूत्र बैंक</span>
              </button>

              <button
                onClick={onOpenFormulaProof}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                title="फॉर्मूला सिद्ध करें (Formula Proof)"
              >
                <span>📐</span>
                <span className="hidden sm:inline">सिद्ध करें</span>
              </button>

              <button
                onClick={onOpenChallenge}
                className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-2.5 py-1.5 sm:py-2 rounded-xl transition-all hidden md:flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>पहेली</span>
              </button>
            </div>
          </div>
        </div>

        {/* Topic Selector Tabs */}
        <nav className="flex space-x-2 overflow-x-auto py-2.5 scrollbar-none border-t border-amber-100/60">
          {topics.map((t) => {
            const isActive = t.id === currentTopicId;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTopic(t.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs scale-102'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-300'
                }`}
              >
                <span className="text-base">{t.icon}</span>
                <span>{t.title}</span>
                <span className="text-[10px] opacity-80 hidden sm:inline">
                  ({t.englishTitle})
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

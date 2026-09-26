import React, { useState } from 'react';
import { X, Trophy, Sparkles, CheckCircle2, XCircle, Flame } from 'lucide-react';
import { DAILY_CHALLENGES } from '../data/lessonsData';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXP: (xp: number) => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  onAddXP,
}) => {
  const challenge = DAILY_CHALLENGES[0];
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    setSubmitted(true);
    if (selectedOpt === challenge.correctIndex) {
      onAddXP(challenge.xp);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-amber-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              🎯
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg">
                दैनिक गणित चुनौती (Daily Challenge)
              </h3>
              <p className="text-xs text-amber-100 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                रोज हल करें और स्ट्रीक बढ़ाएँ!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-amber-800">
              <span>{challenge.day}</span>
              <span className="bg-amber-200 px-2 py-0.5 rounded text-[11px]">
                +{challenge.xp} XP
              </span>
            </div>
            <h4 className="font-extrabold text-base text-slate-800">
              {challenge.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {challenge.scenario}
            </p>
            <div className="font-bold text-xs sm:text-sm text-amber-900 pt-1">
              👉 {challenge.question}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {challenge.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === challenge.correctIndex;
              let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50';

              if (submitted) {
                if (isCorrect) {
                  style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                }
              } else if (isSelected) {
                style = 'bg-amber-100 border-amber-500 text-amber-950 font-bold';
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => setSelectedOpt(idx)}
                  className={`w-full p-3 rounded-xl border-2 text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <span>{opt}</span>
                  {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {!submitted ? (
            <div className="flex justify-end pt-1">
              <button
                onClick={handleSubmit}
                disabled={selectedOpt === null}
                className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                जवाब सबमिट करें
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs sm:text-sm text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <Sparkles className="w-4 h-4" />
                {selectedOpt === challenge.correctIndex
                  ? 'अद्भुत! बिल्कुल सही उत्तर! (+50 XP)'
                  : 'सही उत्तर और हल:'}
              </div>
              <p className="text-slate-700">{challenge.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

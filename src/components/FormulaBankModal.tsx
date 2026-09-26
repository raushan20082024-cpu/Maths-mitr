import React from 'react';
import { X, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import { FORMULA_BANK } from '../data/lessonsData';

interface FormulaBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProof?: (formulaQuery: string) => void;
}

export const FormulaBankModal: React.FC<FormulaBankModalProps> = ({
  isOpen,
  onClose,
  onOpenProof,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <h3 className="font-black text-lg">
                गणित सूत्र बैंक (Formula Bank)
              </h3>
              <p className="text-xs text-amber-100">
                सूत्रों का वास्तविक जीवन में उपयोग और अर्थ
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6">
          {FORMULA_BANK.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                {cat.category}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="bg-amber-50/40 border border-amber-200 rounded-2xl p-3.5 space-y-2 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs sm:text-sm text-slate-900">
                        {item.name}
                      </div>
                      {onOpenProof && (
                        <button
                          onClick={() => onOpenProof(item.name)}
                          className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-lg border border-indigo-200 flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <span>📐 सिद्ध देखें</span>
                        </button>
                      )}
                    </div>
                    <div className="bg-white font-mono text-xs sm:text-sm font-bold text-amber-800 p-2 rounded-xl border border-amber-200 shadow-xs">
                      {item.formula}
                    </div>
                    <div className="text-xs text-slate-600 flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>दैनिक उपयोग:</strong> {item.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Store, Sparkles, DollarSign } from 'lucide-react';

export const ProfitLossSimulation: React.FC = () => {
  const [costPrice, setCostPrice] = useState<number>(120); // क्रय मूल्य (CP)
  const [sellingPrice, setSellingPrice] = useState<number>(150); // विक्रय मूल्य (SP)

  const diff = sellingPrice - costPrice;
  const isProfit = diff > 0;
  const isLoss = diff < 0;
  const isBreakEven = diff === 0;

  const percentage = costPrice > 0 ? ((Math.abs(diff) / costPrice) * 100).toFixed(1) : '0';

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border-2 border-emerald-400/30 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏪</span>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-amber-300">
              व्यापार व लाभ-हानि सिम्युलेटर (Profit & Loss Business Simulator)
            </h3>
            <p className="text-[11px] text-slate-300">
              क्रय मूल्य (CP) और विक्रय मूल्य (SP) बदलकर नफा-नुकसान का लाइव हिसाब लगाएँ
            </p>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 bg-white/10 px-3 py-1 rounded-xl">
          स्कूल मेला स्टॉल
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-300">क्रय मूल्य (Cost Price - CP):</span>
            <span className="text-amber-300 font-extrabold">₹{costPrice}</span>
          </div>
          <input
            type="range"
            min="20"
            max="500"
            step="10"
            value={costPrice}
            onChange={(e) => setCostPrice(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <span className="text-[10px] text-slate-400">सामान खरीदने या बनाने की लागत</span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-300">विक्रय मूल्य (Selling Price - SP):</span>
            <span className="text-emerald-300 font-extrabold">₹{sellingPrice}</span>
          </div>
          <input
            type="range"
            min="20"
            max="500"
            step="10"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <span className="text-[10px] text-slate-400">ग्राहक को बेचने की कीमत</span>
        </div>
      </div>

      {/* Result Card */}
      <div
        className={`p-5 rounded-xl border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${
          isProfit
            ? 'bg-emerald-950/60 border-emerald-400/60'
            : isLoss
            ? 'bg-rose-950/60 border-rose-400/60'
            : 'bg-slate-800 border-slate-600'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${
              isProfit
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400'
                : isLoss
                ? 'bg-rose-500/20 text-rose-400 border border-rose-400'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {isProfit ? <TrendingUp className="w-8 h-8" /> : isLoss ? <TrendingDown className="w-8 h-8" /> : '⚖️'}
          </div>

          <div>
            <span className="text-xs text-slate-300 font-bold block uppercase tracking-wider">
              {isProfit ? 'बधाई! शुद्ध लाभ (Net Profit)' : isLoss ? 'सावधान! हानि (Loss)' : 'ना लाभ ना हानि (Break Even)'}
            </span>
            <div
              className={`text-3xl font-black mt-0.5 ${
                isProfit ? 'text-emerald-400' : isLoss ? 'text-rose-400' : 'text-slate-300'
              }`}
            >
              {isProfit ? `+₹${diff}` : isLoss ? `-₹${Math.abs(diff)}` : '₹0'}
              <span className="text-lg font-bold ml-2">({percentage}%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-3.5 rounded-xl text-xs space-y-1 text-slate-200 text-center md:text-right">
          <div>
            <strong>सूत्र:</strong> {isProfit ? 'लाभ = SP - CP' : isLoss ? 'हानि = CP - SP' : 'SP = CP'}
          </div>
          <div>
            <strong>प्रतिशत सूत्र:</strong> {isProfit ? '(लाभ ÷ CP) × 100' : '(हानि ÷ CP) × 100'}
          </div>
          <div className="text-[11px] text-amber-300 font-medium">
            (प्रतिशत हमेशा क्रय मूल्य / Cost Price पर निकाला जाता है!)
          </div>
        </div>
      </div>

      {/* Real-life business tips */}
      <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs text-slate-300 space-y-1">
        <strong className="text-amber-300 font-bold block">💡 चतुर दुकानदार का नियम:</strong>
        <p>
          अगर आप ₹100 में खिलौना खरीदकर ₹125 में बेचते हैं, तो ₹25 का सीधा लाभ हुआ। लाभ प्रतिशत = (25 ÷ 100) × 100 = 25%।
          सफल व्यापारी हमेशा अपना विक्रय मूल्य (SP) क्रय मूल्य (CP) और परिवहन खर्च से ऊपर रखता है!
        </p>
      </div>
    </div>
  );
};

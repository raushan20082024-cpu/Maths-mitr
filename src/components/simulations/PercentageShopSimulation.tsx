import React, { useState } from 'react';
import { Tag, Sparkles, PiggyBank, ArrowDownRight, IndianRupee } from 'lucide-react';

interface PercentageShopSimulationProps {
  initialPrice?: number;
  initialDiscount?: number;
}

export const PercentageShopSimulation: React.FC<PercentageShopSimulationProps> = ({
  initialPrice = 500,
  initialDiscount = 20,
}) => {
  const [price, setPrice] = useState<number>(initialPrice);
  const [discountPercent, setDiscountPercent] = useState<number>(initialDiscount);

  // Calculations
  const discountAmount = Math.round((discountPercent / 100) * price);
  const finalPrice = price - discountAmount;

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-200/80 shadow-md p-5 my-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> शॉपिंग लैब (Shopping Discount Lab)
          </span>
          <h4 className="text-lg font-bold text-slate-800 mt-1">
            सेल और छूट का लाइव कैलकुलेटर
          </h4>
        </div>
        <div className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-semibold border border-emerald-200">
          Smart Buyer Mode 🛍️
        </div>
      </div>

      {/* Visual Shopping Tag & Price Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gradient-to-br from-emerald-50 to-teal-50/50 p-5 rounded-xl border border-emerald-100">
        {/* Shopping Price Tag Graphic */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative bg-white border-2 border-slate-700 rounded-2xl p-5 shadow-xl w-60 transform -rotate-1 hover:rotate-0 transition-transform">
            {/* Tag hole */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-200 border-2 border-slate-700 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-emerald-100 rounded-full"></div>
            </div>

            <div className="text-center pt-2">
              <div className="inline-block px-2.5 py-0.5 bg-rose-500 text-white font-extrabold text-xs rounded-full uppercase tracking-wider mb-2 shadow-sm">
                FLAT {discountPercent}% OFF!
              </div>
              <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">अंकित मूल्य (M.R.P.)</h5>
              <div className="text-xl font-bold text-slate-400 line-through">
                ₹{price}
              </div>

              <div className="my-2 border-t border-dashed border-slate-300"></div>

              <h5 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">देय मूल्य (Final Price)</h5>
              <div className="text-3xl font-black text-emerald-700 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 inline" />
                {finalPrice}
              </div>

              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-1.5 text-[11px] text-amber-800 font-medium">
                कुल बचत: <span className="font-bold text-emerald-600">₹{discountAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Visualizer */}
        <div className="md:col-span-7 space-y-2.5">
          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
            <h6 className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5 mb-1">
              <Tag className="w-3.5 h-3.5 text-emerald-600" /> स्टेप 1: छूट की गणना (Discount Calculation)
            </h6>
            <div className="text-xs sm:text-sm font-mono text-slate-700 bg-slate-50 p-2 rounded">
              छूट = ({discountPercent} ÷ 100) × ₹{price} = <span className="text-emerald-700 font-bold">₹{discountAmount}</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
            <h6 className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5 mb-1">
              <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" /> स्टेप 2: अंतिम देय राशि (Final Price)
            </h6>
            <div className="text-xs sm:text-sm font-mono text-slate-700 bg-slate-50 p-2 rounded">
              अंतिम मूल्य = ₹{price} - ₹{discountAmount} = <span className="text-emerald-700 font-bold text-base">₹{finalPrice}</span>
            </div>
          </div>

          <div className="bg-emerald-600 text-white p-3 rounded-xl flex items-center gap-3 shadow-sm">
            <PiggyBank className="w-7 h-7 flex-shrink-0 text-amber-300" />
            <div className="text-xs">
              <span className="font-bold">आपकी पिगी बैंक में बचत: </span>
              दुकानदार को ₹{finalPrice} देने के बाद आपकी जेब में <span className="underline font-black text-amber-200 text-sm">₹{discountAmount}</span> बचेंगे!
            </div>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
            <span>मूल मूल्य (M.R.P.):</span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-xs">
              ₹{price}
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="1500"
            step="50"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>₹100</span>
            <span>₹500 (उदाहरण)</span>
            <span>₹1500</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1">
            <span>छूट की दर (Discount %):</span>
            <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded text-xs">
              {discountPercent}% OFF
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
            <span>5%</span>
            <span>10%</span>
            <span>20% (उदाहरण)</span>
            <span>50% (आधा दाम)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

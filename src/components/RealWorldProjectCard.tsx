import React, { useState } from 'react';
import {
  Sparkles,
  Rocket,
  Sun,
  PieChart,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Info,
  Sliders,
  Award,
} from 'lucide-react';
import { RealWorldProject } from '../types/math';

interface RealWorldProjectCardProps {
  project: RealWorldProject;
  onAddXP: (xp: number) => void;
}

export const RealWorldProjectCard: React.FC<RealWorldProjectCardProps> = ({
  project,
  onAddXP,
}) => {
  const [completed, setCompleted] = useState<boolean>(false);

  // 1. Rocket Project Simulator State
  const [rocketDistance, setRocketDistance] = useState<number>(50); // meters
  const [rocketAngle, setRocketAngle] = useState<number>(55); // degrees
  const eyeHeight = 1.4; // meters
  const rocketHeight = (
    rocketDistance * Math.tan((rocketAngle * Math.PI) / 180) +
    eyeHeight
  ).toFixed(1);

  // 2. Solar Project Simulator State
  const [roofArea, setRoofArea] = useState<number>(30); // m²
  const [panelSize] = useState<number>(2); // m² per panel
  const usableRoof = Math.round(roofArea * 0.8); // 80% usable
  const totalPanels = Math.floor(usableRoof / panelSize);
  const dailyKWh = (totalPanels * 1.5).toFixed(1);
  const monthlySavingsRupees = Math.round(Number(dailyKWh) * 30 * 8); // ₹8 per kWh

  // 3. Budget Project Simulator State
  const [totalBudget, setTotalBudget] = useState<number>(2000);
  const [itemPrice, setItemPrice] = useState<number>(20);
  const rawMaterial = Math.round(totalBudget * 0.5); // 50%
  const marketingDecor = Math.round(totalBudget * 0.3); // 30%
  const emergencySavings = Math.round(totalBudget * 0.2); // 20%
  const cupsExpected = 100;
  const totalRevenue = cupsExpected * itemPrice;
  const netProfit = totalRevenue - (rawMaterial + marketingDecor);

  // 4. Garden Soil Project Simulator State
  const [soilWeight, setSoilWeight] = useState<number>(36); // kg
  const onePartSoil = soilWeight / 6;
  const gardenSoil = (3 * onePartSoil).toFixed(1);
  const cocopeat = (2 * onePartSoil).toFixed(1);
  const compost = (1 * onePartSoil).toFixed(1);

  // 5. Trip Project Simulator State
  const [tripDistance, setTripDistance] = useState<number>(300); // km
  const [avgSpeed, setAvgSpeed] = useState<number>(60); // km/h
  const drivingHours = (tripDistance / avgSpeed).toFixed(1);
  const chargeTimeMin = 45;
  const totalTripTimeHours = (
    Number(drivingHours) +
    chargeTimeMin / 60
  ).toFixed(1);

  // 6. Bank Ledger Project State (Number system)
  const [openingBalance, setOpeningBalance] = useState<number>(1500);
  const [salesDeposits, setSalesDeposits] = useState<number>(850);
  const [vendorWithdrawals, setVendorWithdrawals] = useState<number>(600);
  const netLedger = openingBalance + salesDeposits - vendorWithdrawals;

  // 7. Floor Tiling Project State (Square)
  const [roomSide, setRoomSide] = useState<number>(5); // meters
  const [tileRate, setTileRate] = useState<number>(45); // ₹ per sq ft or m²
  const roomArea = roomSide * roomSide;
  const totalTilingCost = roomArea * tileRate;

  // 8. Auto Fare Meter Project State (Algebra)
  const [rideDistance, setRideDistance] = useState<number>(8); // km
  const baseFare = 30;
  const perKmRate = 14;
  const totalFare = rideDistance <= 1.5 ? baseFare : Math.round(baseFare + (rideDistance - 1.5) * perKmRate);

  // 9. Diwali Stall Project State (Profit & Loss)
  const [diyasCount, setDiyasCount] = useState<number>(200);
  const [buyingCost, setBuyingCost] = useState<number>(4); // ₹ per diya
  const [sellingCost, setSellingCost] = useState<number>(7); // ₹ per diya
  const diyaCP = diyasCount * buyingCost;
  const diyaSP = diyasCount * sellingCost;
  const diyaProfit = diyaSP - diyaCP;
  const diyaProfitPct = diyaCP > 0 ? ((diyaProfit / diyaCP) * 100).toFixed(0) : '0';

  // 10. Water Tank Project State (Cube)
  const [tankSide, setTankSide] = useState<number>(1.2); // meters
  const tankVolumeM3 = (tankSide * tankSide * tankSide).toFixed(2);
  const tankLitres = Math.round(Number(tankVolumeM3) * 1000);

  const handleCompleteProject = () => {
    if (!completed) {
      setCompleted(true);
      onAddXP(project.xpReward);
    }
  };

  return (
    <section id="real-world-project-section" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-indigo-400/40 relative overflow-hidden space-y-6">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/30 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            रियल-वर्ल्ड प्रोजेक्ट (Real-World Applied Math)
          </span>
          <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
            {project.categoryTag}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>+{project.xpReward} XP पुरस्कार</span>
        </div>
      </div>

      {/* Title & Scenario */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <span className="text-3xl sm:text-4xl p-2.5 bg-white/10 rounded-2xl border border-white/15 shadow-inner">
            {project.icon}
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm font-medium mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 mt-3">
          <p>
            <strong className="text-amber-300 font-bold">🎯 प्रोजेक्ट मिशन:</strong>{' '}
            {project.objective}
          </p>
          <p className="text-slate-300 text-xs">
            <strong className="text-indigo-300">स्थिति (Scenario):</strong>{' '}
            {project.projectScenario}
          </p>
        </div>
      </div>

      {/* Interactive Tool / Simulation based on topic */}
      <div className="bg-slate-800/80 border-2 border-indigo-400/30 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-3">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            लाइव प्रोजेक्ट सिम्युलेटर (Live Project Simulator)
          </h4>
          <span className="text-[11px] text-slate-300">
            स्लाइडर बदलकर प्रोजेक्ट परिणाम देखें
          </span>
        </div>

        {/* 1. ROCKET PROJECT SIMULATOR */}
        {project.interactiveTool === 'rocket' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>लॉन्च पैड से दूरी (Base Distance):</span>
                  <span className="text-amber-300 font-bold">
                    {rocketDistance} मीटर
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={rocketDistance}
                  onChange={(e) => setRocketDistance(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>20m</span>
                  <span>50m (मानक)</span>
                  <span>100m</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>इनक्लिनोमीटर से मापा कोण (Apogee Angle):</span>
                  <span className="text-amber-300 font-bold">
                    {rocketAngle}° (डिग्री)
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="75"
                  step="1"
                  value={rocketAngle}
                  onChange={(e) => setRocketAngle(Number(e.target.value))}
                  className="w-full accent-indigo-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>30°</span>
                  <span>55°</span>
                  <span>75°</span>
                </div>
              </div>
            </div>

            {/* Rocket Result Card */}
            <div className="bg-indigo-950/60 border border-indigo-400/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-slate-300 block">
                  रॉकेट की कुल ऊँचाई (Rocket Peak Altitude):
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 flex items-center justify-center sm:justify-start gap-2">
                  <Rocket className="w-7 h-7 text-amber-400 animate-bounce" />
                  <span>{rocketHeight} मीटर</span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  ऊँचाई = ({rocketDistance}m × tan {rocketAngle}°) + {eyeHeight}m (आँखों का स्तर)
                </div>
              </div>
              <div className="bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/15 text-xs text-slate-200 text-center sm:text-right">
                <div className="font-bold text-emerald-300">
                  लगभग {Math.round(Number(rocketHeight) / 3)} मंजिला इमारत!
                </div>
                <span className="text-[11px] text-slate-400">
                  त्रिकोणमिति से बिना फीते के सटीक माप
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. SOLAR PANEL EFFICIENCY SIMULATOR */}
        {project.interactiveTool === 'solar' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>घर की छत का कुल क्षेत्रफल (Roof Area):</span>
                  <span className="text-amber-300 font-bold">{roofArea} m²</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={roofArea}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>15 m²</span>
                  <span>30 m²</span>
                  <span>100 m²</span>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs space-y-1">
                <div className="text-slate-300">
                  1 पैनल का आकार: <strong className="text-white">2 m²</strong>
                </div>
                <div className="text-slate-300">
                  उपयोगी सौर क्षेत्र (80%):{' '}
                  <strong className="text-emerald-300">{usableRoof} m²</strong>
                </div>
                <div className="text-[11px] text-slate-400">
                  (20% जगह वेंटिलेशन और चलने के लिए छोड़ी गई है)
                </div>
              </div>
            </div>

            {/* Solar Result Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-indigo-950/60 border border-indigo-400/40 p-3.5 rounded-xl text-center">
                <span className="text-[11px] text-slate-300 uppercase">
                  सोलर पैनल संख्या
                </span>
                <div className="text-2xl font-black text-amber-300 mt-1">
                  {totalPanels} पैनल
                </div>
                <span className="text-[10px] text-slate-400">
                  {usableRoof}m² ÷ 2m²
                </span>
              </div>

              <div className="bg-indigo-950/60 border border-indigo-400/40 p-3.5 rounded-xl text-center">
                <span className="text-[11px] text-slate-300 uppercase">
                  दैनिक बिजली उत्पादन
                </span>
                <div className="text-2xl font-black text-emerald-300 mt-1 flex items-center justify-center gap-1">
                  <Sun className="w-5 h-5 text-amber-400" />
                  <span>{dailyKWh} Units</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {totalPanels} × 1.5 kWh
                </span>
              </div>

              <div className="bg-indigo-950/60 border border-indigo-400/40 p-3.5 rounded-xl text-center">
                <span className="text-[11px] text-slate-300 uppercase">
                  मासिक बिल में बचत
                </span>
                <div className="text-2xl font-black text-cyan-300 mt-1">
                  ₹{monthlySavingsRupees}
                </div>
                <span className="text-[10px] text-slate-400">
                  प्रति माह सीधी बचत
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. BUDGET PROJECT SIMULATOR */}
        {project.interactiveTool === 'budget' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>कुल उपलब्ध बजट (Total Budget):</span>
                  <span className="text-emerald-300 font-bold">₹{totalBudget}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="200"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>शरबत के 1 गिलास का बिक्री मूल्य:</span>
                  <span className="text-amber-300 font-bold">₹{itemPrice}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="40"
                  step="5"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            {/* 50-30-20 Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <span className="text-xs text-amber-300 font-bold">
                  50% कच्चा माल (Ingredients):
                </span>
                <div className="text-xl font-black text-white mt-1">
                  ₹{rawMaterial}
                </div>
                <span className="text-[11px] text-slate-400">
                  नींबू, बर्फ, चीनी
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <span className="text-xs text-indigo-300 font-bold">
                  30% स्टॉल व कप (Packaging):
                </span>
                <div className="text-xl font-black text-white mt-1">
                  ₹{marketingDecor}
                </div>
                <span className="text-[11px] text-slate-400">
                  ग्लास, स्ट्रॉ, बैनर
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <span className="text-xs text-emerald-300 font-bold">
                  20% इमरजेंसी बचत (Reserve):
                </span>
                <div className="text-xl font-black text-white mt-1">
                  ₹{emergencySavings}
                </div>
                <span className="text-[11px] text-slate-400">सुरक्षित फंड</span>
              </div>
            </div>

            <div className="bg-emerald-950/60 border border-emerald-400/40 p-3.5 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
              <div>
                <span className="text-slate-300 block">
                  100 गिलास बेचकर शुद्ध लाभ (Net Profit):
                </span>
                <span className="text-xl font-black text-emerald-300">
                  ₹{netProfit} मुनाफा
                </span>
              </div>
              <div className="text-slate-300 text-right">
                कुल आमदनी: <strong>₹{totalRevenue}</strong> | निवेश:{' '}
                <strong>₹{rawMaterial + marketingDecor}</strong>
              </div>
            </div>
          </div>
        )}

        {/* 4. GARDEN SOIL RATIO SIMULATOR */}
        {project.interactiveTool === 'garden' && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>कुल आवश्यक मिट्टी मिश्रण (Total Mix Weight):</span>
                <span className="text-amber-300 font-bold">{soilWeight} किलोग्राम (kg)</span>
              </div>
              <input
                type="range"
                min="12"
                max="60"
                step="6"
                value={soilWeight}
                onChange={(e) => setSoilWeight(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>12 kg (2 गमले)</span>
                <span>36 kg (6 गमले)</span>
                <span>60 kg (10 गमले)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-amber-950/40 border border-amber-500/40 p-3.5 rounded-xl text-center">
                <span className="text-xs text-amber-200 font-bold">
                  मिट्टी (Garden Soil)
                </span>
                <div className="text-2xl font-black text-amber-300 my-1">
                  {gardenSoil} kg
                </div>
                <span className="text-[10px] text-slate-300">
                  अनुपात भाग: 3 (50%)
                </span>
              </div>

              <div className="bg-amber-950/40 border border-amber-500/40 p-3.5 rounded-xl text-center">
                <span className="text-xs text-amber-200 font-bold">
                  कोकोपीट (Cocopeat)
                </span>
                <div className="text-2xl font-black text-amber-300 my-1">
                  {cocopeat} kg
                </div>
                <span className="text-[10px] text-slate-300">
                  अनुपात भाग: 2 (33.3%)
                </span>
              </div>

              <div className="bg-amber-950/40 border border-amber-500/40 p-3.5 rounded-xl text-center">
                <span className="text-xs text-amber-200 font-bold">
                  केंचुआ खाद (Compost)
                </span>
                <div className="text-2xl font-black text-emerald-300 my-1">
                  {compost} kg
                </div>
                <span className="text-[10px] text-slate-300">
                  अनुपात भाग: 1 (16.7%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 5. TRIP SPEED TIME SIMULATOR */}
        {project.interactiveTool === 'trip' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>कुल यात्रा दूरी (Trip Distance):</span>
                  <span className="text-cyan-300 font-bold">{tripDistance} km</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="500"
                  step="25"
                  value={tripDistance}
                  onChange={(e) => setTripDistance(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>औसत गति (Average Speed):</span>
                  <span className="text-amber-300 font-bold">{avgSpeed} km/h</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="90"
                  step="5"
                  value={avgSpeed}
                  onChange={(e) => setAvgSpeed(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs space-y-1">
                <span className="text-slate-300 block">शुद्ध ड्राइविंग समय:</span>
                <div className="text-2xl font-black text-white">
                  {drivingHours} घंटे
                </div>
                <span className="text-[10px] text-slate-400">
                  समय = {tripDistance} ÷ {avgSpeed}
                </span>
              </div>

              <div className="bg-cyan-950/60 border border-cyan-400/40 p-3.5 rounded-xl text-xs space-y-1">
                <span className="text-cyan-200 block">
                  चार्जिंग ब्रेक (45 मिनट) सहित कुल समय:
                </span>
                <div className="text-2xl font-black text-cyan-300">
                  {totalTripTimeHours} घंटे
                </div>
                <span className="text-[10px] text-slate-300">
                  सटीक प्लान से कोई देरी नहीं!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. BANK LEDGER SIMULATOR (NUMBER SYSTEM) */}
        {project.interactiveTool === 'number' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  शुरुआती शेष (Opening Balance):
                </span>
                <div className="text-base font-bold text-amber-300">₹{openingBalance}</div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-300 block mb-1">
                  दुकान बिक्री जमा (+ Deposits):
                </span>
                <div className="text-base font-bold text-emerald-300">+₹{salesDeposits}</div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={salesDeposits}
                  onChange={(e) => setSalesDeposits(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-rose-300 block mb-1">
                  सप्लायर भुगतान (- Withdrawals):
                </span>
                <div className="text-base font-bold text-rose-300">-₹{vendorWithdrawals}</div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={vendorWithdrawals}
                  onChange={(e) => setVendorWithdrawals(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-indigo-950/60 border border-indigo-400/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-300">दिन के अंत में शुद्ध खाता शेष (Closing Balance):</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  ₹{netLedger}
                </div>
              </div>
              <div className="bg-white/10 p-2.5 rounded-lg font-mono text-[11px] text-slate-200">
                सूत्र: ({openingBalance}) + ({salesDeposits}) + (-{vendorWithdrawals}) = ₹{netLedger}
              </div>
            </div>
          </div>
        )}

        {/* 7. SQUARE TILE SIMULATOR */}
        {project.interactiveTool === 'square' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>कमरे की लंबाई (Room Side):</span>
                  <span className="text-amber-300 font-bold">{roomSide} मीटर</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="1"
                  value={roomSide}
                  onChange={(e) => setRoomSide(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>टाइल्स का मूल्य प्रति वर्ग मीटर:</span>
                  <span className="text-cyan-300 font-bold">₹{tileRate}/m²</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={tileRate}
                  onChange={(e) => setTileRate(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs space-y-1">
                <span className="text-slate-300">कमरे का कुल क्षेत्रफल (वर्ग):</span>
                <div className="text-2xl font-black text-amber-300">
                  {roomArea} वर्ग मीटर (m²)
                </div>
                <span className="text-[10px] text-slate-400">क्षेत्रफल = {roomSide}² = {roomSide} × {roomSide}</span>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-400/40 p-3 rounded-xl text-xs space-y-1">
                <span className="text-emerald-200">टाइल्स लगवाने का कुल खर्च:</span>
                <div className="text-2xl font-black text-emerald-400">
                  ₹{totalTilingCost}
                </div>
                <span className="text-[10px] text-slate-300">खर्च = {roomArea}m² × ₹{tileRate}</span>
              </div>
            </div>
          </div>
        )}

        {/* 8. ALGEBRA AUTO FARE SIMULATOR */}
        {project.interactiveTool === 'algebra' && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>सफर की कुल दूरी (Distance d):</span>
                <span className="text-amber-300 font-bold">{rideDistance} किमी (km)</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={rideDistance}
                onChange={(e) => setRideDistance(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 km (बेस फेयर)</span>
                <span>10 km</span>
                <span>25 km</span>
              </div>
            </div>

            <div className="bg-indigo-950/60 border border-indigo-400/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-300">मीटर पर बना कुल ऑटो किराया:</span>
                <div className="text-3xl font-black text-amber-300">
                  ₹{totalFare}
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl text-slate-200 space-y-1">
                <div><strong>रैखिक समीकरण (Linear Equation):</strong></div>
                <div className="font-mono text-cyan-300 text-xs">
                  किराया = ₹{baseFare} (पहले 1.5km) + ₹{perKmRate} × (दूरी - 1.5)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 9. PROFIT & LOSS DIWALI STALL SIMULATOR */}
        {project.interactiveTool === 'profit' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  मिट्टी के दीयों की संख्या:
                </span>
                <div className="text-base font-bold text-amber-300">{diyasCount} दीये</div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={diyasCount}
                  onChange={(e) => setDiyasCount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  खरीद मूल्य (CP per diya):
                </span>
                <div className="text-base font-bold text-white">₹{buyingCost}</div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={buyingCost}
                  onChange={(e) => setBuyingCost(Number(e.target.value))}
                  className="w-full accent-slate-400 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-300 block mb-1">
                  बिक्री मूल्य (SP per diya):
                </span>
                <div className="text-base font-bold text-emerald-300">₹{sellingCost}</div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="1"
                  value={sellingCost}
                  onChange={(e) => setSellingCost(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-emerald-950/60 border border-emerald-400/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-300">दीवाली मेले में शुद्ध लाभ (Net Profit):</span>
                <div className="text-3xl font-black text-emerald-400">
                  +₹{diyaProfit} ({diyaProfitPct}% मुनाफा)
                </div>
              </div>
              <div className="text-slate-300 text-right">
                कुल लागत (CP): <strong>₹{diyaCP}</strong> | कुल बिक्री (SP): <strong>₹{diyaSP}</strong>
              </div>
            </div>
          </div>
        )}

        {/* 10. CUBE WATER TANK SIMULATOR */}
        {project.interactiveTool === 'cube' && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>घनाकार टंकी की एक भुजा (Tank Side):</span>
                <span className="text-cyan-300 font-bold">{tankSide} मीटर</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={tankSide}
                onChange={(e) => setTankSide(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs space-y-1">
                <span className="text-slate-300">टंकी का आयतन (Volume in m³):</span>
                <div className="text-2xl font-black text-cyan-300">
                  {tankVolumeM3} घन मीटर (m³)
                </div>
                <span className="text-[10px] text-slate-400">आयतन = {tankSide}³ = {tankSide} × {tankSide} × {tankSide}</span>
              </div>

              <div className="bg-cyan-950/60 border border-cyan-400/40 p-3 rounded-xl text-xs space-y-1">
                <span className="text-cyan-200">पानी की कुल भंडारण क्षमता (Capacity):</span>
                <div className="text-2xl font-black text-emerald-400">
                  {tankLitres} लीटर (Litre)
                </div>
                <span className="text-[10px] text-slate-300">1 घन मीटर = 1,000 लीटर पानी</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Math Steps Breakdown in Project */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
          <Info className="w-4 h-4 text-indigo-400" />
          इस प्रोजेक्ट में मैथ्स कैसे लगा? (Math in Action):
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {project.howMathIsUsed.map((step, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1.5"
            >
              <div className="text-xs font-bold text-amber-300">
                {step.step}
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {step.description}
              </p>
              {step.formula && (
                <div className="text-[11px] font-mono font-bold text-indigo-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {step.formula}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Completion & Rewards */}
      <div className="border-t border-indigo-500/30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>
            प्रोजेक्ट पूर्ण करने पर बैज मिलेगा:{' '}
            <strong className="text-amber-300">{project.badgeReward}</strong>
          </span>
        </div>

        {!completed ? (
          <button
            onClick={handleCompleteProject}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-6 py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer text-xs sm:text-sm"
          >
            <span>प्रोजेक्ट पूरा करें (+{project.xpReward} XP)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400 text-emerald-300 px-4 py-2 rounded-xl text-xs font-black animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>शानदार! प्रोजेक्ट पूरा हुआ और बैज अनलॉक हो गया! 🎉</span>
          </div>
        )}
      </div>
    </section>
  );
};

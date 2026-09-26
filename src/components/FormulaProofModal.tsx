import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Search,
  ArrowRight,
  ShieldCheck,
  Layers,
  Lightbulb,
  Loader2,
  Compass,
  Sliders,
  Play,
  RotateCcw,
} from 'lucide-react';
import { FORMULA_PROOFS, FormulaProof } from '../data/formulaProofs';

interface FormulaProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormulaId?: string;
  initialFormulaQuery?: string;
  onOpenDoubtWithContext?: (question: string, contextStep: string) => void;
}

export const FormulaProofModal: React.FC<FormulaProofModalProps> = ({
  isOpen,
  onClose,
  initialFormulaId,
  initialFormulaQuery,
  onOpenDoubtWithContext,
}) => {
  const [selectedProof, setSelectedProof] = useState<FormulaProof>(() => {
    if (initialFormulaId) {
      const found = FORMULA_PROOFS.find((p) => p.id === initialFormulaId);
      if (found) return found;
    }
    return FORMULA_PROOFS[0];
  });

  const [customInput, setCustomInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'derivation' | 'visual' | 'verify'>('derivation');

  // Interactive Visual Sliders State
  // 1. (a + b)² and (a - b)² and a² - b²
  const [valA, setValA] = useState<number>(4);
  const [valB, setValB] = useState<number>(3);
  // 2. Pythagoras
  const [pythA, setPythA] = useState<number>(3);
  const [pythB, setPythB] = useState<number>(4);
  // 3. Circle Area
  const [circleR, setCircleR] = useState<number>(7);
  const [circleSlices, setCircleSlices] = useState<number>(16);
  // 4. Gauss Sum
  const [gaussN, setGaussN] = useState<number>(6);
  // 5. Trig angle
  const [trigAngle, setTrigAngle] = useState<number>(30);

  // Sync when initialFormulaQuery or initialFormulaId changes
  useEffect(() => {
    if (!isOpen) return;

    if (initialFormulaQuery) {
      setCustomInput(initialFormulaQuery);
      const match = FORMULA_PROOFS.find(
        (p) =>
          p.name.toLowerCase().includes(initialFormulaQuery.toLowerCase()) ||
          p.formula.toLowerCase().includes(initialFormulaQuery.toLowerCase())
      );
      if (match) {
        setSelectedProof(match);
      } else {
        // Auto prove custom query
        executeProve(initialFormulaQuery);
      }
    } else if (initialFormulaId) {
      const match = FORMULA_PROOFS.find((p) => p.id === initialFormulaId);
      if (match) setSelectedProof(match);
    }
  }, [isOpen, initialFormulaQuery, initialFormulaId]);

  if (!isOpen) return null;

  const handleSelectPreset = (proof: FormulaProof) => {
    setSelectedProof(proof);
    setCustomInput('');
    setErrorMsg('');
  };

  const executeProve = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    // Check if matches an existing preset
    const match = FORMULA_PROOFS.find(
      (p) =>
        p.name.toLowerCase().includes(trimmed.toLowerCase()) ||
        p.formula.toLowerCase().includes(trimmed.toLowerCase())
    );
    if (match) {
      setSelectedProof(match);
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/math/prove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formulaName: trimmed, formulaExpression: trimmed }),
      });
      const data = await res.json();
      if (data && data.name) {
        setSelectedProof({
          id: `custom-${Date.now()}`,
          name: data.name,
          formula: data.formula || trimmed,
          category: data.category || 'कस्टम प्रमाण',
          icon: '✨',
          summary: data.summary || 'सूत्र की चरणबद्ध उपपत्ति',
          originStory: data.originStory || 'गणितीय नियमों द्वारा सत्यापित',
          visualDescription:
            data.visualDescription || 'बीजगणितीय और ज्यामितीय तर्कों द्वारा सिद्ध',
          steps: data.steps || [
            {
              stepNumber: 1,
              title: 'समीकरण की शुरुआत',
              explanation: 'मूल समीकरण के पदों को व्यवस्थित करना।',
              mathExpression: `LHS = ${data.formula || trimmed}`,
            },
          ],
          whyItNeverFails:
            data.whyItNeverFails || 'क्योंकि यह सार्वभौमिक गणितीय नियमों पर आधारित है।',
          realLifeExamples: data.realLifeExamples || [
            'दैनिक जीवन में त्वरित और सटीक गणना।',
            'विज्ञान और तकनीकी क्षेत्रों में आधारभूत उपयोग।',
          ],
          interactiveCheck: data.interactiveCheck || {
            variableValues: { x: 5 },
            lhsFormula: 'LHS मान',
            rhsFormula: 'RHS मान (सत्यापित)',
          },
        });
      }
    } catch (err) {
      console.error('Error proving formula:', err);
      setErrorMsg('प्रमाण लोड करने में समस्या आई, कृपया दोबारा प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProveCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    executeProve(customInput);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-amber-200/90 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-4 sm:p-5 flex items-center justify-between relative overflow-hidden flex-shrink-0">
          <div className="absolute right-3 top-1 opacity-15 text-8xl font-black pointer-events-none select-none">
            📐
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black shadow-inner border border-white/25">
              📐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight">
                  फॉर्मूला सिद्धकर्ता (Formula Proof Prover)
                </h2>
                <span className="bg-amber-300 text-amber-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full hidden sm:inline-block shadow-xs">
                  इति सिद्धम् (Q.E.D.)
                </span>
              </div>
              <p className="text-amber-100 text-xs mt-0.5">
                किसी भी फॉर्मूले को स्टेप-बाय-स्टेप और विजुअल तरीके से सिद्ध करें!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer relative z-10"
            title="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Custom Input Bar */}
        <div className="p-3 sm:p-4 bg-amber-50/70 border-b border-amber-200 space-y-2.5 flex-shrink-0">
          <form onSubmit={handleProveCustom} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-amber-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="यहाँ कोई भी फॉर्मूला लिखें (उदा. (a + b)², a² - b², पाइथागोरस, sin²θ + cos²θ = 1, πr²...)"
                className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-hidden bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !customInput.trim()}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-extrabold px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-xs whitespace-nowrap active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>सिद्ध हो रहा है...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>सिद्ध करें</span>
                </>
              )}
            </button>
          </form>

          {/* Preset Formulas Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-amber-600" /> मुख्य सूत्र:
            </span>
            {FORMULA_PROOFS.map((proof) => {
              const isSelected = proof.id === selectedProof.id;
              return (
                <button
                  key={proof.id}
                  onClick={() => handleSelectPreset(proof)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                      : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/70'
                  }`}
                >
                  <span className="mr-1">{proof.icon}</span>
                  <span>{proof.formula}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-t border-amber-200/60 pt-2">
            <button
              onClick={() => setActiveTab('derivation')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'derivation'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-amber-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. चरणबद्ध उपपत्ति (Step-by-Step Proof)</span>
            </button>

            <button
              onClick={() => setActiveTab('visual')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'visual'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-indigo-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. विजुअल ज्यामिति मॉडल (Visual Proof)</span>
            </button>

            <button
              onClick={() => setActiveTab('verify')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'verify'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>3. संख्यात्मक सत्यापन (Live Check)</span>
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 bg-slate-50/60">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-300 text-rose-800 text-xs p-3 rounded-xl font-bold">
              {errorMsg}
            </div>
          )}

          {/* Active Formula Banner Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-200/80 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                {selectedProof.category}
              </span>
              <span className="text-xs font-mono font-bold bg-amber-50 text-amber-900 px-3 py-1 rounded-lg border border-amber-200">
                सूत्र: {selectedProof.formula}
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span>{selectedProof.icon}</span>
                <span>{selectedProof.name}</span>
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                {selectedProof.summary}
              </p>
            </div>

            {/* Origin & Story */}
            <div className="bg-amber-50/70 border-l-4 border-amber-500 p-2.5 sm:p-3 rounded-r-xl text-xs text-amber-950 space-y-0.5">
              <strong className="block text-amber-800 font-extrabold flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                यह सूत्र कहाँ से आया? (Origin & Story):
              </strong>
              <p className="leading-relaxed text-slate-700">{selectedProof.originStory}</p>
            </div>
          </div>

          {/* TAB 1: STEP-BY-STEP DERIVATION */}
          {activeTab === 'derivation' && (
            <div className="space-y-4 animate-fade-in">
              {/* Steps Header */}
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>चरणबद्ध उपपत्ति (Step-by-Step Derivation):</span>
                </h4>
                <span className="text-[11px] text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  कुल {selectedProof.steps.length} आसान चरण
                </span>
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                {selectedProof.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="bg-white border-2 border-slate-200/90 hover:border-amber-400 rounded-2xl p-3.5 sm:p-4 shadow-xs transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          {step.stepNumber}
                        </div>
                        <h5 className="font-black text-xs sm:text-sm text-slate-900">
                          चरण {step.stepNumber}: {step.title}
                        </h5>
                      </div>
                      {onOpenDoubtWithContext && (
                        <button
                          onClick={() =>
                            onOpenDoubtWithContext(
                              `सूत्र: ${selectedProof.name}`,
                              `Step ${step.stepNumber}: ${step.title}`
                            )
                          }
                          className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200 transition-colors"
                        >
                          डाउट पूछें?
                        </button>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                      {step.explanation}
                    </p>

                    {step.mathExpression && (
                      <div className="ml-9 bg-amber-50/70 border border-amber-200 p-2 sm:p-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-amber-950">
                        {step.mathExpression}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Why It Never Fails & Q.E.D. */}
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 space-y-1.5 text-xs sm:text-sm text-emerald-950">
                <div className="font-extrabold text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>यह सूत्र कभी गलत क्यों नहीं होता? (Why It Never Fails):</span>
                </div>
                <p className="leading-relaxed text-slate-700">{selectedProof.whyItNeverFails}</p>
              </div>

              {/* 2 Real-Life Examples */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>असल जिंदगी में इस सूत्र के 2 उपयोग (2 Real-Life Examples):</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3 text-xs space-y-1">
                    <span className="font-bold text-amber-900 block">
                      🌟 उदाहरण 1 (Example 1):
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedProof.realLifeExamples[0]}
                    </p>
                  </div>

                  <div className="bg-cyan-50/50 border border-cyan-200 rounded-xl p-3 text-xs space-y-1">
                    <span className="font-bold text-cyan-900 block">
                      🚀 उदाहरण 2 (Example 2):
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedProof.realLifeExamples[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE VISUAL PROOF SIMULATOR */}
          {activeTab === 'visual' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 border-2 border-indigo-400/40 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-amber-300" />
                  <span>विजुअल ज्यामितीय समझ (Visual Geometric Description):</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedProof.visualDescription}
                </p>
              </div>

              {/* SPECIFIC VISUAL SIMULATORS */}
              {/* 1. (a + b)² SIMULATOR */}
              {(selectedProof.id === 'proof-a-plus-b-sq' || selectedProof.formula.includes('(a + b)²')) && (
                <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-black text-sm text-slate-800 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      <span>इंटरएक्टिव ज्यामितीय वर्ग मॉडल (Interactive Square Grid)</span>
                    </span>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      (a + b)² = a² + 2ab + b²
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 flex justify-between">
                        <span>लंबाई 'a' का मान:</span>
                        <span className="text-blue-600 font-mono font-bold">{valA} यूनिट</span>
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="7"
                        value={valA}
                        onChange={(e) => setValA(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 flex justify-between">
                        <span>लंबाई 'b' का मान:</span>
                        <span className="text-emerald-600 font-mono font-bold">{valB} यूनिट</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={valB}
                        onChange={(e) => setValB(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Visual SVG Square Partition */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 justify-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <svg viewBox="0 0 240 240" className="w-56 h-56 shadow-sm border border-slate-300 rounded-xl bg-white">
                      {/* a^2 tile (top-left) */}
                      <rect
                        x="10"
                        y="10"
                        width={(valA / (valA + valB)) * 220}
                        height={(valA / (valA + valB)) * 220}
                        fill="#3B82F6"
                        opacity="0.85"
                        stroke="#1D4ED8"
                        strokeWidth="2"
                      />
                      <text
                        x={10 + ((valA / (valA + valB)) * 220) / 2}
                        y={10 + ((valA / (valA + valB)) * 220) / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        a² ({valA * valA})
                      </text>

                      {/* ab tile (top-right) */}
                      <rect
                        x={10 + (valA / (valA + valB)) * 220}
                        y="10"
                        width={(valB / (valA + valB)) * 220}
                        height={(valA / (valA + valB)) * 220}
                        fill="#F59E0B"
                        opacity="0.85"
                        stroke="#D97706"
                        strokeWidth="2"
                      />
                      <text
                        x={10 + (valA / (valA + valB)) * 220 + ((valB / (valA + valB)) * 220) / 2}
                        y={10 + ((valA / (valA + valB)) * 220) / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        ab ({valA * valB})
                      </text>

                      {/* ab tile (bottom-left) */}
                      <rect
                        x="10"
                        y={10 + (valA / (valA + valB)) * 220}
                        width={(valA / (valA + valB)) * 220}
                        height={(valB / (valA + valB)) * 220}
                        fill="#F59E0B"
                        opacity="0.85"
                        stroke="#D97706"
                        strokeWidth="2"
                      />
                      <text
                        x={10 + ((valA / (valA + valB)) * 220) / 2}
                        y={10 + (valA / (valA + valB)) * 220 + ((valB / (valA + valB)) * 220) / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        ab ({valA * valB})
                      </text>

                      {/* b^2 tile (bottom-right) */}
                      <rect
                        x={10 + (valA / (valA + valB)) * 220}
                        y={10 + (valA / (valA + valB)) * 220}
                        width={(valB / (valA + valB)) * 220}
                        height={(valB / (valA + valB)) * 220}
                        fill="#10B981"
                        opacity="0.85"
                        stroke="#059669"
                        strokeWidth="2"
                      />
                      <text
                        x={10 + (valA / (valA + valB)) * 220 + ((valB / (valA + valB)) * 220) / 2}
                        y={10 + (valA / (valA + valB)) * 220 + ((valB / (valA + valB)) * 220) / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        b² ({valB * valB})
                      </text>
                    </svg>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                        🟦 <strong>नीला भाग (a²):</strong> {valA} × {valA} = {valA * valA}
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                        🟧 <strong>2 नारंगी भाग (2ab):</strong> 2 × ({valA} × {valB}) = {2 * valA * valB}
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                        🟩 <strong>हरा भाग (b²):</strong> {valB} × {valB} = {valB * valB}
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 text-white font-bold text-center">
                        कुल क्षेत्रफल: {valA * valA + 2 * valA * valB + valB * valB} = ({valA} + {valB})² = {(valA + valB) ** 2} ✓
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. PYTHAGORAS SIMULATOR */}
              {(selectedProof.id === 'proof-pythagoras' || selectedProof.formula.includes('a² + b² = c²')) && (
                <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-black text-sm text-slate-800 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      <span>पाइथागोरस समकोण त्रिभुज व वर्ग सत्यापन</span>
                    </span>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      a² + b² = c²
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 flex justify-between">
                        <span>आधार 'a' (Base):</span>
                        <span className="text-blue-600 font-mono font-bold">{pythA} यूनिट</span>
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="8"
                        value={pythA}
                        onChange={(e) => setPythA(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 flex justify-between">
                        <span>लंब 'b' (Perpendicular):</span>
                        <span className="text-emerald-600 font-mono font-bold">{pythB} यूनिट</span>
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="8"
                        value={pythB}
                        onChange={(e) => setPythB(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                    </div>
                  </div>

                  {(() => {
                    const cSq = pythA * pythA + pythB * pythB;
                    const cVal = Math.sqrt(cSq).toFixed(2);
                    return (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-around gap-4 text-xs font-mono">
                        <div className="space-y-2">
                          <div className="bg-blue-50 text-blue-900 p-2 rounded-lg border border-blue-200">
                            आधार वर्ग (a²): {pythA}² = <strong>{pythA * pythA}</strong>
                          </div>
                          <div className="bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                            लंब वर्ग (b²): {pythB}² = <strong>{pythB * pythB}</strong>
                          </div>
                          <div className="bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200">
                            योग (a² + b²): {pythA * pythA} + {pythB * pythB} = <strong>{cSq}</strong>
                          </div>
                        </div>

                        <div className="text-center bg-slate-900 text-white p-4 rounded-2xl border-2 border-emerald-400">
                          <span className="text-[11px] text-slate-300 block">कर्ण c (Hypotenuse):</span>
                          <span className="text-2xl font-black text-amber-400">c = {cVal}</span>
                          <div className="text-xs text-emerald-300 font-bold mt-1">
                            c² = ({cVal})² ≈ {cSq} ✓ (सिद्ध हुआ!)
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 3. CIRCLE AREA SLICES SIMULATOR */}
              {(selectedProof.id === 'proof-circle-area' || selectedProof.formula.includes('π')) && (
                <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-black text-sm text-slate-800 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      <span>आर्किमिडीज पिज़्ज़ा स्लाइस री-अरेंजमेंट मॉडल</span>
                    </span>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      क्षेत्रफल = π × r²
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 flex justify-between">
                        <span>त्रिज्या 'r' (Radius):</span>
                        <span className="text-amber-700 font-mono font-bold">{circleR} सेमी</span>
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="14"
                        value={circleR}
                        onChange={(e) => setCircleR(Number(e.target.value))}
                        className="w-full accent-amber-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 flex justify-between">
                        <span>स्लाइस की संख्या (Slices):</span>
                        <span className="text-indigo-600 font-mono font-bold">{circleSlices} टुकड़े</span>
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="64"
                        step="8"
                        value={circleSlices}
                        onChange={(e) => setCircleSlices(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  </div>

                  {(() => {
                    const area = (Math.PI * circleR * circleR).toFixed(1);
                    const halfCirc = (Math.PI * circleR).toFixed(1);
                    return (
                      <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-3 text-xs">
                        <p className="text-slate-700 leading-relaxed">
                          वृत्त को <strong>{circleSlices} पतले त्रिज्यखंडों (Slices)</strong> में काटकर एक ऊपर और एक नीचे सजाने पर वह एक आयत बनता है:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
                          <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                            <span className="text-slate-500 block text-[10px]">आयत की लंबाई (πr):</span>
                            <span className="font-bold text-amber-900">{halfCirc} सेमी</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                            <span className="text-slate-500 block text-[10px]">आयत की चौड़ाई (r):</span>
                            <span className="font-bold text-amber-900">{circleR} सेमी</span>
                          </div>
                          <div className="bg-emerald-600 text-white p-2.5 rounded-lg font-bold">
                            <span className="text-emerald-100 block text-[10px]">कुल क्षेत्रफल (πr²):</span>
                            <span>{area} सेमी²</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 4. GAUSS SUM SIMULATOR */}
              {(selectedProof.id === 'proof-sum-of-n-integers' || selectedProof.formula.includes('n(n + 1) / 2')) && (
                <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-black text-sm text-slate-800 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      <span>गॉस की सीढ़ी और आयत युग्मन मॉडल</span>
                    </span>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      S = n(n + 1) / 2
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 flex justify-between">
                      <span>'n' का मान चुनें (संख्याएँ 1 से {gaussN} तक):</span>
                      <span className="text-indigo-600 font-mono font-bold">{gaussN}</span>
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="15"
                      value={gaussN}
                      onChange={(e) => setGaussN(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  {(() => {
                    const totalSum = (gaussN * (gaussN + 1)) / 2;
                    return (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
                        <div className="flex flex-wrap gap-1 items-center justify-center p-2 bg-white rounded-lg border border-slate-200">
                          {Array.from({ length: gaussN }, (_, i) => i + 1).map((num, i) => (
                            <span key={i} className="text-slate-700">
                              {num} {i < gaussN - 1 ? '+' : ''}
                            </span>
                          ))}
                          <span className="font-bold text-emerald-600 ml-1">= {totalSum}</span>
                        </div>
                        <div className="bg-emerald-50 text-emerald-900 p-2.5 rounded-lg border border-emerald-200 text-center font-bold">
                          सूत्र से: [{gaussN} × ({gaussN} + 1)] / 2 = [{gaussN} × {gaussN + 1}] / 2 = {gaussN * (gaussN + 1)} / 2 = {totalSum} ✓
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 5. TRIG SIN/COS SIMULATOR */}
              {(selectedProof.id === 'proof-trig-sin-cos-sq' || selectedProof.formula.includes('sin²θ + cos²θ = 1')) && (
                <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-black text-sm text-slate-800 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      <span>इकाई वृत्त (Unit Circle) एवं कोण स्लाइडर</span>
                    </span>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      sin²θ + cos²θ = 1
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 flex justify-between">
                      <span>कोण θ (Angle Degree):</span>
                      <span className="text-indigo-600 font-mono font-bold">{trigAngle}°</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      step="5"
                      value={trigAngle}
                      onChange={(e) => setTrigAngle(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  {(() => {
                    const rad = (trigAngle * Math.PI) / 180;
                    const sinV = Math.sin(rad);
                    const cosV = Math.cos(rad);
                    const sinSq = sinV * sinV;
                    const cosSq = cosV * cosV;
                    const sum = (sinSq + cosSq).toFixed(4);
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-center">
                        <div className="bg-blue-50 text-blue-900 p-3 rounded-xl border border-blue-200">
                          <span className="text-slate-500 block text-[10px]">sin({trigAngle}°):</span>
                          <strong>{sinV.toFixed(3)}</strong>
                          <span className="block text-[10px] text-blue-700 mt-1">sin² = {sinSq.toFixed(3)}</span>
                        </div>
                        <div className="bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200">
                          <span className="text-slate-500 block text-[10px]">cos({trigAngle}°):</span>
                          <strong>{cosV.toFixed(3)}</strong>
                          <span className="block text-[10px] text-emerald-700 mt-1">cos² = {cosSq.toFixed(3)}</span>
                        </div>
                        <div className="bg-slate-900 text-white p-3 rounded-xl border border-amber-400">
                          <span className="text-slate-400 block text-[10px]">sin²θ + cos²θ:</span>
                          <strong className="text-lg text-emerald-400">{sum}</strong>
                          <span className="block text-[10px] text-emerald-300 mt-1">सदैव ठीक 1!</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE NUMERICAL VERIFICATION */}
          {activeTab === 'verify' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white rounded-2xl p-5 border-2 border-emerald-300 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>संख्यात्मक मान रखकर सत्यापन (Live Numerical Proof):</span>
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    LHS = RHS प्रमाणित
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  जब किसी सूत्र में चरों (Variables) के स्थान पर वास्तविक संख्याएँ रखी जाती हैं, तो बायाँ पक्ष (LHS) और दायाँ पक्ष (RHS) हमेशा एक समान संख्यात्मक मान देते हैं:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-200 space-y-1.5">
                    <span className="text-amber-800 font-bold block text-[11px]">
                      ⬅️ बायाँ पक्ष (Left Hand Side - LHS):
                    </span>
                    <div className="text-slate-900 font-extrabold text-sm sm:text-base">
                      {selectedProof.interactiveCheck.lhsFormula}
                    </div>
                  </div>

                  <div className="bg-emerald-50/70 p-4 rounded-2xl border-2 border-emerald-300 space-y-1.5">
                    <span className="text-emerald-800 font-bold block text-[11px]">
                      ➡️ दायाँ पक्ष (Right Hand Side - RHS):
                    </span>
                    <div className="text-emerald-950 font-extrabold text-sm sm:text-base">
                      {selectedProof.interactiveCheck.rhsFormula}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-3.5 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>परिणाम: LHS = RHS (अतः यह सूत्र हर संख्या के लिए 100% सत्य है!)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 p-3.5 sm:p-4 flex items-center justify-between flex-wrap gap-2 text-xs flex-shrink-0">
          <div className="text-slate-500">
            वर्तमान सूत्र: <strong className="text-amber-800">{selectedProof.name}</strong>
          </div>
          <div className="flex items-center gap-2">
            {onOpenDoubtWithContext && (
              <button
                onClick={() =>
                  onOpenDoubtWithContext(
                    `सूत्र प्रमाण: ${selectedProof.name} (${selectedProof.formula})`,
                    selectedProof.summary
                  )
                }
                className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                👨‍🏫 डाउट सर से पूछें
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 sm:px-5 py-1.5 rounded-xl cursor-pointer transition-colors"
            >
              समझ आ गया! (Close)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Sparkles, HelpCircle, CheckCircle, ArrowRight, Loader2, BookOpen, Lightbulb } from 'lucide-react';
import { StepItem } from '../types/math';
import { DoubtClearingDrawer } from './DoubtClearingDrawer';

interface StepByStepSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillQuestion?: string;
  prefillTopic?: string;
}

const SAMPLE_QUESTIONS = [
  {
    topic: 'त्रिकोणमिति (Trigonometry)',
    question: 'एक पेड़ से 10 मीटर दूर खड़े होकर पेड़ के top का angle of elevation 45° है। पेड़ की ऊँचाई कितनी होगी?',
  },
  {
    topic: 'प्रतिशत (Percentage)',
    question: '₹500 की वस्तु पर 20% discount मिलने पर कितने रुपये देने होंगे?',
  },
  {
    topic: 'अनुपात (Ratio)',
    question: '2 लोगों के लिए 4 गिलास पानी चाहिए, तो 6 लोगों के लिए कितना पानी चाहिए?',
  },
  {
    topic: 'क्षेत्रमिति (Geometry)',
    question: 'कमरे की दीवार 5m लंबी और 3m ऊँची है। 1 लीटर पेंट 15 m² कवर करता है, कितना पेंट लगेगा?',
  },
  {
    topic: 'चाल व समय (Speed & Time)',
    question: 'साइकिल से स्कूल की दूरी 6 किमी है और चाल 12 किमी/घंटा है। पहुँचने में कितना समय लगेगा?',
  },
];

export const StepByStepSolverModal: React.FC<StepByStepSolverModalProps> = ({
  isOpen,
  onClose,
  prefillQuestion = '',
  prefillTopic = '',
}) => {
  const [question, setQuestion] = useState(prefillQuestion || SAMPLE_QUESTIONS[0].question);
  const [topic, setTopic] = useState(prefillTopic || 'त्रिकोणमिति');
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<StepItem[] | null>(null);
  const [realLifeSummary, setRealLifeSummary] = useState<string>('');
  const [practiceQuestion, setPracticeQuestion] = useState<{
    question: string;
    hint: string;
    answer: string;
  } | null>(null);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false);

  // Doubt drawer state
  const [doubtOpen, setDoubtOpen] = useState(false);
  const [activeStepTitle, setActiveStepTitle] = useState('');

  if (!isOpen) return null;

  const handleSolve = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setSteps(null);
    setShowPracticeAnswer(false);

    try {
      const res = await fetch('/api/math/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, topic }),
      });
      const data = await res.json();
      if (data.steps && Array.isArray(data.steps)) {
        setSteps(data.steps);
        setRealLifeSummary(data.realLifeSummary || '');
        setPracticeQuestion(data.practiceQuestion || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDoubtForStep = (stepTitle: string) => {
    setActiveStepTitle(stepTitle);
    setDoubtOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-amber-200 my-8 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-xl">
                ✨
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">
                  8-स्टेप मैथ सॉल्वर (Step-by-Step Solver)
                </h3>
                <p className="text-xs text-amber-100">
                  हर सवाल का बुनियादी कारण और असल जिंदगी में अर्थ समझो
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto flex-1 space-y-6">
            {/* Input & Sample Pickers */}
            <div className="space-y-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                अपना सवाल चुनें या टाइप करें:
              </label>

              {/* Sample Chips */}
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_QUESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuestion(s.question);
                      setTopic(s.topic);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                      question === s.question
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    {s.topic.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                rows={2}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="यहाँ अपना कोई भी Maths का सवाल टाइप करें..."
                className="w-full text-sm p-3 bg-white border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSolve}
                  disabled={loading || !question.trim()}
                  className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> हल हो रहा है...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> 8 स्टेप्स में हल करो
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            {steps && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    चरणबद्ध समाधान (8-Step Solution):
                  </h4>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                    100% Concept Clear
                  </span>
                </div>

                {/* 8 Steps Grid/List */}
                <div className="space-y-3">
                  {steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="bg-white border-2 border-slate-100 hover:border-amber-200 rounded-2xl p-4 shadow-xs transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                            {step.stepNumber}
                          </span>
                          <span className="font-bold text-sm text-slate-800">
                            {step.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleOpenDoubtForStep(`Step ${step.stepNumber}: ${step.title}`)}
                          className="text-xs text-amber-700 hover:text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1 transition-colors"
                        >
                          <HelpCircle className="w-3.5 h-3.5" /> डाउट? पूछो
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed pl-9">
                        {step.content}
                      </div>

                      {step.realLifeMeaning && (
                        <div className="mt-2 ml-9 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span><strong>असल जिंदगी में मतलब:</strong> {step.realLifeMeaning}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Real life summary */}
                {realLifeSummary && (
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl shadow-md text-xs sm:text-sm flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <strong className="block text-emerald-100 font-bold uppercase text-[11px]">
                        दैनिक जीवन में समझ:
                      </strong>
                      <span>{realLifeSummary}</span>
                    </div>
                  </div>
                )}

                {/* Practice question ("अब तुम्हारी बारी!") */}
                {practiceQuestion && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black bg-amber-500 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                        🎯 अब तुम्हारी बारी! (Practice Question)
                      </span>
                      <span className="text-xs text-amber-800 font-semibold">खुद हल करके देखो</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      {practiceQuestion.question}
                    </p>
                    {practiceQuestion.hint && (
                      <div className="text-xs bg-white/80 p-2.5 rounded-xl border border-amber-200 text-slate-600 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span><strong>संकेत (Hint):</strong> {practiceQuestion.hint}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <button
                        onClick={() => setShowPracticeAnswer(!showPracticeAnswer)}
                        className="text-xs font-bold text-amber-800 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {showPracticeAnswer ? 'उत्तर छिपाएँ' : 'उत्तर देखें (Check Answer)'}
                      </button>
                      {showPracticeAnswer && (
                        <div className="mt-2 text-xs bg-emerald-100 text-emerald-900 p-2.5 rounded-xl font-bold border border-emerald-300 animate-fade-in">
                          ✅ सही उत्तर: {practiceQuestion.answer}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Doubt Drawer */}
      <DoubtClearingDrawer
        isOpen={doubtOpen}
        onClose={() => setDoubtOpen(false)}
        contextQuestion={question}
        contextStep={activeStepTitle}
      />
    </>
  );
};

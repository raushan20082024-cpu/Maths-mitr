/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TOPICS_DATA } from './data/lessonsData';
import { Header } from './components/Header';
import { LessonView } from './components/LessonView';
import { StepByStepSolverModal } from './components/StepByStepSolverModal';
import { FormulaBankModal } from './components/FormulaBankModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { DoubtClearingDrawer } from './components/DoubtClearingDrawer';
import { VedicMathsModal } from './components/VedicMathsModal';
import { FormulaProofModal } from './components/FormulaProofModal';
import { DoubtSubject } from './components/DoubtClearingDrawer';
import { MessageCircleQuestion, Sparkles, Trophy, Heart, Zap, Atom, Globe2, ArrowRight, Send, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentTopicId, setCurrentTopicId] = useState<string>('trigonometry');
  const [xp, setXp] = useState<number>(140);
  const [streak] = useState<number>(3);

  // Modals
  const [solverOpen, setSolverOpen] = useState<boolean>(false);
  const [solverQuestion, setSolverQuestion] = useState<string>('');
  const [solverTopic, setSolverTopic] = useState<string>('');

  const [formulaOpen, setFormulaOpen] = useState<boolean>(false);
  const [challengeOpen, setChallengeOpen] = useState<boolean>(false);
  const [generalDoubtOpen, setGeneralDoubtOpen] = useState<boolean>(false);
  const [doubtQuery, setDoubtQuery] = useState<string>('');
  const [doubtSubject, setDoubtSubject] = useState<DoubtSubject>('math');
  const [vedicOpen, setVedicOpen] = useState<boolean>(false);
  const [proofOpen, setProofOpen] = useState<boolean>(false);
  const [proofQuery, setProofQuery] = useState<string>('');

  // Quick Home Ask State
  const [homeAskQuery, setHomeAskQuery] = useState<string>('');
  const [homeAskSubject, setHomeAskSubject] = useState<DoubtSubject>('science');

  // Active topic & lesson
  const currentTopic =
    TOPICS_DATA.find((t) => t.id === currentTopicId) || TOPICS_DATA[0];
  const currentLesson = currentTopic.lessons[0];

  const handleAddXP = (amount: number) => {
    setXp((prev) => prev + amount);
  };

  const handleOpenSolverWithQuestion = (q: string, topic: string) => {
    setSolverQuestion(q);
    setSolverTopic(topic);
    setSolverOpen(true);
  };

  const handleAskSirDirectly = (query: string, subject: DoubtSubject) => {
    setDoubtSubject(subject);
    setDoubtQuery(query);
    setGeneralDoubtOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-slate-800">
      {/* Header with Nav, XP & Topic Bar */}
      <Header
        topics={TOPICS_DATA}
        currentTopicId={currentTopicId}
        onSelectTopic={setCurrentTopicId}
        xp={xp}
        streak={streak}
        onOpenSolver={() => {
          setSolverQuestion(currentLesson.solvedExample.problemStatement);
          setSolverTopic(currentLesson.title);
          setSolverOpen(true);
        }}
        onOpenFormulas={() => setFormulaOpen(true)}
        onOpenChallenge={() => setChallengeOpen(true)}
        onOpenDoubt={() => {
          setDoubtSubject('math');
          setDoubtQuery('');
          setGeneralDoubtOpen(true);
        }}
        onOpenScienceDoubt={() => {
          setDoubtSubject('science');
          setDoubtQuery('');
          setGeneralDoubtOpen(true);
        }}
        onOpenSocialDoubt={() => {
          setDoubtSubject('social_science');
          setDoubtQuery('');
          setGeneralDoubtOpen(true);
        }}
        onOpenVedicMaths={() => setVedicOpen(true)}
        onOpenFormulaProof={() => {
          setProofQuery('');
          setProofOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Topic Real-life Banner */}
        <div className="mb-4 bg-gradient-to-r from-amber-100/80 to-orange-100/60 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentTopic.icon}</span>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-amber-950">
                विषय: {currentTopic.title} ({currentTopic.englishTitle})
              </h2>
              <p className="text-xs text-amber-900 font-medium">
                🎯 {currentTopic.realLifeSnippet}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setProofQuery('');
                setProofOpen(true);
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black px-3 py-2 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 border border-indigo-400"
              title="किसी भी फॉर्मूले को सिद्ध करें"
            >
              <span>📐 सिद्ध करें (Proof)</span>
            </button>

            <button
              onClick={() => setVedicOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs font-black px-3 py-2 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 border border-amber-300"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>⚡ वैदिक ट्रिक्स</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('real-world-project-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-3 py-2 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95"
            >
              <span>🚀 रियल प्रोजेक्ट</span>
            </button>

            <button
              onClick={() => {
                handleAskSirDirectly('सर, विज्ञान का कोई भी रहस्य या नियम समझाइए', 'science');
              }}
              className="hidden lg:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black px-3 py-2 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 border border-emerald-500"
              title="डाउट सर से विज्ञान पूछें"
            >
              <Atom className="w-3.5 h-3.5" />
              <span>🔬 विज्ञान शंका</span>
            </button>

            <button
              onClick={() => {
                handleAskSirDirectly('सर, सामाजिक विज्ञान (इतिहास, भूगोल या संविधान) समझाइए', 'social_science');
              }}
              className="hidden xl:flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-black px-3 py-2 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 border border-blue-500"
              title="डाउट सर से सामाजिक विज्ञान पूछें"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>🌍 सोशल साइंस</span>
            </button>

            <button
              onClick={() => {
                setSolverQuestion(currentLesson.solvedExample.problemStatement);
                setSolverTopic(currentLesson.title);
                setSolverOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 bg-white hover:bg-amber-50 text-amber-800 text-xs font-extrabold px-3 py-2 rounded-xl border border-amber-300 shadow-xs cursor-pointer transition-transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>8-Step Solver</span>
            </button>
          </div>
        </div>

        {/* 🌟 Dedicated Multi-Subject Kids Curiosity Hub: Any Child Can Ask Science & Social Science */}
        <div className="mb-6 bg-gradient-to-r from-emerald-50 via-sky-50 to-indigo-50 border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-xl shadow-md">
                🔬
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span>बाल शंका केंद्र: विज्ञान व सोशल साइंस से कोई भी सवाल पूछें!</span>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                    3-in-1 AI सर
                  </span>
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  कोई भी बच्चा बोलकर 🎤 या लिखकर सवाल पूछ सकता है — 2 व्यावहारिक उदाहरणों और बोलकर उत्तर पाएँ 🔊
                </p>
              </div>
            </div>

            {/* Subject Selector Buttons */}
            <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setHomeAskSubject('science')}
                className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  homeAskSubject === 'science'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <Atom className="w-3 h-3" />
                <span>विज्ञान</span>
              </button>
              <button
                onClick={() => setHomeAskSubject('social_science')}
                className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  homeAskSubject === 'social_science'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                <Globe2 className="w-3 h-3" />
                <span>सोशल साइंस</span>
              </button>
              <button
                onClick={() => setHomeAskSubject('math')}
                className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  homeAskSubject === 'math'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-amber-700'
                }`}
              >
                <span>📐 गणित</span>
              </button>
            </div>
          </div>

          {/* Quick Input Bar right on home screen */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (homeAskQuery.trim()) {
                handleAskSirDirectly(homeAskQuery.trim(), homeAskSubject);
                setHomeAskQuery('');
              }
            }}
            className="flex items-center gap-2 mb-3"
          >
            <input
              type="text"
              value={homeAskQuery}
              onChange={(e) => setHomeAskQuery(e.target.value)}
              placeholder={
                homeAskSubject === 'science'
                  ? 'विज्ञान का कोई भी सवाल पूछें (उदा. आसमान नीला क्यों है? बर्फ क्यों तैरती है? न्यूटन के नियम)...'
                  : homeAskSubject === 'social_science'
                  ? 'सोशल साइंस का सवाल पूछें (उदा. 1857 की क्रांति, संविधान, दिन-रात, दांडी यात्रा)...'
                  : 'गणित का कोई सवाल पूछें (उदा. 51×42 वैदिक ट्रिक, (a+b)² सिद्ध करें)...'
              }
              className="flex-1 bg-white text-xs sm:text-sm px-3.5 py-2.5 sm:py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium placeholder:text-slate-400 shadow-xs"
            />
            <button
              type="submit"
              disabled={!homeAskQuery.trim()}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold px-4 py-2.5 sm:py-3 rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center gap-1.5 flex-shrink-0"
            >
              <span>उत्तर पाएँ</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* 1-Tap Popular Kids Questions Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <span>⚡ 1-क्लिक में पूछें:</span>
            </span>

            {homeAskSubject === 'science' && (
              <>
                <button
                  onClick={() => handleAskSirDirectly('सर, दिन में आसमान नीला क्यों दिखता है? इसका वैज्ञानिक कारण बताइए', 'science')}
                  className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🌌 आसमान नीला क्यों है?</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, बारिश के बाद इंद्रधनुष (Rainbow) कैसे बनता है?', 'science')}
                  className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🌈 इंद्रधनुष कैसे बनता है?</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, पौधों में प्रकाश संश्लेषण (Photosynthesis) कैसे होता है?', 'science')}
                  className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🌿 पौधे खाना कैसे बनाते हैं?</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, बर्फ ठोस होकर भी पानी पर क्यों तैरती है?', 'science')}
                  className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🧊 बर्फ क्यों तैरती है?</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, न्यूटन के गति के 3 नियम 2 दैनिक उदाहरणों के साथ समझाइए', 'science')}
                  className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🍎 न्यूटन के 3 नियम</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, प्याज काटते समय आंखों से आंसू क्यों आते हैं?', 'science')}
                  className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🧅 प्याज से आंसू क्यों?</span>
                </button>
              </>
            )}

            {homeAskSubject === 'social_science' && (
              <>
                <button
                  onClick={() => handleAskSirDirectly('सर, महात्मा गांधी जी ने दांडी यात्रा क्यों की और नमक कानून कैसे तोड़ा?', 'social_science')}
                  className="bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🕊️ गांधी जी की दांडी यात्रा</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, भारतीय संविधान के 6 मौलिक अधिकार कौन-से हैं?', 'social_science')}
                  className="bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>📜 संविधान के 6 मौलिक अधिकार</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, 1857 की क्रांति के प्रमुख कारण और रानी लक्ष्मीबाई का योगदान बताइए', 'social_science')}
                  className="bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>⚔️ 1857 की क्रांति</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, पृथ्वी पर दिन-रात और 4 ऋतुएँ कैसे बदलती हैं?', 'social_science')}
                  className="bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🌍 दिन-रात व ऋतु परिवर्तन</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, 4500 साल पुरानी सिंधु घाटी सभ्यता (हड़प्पा) इतनी आधुनिक कैसे थी?', 'social_science')}
                  className="bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🏛️ सिंधु घाटी सभ्यता</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, हरित क्रांति क्या थी और भारत कैसे अन्नदाता बना?', 'social_science')}
                  className="bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🌾 हरित क्रांति</span>
                </button>
              </>
            )}

            {homeAskSubject === 'math' && (
              <>
                <button
                  onClick={() => handleAskSirDirectly('सर, 51 से किसी भी सम संख्या को गुणा करने का जादुई नियम (जैसे 51 × 42 = 2142) सिद्ध करके समझाइए', 'math')}
                  className="bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>🔥 51 × 42 = 2142 ट्रिक</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, 21 से गुणा करने का 1/5 भाग वाला नियम (जैसे 21 × 25 = 525) कैसे काम करता है?', 'math')}
                  className="bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>⚡ 21 × 25 = 525 ट्रिक</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('सर, (a + b)² = a² + 2ab + b² को सिद्ध करके दिखाइए', 'math')}
                  className="bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>📐 (a + b)² सिद्ध करें</span>
                </button>
                <button
                  onClick={() => handleAskSirDirectly('200 का 15% कितना होगा?', 'math')}
                  className="bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
                >
                  <span>💰 200 का 15%</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* The 11-Part Lesson View */}
        <LessonView
          lesson={currentLesson}
          onAddXP={handleAddXP}
          onOpenSolverWithQuestion={handleOpenSolverWithQuestion}
          onOpenProof={(query) => {
            setProofQuery(query);
            setProofOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-700 text-sm">
          <span>📐 गणित मित्र (Math Mitr)</span> • <span>12–15 वर्ष के विद्यार्थियों के लिए</span>
        </div>
        <p>
          कठिन Maths, Science व Social Science को आसान, दोस्ताना और असल जिंदगी के उदाहरणों से समझने का सबसे सरल माध्यम।
        </p>
        <p className="text-[11px] text-slate-400">
          Made with real-life pedagogy • Step-by-step problem solver • 3-in-1 Doubt Sir
        </p>
      </footer>

      {/* Floating Multi-Subject Doubt Help Hub */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 sm:p-2 rounded-3xl shadow-2xl border-2 border-white/80">
        {/* Quick Science Shortcut Button */}
        <button
          onClick={() => {
            setDoubtSubject('science');
            setDoubtQuery('');
            setGeneralDoubtOpen(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-3 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400"
          title="डाउट सर से विज्ञान पूछें"
        >
          <Atom className="w-3.5 h-3.5" />
          <span>विज्ञान</span>
        </button>

        {/* Quick Social Science Shortcut Button */}
        <button
          onClick={() => {
            setDoubtSubject('social_science');
            setDoubtQuery('');
            setGeneralDoubtOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-3 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-blue-400"
          title="डाउट सर से सामाजिक विज्ञान पूछें"
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span>सोशल साइंस</span>
        </button>

        {/* Main Doubt Sir Button */}
        <button
          onClick={() => {
            setDoubtSubject('math');
            setGeneralDoubtOpen(true);
          }}
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-amber-300"
        >
          <span className="text-lg">👨‍🏫</span>
          <span>डाउट सर</span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <StepByStepSolverModal
        isOpen={solverOpen}
        onClose={() => setSolverOpen(false)}
        prefillQuestion={solverQuestion}
        prefillTopic={solverTopic}
      />

      <FormulaBankModal
        isOpen={formulaOpen}
        onClose={() => setFormulaOpen(false)}
        onOpenProof={(query) => {
          setProofQuery(query);
          setProofOpen(true);
        }}
      />

      <DailyChallengeModal
        isOpen={challengeOpen}
        onClose={() => setChallengeOpen(false)}
        onAddXP={handleAddXP}
      />

      <DoubtClearingDrawer
        isOpen={generalDoubtOpen}
        onClose={() => {
          setGeneralDoubtOpen(false);
          setDoubtQuery('');
        }}
        contextQuestion={currentLesson.title}
        contextStep="सामान्य शंका"
        initialDoubtQuery={doubtQuery}
        initialSubject={doubtSubject}
        onOpenVisualProof={(fQuery) => {
          setProofQuery(fQuery);
          setProofOpen(true);
        }}
      />

      <VedicMathsModal
        isOpen={vedicOpen}
        onClose={() => setVedicOpen(false)}
        onAddXP={handleAddXP}
      />

      <FormulaProofModal
        isOpen={proofOpen}
        onClose={() => setProofOpen(false)}
        initialFormulaQuery={proofQuery}
        onOpenDoubtWithContext={(question, step) => {
          setDoubtQuery(`सर, ${question} फॉर्मूला सिद्ध करके दिखाइए`);
          setGeneralDoubtOpen(true);
        }}
      />
    </div>
  );
}

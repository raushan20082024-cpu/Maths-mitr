import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Send,
  Lightbulb,
  HeartHandshake,
  Loader2,
  Trash2,
  Smile,
  BookOpen,
  Layers,
  ArrowRight,
  Atom,
  Globe2,
  Calculator,
  Compass,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  HelpCircle,
} from 'lucide-react';

export type DoubtSubject = 'math' | 'science' | 'social_science';

interface DoubtClearingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextQuestion?: string;
  contextStep?: string;
  initialDoubtQuery?: string;
  initialSubject?: DoubtSubject;
  onOpenVisualProof?: (formulaQuery: string) => void;
}

interface DoubtResponse {
  teacherReply: string;
  simplerExample?: string;
  secondExample?: string;
  funFact?: string;
  keyTakeaway?: string;
  encouragement: string;
  relatedFormula?: string;
}

// 1. MATH DOUBTS & PROOFS
const MATH_GENERAL_DOUBTS = [
  { label: '❓ "ये formula क्यों लगाया?"', type: 'formula_why' },
  { label: '🔢 "यह number कहाँ से आया?"', type: 'number_where' },
  { label: '💡 "मुझे कुछ समझ नहीं आया"', type: 'not_understood' },
  { label: '✨ "200 का 15% कितना होगा?"', type: 'custom', text: '200 का 15% कितना होगा?' },
  { label: '📐 "tan 45° का मान 1 क्यों होता है?"', type: 'custom', text: 'tan 45° का मान 1 क्यों होता है?' },
  { label: '🎯 "सर, मुझे गणित से डर लगता है"', type: 'custom', text: 'सर, मुझे गणित से डर लगता है, कैसे सीखूँ?' },
  { label: '➕ "x + 8 = 20 कैसे हल करें?"', type: 'custom', text: 'सर, x + 8 = 20 समीकरण को कैसे हल करते हैं?' },
];

const MATH_FORMULA_PROOFS = [
  { label: '🔥 51 × 42 = 2142 ट्रिक', text: 'सर, 51 से किसी भी सम संख्या को गुणा करने का जादुई नियम (जैसे 51 × 42 = 2142) सिद्ध करके समझाइए' },
  { label: '⚡ 21 × 25 = 525 ट्रिक', text: 'सर, 21 से गुणा करने का 1/5 भाग वाला नियम (जैसे 21 × 25 = 525) कैसे काम करता है? सिद्ध करें' },
  { label: '📐 (a + b)² सिद्ध कीजिए', text: 'सर, (a + b)² = a² + 2ab + b² को सिद्ध करके दिखाइए' },
  { label: '📐 पाइथागोरस a² + b² = c²', text: 'सर, पाइथागोरस प्रमेय a² + b² = c² कैसे सिद्ध होता है?' },
  { label: '✂️ a² - b² = (a+b)(a-b)', text: 'सर, a² - b² = (a + b)(a - b) सिद्ध करके समझाइए' },
  { label: '🟦 (a - b)² सर्वसमिका', text: 'सर, (a - b)² = a² - 2ab + b² सिद्ध कीजिए' },
  { label: '⭕ वृत्त का क्षेत्रफल πr²', text: 'सर, वृत्त का क्षेत्रफल πr² कैसे आया? सिद्ध करें' },
  { label: '📐 sin²θ + cos²θ = 1', text: 'सर, sin²θ + cos²θ = 1 का प्रमाण समझाइए' },
  { label: '➕ गॉस योग n(n+1)/2', text: 'सर, 1 से n तक की संख्याओं का योग n(n+1)/2 सिद्ध कीजिए' },
  { label: '🚴 चाल = दूरी / समय', text: 'सर, चाल = दूरी / समय सूत्र की व्याख्या और प्रमाण दीजिए' },
  { label: '💰 साधारण ब्याज SI=(PRT)/100', text: 'सर, साधारण ब्याज का सूत्र SI = (P × R × T) / 100 कैसे बना?' },
];

// 2. SCIENCE: Kid Curiosity, Concepts & Experiments
const SCIENCE_CURIOSITY_DOUBTS = [
  { label: '🌌 आसमान नीला क्यों दिखता है?', text: 'सर, दिन में आसमान नीला क्यों दिखता है? इसका क्या वैज्ञानिक कारण है?' },
  { label: '🌈 इंद्रधनुष कैसे बनता है?', text: 'सर, बारिश के बाद आकाश में सात रंगों का इंद्रधनुष (Rainbow) कैसे बनता है?' },
  { label: '🧊 बर्फ पानी पर क्यों तैरती है?', text: 'सर, बर्फ ठोस होकर भी पानी पर क्यों तैरती है, डूबती क्यों नहीं?' },
  { label: '🧅 प्याज काटने पर आंसू क्यों आते हैं?', text: 'सर, प्याज काटते समय आंखों से आंसू क्यों निकलने लगते हैं?' },
  { label: '🌕 चांद का आकार क्यों बदलता है?', text: 'सर, चंद्रमा का आकार घटता-बढ़ता (कलाएँ) क्यों दिखाई देता है?' },
  { label: '🪐 सौरमंडल और उसके 8 ग्रह', text: 'सर, हमारे सौरमंडल के 8 ग्रहों और उनकी खास बातों के बारे में बताइए' },
  { label: '🍎 भोजन पेट में कैसे पचता है?', text: 'सर, हमारे शरीर का पाचन तंत्र (Digestive System) भोजन को कैसे पचाता है?' },
];

const SCIENCE_CONCEPTS_DOUBTS = [
  { label: '🌿 प्रकाश संश्लेषण कैसे होता है?', text: 'सर, पौधों में प्रकाश संश्लेषण (Photosynthesis) की प्रक्रिया सरल भाषा में समझाइए' },
  { label: '🍎 न्यूटन के गति के 3 नियम', text: 'सर, न्यूटन के गति के तीनों नियम (Newton\'s 3 Laws of Motion) 2 दैनिक उदाहरणों के साथ समझाइए' },
  { label: '🧲 चुंबक के ध्रुव और आकर्षण', text: 'सर, चुंबक के दोनों ध्रुव (North & South) और चुंबकीय क्षेत्र कैसे काम करते हैं?' },
  { label: '⚡ विद्युत परिपथ और धारा प्रवाह', text: 'सर, विद्युत परिपथ (Electric Circuit) और करंट का बहाव कैसे काम करता है?' },
  { label: '🧪 अम्ल और क्षार में क्या अंतर है?', text: 'सर, अम्ल (Acids) और क्षार (Bases) में क्या अंतर है? pH स्केल क्या बताता है?' },
  { label: '🫀 मानव हृदय और रक्त संचार', text: 'सर, मानव हृदय (Human Heart) के चारों कक्ष और रक्त परिसंचरण कैसे काम करते हैं?' },
];

const SCIENCE_EXPERIMENTS_DOUBTS = [
  { label: '💧 जल चक्र और बारिश का विज्ञान', text: 'सर, जल चक्र (Water Cycle) और वाष्पीकरण से बारिश कैसे होती है?' },
  { label: '🌌 गुरुत्वाकर्षण बल क्या है?', text: 'सर, गुरुत्वाकर्षण (Gravity) क्या है और सभी चीजें नीचे पृथ्वी पर ही क्यों गिरती हैं?' },
  { label: '🧬 पादप व जंतु कोशिका में अंतर', text: 'सर, कोशिका (Cell) क्या है? पादप और जंतु कोशिका में मुख्य अंतर क्या हैं?' },
  { label: '💨 ठोस, द्रव और गैस की अवस्थाएँ', text: 'सर, पदार्थ की तीन अवस्थाओं (ठोस, द्रव, गैस) में तापमान से क्या परिवर्तन होता है?' },
  { label: '🍋 नीले लिटमस का लाल होना', text: 'सर, अम्ल नीले लिटमस को लाल और क्षार लाल को नीला क्यों कर देते हैं?' },
  { label: '🔋 ऊर्जा संरक्षण का नियम', text: 'सर, ऊर्जा संरक्षण का नियम (Law of Conservation of Energy) क्या है?' },
];

// 3. SOCIAL SCIENCE: Kid Curiosity, Civics/History & Geo/Economics
const SOCIAL_CURIOSITY_DOUBTS = [
  { label: '🕊️ गांधी जी और दांडी यात्रा', text: 'सर, महात्मा गांधी जी ने दांडी यात्रा क्यों की थी और नमक कानून कैसे तोड़ा?' },
  { label: '⭐ शहीद भगत सिंह की वीर गाथा', text: 'सर, शहीद भगत सिंह और चंद्रशेखर आजाद ने देश की आजादी के लिए क्या किया?' },
  { label: '🏛️ सिंधु घाटी व हड़प्पा सभ्यता', text: 'सर, 4500 साल पुरानी सिंधु घाटी सभ्यता (हड़प्पा) इतनी आधुनिक कैसे थी?' },
  { label: '🦁 सम्राट अशोक और अशोक चक्र', text: 'सर, सम्राट अशोक कौन थे और हमारे तिरंगे में अशोक चक्र क्यों है?' },
  { label: '👨‍⚖️ पुलिस और अदालत का काम', text: 'सर, पुलिस और न्यायालय (Court) समाज में कैसे न्याय और सुरक्षा करते हैं?' },
  { label: '🌳 पेड़ और पर्यावरण संरक्षण', text: 'सर, पेड़ लगाना और पर्यावरण के संसाधनों का संरक्षण करना क्यों सबसे जरूरी है?' },
  { label: '🇮🇳 भारत में विविधता में एकता', text: 'सर, भारत में इतने धर्म, भाषाएँ और त्योहार होने पर भी विविधता में एकता कैसे है?' },
];

const SOCIAL_CIVICS_HISTORY_DOUBTS = [
  { label: '📜 संविधान के 6 मौलिक अधिकार', text: 'सर, भारतीय संविधान की मुख्य बातें और नागरिकों के 6 मौलिक अधिकार कौन-से हैं?' },
  { label: '⚔️ 1857 की क्रांति के कारण', text: 'सर, 1857 के प्रथम स्वतंत्रता संग्राम (क्रांति) के प्रमुख कारण और परिणाम समझाइए' },
  { label: '🗳️ लोकतंत्र में वोट का महत्व', text: 'सर, लोकतंत्र (Democracy) क्या है और नागरिकों के लिए वोट देना क्यों सबसे जरूरी है?' },
  { label: '⚖️ संसद कैसे कानून बनाती है?', text: 'सर, भारतीय संसद (लोकसभा, राज्यसभा और राष्ट्रपति) में कानून कैसे बनता है?' },
  { label: '🇮🇳 गांधी जी के प्रमुख आंदोलन', text: 'सर, महात्मा गांधी जी के प्रमुख आंदोलनों (असहयोग, दांडी यात्रा, भारत छोड़ो) का क्या महत्व था?' },
  { label: '🏛️ ग्राम पंचायत के कार्य', text: 'सर, ग्राम पंचायत और स्थानीय स्वशासन कैसे काम करता है?' },
];

const SOCIAL_GEO_ECONOMICS_DOUBTS = [
  { label: '🌍 दिन-रात और ऋतुएँ कैसे बदलती हैं?', text: 'सर, पृथ्वी के घूर्णन (Rotation) से दिन-रात और परिक्रमण (Revolution) से ऋतुएँ कैसे बदलती हैं?' },
  { label: '🌾 हरित क्रांति और भारतीय कृषि', text: 'सर, हरित क्रांति (Green Revolution) क्या थी और इसने भारत को खाद्यान्न में आत्मनिर्भर कैसे बनाया?' },
  { label: '💰 मुद्रा (Money) और बैंक का कार्य', text: 'सर, मुद्रा का विकास कैसे हुआ और बैंक में जमा व लोन व्यवस्था कैसे चलती है?' },
  { label: '🏔️ हिमालय का जलवायु पर प्रभाव', text: 'सर, हिमालय पर्वत भारत की जलवायु और नदियों के लिए क्यों अत्यंत महत्वपूर्ण है?' },
  { label: '🗺️ अक्षांश और देशांतर रेखाएँ', text: 'सर, अक्षांश (Latitude) और देशांतर (Longitude) रेखाएँ क्या हैं और समय कैसे तय होता है?' },
  { label: '🌳 प्राकृतिक संसाधनों का संरक्षण', text: 'सर, नवीकरणीय और अनवीकरणीय संसाधन क्या हैं और इनका संरक्षण क्यों जरूरी है?' },
];

function detectFormulaName(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('51')) return '51 का गुणन नियम';
  if (t.includes('21')) return '21 का गुणन नियम';
  if (t.includes('(a + b)²') || t.includes('(a+b)^2') || t.includes('a plus b')) return '(a + b)²';
  if (t.includes('(a - b)²') || t.includes('(a-b)^2') || t.includes('a minus b')) return '(a - b)²';
  if (t.includes('a² - b²') || t.includes('a^2 - b^2') || t.includes('(a+b)(a-b)')) return 'a² - b²';
  if (t.includes('पाइथागोरस') || t.includes('pythagor') || t.includes('a² + b²')) return 'पाइथागोरस प्रमेय';
  if (t.includes('वृत्त') || t.includes('πr²') || t.includes('pi r^2')) return 'वृत्त का क्षेत्रफल';
  if (t.includes('sin') || t.includes('cos')) return 'sin²θ + cos²θ = 1';
  if (t.includes('गॉस') || t.includes('n(n+1)')) return 'प्रथम n संख्याओं का योग';
  if (t.includes('चाल') || t.includes('speed')) return 'चाल सूत्र';
  if (t.includes('ब्याज') || t.includes('interest')) return 'साधारण ब्याज';
  return '';
}

export const DoubtClearingDrawer: React.FC<DoubtClearingDrawerProps> = ({
  isOpen,
  onClose,
  contextQuestion = 'सामान्य शंका',
  contextStep = '',
  initialDoubtQuery = '',
  initialSubject = 'math',
  onOpenVisualProof,
}) => {
  const [activeSubject, setActiveSubject] = useState<DoubtSubject>(initialSubject);
  const [activeSubMode, setActiveSubMode] = useState<string>('doubt');
  const [customDoubt, setCustomDoubt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getInitialMessageForSubject = (subj: DoubtSubject) => {
    if (subj === 'science') {
      return {
        userQuery: 'नमस्ते डाउट सर! मुझे विज्ञान (Science) का कोई भी सवाल या रहस्य समझना है।',
        response: {
          teacherReply: 'नमस्ते प्यारे नन्हें वैज्ञानिक! मैं हूँ आपका "साइंस टीचर" (Science Sir) 🔬\n\nआप मुझसे भौतिकी (Physics - न्यूटन के नियम, चुंबक, प्रकाश, गति), रसायन विज्ञान (Chemistry - अम्ल, क्षार, रासायनिक अभिक्रियाएँ) या जीव विज्ञान (Biology - प्रकाश संश्लेषण, कोशिका, मानव शरीर) का कोई भी सवाल पूछ सकते हैं!\n\nमैं हर अवधारणा को 2 वास्तविक जीवन के प्रयोगों और दैनिक उदाहरणों के साथ बहुत आसान तरीके से समझाऊँगा।',
          simplerExample: 'रसोई का विज्ञान: पानी का उबलकर भाप बनना (वाष्पीकरण), दूध से दही जमना (किण्वन/बैक्टीरिया) सब विज्ञान के नियम हैं!',
          secondExample: 'साइकिल व खेल: साइकिल का ब्रेक लगाना घर्षण बल (Friction) है और गेंद का नीचे गिरना पृथ्वी का गुरुत्वाकर्षण (Gravity) है!',
          keyTakeaway: 'विज्ञान हमारे चारों ओर घट रही प्राकृतिक घटनाओं को समझने की दिव्य दृष्टि है।',
          encouragement: 'जो सवाल मन में आए, नीचे लिखो या ऊपर दिए गए 1-टैप बटन दबाकर पूछो! 😊',
        },
      };
    }

    if (subj === 'social_science') {
      return {
        userQuery: 'नमस्ते डाउट सर! मुझे सामाजिक विज्ञान (Social Science) का कोई भी सवाल समझना है।',
        response: {
          teacherReply: 'नमस्ते प्यारे विद्यार्थी! मैं हूँ आपका "सोशल साइंस टीचर" (Social Science Sir) 🌍\n\nआप मुझसे इतिहास (History - 1857 की क्रांति, स्वतंत्रता आंदोलन), भूगोल (Geography - दिन-रात, ऋतुएँ, नदियाँ, पर्वत), नागरिक शास्त्र (Civics - संविधान, मौलिक अधिकार, लोकतंत्र, संसद) या अर्थशास्त्र (Economics - मुद्रा, बैंक, बाजार) का कोई भी सवाल पूछ सकते हैं!\n\nहर विषय को हम एक रोचक कहानी और 2 असल जिंदगी के व्यावहारिक उदाहरणों से समझेंगे!',
          simplerExample: 'स्कूल व क्लास के नियम: जैसे स्कूल में सब बच्चों के लिए समानता और नियम होते हैं, वैसे ही देश में कानून के आगे सब बराबर हैं (संविधान)!',
          secondExample: 'दुकान व बाजार: सामान खरीदने के लिए नोट/सिक्के देना और दुकानदार का हिसाब रखना अर्थशास्त्र का दैनिक रूप है!',
          keyTakeaway: 'सामाजिक विज्ञान हमें एक जिम्मेदार, जागरूक और देशभक्त नागरिक बनाता है।',
          encouragement: 'इतिहास, भूगोल या संविधान का कोई भी सवाल बिना झिझक पूछें! 🌟',
        },
      };
    }

    // Math
    return {
      userQuery: 'नमस्ते डाउट सर! मुझे गणित का कोई भी सवाल या सूत्र सिद्ध करवाना है।',
      response: {
        teacherReply: 'नमस्ते प्यारे बच्चे! मैं हूँ आपका "गणित मित्र" (Maths Sir) 📐\n\nआप मुझसे गणित का कोई भी सवाल (प्रतिशत, समीकरण, अंकगणित) पूछ सकते हैं या किसी भी सूत्र (जैसे (a+b)², पाइथागोरस प्रमेय, 51×42 वैदिक ट्रिक आदि) को चरणबद्ध सिद्ध करवा सकते हैं!\n\nमैं हर सवाल का उत्तर 2 वास्तविक जीवन के उदाहरणों (2 Real-Life Examples) के साथ बहुत आसान तरीके से दूँगा।',
        simplerExample: 'दुकान का उदाहरण: जब आप ₹50 का नोट देकर ₹35 का सामान लेते हैं और ₹15 वापस गिनते हैं, तो आप रोजमर्रा में जोड़-घटाव कर रहे होते हैं!',
        secondExample: 'कमरे का फर्श: एक चौकोर कमरे में (a+b)² का मतलब 4 अलग-अलग कमरों का कुल क्षेत्रफल होता है!',
        keyTakeaway: 'गणित कोई रटने की चीज नहीं, असल जिंदगी का सबसे भरोसेमंद साथी है।',
        encouragement: 'चलो, नीचे लिखो या ऊपर दिए गए बटन को दबाकर पूछो! 😊',
      },
    };
  };

  const [history, setHistory] = useState<Array<{
    userQuery: string;
    response: DoubtResponse;
    subjectTag?: DoubtSubject;
  }>>([getInitialMessageForSubject('math')]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
      if (initialSubject) {
        setActiveSubject(initialSubject);
      }
      if (initialDoubtQuery) {
        setCustomDoubt(initialDoubtQuery);
        if (
          initialDoubtQuery.includes('सिद्ध') ||
          initialDoubtQuery.includes('prove') ||
          initialDoubtQuery.includes('सूत्र')
        ) {
          setActiveSubject('math');
          setActiveSubMode('proof');
        } else if (
          initialDoubtQuery.includes('विज्ञान') ||
          initialDoubtQuery.includes('प्रकाश') ||
          initialDoubtQuery.includes('न्यूटन') ||
          initialDoubtQuery.includes('कोशिका')
        ) {
          setActiveSubject('science');
        } else if (
          initialDoubtQuery.includes('सामाजिक') ||
          initialDoubtQuery.includes('संविधान') ||
          initialDoubtQuery.includes('1857') ||
          initialDoubtQuery.includes('लोकतंत्र')
        ) {
          setActiveSubject('social_science');
        }
      }
    }
  }, [isOpen, initialDoubtQuery, initialSubject]);

  const [isListening, setIsListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('आपके ब्राउज़र में वॉइस इनपुट सपोर्ट नहीं है। कृपया टाइप करें।');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Hindi recognition, also catches English keywords
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0]?.transcript;
        if (speechResult) {
          setCustomDoubt(speechResult);
          handleAskDoubt(
            activeSubject === 'science'
              ? 'science_doubt'
              : activeSubject === 'social_science'
              ? 'social_doubt'
              : 'custom',
            speechResult
          );
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const handleSpeakAnswer = (text: string, idx: number) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);

    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  const handleSubjectChange = (newSubj: DoubtSubject) => {
    setActiveSubject(newSubj);
    if (newSubj === 'math') {
      setActiveSubMode('doubt');
    } else if (newSubj === 'science') {
      setActiveSubMode('curiosity');
    } else {
      setActiveSubMode('curiosity');
    }
  };

  const handleAskDoubt = async (doubtType: string, customText?: string) => {
    const queryText =
      customText ||
      (doubtType === 'formula_why'
        ? 'ये formula क्यों लगाया?'
        : doubtType === 'number_where'
        ? 'यह number कहाँ से आया?'
        : doubtType === 'not_understood'
        ? 'मुझे कुछ समझ नहीं आया, और सरल तरीके से समझाओ'
        : customDoubt);

    if (!queryText.trim()) return;

    const isProof =
      doubtType === 'formula_proof' ||
      queryText.includes('सिद्ध') ||
      queryText.includes('prove') ||
      queryText.includes('प्रमाण');

    setLoading(true);

    try {
      const res = await fetch('/api/math/doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: contextQuestion,
          context: contextStep,
          doubtType: isProof ? 'formula_proof' : doubtType,
          customDoubt: queryText,
          subject: activeSubject,
        }),
      });

      const data = await res.json();
      const detectedF =
        activeSubject === 'math'
          ? detectFormulaName(queryText) || detectFormulaName(data.teacherReply || '')
          : '';

      setHistory((prev) => [
        ...prev,
        {
          userQuery: queryText,
          subjectTag: activeSubject,
          response: {
            teacherReply:
              data.teacherReply ||
              (activeSubject === 'science'
                ? 'प्यारे बच्चे, विज्ञान में हर प्राकृतिक परिघटना के पीछे एक तर्कपूर्ण नियम होता है।'
                : activeSubject === 'social_science'
                ? 'प्यारे विद्यार्थी, सामाजिक विज्ञान समाज और इतिहास को समझने की सुंदर कुंजी है।'
                : 'प्यारे बच्चे, आइए इस सवाल को एक आसान तरीके से हल करते हैं।'),
            simplerExample: data.simplerExample,
            secondExample: data.secondExample,
            keyTakeaway: data.keyTakeaway,
            encouragement: data.encouragement || 'शाबाश, पूछते रहो!',
            relatedFormula: detectedF,
          },
        },
      ]);
      setCustomDoubt('');
    } catch {
      const detectedF = activeSubject === 'math' ? detectFormulaName(queryText) : '';
      setHistory((prev) => [
        ...prev,
        {
          userQuery: queryText,
          subjectTag: activeSubject,
          response: {
            teacherReply:
              activeSubject === 'science'
                ? 'शाबाश बेटा! विज्ञान (Science) में हर क्रिया के पीछे कारण और प्रभाव होता है। प्रकृति के रहस्यों को समझने का आपका यह प्रयास बहुत सराहनीय है!'
                : activeSubject === 'social_science'
                ? 'शाबाश बेटा! सामाजिक विज्ञान (Social Science) हमें समाज, इतिहास, संविधान और पृथ्वी के भूगोल को समझकर एक जागरूक नागरिक बनने की प्रेरणा देता है।'
                : 'प्यारे विद्यार्थी, आपका सवाल बहुत अच्छा है! गणित में हर सूत्र और सवाल का एक स्पष्ट तर्क होता है। शांत मन से सवाल को पढ़ें और संख्याओं को अलग करें।',
            simplerExample:
              activeSubject === 'science'
                ? 'रसोई का उदाहरण: पानी का गर्म होकर भाप बनना और भाप का वापस बूंद बनना वाष्पीकरण व संघनन का जीवंत उदाहरण है!'
                : activeSubject === 'social_science'
                ? 'स्कूल का उदाहरण: क्लास के नियमों का सब बच्चों द्वारा पालन करना ही संविधान के नियमों की तरह समाज को सुरक्षित रखता है!'
                : 'टॉफी बांटना: सोचो अगर आपके पास 10 टॉफियां हैं और 2 दोस्तों में बराबर बांटनी हैं, तो 10 ÷ 2 = 5 टॉफियां प्रति दोस्त!',
            secondExample:
              activeSubject === 'science'
                ? 'खेलकूद का उदाहरण: फुटबॉल को किक मारने पर उसका आगे बढ़ना और घर्षण से रुकना न्यूटन के गति के नियमों का उदाहरण है!'
                : activeSubject === 'social_science'
                ? 'बाजार का उदाहरण: पैसे देकर अनाज या किताबें खरीदना और बचत करना अर्थशास्त्र का व्यावहारिक रूप है!'
                : 'क्रिकेट स्कोर: 10 ओवर में 60 रन बने हैं, तो रन रेट 60 ÷ 10 = 6 रन प्रति ओवर होगा!',
            encouragement: 'आप बहुत अच्छा प्रयास कर रहे हैं!',
            relatedFormula: detectedF,
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([getInitialMessageForSubject(activeSubject)]);
  };

  // Color schemes based on selected subject
  const getSubjectColorTheme = () => {
    if (activeSubject === 'science') {
      return {
        headerGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
        activeSubjectBg: 'bg-emerald-600 text-white shadow-xs',
        borderAccent: 'border-emerald-200',
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        icon: '🔬',
        title: 'डाउट सर • विज्ञान (Science Sir)',
        subTitle: 'भौतिक, रसायन व जीव विज्ञान • प्रयोग व सिद्धांत',
        placeholder: 'सर से विज्ञान का कोई भी सवाल पूछें (उदा. प्रकाश संश्लेषण, न्यूटन के नियम, चुंबक, कोशिका)...',
        buttonGradient: 'bg-emerald-600 hover:bg-emerald-700',
        userMsgBg: 'bg-emerald-600',
      };
    }
    if (activeSubject === 'social_science') {
      return {
        headerGradient: 'from-blue-600 via-indigo-600 to-slate-700',
        activeSubjectBg: 'bg-blue-600 text-white shadow-xs',
        borderAccent: 'border-blue-200',
        badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
        icon: '🌍',
        title: 'डाउट सर • सामाजिक विज्ञान (Social Science)',
        subTitle: 'इतिहास, भूगोल, संविधान, नागरिक शास्त्र व अर्थशास्त्र',
        placeholder: 'सर से सामाजिक विज्ञान का सवाल पूछें (उदा. 1857 की क्रांति, संविधान, दिन-रात, लोकतंत्र)...',
        buttonGradient: 'bg-blue-600 hover:bg-blue-700',
        userMsgBg: 'bg-blue-600',
      };
    }
    // Math
    return {
      headerGradient: 'from-amber-500 via-orange-500 to-amber-600',
      activeSubjectBg: 'bg-amber-600 text-white shadow-xs',
      borderAccent: 'border-amber-200',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: '👨‍🏫',
      title: 'डाउट सर • गणित (Maths Sir)',
      subTitle: 'सवाल हल करें • सूत्र सिद्ध करें • वैदिक ट्रिक्स',
      placeholder:
        activeSubMode === 'proof'
          ? 'सर, कौन-सा फॉर्मूला सिद्ध करवाना है? (उदा. (a-b)², a²-b², πr²)...'
          : 'सर से गणित का कोई सवाल पूछें (उदा. 500 का 20%, x + 8 = 20, tan 45°)...',
      buttonGradient: 'bg-amber-600 hover:bg-amber-700',
      userMsgBg: 'bg-amber-500',
    };
  };

  const theme = getSubjectColorTheme();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l ${theme.borderAccent}`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${theme.headerGradient} text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md flex-shrink-0 transition-colors duration-300`}>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl shadow-inner">
                {theme.icon}
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base leading-tight flex items-center gap-1.5">
                {theme.title}
                <Sparkles className="w-4 h-4 text-amber-200" />
              </h3>
              <p className="text-[11px] sm:text-xs text-white/90 flex items-center gap-1 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-300"></span>
                {theme.subTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearHistory}
              title="चैट साफ करें"
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/90 hover:text-white cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 🌟 1. SUBJECT SELECTOR TABS (Math | Science | Social Science) */}
        <div className="bg-slate-100 p-1.5 border-b border-slate-200 flex-shrink-0">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 px-1 flex items-center justify-between">
            <span>📚 विषय चुनें (Choose Subject):</span>
            <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.2 rounded-full border border-slate-200">
              3-इन-1 मास्टर डाउट सर
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {/* Math Tab */}
            <button
              onClick={() => handleSubjectChange('math')}
              className={`py-1.5 px-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                activeSubject === 'math'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border-slate-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>गणित</span>
            </button>

            {/* Science Tab */}
            <button
              onClick={() => handleSubjectChange('science')}
              className={`py-1.5 px-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                activeSubject === 'science'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border-slate-200'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>विज्ञान</span>
              <span className="text-[9px] bg-emerald-200 text-emerald-950 font-black px-1 rounded-sm">नया</span>
            </button>

            {/* Social Science Tab */}
            <button
              onClick={() => handleSubjectChange('social_science')}
              className={`py-1.5 px-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                activeSubject === 'social_science'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border-slate-200'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span className="truncate">सामाजिक वि.</span>
              <span className="text-[9px] bg-blue-200 text-blue-950 font-black px-1 rounded-sm">नया</span>
            </button>
          </div>
        </div>

        {/* 🌟 2. SUB-MODE TABS (Depending on Active Subject) */}
        <div className="bg-white px-2 py-1.5 flex gap-1 border-b border-slate-200 flex-shrink-0 text-xs overflow-x-auto">
          {activeSubject === 'math' && (
            <>
              <button
                onClick={() => setActiveSubMode('doubt')}
                className={`flex-1 py-1.5 px-2 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSubMode === 'doubt'
                    ? 'bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>💬 सामान्य सवाल पूछें</span>
              </button>
              <button
                onClick={() => setActiveSubMode('proof')}
                className={`flex-1 py-1.5 px-2 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSubMode === 'proof'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xs'
                    : 'text-indigo-900 hover:bg-indigo-50'
                }`}
              >
                <span>📐 फॉर्मूला सिद्ध करवाएं</span>
                <span className="text-[9px] bg-amber-300 text-amber-950 px-1 py-0.2 rounded-full font-black">ट्रिक्स</span>
              </button>
            </>
          )}

          {activeSubject === 'science' && (
            <>
              <button
                onClick={() => setActiveSubMode('curiosity')}
                className={`flex-1 py-1.5 px-2 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSubMode === 'curiosity'
                    ? 'bg-emerald-600 text-white shadow-2xs font-extrabold'
                    : 'text-emerald-950 hover:bg-emerald-50'
                }`}
              >
                <span>❓ बच्चों के सवाल (जिज्ञासा)</span>
                <span className="text-[9px] bg-amber-300 text-amber-950 px-1 rounded-sm font-black">खास</span>
              </button>
              <button
                onClick={() => setActiveSubMode('concepts')}
                className={`flex-1 py-1.5 px-2 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSubMode === 'concepts'
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🌿 जीव व भौतिकी</span>
              </button>
              <button
                onClick={() => setActiveSubMode('experiments')}
                className={`flex-1 py-1.5 px-2 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSubMode === 'experiments'
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'text-teal-900 hover:bg-teal-50'
                }`}
              >
                <span>🧪 प्रयोग व नियम</span>
              </button>
            </>
          )}

          {activeSubject === 'social_science' && (
            <>
              <button
                onClick={() => setActiveSubMode('curiosity')}
                className={`flex-1 py-1.5 px-2 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSubMode === 'curiosity'
                    ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                    : 'text-blue-950 hover:bg-blue-50'
                }`}
              >
                <span>❓ वीर गाथाएँ व समाज</span>
                <span className="text-[9px] bg-amber-300 text-amber-950 px-1 rounded-sm font-black">खास</span>
              </button>
              <button
                onClick={() => setActiveSubMode('civics_history')}
                className={`flex-1 py-1.5 px-2 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSubMode === 'civics_history'
                    ? 'bg-blue-100 text-blue-950 border border-blue-300 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📜 संविधान व आंदोलन</span>
              </button>
              <button
                onClick={() => setActiveSubMode('geo_economics')}
                className={`flex-1 py-1.5 px-2 font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSubMode === 'geo_economics'
                    ? 'bg-indigo-700 text-white shadow-2xs'
                    : 'text-indigo-900 hover:bg-indigo-50'
                }`}
              >
                <span>🌍 भूगोल व अर्थशास्त्र</span>
              </button>
            </>
          )}
        </div>

        {/* Context Banner if opened from a specific step */}
        {contextStep && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900 flex items-center gap-2 font-medium flex-shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="truncate">संदर्भ: {contextStep}</span>
          </div>
        )}

        {/* 🌟 3. QUICK CHIPS ACCORDION (1-Tap Questions per Subject/Mode) */}
        <div className="bg-slate-50 p-2.5 border-b border-slate-200 flex-shrink-0">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span>⚡ झटपट सवाल (टैप करें):</span>
              <span className="text-[10px] text-slate-700 font-medium">
                {activeSubject === 'science'
                  ? 'विज्ञान'
                  : activeSubject === 'social_science'
                  ? 'सामाजिक विज्ञान'
                  : activeSubMode === 'proof'
                  ? 'सूत्र उपपत्ति'
                  : 'गणित'}
              </span>
            </span>
            <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-bold">
              1-टैप
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {/* MATH: Formula Proofs */}
            {activeSubject === 'math' && activeSubMode === 'proof' &&
              MATH_FORMULA_PROOFS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt('formula_proof', btn.text)}
                  disabled={loading}
                  className="text-xs bg-white hover:bg-indigo-50 text-indigo-950 border border-indigo-200 hover:border-indigo-400 px-2.5 py-1.5 rounded-xl shadow-xs font-bold transition-all text-left flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}

            {/* MATH: General Doubts */}
            {activeSubject === 'math' && activeSubMode === 'doubt' &&
              MATH_GENERAL_DOUBTS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt(btn.type, btn.text)}
                  disabled={loading}
                  className="text-xs bg-white hover:bg-amber-50 text-slate-800 border border-slate-200 hover:border-amber-400 px-2.5 py-1.5 rounded-xl shadow-xs font-medium transition-all text-left flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}

            {/* SCIENCE: Kid Curiosity */}
            {activeSubject === 'science' && activeSubMode === 'curiosity' &&
              SCIENCE_CURIOSITY_DOUBTS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt('science_curiosity', btn.text)}
                  disabled={loading}
                  className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 hover:border-emerald-500 px-2.5 py-1.5 rounded-xl shadow-xs font-bold transition-all text-left flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}

            {/* SCIENCE: Concepts */}
            {activeSubject === 'science' && activeSubMode === 'concepts' &&
              SCIENCE_CONCEPTS_DOUBTS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt('science_concept', btn.text)}
                  disabled={loading}
                  className="text-xs bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-200 hover:border-emerald-400 px-2.5 py-1.5 rounded-xl shadow-xs font-bold transition-all text-left flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}

            {/* SCIENCE: Experiments */}
            {activeSubject === 'science' && activeSubMode === 'experiments' &&
              SCIENCE_EXPERIMENTS_DOUBTS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt('science_experiment', btn.text)}
                  disabled={loading}
                  className="text-xs bg-white hover:bg-teal-50 text-teal-950 border border-teal-200 hover:border-teal-400 px-2.5 py-1.5 rounded-xl shadow-xs font-bold transition-all text-left flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}

            {/* SOCIAL SCIENCE: Kid Curiosity */}
            {activeSubject === 'social_science' && activeSubMode === 'curiosity' &&
              SOCIAL_CURIOSITY_DOUBTS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt('social_curiosity', btn.text)}
                  disabled={loading}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-300 hover:border-blue-500 px-2.5 py-1.5 rounded-xl shadow-xs font-bold transition-all text-left flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}

            {/* SOCIAL SCIENCE: Civics & History */}
            {activeSubject === 'social_science' && activeSubMode === 'civics_history' &&
              SOCIAL_CIVICS_HISTORY_DOUBTS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt('social_civics', btn.text)}
                  disabled={loading}
                  className="text-xs bg-white hover:bg-blue-50 text-blue-950 border border-blue-200 hover:border-blue-400 px-2.5 py-1.5 rounded-xl shadow-xs font-bold transition-all text-left flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}

            {/* SOCIAL SCIENCE: Geo & Economics */}
            {activeSubject === 'social_science' && activeSubMode === 'geo_economics' &&
              SOCIAL_GEO_ECONOMICS_DOUBTS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskDoubt('social_geo', btn.text)}
                  disabled={loading}
                  className="text-xs bg-white hover:bg-indigo-50 text-indigo-950 border border-indigo-200 hover:border-indigo-400 px-2.5 py-1.5 rounded-xl shadow-xs font-bold transition-all text-left flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {btn.label}
                </button>
              ))}
          </div>
        </div>

        {/* 🌟 4. CHAT HISTORY AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBFBFA]">
          {history.map((item, idx) => {
            const isSci = item.subjectTag === 'science';
            const isSoc = item.subjectTag === 'social_science';

            const userBg = isSci
              ? 'bg-emerald-600'
              : isSoc
              ? 'bg-blue-600'
              : 'bg-amber-500';

            const teacherAvatar = isSci ? '🔬' : isSoc ? '🌍' : '👨‍🏫';
            const teacherAvatarBg = isSci
              ? 'bg-emerald-100 border-emerald-300'
              : isSoc
              ? 'bg-blue-100 border-blue-300'
              : 'bg-amber-100 border-amber-300';

            const cardBorder = isSci
              ? 'border-emerald-100/90'
              : isSoc
              ? 'border-blue-100/90'
              : 'border-amber-100/80';

            return (
              <div key={idx} className="space-y-3">
                {/* User message */}
                <div className="flex justify-end">
                  <div className={`${userBg} text-white rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-[85%] text-xs sm:text-sm shadow-sm font-medium`}>
                    {item.userQuery}
                  </div>
                </div>

                {/* Teacher response */}
                <div className="flex gap-2.5 items-start">
                  <div className={`w-8 h-8 rounded-xl ${teacherAvatarBg} border flex items-center justify-center text-base flex-shrink-0 shadow-xs`}>
                    {teacherAvatar}
                  </div>
                  <div className={`bg-white border-2 ${cardBorder} rounded-2xl rounded-tl-xs p-4 max-w-[90%] text-xs sm:text-sm space-y-3 shadow-xs`}>
                    {/* Subject badge & Audio Listen button */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {item.subjectTag === 'science' && '🔬 विज्ञान उत्तर (Science Solution)'}
                        {item.subjectTag === 'social_science' && '🌍 सामाजिक विज्ञान उत्तर (Social Science)'}
                        {item.subjectTag === 'math' && '📐 गणित उत्तर (Maths Solution)'}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSpeakAnswer(item.response.teacherReply, idx)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          speakingIdx === idx
                            ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                        title={speakingIdx === idx ? 'आवाज बंद करें' : 'उत्तर बोलकर सुनें (Read Aloud)'}
                      >
                        {speakingIdx === idx ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                            <span>रोकें ⏹️</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                            <span>सुनें 🔊</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                      {item.response.teacherReply}
                    </div>

                    {item.response.simplerExample && (
                      <div className="bg-amber-50/90 p-3 rounded-xl border border-amber-200 text-amber-950 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-900">
                          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>वास्तविक जीवन उदाहरण 1 (Real-Life Example 1):</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed pl-5.5">
                          {item.response.simplerExample}
                        </p>
                      </div>
                    )}

                    {item.response.secondExample && (
                      <div className="bg-sky-50/90 p-3 rounded-xl border border-sky-200 text-sky-950 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-sky-900">
                          <span className="text-sm">🌟</span>
                          <span>वास्तविक जीवन उदाहरण 2 (Real-Life Example 2):</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed pl-5.5">
                          {item.response.secondExample}
                        </p>
                      </div>
                    )}

                    {item.response.funFact && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-xl border border-purple-200 text-purple-950 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-purple-900">
                          <span className="text-sm">🎈</span>
                          <span>क्या आप जानते हैं? (Did You Know?):</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed pl-5.5 font-medium">
                          {item.response.funFact}
                        </p>
                      </div>
                    )}

                    {item.response.keyTakeaway && (
                      <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 font-bold flex items-start gap-1.5">
                        <span>🎯</span>
                        <span>याद रखें: {item.response.keyTakeaway}</span>
                      </div>
                    )}

                    {/* Direct Visual Proof Button if formula detected (Math) */}
                    {item.response.relatedFormula && onOpenVisualProof && (
                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => onOpenVisualProof(item.response.relatedFormula!)}
                          className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 text-indigo-900 font-bold text-xs p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer group"
                        >
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-indigo-600" />
                            <span>इस सूत्र का विजुअल मॉडल और स्लाइडर चलाएँ</span>
                          </span>
                          <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}

                    <div className="text-[11px] text-slate-700 font-bold flex items-center gap-1.5 pt-1.5 border-t border-slate-100">
                      <HeartHandshake className="w-4 h-4 text-amber-500" />
                      <span>{item.response.encouragement}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 items-center bg-white p-3 rounded-2xl border border-slate-200 max-w-xs shadow-xs text-xs text-slate-800 font-medium animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600 flex-shrink-0" />
              <span>
                {activeSubject === 'science'
                  ? 'डाउट सर विज्ञान के सिद्धांत व 2 उदाहरण तैयार कर रहे हैं...'
                  : activeSubject === 'social_science'
                  ? 'डाउट सर सामाजिक विज्ञान का रोचक उत्तर तैयार कर रहे हैं...'
                  : 'डाउट सर आसान चरणों में उत्तर व प्रमाण समझा रहे हैं...'}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 🌟 5. INPUT BAR */}
        <div className="p-3 border-t border-slate-200 bg-white shadow-lg flex-shrink-0">
          {isListening && (
            <div className="mb-2 p-2 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold flex items-center justify-between animate-pulse">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>🎤 बोलिए, डाउट सर सुन रहे हैं... (Speak your question)</span>
              </span>
              <button
                type="button"
                onClick={() => setIsListening(false)}
                className="text-[10px] text-rose-700 underline font-bold cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskDoubt(
                activeSubject === 'math' && activeSubMode === 'proof'
                  ? 'formula_proof'
                  : activeSubject === 'science'
                  ? 'science_doubt'
                  : activeSubject === 'social_science'
                  ? 'social_doubt'
                  : 'custom',
                customDoubt
              );
            }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={customDoubt}
                onChange={(e) => setCustomDoubt(e.target.value)}
                placeholder={theme.placeholder}
                disabled={loading}
                className="w-full text-xs sm:text-sm pl-3.5 pr-10 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder:text-slate-400 font-medium"
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute right-2 p-1.5 rounded-lg transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
                title="बोलकर सवाल पूछें (Mic Input)"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !customDoubt.trim()}
              className={`${theme.buttonGradient} disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-md cursor-pointer active:scale-95 flex items-center justify-center flex-shrink-0`}
              title="भेजें"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 px-1">
            <span className="flex items-center gap-1">
              <Smile className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {activeSubject === 'science'
                  ? 'डाउट सर विज्ञान के हर सवाल का उत्तर आसान भाषा में देते हैं'
                  : activeSubject === 'social_science'
                  ? 'डाउट सर इतिहास, भूगोल व संविधान को कहानियों से समझाते हैं'
                  : 'डाउट सर हर सूत्र व गणित को प्यार से समझाते हैं'}
              </span>
            </span>
            <span className="flex items-center gap-2 font-medium">
              <span className="text-emerald-600 font-bold">🎤 बोलें या लिखें</span>
              <span>• Enter दबाएँ</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface VedicTrick {
  id: string;
  sutra: string;
  sutraMeaning: string;
  englishName: string;
  badge: string;
  category: 'multiplication' | 'square' | 'subtraction' | 'division' | 'roots';
  description: string;
  rule: string;
  howItWorks: Array<{
    stepNumber: number;
    stepTitle: string;
    explanation: string;
    mathWork: string;
  }>;
  quickExample: {
    problem: string;
    steps: string[];
    finalAnswer: string;
  };
  practiceProblems: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
    mentalTip: string;
  }>;
  realLifeUse: string;
  interactiveType:
    | 'endsIn5'
    | 'multiply11'
    | 'base100'
    | 'multiply99'
    | 'antya10'
    | 'fastDiv5'
    | 'multiply51'
    | 'multiply21'
    | 'multiply101'
    | 'multiply25'
    | 'multiply5';
}

export const VEDIC_MATHS_TRICKS: VedicTrick[] = [
  {
    id: 'vm-ends-in-5',
    sutra: 'एकाधिकेन पूर्वेण (Ekadhikena Purvena)',
    sutraMeaning: 'पहले वाले से एक अधिक करके गुणा करना (By one more than the previous)',
    englishName: 'Squaring Numbers Ending in 5 (e.g. 15², 25², 75², 95²)',
    badge: '⚡ 2-सेकंड जादुई ट्रिक',
    category: 'square',
    description:
      'जिस भी संख्या के अंत में 5 आता हो (जैसे 25, 35, 65, 85, 105), उसका वर्ग (Square) बिना पेन-कॉपी के सिर्फ 2 सेकंड में दिमाग में निकालें!',
    rule: 'अंतिम दो अंक हमेशा 25 होंगे। आगे के अंक = दहाई अंक × (दहाई अंक + 1)।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: 'संख्या को दो भागों में बाँटें',
        explanation: 'इकाई अंक 5 है, और बाकी बचे अंक को "N" मान लें। उदाहरण के लिए 75 में N = 7।',
        mathWork: '75 -> (7) और (5)',
      },
      {
        stepNumber: 2,
        stepTitle: 'आगे का हिस्सा निकालें (N × (N + 1))',
        explanation: '7 को उसके अगले नंबर (7 + 1 = 8) से गुणा करें।',
        mathWork: '7 × 8 = 56',
      },
      {
        stepNumber: 3,
        stepTitle: 'पीछे 25 चिपका दें',
        explanation: '5 का वर्ग हमेशा 25 होता है, इसे सीधे 56 के आगे लिख दें।',
        mathWork: '56 और 25 मिलकर बने -> 5625!',
      },
    ],
    quickExample: {
      problem: '85 का वर्ग (85²) ज्ञात कीजिए',
      steps: [
        'दहाई अंक = 8, अगला अंक = 9',
        'आगे का भाग: 8 × 9 = 72',
        'पीछे 5 का वर्ग = 25',
        'दोनों को साथ जोड़ें: 7225',
      ],
      finalAnswer: '7225',
    },
    practiceProblems: [
      {
        question: '35 का वर्ग (35²) मन ही मन निकालें:',
        options: ['1225', '1525', '925', '1625'],
        correctIndex: 0,
        hint: 'दहाई अंक 3 है। 3 × 4 = 12। पीछे 25 लगाएँ!',
        mentalTip: '3 × 4 = 12 और 25 -> 1225!',
      },
      {
        question: '65 का वर्ग (65²) क्या होगा?',
        options: ['4225', '3625', '4525', '4025'],
        correctIndex: 0,
        hint: 'दहाई अंक 6 है। 6 × 7 = 42। पीछे 25 लगाएँ!',
        mentalTip: '6 × 7 = 42 -> 4225!',
      },
      {
        question: '95 का वर्ग (95²) क्या होगा?',
        options: ['9025', '8525', '9525', '8125'],
        correctIndex: 0,
        hint: '9 × 10 = 90, पीछे 25!',
        mentalTip: '9 × 10 = 9025!',
      },
    ],
    realLifeUse:
      'क्षेत्रफल (Area = Side²) निकालने में, जैसे 35m चौड़े वर्गाकार खेत या 75cm की टाइल का क्षेत्रफल तुरंत मुँहजबानी निकालना।',
    interactiveType: 'endsIn5',
  },
  {
    id: 'vm-multiply-11',
    sutra: 'अन्त्ययोरेव (Antyayoreva / 11 का सैंडविच नियम)',
    sutraMeaning: 'अगल-बगल के अंकों को जोड़कर बीच में रखना (The Sandwich Addition)',
    englishName: 'Instant Multiplication by 11',
    badge: '🚀 सुपरफास्ट गुणा',
    category: 'multiplication',
    description:
      'किसी भी 2-अंक या 3-अंक वाली संख्या को 11 से गुणा करने का सबसे आसान सैंडविच नियम। बिना पारंपरिक लंबा गुणा किए उत्तर 1 सेकंड में!',
    rule: 'पहला अंक बाईं ओर, अंतिम अंक दाईं ओर, और दोनों का जोड़ बीच में लिख दो!',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: 'संख्या के दोनों छोर अलग करें',
        explanation: 'जैसे 35 × 11 में 3 को बाईं ओर और 5 को दाईं ओर रखें।',
        mathWork: '3 [ बीच की जगह ] 5',
      },
      {
        stepNumber: 2,
        stepTitle: 'दोनों अंकों को जोड़कर बीच में रखें',
        explanation: '3 और 5 को जोड़ें: 3 + 5 = 8। इसे बीच में भर दें।',
        mathWork: '3 [ 8 ] 5 -> 385',
      },
      {
        stepNumber: 3,
        stepTitle: 'हासिल (Carry) का नियम (अगर जोड़ 9 से बड़ा हो)',
        explanation: 'जैसे 78 × 11 में 7 + 8 = 15 है। तो 5 बीच में रहेगा और 1 हासिल 7 में जुड़कर 8 बन जाएगा (858)।',
        mathWork: '7 + 1 = 8, बीच में 5, अंत में 8 -> 858',
      },
    ],
    quickExample: {
      problem: '54 × 11',
      steps: [
        'पहला अंक: 5, अंतिम अंक: 4',
        'बीच का अंक: 5 + 4 = 9',
        'परिणाम: 594',
      ],
      finalAnswer: '594',
    },
    practiceProblems: [
      {
        question: '43 × 11 का मान क्या होगा?',
        options: ['473', '483', '463', '433'],
        correctIndex: 0,
        hint: '4 और 3 के बीच में (4 + 3 = 7) को रखिए!',
        mentalTip: '4 _ 3 -> 473!',
      },
      {
        question: '67 × 11 का मान क्या होगा? (हासिल का ध्यान रखें)',
        options: ['737', '6137', '637', '747'],
        correctIndex: 0,
        hint: '6 + 7 = 13। 3 बीच में रहेगा और 1 हासिल 6 में जुड़कर 7 बनेगा!',
        mentalTip: '6 + 1 = 7, बीच में 3, अंत में 7 -> 737!',
      },
    ],
    realLifeUse:
      'क्रिकेट में 11 खिलाड़ियों के कुल रन या प्रति खिलाड़ी औसत का हिसाब, और दुकान पर 11 पीस की कुल बिलिंग तुरंत करना।',
    interactiveType: 'multiply11',
  },
  {
    id: 'vm-base-100',
    sutra: 'निखिलं नवतश्चरमं दशतः (Nikhilam Navatashcaramam Dashatah)',
    sutraMeaning: 'सभी 9 से और अंतिम 10 से (All from 9 and the last from 10)',
    englishName: 'Multiplication Near Base 100 (e.g. 96 × 97 or 103 × 105)',
    badge: '👑 वैदिक गणित का मुकुट',
    category: 'multiplication',
    description:
      '100 के नजदीक वाली संख्याओं का गुणा 3 सेकंड में! पारंपरिक तरीके से 3 लाइन का लंबा गुणा करने की बिल्कुल जरूरत नहीं।',
    rule: '100 से विचलन (Deficiency/Excess) निकालें, तिर्यक (Cross) घटाएँ या जोड़ें, और विचलनों का गुणा दाईं ओर लिखें।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: '100 से अंतर (विचलन) लिखें',
        explanation: '96, 100 से 4 कम (-4) है और 97, 100 से 3 कम (-3) है।',
        mathWork: '96 (-4) × 97 (-3)',
      },
      {
        stepNumber: 2,
        stepTitle: 'तिर्यक घटाव (Cross Subtraction)',
        explanation: '96 में से 3 घटाएँ या 97 में से 4 घटाएँ: दोनों से 93 ही मिलेगा!',
        mathWork: '96 - 3 = 93 (बायाँ भाग)',
      },
      {
        stepNumber: 3,
        stepTitle: 'विचलनों का आपसी गुणा',
        explanation: '(-4) × (-3) = 12। इसे 93 के पीछे लिख दें।',
        mathWork: '93 और 12 -> 9312!',
      },
    ],
    quickExample: {
      problem: '98 × 95',
      steps: [
        'विचलन: 98 (-2) और 95 (-5)',
        'तिर्यक घटाव: 98 - 5 = 93',
        'विचलनों का गुणा: (-2) × (-5) = 10',
        'उत्तर: 9310',
      ],
      finalAnswer: '9310',
    },
    practiceProblems: [
      {
        question: '94 × 97 का मान क्या होगा?',
        options: ['9118', '9128', '9218', '9018'],
        correctIndex: 0,
        hint: 'विचलन: -6 और -3। 94 - 3 = 91। 6 × 3 = 18।',
        mentalTip: '91 और 18 -> 9118!',
      },
      {
        question: '104 × 106 का मान क्या होगा? (100 से अधिक)',
        options: ['11024', '11020', '10924', '11224'],
        correctIndex: 0,
        hint: 'विचलन: +4 और +6। तिर्यक जोड़: 104 + 6 = 110। 4 × 6 = 24।',
        mentalTip: '110 और 24 -> 11024!',
      },
    ],
    realLifeUse:
      'थोक बाजार में 100 बोरी या 100 डिब्बों के आसपास के माल की तेजी से बिलिंग और बहीखाता तैयार करना।',
    interactiveType: 'base100',
  },
  {
    id: 'vm-multiply-99',
    sutra: 'एकन्यूनेन पूर्वेण (Ekanyunena Purvena)',
    sutraMeaning: 'पहले वाले से एक कम करके (By one less than the previous)',
    englishName: 'Lightning Multiplication with 9, 99, 999...',
    badge: '⚡ 1-सेकंड जादू',
    category: 'multiplication',
    description:
      'किसी भी संख्या को 9, 99 या 999 से गुणा करने की दुनिया की सबसे तेज ट्रिक! कैलकुलेटर उठाने से पहले आपका उत्तर तैयार होगा।',
    rule: 'संख्या में से 1 घटाएँ (बायाँ भाग), फिर उसे 99 में से घटाकर पीछे लिख दें (दायाँ भाग)।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: 'संख्या में से 1 घटाएँ',
        explanation: 'जैसे 43 × 99 में, 43 में से 1 घटाने पर 42 मिलता है।',
        mathWork: '43 - 1 = 42 (बायाँ भाग)',
      },
      {
        stepNumber: 2,
        stepTitle: '99 में से बायाँ भाग घटाएँ',
        explanation: 'अब 99 में से 42 घटाएँ: 9 - 4 = 5, 9 - 2 = 7 (यानी 57)।',
        mathWork: '99 - 42 = 57 (दायाँ भाग)',
      },
      {
        stepNumber: 3,
        stepTitle: 'दोनों भागों को मिलाएँ',
        explanation: '42 और 57 को मिलाते ही उत्तर 4257 आ जाता है!',
        mathWork: 'उत्तर = 4257',
      },
    ],
    quickExample: {
      problem: '68 × 99',
      steps: [
        'बायाँ भाग: 68 - 1 = 67',
        'दायाँ भाग: 99 - 67 = 32',
        'उत्तर: 6732',
      ],
      finalAnswer: '6732',
    },
    practiceProblems: [
      {
        question: '75 × 99 का मान क्या होगा?',
        options: ['7425', '7435', '7525', '7325'],
        correctIndex: 0,
        hint: '75 - 1 = 74। अब 99 - 74 = 25। उत्तर: 7425!',
        mentalTip: '74 और 25 -> 7425!',
      },
      {
        question: '254 × 999 का मान क्या होगा? (3-अंक)',
        options: ['253746', '254746', '253846', '252746'],
        correctIndex: 0,
        hint: '254 - 1 = 253। 999 - 253 = 746।',
        mentalTip: '253 और 746 -> 253746!',
      },
    ],
    realLifeUse:
      'जब भी बाजार में ₹99 या ₹999 का डिस्काउंट टैग लगा हो, तो 5 या 10 पीस की कुल कीमत बिना किसी गणना उपकरण के मुँहजबानी निकालें।',
    interactiveType: 'multiply99',
  },
  {
    id: 'vm-antya-10',
    sutra: 'अन्त्ययोर्दशकेऽपि (Antyayordashake\'pi)',
    sutraMeaning: 'अंतिम अंकों का जोड़ 10 हो और दहाई अंक समान हों',
    englishName: 'Tens are Same & Units Sum to 10 (e.g. 43 × 47, 62 × 68)',
    badge: '🎯 सटीक दिमाग',
    category: 'multiplication',
    description:
      'यदि दोनों संख्याओं के दहाई अंक एक जैसे हों (जैसे 4 और 4) और इकाई अंकों का जोड़ 10 हो (जैसे 3 + 7 = 10), तो यह फॉर्मूला सेकंडों में उत्तर देता है!',
    rule: 'आगे का भाग = दहाई × (दहाई + 1)। पीछे का भाग = इकाई अंकों का सीधा गुणा।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: 'शर्त की जाँच करें',
        explanation: '43 और 47 में: दोनों के दहाई अंक 4 हैं, और 3 + 7 = 10 है। शर्त पूरी!',
        mathWork: 'दहाई = 4, इकाई = 3 और 7',
      },
      {
        stepNumber: 2,
        stepTitle: 'आगे का भाग निकालें',
        explanation: 'दहाई अंक 4 को उसके अगले अंक 5 से गुणा करें: 4 × 5 = 20।',
        mathWork: '4 × (4 + 1) = 20',
      },
      {
        stepNumber: 3,
        stepTitle: 'पीछे का भाग निकालें',
        explanation: 'इकाई अंकों का सीधा गुणा करें: 3 × 7 = 21।',
        mathWork: '3 × 7 = 21 -> उत्तर = 2021!',
      },
    ],
    quickExample: {
      problem: '62 × 68',
      steps: [
        'दहाई अंक समान (6) और इकाई 2 + 8 = 10',
        'आगे: 6 × 7 = 42',
        'पीछे: 2 × 8 = 16',
        'उत्तर: 4216',
      ],
      finalAnswer: '4216',
    },
    practiceProblems: [
      {
        question: '74 × 76 का मान क्या होगा?',
        options: ['5624', '4924', '5634', '5424'],
        correctIndex: 0,
        hint: 'दहाई: 7 × 8 = 56। इकाई: 4 × 6 = 24।',
        mentalTip: '56 और 24 -> 5624!',
      },
      {
        question: '31 × 39 का मान क्या होगा?',
        options: ['1209', '1290', '909', '1219'],
        correctIndex: 0,
        hint: '3 × 4 = 12। 1 × 9 = 09 (दो अंक में लिखें)!',
        mentalTip: '12 और 09 -> 1209!',
      },
    ],
    realLifeUse:
      'व्यापारिक लेन-देन, ग्रोसरी बिलिंग और प्रतियोगी परीक्षाओं (Olympiad, NTSE) में समय बचाने में अत्यंत उपयोगी।',
    interactiveType: 'antya10',
  },
  {
    id: 'vm-fast-div-5',
    sutra: 'यथातथ्यम् द्विगुणीकरणम् (Double & Divide by 10)',
    sutraMeaning: 'संख्या को दोगुना करके दशमलव एक स्थान बाईं ओर लगाना',
    englishName: 'Lightning Division by 5 (Mental Division)',
    badge: '💡 दैनिक जादुई गणना',
    category: 'division',
    description:
      'किसी भी बड़ी से बड़ी संख्या को 5 से भाग देने का सबसे सरल तरीका! कभी भाग मत दो—बस संख्या को 2 से गुणा (Double) कर दो और एक अंक बाद दशमलव लगा दो।',
    rule: 'संख्या को दोगुना (× 2) करें, और अंतिम अंक से पहले दशमलव (.) लगा दें।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: 'संख्या को 2 से गुणा (Double) करें',
        explanation: 'जैसे 240 ÷ 5 में, पहले 240 का दोगुना करें = 480।',
        mathWork: '240 × 2 = 480',
      },
      {
        stepNumber: 2,
        stepTitle: '10 से भाग दें (दशमलव लगाएँ)',
        explanation: '480 में अंतिम 0 हटा दें या दशमलव लगाएँ = 48.0 यानी 48!',
        mathWork: '480 ÷ 10 = 48',
      },
    ],
    quickExample: {
      problem: '314 ÷ 5',
      steps: [
        'संख्या का दोगुना: 314 × 2 = 628',
        'एक अंक बाद दशमलव: 62.8',
        'उत्तर: 62.8',
      ],
      finalAnswer: '62.8',
    },
    practiceProblems: [
      {
        question: '420 ÷ 5 का मान क्या होगा?',
        options: ['84', '82', '80', '85'],
        correctIndex: 0,
        hint: '420 का दोगुना = 840। अंतिम 0 हटाएँ = 84!',
        mentalTip: '420 × 2 = 840 -> 84!',
      },
      {
        question: '135 ÷ 5 का मान क्या होगा?',
        options: ['27', '25', '29', '26'],
        correctIndex: 0,
        hint: '135 का दोगुना = 270। अंतिम 0 हटाएँ = 27!',
        mentalTip: '135 × 2 = 270 -> 27!',
      },
    ],
    realLifeUse:
      'जब 5 दोस्तों में होटल का बिल बाँटना हो या 5% निकालना हो, तो बिना कैलकुलेटर के तुरंत सटीक हिसाब।',
    interactiveType: 'fastDiv5',
  },
  {
    id: 'vm-multiply-51',
    sutra: 'अनुपातेन यावदूनम् (Magic Multiply by 51)',
    sutraMeaning: 'संख्या का आधा आगे, और अंत में वही संख्या (Half in front + Same number at the end)',
    englishName: 'Multiply by 51 in 2 Seconds (e.g. 51 × 42 = 2142)',
    badge: '🔥 51 का जादुई नियम (51 × 42 = 2142)',
    category: 'multiplication',
    description:
      'किसी भी सम संख्या (Even Number) को 51 से गुणा करने का सबसे अद्भुत नियम! शुरू में उस संख्या का ठीक आधा (N ÷ 2) आता है और अंत में वही 2-अंकीय संख्या आ जाती है! जैसे: 51 × 42 = 2142!',
    rule: 'शुरू में = संख्या का आधा (N ÷ 2), अंत में = वही संख्या (N)। दोनों को मिलाकर उत्तर लिखें!',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: '51 का बीजगणितीय रहस्य समझें',
        explanation: '51 को (50 + 1) लिखा जा सकता है। इसलिए 51 × N = (50 × N) + (1 × N)।',
        mathWork: '51 × 42 = (50 × 42) + (1 × 42)',
      },
      {
        stepNumber: 2,
        stepTitle: 'आगे का भाग निकालें (संख्या का आधा)',
        explanation: '50 × 42 का मतलब है (100 ÷ 2) × 42 = 42 ÷ 2 × 100 = 2100 (सैकड़ा = 21)।',
        mathWork: '42 ÷ 2 = 21 (शुरू में 21)',
      },
      {
        stepNumber: 3,
        stepTitle: 'अंत में वही संख्या चिपका दें',
        explanation: '2100 में 1 × 42 = 42 जोड़ने पर सीधे 2142 बन जाता है!',
        mathWork: '2100 + 42 = 2142 (उत्तर = 2142!)',
      },
    ],
    quickExample: {
      problem: '51 × 42',
      steps: [
        'संख्या 42 का आधा = 21 (शुरू में लिखें)',
        'अंत में वही संख्या = 42 (पीछे लिखें)',
        'दोनों को साथ मिलाकर लिखें: 2142!',
        'जाँच: 51 × 42 = 2142',
      ],
      finalAnswer: '2142',
    },
    practiceProblems: [
      {
        question: '51 × 64 का मान मन ही मन निकालें:',
        options: ['3264', '3164', '3464', '3246'],
        correctIndex: 0,
        hint: '64 का आधा = 32 (शुरू में) और पीछे वही 64! उत्तर = 3264!',
        mentalTip: '64 का आधा 32, पीछे 64 -> 3264!',
      },
      {
        question: '51 × 28 का मान क्या होगा?',
        options: ['1428', '1482', '1228', '1628'],
        correctIndex: 0,
        hint: '28 का आधा = 14 (आगे) और 28 पीछे! उत्तर = 1428!',
        mentalTip: '28 का आधा 14, पीछे 28 -> 1428!',
      },
      {
        question: '51 × 86 का मान क्या होगा?',
        options: ['4386', '4368', '4286', '4486'],
        correctIndex: 0,
        hint: '86 का आधा = 43, पीछे 86 -> 4386!',
        mentalTip: '86 का आधा 43, पीछे 86 -> 4386!',
      },
      {
        question: '51 × 32 का मान क्या होगा?',
        options: ['1632', '1532', '1623', '1732'],
        correctIndex: 0,
        hint: '32 का आधा = 16, पीछे 32 -> 1632!',
        mentalTip: '32 का आधा 16, पीछे 32 -> 1632!',
      },
    ],
    realLifeUse:
      'थोक बाजार में जब 51 किलो या 51 पैकेट का हिसाब लगाना हो (जैसे ₹42 किलो का 51 किलो = ₹2142), तो बिना पेन उठाए 1 सेकंड में सटीक हिसाब!',
    interactiveType: 'multiply51',
  },
  {
    id: 'vm-multiply-21',
    sutra: 'उपसूत्र पंचम भाग / विलोकनम् (Magic Multiply by 21)',
    sutraMeaning: 'संख्या का 1/5 भाग शुरू में और अंत में वही संख्या (1/5th part in front + Same number)',
    englishName: 'Multiply by 21 in 2 Seconds (e.g. 21 × 25 = 525)',
    badge: '⚡ 21 का जादुई नियम (21 × 25 = 525)',
    category: 'multiplication',
    description:
      '21 से किसी भी संख्या को गुणा करने का सुपरफास्ट नियम! जब संख्या 25, 35, 45, 15 आदि हो, तो शुरू में संख्या का 1/5 भाग (÷ 5) आता है और अंत में वही संख्या आ जाती है! जैसे: 21 × 25 = 525!',
    rule: '21 × 25 में: 25 का 1/5 भाग = 5 (आगे) और पीछे 25 -> 525! सामान्य नियम: 21 × N = (20 × N) + N (संख्या का दोगुना करके 0 लगाएँ और वही संख्या जोड़ें)।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: '21 का विभाजन समझें',
        explanation: '21 = (20 + 1)। इसलिए 21 × 25 = (20 × 25) + (1 × 25)।',
        mathWork: '21 × 25 = (20 × 25) + 25',
      },
      {
        stepNumber: 2,
        stepTitle: '1/5 भाग का गणितीय रहस्य',
        explanation: '20 × 25 = 25 × (100 ÷ 5) = (25 ÷ 5) × 100 = 500! यानी 25 का 1/5 भाग = 5 सैकड़ा!',
        mathWork: '25 ÷ 5 = 5 (सैकड़े के स्थान पर 500)',
      },
      {
        stepNumber: 3,
        stepTitle: 'अंत में वही संख्या जोड़ें',
        explanation: '500 में 1 × 25 = 25 जोड़ें -> 500 + 25 = 525!',
        mathWork: '500 + 25 = 525 (उत्तर = 525!)',
      },
    ],
    quickExample: {
      problem: '21 × 25',
      steps: [
        '25 का 1/5 भाग (25 ÷ 5) = 5 (आगे लिखें)',
        'अंत में वही संख्या = 25 (पीछे लिखें)',
        'मिलाकर बना: 525!',
        'अन्य सामान्य तरीका: 25 × 2 = 50 -> 500 + 25 = 525!',
      ],
      finalAnswer: '525',
    },
    practiceProblems: [
      {
        question: '21 × 25 का मान क्या होगा?',
        options: ['525', '552', '425', '625'],
        correctIndex: 0,
        hint: '25 का 1/5 भाग = 5, पीछे 25 -> 525!',
        mentalTip: '25 ÷ 5 = 5, पीछे 25 -> 525!',
      },
      {
        question: '21 × 35 का मान मन ही मन निकालें:',
        options: ['735', '635', '753', '835'],
        correctIndex: 0,
        hint: '35 का 1/5 भाग = 7, पीछे 35 -> 735!',
        mentalTip: '35 ÷ 5 = 7, पीछे 35 -> 735!',
      },
      {
        question: '21 × 45 का मान क्या होगा?',
        options: ['945', '845', '954', '1045'],
        correctIndex: 0,
        hint: '45 का 1/5 भाग = 9, पीछे 45 -> 945!',
        mentalTip: '45 ÷ 5 = 9, पीछे 45 -> 945!',
      },
      {
        question: '21 × 15 का मान क्या होगा?',
        options: ['315', '215', '351', '415'],
        correctIndex: 0,
        hint: '15 का 1/5 भाग = 3, पीछे 15 -> 315!',
        mentalTip: '15 ÷ 5 = 3, पीछे 15 -> 315!',
      },
      {
        question: '21 × 30 का मान क्या होगा?',
        options: ['630', '603', '620', '650'],
        correctIndex: 0,
        hint: '30 का दोगुना 60 -> 600 + 30 = 630!',
        mentalTip: '30 × 20 = 600 + 30 = 630!',
      },
    ],
    realLifeUse:
      '₹21 प्रति लीटर दूध या ₹21 प्रति पैकेट बिस्कुट खरीदते समय 25, 35 या 45 पैकेट का बिल 2 सेकंड में तैयार करने में।',
    interactiveType: 'multiply21',
  },
  {
    id: 'vm-multiply-101',
    sutra: 'पुनरावृत्ति सूत्र (Twin Mirror Multiply by 101)',
    sutraMeaning: 'संख्या का दो बार दोहराव (Repeat the 2-digit number twice: AB × 101 = ABAB)',
    englishName: '101 Twin Mirror Trick (e.g. 47 × 101 = 4747)',
    badge: '🌟 101 जादुई मिरर ट्रिक',
    category: 'multiplication',
    description:
      'किसी भी 2-अंकीय संख्या को 101 से गुणा करना दुनिया का सबसे आसान जादू है—बस उस संख्या को दो बार लिख दो! जैसे: 47 × 101 = 4747, 83 × 101 = 8383!',
    rule: 'AB × 101 = ABAB (वही संख्या दो बार दोहराएँ)।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: '101 का आधार देखें',
        explanation: '101 = (100 + 1)। अतः AB × 101 = (AB × 100) + (AB × 1)।',
        mathWork: '47 × 101 = 4700 + 47',
      },
      {
        stepNumber: 2,
        stepTitle: 'जोड़ें',
        explanation: '4700 में 47 जोड़ने पर 4747 बन जाता है!',
        mathWork: '4700 + 47 = 4747',
      },
    ],
    quickExample: {
      problem: '73 × 101',
      steps: [
        'संख्या 73 को दो बार लिखें: 73 और 73',
        'उत्तर: 7373',
        'जाँच: 73 × 100 = 7300 + 73 = 7373!',
      ],
      finalAnswer: '7373',
    },
    practiceProblems: [
      {
        question: '58 × 101 का मान क्या होगा?',
        options: ['5858', '5885', '5808', '5958'],
        correctIndex: 0,
        hint: '58 को दो बार लिखें: 5858!',
        mentalTip: '58 × 101 = 5858!',
      },
      {
        question: '94 × 101 का मान क्या होगा?',
        options: ['9494', '9449', '9404', '9594'],
        correctIndex: 0,
        hint: '94 को दो बार लिखें: 9494!',
        mentalTip: '94 × 101 = 9494!',
      },
    ],
    realLifeUse:
      'कंप्यूटर कोडिंग, पैलिंड्रोम संख्याएँ बनाने और स्पीड मैथ क्विज में तुरंत उत्तर देने के लिए।',
    interactiveType: 'multiply101',
  },
  {
    id: 'vm-multiply-25',
    sutra: 'यावदूनम् पाद गुणनम् (Multiply by 25: Divide by 4 & Add 00)',
    sutraMeaning: 'संख्या को 4 से भाग देकर दो शून्य लगाएँ (Divide by 4 and multiply by 100)',
    englishName: 'Lightning Multiply by 25 (e.g. 64 × 25 = 1600)',
    badge: '⚡ 4 का भाग नियम',
    category: 'multiplication',
    description:
      '25 से कभी गुणा मत करो—संख्या को बस 4 से भाग दो और पीछे दो शून्य (00) लगा दो! जैसे 64 × 25: 64 ÷ 4 = 16, पीछे 00 -> 1600!',
    rule: 'संख्या ÷ 4, फिर × 100 (दो शून्य लगाएँ)।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: '25 = 100 ÷ 4 का रहस्य',
        explanation: 'चूँकि 25 = 100 / 4 होता है, इसलिए N × 25 = (N / 4) × 100।',
        mathWork: '64 × 25 = (64 ÷ 4) × 100',
      },
      {
        stepNumber: 2,
        stepTitle: '4 से भाग देकर 00 लगाएँ',
        explanation: '64 में 4 का भाग दें = 16। पीछे 00 लगाएँ = 1600!',
        mathWork: '16 × 100 = 1600',
      },
    ],
    quickExample: {
      problem: '48 × 25',
      steps: [
        '48 को 4 से भाग दें: 48 ÷ 4 = 12',
        'पीछे दो शून्य लगाएँ: 1200',
        'उत्तर: 1200',
      ],
      finalAnswer: '1200',
    },
    practiceProblems: [
      {
        question: '36 × 25 का मान क्या होगा?',
        options: ['900', '800', '950', '850'],
        correctIndex: 0,
        hint: '36 ÷ 4 = 9। पीछे 00 लगाएँ = 900!',
        mentalTip: '36 ÷ 4 = 9 -> 900!',
      },
      {
        question: '84 × 25 का मान क्या होगा?',
        options: ['2100', '2000', '2200', '2050'],
        correctIndex: 0,
        hint: '84 ÷ 4 = 21। पीछे 00 लगाएँ = 2100!',
        mentalTip: '84 ÷ 4 = 21 -> 2100!',
      },
    ],
    realLifeUse:
      'जब 25% निकालना हो या ₹25 प्रति वस्तु की दर से 36 या 48 वस्तुओं का मूल्य निकालना हो।',
    interactiveType: 'multiply25',
  },
  {
    id: 'vm-multiply-5',
    sutra: 'अर्धम् दशगुणम् (Multiply by 5: Half & Add 0)',
    sutraMeaning: 'संख्या का आधा करके 10 से गुणा करना (Half the number and append 0)',
    englishName: 'Multiply by 5 in 1 Second (e.g. 86 × 5 = 430)',
    badge: '⚡ 1-सेकंड हाफ ट्रिक',
    category: 'multiplication',
    description:
      'किसी भी संख्या को 5 से गुणा करने के लिए कभी पहाड़ा मत पढ़ो—बस उस संख्या का आधा (Half) करो और पीछे एक शून्य (0) लगा दो! जैसे: 86 × 5: 86 का आधा 43, पीछे 0 -> 430!',
    rule: 'संख्या का आधा (÷ 2) करें, और अंत में 0 लगाएँ।',
    howItWorks: [
      {
        stepNumber: 1,
        stepTitle: '5 = 10 ÷ 2 का सिद्धांत',
        explanation: '5 से गुणा करना = 10 से गुणा करके 2 से भाग देना (या आधा करके 10 से गुणा करना)।',
        mathWork: '86 × 5 = (86 ÷ 2) × 10',
      },
      {
        stepNumber: 2,
        stepTitle: 'आधा करके 0 लगाएँ',
        explanation: '86 का आधा = 43। पीछे 0 लगाएँ = 430!',
        mathWork: '43 × 10 = 430',
      },
    ],
    quickExample: {
      problem: '68 × 5',
      steps: [
        '68 का आधा = 34',
        'पीछे 0 लगाएँ = 340',
        'उत्तर: 340',
      ],
      finalAnswer: '340',
    },
    practiceProblems: [
      {
        question: '74 × 5 का मान क्या होगा?',
        options: ['370', '350', '380', '360'],
        correctIndex: 0,
        hint: '74 का आधा = 37। पीछे 0 लगाएँ = 370!',
        mentalTip: '74 ÷ 2 = 37 -> 370!',
      },
      {
        question: '92 × 5 का मान क्या होगा?',
        options: ['460', '450', '470', '440'],
        correctIndex: 0,
        hint: '92 का आधा = 46। पीछे 0 लगाएँ = 460!',
        mentalTip: '92 ÷ 2 = 46 -> 460!',
      },
    ],
    realLifeUse:
      'दुकान पर 5 किलो चीनी, 5 कॉपियों या 5 टिकटों का तुरंत हिसाब लगाने में।',
    interactiveType: 'multiply5',
  },
];

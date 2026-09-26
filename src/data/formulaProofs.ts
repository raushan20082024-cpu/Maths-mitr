export interface FormulaProof {
  id: string;
  name: string;
  formula: string;
  category: string;
  icon: string;
  summary: string;
  originStory: string;
  visualDescription: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    explanation: string;
    mathExpression?: string;
  }>;
  whyItNeverFails: string;
  realLifeExamples: [string, string];
  interactiveCheck: {
    variableValues: Record<string, number>;
    lhsFormula: string;
    rhsFormula: string;
  };
}

export const FORMULA_PROOFS: FormulaProof[] = [
  {
    id: 'proof-pythagoras',
    name: 'पाइथागोरस प्रमेय (Pythagorean Theorem)',
    formula: 'a² + b² = c²',
    category: 'ज्यामिति व त्रिकोणमिति (Geometry)',
    icon: '📐',
    summary: 'किसी भी समकोण त्रिभुज में कर्ण का वर्ग अन्य दो भुजाओं के वर्गों के योग के बराबर होता है।',
    originStory:
      'प्राचीन भारत के बौधायन शुल्बसूत्र और यूनान के पाइथागोरस ने देखा कि जब समकोण त्रिभुज की तीनों भुजाओं पर चौकोर वर्ग बनाए जाते हैं, तो दोनों छोटे वर्गों का कुल क्षेत्रफल बड़े कर्ण वाले वर्ग के क्षेत्रफल के ठीक बराबर होता है!',
    visualDescription:
      'एक बड़ा वर्ग जिसकी भुजा (a + b) है। इसके अंदर 4 समकोण त्रिभुज (प्रत्येक का क्षेत्रफल 1/2 × a × b) और बीच में कर्ण "c" का एक चौकोर वर्ग (c²) रखा गया है।',
    steps: [
      {
        stepNumber: 1,
        title: 'बड़ा वर्ग बनाएँ (Construct Outer Square)',
        explanation: 'एक बड़े वर्ग की कल्पना करें जिसकी प्रत्येक भुजा की लंबाई (a + b) है।',
        mathExpression: 'बड़े वर्ग का कुल क्षेत्रफल = (a + b)²',
      },
      {
        stepNumber: 2,
        title: 'अंदर के टुकड़ों को गिनें (Count Inner Pieces)',
        explanation:
          'इस बड़े वर्ग के अंदर ठीक 4 समकोण त्रिभुज हैं और बीच में एक तिरछा वर्ग है जिसकी भुजा कर्ण "c" है।',
        mathExpression: 'कुल क्षेत्रफल = 4 × (त्रिभुज का क्षेत्रफल) + (अंदर के वर्ग का क्षेत्रफल)',
      },
      {
        stepNumber: 3,
        title: 'क्षेत्रफलों का मान रखें (Substitute Values)',
        explanation: '4 समकोण त्रिभुजों का क्षेत्रफल = 4 × (1/2 × a × b) = 2ab। अंदर के वर्ग का क्षेत्रफल = c²।',
        mathExpression: '(a + b)² = 2ab + c²',
      },
      {
        stepNumber: 4,
        title: 'बायाँ पक्ष खोलें (Expand LHS)',
        explanation: '(a + b)² को खोलने पर a² + 2ab + b² मिलता है।',
        mathExpression: 'a² + 2ab + b² = 2ab + c²',
      },
      {
        stepNumber: 5,
        title: 'दोनों तरफ से 2ab काटें (Cancel 2ab from both sides)',
        explanation: 'समीकरण के दोनों पक्षों में 2ab मौजूद है, उसे घटा दें।',
        mathExpression: 'a² + b² = c²  (इति सिद्धम् / Q.E.D. 🎉)',
      },
    ],
    whyItNeverFails:
      'क्योंकि ज्यामितीय रूप से क्षेत्रफल कभी नहीं बदलता—चाहे आप 4 त्रिभुजों को कैसे भी व्यवस्थित करें, बची हुई खाली जगह हमेशा a² + b² के बराबर ही रहेगी!',
    realLifeExamples: [
      'दीवार पर सीढ़ी लगाना: यदि दीवार 4 मीटर ऊँची है और सीढ़ी जमीन पर 3 मीटर दूर रखी है, तो आवश्यक सीढ़ी की लंबाई c = √(3² + 4²) = √25 = 5 मीटर होगी।',
      'स्मार्टफोन स्क्रीन का आकार: जब फोन को 6.5 इंच स्क्रीन कहा जाता है, तो वह पाइथागोरस प्रमेय द्वारा स्क्रीन के विकर्ण (Diagonal) की माप होती है।',
    ],
    interactiveCheck: {
      variableValues: { a: 3, b: 4, c: 5 },
      lhsFormula: '3² + 4² = 9 + 16 = 25',
      rhsFormula: '5² = 25 (LHS = RHS)',
    },
  },
  {
    id: 'proof-a-plus-b-sq',
    name: 'बीजगणितीय सर्वसमिका: (a + b)²',
    formula: '(a + b)² = a² + 2ab + b²',
    category: 'बीजगणित (Algebra)',
    icon: '🟧',
    summary: 'दो संख्याओं के योग का वर्ग = पहली का वर्ग + 2 × पहली × दूसरी + दूसरी का वर्ग।',
    originStory:
      'यह कोई रटने वाला सूत्र नहीं, बल्कि एक चौकोर कमरे के 4 कमरों में बँटने का ज्यामितीय नक्शा है!',
    visualDescription:
      'एक बड़ा वर्गाकार कमरा जिसकी भुजा (a + b) है। जब इसे काटा जाता है, तो 4 हिस्से बनते हैं: एक a × a का बड़ा कमरा (a²), दो a × b के गलियारे (ab + ab = 2ab), और एक b × b का छोटा कमरा (b²)।',
    steps: [
      {
        stepNumber: 1,
        title: 'वर्ग का मतलब समझें (Definition of Square)',
        explanation: '(a + b)² का मतलब है (a + b) को खुद (a + b) से गुणा करना।',
        mathExpression: '(a + b)² = (a + b) × (a + b)',
      },
      {
        stepNumber: 2,
        title: 'वितरण नियम लागू करें (Distributive Property)',
        explanation: 'पहले कोष्ठक के "a" से पूरे (a + b) को गुणा करें, फिर "b" से पूरे (a + b) को गुणा करें।',
        mathExpression: '= a × (a + b) + b × (a + b)',
      },
      {
        stepNumber: 3,
        title: 'गुणा खोलें (Expand Multiplication)',
        explanation: 'a × a = a², a × b = ab, b × a = ba (या ab), और b × b = b²।',
        mathExpression: '= a² + ab + ab + b²',
      },
      {
        stepNumber: 4,
        title: 'समान पदों को जोड़ें (Combine Like Terms)',
        explanation: 'ab और ab मिलकर 2ab बन जाते हैं।',
        mathExpression: '= a² + 2ab + b²  (प्रमाणित! ✨)',
      },
    ],
    whyItNeverFails:
      'क्योंकि बीजगणित का गुणन ज्यामितीय क्षेत्रफल के नियम का 100% पालन करता है। a² + ab + ab + b² मिलकर पूरा बड़ा वर्ग भर देते हैं।',
    realLifeExamples: [
      'तेज वर्ग निकालना: जैसे 52² निकालना है, तो इसे (50 + 2)² लिखें: 50² + 2(50)(2) + 2² = 2500 + 200 + 4 = 2704!',
      'मकान का नक्शा: जब घर में मास्टर बेडरूम (a²), दो बालकनी/हॉल (2ab) और स्टोर (b²) बनता है, तो कुल जगह (a+b)² होती है।',
    ],
    interactiveCheck: {
      variableValues: { a: 10, b: 3 },
      lhsFormula: '(10 + 3)² = 13² = 169',
      rhsFormula: '10² + 2(10)(3) + 3² = 100 + 60 + 9 = 169',
    },
  },
  {
    id: 'proof-triangle-area',
    name: 'त्रिभुज का क्षेत्रफल (Area of Triangle)',
    formula: 'क्षेत्रफल = 1/2 × आधार × ऊँचाई',
    category: 'क्षेत्रमिति (Mensuration)',
    icon: '🔺',
    summary: 'त्रिभुज का क्षेत्रफल हमेशा उसी आधार और ऊँचाई वाले आयत का ठीक आधा (1/2) होता है।',
    originStory:
      'प्राचीन मिस्र और भारत में भूमि नापते समय देखा गया कि किसी भी आयताकार खेत को कोने से कोने (विकर्ण) पर काटने से दो बिल्कुल बराबर त्रिभुज बनते हैं!',
    visualDescription:
      'एक आयत (Rectangle) जिसकी लंबाई "b" (आधार) और चौड़ाई "h" (ऊँचाई) है। जब इसके बीच में एक विकर्ण खींचा जाता है, तो वह आयत को दो सर्वांगसम त्रिभुजों में बाँट देता है।',
    steps: [
      {
        stepNumber: 1,
        title: 'आयत का क्षेत्रफल लें (Area of Enclosing Rectangle)',
        explanation: 'आधार "b" और ऊँचाई "h" वाले आयत का क्षेत्रफल लंबाई × चौड़ाई होता है।',
        mathExpression: 'आयत का क्षेत्रफल = आधार (b) × ऊँचाई (h)',
      },
      {
        stepNumber: 2,
        title: 'विकर्ण से दो हिस्से करें (Diagonal Split)',
        explanation: 'आयत का विकर्ण उसे दो बराबर समकोण त्रिभुजों में विभाजित करता है। दोनों का क्षेत्रफल एक समान होता है।',
        mathExpression: 'आयत = त्रिभुज 1 + त्रिभुज 2',
      },
      {
        stepNumber: 3,
        title: '1 त्रिभुज का मान निकालें (Solve for 1 Triangle)',
        explanation: 'चूँकि दोनों त्रिभुज बराबर हैं, इसलिए एक त्रिभुज का क्षेत्रफल आयत के क्षेत्रफल का ठीक आधा होगा।',
        mathExpression: 'त्रिभुज का क्षेत्रफल = 1/2 × (आयत का क्षेत्रफल) = 1/2 × b × h  (सिद्ध हुआ! 🎯)',
      },
    ],
    whyItNeverFails:
      'चाहे त्रिभुज समकोण हो, न्यूनकोण हो या अधिककोण—उसे हमेशा ऐसे दो आयतों के हिस्सों में तोड़ा जा सकता है जिनका कुल क्षेत्रफल 1/2 × b × h ही आता है।',
    realLifeExamples: [
      'घर की तिरछी छत (Roof Truss): छत के तिकोने हिस्से को रंगने के लिए पेंट का हिसाब लगाने में 1/2 × आधार × ऊँचाई का उपयोग होता है।',
      'सैंडविच काटना: जब चौकोर ब्रेड स्लाइस को बीच से तिरछा काटकर दो सैंडविच बनाए जाते हैं, तो प्रत्येक सैंडविच का क्षेत्रफल पूरी ब्रेड का ठीक आधा (1/2) होता है।',
    ],
    interactiveCheck: {
      variableValues: { b: 8, h: 6 },
      lhsFormula: 'आयत का क्षेत्रफल = 8 × 6 = 48 m²',
      rhsFormula: 'त्रिभुज = 1/2 × 48 = 24 m²',
    },
  },
  {
    id: 'proof-circle-area',
    name: 'वृत्त का क्षेत्रफल (Area of Circle)',
    formula: 'क्षेत्रफल = π × r²',
    category: 'क्षेत्रमिति (Mensuration)',
    icon: '⭕',
    summary: 'वृत्त को अनंत पतली स्लाइस में काटकर जोड़ने पर वह एक आयत बन जाता है जिसकी लंबाई πr और चौड़ाई r होती है।',
    originStory:
      'महान गणितज्ञ आर्किमिडीज (Archimedes) ने वृत्त को पिज़्ज़ा के छोटे-छोटे 32 या 64 टुकड़ों में काटा और उन्हें एक ऊपर-एक नीचे करके सजाया। वह देखकर दंग रह गए कि यह तो एक आयत बन गया!',
    visualDescription:
      'एक गोल वृत्त जिसे 16 त्रिज्यखंडों (Slices) में काटा गया है। इन स्लाइसों को एक-दूसरे में फंसाकर रखने पर एक आयत बनता है, जिसकी लंबाई परिधि की आधी (πr) और चौड़ाई त्रिज्या (r) है।',
    steps: [
      {
        stepNumber: 1,
        title: 'वृत्त की परिधि जानें (Circumference)',
        explanation: 'वृत्त के चारों ओर की कुल बाउंड्री (परिधि) 2πr होती है।',
        mathExpression: 'परिधि = 2πr',
      },
      {
        stepNumber: 2,
        title: 'वृत्त को पिज़्ज़ा स्लाइस में काटें (Slice the Circle)',
        explanation: 'वृत्त को बहुत सारी पतली-पतली फाँकों (Slices) में काटें।',
        mathExpression: 'आधे टुकड़े ऊपर, आधे नीचे',
      },
      {
        stepNumber: 3,
        title: 'टुकड़ों को आयत के रूप में सजाएँ (Form a Rectangle)',
        explanation: 'ऊपरी सिरे की लंबाई परिधि की आधी होगी = (2πr) ÷ 2 = πr। और आयत की ऊँचाई वृत्त की त्रिज्या "r" होगी।',
        mathExpression: 'लंबाई = πr,  चौड़ाई = r',
      },
      {
        stepNumber: 4,
        title: 'आयत का क्षेत्रफल निकालें (Area of Formed Rectangle)',
        explanation: 'आयत का क्षेत्रफल = लंबाई × चौड़ाई = (πr) × (r) = πr²।',
        mathExpression: 'वृत्त का क्षेत्रफल = π × r²  (इति सिद्धम् 🌟)',
      },
    ],
    whyItNeverFails:
      'जैसे-जैसे टुकड़ों की संख्या अनंत की ओर बढ़ती है, घुमावदार किनारे पूरी तरह सीधी रेखा बन जाते हैं और आकृति एकदम सटीक आयत में बदल जाती है।',
    realLifeExamples: [
      'गोल रोटी या पिज़्ज़ा का आकार: 7 सेमी त्रिज्या वाली रोटी का क्षेत्रफल = 22/7 × 7 × 7 = 154 वर्ग सेमी।',
      'गोल पार्क में घास लगाना: 14 मीटर त्रिज्या वाले गोल पार्क में घास लगाने का कुल क्षेत्रफल π × 14² = 616 वर्ग मीटर होगा।',
    ],
    interactiveCheck: {
      variableValues: { r: 7 },
      lhsFormula: 'π × 7² = (22/7) × 49 = 154',
      rhsFormula: 'आयत (लंबाई πr = 22, चौड़ाई r = 7) = 22 × 7 = 154',
    },
  },
  {
    id: 'proof-simple-interest',
    name: 'साधारण ब्याज सूत्र (Simple Interest Formula)',
    formula: 'SI = (P × R × T) / 100',
    category: 'वित्तीय गणित (Commercial Math)',
    icon: '💰',
    summary: 'मूलधन (P), ब्याज दर (R%) और समय (T वर्ष) से मिलने वाले कुल ब्याज का गणितीय प्रमाण।',
    originStory:
      'यह सूत्र ऐकिक नियम (Unitary Method) से सिद्ध होता है, जिसका उपयोग दुनिया भर के बैंक सदियों से करते आ रहे हैं।',
    visualDescription:
      'हर ₹100 पर 1 साल में R रुपये मिलते हैं। तो ₹1 पर R/100, और P रुपयों पर T सालों में (P × R × T)/100 मिलते हैं।',
    steps: [
      {
        stepNumber: 1,
        title: 'दर (Rate %) की परिभाषा समझें',
        explanation: 'R% वार्षिक दर का मतलब है: ₹100 मूलधन पर 1 वर्ष का ब्याज = R रुपये।',
        mathExpression: '₹100 पर 1 वर्ष का ब्याज = R रुपये',
      },
      {
        stepNumber: 2,
        title: '₹1 का ब्याज निकालें (Unitary Method for ₹1)',
        explanation: '100 से भाग देने पर: ₹1 मूलधन पर 1 वर्ष का ब्याज = R / 100 रुपये।',
        mathExpression: '₹1 पर 1 वर्ष का ब्याज = R / 100',
      },
      {
        stepNumber: 3,
        title: '"P" रुपयों का 1 वर्ष का ब्याज निकालें',
        explanation: 'P से गुणा करने पर: P रुपयों का 1 वर्ष का ब्याज = (P × R) / 100 रुपये।',
        mathExpression: 'P रुपयों पर 1 वर्ष का ब्याज = (P × R) / 100',
      },
      {
        stepNumber: 4,
        title: '"T" वर्षों का कुल ब्याज निकालें (For T Years)',
        explanation: 'चूँकि साधारण ब्याज हर वर्ष समान रहता है, इसलिए T से गुणा करें।',
        mathExpression: 'कुल साधारण ब्याज (SI) = (P × R × T) / 100  (प्रमाणित! 💼)',
      },
    ],
    whyItNeverFails:
      'क्योंकि यह अनुपात और ऐकिक नियम का सीधा गुणनफल है, जहाँ समय और मूलधन बढ़ने पर ब्याज उसी अनुपात में बढ़ता है।',
    realLifeExamples: [
      'बैंक बचत खाता: ₹10,000 की FD पर 6% दर से 2 वर्ष में ब्याज = (10000 × 6 × 2) / 100 = ₹1,200।',
      'शिक्षा ऋण (Student Loan): ₹50,000 पर 8% दर से 3 वर्ष का ब्याज = (50000 × 8 × 3) / 100 = ₹12,000।',
    ],
    interactiveCheck: {
      variableValues: { P: 5000, R: 10, T: 2 },
      lhsFormula: '₹100 पर 1 वर्ष = ₹10 => ₹5000 पर = ₹500',
      rhsFormula: '2 वर्ष का ब्याज = 500 × 2 = ₹1000 (SI = 5000×10×2/100 = 1000)',
    },
  },
  {
    id: 'proof-speed-distance',
    name: 'चाल, दूरी और समय का संबंध (Speed Formula)',
    formula: 'चाल (Speed) = दूरी / समय',
    category: 'गति विज्ञान (Motion)',
    icon: '🚴',
    summary: 'इकाई समय (1 घंटे या 1 सेकंड) में तय की गई दूरी को ही चाल (Speed) कहते हैं।',
    originStory:
      'गैलिलियो और न्यूटन ने गति का अध्ययन करते हुए देखा कि कोई वस्तु कितनी "तेज" चल रही है, यह केवल इस बात से तय होता है कि वह 1 सेकंड या 1 घंटे में कितनी दूरी नापती है।',
    visualDescription:
      'एक कार जो T घंटों में D किलोमीटर चलती है। 1 घंटे में तय दूरी निकालने के लिए कुल दूरी को कुल समय से विभाजित किया जाता है।',
    steps: [
      {
        stepNumber: 1,
        title: 'दूरी और समय का संबंध देखें',
        explanation: 'यदि कोई वाहन "T" समय (घंटे) में कुल "D" दूरी (किमी) तय करता है।',
        mathExpression: 'T घंटे में तय दूरी = D किमी',
      },
      {
        stepNumber: 2,
        title: 'ऐकिक नियम से 1 घंटे की दूरी निकालें (Per Unit Time)',
        explanation: '1 घंटे (इकाई समय) में तय की गई दूरी = D ÷ T।',
        mathExpression: '1 घंटे में तय दूरी = D / T',
      },
      {
        stepNumber: 3,
        title: 'चाल की वैज्ञानिक परिभाषा (Definition of Speed)',
        explanation: 'इकाई समय में तय की गई दूरी को ही भौतिकी और गणित में "चाल (Speed, s)" कहा जाता है।',
        mathExpression: 'चाल (Speed) = दूरी (Distance) / समय (Time)  (सिद्ध हुआ! 🏁)',
      },
    ],
    whyItNeverFails:
      'क्योंकि चाल एक दर (Rate of distance change) है। यदि समय को दूसरी तरफ ले जाएँ, तो दूरी = चाल × समय स्वतः सिद्ध हो जाता है।',
    realLifeExamples: [
      'साइकिल से स्कूल: यदि स्कूल 6 किमी दूर है और आप 30 मिनट (0.5 घंटा) में पहुँचते हैं, तो आपकी चाल = 6 ÷ 0.5 = 12 किमी/घंटा है।',
      'ट्रेन की रफ्तार: राजधानी एक्सप्रेस 2 घंटे में 160 किमी चलती है, तो चाल = 160 ÷ 2 = 80 किमी/घंटा।',
    ],
    interactiveCheck: {
      variableValues: { Distance: 120, Time: 2 },
      lhsFormula: '120 किमी ÷ 2 घंटे',
      rhsFormula: 'Speed = 60 किमी/घंटा',
    },
  },
  {
    id: 'proof-a-minus-b-sq',
    name: 'बीजगणितीय सर्वसमिका: (a - b)²',
    formula: '(a - b)² = a² - 2ab + b²',
    category: 'बीजगणित (Algebra)',
    icon: '🟦',
    summary: 'दो संख्याओं के अंतर का वर्ग = पहली का वर्ग - 2 × पहली × दूसरी + दूसरी का वर्ग।',
    originStory:
      'जब एक बड़े वर्ग a² में से दो पट्टियाँ a×b काटी जाती हैं, तो कोने वाला छोटा टुकड़ा b² दो बार घट जाता है, जिसे संतुलित करने के लिए वापस जोड़ना पड़ता है!',
    visualDescription:
      'एक बड़ा a × a का वर्ग लें। नीचे और दाएँ से b चौड़ाई की दो पट्टियाँ घटाएँ। कोना b × b दो बार कट गया, इसलिए +b² जोड़कर सही बचा हुआ वर्ग (a - b)² प्राप्त होता है।',
    steps: [
      {
        stepNumber: 1,
        title: 'वर्ग की परिभाषा (Square Definition)',
        explanation: '(a - b)² का अर्थ है (a - b) का (a - b) से गुणा।',
        mathExpression: '(a - b)² = (a - b) × (a - b)',
      },
      {
        stepNumber: 2,
        title: 'वितरण नियम लागू करें (Distributive Property)',
        explanation: 'पहला पद "a" पूरे (a - b) से गुणा होगा, फिर "-b" पूरे (a - b) से गुणा होगा।',
        mathExpression: '= a × (a - b) - b × (a - b)',
      },
      {
        stepNumber: 3,
        title: 'कोष्ठक खोलें (Expand Brackets)',
        explanation: 'a × a = a², a × (-b) = -ab, -b × a = -ab, और ध्यान दें: (-b) × (-b) = +b²!',
        mathExpression: '= a² - ab - ab + b²',
      },
      {
        stepNumber: 4,
        title: 'समान पद मिलाएँ (Combine Like Terms)',
        explanation: '-ab और -ab मिलकर -2ab बन जाते हैं।',
        mathExpression: '= a² - 2ab + b²  (प्रमाणित! ✨)',
      },
    ],
    whyItNeverFails:
      'ऋणात्मक संख्या का ऋणात्मक से गुणन (+b²) गणित का अपरिवर्तनीय नियम है, जिससे ज्यामितीय क्षेत्रफल भी सटीक रूप से संतुलित हो जाता है।',
    realLifeExamples: [
      'तेज वर्ग गणना: जैसे 48² निकालना है, तो (50 - 2)² = 50² - 2(50)(2) + 2² = 2500 - 200 + 4 = 2304!',
      'कटौती का शुद्ध क्षेत्रफल: एक वर्गाकार कपड़े a² के दोनों किनारों से सिलाई मार्जिन b घटाने पर बचा उपयोगी कपड़ा (a - b)² होता है।',
    ],
    interactiveCheck: {
      variableValues: { a: 10, b: 2 },
      lhsFormula: '(10 - 2)² = 8² = 64',
      rhsFormula: '10² - 2(10)(2) + 2² = 100 - 40 + 4 = 64',
    },
  },
  {
    id: 'proof-diff-of-squares',
    name: 'वर्गों का अंतर: a² - b²',
    formula: 'a² - b² = (a + b)(a - b)',
    category: 'बीजगणित (Algebra)',
    icon: '✂️',
    summary: 'दो वर्गों का अंतर उनके योग और अंतर के गुणनफल के बराबर होता है।',
    originStory:
      'प्राचीन यूनानी गणितज्ञों ने देखा कि जब बड़े वर्ग a² के कोने से छोटा वर्ग b² काटकर अलग किया जाता है, तो बची L-आकार की आकृति को काटकर एक सीधा आयत (a + b) × (a - b) बनाया जा सकता है!',
    visualDescription:
      'एक a × a के वर्ग से कोने का b × b वर्ग काटें। बची L-आकृति के दो आयत बनते हैं: (a - b) × a और (a - b) × b। दोनों को जोड़कर एक लंबा आयत (a + b) × (a - b) बनता है।',
    steps: [
      {
        stepNumber: 1,
        title: 'दायाँ पक्ष (RHS) लें',
        explanation: 'समीकरण के दाएँ पक्ष (a + b)(a - b) से शुरुआत करें।',
        mathExpression: 'RHS = (a + b) × (a - b)',
      },
      {
        stepNumber: 2,
        title: 'वितरण नियम से विस्तार करें',
        explanation: 'a से (a - b) को और फिर b से (a - b) को गुणा करें।',
        mathExpression: '= a(a - b) + b(a - b)',
      },
      {
        stepNumber: 3,
        title: 'गुणा करें',
        explanation: 'a × a = a², a × (-b) = -ab, b × a = +ab, b × (-b) = -b²।',
        mathExpression: '= a² - ab + ba - b²',
      },
      {
        stepNumber: 4,
        title: 'मध्य पद काटें (-ab + ab = 0)',
        explanation: '-ab और +ab एक दूसरे को निरस्त कर देते हैं। केवल a² - b² बचता है।',
        mathExpression: '= a² - b² = LHS  (इति सिद्धम्! 🎯)',
      },
    ],
    whyItNeverFails:
      'क्योंकि गुणन क्रमविनिमेय (Commutative) होता है, जिससे +ab और -ab हमेशा एक-दूसरे को शून्य बना देते हैं।',
    realLifeExamples: [
      'सुपरफास्ट गुणा: जैसे 53 × 47 करना हो, तो इसे (50 + 3)(50 - 3) = 50² - 3² = 2500 - 9 = 2491 सेकंडों में हल करें!',
      'फोटो फ्रेम की चौखट: बाहरी वर्ग (a²) और अंदर फोटो की जगह (b²) घटाने पर लकड़ी का बॉर्डर (a+b)(a-b) निकलता है।',
    ],
    interactiveCheck: {
      variableValues: { a: 12, b: 8 },
      lhsFormula: '12² - 8² = 144 - 64 = 80',
      rhsFormula: '(12 + 8)(12 - 8) = 20 × 4 = 80',
    },
  },
  {
    id: 'proof-sum-of-n-integers',
    name: 'प्रथम n प्राकृत संख्याओं का योग (Gauss Sum)',
    formula: '1 + 2 + 3 + ... + n = n(n + 1) / 2',
    category: 'संख्या पद्धति (Number Series)',
    icon: '➕',
    summary: '1 से n तक की सभी संख्याओं का योग = [n × (n + 1)] / 2।',
    originStory:
      'कार्ल फ्रेडरिक गॉस जब केवल 7 वर्ष के थे, तब उनके शिक्षक ने कक्षा को 1 से 100 तक जोड़ने को कहा। गॉस ने तुरंत उत्तर 5050 दे दिया! उन्होंने देखा कि 1+100=101, 2+99=101, 3+98=101 के कुल 50 जोड़े बनते हैं।',
    visualDescription:
      'सीढ़ियों की तरह 1, 2, 3... n ब्लॉकों का त्रिभुज बनाएँ। वैसा ही एक उल्टा त्रिभुज इसके साथ चिपका दें, तो n पंक्तियों और (n+1) स्तंभों का एक संपूर्ण आयत n(n+1) बन जाता है!',
    steps: [
      {
        stepNumber: 1,
        title: 'योग को S मानें और दो बार लिखें',
        explanation: 'योग S को एक बार सीधे क्रम में और एक बार उल्टे क्रम में लिखें।',
        mathExpression: 'S = 1 + 2 + 3 + ... + n\nS = n + (n-1) + ... + 1',
      },
      {
        stepNumber: 2,
        title: 'दोनों समीकरणों को लंबवत जोड़ें',
        explanation: 'प्रत्येक संगत पद का योग (1 + n), (2 + n-1 = n+1), (3 + n-2 = n+1) ठीक (n+1) आता है।',
        mathExpression: '2S = (n + 1) + (n + 1) + ... + (n + 1)  [कुल n बार]',
      },
      {
        stepNumber: 3,
        title: 'दाएँ पक्ष का कुल मान लिखें',
        explanation: 'चूँकि (n+1) कुल n बार आया है, इसलिए इसका गुणन n × (n + 1) होगा।',
        mathExpression: '2S = n(n + 1)',
      },
      {
        stepNumber: 4,
        title: '2 से भाग दें',
        explanation: 'दोनों तरफ 2 से भाग देने पर योग S का सटीक सूत्र प्राप्त होता है।',
        mathExpression: 'S = n(n + 1) / 2  (सिद्ध हुआ! 🌟)',
      },
    ],
    whyItNeverFails:
      'क्योंकि संख्याओं का क्रम उलटने पर भी प्रत्येक युग्म का योग हमेशा (n+1) ही रहता है, जो सममिति (Symmetry) का अटूट नियम है।',
    realLifeExamples: [
      'टूर्नामेंट में मैच: यदि 8 टीमें हैं और हर टीम एक दूसरे से खेले, तो कुल मैच = 7 + 6 + ... + 1 = (7 × 8) / 2 = 28 मैच होंगे।',
      'हाथ मिलाना (Handshakes): एक पार्टी में 10 लोग एक-दूसरे से हाथ मिलाते हैं, तो कुल हाथ = (9 × 10) / 2 = 45 बार मिलेंगे।',
    ],
    interactiveCheck: {
      variableValues: { n: 10 },
      lhsFormula: '1 + 2 + ... + 10 = 55',
      rhsFormula: '10 × (10 + 1) / 2 = (10 × 11) / 2 = 55',
    },
  },
  {
    id: 'proof-trig-sin-cos-sq',
    name: 'त्रिकोणमितीय सर्वसमिका: sin²θ + cos²θ = 1',
    formula: 'sin²θ + cos²θ = 1',
    category: 'त्रिकोणमिति (Trigonometry)',
    icon: '📐',
    summary: 'किसी भी कोण θ के लिए sin²θ और cos²θ का योग हमेशा ठीक 1 होता है।',
    originStory:
      'यह कोई नया रहस्य नहीं है, बल्कि पाइथागोरस प्रमेय (लंब² + आधार² = कर्ण²) को कर्ण² से भाग देने पर बनने वाला जादुई रूप है!',
    visualDescription:
      'इकाई त्रिज्या (r = 1) वाले वृत्त में किसी भी समकोण त्रिभुज का लंब = sin θ और आधार = cos θ होता है। पाइथागोरस प्रमेय से (आधार)² + (लंब)² = (कर्ण)² = 1² = 1!',
    steps: [
      {
        stepNumber: 1,
        title: 'समकोण त्रिभुज और परिभाषाएँ लें',
        explanation: 'कोण θ के लिए: sin θ = लंब (P) / कर्ण (H),  cos θ = आधार (B) / कर्ण (H)।',
        mathExpression: 'sin θ = P / H,   cos θ = B / H',
      },
      {
        stepNumber: 2,
        title: 'दोनों का वर्ग करके जोड़ें (LHS)',
        explanation: 'sin²θ + cos²θ = (P/H)² + (B/H)² = P²/H² + B²/H²।',
        mathExpression: 'LHS = (P² + B²) / H²',
      },
      {
        stepNumber: 3,
        title: 'पाइथागोरस प्रमेय लागू करें',
        explanation: 'समकोण त्रिभुज में लंब² + आधार² (P² + B²) हमेशा कर्ण² (H²) के बराबर होता है।',
        mathExpression: 'चूँकि P² + B² = H²',
      },
      {
        stepNumber: 4,
        title: 'मान रखें और काटें',
        explanation: 'अंश में H² रखने पर H² / H² = 1 प्राप्त होता है।',
        mathExpression: '= H² / H² = 1  (इति सिद्धम्! 🎉)',
      },
    ],
    whyItNeverFails:
      'क्योंकि यह ज्यामिति के मूल स्तंभ पाइथागोरस नियम से सीधे व्युत्पन्न है, और इकाई वृत्त की त्रिज्या हमेशा 1 ही रहती है।',
    realLifeExamples: [
      'GPS और सैटेलाइट नेविगेशन: दिशा और दूरी का समन्वय करने के लिए कोणों का यह संतुलन पृथ्वी के सटीक निर्देशांक बताता है।',
      'कंप्यूटर ग्राफिक्स और 3D गेम्स: पात्रों को घुमाने (Rotation) में यह सुनिश्चित करता है कि वस्तु का आकार विकृत न हो।',
    ],
    interactiveCheck: {
      variableValues: { angleDeg: 30 },
      lhsFormula: 'sin 30° = 1/2 => (1/2)² = 1/4; cos 30° = √3/2 => 3/4',
      rhsFormula: '1/4 + 3/4 = 4/4 = 1 (LHS = RHS)',
    },
  },
];

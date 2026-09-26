import { RealWorldProject } from '../types/math';

export const REAL_WORLD_PROJECTS: Record<string, RealWorldProject> = {
  trigonometry: {
    id: 'proj-rocket',
    topicId: 'trigonometry',
    title: 'मॉडल रॉकेट की चोटी की ऊँचाई नापना (Model Rocket Altitude Tracker)',
    subtitle: 'इसरो (ISRO) या नासा (NASA) की तरह जमीन से रॉकेट की अधिकतम ऊँचाई (Apogee) का हिसाब लगाओ!',
    categoryTag: '🚀 एयरोस्पेस इंजीनियरिंग (Aerospace)',
    icon: '🚀',
    objective: 'जब स्कूल साइंस फेयर में तुम्हारा पानी का रॉकेट या मॉडल रॉकेट उड़ता है, तो त्रिकोणमिति से पता लगाओ कि वह जमीन से कितने मीटर ऊपर गया।',
    projectScenario: 'एक छात्र प्रक्षेपण स्थल (Launch Pad) से सुरक्षित दूरी 50 मीटर पर एक हाथ से बने इनक्लिनोमीटर (कोण मापक) के साथ खड़ा है। जैसे ही रॉकेट अपने सबसे ऊँचे बिंदु (Apogee) पर पहुँचता है, कोण मापा जाता है।',
    howMathIsUsed: [
      {
        step: '1. बेसलाइन दूरी नापना (Baseline Distance)',
        description: 'सुरक्षा घेरे से लॉन्च पैड की जमीन पर सीधी दूरी = 50 मीटर (आधार / Adjacent)।',
        formula: 'दूरी (d) = 50m'
      },
      {
        step: '2. शीर्ष कोण रिकॉर्ड करना (Inclinometer Angle)',
        description: 'स्ट्रॉ और चांदे (Protractor) से बने उपकरण से कोण नापा गया (θ)। मान लीजिए θ = 55°।',
        formula: 'कोण (θ) = 55°'
      },
      {
        step: '3. रॉकेट की ऊँचाई का सूत्र (Height Formula)',
        description: 'समकोण त्रिभुज के नियम से लम्ब = आधार × tan(θ), साथ ही छात्र की आँखों की ऊँचाई (Eye level 1.4m) जोड़ी जाती है।',
        formula: 'कुल ऊँचाई = (50 × tan θ) + 1.4m'
      }
    ],
    interactiveTool: 'rocket',
    badgeReward: 'रॉकेट वैज्ञानिक (Rocket Scientist 🚀)',
    xpReward: 80
  },
  percentage: {
    id: 'proj-budget',
    topicId: 'percentage',
    title: 'स्मार्ट स्कूल फेस्ट व पॉकेट मनी बजट डिज़ाइनर (Budget & Financial Planner)',
    subtitle: '50-30-20 के वित्तीय नियम से स्कूल फेयर का स्टॉल या महीने का पॉकेट मनी बजट प्लान करो!',
    categoryTag: '💰 वित्तीय साक्षरता (Financial Literacy)',
    icon: '📊',
    objective: 'स्कूल फेस्ट में स्टॉल लगाने के लिए ₹2000 का बजट मिला है। सामग्री, सजावट और आपातकालीन फंड का प्रतिशत सही से बाँटो ताकि नुकसान न हो और मुनाफा हो!',
    projectScenario: 'तुम्हारा क्लब स्कूल में एक लेमोनेड और क्राफ्ट स्टॉल लगा रहा है। अगर 50% कच्चा माल (नींबू/चीनी), 30% कप व सजावट, और 20% आपातकालीन बचत में रखना है, तो हर श्रेणी में कितने रुपये खर्च होंगे?',
    howMathIsUsed: [
      {
        step: '1. कुल बजट आवंटन (Budget Allocation)',
        description: 'कुल राशि ₹2000 को 50-30-20 प्रतिशत में विभाजित करना।',
        formula: 'सामग्री = 50% of ₹2000 = ₹1000'
      },
      {
        step: '2. लाभ मार्जिन तय करना (Profit Margin Calculation)',
        description: 'यदि प्रत्येक गिलास शरबत ₹20 में बिकता है और लागत ₹12 है, तो लाभ प्रतिशत = (8 ÷ 12) × 100 = 66.6%।',
        formula: 'लाभ % = (लाभ / लागत) × 100'
      },
      {
        step: '3. बचत और आपातकालीन बफर (Reserve Savings)',
        description: '20% का सुरक्षित बफर रखना ताकि अप्रत्याशित खर्च में भी क्लब घाटे में न जाए।',
        formula: 'बचत = 20% of ₹2000 = ₹400'
      }
    ],
    interactiveTool: 'budget',
    badgeReward: 'मास्टर बजट प्लानर (Financial Genius 💼)',
    xpReward: 80
  },
  geometry: {
    id: 'proj-solar',
    topicId: 'geometry',
    title: 'छत पर सोलर पैनल की दक्षता व क्षेत्रफल (Solar Panel Rooftop Efficiency)',
    subtitle: 'अपने घर की छत के क्षेत्रफल से पता करो कि कितने सोलर पैनल लगेंगे और कितनी बिजली बनेगी!',
    categoryTag: '☀️ हरित ऊर्जा एवं पर्यावरण (Green Energy)',
    icon: '☀️',
    objective: 'एक घर की छत का क्षेत्रफल 30 वर्ग मीटर है। एक मानक सोलर पैनल 2 वर्ग मीटर का होता है और प्रतिदिन 1.5 यूनिट (kWh) बिजली बनाता है। छत पर कितने पैनल लग सकते हैं और बिजली का कितना बिल बचेगा?',
    projectScenario: 'रोहन के परिवार को सौर ऊर्जा लगवानी है। छत के खाली क्षेत्रफल की माप, पैनलों की संख्या और प्रतिदिन उत्पादित ऊर्जा का सटीक गणितीय मूल्यांकन करना है।',
    howMathIsUsed: [
      {
        step: '1. छत का उपयोगी क्षेत्रफल (Usable Area)',
        description: 'छत की लंबाई 6m और चौड़ाई 5m है। कुल क्षेत्रफल = 6 × 5 = 30 m²। 20% जगह चलने-फिरने के लिए छोड़नी होगी।',
        formula: 'उपयोगी क्षेत्र = 30 - 20% = 24 m²'
      },
      {
        step: '2. पैनलों की अधिकतम संख्या (Number of Solar Panels)',
        description: '1 पैनल का क्षेत्रफल = 2 m²। अतः पैनलों की संख्या = 24 ÷ 2 = 12 पैनल।',
        formula: 'पैनल = उपयोगी क्षेत्र ÷ 1 पैनल का आकार'
      },
      {
        step: '3. दैनिक ऊर्जा उत्पादन (Daily Solar Power Generated)',
        description: '12 पैनल × 1.5 यूनिट = 18 यूनिट (kWh) स्वच्छ बिजली प्रतिदिन! महीने में लगभग ₹3000+ की सीधी बचत।',
        formula: 'कुल बिजली = पैनल संख्या × 1.5 kWh'
      }
    ],
    interactiveTool: 'solar',
    badgeReward: 'सोलर इंजीनियर (Solar Architect ☀️)',
    xpReward: 80
  },
  ratio: {
    id: 'proj-garden',
    topicId: 'ratio',
    title: 'ऑर्गेनिक किचन गार्डन: मिट्टी और खाद का वैज्ञानिक अनुपात (Garden Soil Mixing)',
    subtitle: 'पौधों के तेजी से विकास के लिए मिट्टी, कोकोपीट और केंचुआ खाद (Vermicompost) का 3:2:1 अनुपात!',
    categoryTag: '🌱 कृषि विज्ञान (Agri-Science)',
    icon: '🌱',
    objective: 'घर की बालकनी में 6 गमले लगाने हैं। कुल 36 किलोग्राम पॉटिंग मिक्स चाहिए। 3:2:1 के अनुपात में मिट्टी, कोकोपीट और खाद कितनी-कितनी मात्रा में लानी होगी?',
    projectScenario: 'यदि अनुपात बिगड़ जाए (जैसे खाद ज्यादा हो जाए तो जड़ें जल सकती हैं, और कोकोपीट कम हो तो नमी नहीं रुकेगी)। अनुपात का नियम सटीक पौधे उगाने में मदद करता है।',
    howMathIsUsed: [
      {
        step: '1. कुल अनुपातिक भाग (Total Ratio Parts)',
        description: 'अनुपात 3 (मिट्टी) : 2 (कोकोपीट) : 1 (वर्मीकम्पोस्ट)। कुल भाग = 3 + 2 + 1 = 6 भाग।',
        formula: 'कुल भाग = 6'
      },
      {
        step: '2. एक भाग का मान (Value of 1 Part)',
        description: 'कुल 36 किलोग्राम मिट्टी चाहिए। 1 भाग का वजन = 36 ÷ 6 = 6 किलोग्राम।',
        formula: '1 भाग = 36 ÷ 6 = 6 kg'
      },
      {
        step: '3. प्रत्येक घटक का वजन (Individual Quantities)',
        description: 'मिट्टी = 3 × 6 = 18 kg, कोकोपीट = 2 × 6 = 12 kg, वर्मीकम्पोस्ट = 1 × 6 = 6 kg।',
        formula: '18kg + 12kg + 6kg = 36kg'
      }
    ],
    interactiveTool: 'garden',
    badgeReward: 'इको बॉटनिस्ट (Eco Botanist 🌿)',
    xpReward: 80
  },
  speed: {
    id: 'proj-trip',
    topicId: 'speed',
    title: 'पारिवारिक रोड ट्रिप और चार्जिंग स्टॉप प्लानर (Family EV Road Trip)',
    subtitle: 'इलेक्ट्रिक कार से 300 किमी के सफर में स्पीड, रेंज, चार्जिंग समय और टोल का मास्टर प्लान!',
    categoryTag: '🚗 आधुनिक परिवहन (Smart Mobility)',
    icon: '🚗',
    objective: 'परिवार के साथ 300 किमी दूर पिकनिक जा रहे हैं। औसत गति 60 किमी/घंटा है और कार की बैटरी 200 किमी पर चार्ज मांगती है। कुल यात्रा समय और सही चार्जिंग स्टॉप का गणितीय निर्धारण करें।',
    projectScenario: 'सड़क यात्रा में गति, समय और बैटरी रेंज का सही तालमेल न हो तो रास्ते में गाड़ी बंद हो सकती है। गणित से तय करें कि कहाँ रुकना है और कितने बजे पहुँचेंगे।',
    howMathIsUsed: [
      {
        step: '1. वास्तविक ड्राइविंग समय (Driving Time)',
        description: 'समय = दूरी ÷ गति = 300 किमी ÷ 60 किमी/घंटा = 5 घंटे ड्राइविंग।',
        formula: 'समय = 300 ÷ 60 = 5 घंटे'
      },
      {
        step: '2. चार्जिंग स्टॉप का चयन (Charging Stop Timing)',
        description: '200 किमी पर 45 मिनट का फास्ट चार्ज स्टॉप जरूरी है। यह स्टॉप यात्रा के 3 घंटे 20 मिनट बाद आएगा।',
        formula: 'स्टॉप दूरी = 180-200 km'
      },
      {
        step: '3. कुल यात्रा समय (Total Journey Duration)',
        description: '5 घंटे ड्राइविंग + 45 मिनट चार्जिंग व नाश्ता = कुल 5 घंटे 45 मिनट।',
        formula: 'कुल समय = 5h 45m'
      }
    ],
    interactiveTool: 'trip',
    badgeReward: 'नेविगेशन कमांडर (Trip Navigator 🧭)',
    xpReward: 80
  },
  numbers: {
    id: 'proj-banking-ledger',
    topicId: 'numbers',
    title: 'डिजिटल खाता और मौसम विज्ञान वेधशाला (Bank Ledger & Weather Station)',
    subtitle: 'धनात्मक (+) और ऋणात्मक (-) पूर्णांकों से दैनिक नकद बहीखाता और तापमान परिवर्तन का हिसाब!',
    categoryTag: '🏦 वित्तीय लेखांकन व मौसम (Accounting)',
    icon: '🔢',
    objective: 'एक किराना स्टोर के दैनिक बैंक बैलेंस और सियाचिन/शिमला में शून्य से नीचे जाने वाले तापमान का सटीक गणितीय संतुलन बनाए रखना।',
    projectScenario: 'दुकानदार के पास सुबह ₹1500 थे। दिनभर में ग्राहकों से ₹850 जमा हुए और थोक व्यापारी को ₹600 का भुगतान किया। दिन के अंत में शुद्ध नकदी (Net Balance) निकालना है।',
    howMathIsUsed: [
      {
        step: '1. जमा और निकासी का अंकन (Credits & Debits)',
        description: 'जमा राशि को धनात्मक पूर्णांक (+850) और भुगतान को ऋणात्मक पूर्णांक (-600) के रूप में लिखें।',
        formula: 'बैलेंस = 1500 + (+850) + (-600)'
      },
      {
        step: '2. पूर्णांकों का संकलन (Sum of Integers)',
        description: 'समान चिह्न वालों को पहले जोड़ें और फिर अंतर निकालें।',
        formula: '1500 + 850 = 2350, 2350 - 600 = ₹1750'
      },
      {
        step: '3. तापमान की गिरावट और वृद्धि (Temperature Swings)',
        description: 'यदि सियाचिन का तापमान सुबह -5°C था और दोपहर में 7°C बढ़ गया, तो अंतिम तापमान = -5 + 7 = +2°C।',
        formula: 'अंतिम तापमान = -5 + 7 = 2°C'
      }
    ],
    interactiveTool: 'number',
    badgeReward: 'पूर्णांक ऑडिटर (Ledger Master ⚖️)',
    xpReward: 80
  },
  square: {
    id: 'proj-floor-tiles',
    topicId: 'square',
    title: 'आर्किटेक्चरल फ्लोर टाइलिंग व पाइथागोरस सुरक्षा सीढ़ी (Floor Tiling & Ladder Safety)',
    subtitle: 'कमरे के वर्गाकार क्षेत्रफल (Side²) और दीवार पर सुरक्षित कोण की सीढ़ी (c = √(a² + b²)) का मास्टर प्लान!',
    categoryTag: '🏗️ सिविल कंस्ट्रक्शन व डिजाइन (Architecture)',
    icon: '🟧',
    objective: 'एक 5m × 5m के कमरे में टाइल्स की संख्या और कुल लागत निकालना, साथ ही 4m ऊँची छत तक पहुँचने के लिए आवश्यक सुरक्षा सीढ़ी की माप करना।',
    projectScenario: 'घर के नवीनीकरण में फर्श पर 1m × 1m की चौकोर टाइल्स लगानी हैं। इसके अलावा 4m ऊँची दीवार से 3m दूरी पर सीढ़ी लगानी है। पाइथागोरस प्रमेय से सीढ़ी की सही लंबाई पता करनी है।',
    howMathIsUsed: [
      {
        step: '1. कमरे का वर्गाकार क्षेत्रफल (Area of Square)',
        description: 'भुजा 5 मीटर है, तो क्षेत्रफल = 5² = 5 × 5 = 25 वर्ग मीटर। कुल 25 टाइल्स चाहिए।',
        formula: 'क्षेत्रफल = 5² = 25 m²'
      },
      {
        step: '2. कुल लागत की गणना (Cost Estimation)',
        description: 'यदि 1 टाइल का खर्च ₹45 है, तो 25 टाइल्स का खर्च = 25 × 45 = ₹1125।',
        formula: 'लागत = 25 × 45 = ₹1125'
      },
      {
        step: '3. पाइथागोरस सुरक्षा सीढ़ी (Pythagorean Hypotenuse)',
        description: 'दीवार (4m) और जमीन की दूरी (3m)। सीढ़ी² = 4² + 3² = 16 + 9 = 25। सीढ़ी = √25 = 5 मीटर।',
        formula: 'c = √(4² + 3²) = √25 = 5m'
      }
    ],
    interactiveTool: 'square',
    badgeReward: 'मास्टर आर्किटेक्ट (Master Builder 🏛️)',
    xpReward: 80
  },
  algebra: {
    id: 'proj-auto-meter',
    topicId: 'algebra',
    title: 'स्मार्ट सिटी ऑटो-रिक्शा मीटर और चेस रन-रेट (Fare Meter & Cricket Target)',
    subtitle: 'दैनिक यात्रा का किराया सूत्र: Fare = Base + Rate × (Distance - 1.5) का बीजगणितीय समाधान!',
    categoryTag: '🚕 स्मार्ट मोबिलिटी व स्पोर्ट्स एनालिटिक्स (Analytics)',
    icon: '⚖️',
    objective: 'समीकरणों की मदद से अज्ञात राशि (x) का मान निकालना, जैसे ऑटो किराया या क्रिकेट मैच में जीत के लिए आवश्यक ओवर गति।',
    projectScenario: 'दिल्ली या मुंबई में ऑटो का बेस किराया ₹30 है (पहले 1.5 किमी के लिए) और उसके बाद ₹14 प्रति किमी। यदि यात्री के पास ₹142 हैं, तो वह कितनी दूर जा सकता है?',
    howMathIsUsed: [
      {
        step: '1. समीकरण बनाना (Equation Formulation)',
        description: 'किराया = 30 + 14 × (d - 1.5)। मान लेते हैं कुल किराया = ₹142।',
        formula: '30 + 14(d - 1.5) = 142'
      },
      {
        step: '2. समीकरण को संतुलित करना (Solving for d)',
        description: 'दोनों तरफ से 30 घटाएँ: 14(d - 1.5) = 112। फिर 14 से भाग दें: d - 1.5 = 8।',
        formula: 'd - 1.5 = 8 → d = 9.5 km'
      },
      {
        step: '3. वास्तविक परिणाम (Real-World Conclusion)',
        description: 'यात्री ठीक 9.5 किलोमीटर तक सफर कर सकता है!',
        formula: 'अधिकतम यात्रा = 9.5 किमी'
      }
    ],
    interactiveTool: 'algebra',
    badgeReward: 'बीजगणित जासूस (Algebra Sleuth 🔍)',
    xpReward: 80
  },
  profitloss: {
    id: 'proj-diwali-mela',
    topicId: 'profitloss',
    title: 'दीवाली मेला उद्यमिता एवं हस्तशिल्प स्टॉल (Diwali Mela Business Model)',
    subtitle: 'मिट्टी के दीये और मोमबत्तियाँ थोक में खरीदकर खुदरा बेचें और लाभ प्रतिशत का विश्लेषण करें!',
    categoryTag: '🪔 व्यापार एवं उद्यमिता (Startup & Retail)',
    icon: '🏪',
    objective: 'हस्तशिल्प मेले में ₹800 के दीये खरीदकर ₹1400 में बेचकर 75% शुद्ध लाभ अर्जित करना।',
    projectScenario: 'स्कूल क्लब ने कुम्हार से 200 दीये ₹4 प्रति दीये के थोक भाव से खरीदे (CP = ₹800)। स्टॉल पर उन्हें सजाकर ₹7 प्रति दीया बेचा गया। कुल लाभ और लाभ प्रतिशत ज्ञात करें।',
    howMathIsUsed: [
      {
        step: '1. कुल क्रय मूल्य निकालना (Total Cost Price)',
        description: '200 दीये × ₹4 = ₹800 कुल लागत (Cost Price)।',
        formula: 'CP = 200 × 4 = ₹800'
      },
      {
        step: '2. कुल विक्रय मूल्य निकालना (Total Selling Price)',
        description: '200 दीये × ₹7 = ₹1400 कुल बिक्री (Selling Price)।',
        formula: 'SP = 200 × 7 = ₹1400'
      },
      {
        step: '3. लाभ प्रतिशत का सूत्र (Profit % Formula)',
        description: 'लाभ = 1400 - 800 = ₹600। लाभ % = (600 ÷ 800) × 100 = 75% का बंपर मुनाफा!',
        formula: 'Profit % = (600 / 800) × 100 = 75%'
      }
    ],
    interactiveTool: 'profit',
    badgeReward: 'यंग आंत्रप्रेन्योर (Young Entrepreneur 💼)',
    xpReward: 80
  },
  cube: {
    id: 'proj-water-tank',
    topicId: 'cube',
    title: 'घनाकार पानी की टंकी एवं रूबीक्स क्यूब वॉल्यूम (Rooftop Water Tank Capacity)',
    subtitle: 'भुजा³ से पता करें कि छत की टंकी में कितने हजार लीटर पानी स्टोर हो सकता है!',
    categoryTag: '💧 जल संरक्षण व सिविल इंजीनियरिंग (Water Engineering)',
    icon: '🧊',
    objective: 'एक 1.2m भुजा वाली घनाकार पानी की टंकी का आयतन और लीटर में पानी की भंडारण क्षमता निकालना।',
    projectScenario: 'सोसायटी की छत पर 1.2 मीटर भुजा की घनाकार पानी की टंकी रखी है। 1 घन मीटर (1 m³) में 1,000 लीटर पानी आता है। टंकी की कुल क्षमता का हिसाब लगाना है।',
    howMathIsUsed: [
      {
        step: '1. घन का आयतन (Volume of Cube)',
        description: 'भुजा 1.2m है, आयतन = 1.2³ = 1.2 × 1.2 × 1.2 = 1.728 घन मीटर (m³)।',
        formula: 'Volume = 1.2³ = 1.728 m³'
      },
      {
        step: '2. लीटर में परिवर्तन (Metric Conversion)',
        description: '1 घन मीटर = 1,000 लीटर पानी। अतः 1.728 × 1000 = 1,728 लीटर पानी।',
        formula: 'लीटर = 1.728 × 1000 = 1,728 L'
      },
      {
        step: '3. परिवार की खपत (Family Water Planning)',
        description: 'यदि 4 सदस्यों का परिवार प्रतिदिन 500 लीटर पानी खर्च करता है, तो यह टंकी 3.5 दिन चलेगी!',
        formula: 'दिन = 1728 ÷ 500 ≈ 3.5 दिन'
      }
    ],
    interactiveTool: 'cube',
    badgeReward: 'हाइड्रो इंजीनियर (Water Master 🌊)',
    xpReward: 80
  }
};

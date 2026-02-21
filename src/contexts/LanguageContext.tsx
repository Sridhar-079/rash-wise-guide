import { createContext, useContext, useState, ReactNode } from "react";

export const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "日本語" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "bn", label: "বাংলা" },
  { code: "ko", label: "한국어" },
  { code: "ru", label: "Русский" },
] as const;

export type LangCode = (typeof languages)[number]["code"];

const translations: Record<LangCode, Record<string, string>> = {
  en: {
    home: "Home",
    scan: "Scan",
    skinHealth: "Skin Health",
    consult: "Consult Doctor",
    startScan: "Start Scan",
    hero_title: "Your AI Skin Health Companion",
    hero_desc: "Scan skin spots in seconds. Get an instant risk assessment with clear guidance on next steps — all from your phone.",
    learnMore: "Learn More",
    howItWorks: "How It Works",
    capture: "Capture",
    capture_desc: "Take a photo or upload an image of the skin area you want to check.",
    analyze: "Analyze",
    analyze_desc: "Our AI analyzes the image and evaluates potential risk factors.",
    results: "Results",
    results_desc: "Get a clear risk score with an explanation and personalized next steps.",
    medicalDisclaimer: "Medical Disclaimer",
    disclaimer_text: "SkinGuard AI is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified dermatologist for any skin concerns. This tool provides an educational risk assessment only.",
    scanTitle: "Scan Your Skin",
    scanDesc: "Take a photo or upload an image of the skin area you'd like to check.",
    useCamera: "Use Camera",
    uploadPhoto: "Upload Photo",
    analyzeSkin: "Analyze Skin",
    analyzing: "Analyzing...",
    noImage: "No image selected",
    goodLighting: "Good lighting — avoid shadows",
    closeUp: "Close-up of the area",
    clearFocus: "Clear focus, steady hand",
    yourResults: "Your Results",
    backToScan: "Back to Scan",
    whatWeFound: "What We Found",
    nextSteps: "Next Steps",
    skinCareTips: "Skin Care Tips",
    scanAgain: "Scan Again",
    consultDoctor: "Consult a Doctor",
    consultTitle: "Doctor Video Consultation",
    consultDesc: "Connect with a dermatologist for a live video consultation about your skin concerns.",
    startCall: "Start Video Call",
    endCall: "End Call",
    waitingRoom: "You're in the waiting room. A doctor will join shortly.",
    skinHealthHub: "Skin Health Hub",
    skinHealthHubDesc: "Learn how to protect your skin and spot warning signs early.",
    step: "Step",
  },
  hi: {
    home: "होम", scan: "स्कैन", skinHealth: "त्वचा स्वास्थ्य", consult: "डॉक्टर से सलाह",
    startScan: "स्कैन शुरू करें", hero_title: "आपका AI त्वचा स्वास्थ्य साथी",
    hero_desc: "सेकंडों में त्वचा के धब्बों को स्कैन करें।", learnMore: "और जानें",
    howItWorks: "यह कैसे काम करता है", consultDoctor: "डॉक्टर से सलाह लें",
    consultTitle: "डॉक्टर वीडियो परामर्श", startCall: "वीडियो कॉल शुरू करें",
    endCall: "कॉल समाप्त", analyzeSkin: "त्वचा विश्लेषण", scanTitle: "अपनी त्वचा स्कैन करें",
    yourResults: "आपके परिणाम", whatWeFound: "हमने क्या पाया", nextSteps: "अगले कदम",
    skinCareTips: "त्वचा देखभाल सुझाव", scanAgain: "फिर से स्कैन करें",
    capture: "कैप्चर", analyze: "विश्लेषण", results: "परिणाम", step: "चरण",
  },
  es: {
    home: "Inicio", scan: "Escanear", skinHealth: "Salud de la Piel", consult: "Consultar Doctor",
    startScan: "Iniciar Escaneo", hero_title: "Tu Compañero de Salud de la Piel con IA",
    hero_desc: "Escanea manchas de piel en segundos.", learnMore: "Saber Más",
    howItWorks: "Cómo Funciona", consultDoctor: "Consultar un Doctor",
    consultTitle: "Consulta por Video", startCall: "Iniciar Videollamada",
    endCall: "Finalizar Llamada", analyzeSkin: "Analizar Piel", scanTitle: "Escanea tu Piel",
    yourResults: "Tus Resultados", whatWeFound: "Lo que Encontramos", nextSteps: "Próximos Pasos",
    skinCareTips: "Consejos para la Piel", scanAgain: "Escanear de Nuevo",
    capture: "Capturar", analyze: "Analizar", results: "Resultados", step: "Paso",
  },
  fr: {
    home: "Accueil", scan: "Scanner", skinHealth: "Santé de la Peau", consult: "Consulter",
    startScan: "Démarrer le Scan", hero_title: "Votre Compagnon IA de Santé de la Peau",
    consultDoctor: "Consulter un Médecin", consultTitle: "Consultation Vidéo",
    startCall: "Démarrer l'Appel", endCall: "Terminer l'Appel",
    analyzeSkin: "Analyser la Peau", scanTitle: "Scannez votre Peau",
    yourResults: "Vos Résultats", capture: "Capturer", analyze: "Analyser", results: "Résultats", step: "Étape",
  },
  ar: { home: "الرئيسية", scan: "مسح", skinHealth: "صحة الجلد", consult: "استشارة طبيب", startScan: "ابدأ المسح", consultDoctor: "استشر طبيباً", startCall: "بدء المكالمة", endCall: "إنهاء المكالمة", step: "خطوة" },
  zh: { home: "首页", scan: "扫描", skinHealth: "皮肤健康", consult: "咨询医生", startScan: "开始扫描", consultDoctor: "咨询医生", startCall: "开始视频通话", endCall: "结束通话", step: "步骤" },
  pt: { home: "Início", scan: "Escanear", skinHealth: "Saúde da Pele", consult: "Consultar Médico", startScan: "Iniciar Escaneamento", consultDoctor: "Consultar um Médico", startCall: "Iniciar Chamada", endCall: "Encerrar Chamada", step: "Passo" },
  de: { home: "Startseite", scan: "Scannen", skinHealth: "Hautgesundheit", consult: "Arzt konsultieren", startScan: "Scan Starten", consultDoctor: "Arzt Konsultieren", startCall: "Videoanruf Starten", endCall: "Anruf Beenden", step: "Schritt" },
  ja: { home: "ホーム", scan: "スキャン", skinHealth: "肌の健康", consult: "医師に相談", startScan: "スキャン開始", consultDoctor: "医師に相談する", startCall: "ビデオ通話を開始", endCall: "通話終了", step: "ステップ" },
  ta: { home: "முகப்பு", scan: "ஸ்கேன்", skinHealth: "சரும ஆரோக்கியம்", consult: "மருத்துவரை ஆலோசிக்கவும்", startScan: "ஸ்கேன் தொடங்கு", consultDoctor: "மருத்துவரை அணுகவும்", startCall: "வீடியோ அழைப்பு", endCall: "அழைப்பை முடி", step: "படி" },
  te: { home: "హోమ్", scan: "స్కాన్", skinHealth: "చర్మ ఆరోగ్యం", consult: "వైద్యుడిని సంప్రదించండి", startScan: "స్కాన్ ప్రారంభించండి", consultDoctor: "వైద్యుడిని సంప్రదించండి", startCall: "వీడియో కాల్ ప్రారంభించండి", endCall: "కాల్ ముగించు", step: "దశ" },
  bn: { home: "হোম", scan: "স্ক্যান", skinHealth: "ত্বকের স্বাস্থ্য", consult: "ডাক্তারের সাথে পরামর্শ", startScan: "স্ক্যান শুরু করুন", consultDoctor: "ডাক্তারের সাথে পরামর্শ করুন", startCall: "ভিডিও কল শুরু করুন", endCall: "কল শেষ", step: "ধাপ" },
  ko: { home: "홈", scan: "스캔", skinHealth: "피부 건강", consult: "의사 상담", startScan: "스캔 시작", consultDoctor: "의사 상담", startCall: "영상 통화 시작", endCall: "통화 종료", step: "단계" },
  ru: { home: "Главная", scan: "Сканировать", skinHealth: "Здоровье Кожи", consult: "Консультация Врача", startScan: "Начать Сканирование", consultDoctor: "Консультация Врача", startCall: "Начать Видеозвонок", endCall: "Завершить Звонок", step: "Шаг" },
};

interface LanguageContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LangCode>("en");

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

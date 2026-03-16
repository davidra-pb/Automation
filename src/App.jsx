import React, { useState, useEffect } from 'react';
import {
  Activity, Target, Lock, ChevronLeft, ChevronRight,
  ShieldCheck, AlertCircle, Printer, X,
  Globe, Users, Clock, Briefcase, Scale, CreditCard, FileSpreadsheet
} from 'lucide-react';

// --- CONFIG ---
const APP_VERSION = "v.2.1 (BIA Edition - Board Updated)";

// --- COMPONENTS ---

// Login Screen
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Pb@2026') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-100 font-sans p-4" dir="rtl">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md text-center border border-slate-200">
        <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-sky-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">מצגת דירקטוריון - חסויה</h2>
        <p className="text-slate-500 mb-8 text-base">אנא הזן סיסמת צפייה כדי להמשיך</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="סיסמה..."
              className={`w-full px-5 py-3 text-lg border rounded-xl text-right focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all text-slate-700 placeholder-slate-400 ${error ? 'border-red-300 ring-red-50' : 'border-slate-300'}`}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-right font-medium">סיסמה שגויה, נסה שוב</p>}
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 text-lg rounded-xl transition-all shadow-lg hover:shadow-sky-200 mt-2"
          >
            כניסה למצגת
          </button>
        </form>
        <div className="mt-6 text-slate-400 text-xs font-medium">
            PayBox BCP Operations • {APP_VERSION}
        </div>
      </div>
    </div>
  );
};

// --- SLIDE COMPONENTS ---

// 1. Title Slide
const TitleSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 bg-gradient-to-br from-slate-50 to-white">
      <div className="w-32 h-32 bg-sky-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sky-200 print:border print:border-slate-200">
        <ShieldCheck className="w-16 h-16 text-white" />
      </div>
      <div>
        <h1 className="text-6xl font-black text-slate-800 mb-4 tracking-tight">המשכיות עסקית (BCP) וניהול משברים</h1>
        <h2 className="text-3xl text-sky-600 font-normal">סיכום תהליך Business Impact Analysis (BIA)</h2>
      </div>
      <div className="mt-12 px-10 py-3 bg-white rounded-full text-sky-700 text-xl font-bold shadow-xl border border-sky-100 print:border-slate-300">
        דירקטוריון PayBox • אפריל 2026
      </div>
    </div>
);

// 2. Context
const ContextSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 overflow-hidden">
      <h2 className="text-4xl font-bold text-slate-800 mb-8 border-r-8 border-sky-500 pr-6">רקע ומטרות התהליך</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-grow max-h-[70vh]">
        <div className="bg-sky-50/60 p-8 rounded-[2rem] border border-sky-100 relative overflow-hidden flex flex-col justify-center print:border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm print:border print:border-slate-200">
               <Activity className="w-8 h-8 text-sky-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">כללי</h3>
          </div>
          <div className="space-y-4 text-slate-600 text-xl leading-relaxed">
            <p>
              <strong>PayBox</strong> נדרשת להבטיח זמינות ורציפות תפקודית גם בתרחישי הקיצון המחמירים ביותר.
            </p>
            <p>
              בחודשים האחרונים הובלנו סקר מקיף, חוצה-ארגון, למיפוי התפקידים והתהליכים הקריטיים בכלל מחלקות החברה. הסקר בחן את רציפות התפקוד הנדרשת בשעת חירום, בהתבסס על תרחישי הייחוס השונים.
            </p>
            <p>
              תהליך ה-BIA (ניתוח השפעות עסקיות) המוצג בפניכם הינו התוצר הישיר של עבודת עומק זו. התהליך ממפה את הפעילויות הקריטיות, קובע יעדי התאוששות (RTO) הנגזרים מהמחויבות המשפטית והשירותית ללקוחות, ומגבש פתרונות עוקפים לזמן משבר.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 relative flex flex-col justify-center print:border-slate-300">
          <div className="flex items-center gap-4 mb-6">
             <div className="bg-sky-100 p-4 rounded-2xl shadow-sm print:border print:border-sky-200">
                <Target className="w-8 h-8 text-sky-600" />
             </div>
            <h3 className="text-2xl font-bold text-slate-800">המיקודים שלנו בחירום</h3>
          </div>
          <ul className="space-y-6 text-slate-600 text-xl">
            <li className="flex items-start gap-4">
              <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0"></span>
              <span><strong>שירות הלקוחות בראש:</strong> הבטחת מתן מידע ושירות גם כשהאפליקציה אינה זמינה.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0"></span>
              <span><strong>הגנה על כספי לקוחות:</strong> יכולת משיכת כספים מיתרות קיימות ועמידה במחויבות משפטית.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0"></span>
              <span><strong>ניהול נזילות פיננסית:</strong> רציפות דיווח וניהול מול הבנקים ללא פגיעה בפעילות הליבה.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 text-slate-500 text-base font-medium flex items-center gap-2 bg-slate-50/80 px-4 py-2 rounded-xl border border-slate-200 w-fit print:border-slate-300 print:bg-white">
          <span className="text-sky-500 font-bold text-lg">*</span>
          PayBox איננה כפופה לנב״ת 355 (המשכיות עסקית) על פי הגדרה, אך כפופה להנחיות הקבוצתיות של דיסקונט.
      </div>
    </div>
);

// 3. RTO Definitions & Criticality
const RtoStrategySlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden">
        <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-indigo-400 pr-6">יעדי התאוששות וזמן (RTO)</h2>
            <p className="text-slate-500 text-2xl">דירוג התהליכים בארגון בהתאם לרגישותם ולהשפעה על הלקוח</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow max-h-[55vh]">
            {/* Critical */}
            <div className="bg-white border-2 border-rose-100 p-8 rounded-[2rem] shadow-lg flex flex-col print:border-rose-300 transform transition-transform hover:scale-105">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center"><AlertCircle className="w-8 h-8 text-rose-500" /></div>
                    <div className="bg-rose-500 text-white px-4 py-1.5 rounded-full font-bold shadow-sm text-lg">24 שעות (קריטי)</div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">פעילות שירות וליבה</h3>
                <p className="text-slate-500 text-lg mb-4 flex-grow">
                    תהליכים למתן מידע וביצוע פעולות דחופות ללקוחות (בערוצים חלופיים) כאשר האפליקציה אינה זמינה. כולל ניהול נזילות יומי ועבודה מרחוק.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-400 uppercase block mb-1">דוגמאות לתרחישים</span>
                    <span className="text-slate-700 font-medium text-base">קריסת תשתיות GCP, מתקפת סייבר, נפילת מערך מוקדים (Zendesk)</span>
                </div>
            </div>

            {/* High */}
            <div className="bg-white border-2 border-amber-100 p-8 rounded-[2rem] shadow-lg flex flex-col print:border-amber-300 transform transition-transform hover:scale-105">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center"><Briefcase className="w-8 h-8 text-amber-500" /></div>
                    <div className="bg-amber-500 text-white px-4 py-1.5 rounded-full font-bold shadow-sm text-lg">96 שעות (גבוה)</div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">משיכות ומחויבות משפטית</h3>
                <p className="text-slate-500 text-lg mb-4 flex-grow">
                    תהליכים הנגזרים ממחויבות משפטית של החברה ללקוחותיה, בדגש על הבטחת תהליכי משיכת כספים מיתרות קיימות.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-400 uppercase block mb-1">דוגמאות לתהליכים</span>
                    <span className="text-slate-700 font-medium text-base">תשלום ללקוחות (מס"ב).</span>
                </div>
            </div>

            {/* Medium */}
            <div className="bg-white border-2 border-emerald-100 p-8 rounded-[2rem] shadow-lg flex flex-col print:border-emerald-300 transform transition-transform hover:scale-105">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center"><Clock className="w-8 h-8 text-emerald-500" /></div>
                    <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-full font-bold shadow-sm text-lg">120 שעות (בינוני)</div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">תפעול והתחשבנות</h3>
                <p className="text-slate-500 text-lg mb-4 flex-grow">
                    תהליכים חשובים לתפקוד השוטף של החברה. השבתתם גורמת לפגיעה תפעולית מורגשת, אך אינה משביתה את פעילות הליבה והשירות הישיר.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-400 uppercase block mb-1">דוגמאות לתהליכים</span>
                    <span className="text-slate-700 font-medium text-base">הכנת דיווחים כספיים, מכירות חדשות, תשלומי ספקים.</span>
                </div>
            </div>
        </div>
    </div>
);

// 4. Manual Fallbacks & Scenarios
const ScenariosSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden">
        <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-sky-400 pr-6">פתרונות עוקפים (Workarounds) בעת חירום</h2>
            <p className="text-slate-500 text-xl">היערכות החברה למתן שירות ידני וחלופי כאשר תשתיות הליבה אינן זמינות</p>
        </div>

        <div className="grid grid-cols-2 gap-10 flex-grow max-h-[60vh]">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative flex flex-col h-full hover:shadow-lg transition-shadow print:border-slate-300">
                <div className="flex items-center gap-4 mb-5">
                    <div className="bg-sky-50 p-4 rounded-2xl"><Globe className="w-8 h-8 text-sky-500" /></div>
                    <h3 className="text-2xl font-bold text-slate-800">תשתיות טכנולוגיות ומידע</h3>
                </div>
                <ul className="space-y-5 text-slate-600 text-lg">
                    <li className="flex items-start gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2 shrink-0"></div>
                        <div><strong>השבתת ענן (GCP):</strong> הקמה מיידית של בסיס הנתונים (MongoDB) ב-Region חלופי, או התבססות על נתוני דוח מנכ"ל לעדכון רשומות ידני.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2 shrink-0"></div>
                        <div><strong>קריסת אפליקציה ואתר אינטרנט:</strong> העלאת אתר חלופי מהיר על גבי פלטפורמת Wix למתן עדכונים שוטפים לציבור הלקוחות.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2 shrink-0"></div>
                        <div><strong>עבודה מרחוק:</strong> מעבר לסביבת Cato-Networks לאנשי מפתח במקרה של קריסת מערכות הגישה (Prisma/Okta).</div>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative flex flex-col h-full hover:shadow-lg transition-shadow print:border-slate-300">
                <div className="flex items-center gap-4 mb-5">
                    <div className="bg-emerald-50 p-4 rounded-2xl"><Users className="w-8 h-8 text-emerald-500" /></div>
                    <h3 className="text-2xl font-bold text-slate-800">שירות לקוחות ומוקדים</h3>
                </div>
                <ul className="space-y-5 text-slate-600 text-lg">
                    <li className="flex items-start gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <div><strong>קריסת מערכת זנדסק (Zendesk):</strong> ניהול הפניות והטיפול בהן יבוצע באופן ידני באמצעות מסמך אקסל ייעודי הכולל תיעוד רטרואקטיבי או הסטת הפניות הכתובות למייל ייעודי עם תהליכי תור עבודה בין נציגים.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <div><strong>נפילת מרכזייה קולית (*9575):</strong> ניתוב אוטומטי של השיחות למספרי 076 באמצעות מערכת Cellact ותגבור נציגים.</div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <div><strong>ערוצים דיגיטליים:</strong> הסטת לקוחות באופן יזום לקבלת מענה דרך ערוצי מדיה חברתית ו-WhatsApp.</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

// 5. Finance Highlights
const FinanceSlide = () => (
    <div className="h-full flex flex-col justify-center px-16 animate-fadeIn overflow-hidden">
        <div className="mb-8 text-center shrink-0">
            <h2 className="text-4xl font-bold text-slate-800 mb-2 border-b-4 border-indigo-500 inline-block pb-2">פעילות פיננסית בחירום (Finance BCP)</h2>
            <p className="text-slate-500 text-2xl">הבטחת רציפות של תהליכי תשלומים, מסלקה ונזילות</p>
        </div>
        <div className="grid grid-cols-3 gap-8 flex-grow max-h-[50vh] min-h-0">

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full print:border-slate-300">
                <div className="flex items-center gap-4 mb-5 shrink-0">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors"><Scale className="w-7 h-7 text-indigo-600" /></div>
                    <h3 className="text-xl font-bold text-slate-800">ניהול נזילות (24 ש')</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">ניהול נזילות בחשבון הבנק לצרכי ביצוע תשלומים ללקוחות על בסיס הנתונים (MongoDB) ב-Region חלופי.</p>
                <div className="mt-auto bg-slate-50 p-4 rounded-xl">
                    <span className="font-bold text-indigo-600 text-sm">מענה בחירום:</span>
                    <p className="text-slate-700 font-medium">יבוצע באופן ידני לחלוטין באמצעות התחברות ישירה לאתר האינטרנט של בנק דיסקונט.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full print:border-slate-300">
                <div className="flex items-center gap-4 mb-5 shrink-0">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors"><CreditCard className="w-7 h-7 text-indigo-600" /></div>
                    <h3 className="text-xl font-bold text-slate-800">תשלומי לקוחות (96 ש')</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">בניית תהליך אלטרנטיבי של משיכת כספים מיתרות הלקוחות באפליקציה (לאחר זיהוי ואימות הלקוחות) ורישום זמני של הפעולה לטובת סנכרון עתידי של הנתונים.</p>
                <div className="mt-auto bg-slate-50 p-4 rounded-xl">
                    <span className="font-bold text-indigo-600 text-sm">מענה בחירום:</span>
                    <p className="text-slate-700 font-medium">אם הממשקים נופלים, התשלום יבוצע באמצעות ייצור קובץ מס״ב ידני ו/או ייצור קובץ אקסל חלופי במבנה המדויק הנדרש למס"ב.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full print:border-slate-300">
                <div className="flex items-center gap-4 mb-5 shrink-0">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors"><FileSpreadsheet className="w-7 h-7 text-indigo-600" /></div>
                    <h3 className="text-xl font-bold text-slate-800">דיווחים כספיים (120 ש')</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">הכנת דיווחים כספיים ורגולטוריים במערכת הפריוריטי בעת שגרה.</p>
                <div className="mt-auto bg-slate-50 p-4 rounded-xl">
                    <span className="font-bold text-indigo-600 text-sm">מענה בחירום:</span>
                    <p className="text-slate-700 font-medium">עקב דחיפות בינונית בלבד ביחס לשירות לקוחות - תוגש בקשת דחייה מסודרת להגשת הדוחות.</p>
                </div>
            </div>

        </div>
    </div>
);

// 6. Summary Slide
const SummarySlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 animate-fadeIn bg-gradient-to-tl from-sky-50 to-white">
        <div className="w-32 h-32 bg-sky-100 rounded-full flex items-center justify-center mb-4 shadow-sm print:border print:border-slate-300">
            <ShieldCheck className="w-16 h-16 text-sky-500" />
        </div>
        <div>
            <h1 className="text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">לסיכום - תוכנית העבודה ל-2026</h1>
            <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                מעבר לאישור תוכנית ה-BIA כפי שהוצגה, תוכנית העבודה לשנה הקרובה כוללת <strong>תרגול מעשי</strong> של הפתרונות העוקפים (דגש על מעבר לאזור חלופי בענן וניתוב שיחות למוקד).
            </p>
            <div className="mt-12 text-slate-400 font-bold text-xl">תודה רבה!</div>
        </div>
    </div>
);

// --- MAIN APP ---
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPrintMode, setIsPrintMode] = useState(false);

    const slides = [
        { component: <TitleSlide />, label: "פתיחה" },
        { component: <ContextSlide />, label: "מטרות" },
        { component: <RtoStrategySlide />, label: "RTO ורמות קריטיות" },
        { component: <ScenariosSlide />, label: "תרחישים וגיבוי מערכות" },
        { component: <FinanceSlide />, label: "כספים ונזילות בחירום" },
        { component: <SummarySlide />, label: "סיכום וצעדים הבאים" },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isAuthenticated || isPrintMode) return;
            if (e.key === 'ArrowLeft') setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
            else if (e.key === 'ArrowRight') setCurrentSlide(prev => Math.max(prev - 1, 0));
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAuthenticated, isPrintMode, slides.length]);

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    if (!isAuthenticated) return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;

    if (isPrintMode) {
        return (
            <div className="min-h-screen bg-slate-200 font-sans flex flex-col items-center gap-8 py-8 print:p-0 print:bg-white print:block" dir="rtl" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                <style>{`
                    @media print {
                        @page { size: 1536px 864px; margin: 0; }
                        body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; margin: 0 !important; padding: 0 !important; }
                        .no-print { display: none !important; }
                        * { box-shadow: none !important; text-shadow: none !important; }
                        .print-border { border: 1px solid #cbd5e1 !important; }
                        .print-page-container { width: 1536px !important; height: 864px !important; page-break-after: always; break-after: page; overflow: hidden !important; position: relative !important; background: white !important; margin: 0 !important; padding: 0 !important; border: none !important; box-shadow: none !important; transform: none !important; }
                    }
                `}</style>

                <div className="fixed top-4 right-4 z-50 flex gap-4 no-print">
                    <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"><Printer className="w-5 h-5" />הדפס / שמור כ-PDF</button>
                    <button onClick={() => setIsPrintMode(false)} className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-full shadow-md transition-all"><X className="w-5 h-5" />חזור למצגת</button>
                </div>

                {slides.map((slide, index) => (
                    <div key={index} className="print-page-container w-[1536px] h-[864px] relative bg-white shadow-xl border border-slate-300 shrink-0 mx-auto overflow-hidden no-print-transform" style={{"@media screen": {transform: "scale(0.7)", transformOrigin: "top center", marginBottom: "-200px"}}}>
                        <div className="absolute top-6 left-8 text-slate-300 text-sm font-bold z-50 no-print">
                            {index + 1} / {slides.length} • {APP_VERSION}
                        </div>
                        {slide.component}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-100 p-8 overflow-hidden font-sans" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}} dir="rtl">
            <div className="bg-white w-[98vw] h-[92vh] rounded-[3.5rem] shadow-2xl border border-white/60 relative overflow-hidden flex flex-col">
                <div className="w-full h-3 bg-sky-50"><div className="h-full bg-sky-500 transition-all duration-700 ease-in-out" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div></div>
                <div className="flex-grow relative overflow-hidden">
                    {slides[currentSlide].component}
                </div>
                <div className="h-28 bg-white border-t border-slate-50 flex items-center justify-between px-16 shrink-0">
                    <div className="text-slate-400 text-xl font-medium flex gap-4"><span>שקף {currentSlide + 1} מתוך {slides.length} | {slides[currentSlide].label}</span></div>
                    <div className="flex gap-6 items-center">
                        <button onClick={() => setIsPrintMode(true)} className="flex items-center gap-2 text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-all font-semibold mr-4"><Printer className="w-5 h-5" /><span className="hidden md:inline">הכן להדפסה / PDF</span></button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <button onClick={prevSlide} disabled={currentSlide === 0} className={`p-5 rounded-full ${currentSlide === 0 ? 'text-slate-300 bg-slate-50' : 'bg-white shadow-lg border border-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600'} transition-all`}><ChevronRight className="w-8 h-8" /></button>
                        <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className={`p-5 rounded-full ${currentSlide === slides.length - 1 ? 'text-slate-300 bg-slate-50' : 'bg-sky-500 shadow-xl shadow-sky-200 text-white hover:bg-sky-600 hover:shadow-sky-300'} transition-all`}><ChevronLeft className="w-8 h-8" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
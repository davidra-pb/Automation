import React, { useState, useEffect } from 'react';
import {
  Shield, Activity, Server, Database, FileSpreadsheet,
  ChevronLeft, ChevronRight, UserCheck, Smartphone,
  CreditCard, Gavel, Mail, AlertTriangle, CheckCircle,
  Printer, X, Lock, FileText, ArrowDown, Zap, Search
} from 'lucide-react';

// --- CONFIG ---
const APP_VERSION = "v.2.0 - Automation Flow";

// --- COMPONENTS ---

// 1. Title Slide
const TitleSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 bg-gradient-to-br from-sky-50 to-white">
      <div className="w-32 h-32 bg-sky-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sky-200">
        <Activity className="w-16 h-16 text-white" />
      </div>
      <div>
        <h1 className="text-6xl font-black text-slate-800 mb-4 tracking-tight">אוטומציית הכחשות עסקה</h1>
        <h2 className="text-3xl text-sky-600 font-normal">תהליך טכני ותפעולי (Technical Flow)</h2>
      </div>
      <div className="mt-12 px-10 py-3 bg-white rounded-full text-sky-700 text-xl font-bold shadow-xl border border-sky-100">
        מסמך אפיון מערכת - PayBox
      </div>
    </div>
);

// 2. High Level Overview
const OverviewSlide = () => (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-slate-800 mb-12 border-r-8 border-sky-500 pr-6">סקירה כללית: 4 השלבים</h2>

      <div className="flex gap-6 h-[50vh]">
        {[
            { id: 1, title: "אתחול ומיפוי", icon: <FileSpreadsheet/>, desc: "טעינת קובץ CSV, סריקה ראשונית ויצירת תור עבודה." },
            { id: 2, title: "העשרה (Enrichment)", icon: <Database/>, desc: "שליפת נתוני משתמש, יתרות, ופרטי עסקאות P2P." },
            { id: 3, title: "ממשק החלטה (GUI)", icon: <Gavel/>, desc: "תצוגה למפעיל וקבלת החלטה: מוצדק / לא מוצדק." },
            { id: 4, title: "ביצוע (Execution)", icon: <Zap/>, desc: "גבייה, חסימה, הפקת טיקט Zendesk ועדכון מערכות." },
        ].map((step) => (
            <div key={step.id} className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-sky-100 text-sky-700 font-black text-6xl opacity-20 p-4 leading-none">{step.id}</div>
                <div className="bg-sky-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-sky-600 group-hover:scale-110 transition-transform">
                    {React.cloneElement(step.icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{step.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed">{step.desc}</p>
            </div>
        ))}
      </div>
    </div>
);

// 3. Stage 1: Initialization
const InitSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
       <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 border-r-8 border-indigo-400 pr-6">שלב 1: אתחול ומיפוי ראשוני</h2>
            <p className="text-slate-500 text-2xl">מטרת העל: יצירת תור עבודה יעיל במינימום זמן</p>
       </div>

       <div className="grid grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                 <div className="bg-indigo-50 p-4 rounded-xl"><FileSpreadsheet className="w-8 h-8 text-indigo-600"/></div>
                 <h3 className="text-2xl font-bold text-slate-800">1.1 קלט (Input)</h3>
              </div>
              <ul className="space-y-4 text-slate-600 text-lg">
                  <li className="flex gap-3"><span className="text-indigo-500 font-bold">•</span> טעינת קובץ CSV עם מזהי עסקאות (parmx).</li>
                  <li className="flex gap-3"><span className="text-indigo-500 font-bold">•</span> כל שורה = עסקה בגינה התקבלה הכחשה.</li>
              </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                 <div className="bg-indigo-50 p-4 rounded-xl"><Server className="w-8 h-8 text-indigo-600"/></div>
                 <h3 className="text-2xl font-bold text-slate-800">1.2 סריקה קלה (Lite Scan)</h3>
              </div>
              <ul className="space-y-4 text-slate-600 text-lg">
                  <li className="flex gap-3"><span className="text-indigo-500 font-bold">•</span> שאילתת MongoDB לקבלת <code className="bg-slate-100 px-2 rounded">Sender_Uid</code> בלבד.</li>
                  <li className="flex gap-3"><span className="text-indigo-500 font-bold">•</span> <strong>אופטימיזציה:</strong> אין שליפה מלאה של הפרטים בשלב זה.</li>
                  <li className="flex gap-3"><span className="text-indigo-500 font-bold">•</span> <strong>תוצאה:</strong> קיבוץ עסקאות לפי משתמש (User Queue).</li>
              </ul>
          </div>
       </div>
    </div>
);

// 4. Stage 2: Enrichment
const EnrichmentSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <h2 className="text-4xl font-bold text-slate-800 mb-8 border-r-8 border-sky-400 pr-6">שלב 2: העשרה (SingleUserFetcher)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-3/4">
             {/* User Data */}
            <div className="bg-sky-50 border border-sky-100 p-6 rounded-[2rem] flex flex-col">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm"><UserCheck className="w-8 h-8 text-sky-600"/></div>
                <h3 className="text-xl font-bold text-sky-900 mb-4">פרופיל משתמש</h3>
                <ul className="space-y-3 text-sky-800 flex-grow">
                    <li>• יתרה עדכנית (Balance)</li>
                    <li>• סטטוס חסימה (Banned)</li>
                    <li>• דוא"ל ו-Zendesk ID</li>
                    <li>• הערות שירות (csComments)</li>
                </ul>
            </div>

            {/* Transaction Data */}
            <div className="bg-white border border-slate-200 p-6 rounded-[2rem] flex flex-col shadow-lg">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4"><Database className="w-8 h-8 text-slate-600"/></div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">פרטי עסקה</h3>
                <ul className="space-y-3 text-slate-600 flex-grow">
                    <li>• סכום ותאריך</li>
                    <li>• סוג פעולה (Type/SubType)</li>
                    <li>• בדיקת Events (האם הוחזרה?)</li>
                    <li>• בדיקת קבוצה (GroupId)</li>
                </ul>
            </div>

            {/* Logic P2P */}
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-amber-200 text-xs font-bold px-3 py-1 rounded-br-xl">לוגיקה מיוחדת</div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm"><Smartphone className="w-8 h-8 text-amber-600"/></div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">עסקאות P2P</h3>
                <div className="text-amber-800 text-lg leading-snug">
                    <p className="mb-4">במקום להציג את שם הקבוצה הטכנית, המערכת שולפת את <strong>שם המשתמש השני</strong> (OtherUserId).</p>
                    <div className="bg-white/60 p-3 rounded-xl border border-amber-200 text-sm">
                        <code>subType = p2pPay</code> <br/>
                        &darr; <br/>
                        Display Name = user.props.Name
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// 5. Stage 3: GUI
const GuiSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <h2 className="text-4xl font-bold text-slate-800 mb-6 border-r-8 border-emerald-400 pr-6">שלב 3: מסך החלטה (GUI Phase)</h2>
        <p className="text-slate-500 text-xl mb-10">תצוגת Wizard - טיפול במשתמש אחד בכל פעם</p>

        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[60vh]">
            {/* Mock Header */}
            <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
                <div className="flex gap-4">
                    <div className="flex flex-col"><span className="text-xs text-slate-400">User ID</span><span className="font-mono font-bold">882319</span></div>
                    <div className="flex flex-col"><span className="text-xs text-slate-400">Balance</span><span className="font-bold text-emerald-400">₪450.00</span></div>
                    <div className="flex flex-col"><span className="text-xs text-slate-400">Status</span><span className="bg-red-500 text-xs px-2 py-0.5 rounded">Banned</span></div>
                </div>
                <div className="text-sm text-slate-400">Ticket: #10923</div>
            </div>

            {/* Mock Table */}
            <div className="p-6 flex-grow bg-slate-50">
                <table className="w-full text-right text-sm">
                    <thead className="text-slate-400 border-b border-slate-200">
                        <tr>
                            <th className="pb-2">תאריך</th>
                            <th className="pb-2">סוג</th>
                            <th className="pb-2">סכום</th>
                            <th className="pb-2">החלטה (Radio Selection)</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700">
                        <tr className="bg-white border-b border-slate-100">
                            <td className="py-3">01/01/2026</td>
                            <td className="py-3">CC Charge</td>
                            <td className="py-3 font-bold">₪200.00</td>
                            <td className="py-3 flex gap-4">
                                <label className="flex items-center gap-1 cursor-pointer accent-emerald-500"><input type="radio" name="r1" checked readOnly/> Justified</label>
                                <label className="flex items-center gap-1 cursor-pointer accent-red-500"><input type="radio" name="r1"/> Unjustified</label>
                                <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="r1"/> Skip</label>
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-slate-100">
                            <td className="py-3">02/01/2026</td>
                            <td className="py-3">CC Charge</td>
                            <td className="py-3 font-bold">₪50.00</td>
                            <td className="py-3 flex gap-4">
                                <label className="flex items-center gap-1 cursor-pointer accent-emerald-500"><input type="radio" name="r2" /> Justified</label>
                                <label className="flex items-center gap-1 cursor-pointer accent-red-500"><input type="radio" name="r2" checked readOnly/> Unjustified</label>
                                <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="r2"/> Skip</label>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-8 flex items-center gap-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200 w-fit">
                    <input type="checkbox" checked readOnly className="w-5 h-5 accent-slate-800" />
                    <span className="font-bold text-slate-700">Keep Banned</span>
                    <span className="text-sm text-slate-500">(משפיע על נוסח המייל ולוגיקת השחרור)</span>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
                <button className="bg-sky-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-sky-200">Execute & Next</button>
            </div>
        </div>
    </div>
);

// 6. Execution - Unjustified Path
const LogicSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-8 border-red-500 pr-6">נתיב ב': הכחשה לא מוצדקת (Unjustified)</h2>

        <div className="flex gap-4 items-stretch h-[60vh]">
            {/* Step 1 */}
            <div className="flex-1 bg-white border-t-4 border-slate-400 shadow-lg rounded-xl p-4 flex flex-col">
                <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold text-slate-600">1</div>
                <h3 className="font-bold mb-2">Safety Re-Fetch</h3>
                <p className="text-sm text-slate-500">בדיקת יתרה חוזרת בזמן אמת לפני ביצוע פעולה למניעת Race Condition.</p>
            </div>

            {/* Step 2 */}
            <div className="flex-1 bg-white border-t-4 border-sky-400 shadow-lg rounded-xl p-4 flex flex-col">
                <div className="bg-sky-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold text-sky-600">2</div>
                <h3 className="font-bold mb-2">חישוב גבייה</h3>
                <p className="text-sm text-slate-500">חלוקת העסקאות ל:</p>
                <ul className="text-xs mt-2 space-y-1">
                    <li className="text-green-600 font-bold">• Claimed (יגבו בפועל)</li>
                    <li className="text-red-600 font-bold">• Unpaid (חוב)</li>
                </ul>
            </div>

             {/* Step 3 */}
             <div className="flex-1 bg-white border-t-4 border-sky-600 shadow-lg rounded-xl p-4 flex flex-col">
                <div className="bg-sky-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold text-sky-600">3</div>
                <h3 className="font-bold mb-2">גבייה וחסימה</h3>
                <p className="text-sm text-slate-500">גביית ה-Claimed מהיתרה.</p>
                <p className="text-sm text-slate-500 mt-2">אם נותר חוב פתוח: <strong className="text-red-500">חסימת משתמש</strong> (אם אינו חסום).</p>
            </div>

             {/* Step 4 */}
             <div className="flex-1 bg-white border-t-4 border-indigo-500 shadow-lg rounded-xl p-4 flex flex-col">
                <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold text-indigo-600">4</div>
                <h3 className="font-bold mb-2">מייל (Zendesk)</h3>
                <p className="text-sm text-slate-500">שליחת מייל דינמי למשתמש.</p>
                <div className="bg-slate-50 p-2 mt-2 rounded border text-xs">
                    "עסקה זו מוגדרת כחוב..." <br/>
                    (מופיע רק אם לא כוסתה)
                </div>
            </div>
             {/* Step 5 */}
             <div className="flex-1 bg-white border-t-4 border-slate-600 shadow-lg rounded-xl p-4 flex flex-col">
                <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold text-slate-600">5</div>
                <h3 className="font-bold mb-2">תיעוד</h3>
                <p className="text-sm text-slate-500">סימון Chargeback במערכת, עדכון הערות (csComments) וייצוא היסטוריה.</p>
            </div>
        </div>
    </div>
);

// 7. Summary
const SummarySlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 bg-gradient-to-tl from-slate-50 to-white">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4"><CheckCircle className="w-12 h-12 text-green-600" /></div>
        <div>
            <h2 className="text-5xl font-bold text-slate-800 mb-6">סיכום המערכת</h2>
            <div className="flex flex-col gap-4 text-2xl text-slate-600 items-center">
                <p>✅ עבודה בשיטת <strong>Wizard</strong> (משתמש אחר משתמש).</p>
                <p>✅ הפרדה מוחלטת בין <strong>Justified</strong> ל-<strong>Unjustified</strong>.</p>
                <p>✅ <strong>חישוב אופטימלי</strong> של גבייה מהיתרה הקיימת.</p>
                <p>✅ <strong>תקשורת אוטומטית</strong> ושקופה מול הלקוח.</p>
            </div>
        </div>
    </div>
);

// --- MAIN APP ---
const BoardPresentation = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { component: <TitleSlide /> },
        { component: <OverviewSlide /> },
        { component: <InitSlide /> },
        { component: <EnrichmentSlide /> },
        { component: <GuiSlide /> },
        { component: <LogicSlide /> },
        { component: <SummarySlide /> },
    ];

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') nextSlide(); // RTL: Left is Next
            else if (e.key === 'ArrowRight') prevSlide(); // RTL: Right is Prev
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-200 p-8 font-sans" dir="rtl">
            <div className="bg-white w-full max-w-7xl h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative">
                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-100">
                    <div
                        className="h-full bg-sky-500 transition-all duration-500"
                        style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    ></div>
                </div>

                {/* Content */}
                <div className="flex-grow relative overflow-hidden">
                    {slides[currentSlide].component}
                </div>

                {/* Footer / Controls */}
                <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-between px-10">
                    <div className="text-slate-400 font-medium">
                        שקף {currentSlide + 1} מתוך {slides.length}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className={`p-3 rounded-full transition-all ${currentSlide === 0 ? 'text-slate-300' : 'bg-slate-100 hover:bg-sky-100 text-sky-600'}`}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            className={`p-3 rounded-full transition-all ${currentSlide === slides.length - 1 ? 'text-slate-300' : 'bg-sky-600 hover:bg-sky-700 text-white shadow-lg'}`}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-slate-500 text-sm font-medium">
                PayBox Automation Flow • {APP_VERSION}
            </div>
        </div>
    );
};

export default BoardPresentation;
/**
 * فلوی سوالات Diet — بدون عدد، کالری، وزن.
 * حداکثر ۷ سوال، زیر ۹۰ ثانیه، امکان رد کردن.
 */

export type DietEnergy = "low" | "medium" | "high";
export type DietStress = "low" | "medium" | "high";
export type DietGoal = "energy" | "sleep" | "light" | "order";
export type DietChallenge = "overeating" | "irregular" | "no_time" | "no_cook" | "none";
export type DietStyle = "all" | "low_meat" | "vegetarian" | "flexible";
export type DietMeals = "2" | "3" | "irregular";

export type DietContext = {
  energy: DietEnergy;
  stress: DietStress;
  goal: DietGoal;
  challenge: DietChallenge;
  style: DietStyle;
  meals: DietMeals;
  sensitivities: string[];
};

export const DIET_ENTRY = {
  title: "راهنمای تغذیه‌ی قابل زندگی",
  subtitle: "نه رژیم. نه سخت‌گیری.\nفقط پیشنهادهایی که به حالت بخوره.",
  cta: "شروع کنیم",
} as const;

export const DIET_STEPS = [
  {
    id: "energy",
    question: "این روزها از نظر انرژی چطوری؟",
    type: "single" as const,
    options: [
      { value: "low", label: "کم‌انرژی 😴" },
      { value: "medium", label: "معمولی 🙂" },
      { value: "high", label: "سرحال ⚡" },
    ],
  },
  {
    id: "stress",
    question: "سطح استرست این روزها چطوره؟",
    type: "single" as const,
    options: [
      { value: "high", label: "بالا" },
      { value: "medium", label: "متوسط" },
      { value: "low", label: "کمه" },
    ],
  },
  {
    id: "goal",
    question: "الان بیشتر دنبال چی هستی؟",
    type: "single" as const,
    options: [
      { value: "energy", label: "انرژی بیشتر" },
      { value: "sleep", label: "خواب بهتر" },
      { value: "light", label: "سبک‌تر غذا خوردن" },
      { value: "order", label: "نظم ساده" },
    ],
  },
  {
    id: "challenge",
    question: "بیشتر کجا به مشکل می‌خوری؟",
    type: "single" as const,
    options: [
      { value: "overeating", label: "پرخوری عصبی" },
      { value: "irregular", label: "نامنظم خوردن" },
      { value: "no_time", label: "وقت نداشتن" },
      { value: "no_cook", label: "حوصله آشپزی ندارم" },
      { value: "none", label: "مشکل خاصی ندارم" },
    ],
  },
  {
    id: "style",
    question: "معمولاً چی می‌خوری؟",
    type: "single" as const,
    options: [
      { value: "all", label: "همه‌چیز" },
      { value: "low_meat", label: "گوشت کم" },
      { value: "vegetarian", label: "گیاهی" },
      { value: "flexible", label: "فرقی نمی‌کنه" },
    ],
  },
  {
    id: "meals",
    question: "معمولاً چند وعده می‌خوری؟",
    type: "single" as const,
    options: [
      { value: "2", label: "۲ وعده" },
      { value: "3", label: "۳ وعده" },
      { value: "irregular", label: "نامنظم" },
    ],
  },
  {
    id: "sensitivities",
    question: "چیزی هست که دوست نداری یا نمی‌خوری؟",
    subtext: "می‌تونی رد کنی",
    type: "multiple" as const,
    optional: true,
    options: [
      { value: "dairy", label: "لبنیات" },
      { value: "gluten", label: "گلوتن" },
      { value: "nuts", label: "آجیل" },
      { value: "spicy", label: "ادویه زیاد" },
      { value: "sweet", label: "شیرینی زیاد" },
      { value: "none", label: "هیچکدوم" },
    ],
  },
] as const;

export const DIET_COMPLETION = {
  message: "خیلی خوب 🌱\nقرار نیست چیزی حذف کنیم.\nفقط چند پیشنهاد ساده می‌دیم.",
  cta: "پیشنهادهای این هفته رو ببین",
} as const;

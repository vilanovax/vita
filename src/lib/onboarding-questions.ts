export type QuestionSegment = "body" | "goal" | "lifestyle";

export interface OnboardingQuestion {
  id: string;
  segment: QuestionSegment;
  question: string;
  subtext?: string;
  type: "single" | "multiple" | "input" | "slider";
  optional?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: "age",
    segment: "body",
    question: "حدوداً چند سالته؟",
    type: "single",
    options: [
      { value: "18-24", label: "۱۸–۲۴" },
      { value: "25-34", label: "۲۵–۳۴" },
      { value: "35-44", label: "۳۵–۴۴" },
      { value: "45-54", label: "۴۵–۵۴" },
      { value: "55+", label: "۵۵ به بالا" },
    ],
  },
  {
    id: "height",
    segment: "body",
    question: "قدت حدوداً چند سانتی‌متره؟",
    subtext: "فقط برای تنظیم پیشنهادها",
    type: "input",
    placeholder: "مثلاً ۱۷۰",
    unit: "سانتی‌متر",
  },
  {
    id: "weight",
    segment: "body",
    question: "وزنت حدوداً چند کیلوگرمه؟",
    subtext: "اگه دوست نداری، می‌تونی ردش کنی",
    type: "input",
    optional: true,
    placeholder: "مثلاً ۷۰",
    unit: "کیلوگرم",
  },
  {
    id: "activity_level",
    segment: "body",
    question: "این روزها بدنت چقدر در حرکته؟",
    type: "single",
    options: [
      { value: "none", label: "تقریباً هیچ" },
      { value: "sometimes", label: "گاهی پیاده‌روی یا حرکت‌های ساده" },
      { value: "regular", label: "هفته‌ای ۲–۳ بار" },
      { value: "active", label: "تقریباً منظم ورزش می‌کنم" },
    ],
  },
  {
    id: "main_goal",
    segment: "goal",
    question: "هدف اصلی‌ات چیه؟",
    subtext: "اگه بخوای فقط یکی رو انتخاب کنی، کدوم مهم‌تره؟",
    type: "single",
    options: [
      { value: "energy", label: "انرژی بیشتر" },
      { value: "sleep", label: "خواب بهتر" },
      { value: "habits", label: "عادت‌های سالم‌تر" },
      { value: "stress", label: "کاهش استرس" },
      { value: "fitness", label: "تناسب اندام ملایم" },
    ],
  },
  {
    id: "daily_time",
    segment: "goal",
    question: "واقع‌بینانه بگیم، روزی چقدر وقت می‌تونی برای خودت بذاری؟",
    type: "single",
    options: [
      { value: "little", label: "کم (زیر ۱۵ دقیقه)" },
      { value: "medium", label: "متوسط (۱۵–۳۰ دقیقه)" },
      { value: "enough", label: "کافی (۳۰ دقیقه به بالا)" },
    ],
  },
  {
    id: "biggest_challenge",
    segment: "goal",
    question: "الان بیشتر از همه چی جلوت رو می‌گیره؟",
    type: "single",
    options: [
      { value: "time", label: "وقت ندارم" },
      { value: "motivation", label: "انگیزه‌ام کمه" },
      { value: "stress", label: "استرسم زیاده" },
      { value: "start", label: "نمی‌دونم از کجا شروع کنم" },
    ],
  },
  {
    id: "job_type",
    segment: "lifestyle",
    question: "بیشتر روزت چطور می‌گذره؟",
    type: "single",
    options: [
      { value: "desk", label: "پشت‌میزی" },
      { value: "mixed", label: "ترکیبی" },
      { value: "physical", label: "فیزیکی و پرتحرک" },
      { value: "student", label: "دانشجو یا خانه‌دار" },
    ],
  },
  {
    id: "sleep_quality",
    segment: "lifestyle",
    question: "خوابت این روزها چطوره؟",
    type: "single",
    options: [
      { value: "poor", label: "بد / زیاد بیدار می‌شم" },
      { value: "medium", label: "معمولیه" },
      { value: "good", label: "خوبه" },
    ],
  },
  {
    id: "stress_level",
    segment: "lifestyle",
    question: "بیشتر روزها استرست چقدره؟",
    type: "single",
    options: [
      { value: "high", label: "بالا" },
      { value: "medium", label: "متوسط" },
      { value: "low", label: "کم" },
    ],
  },
];

export const SEGMENT_LABELS: Record<QuestionSegment, string> = {
  body: "بدن",
  goal: "هدف",
  lifestyle: "سبک زندگی",
};

/** اسلاید پایانی قبل از ساخت برنامه (بدون سؤال) */
export const ONBOARDING_SUMMARY = {
  message:
    "همین کافیه 🌱\nقرار نیست کامل باشی، فقط قراره شروع کنی.",
  cta: "برنامه‌ی منو بساز",
};

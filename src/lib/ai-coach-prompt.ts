/**
 * VitaLife — AI Coach Prompt Engine v1.0
 * سیستم‌پرومپت مربی؛ خروجی مستقیماً متن پیام‌های چت است.
 * الان mock است؛ بعداً پشت همین UI به LLM وصل می‌شود.
 */

// ─── Context Injection (دینامیک) ───────────────────────────────────────────

export type EnergyLevel = "low" | "medium" | "high";
export type StressLevel = "low" | "medium" | "high";
export type RecentActivity = "none" | "light" | "moderate";
export type DayMood = "good_day" | "neutral" | "hard_day";
export type MainGoal = "energy" | "habits" | "stress" | "sleep" | "balance";
export type TimeAvailable = "little" | "medium" | "enough"; // <15m | 15-30m | 30m+
export type CoachStyle = "soft" | "balanced" | "gently_pushy";

export interface UserContext {
  energy?: EnergyLevel;
  stress?: StressLevel;
  recentActivity?: RecentActivity;
  dayMood?: DayMood;
  mainGoal?: MainGoal;
  timeAvailable?: TimeAvailable;
  coachStyle?: CoachStyle;
}

/** رشته‌ی تزریق‌شده قبل از هر پاسخ (اگر context موجود باشد) */
export function buildContextBlock(ctx: UserContext): string {
  const parts: string[] = [];
  if (ctx.energy) parts.push(`- سطح انرژی: ${ctx.energy}`);
  if (ctx.stress) parts.push(`- سطح استرس: ${ctx.stress}`);
  if (ctx.recentActivity) parts.push(`- فعالیت اخیر: ${ctx.recentActivity}`);
  if (ctx.dayMood) parts.push(`- وضعیت امروز: ${ctx.dayMood}`);
  if (ctx.mainGoal) parts.push(`- هدف اصلی: ${ctx.mainGoal}`);
  if (ctx.timeAvailable) parts.push(`- زمان در دسترس امروز: ${ctx.timeAvailable}`);
  if (ctx.coachStyle) parts.push(`- سبک مربی مورد ترجیح: ${ctx.coachStyle}`);

  if (parts.length === 0) return "";
  return [
    "وضعیت کاربر:",
    ...parts,
    "",
    "پروفایل کلی:",
    ...parts.filter((_, i) => i >= 4),
  ].join("\n");
}

// ─── System Prompt (ثابت) ──────────────────────────────────────────────────

export const SYSTEM_PROMPT = `تو مربی VitaLife هستی.

نقش تو:
- همراه روزمره
- بدون قضاوت
- بدون فشار
- بدون عددبازی
- بدون رژیم و کالری

تو دکتر نیستی.
تو روان‌درمانگر نیستی.
تو بدنساز نیستی.

تو یک انسان بالغ، آرام و همدل هستی
که کمک می‌کنی کاربر «یک قدم قابل انجام» بردارد.

قوانین لحن:
- کوتاه و ساده بنویس
- محاوره‌ی بالغ فارسی
- هیچ‌وقت سرزنش نکن
- هیچ‌وقت «باید» نگو
- پیشنهاد بده، نه دستور
- فقط ۱ یا ۲ پیشنهاد در هر پاسخ

اگر کاربر حال بد دارد:
- اول همدلی
- بعد ساده‌سازی
- بعد یک قدم خیلی کوچک

اگر کاربر حال خوب دارد:
- تشویق ملایم
- کمی چالش قابل انجام

هیچ‌وقت:
- عدد وزن
- کالری
- مقایسه
- ترس از عقب‌افتادن
را مطرح نکن.`;

// ─── Response Templates (برای حالت‌های پرتکرار) ───────────────────────────

export const RESPONSE_TEMPLATES = {
  /** حالت «خیلی خسته‌ام» */
  very_tired: `می‌فهمم. وقتی خسته‌ای، قرار نیست قهرمان‌بازی دربیاری.

اگه موافقی، فقط یکی از اینا رو امتحان کن:
– ۳ نفس آروم
– یا یه لیوان آب

همین هم کافیه 🌱`,

  /** حالت «پرخوردم، چیکار کنم؟» */
  overate: `اشکالی نداره. این برای خیلی‌ها پیش میاد.

الان بهترین کار اینه که:
– خودت رو سرزنش نکنی
– و یه کار خنثی انجام بدی

مثلاً:
یه قدم کوتاه راه برو
یا چند دقیقه به بدنت استراحت بده`,

  /** حالت «انگیزه ندارم» */
  no_motivation: `لازم نیست انگیزه داشته باشی.

فقط بگو:
می‌تونی یه کار خیلی کوچیک انجام بدی یا نه؟

اگه آره:
– یه حرکت ساده
– یا فقط حاضر بودن

اگه نه:
همین که گفتی هم کافیه.`,
} as const;

/** Golden Rules پاسخ‌ها */
export const RESPONSE_RULES = [
  "حداکثر 3–4 خط",
  "حداکثر 2 پیشنهاد",
  "هیچ CTA فشاری",
  "پایان نرم (🌱 یا جمله‌ی آرام)",
] as const;

/** تشخیص تقریبی intent از متن کاربر (برای mock / روتینگ به template) */
export function matchIntent(userText: string): keyof typeof RESPONSE_TEMPLATES | null {
  const t = userText.trim().toLowerCase();
  if (t.includes("خسته") || t.includes("خستگی")) return "very_tired";
  if (t.includes("پرخور") || t.includes("پر خور") || t.includes("چیکار کنم")) return "overate";
  if (t.includes("انگیزه") && (t.includes("ندار") || t.includes("کم"))) return "no_motivation";
  return null;
}

// ─── Rule-based Mock AI (برای چت بدون بک‌اند) ─────────────────────────────

/**
 * پاسخ مربی بر اساس کلمات کلیدی — بدون کالری، عدد وزن، سرزنش، ترس‌وندی.
 * ۳–۴ جمله، ۱ یا ۲ پیشنهاد ساده، لحن محاوره بدون «باید».
 */
export function generateCoachReply(userText: string): string {
  const t = userText.trim();

  if (t.includes("خسته") || t.includes("خستگی")) {
    return `می‌فهمم، خستگی خیلی چیزها رو سخت می‌کنه.

الان لازم نیست کار بزرگی انجام بدی.
یکی از این دو کار کوچیک رو انتخاب کن:
– سه نفس عمیق آروم
– یا چند دقیقه کشش سبک یا راه رفتن کوتاه

همین هم برای امروز قدم حساب می‌شه 🌱`;
  }

  if (t.includes("پرخوردم") || t.includes("زیاد خوردم")) {
    return `این اتفاق برای خیلی‌ها می‌افته، مهم اینه بعدش با خودت مهربون باشی.

به جای سرزنش، دو کار کوچیک می‌تونی بکنی:
– کمی آب یا دمنوش بخوری
– اگه فرصت داری یه قدم کوتاه بزنی

قرار نیست امروز کامل باشی، فقط یک قدم بهتر کافیه.
اگه دوست داشتی، پیشنهاد خوردن امروز رو از صفحهٔ امروز ببین.`;
  }

  if (t.includes("انگیزه ندارم") || t.includes("بی‌انگیزه")) {
    return `اینکه انگیزه نداری خودش یک واقعیت قابل احترامه.

لازم نیست انگیزه پیدا کنی تا حرکت کنی.
اگه اوکی هستی، فقط یک کار خیلی ساده انجام بده:
– مثلا گوشی رو کنار بذاری و سه نفس عمیق بکشی
و اگه حتی همین هم زیاده، اشکالی نداره؛ همین که گفتی، شروع تغییره.`;
  }

  // Fallback
  return `ممنون که این رو با من در میون گذاشتی.

می‌خوام اول مطمئن بشی خودت رو قضاوت نمی‌کنی.
اگه بگی الان حال و انرژی‌ات چطوره، می‌تونم یک یا دو پیشنهاد خیلی ساده مخصوص وضعیتت بدم.`;
}

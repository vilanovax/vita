/**
 * قرارداد داده بین Today Screen و Coach (بدون بک‌اند).
 * خروجی rule-based؛ بعداً با Check-in و AI واقعی پر می‌شود.
 */

export type TodayContext = {
  mood: "low" | "neutral" | "good";
  energy: "low" | "medium" | "high";
  stress: "low" | "medium" | "high";
  completedTasks: number;
  skippedMainTask: boolean;
};

export type CoachOutput = {
  message: string;
  progressMessage: string;
};

/**
 * بر اساس وضعیت امروز کاربر، پیام مربی و جملهٔ Gentle Progress ساخته می‌شود.
 * بدون عدد، بدون سرزنش، بدون فشار.
 */
export function generateTodayCoachOutput(context: TodayContext): CoachOutput {
  const { mood, energy, completedTasks, skippedMainTask } = context;

  const isLow = mood === "low" || energy === "low";
  const isGood = mood === "good" && energy !== "low";

  // ─── پیام اصلی (Coach Card) ───
  let message: string;

  if (isLow) {
    message = `امروز به‌نظر روز آرومیه.
همون یک قدم کوچیک هم کاملاً کافیه 🌱`;
  } else if (isGood) {
    message = `به‌نظر حالت بهتره.
اگه دوست داشتی، می‌تونیم امروز رو با تمرکز جلو ببریم.`;
  } else {
    message = `امروز قرار نیست بدویی.
سه قدم کوچیک، هم‌راستا با حالت.`;
  }

  // ─── Gentle Progress (بدون عدد، بدون احساس گناه) ───
  let progressMessage: string;

  if (completedTasks === 0) {
    progressMessage = "همین که اینجا هستی، یعنی به خودت فکر می‌کنی 🌿";
  } else if (completedTasks >= 1 && completedTasks < 3) {
    progressMessage = "اینکه حتی به بدنت توجه کردی، خودش یک قدم مهمه.";
  } else {
    progressMessage = "این هفته بیشتر روزها با خودت مهربون بودی";
  }

  if (skippedMainTask && completedTasks > 0) {
    progressMessage = "کارهای کوچیک هم حساب می‌شن. امروز خوب بود 🌱";
  }

  return { message, progressMessage };
}

/** مقادیر پیش‌فرض برای MVP (بعداً از Check-in پر می‌شود) */
export const DEFAULT_TODAY_CONTEXT: TodayContext = {
  mood: "neutral",
  energy: "medium",
  stress: "medium",
  completedTasks: 0,
  skippedMainTask: true,
};

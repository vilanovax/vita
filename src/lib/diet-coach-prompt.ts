/**
 * Diet Coach Prompt Engine — بدون رژیم، کالری، ممنوعیت.
 * خروجی ساخت‌یافته برای راهنمای هفتگی و پیشنهاد امروز.
 */

import type { DietContext } from "./diet-questions";

/** زمینه‌ی کاربر برای AI (متن تزریق‌شده) */
export function buildDietContextBlock(ctx: DietContext): string {
  return [
    "وضعیت کاربر:",
    `- انرژی: ${ctx.energy}`,
    `- استرس: ${ctx.stress}`,
    `- هدف نرم: ${ctx.goal}`,
    `- چالش اصلی: ${ctx.challenge}`,
    `- سبک غذایی: ${ctx.style}`,
    `- وعده‌ها: ${ctx.meals}`,
    ctx.sensitivities?.length ? `- حساسیت‌ها: ${ctx.sensitivities.join(", ")}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export type DietCoachOutput = {
  weeklyFocus: string;
  principles: string[];
  todaySuggestions: string[];
};

/**
 * خروجی mock بر اساس context — بعداً با LLM پر می‌شود.
 * قوانین: عدد نده، منع نکن، ساده‌تر کن اگر خسته/پراسترس.
 */
export function generateDietCoachOutput(ctx: DietContext): DietCoachOutput {
  const isStressed = ctx.stress === "high";
  const isLowEnergy = ctx.energy === "low";

  let weeklyFocus = "این هفته تمرکز روی:\n- ساده‌تر خوردن\n- فاصله گرفتن از پرخوری عصبی\n- شام آروم‌تر";
  if (ctx.challenge === "overeating") {
    weeklyFocus = "این هفته تمرکز روی:\n- قبل از غذا یک مکث کوتاه\n- ساده‌تر کردن بشقاب\n- بدون حذف، فقط آرام‌تر";
  } else if (ctx.challenge === "irregular") {
    weeklyFocus = "این هفته تمرکز روی:\n- یک وعده ثابت (هر روز همون ساعت)\n- بقیه وعده‌ها آزاد\n- بدون فشار";
  } else if (ctx.challenge === "no_time") {
    weeklyFocus = "این هفته تمرکز روی:\n- دو سه غذای ساده که سریع درست میشن\n- بدون آشپزی پیچیده\n- همین که بخوری کافیه";
  } else if (ctx.challenge === "no_cook") {
    weeklyFocus = "این هفته تمرکز روی:\n- انتخاب‌های ساده بدون آشپزی\n- یک گرم‌کن یا سالاد ساده\n- بدون احساس گناه";
  }

  if (isStressed || isLowEnergy) {
    weeklyFocus += "\n\nاگه خسته یا پراسترسی، همون یک قدم کوچیک کافیه.";
  }

  const principles = [
    "قبل از غذا مکث کوتاه",
    "نصف بشقاب ساده‌تر از معمول",
    isStressed ? "اگر خسته‌ای، غذا رو ساده کن نه کمتر" : "اگر گرسنه‌ای، اول آب یا یه میوه",
  ];

  const todaySuggestions = [
    "امروز اگر گرسنه شدی: یه غذای ساده با پروتئین + سبزی",
    "یا همونی که هست، ولی آهسته‌تر",
  ];

  return { weeklyFocus, principles, todaySuggestions };
}

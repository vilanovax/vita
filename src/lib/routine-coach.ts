/**
 * تفسیر رفتار روتین کاربر برای مربی (بدون بک‌اند).
 * Routine = سیگنال غیرکلامی → Coach = تفسیر انسانی.
 */

export type RoutineEnergy = "low" | "normal" | "good";

export type RoutineContext = {
  morningCoreDone: boolean;
  morningSecondaryDone: number;
  nightCoreDone: boolean;
  nightSecondaryDone: number;
  skippedMorning: boolean;
  skippedNight: boolean;
  routineEnergy: RoutineEnergy;
};

export type RoutineCoachOutput = {
  message: string;
  nextDayHint?: string;
};

export function inferRoutineEnergy(ctx: {
  morningCoreDone: boolean;
  nightCoreDone: boolean;
}): RoutineEnergy {
  if (ctx.morningCoreDone && ctx.nightCoreDone) return "good";
  if (ctx.morningCoreDone || ctx.nightCoreDone) return "normal";
  return "low";
}

/**
 * بر اساس RoutineContext پیام و hint فردا را می‌سازد.
 * بدون سرزنش، بدون استریک، همه‌چیز اختیاری.
 */
export function generateRoutineCoachFeedback(
  context: RoutineContext
): RoutineCoachOutput {
  const { routineEnergy, skippedMorning, skippedNight } = context;

  if (routineEnergy === "low") {
    return {
      message:
        "اگه امروز روتین سخت بود، اشکالی نداره.\nفردا فقط همون کار اصلی کافیه 🌱",
      nextDayHint: "امروز فقط آروم شروع کنیم. همون یک کار کوچیک کافیه.",
    };
  }

  if (routineEnergy === "normal") {
    if (skippedMorning) {
      return {
        message: "اگه صبح شلوغ بود، اشکالی نداره. هنوز کل روز جلوته.",
      };
    }
    if (skippedNight) {
      return {
        message: "امشب همون که به خودت فکر کردی کافیه. فردا دوباره شروع می‌کنیم.",
      };
    }
    return {
      message: "همین که صبح به خودت توجه کردی کافیه 🌱",
    };
  }

  // good
  return {
    message:
      "اینکه حتی قدم‌های کوچیک رو ادامه دادی، خیلی ارزشمنده.",
    nextDayHint: "می‌تونیم امروز رو با همین آرامش جلو ببریم.",
  };
}

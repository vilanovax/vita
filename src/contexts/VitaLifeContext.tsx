"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  type RoutineContext as RoutineContextType,
  inferRoutineEnergy,
  generateRoutineCoachFeedback,
} from "@/lib/routine-coach";

// ─── Shared state types ───

export type Mood = "low" | "neutral" | "good";
export type Energy = "low" | "medium" | "high";
export type Stress = "low" | "medium" | "high";

export type TodayState = {
  mood: Mood;
  energy: Energy;
  stress: Stress;
  mainTaskDone: boolean;
  secondaryTasksDone: number;
  lastCoachMessage?: string;
};

export type UserIntent = "tired" | "overeaten" | "unmotivated" | "general";
export type AdviceType = "rest" | "simplify" | "encourage";

export type CoachMemory = {
  lastUserIntent?: UserIntent;
  lastAdviceType?: AdviceType;
};

const DEFAULT_ROUTINE_CONTEXT: RoutineContextType = {
  morningCoreDone: false,
  morningSecondaryDone: 0,
  nightCoreDone: false,
  nightSecondaryDone: 0,
  skippedMorning: false,
  skippedNight: false,
  routineEnergy: "low",
};

const DEFAULT_TODAY: TodayState = {
  mood: "neutral",
  energy: "medium",
  stress: "medium",
  mainTaskDone: false,
  secondaryTasksDone: 0,
};

type VitaLifeValue = {
  today: TodayState;
  coachMemory: CoachMemory;
  routineContext: RoutineContextType;
  routineCoachMessage: string | undefined;
  updateMood: (m: Mood) => void;
  updateEnergy: (e: Energy) => void;
  updateStress: (s: Stress) => void;
  setMainTaskDone: (done: boolean) => void;
  setSecondaryTasksDone: (n: number) => void;
  setLastCoachMessage: (msg: string) => void;
  setLastUserIntent: (i: UserIntent | undefined) => void;
  setLastAdviceType: (t: AdviceType | undefined) => void;
  applyIntentImpact: (intent: UserIntent) => void;
  setTodayFromCheckin: (data: { mood: Mood; energy: Energy; stress: Stress }) => void;
  updateRoutineFromRoutinePage: (updates: Partial<RoutineContextType>) => void;
  leaveRoutinePage: () => void;
};

const VitaLifeContext = createContext<VitaLifeValue | null>(null);

export function detectIntent(text: string): UserIntent {
  const t = text.trim();
  if (t.includes("خسته") || t.includes("خستگی")) return "tired";
  if (t.includes("پرخور") || t.includes("پر خور") || t.includes("زیاد خوردم")) return "overeaten";
  if (t.includes("انگیزه") && (t.includes("ندار") || t.includes("کم"))) return "unmotivated";
  return "general";
}

function getAdviceTypeFromIntent(intent: UserIntent): AdviceType | undefined {
  if (intent === "tired") return "rest";
  if (intent === "overeaten") return "simplify";
  if (intent === "unmotivated") return "rest";
  return undefined;
}

export function VitaLifeProvider({ children }: { children: ReactNode }) {
  const [today, setToday] = useState<TodayState>(DEFAULT_TODAY);
  const [coachMemory, setCoachMemory] = useState<CoachMemory>({});
  const [routineContext, setRoutineContext] = useState<RoutineContextType>(DEFAULT_ROUTINE_CONTEXT);
  const [routineCoachMessage, setRoutineCoachMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const out = generateRoutineCoachFeedback(routineContext);
    setRoutineCoachMessage(out.message);
  }, [routineContext]);

  const updateMood = useCallback((m: Mood) => {
    setToday((p) => ({ ...p, mood: m }));
  }, []);

  const updateEnergy = useCallback((e: Energy) => {
    setToday((p) => ({ ...p, energy: e }));
  }, []);

  const updateStress = useCallback((s: Stress) => {
    setToday((p) => ({ ...p, stress: s }));
  }, []);

  const setMainTaskDone = useCallback((done: boolean) => {
    setToday((p) => ({ ...p, mainTaskDone: done }));
  }, []);

  const setSecondaryTasksDone = useCallback((n: number) => {
    setToday((p) => ({ ...p, secondaryTasksDone: Math.max(0, Math.min(2, n)) }));
  }, []);

  const setLastCoachMessage = useCallback((msg: string) => {
    setToday((p) => ({ ...p, lastCoachMessage: msg }));
  }, []);

  const setLastUserIntent = useCallback((i: UserIntent | undefined) => {
    setCoachMemory((p) => ({ ...p, lastUserIntent: i }));
  }, []);

  const setLastAdviceType = useCallback((t: AdviceType | undefined) => {
    setCoachMemory((p) => ({ ...p, lastAdviceType: t }));
  }, []);

  const applyIntentImpact = useCallback((intent: UserIntent) => {
    setLastUserIntent(intent);
    setLastAdviceType(getAdviceTypeFromIntent(intent));
    setToday((p) => {
      const next = { ...p };
      if (intent === "tired") {
        next.mood = "low";
        next.energy = "low";
      } else if (intent === "overeaten") {
        next.stress = "medium";
      } else if (intent === "unmotivated") {
        next.mood = "low";
      }
      return next;
    });
  }, [setLastUserIntent, setLastAdviceType]);

  const setTodayFromCheckin = useCallback(
    (data: { mood: Mood; energy: Energy; stress: Stress }) => {
      setToday((p) => ({ ...p, ...data }));
    },
    []
  );

  const updateRoutineFromRoutinePage = useCallback((updates: Partial<RoutineContextType>) => {
    setRoutineContext((prev) => {
      const next = { ...prev, ...updates };
      next.routineEnergy = inferRoutineEnergy(next);
      return next;
    });
  }, []);

  const leaveRoutinePage = useCallback(() => {
    setRoutineContext((prev) => ({
      ...prev,
      skippedMorning: !prev.morningCoreDone,
      skippedNight: !prev.nightCoreDone,
    }));
  }, []);

  const value: VitaLifeValue = {
    today,
    coachMemory,
    routineContext,
    routineCoachMessage,
    updateMood,
    updateEnergy,
    updateStress,
    setMainTaskDone,
    setSecondaryTasksDone,
    setLastCoachMessage,
    setLastUserIntent,
    setLastAdviceType,
    applyIntentImpact,
    setTodayFromCheckin,
    updateRoutineFromRoutinePage,
    leaveRoutinePage,
  };

  return (
    <VitaLifeContext.Provider value={value}>
      {children}
    </VitaLifeContext.Provider>
  );
}

export function useVitaLife(): VitaLifeValue {
  const ctx = useContext(VitaLifeContext);
  if (!ctx) throw new Error("useVitaLife must be used within VitaLifeProvider");
  return ctx;
}

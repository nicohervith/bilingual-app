type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type PracticeContent = {
  type: "quiz";
  questions: QuizQuestion[];
};

type Mission = {
  id: string;
  title: string;
  type: string;
  xpReward: number;
  requiredToUnlock: string[];
  content: {
    sections?: any[]; // Tipalo mejor si lo usás
    practice?: PracticeContent;
  };
};

type Props = {
  mission: Mission;
  onComplete: () => void;
};

export interface UserProgress {
  xp: number;
  completedMissions: Record<string, string[]>;
  levels: Record<string, { completed: number; total: number }>;
}

export interface AppLevel {
  id: string;
  name: string;
  missions: Mission[];
}

export interface Lesson {
  id: string;
  unit: string;
  title: string;
  type: "vocabulary" | "grammar" | "game" | "practice";
  level: "A1" | "A2" | "B1";
  xpReward: number;
  objectives: string[];
  content: {
    vocabulary?: Array<{
      word: string;
      translation: string;
      image?: string;
      examples: string[];
    }>;
    grammarRules?: Array<{
      rule: string;
      examples: string[];
    }>;
    exercises?: Array<{
      type: string;
      title?: string;
      question?: string;
      pairs?: Array<{ from: string; to: string }>;
      options?: Array<{ text: string; correct?: boolean }>;
    }>;
    gameConfig?: {
      type: string;
      cards?: Array<{ front: string; back: string }>;
    };
  };
}
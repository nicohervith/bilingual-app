import { Timestamp } from "firebase/firestore";

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
  completedUnits: string[]; // array de unitIds completadas
  totalXP: number;
  lastActive?: Timestamp;
}

export interface AppLevel {
  id: string;
  name: string;
  missions: Mission[];
}

/* export interface Lesson {
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
} */

export type LessonComponentProps = {
  lesson: {
    id: string;
    title: string;
    content: any; // Ajusta este tipo según tu estructura real
    xpReward: number;
    objectives?: string[];
  };
  onComplete: () => Promise<void> | void;
  currentLevel: string;
  isTestMode: boolean;
};

export type Unit = {
  id: string;
  title: string;
  lessons: string[]; // IDs de lecciones
  requiredXP: number;
  rewardXP: number;
  completed?: boolean;
  locked?: boolean;
};

export type LessonProps = {
  lesson: Lesson;
  onComplete: () => void;
  currentLevel: string;
  isTestMode?: boolean;
};

export type Lesson = {
  id: string;
  title: string;
  content: {
    vocabulary?: Array<{
      word: string;
      translation: string;
      image?: string;
      examples?: string[];
    }>;
    grammarRules?: Array<{
      rule: string;
      examples: string[];
    }>;
    exercises?: Array<{
      type: string;
      [key: string]: any;
    }>;
  };
  xpReward: number;
  objectives?: string[];
  type?: string;
};

export type LessonScreenProps = {
  lesson: Lesson;
  onComplete: () => Promise<void> | void;
  currentLevel: string;
  isTestMode?: boolean;
};
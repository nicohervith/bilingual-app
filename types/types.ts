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
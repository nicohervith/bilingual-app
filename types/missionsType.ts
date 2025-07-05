export interface MissionType {
  id: string;
  title: string;
  xpReward: number;
  level?: string;
  type?: string;
  content: {
    sections?: Array<{
      type: string;
      title?: string;
      explanation?: string;
      examples?: string[];
      dialogues?: Array<{
        speaker: string;
        text: string;
        translation: string;
      }>;
      words?: Array<{
        word: string;
        translation: string;
        example?: string;
      }>;
    }>;
    practice?: {
      type: string;
      questions?: Array<{
        question: string;
        options: string[];
        correctAnswer: number;
      }>;
    };
  };
  gameConfig?: {
    type: string;
  };
}
export interface MissionContent {
  sections?: Array<{
    type: string;
    title?: string;
    explanation?: string;
    examples?: string[];
    dialogues?: Array<{
      speaker: string;
      text: string;
      translation: string;
    }>;
    words?: Array<{
      word: string;
      translation: string;
      example?: string;
    }>;
  }>;
  practice?: {
    type: string;
    questions?: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
}

export interface MissionType {
  id: string;
  title: string;
  xpReward: number;
  type?: string;
  content: MissionContent;
  gameConfig?: {
    type: string;
  };
}
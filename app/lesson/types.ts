export interface Exercise {
  id: string;
  type: string;
  title?: string;
  config?: any;
  [key: string]: any;
}

export interface CommonExerciseProps {
  key: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export type ExerciseType =
  | "audio_matching"
  | "pronunciation"
  | "conjugation"
  | "sentence_formation"
  | "numbers_game"
  | "drag_drop"
  | "memory_game"
  | "matching"
  | "image_selection"
  | "listening_transcription"
  | "vocabulary"
  | "map_interactive"
  | "calendar_planner"
  | "dialogue_simulation";

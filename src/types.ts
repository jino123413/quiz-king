export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  emoji: string;
  color: string;
  questions: QuizQuestion[];
}

export type Grade = 'S' | 'A' | 'B' | 'C' | 'D';

export interface GradeInfo {
  grade: Grade;
  label: string;
  emoji: string;
  color: string;
  minScore: number;
}

export type Screen = 'home' | 'quiz' | 'result' | 'review';

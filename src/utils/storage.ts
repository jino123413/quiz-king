const STORAGE_KEY = 'quiz-king-data';

interface StorageData {
  streak: number;
  lastPlayDate: string;
  totalPlays: number;
  categoryBest: Record<string, number>;
  wrongAnswers: WrongAnswer[];
}

export interface WrongAnswer {
  categoryId: string;
  questionId: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  date: string;
}

function load(): StorageData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : { streak: 0, lastPlayDate: '', totalPlays: 0, categoryBest: {}, wrongAnswers: [] };
  } catch {
    return { streak: 0, lastPlayDate: '', totalPlays: 0, categoryBest: {}, wrongAnswers: [] };
  }
}

function save(data: StorageData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function recordPlay(categoryId: string, score: number, wrongs: WrongAnswer[]) {
  const data = load();
  const today = new Date().toISOString().slice(0, 10);

  if (data.lastPlayDate === today) {
    // already played today, just update scores
  } else {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    data.streak = data.lastPlayDate === yesterday ? data.streak + 1 : 1;
    data.lastPlayDate = today;
  }

  data.totalPlays += 1;

  const prev = data.categoryBest[categoryId] ?? 0;
  if (score > prev) data.categoryBest[categoryId] = score;

  // keep only latest 50 wrong answers
  data.wrongAnswers = [...wrongs, ...data.wrongAnswers].slice(0, 50);

  save(data);
}

export function getStreak(): number {
  const data = load();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (data.lastPlayDate === today || data.lastPlayDate === yesterday) return data.streak;
  return 0;
}

export function getTotalPlays(): number {
  return load().totalPlays;
}

export function getCategoryBest(): Record<string, number> {
  return load().categoryBest;
}

export function getWrongAnswers(): WrongAnswer[] {
  return load().wrongAnswers;
}

export function hasPlayedBefore(): boolean {
  return load().totalPlays > 0;
}

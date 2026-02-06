import { QuizCategory } from '../types';
import { generalQuestions } from './general';
import { englishQuestions } from './english';
import { spellingQuestions } from './spelling';
import { hanjaQuestions } from './hanja';
import { currentQuestions } from './current';

export const categories: QuizCategory[] = [
  {
    id: 'general',
    title: '일반상식',
    subtitle: '세상을 아는 힘',
    icon: 'ri-lightbulb-line',
    emoji: '🧠',
    color: '#F59E0B',
    questions: generalQuestions,
  },
  {
    id: 'english',
    title: '영단어',
    subtitle: '매일 쓰는 영어',
    icon: 'ri-translate-2',
    emoji: '📚',
    color: '#3B82F6',
    questions: englishQuestions,
  },
  {
    id: 'spelling',
    title: '맞춤법',
    subtitle: '되 vs 돼, 확실히 구분하기',
    icon: 'ri-pencil-line',
    emoji: '✍️',
    color: '#10B981',
    questions: spellingQuestions,
  },
  {
    id: 'hanja',
    title: '한자',
    subtitle: '한자로 넓히는 어휘력',
    icon: 'ri-ancient-gate-line',
    emoji: '🏯',
    color: '#EF4444',
    questions: hanjaQuestions,
  },
  {
    id: 'current',
    title: '시사',
    subtitle: '요즘 세상 얼마나 알아?',
    icon: 'ri-newspaper-line',
    emoji: '📰',
    color: '#8B5CF6',
    questions: currentQuestions,
  },
];

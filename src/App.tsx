import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Screen } from './types';
import { categories } from './data/categories';
import {
  recordPlay,
  getStreak,
  getTotalPlays,
  getCategoryBest,
  getWrongAnswers,
  hasPlayedBefore as checkHasPlayed,
  WrongAnswer,
} from './utils/storage';
import { useInterstitialAd } from './hooks/useInterstitialAd';
import HomeScreen from './components/HomeScreen';
import QuizScreen, { WrongAnswerData } from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import ReviewScreen from './components/ReviewScreen';

function shuffleAndPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const QUESTIONS_PER_SESSION = 10;

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [sessionWrongs, setSessionWrongs] = useState<WrongAnswerData[]>([]);
  const [gradeTableUnlocked, setGradeTableUnlocked] = useState(false);
  const [reviewUnlocked, setReviewUnlocked] = useState(false);

  const [streak, setStreak] = useState(getStreak());
  const [totalPlays, setTotalPlays] = useState(getTotalPlays());
  const [categoryBest, setCategoryBest] = useState(getCategoryBest());
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>(getWrongAnswers());
  const [everPlayed, setEverPlayed] = useState(checkHasPlayed());

  const { loading: adLoading, showInterstitialAd } = useInterstitialAd();

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === currentCategoryId) || null,
    [currentCategoryId]
  );

  useEffect(() => {
    if (screen === 'home') {
      setStreak(getStreak());
      setTotalPlays(getTotalPlays());
      setCategoryBest(getCategoryBest());
      setWrongAnswers(getWrongAnswers());
      setEverPlayed(checkHasPlayed());
    }
  }, [screen]);

  const startGame = useCallback(
    (categoryId: string) => {
      const cat = categories.find((c) => c.id === categoryId);
      if (!cat) return;
      const picked = shuffleAndPick(cat.questions, QUESTIONS_PER_SESSION);
      setCurrentCategoryId(categoryId);
      setSessionQuestions(picked);
      setScore(0);
      setSessionWrongs([]);
      setGradeTableUnlocked(false);
      setScreen('quiz');
    },
    []
  );

  const handleSelectCategory = useCallback(
    (categoryId: string) => {
      const hasPlayedThisCategory = categoryBest[categoryId] !== undefined;
      if (hasPlayedThisCategory) {
        showInterstitialAd({ onDismiss: () => startGame(categoryId) });
      } else {
        startGame(categoryId);
      }
    },
    [categoryBest, showInterstitialAd, startGame]
  );

  const handleQuizComplete = useCallback(
    (finalScore: number, wrongs: WrongAnswerData[]) => {
      setScore(finalScore);
      setSessionWrongs(wrongs);

      if (currentCategoryId) {
        const wrongEntries: WrongAnswer[] = wrongs.map((w) => ({
          categoryId: currentCategoryId,
          questionId: w.questionId,
          question: w.question,
          userAnswer: w.userAnswer,
          correctAnswer: w.correctAnswer,
          explanation: w.explanation,
          date: new Date().toISOString().slice(0, 10),
        }));
        recordPlay(currentCategoryId, finalScore, wrongEntries);
        setEverPlayed(true);
      }

      setScreen('result');
    },
    [currentCategoryId]
  );

  const handleRetake = useCallback(() => {
    if (!currentCategoryId) return;
    startGame(currentCategoryId);
  }, [currentCategoryId, startGame]);

  const handleNewCategory = useCallback(() => {
    if (everPlayed) {
      showInterstitialAd({
        onDismiss: () => {
          setCurrentCategoryId(null);
          setScreen('home');
        },
      });
    } else {
      setCurrentCategoryId(null);
      setScreen('home');
    }
  }, [everPlayed, showInterstitialAd]);

  const handleViewGradeTable = useCallback(() => {
    showInterstitialAd({
      onDismiss: () => setGradeTableUnlocked(true),
    });
  }, [showInterstitialAd]);

  const handleOpenReview = useCallback(() => {
    setWrongAnswers(getWrongAnswers());
    setScreen('review');
  }, []);

  const handleUnlockReview = useCallback(() => {
    showInterstitialAd({
      onDismiss: () => setReviewUnlocked(true),
    });
  }, [showInterstitialAd]);

  const handleBackToHome = useCallback(() => {
    setCurrentCategoryId(null);
    setScreen('home');
  }, []);

  return (
    <div className="app">
      {screen === 'home' && (
        <HomeScreen
          categories={categories}
          streak={streak}
          totalPlays={totalPlays}
          categoryBest={categoryBest}
          onSelectCategory={handleSelectCategory}
          onOpenReview={handleOpenReview}
          hasWrongAnswers={wrongAnswers.length > 0}
        />
      )}
      {screen === 'quiz' && currentCategory && (
        <QuizScreen
          category={currentCategory}
          questions={sessionQuestions}
          onComplete={handleQuizComplete}
          onBack={handleBackToHome}
        />
      )}
      {screen === 'result' && currentCategory && (
        <ResultScreen
          category={currentCategory}
          score={score}
          totalQuestions={QUESTIONS_PER_SESSION}
          onRetake={handleRetake}
          onNewCategory={handleNewCategory}
          onViewGradeTable={handleViewGradeTable}
          adLoading={adLoading}
          hasPlayedBefore={everPlayed}
          gradeTableUnlocked={gradeTableUnlocked}
        />
      )}
      {screen === 'review' && (
        <ReviewScreen
          wrongAnswers={wrongAnswers}
          onBack={handleBackToHome}
          unlocked={reviewUnlocked}
          onUnlock={handleUnlockReview}
          adLoading={adLoading}
        />
      )}
    </div>
  );
};

export default App;

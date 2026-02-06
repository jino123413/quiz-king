import React, { useState, useCallback, useRef, useEffect } from 'react';
import { QuizQuestion, QuizCategory } from '../types';

export interface WrongAnswerData {
  questionId: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
}

interface QuizScreenProps {
  category: QuizCategory;
  questions: QuizQuestion[];
  onComplete: (score: number, wrongAnswers: WrongAnswerData[]) => void;
  onBack: () => void;
}

type FeedbackState = {
  selectedIndex: number;
  isCorrect: boolean;
} | null;

const QuizScreen: React.FC<QuizScreenProps> = ({
  category,
  questions,
  onComplete,
  onBack,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswerData[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [slideDirection, setSlideDirection] = useState<'in' | 'out' | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
        feedbackTimerRef.current = null;
      }
    };
  }, []);

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progressPercent = ((currentQuestion + (feedback ? 1 : 0)) / totalQuestions) * 100;

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (feedback !== null) return; // Already answered

      const isCorrect = optionIndex === question.answer;
      let newScore = score;
      let newWrongAnswers = wrongAnswers;

      if (isCorrect) {
        newScore = score + 1;
        setScore(newScore);
      } else {
        const wrongData: WrongAnswerData = {
          questionId: question.id,
          question: question.question,
          userAnswer: question.options[optionIndex],
          correctAnswer: question.options[question.answer],
          explanation: question.explanation,
        };
        newWrongAnswers = [...wrongAnswers, wrongData];
        setWrongAnswers(newWrongAnswers);
      }

      setFeedback({ selectedIndex: optionIndex, isCorrect });

      // Clear any existing timer
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }

      feedbackTimerRef.current = setTimeout(() => {
        const nextIndex = currentQuestion + 1;

        if (nextIndex >= totalQuestions) {
          onComplete(newScore, newWrongAnswers);
          return;
        }

        setSlideDirection('out');
        setTimeout(() => {
          setCurrentQuestion(nextIndex);
          setFeedback(null);
          setSlideDirection('in');
          setTimeout(() => {
            setSlideDirection(null);
          }, 300);
        }, 200);
      }, 1500);
    },
    [feedback, question, score, wrongAnswers, currentQuestion, totalQuestions, onComplete],
  );

  const getOptionClassName = (optionIndex: number): string => {
    if (!feedback) return 'quiz-option';

    if (optionIndex === question.answer) {
      return 'quiz-option quiz-option-correct';
    }
    if (optionIndex === feedback.selectedIndex && !feedback.isCorrect) {
      return 'quiz-option quiz-option-wrong';
    }
    return 'quiz-option quiz-option-disabled';
  };

  const questionContainerClass = [
    'quiz-question-container',
    slideDirection === 'out' ? 'slide-out' : '',
    slideDirection === 'in' ? 'slide-in' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <button className="back-button" onClick={onBack}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <div className="quiz-header-info">
          <span className="quiz-header-emoji">{category.emoji}</span>
          <span className="quiz-header-title">{category.title}</span>
        </div>
      </div>

      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className={questionContainerClass}>
        <p className="quiz-question-number">
          Q{currentQuestion + 1}. {currentQuestion + 1}/{totalQuestions}
        </p>

        <h2 className="quiz-question-text">{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClassName(index)}
              onClick={() => handleSelectOption(index)}
              disabled={feedback !== null}
            >
              <span className="quiz-option-label">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="quiz-option-text">{option}</span>
              {feedback && index === question.answer && (
                <i className="ri-checkbox-circle-fill quiz-option-icon-correct"></i>
              )}
              {feedback &&
                index === feedback.selectedIndex &&
                !feedback.isCorrect && (
                  <i className="ri-close-circle-fill quiz-option-icon-wrong"></i>
                )}
            </button>
          ))}
        </div>

        {feedback && (
          <div
            className={`quiz-feedback ${feedback.isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-wrong'}`}
          >
            {feedback.isCorrect ? (
              <p className="quiz-feedback-text">⭕ 정답!</p>
            ) : (
              <>
                <p className="quiz-feedback-text">❌ 오답</p>
                <p className="quiz-feedback-explanation">
                  {question.explanation}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;

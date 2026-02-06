import React from 'react';
import { QuizCategory } from '../types';

interface HomeScreenProps {
  categories: QuizCategory[];
  streak: number;
  totalPlays: number;
  categoryBest: Record<string, number>;
  onSelectCategory: (categoryId: string) => void;
  onOpenReview: () => void;
  hasWrongAnswers: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  categories,
  streak,
  totalPlays,
  categoryBest,
  onSelectCategory,
  onOpenReview,
  hasWrongAnswers,
}) => {
  return (
    <div className="home-screen">
      <div className="home-header">
        <h1 className="home-title">상식왕</h1>
        <p className="home-subtitle">매일 5분, 상식 레벨업</p>
        {streak > 0 && (
          <span className="streak-badge">🔥 {streak}일 연속</span>
        )}
      </div>

      {totalPlays > 0 && (
        <p className="total-plays-text">총 {totalPlays}번 도전했어요</p>
      )}

      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-card"
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="category-card-left">
              <span className="category-emoji">{category.emoji}</span>
              <div className="category-info">
                <span className="category-title">{category.title}</span>
                <span className="category-subtitle">{category.subtitle}</span>
              </div>
            </div>
            <div className="category-card-right">
              {categoryBest[category.id] !== undefined && (
                <span className="category-best-badge">
                  최고 {categoryBest[category.id]}/10
                </span>
              )}
              <i className="ri-arrow-right-s-line category-arrow"></i>
            </div>
          </button>
        ))}
      </div>

      {hasWrongAnswers && (
        <button className="btn-secondary review-button" onClick={onOpenReview}>
          <i className="ri-book-mark-line"></i>
          오답 노트
        </button>
      )}

      <p className="home-footer-text">매일 퀴즈를 풀고 상식왕이 되어보세요</p>
    </div>
  );
};

export default HomeScreen;

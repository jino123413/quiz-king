import React from 'react';
import { WrongAnswer } from '../utils/storage';

interface ReviewScreenProps {
  wrongAnswers: WrongAnswer[];
  onBack: () => void;
  unlocked: boolean;
  onUnlock: () => void;
  adLoading: boolean;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({
  wrongAnswers,
  onBack,
  unlocked,
  onUnlock,
  adLoading,
}) => {
  return (
    <div className="review-screen">
      <div className="review-header">
        <button className="back-button" onClick={onBack}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <h2 className="review-header-title">
          <i className="ri-book-mark-line"></i>
          오답 노트
        </h2>
      </div>

      {!unlocked ? (
        <div className="locked-card">
          <div className="locked-preview">
            <i className="ri-lock-line"></i>
            <p className="locked-title">오답 노트</p>
            <p className="locked-desc">틀린 문제의 해설을 확인해보세요</p>
          </div>
          <button
            className="btn-unlock"
            onClick={onUnlock}
            disabled={adLoading}
          >
            <span className="ad-badge">AD</span>
            {adLoading ? '로딩 중...' : '오답 노트 열기'}
          </button>
          <p className="ad-notice">광고 시청 후 오답 노트를 확인합니다</p>
        </div>
      ) : wrongAnswers.length === 0 ? (
        <div className="review-empty">
          <div className="review-empty-icon">
            <i className="ri-checkbox-circle-line"></i>
          </div>
          <p className="review-empty-text">아직 틀린 문제가 없어요!</p>
        </div>
      ) : (
        <div className="wrong-answer-list">
          {wrongAnswers.map((item, index) => (
            <div key={`${item.categoryId}-${item.questionId}-${index}`} className="wrong-answer-card">
              <p className="wrong-answer-question">{item.question}</p>
              <div className="wrong-answer-answers">
                <div className="wrong-answer-row wrong-answer-user">
                  <i className="ri-close-circle-line"></i>
                  <span className="wrong-answer-label">내 답:</span>
                  <span className="wrong-answer-value">{item.userAnswer}</span>
                </div>
                <div className="wrong-answer-row wrong-answer-correct">
                  <i className="ri-checkbox-circle-line"></i>
                  <span className="wrong-answer-label">정답:</span>
                  <span className="wrong-answer-value">{item.correctAnswer}</span>
                </div>
              </div>
              <div className="wrong-answer-explanation">
                <p>{item.explanation}</p>
              </div>
              <span className="wrong-answer-date">{item.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewScreen;

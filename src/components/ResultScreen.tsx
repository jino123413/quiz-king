import React from 'react';
import { QuizCategory, GradeInfo } from '../types';

interface ResultScreenProps {
  category: QuizCategory;
  score: number;
  totalQuestions: number;
  onRetake: () => void;
  onNewCategory: () => void;
  onViewGradeTable: () => void;
  adLoading: boolean;
  hasPlayedBefore: boolean;
  gradeTableUnlocked: boolean;
}

const GRADES: GradeInfo[] = [
  { grade: 'S', label: '상식왕', emoji: '\u{1F451}', color: '#F59E0B', minScore: 10 },
  { grade: 'A', label: '박학다식', emoji: '\u{1F31F}', color: '#3B82F6', minScore: 8 },
  { grade: 'B', label: '평균 이상', emoji: '\u{1F4D6}', color: '#10B981', minScore: 6 },
  { grade: 'C', label: '분발 필요', emoji: '\u{1F4AA}', color: '#F97316', minScore: 4 },
  { grade: 'D', label: '입문자', emoji: '\u{1F331}', color: '#EF4444', minScore: 0 },
];

function getGrade(score: number): GradeInfo {
  for (const g of GRADES) {
    if (score >= g.minScore) return g;
  }
  return GRADES[GRADES.length - 1];
}

function getScoreRangeLabel(grade: GradeInfo, index: number): string {
  const next = GRADES[index - 1];
  if (grade.minScore === 10) return '10/10';
  if (grade.minScore === 0) return '0~3/10';
  const max = next ? next.minScore - 1 : 10;
  return `${grade.minScore}~${max}/10`;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  category,
  score,
  totalQuestions,
  onRetake,
  onNewCategory,
  onViewGradeTable,
  adLoading,
  hasPlayedBefore,
  gradeTableUnlocked,
}) => {
  const gradeInfo = getGrade(score);
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="result-screen">
      <div className="result-card">
        <div className="result-category-emoji">{category.emoji}</div>
        <h2 className="result-category-title">{category.title} 결과</h2>

        <div className="score-display">
          <span className="score-value" style={{ color: gradeInfo.color }}>
            {score}
          </span>
          <span className="score-separator">/</span>
          <span className="score-total">{totalQuestions}</span>
        </div>

        <div className="grade-badge" style={{ background: gradeInfo.color }}>
          <span className="grade-emoji">{gradeInfo.emoji}</span>
          <span className="grade-letter">{gradeInfo.grade}등급</span>
          <span className="grade-divider">&mdash;</span>
          <span className="grade-label">{gradeInfo.label}</span>
        </div>

        <div className="score-bar-container">
          <div className="score-bar">
            <div
              className="score-bar-fill"
              style={{
                width: `${percentage}%`,
                background: gradeInfo.color,
              }}
            />
          </div>
          <span className="score-bar-label">{percentage}%</span>
        </div>
      </div>

      {/* Grade Table Section */}
      <div className="grade-table-section">
        {gradeTableUnlocked ? (
          <div className="grade-table-card">
            <h3 className="grade-table-title">
              <i className="ri-bar-chart-box-line"></i>
              상식왕 등급표
            </h3>
            <table className="grade-table">
              <thead>
                <tr>
                  <th>등급</th>
                  <th>점수</th>
                  <th>칭호</th>
                </tr>
              </thead>
              <tbody>
                {GRADES.map((g, idx) => (
                  <tr
                    key={g.grade}
                    className={g.grade === gradeInfo.grade ? 'grade-row-active' : ''}
                  >
                    <td>
                      <span className="grade-cell" style={{ color: g.color }}>
                        {g.emoji} {g.grade}
                      </span>
                    </td>
                    <td className="grade-range">{getScoreRangeLabel(g, idx)}</td>
                    <td className="grade-label-cell">{g.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="locked-card">
            <div className="locked-preview">
              <i className="ri-lock-line"></i>
              <p className="locked-title">상식왕 등급표</p>
              <p className="locked-desc">전체 등급을 확인해보세요</p>
            </div>
            <button
              className="btn-unlock"
              onClick={onViewGradeTable}
              disabled={adLoading}
            >
              <span className="ad-badge">AD</span>
              {adLoading ? '로딩 중...' : '등급표 보기'}
            </button>
            <p className="ad-notice">광고 시청 후 등급표를 확인합니다</p>
          </div>
        )}
      </div>

      {/* Button Group */}
      <div className="button-group">
        <button className="btn-secondary" onClick={onRetake}>
          <i className="ri-refresh-line"></i>
          같은 카테고리 다시 풀기
        </button>

        <button
          className="btn-primary"
          onClick={onNewCategory}
          disabled={hasPlayedBefore && adLoading}
        >
          {hasPlayedBefore && <span className="ad-badge">AD</span>}
          <i className="ri-arrow-right-line"></i>
          {hasPlayedBefore && adLoading ? '로딩 중...' : '다른 카테고리 도전'}
        </button>
        {hasPlayedBefore && (
          <p className="ad-notice">광고 시청 후 다른 카테고리를 시작합니다</p>
        )}
      </div>
    </div>
  );
};

export default ResultScreen;

import React, { useState } from 'react';
import FormattedText from '../common/FormattedText.jsx';

export default function StageLatihan({
  module,
  level,
  levelLabel,
  levelColor,
  answer,
  setAnswer,
  feedback,
  clearFeedback,
  checkLesson,
  setToast,
  progress,
  onNextStage,
}) {
  const [activeQIndex, setActiveQIndex] = useState(0);
  const [extraAnswers, setExtraAnswers] = useState({});
  const [extraFeedbacks, setExtraFeedbacks] = useState({});

  const questions = module.questions && module.questions.length > 0
    ? module.questions
    : [
        {
          id: `${module.id}-q1`,
          question: module.question,
          options: module.answers,
          answers: module.answers,
          correct: module.correct,
          explain: module.explain,
          explanations: module.explanations,
        },
      ];

  const currentQ = questions[activeQIndex] || questions[0];
  const isPrimary = activeQIndex === 0;

  // Selected answer for current question
  const currentAnswer = isPrimary ? answer : extraAnswers[activeQIndex];

  // Feedback for current question
  const currentFeedback = isPrimary ? feedback : extraFeedbacks[activeQIndex];

  // Handlers
  const handleSelectOption = (idx) => {
    if (isPrimary) {
      if (feedback === 'correct') return;
      setAnswer(idx);
    } else {
      if (extraFeedbacks[activeQIndex] === 'correct') return;
      setExtraAnswers(prev => ({ ...prev, [activeQIndex]: idx }));
      setExtraFeedbacks(prev => ({ ...prev, [activeQIndex]: undefined }));
    }
  };

  const handleCheck = () => {
    if (isPrimary) {
      checkLesson();
    } else {
      const selected = extraAnswers[activeQIndex];
      if (selected === undefined) {
        setToast('Pilih jawaban dulu, ya!');
        return;
      }
      const isRight = selected === currentQ.correct;
      setExtraFeedbacks(prev => ({
        ...prev,
        [activeQIndex]: isRight ? 'correct' : 'wrong',
      }));
      if (isRight) {
        setToast('Luar biasa! Latihan tambahan berhasil dijawab dengan tepat.');
      }
    }
  };

  const handleResetAnswer = () => {
    if (isPrimary) {
      setAnswer(undefined);
      clearFeedback();
      setToast('Silakan pilih jawaban yang baru.');
    } else {
      setExtraAnswers(prev => ({ ...prev, [activeQIndex]: undefined }));
      setExtraFeedbacks(prev => ({ ...prev, [activeQIndex]: undefined }));
    }
  };

  const isPrimaryCompleted = feedback === 'correct' || progress.completed;

  // Get explanation text tailored to the selected option
  const getExplanationText = () => {
    if (currentAnswer === undefined) return currentQ.explain || '';
    if (currentQ.explanations && currentQ.explanations[currentAnswer]) {
      return currentQ.explanations[currentAnswer];
    }
    return currentQ.explain || 'Evaluasi pilihanmu berdasarkan konsep materi yang telah dipelajari.';
  };

  return (
    <section className="challenge-card">
      {/* Challenge header */}
      <div className="challenge-heading">
        <span>04</span>
        <div>
          <span className="eyebrow">LATIHAN TERBIMBING</span>
          <h2>Sekarang giliranmu mencoba!</h2>
        </div>
        <span className="challenge-emoji">🎮</span>
      </div>

      <div style={{ margin: '8px 0 14px' }}>
        <FormattedText text={module.activity} />
      </div>

      {/* Level challenge box */}
      <div className={`level-challenge level-challenge-${levelColor}`}>
        <div className="level-challenge-label">{levelLabel}</div>
        <div style={{ marginTop: '4px' }}>
          <FormattedText text={(module.levels && module.levels[level]) || module.levels?.dasar} />
        </div>
      </div>

      <div className="quiz-divider" />

      {/* Question Selector Tabs (1 Utama + 4 Latihan Tambahan) */}
      {questions.length > 1 && (
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
            BANK SOAL TANTANGAN ({questions.length} SOAL):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {questions.map((q, idx) => {
              const isQPrimary = idx === 0;
              const isSolved = isQPrimary
                ? isPrimaryCompleted
                : extraFeedbacks[idx] === 'correct';
              const isActive = activeQIndex === idx;

              return (
                <button
                  key={q.id || idx}
                  type="button"
                  onClick={() => setActiveQIndex(idx)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    border: isActive
                      ? '2px solid var(--purple)'
                      : isSolved
                      ? '1px solid #2a9d5c'
                      : '1px solid var(--line)',
                    background: isActive
                      ? 'linear-gradient(135deg, #eeeaff, #f5f3ff)'
                      : isSolved
                      ? '#e3f8ed'
                      : '#fff',
                    color: isActive
                      ? 'var(--purple-dark)'
                      : isSolved
                      ? '#2a9d5c'
                      : 'var(--ink)',
                    cursor: 'pointer',
                    transition: 'all 0.16s ease',
                  }}
                >
                  {isSolved ? '✓ ' : ''}Soal {idx + 1} {isQPrimary ? '(Utama)' : ''}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz Header */}
      <div className="quiz-section-header">
        <div className="quiz-section-badge">
          {isPrimary ? 'SOAL EVALUASI UTAMA' : `LATIHAN PENGUATAN #${activeQIndex + 1}`}
        </div>
        <span>Soal {activeQIndex + 1} dari {questions.length}</span>
      </div>

      <div className="quiz-question-text" style={{ fontSize: '1.08rem', lineHeight: '1.65', margin: '14px 0 16px' }}>
        <FormattedText text={currentQ.question} />
      </div>

      {/* Answer Options */}
      <div className="answer-list">
        {(currentQ.options || currentQ.answers).map((a, i) => {
          const isSelected = currentAnswer === i;
          const isRight = currentFeedback === 'correct' && i === currentQ.correct;

          return (
            <button
              key={a}
              disabled={currentFeedback === 'correct'}
              className={[
                'answer-option',
                isSelected ? 'selected' : '',
                isRight ? 'answer-right' : '',
              ]
                .join(' ')
                .trim()}
              onClick={() => handleSelectOption(i)}
            >
              <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
              <span style={{ flex: 1, textAlign: 'left' }}>
                <FormattedText text={a} as="span" />
              </span>
              <span className="answer-check">{isSelected ? '✓' : ''}</span>
            </button>
          );
        })}
      </div>

      {/* Contextual Specific Feedback */}
      {currentFeedback && (
        <div className={`lesson-feedback ${currentFeedback === 'correct' ? 'good' : 'try'}`}>
          <div className="feedback-header">
            <span className="feedback-icon">{currentFeedback === 'correct' ? '🎉' : '🌱'}</span>
            <strong>
              {currentFeedback === 'correct'
                ? 'Jawaban tepat!'
                : currentAnswer !== undefined
                ? `Tanggapan untuk Pilihanmu (${String.fromCharCode(65 + currentAnswer)}):`
                : 'Belum tepat — coba lagi!'}
            </strong>
          </div>
          <div style={{ marginTop: '4px' }}>
            <FormattedText text={getExplanationText()} />
          </div>

          {currentFeedback !== 'correct' && currentQ.hint && (
            <div className="feedback-hint" style={{ marginTop: '8px' }}>
              💡 <strong>Petunjuk Bantuan:</strong>
              <div style={{ marginTop: '4px' }}>
                <FormattedText text={currentQ.hint} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quiz Actions */}
      <div className="quiz-actions">
        <button className="btn secondary" onClick={handleResetAnswer}>
          Pilih ulang
        </button>
        <button className="btn primary" onClick={handleCheck}>
          {currentFeedback === 'correct' ? 'Jawaban sudah tepat ✓' : 'Periksa jawabanku →'}
        </button>
      </div>

      {/* Completion & Next Stage Prompt for Primary Question */}
      {isPrimary && (
        <>
          {isPrimaryCompleted ? (
            <div className="quiz-next-prompt">
              <p>🎉 Hebat! Soal utama modul ini terjawab tepat (+20 poin). Tahap refleksi kini sudah terbuka!</p>
              <button className="btn primary" onClick={onNextStage}>
                Lanjut ke Refleksi Belajar →
              </button>
            </div>
          ) : (
            <div className="stage-lock-notice" style={{ marginTop: '16px' }}>
              <span>🔒 Jawab kuis utama di atas dengan benar untuk membuka tahap Refleksi Belajar.</span>
            </div>
          )}
        </>
      )}

      {progress.completed && !isPrimary && (
        <div className="completed-note" style={{ marginTop: '14px' }}>
          💡 Kamu sedang berlatih dengan soal pengayaan. Kamu bisa berpindah ke soal lain atau langsung melanjutkan ke tahap Refleksi.
        </div>
      )}
    </section>
  );
}

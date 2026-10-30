import React from 'react';

export default function LessonStepper({
  steps,
  currentStep,
  maxStep,
  progress,
  isStepUnlocked,
  onSelectStep,
  onAttemptLocked,
}) {
  return (
    <div className="lesson-stepper-wrap">
      <nav className="lesson-stepper" aria-label="Tahap pembelajaran">
        {steps.map((s, i) => {
          const isActive = currentStep === i;
          const isCompleted =
            progress.completed ||
            (i < currentStep && isStepUnlocked(i + 1));
          const isUnlocked = isStepUnlocked(i);

          return (
            <button
              key={s.id}
              type="button"
              className={[
                'stepper-item',
                isActive ? 'active' : '',
                isCompleted ? 'completed' : '',
                !isUnlocked ? 'locked' : '',
              ]
                .join(' ')
                .trim()}
              onClick={() => {
                if (isUnlocked) {
                  onSelectStep(i);
                } else {
                  onAttemptLocked(i);
                }
              }}
              aria-current={isActive ? 'step' : undefined}
              title={
                !isUnlocked
                  ? `${s.label} (Terkunci - selesaikan tahap sebelumnya)`
                  : `Buka ${s.label}`
              }
            >
              <div className={`stepper-dot ${!isUnlocked ? 'locked' : ''}`}>
                {!isUnlocked ? '🔒' : isCompleted && !isActive ? '✓' : i + 1}
              </div>
              <div className="stepper-label-wrap">
                <span className="stepper-kicker">Tahap 0{i + 1}</span>
                <span className="stepper-title">{s.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
      <div className="stepper-progress-wrap">
        <div className="stepper-progress-track">
          <div
            className="stepper-progress-fill"
            style={{
              width: `${Math.round(((currentStep + 1) / steps.length) * 100)}%`,
            }}
          />
        </div>
        <div className="stepper-progress-info">
          <span>
            Tahap {currentStep + 1} dari {steps.length} ·{' '}
            <strong>{steps[currentStep].label}</strong>
          </span>
          <strong>{Math.round(((currentStep + 1) / steps.length) * 100)}% selesai</strong>
        </div>
      </div>
    </div>
  );
}


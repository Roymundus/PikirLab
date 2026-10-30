import React from 'react';

export default function StageNavigation({
  currentStep,
  steps,
  moduleIndex,
  modulesCount,
  nextModuleName,
  canProceed,
  lockReason,
  onPrevStage,
  onNextStage,
  onNavigatePath,
  onOpenNextModule,
  onNavigateDashboard,
  setToast,
}) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  function handleNextClick() {
    if (!canProceed) {
      if (setToast && lockReason) setToast(lockReason);
      return;
    }
    if (!isLastStep) {
      onNextStage();
    } else if (moduleIndex < modulesCount - 1) {
      onOpenNextModule();
    } else {
      onNavigateDashboard();
    }
  }

  return (
    <div className="stage-navigation">
      <div className="stage-nav-left">
        {!isFirstStep ? (
          <button className="btn secondary" onClick={onPrevStage}>
            ← Kembali ke {steps[currentStep - 1].shortLabel}
          </button>
        ) : (
          <button className="btn secondary" onClick={onNavigatePath}>
            ← Jalur belajar
          </button>
        )}
      </div>

      <div className="stage-nav-center">
        <span className="stage-step-pill">
          Tahap {currentStep + 1} dari {steps.length} · {steps[currentStep].label}
        </span>
      </div>

      <div className="stage-nav-right">
        <button
          className={`btn primary stage-next-btn ${!canProceed ? 'locked' : ''}`}
          onClick={handleNextClick}
        >
          {!canProceed && '🔒 '}
          {!isLastStep
            ? `Lanjut: ${steps[currentStep + 1].shortLabel} →`
            : moduleIndex < modulesCount - 1
            ? `Lanjut ke Modul Berikutnya: ${nextModuleName} →`
            : 'Selesai! Lihat Progres di Dashboard 🏆'}
        </button>
      </div>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import { modules } from '../../data.js';
import LessonHero from '../lesson/LessonHero.jsx';
import LessonStepper from '../lesson/LessonStepper.jsx';
import StageNavigation from '../lesson/StageNavigation.jsx';
import StageKonsep from '../lesson/StageKonsep.jsx';
import StageContoh from '../lesson/StageContoh.jsx';
import StageSimulasi from '../lesson/StageSimulasi.jsx';
import StageLatihan from '../lesson/StageLatihan.jsx';
import StageRefleksi from '../lesson/StageRefleksi.jsx';

export default function Lesson({
  module,
  index,
  level,
  setLevel,
  progress,
  answer,
  setAnswer,
  feedback,
  clearFeedback,
  checkLesson,
  patchModule,
  openLesson,
  navigate,
  setToast,
}) {
  const [reflection, setReflection] = useState(progress.reflection || '');
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationPassed, setSimulationPassed] = useState(Boolean(progress.completed));
  const [isReflectionSaved, setIsReflectionSaved] = useState(
    Boolean(progress.reflection && progress.reflection.trim().length > 0)
  );

  useEffect(() => {
    setReflection(progress.reflection || '');
    setSimulationPassed(Boolean(progress.completed));
    setIsReflectionSaved(Boolean(progress.reflection && progress.reflection.trim().length > 0));
  }, [module.id, progress.completed, progress.reflection]);

  const levelInfo = {
    dasar:    'Bahasa santai, sederhana & bertahap dari nol',
    menengah: 'Studi kasus terstruktur dalam kegiatan harian & sekolah',
    lanjutan: 'Strategi efisiensi tinggi, kerja paralel & optimasi solusi',
  }[level] || 'Bahasa santai, sederhana & bertahap dari nol';

  const levelLabel =
    level === 'dasar'    ? '🌱 Tantangan Dasar'    :
    level === 'menengah' ? '⚡ Tantangan Menengah' :
                           '🚀 Tantangan Lanjutan';

  const levelColor =
    level === 'dasar'    ? 'mint'  :
    level === 'menengah' ? 'peach' : 'sky';

  const lessonSteps = [
    { id: 'konsep',   label: 'Konsep Utama',        shortLabel: 'Konsep',    emoji: '💡', kicker: '01' },
    { id: 'contoh',   label: 'Contoh Nyata',        shortLabel: 'Contoh',    emoji: '🏠', kicker: '02' },
    { id: 'simulasi', label: 'Simulasi Interaktif', shortLabel: 'Simulasi',  emoji: '⚙️', kicker: '03' },
    { id: 'latihan',  label: 'Latihan & Soal',      shortLabel: 'Latihan',   emoji: '🎮', kicker: '04' },
    { id: 'refleksi', label: 'Refleksi Belajar',    shortLabel: 'Refleksi',  emoji: '🌱', kicker: '05' },
  ];

  function handleLevelChange(newLevel) {
    if (setLevel) {
      setLevel(newLevel);
      setToast(`Penjelasan disesuaikan ke Jalur ${newLevel.charAt(0).toUpperCase() + newLevel.slice(1)} ✨`);
    }
  }

  // ── Validation & Gating for Current Stage ──────────────────
  let canProceed = true;
  let lockReason = '';

  if (currentStep === 2) {
    // Simulasi requires successful completion
    const isDone = simulationPassed || progress.completed;
    if (!isDone) {
      canProceed = false;
      lockReason = 'Selesaikan tantangan simulasi di atas dengan benar sebelum lanjut ke Latihan! ⚙️';
    }
  } else if (currentStep === 3) {
    // Latihan requires correct answer
    const isCorrect = feedback === 'correct' || progress.completed;
    if (!isCorrect) {
      canProceed = false;
      if (answer === undefined) {
        lockReason = 'Pilih jawaban kuis dan klik "Periksa jawabanku" terlebih dahulu! 🎮';
      } else {
        lockReason = 'Jawaban kuis belum tepat. Pilih jawaban yang benar sebelum lanjut ke Refleksi! 🌱';
      }
    }
  } else if (currentStep === 4) {
    // Refleksi requires saving
    const isDone = isReflectionSaved || Boolean(progress.reflection && progress.reflection.trim().length > 0);
    if (!isDone) {
      canProceed = false;
      lockReason = 'Tulis dan klik "Simpan refleksi" terlebih dahulu untuk menyelesaikan modul ini! 🌱';
    }
  }

  // ── Stepper Lock Rules ─────────────────────────────────────
  function isStepUnlocked(stepIndex) {
    if (progress.completed) return true;
    if (stepIndex <= currentStep) return true;
    if (stepIndex === 1) return true;
    if (stepIndex === 2) return true;
    if (stepIndex === 3) {
      return simulationPassed || progress.completed;
    }
    if (stepIndex === 4) {
      return (
        (simulationPassed || progress.completed) &&
        (feedback === 'correct' || progress.completed)
      );
    }
    return false;
  }

  function handleAttemptLocked(stepIndex) {
    if (stepIndex === 3) {
      setToast('Tahap Latihan masih terkunci 🔒 Selesaikan tantangan simulasi terlebih dahulu!');
    } else if (stepIndex === 4) {
      setToast('Tahap Refleksi masih terkunci 🔒 Jawab kuis di tahap Latihan dengan benar terlebih dahulu!');
    } else {
      setToast('Tahap ini masih terkunci 🔒 Selesaikan tahap sebelumnya terlebih dahulu.');
    }
  }

  function goToStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= lessonSteps.length) return;
    setCurrentStep(stepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSimulationComplete(success) {
    setSimulationPassed(success);
    if (success) {
      setToast('Simulasi berhasil diselesaikan! Tahap Latihan kini terbuka 🎉');
    }
  }

  return (
    <>
      {/* ── Topline & Breadcrumb ── */}
      <div className="lesson-topline">
        <button className="back-link" onClick={() => navigate('path')}>
          ← Kembali ke jalur belajar
        </button>
        <span>
          MODUL {index + 1} DARI {modules.length} · JALUR {level.toUpperCase()}
        </span>
      </div>

      {/* ── Stepper Navigator ── */}
      <LessonStepper
        steps={lessonSteps}
        currentStep={currentStep}
        progress={progress}
        isStepUnlocked={isStepUnlocked}
        onSelectStep={goToStep}
        onAttemptLocked={handleAttemptLocked}
      />

      {/* ── Hero Banner ── */}
      <LessonHero
        module={module}
        level={level}
        levelInfo={levelInfo}
        currentStep={currentStep}
        currentStepInfo={lessonSteps[currentStep]}
      />

      {/* ── Active Stage View ── */}
      {currentStep === 0 && (
        <StageKonsep
          module={module}
          level={level}
          onLevelChange={handleLevelChange}
        />
      )}

      {currentStep === 1 && (
        <StageContoh
          module={module}
          level={level}
          onLevelChange={handleLevelChange}
        />
      )}

      {currentStep === 2 && (
        <StageSimulasi
          module={module}
          simulationPassed={simulationPassed}
          onSimulationComplete={handleSimulationComplete}
          isModuleCompleted={progress.completed}
          onNextStage={() => goToStep(3)}
        />
      )}

      {currentStep === 3 && (
        <StageLatihan
          module={module}
          level={level}
          levelLabel={levelLabel}
          levelColor={levelColor}
          answer={answer}
          setAnswer={setAnswer}
          feedback={feedback}
          clearFeedback={clearFeedback}
          checkLesson={checkLesson}
          setToast={setToast}
          progress={progress}
          onNextStage={() => goToStep(4)}
        />
      )}

      {currentStep === 4 && (
        <StageRefleksi
          module={module}
          reflection={reflection}
          setReflection={setReflection}
          patchModule={patchModule}
          setToast={setToast}
          progress={progress}
          isReflectionSaved={isReflectionSaved}
          setIsReflectionSaved={setIsReflectionSaved}
        />
      )}

      {/* ── Bottom Stage Navigation ── */}
      <StageNavigation
        currentStep={currentStep}
        steps={lessonSteps}
        moduleIndex={index}
        modulesCount={modules.length}
        nextModuleName={index < modules.length - 1 ? modules[index + 1].title : ''}
        canProceed={canProceed}
        lockReason={lockReason}
        onPrevStage={() => goToStep(currentStep - 1)}
        onNextStage={() => goToStep(currentStep + 1)}
        onNavigatePath={() => navigate('path')}
        onOpenNextModule={() => openLesson(modules[index + 1].id)}
        onNavigateDashboard={() => navigate('dashboard')}
        setToast={setToast}
      />
    </>
  );
}

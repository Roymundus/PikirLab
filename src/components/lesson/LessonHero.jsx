import React from 'react';

export default function LessonHero({ module, level, levelInfo, currentStep, currentStepInfo }) {
  const tagline = (module.contentByLevel && module.contentByLevel[level]?.tagline) || module.tagline;

  const levelBadges = {
    dasar:    { icon: '🌱', label: 'Jalur Dasar' },
    menengah: { icon: '⚡', label: 'Jalur Menengah' },
    lanjutan: { icon: '🚀', label: 'Jalur Lanjutan' },
  };

  return (
    <div className={`lesson-hero ${module.color}`}>
      <span className="lesson-emoji">{module.emoji}</span>
      <div className="lesson-hero-body">
        <div className="lesson-hero-badges">
          <span className="hero-eyebrow-pill">{levelInfo}</span>
          <span className={`content-level-badge ${level}`}>
            {levelBadges[level]?.icon} {levelBadges[level]?.label}
          </span>
          <span className="hero-stage-badge">
            <span>{currentStepInfo.emoji}</span>
            Tahap {currentStep + 1} dari 5: <strong>{currentStepInfo.label}</strong>
          </span>
        </div>
        <h1>{module.title}</h1>
        <p className="lesson-hero-tagline">{tagline}</p>
      </div>
      <div className="lesson-step">
        {module.number}
        <small>/04</small>
      </div>
    </div>
  );
}

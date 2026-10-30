import React from 'react';

export default function ModuleCard({ module, progress, onOpen }) {
  return (
    <article className={`module-card ${module.color}`}>
      <div className="module-card-top">
        <span className="module-icon">{module.emoji}</span>
        <span className={`status-chip ${progress.completed ? 'done' : ''}`}>
          {progress.completed ? '✓ Beres!' : `Konsep ${module.number}`}
        </span>
      </div>
      <h3>{module.title}</h3>
      <p>{module.tagline}</p>
      <div className="module-card-bottom">
        <span>{progress.completed ? 'Nilai terbaik: 100/100' : 'Materi + simulasi + latihan'}</span>
        <button onClick={onOpen}>{progress.completed ? 'Ulangi' : 'Mulai'} <span>→</span></button>
      </div>
    </article>
  );
}


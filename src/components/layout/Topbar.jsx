import React from 'react';

export default function Topbar({ points, onNavigateHome, onReset }) {
  return (
    <header className="topbar">
      <button className="brand button-reset" onClick={onNavigateHome} aria-label="Ke beranda">
        <span className="brand-mark">🧠</span>
        <span>
          <strong>PikirLab</strong>
          <small>Petualangan Berpikir Komputasional</small>
        </span>
      </button>
      <div className="top-actions">
        <span className="points-pill">✨ {points} poin</span>
        <button className="reset-button" onClick={onReset}>↻ Reset</button>
      </div>
    </header>
  );
}


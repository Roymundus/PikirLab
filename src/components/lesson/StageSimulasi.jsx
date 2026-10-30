import React from 'react';
import Simulation from './Simulation.jsx';

export default function StageSimulasi({ module, simulationPassed, onSimulationComplete, isModuleCompleted, onNextStage }) {
  const isDone = simulationPassed || isModuleCompleted;

  return (
    <div className="stage-simulasi-container">
      <Simulation
        module={module}
        onComplete={onSimulationComplete}
        isCompleted={isDone}
      />

      {isDone ? (
        <div className="simulation-success-banner">
          <span>🎉</span>
          <div>
            <strong>Simulasi Berhasil Diselesaikan!</strong>
            <p>
              Kerja bagus! Kamu sudah membuktikan kemampuanmu di lab simulasi ini. Sekarang tahap Latihan & Soal sudah terbuka.
            </p>
            <button className="btn primary" style={{ marginTop: '10px' }} onClick={onNextStage}>
              Lanjut ke Latihan & Soal ➔
            </button>
          </div>
        </div>
      ) : (
        <div className="simulation-hint-banner">
          <span>💡</span>
          <div>
            <strong>Selesaikan Tantangan Simulasi</strong>
            <p>Selesaikan tugas simulasi di atas dengan benar untuk dapat membuka tahap Latihan & Soal.</p>
          </div>
        </div>
      )}
    </div>
  );
}


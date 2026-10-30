import React from 'react';
import { modules } from '../../data.js';
import PageHeading from '../common/PageHeading.jsx';
import Stat from '../common/Stat.jsx';
import ModuleCard from '../common/ModuleCard.jsx';

function moduleProgress(progress, id) {
  return progress[id] || { completed: false, bestScore: null, attempts: 0, reflection: '' };
}

export default function Dashboard({ state, completedCount, totalProgress, openLesson, startDiagnostic }) {
  const badges = [
    { emoji: '🌱', title: 'Berani Mulai',     desc: 'Selesaikan satu modul',          unlocked: completedCount >= 1 },
    { emoji: '🧭', title: 'Penjelajah',        desc: 'Selesaikan asesmen awal',        unlocked: state.diagnostic.completed },
    { emoji: '🔁', title: 'Pantang Menyerah',  desc: 'Coba latihan lebih dari sekali', unlocked: state.attempts >= 2 },
    { emoji: '🏆', title: 'Penjelajah Tuntas', desc: 'Selesaikan empat modul',         unlocked: completedCount === 4 },
  ];

  return (
    <>
      <PageHeading
        eyebrow="PUSAT PERJALANANMU"
        title="Dashboard belajar"
        subtitle="Lihat progresmu. Setiap langkah kecil tetap berarti!"
      />

      <section className="progress-feature">
        <div className="progress-feature-copy">
          <span className="eyebrow">PROGRES PETUALANGAN</span>
          <h2>Kamu sudah menyelesaikan <span>{completedCount} dari 4</span> modul.</h2>
          <p>Pelan-pelan aja. Yang penting, terus bergerak maju.</p>
          <div className="progress-track">
            <div style={{ width: `${totalProgress}%` }} />
          </div>
          <div className="progress-labels">
            <span>Progres keseluruhan</span>
            <strong>{totalProgress}%</strong>
          </div>
        </div>
        <div className="progress-mascot">
          {completedCount === 4 ? '🏆' : completedCount > 0 ? '🚀' : '🌱'}
        </div>
      </section>

      <div className="stats-grid">
        <Stat icon="✨" label="Poin terkumpul"    value={state.points} />
        <Stat icon="📚" label="Modul selesai"     value={`${completedCount}/4`} />
        <Stat icon="🎮" label="Percobaan latihan" value={state.attempts} />
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">LANJUTKAN DARI SINI</span>
          <h2>Modulmu</h2>
          <p>Pilih modul untuk belajar ulang atau lanjut ke konsep berikutnya.</p>
        </div>
      </div>
      <div className="module-grid">
        {modules.map(m => (
          <ModuleCard
            key={m.id}
            module={m}
            progress={moduleProgress(state.progress, m.id)}
            onOpen={() => openLesson(m.id)}
          />
        ))}
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">KOLEKSI PENCAPAIAN</span>
          <h2>Lencana kamu</h2>
        </div>
      </div>
      <div className="badge-grid">
        {badges.map(b => (
          <div className={`badge-card ${b.unlocked ? '' : 'locked'}`} key={b.title}>
            <span>{b.emoji}</span>
            <div>
              <strong>{b.title}</strong>
              <p>{b.desc}</p>
            </div>
            {b.unlocked && <b>✓</b>}
          </div>
        ))}
      </div>

      {!state.diagnostic.completed && (
        <div className="inline-prompt">
          <span>🧭</span>
          <div>
            <strong>Belum ikut asesmen awal?</strong>
            <p>Jawab 4 pertanyaan supaya kamu punya rekomendasi jalur belajar yang tepat.</p>
          </div>
          <button className="btn soft" onClick={startDiagnostic}>Mulai asesmen →</button>
        </div>
      )}
    </>
  );
}


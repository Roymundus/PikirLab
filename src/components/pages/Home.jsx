import React from 'react';
import { modules } from '../../data.js';
import ModuleCard from '../common/ModuleCard.jsx';

function moduleProgress(progress, id) {
  return progress[id] || { completed: false, bestScore: null, attempts: 0, reflection: '' };
}

export default function Home({ state, completedCount, openLesson, navigate, startDiagnostic }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">BELAJAR SAMBIL BERTUALANG</span>
          <h1>Masalah besar?<br /><span>Kita pecahkan</span> satu-satu!</h1>
          <p>
            Yuk, belajar cara berpikir yang bikin masalah terasa lebih mudah. Kita pakai contoh
            fenomena kehidupan sehari-hari dan kegiatan nyata di sekitar kita.
          </p>
          <div className="button-row">
            <button
              className="btn primary"
              onClick={() => state.diagnostic.completed ? navigate('path') : startDiagnostic()}
            >
              {state.diagnostic.completed ? 'Lanjutkan petualangan' : 'Mulai petualangan'} <span>→</span>
            </button>
            <button className="btn secondary" onClick={() => navigate('dashboard')}>Lihat progres</button>
          </div>
          <div className="hero-social-proof">
            <span>🧩</span><span>🔎</span><span>🎯</span><span>🪜</span>
            <small>4 konsep · materi lengkap · simulasi interaktif</small>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-emoji">🧠</div>
          <span className="float-chip chip-one">💡 Konsep</span>
          <span className="float-chip chip-two">⚙️ Simulasi</span>
          <span className="float-chip chip-three">✨ Latihan</span>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <span className="eyebrow">KENALAN DULU, YUK</span>
          <h2>Empat kekuatan pemecah masalah</h2>
          <p>Setiap modul punya materi lengkap, simulasi, dan latihan soal.</p>
        </div>
        <span className="section-count">{completedCount}/4 selesai</span>
      </div>
      <div className="module-grid home-modules">
        {modules.map(m => (
          <ModuleCard
            key={m.id}
            module={m}
            progress={moduleProgress(state.progress, m.id)}
            onOpen={() => openLesson(m.id)}
          />
        ))}
      </div>

      <section className="growth-callout">
        <span className="callout-icon">🌱</span>
        <div>
          <strong>Mode bertumbuh: aktif!</strong>
          <p>Nggak apa-apa kalau jawabanmu belum tepat. Yang penting, kamu tahu kenapa dan mencoba strategi yang lebih baik.</p>
        </div>
        <span className="sparkle">✦</span>
      </section>

      <section className="quick-start">
        <div>
          <span className="eyebrow">BELUM TAHU MULAI DARI MANA?</span>
          <h2>Tenang, kita cari titik awalmu.</h2>
          <p>Jawab 4 pertanyaan singkat. Tidak ada nilai — hasilnya cuma membantu memilih jalur belajar yang paling cocok untukmu.</p>
        </div>
        <button className="btn primary" onClick={startDiagnostic}>Coba asesmen awal →</button>
      </section>
    </>
  );
}


import React from 'react';
import { modules } from '../../data.js';
import PageHeading from '../common/PageHeading.jsx';

function moduleProgress(progress, id) {
  return progress[id] || { completed: false, bestScore: null, attempts: 0, reflection: '' };
}

export default function Path({ state, setState, openLesson }) {
  const levels = [
    { id: 'dasar',    emoji: '🌱', title: 'Dasar',    label: 'Mulai pelan-pelan', text: 'Bahasa santai & sederhana, analogi dekat (seperti pizza & mie instan), bekal amunisi bertahap.' },
    { id: 'menengah', emoji: '⚡', title: 'Menengah', label: 'Aku siap mencoba',  text: 'Penerapan konsep terstruktur dengan studi kasus nyata kegiatan harian dan proyek sekolah.' },
    { id: 'lanjutan', emoji: '🚀', title: 'Lanjutan', label: 'Tantang aku!',      text: 'Strategi efisiensi tinggi, kerja paralel, pemetaan ketergantungan urutan, dan optimasi solusi.' },
  ];

  return (
    <>
      <PageHeading
        eyebrow="PILIH CARA BELAJARMU"
        title="Jalur belajar"
        subtitle="Semua jalur mempelajari empat konsep yang sama. Bedanya ada di kedalaman dan tingkat tantangannya."
      />

      <div className="recommendation-banner">
        <span>🧭</span>
        <div>
          {state.diagnostic.completed ? (
            <>
              <strong>Rekomendasi dari asesmen: jalur {state.diagnostic.recommendedLevel}.</strong>
              <p>Skor awalmu {state.diagnostic.score}/100. Ini titik awal saja, bukan label kemampuan. Kamu boleh memilih jalur lain kapan saja.</p>
            </>
          ) : (
            <>
              <strong>Belum ikut asesmen? Nggak masalah.</strong>
              <p>Kamu bisa mulai dari jalur dasar atau memilih tingkat tantangan sendiri sesuai rasa percaya dirimu.</p>
            </>
          )}
        </div>
      </div>

      <div className="level-grid">
        {levels.map(l => (
          <button
            key={l.id}
            className={`level-card ${state.level === l.id ? 'selected' : ''}`}
            onClick={() => setState(prev => ({ ...prev, level: l.id }))}
          >
            <div className="level-card-top">
              <span>{l.emoji}</span>
              {state.level === l.id && <b>✓ Dipilih</b>}
            </div>
            <h3>Jalur {l.title}</h3>
            <strong>{l.label}</strong>
            <p>{l.text}</p>
          </button>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">PETA PETUALANGAN</span>
          <h2>Urutan modul</h2>
          <p>Ikuti urutannya atau buka konsep yang ingin kamu ulangi.</p>
        </div>
      </div>
      <div className="path-list">
        {modules.map(m => {
          const mp = moduleProgress(state.progress, m.id);
          return (
            <div className="path-row" key={m.id}>
              <div className={`path-number ${m.color}`}>{m.emoji}</div>
              <div className="path-row-copy">
                <span>MODUL {m.number}</span>
                <strong>{m.title}</strong>
                <p>{m.tagline}</p>
              </div>
              <span className={`path-status ${mp.completed ? 'done' : ''}`}>
                {mp.completed ? '✓ Selesai' : 'Belum dipelajari'}
              </span>
              <button className="btn soft small" onClick={() => openLesson(m.id)}>Buka →</button>
            </div>
          );
        })}
      </div>
    </>
  );
}


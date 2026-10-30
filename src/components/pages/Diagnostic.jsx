import React from 'react';
import { diagnosticQuestions } from '../../data.js';
import PageHeading from '../common/PageHeading.jsx';
import FormattedText from '../common/FormattedText.jsx';

function capitalize(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function Diagnostic({ answers, setAnswers, index, setIndex, result, onSubmit, onRetake, navigate }) {
  const q = diagnosticQuestions[index];

  if (result) {
    return (
      <>
        <PageHeading
          eyebrow="ASESMEN AWAL"
          title="Titik awal petualanganmu"
          subtitle="Ini bukan ujian akhir. Hasilnya hanya membantu memilih cara belajar yang paling cocok."
        />
        <section className="result-card">
          <div className="result-emoji">
            {result.score >= 75 ? '🚀' : result.score >= 50 ? '🌱' : '🧩'}
          </div>
          <span className="eyebrow">HASIL ASESMEN</span>
          <div className="result-score">{result.score}<small>/100</small></div>
          <h2>Rekomendasi: jalur {capitalize(result.recommendedLevel)}</h2>
          <p>
            {result.score >= 75
              ? 'Kamu sudah punya bekal yang bagus. Coba tantangan yang lebih dalam dan jelaskan alasan di balik setiap keputusanmu.'
              : result.score >= 50
                ? 'Kamu sudah punya beberapa bekal. Kita kuatkan konsepnya lewat contoh nyata dan latihan bertahap.'
                : 'Kita mulai dari dasar yang kuat dulu. Nggak perlu buru-buru — memahami konsep lebih penting daripada cepat selesai.'}
          </p>
          <div className="button-row centered">
            <button className="btn primary" onClick={() => navigate('path')}>Lihat jalur belajar →</button>
            <button className="btn secondary" onClick={onRetake}>Ulangi asesmen</button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeading
        eyebrow="PEMANASAN DULU"
        title="Cek bekal awalmu 🧭"
        subtitle="Ada 4 pertanyaan singkat. Pilih jawaban yang menurutmu paling tepat — santai saja!"
      />
      <div className="quiz-progress-header">
        <span>Soal {index + 1} dari {diagnosticQuestions.length}</span>
        <strong>{Math.round(((index + 1) / diagnosticQuestions.length) * 100)}%</strong>
      </div>
      <div className="progress-track">
        <div style={{ width: `${((index + 1) / diagnosticQuestions.length) * 100}%` }} />
      </div>
      <section className="quiz-panel">
        <div className="quiz-label">PERTANYAAN {String(index + 1).padStart(2, '0')}</div>
        <h2 style={{ lineHeight: '1.5', margin: '14px 0 18px' }}>
          <FormattedText text={q.q} />
        </h2>
        <div className="answer-list">
          {q.a.map((a, i) => (
            <button
              key={a}
              className={`answer-option ${answers[index] === i ? 'selected' : ''}`}
              onClick={() => setAnswers(prev => ({ ...prev, [index]: i }))}
            >
              <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
              <span style={{ flex: 1, textAlign: 'left' }}>
                <FormattedText text={a} as="span" />
              </span>
              <span className="answer-check">{answers[index] === i ? '✓' : ''}</span>
            </button>
          ))}
        </div>
        <div className="quiz-footer">
          <button className="btn secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            ← Sebelumnya
          </button>
          {index < diagnosticQuestions.length - 1 ? (
            <button
              className="btn primary"
              disabled={answers[index] === undefined}
              onClick={() => setIndex(index + 1)}
            >
              Berikutnya →
            </button>
          ) : (
            <button
              className="btn primary"
              disabled={Object.keys(answers).length !== diagnosticQuestions.length}
              onClick={onSubmit}
            >
              Lihat hasilku ✨
            </button>
          )}
        </div>
      </section>
      <p className="gentle-note">🌱 Salah bukan gagal. Kita cuma sedang mencari bagian yang perlu dilatih lebih lanjut.</p>
    </>
  );
}


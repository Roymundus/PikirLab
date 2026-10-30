import React from 'react';
import PageHeading from '../common/PageHeading.jsx';

export default function Reflection({ value, setValue, onSave }) {
  const fields = [
    ['concept',   '💡 Satu konsep yang paling aku pahami', 'Konsep apa yang sekarang terasa lebih jelas? Coba jelaskan dengan kata-katamu sendiri.'],
    ['challenge', '🧗 Bagian yang masih menantang bagiku',  'Bagian mana yang masih membuatmu berpikir keras atau belum sepenuhnya jelas?'],
    ['use',       '⚙️ Di mana aku bisa menerapkan ini?',    'Ceritakan satu situasi nyata — di sekolah, di bengkel, atau di kehidupan sehari-hari — di mana konsep ini berguna.'],
  ];

  return (
    <>
      <PageHeading
        eyebrow="TUMBUH DARI PENGALAMAN"
        title="Waktunya refleksi 🌱"
        subtitle="Belajar bukan hanya tentang menjawab soal. Kita juga belajar mengenali pola pikir kita sendiri."
      />
      <div className="reflection-intro">
        <span>🪴</span>
        <div>
          <strong>Nggak perlu jawaban sempurna.</strong>
          <p>Isi sebisamu dengan jujur. Refleksi ini untuk membantu kamu melihat perkembanganmu sendiri — bukan untuk dinilai.</p>
        </div>
      </div>
      <div className="reflection-form">
        {fields.map(([id, title, hint]) => (
          <label key={id} className="reflection-field">
            <strong>{title}</strong>
            <span>{hint}</span>
            <textarea
              rows="3"
              value={value[id] || ''}
              onChange={e => setValue(prev => ({ ...prev, [id]: e.target.value }))}
              placeholder="Tulis dengan bahasamu sendiri..."
            />
          </label>
        ))}
        <div className="reflection-form-footer">
          <span>🔒 Disimpan di browser ini saja, tidak perlu akun.</span>
          <button className="btn primary" onClick={onSave}>Simpan refleksi ✓</button>
        </div>
      </div>
    </>
  );
}


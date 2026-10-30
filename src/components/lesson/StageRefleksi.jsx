import React from 'react';

export default function StageRefleksi({
  module,
  reflection,
  setReflection,
  patchModule,
  setToast,
  progress,
  isReflectionSaved,
  setIsReflectionSaved,
}) {
  const isDone = isReflectionSaved || Boolean(progress.reflection && progress.reflection.trim().length > 0);

  function handleSave() {
    if (!reflection || reflection.trim().length < 5) {
      setToast('Tuliskan setidaknya satu atau dua kalimat refleksimu sebelum menyimpan.');
      return;
    }
    patchModule(module.id, { reflection });
    setIsReflectionSaved(true);
    setToast('Refleksi modul tersimpan ✓ Kamu telah menyelesaikan modul ini!');
  }

  return (
    <>
      <section className="lesson-section reflection-section">
        <div className="section-kicker"><span>05</span> REFLEKSI BELAJAR</div>
        <h2>Apa yang kamu pelajari hari ini?</h2>
        <p>
          Tulis dengan bahasamu sendiri. Nggak harus panjang — dua kalimat sudah cukup untuk melatih kemampuan merangkum.
        </p>
        <textarea
          value={reflection}
          onChange={e => {
            setReflection(e.target.value);
            if (isReflectionSaved) setIsReflectionSaved(false);
          }}
          placeholder={`Menurutku ${module.title.toLowerCase()} berguna ketika...`}
          rows="4"
        />
        <div className="reflection-actions">
          <span>📝 Refleksimu disimpan di perangkat ini untuk melengkapi syarat kelulusan modul.</span>
          <button className="btn secondary" onClick={handleSave}>
            {isDone ? 'Perbarui refleksi ✓' : 'Simpan refleksi ✓'}
          </button>
        </div>
      </section>

      {isDone ? (
        <div className="module-completed-celebration">
          <div className="celebration-icon">🏆</div>
          <div>
            <h3>Hebat! Kamu telah menuntaskan Modul {module.title}!</h3>
            <p>
              Semua 5 tahap pembelajaran telah kamu selesaikan: Konsep Utama, Contoh Nyata, Simulasi Interaktif, Latihan Soal, dan Refleksi Belajar.
            </p>
          </div>
        </div>
      ) : (
        <div className="stage-lock-notice" style={{ marginTop: '16px' }}>
          <span>🔒 Tulis dan simpan refleksimu di atas untuk menuntaskan modul ini.</span>
        </div>
      )}
    </>
  );
}


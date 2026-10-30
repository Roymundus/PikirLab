import React, { useState } from 'react';
import FormattedText from '../common/FormattedText.jsx';

export default function Simulation({ module, onComplete, isCompleted }) {
  const [checked, setChecked] = useState([]);
  const [polaChoices, setPolaChoices] = useState({ case1: '', case2: '' });
  const [ordered, setOrdered] = useState([]);
  const [result, setResult] = useState('');

  const reset = () => {
    setChecked([]);
    setPolaChoices({ case1: '', case2: '' });
    setOrdered([]);
    setResult('');
    if (!isCompleted && onComplete) onComplete(false);
  };

  const toggleCheck = value =>
    setChecked(prev => (prev.includes(value) ? prev.filter(x => x !== value) : [...prev, value]));

  const content = {
    dekomposisi: (
      <>
        <div className="simulation-intro">
          <FormattedText text="Kelasmu mau mengadakan acara **Turnamen Class Meeting (Futsal & E-Sport)**! Pilih **4 sub-tugas dekomposisi yang produktif dan relevan**. Hindari kegiatan yang tidak relevan atau merusak rencana!" />
        </div>
        <div className="simulation-choice-grid">
          {[
            { id: '1', text: '📋 Membagi daftar pemain kelas untuk tim futsal dan tim e-sport', valid: true },
            { id: '2', text: '👕 Menyiapkan kostum/kaos tim yang seragam dan nomor punggung', valid: true },
            { id: '3', text: '😴 Tidur seharian dan membiarkan jadwal lomba lewat begitu saja', valid: false },
            { id: '4', text: '🥤 Mengatur patungan air minum dan kotak P3K sederhana untuk tim', valid: true },
            { id: '5', text: '💢 Berdebat saling menyalahkan tanpa membagi tugas sama sekali', valid: false },
            { id: '6', text: '⏰ Mencatat jam tanding tiap babak supaya tidak terlambat masuk lapangan', valid: true },
          ].map(item => (
            <button
              key={item.id}
              className={`simulation-option ${checked.includes(item.text) ? 'selected' : ''}`}
              onClick={() => {
                toggleCheck(item.text);
                setResult('');
              }}
            >
              <span>{checked.includes(item.text) ? '✓' : '+'}</span>
              <span style={{ textAlign: 'left', flex: 1 }}>
                <FormattedText text={item.text} as="span" />
              </span>
            </button>
          ))}
        </div>
        <div className="simulation-actions">
          <button
            className="btn primary"
            onClick={() => {
              const validItems = [
                '📋 Membagi daftar pemain kelas untuk tim futsal dan tim e-sport',
                '👕 Menyiapkan kostum/kaos tim yang seragam dan nomor punggung',
                '🥤 Mengatur patungan air minum dan kotak P3K sederhana untuk tim',
                '⏰ Mencatat jam tanding tiap babak supaya tidak terlambat masuk lapangan',
              ];
              const distractors = [
                '😴 Tidur seharian dan membiarkan jadwal lomba lewat begitu saja',
                '💢 Berdebat saling menyalahkan tanpa membagi tugas sama sekali',
              ];

              const validCount = checked.filter(c => validItems.includes(c)).length;
              const hasDistractor = checked.some(c => distractors.includes(c));

              if (checked.length === 0) {
                setResult('empty');
                if (onComplete) onComplete(false);
              } else if (hasDistractor) {
                setResult('has_distractor');
                if (onComplete) onComplete(false);
              } else if (validCount < 4) {
                setResult('need_more');
                if (onComplete) onComplete(false);
              } else {
                setResult('correct');
                if (onComplete) onComplete(true);
              }
            }}
          >
            Uji Pilihan Dekomposisi ✨
          </button>
        </div>
        {result && (
          <div className={`simulation-result ${result === 'correct' ? 'positive' : 'caution'}`}>
            {result === 'empty' && <FormattedText text="Pilih sub-tugas yang relevan untuk persiapan Class Meeting." />}
            {result === 'has_distractor' && (
              <FormattedText text="↩ Ada pilihan yang merugikan atau tidak relevan (seperti tidur seharian atau berdebat tanpa bagi tugas). Pilih hanya sub-tugas dekomposisi yang produktif!" />
            )}
            {result === 'need_more' && (
              <FormattedText text="Kamu baru memilih sebagian tugas. Lengkapi semua **4 sub-tugas penting** agar persiapan Class Meeting benar-benar terencana!" />
            )}
            {result === 'correct' && (
              <FormattedText text="✓ Luar biasa! Kamu berhasil memecah persiapan acara Class Meeting menjadi **4 sub-tugas** yang terbagi rapi, terarah, dan siap dikerjakan bersama tim." />
            )}
          </div>
        )}
      </>
    ),

    pola: (
      <>
        <div className="simulation-intro">
          <FormattedText text="Jadilah **Detektif Pola**! Amati dua kasus kejadian berulang di bawah ini, lalu temukan pola keteraturannya." />
        </div>

        {/* Kasus 1: Pola Berangkat Sekolah */}
        <div style={{ background: '#fff', padding: '16px', borderRadius: '14px', border: '1px solid var(--line)', marginBottom: '14px' }}>
          <strong style={{ display: 'block', marginBottom: '6px' }}>Kasus 1: Pola Waktu Berangkat Sekolah</strong>
          <div style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '6px 0 10px', lineHeight: '1.6' }}>
            <FormattedText text={`• **Senin:** Berangkat jam 06.40 → Terjebak macet panjang di depan pasar.\n• **Selasa:** Berangkat jam 06.15 → Jalanan lancar & tiba lebih awal.\n• **Rabu:** Berangkat jam 06.40 → Terjebak macet panjang di depan pasar lagi.\nJika Kamis temanmu terjebak macet di depan pasar, apa pola penyebabnya?`} />
          </div>
          <div className="simulation-choice-grid">
            {[
              { id: 'c1-right', text: 'Berangkat terlalu siang (lewat pukul 06.30) saat jam sibuk pasar ramai' },
              { id: 'c1-w1', text: 'Lampu jalan terlalu terang pada siang hari' },
              { id: 'c1-w2', text: 'Warna seragam sekolah berbeda-beda' },
            ].map(item => (
              <button
                key={item.id}
                className={`simulation-option ${polaChoices.case1 === item.id ? 'selected' : ''}`}
                onClick={() => {
                  setPolaChoices(prev => ({ ...prev, case1: item.id }));
                  setResult('');
                }}
              >
                <span>{polaChoices.case1 === item.id ? '✓' : '○'}</span>
                <span style={{ textAlign: 'left', flex: 1 }}>{item.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Kasus 2: Pola Kenaikan Tabungan */}
        <div style={{ background: '#fff', padding: '16px', borderRadius: '14px', border: '1px solid var(--line)', marginBottom: '14px' }}>
          <strong style={{ display: 'block', marginBottom: '6px' }}>Kasus 2: Pola Kenaikan Tabungan Mingguan</strong>
          <div style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '6px 0 10px', lineHeight: '1.6' }}>
            <FormattedText text={`Riko menabung secara konsisten setiap minggu:\nMinggu 1: **Rp10.000** → Minggu 2: **Rp15.000** → Minggu 3: **Rp20.000** → Minggu 4: **Rp25.000**.\nBerapa jumlah tabungan yang diprediksi pada **Minggu ke-5**?`} />
          </div>
          <div className="simulation-choice-grid">
            {[
              { id: 'c2-right', text: 'Rp30.000 (pola konsisten bertambah Rp5.000 tiap minggu)' },
              { id: 'c2-w1', text: 'Rp40.000 (melompat terlalu banyak)' },
              { id: 'c2-w2', text: 'Rp25.000 (tidak ada kenaikan)' },
            ].map(item => (
              <button
                key={item.id}
                className={`simulation-option ${polaChoices.case2 === item.id ? 'selected' : ''}`}
                onClick={() => {
                  setPolaChoices(prev => ({ ...prev, case2: item.id }));
                  setResult('');
                }}
              >
                <span>{polaChoices.case2 === item.id ? '✓' : '○'}</span>
                <span style={{ textAlign: 'left', flex: 1 }}>{item.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="simulation-actions">
          <button
            className="btn primary"
            onClick={() => {
              if (!polaChoices.case1 || !polaChoices.case2) {
                setResult('incomplete');
                if (onComplete) onComplete(false);
              } else if (polaChoices.case1 === 'c1-right' && polaChoices.case2 === 'c2-right') {
                setResult('correct');
                if (onComplete) onComplete(true);
              } else {
                setResult('wrong');
                if (onComplete) onComplete(false);
              }
            }}
          >
            Uji Deteksi Pola 🔍
          </button>
        </div>

        {result && (
          <div className={`simulation-result ${result === 'correct' ? 'positive' : 'caution'}`}>
            {result === 'incomplete' && <FormattedText text="Pilih jawaban untuk Kasus 1 dan Kasus 2 terlebih dahulu." />}
            {result === 'correct' && (
              <FormattedText text="✓ Tepat sekali! Kamu berhasil membaca pola sebab-akibat kemacetan pasar (faktor jam berangkat) dan pola kenaikan tabungan konstan (+Rp5.000/minggu)." />
            )}
            {result === 'wrong' && (
              <FormattedText text="↩ Masih ada pilihan pola yang belum tepat. Perhatikan jam berangkat yang membedakan lancar vs macet, serta amati selisih angka kenaikan tabungan tiap minggunya." />
            )}
          </div>
        )}
      </>
    ),

    abstraksi: (
      <>
        <div className="simulation-intro">
          <FormattedText text="Tujuanmu pagi ini adalah: **MEMBELI ROTI SARAPAN & MEMILIH RUTE TERCEPAT KE SEKOLAH**. Centang **HANYA 3 informasi PENTING** dan abaikan detail pengganggu!" />
        </div>
        <div className="simulation-choice-grid">
          {[
            { id: '1', text: '🗺️ Jarak rute jalan (4 km) dan info lalu lintas lancar di peta', valid: true },
            { id: '2', text: '🍞 Harga sebungkus roti (Rp8.000) dan jumlah uang di dompetmu (Rp20.000)', valid: true },
            { id: '3', text: '🐈 Nama kucing peliharaan milik penjaga warung roti', valid: false },
            { id: '4', text: '⏱️ Perkiraan waktu tempuh perjalanan (12 menit) agar tiba sebelum bel', valid: true },
            { id: '5', text: '🎨 Warna cat pagar rumah tetangga di ujung gang', valid: false },
            { id: '6', text: '👕 Merek kaos yang dipakai pejalan kaki di seberang jalan', valid: false },
          ].map(item => (
            <button
              key={item.id}
              className={`simulation-option ${checked.includes(item.text) ? 'selected' : ''}`}
              onClick={() => {
                toggleCheck(item.text);
                setResult('');
              }}
            >
              <span>{checked.includes(item.text) ? '✓' : '+'}</span>
              <span style={{ textAlign: 'left', flex: 1 }}>{item.text}</span>
            </button>
          ))}
        </div>
        <div className="simulation-actions">
          <button
            className="btn primary"
            onClick={() => {
              const validItems = [
                '🗺️ Jarak rute jalan (4 km) dan info lalu lintas lancar di peta',
                '🍞 Harga sebungkus roti (Rp8.000) dan jumlah uang di dompetmu (Rp20.000)',
                '⏱️ Perkiraan waktu tempuh perjalanan (12 menit) agar tiba sebelum bel',
              ];
              const distractors = [
                '🐈 Nama kucing peliharaan milik penjaga warung roti',
                '🎨 Warna cat pagar rumah tetangga di ujung gang',
                '👕 Merek kaos yang dipakai pejalan kaki di seberang jalan',
              ];

              const validCount = checked.filter(c => validItems.includes(c)).length;
              const hasDistractor = checked.some(c => distractors.includes(c));

              if (checked.length === 0) {
                setResult('empty');
                if (onComplete) onComplete(false);
              } else if (hasDistractor) {
                setResult('has_distractor');
                if (onComplete) onComplete(false);
              } else if (validCount < 3) {
                setResult('need_more');
                if (onComplete) onComplete(false);
              } else {
                setResult('correct');
                if (onComplete) onComplete(true);
              }
            }}
          >
            Uji Saringan Abstraksi 🎯
          </button>
        </div>
        {result && (
          <div className={`simulation-result ${result === 'correct' ? 'positive' : 'caution'}`}>
            {result === 'empty' && (
              <FormattedText text="Pilih 3 informasi penting yang berkaitan langsung dengan sarapan dan waktu berangkat." />
            )}
            {result === 'has_distractor' && (
              <FormattedText text="↩ Ada detail pengganggu yang ikut terpilih (seperti nama kucing, cat pagar, atau merek baju orang). Ingat prinsip abstraksi: buang hal-hal yang tidak mempengaruhi tujuanmu!" />
            )}
            {result === 'need_more' && (
              <FormattedText text="Kamu baru memilih sebagian info penting. Centang tepat **3 informasi esensial** (jarak & peta, harga & uang saku, serta estimasi waktu)." />
            )}
            {result === 'correct' && (
              <FormattedText text="✓ Sempurna! Kamu berhasil menyaring informasi penting (jarak rute, estimasi waktu, harga roti & uang) dan membuang detail visual yang tidak relevan." />
            )}
          </div>
        )}
      </>
    ),

    algoritma: (
      <>
        <div className="simulation-intro">
          <FormattedText text="Susun **5 langkah memasak mie instan goreng** yang runtut dan lezat. Klik langkah pada daftar di bawah untuk menyusun urutannya!" />
        </div>
        <div className="algorithm-bank">
          {[
            'Panaskan air di dalam panci hingga mendidih.',
            'Sambil menunggu air mendidih, buka bungkus bumbu dan tuangkan ke piring saji.',
            'Masukkan mie ke dalam air mendidih dan rebus sekitar 3 menit hingga matang.',
            'Matikan kompor, angkat mie, dan tiriskan (buang) air rebusannya.',
            'Tuangkan mie yang sudah ditiriskan ke piring berbumbu, lalu aduk rata hingga siap dimakan.',
          ]
            .filter(item => !ordered.includes(item))
            .map(item => (
              <button
                key={item}
                className="simulation-option"
                onClick={() => {
                  setOrdered(prev => [...prev, item]);
                  setResult('');
                }}
              >
                <span>＋</span>
                <span style={{ textAlign: 'left', flex: 1 }}>{item}</span>
              </button>
            ))}
        </div>

        {ordered.length > 0 && (
          <div className="ordered-steps">
            <strong>Urutan Algoritma yang Kamu Susun:</strong>
            {ordered.map((item, i) => (
              <div key={item}>
                <b>{i + 1}</b>
                <span style={{ textAlign: 'left', flex: 1 }}>{item}</span>
                <button
                  onClick={() => {
                    setOrdered(prev => prev.filter(x => x !== item));
                    setResult('');
                    if (onComplete) onComplete(false);
                  }}
                  aria-label={`Hapus ${item}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="simulation-actions">
          <button className="btn secondary" onClick={reset}>
            Ulangi susunan
          </button>
          <button
            className="btn primary"
            onClick={() => {
              if (ordered.length !== 5) {
                setResult('incomplete');
                if (onComplete) onComplete(false);
                return;
              }
              const ideal = [
                'Panaskan air di dalam panci hingga mendidih.',
                'Sambil menunggu air mendidih, buka bungkus bumbu dan tuangkan ke piring saji.',
                'Masukkan mie ke dalam air mendidih dan rebus sekitar 3 menit hingga matang.',
                'Matikan kompor, angkat mie, dan tiriskan (buang) air rebusannya.',
                'Tuangkan mie yang sudah ditiriskan ke piring berbumbu, lalu aduk rata hingga siap dimakan.',
              ];
              const isRight = ordered.every((item, i) => item === ideal[i]);
              setResult(isRight ? 'correct' : 'wrong');
              if (onComplete) onComplete(isRight);
            }}
          >
            Uji Urutan Algoritma ⚡
          </button>
        </div>

        {result && (
          <div className={`simulation-result ${result === 'correct' ? 'positive' : 'caution'}`}>
            {result === 'incomplete' && (
              <FormattedText text="Masih ada langkah yang belum dimasukkan. Pilih semua 5 langkah dari daftar di atas." />
            )}
            {result === 'correct' && (
              <FormattedText text="✓ Hebat! Urutan algoritma memasak mie gorengmu sangat logis dan tepat: air dididihkan dulu, bumbu disiapkan di piring, mie direbus, ditiriskan, baru diaduk rata." />
            )}
            {result === 'wrong' && (
              <FormattedText text="↩ Urutan langkahmu masih terbalik. Ingat: air harus dipanaskan sampai mendidih sebelum mie dimasukkan, dan air rebusan mie goreng wajib ditiriskan sebelum mie diaduk dengan bumbu di piring." />
            )}
          </div>
        )}
      </>
    ),
  };

  return (
    <section className="lesson-section simulation-section">
      <div className="section-kicker"><span>03</span> SIMULASI INTERAKTIF</div>
      <h2>Coba sendiri sekarang 🛠️</h2>
      <p className="simulation-subtitle">
        Selesaikan tantangan simulasi di bawah ini dengan benar untuk membuka tahap latihan berikutnya.
      </p>
      <div className="simulation-box">
        <div className="simulation-title">
          <span>{module.emoji}</span>
          <div>
            <strong>{module.title} — Mini Lab Harian</strong>
            <small>Simulasi Interaktif Fenomena Nyata</small>
          </div>
          <span className="simulation-live">● Interaktif</span>
        </div>
        {content[module.id]}
        <button className="simulation-reset" onClick={reset}>
          ↻ Mulai ulang simulasi
        </button>
      </div>
    </section>
  );
}

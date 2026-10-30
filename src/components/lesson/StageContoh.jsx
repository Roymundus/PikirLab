import React from 'react';
import FormattedText from '../common/FormattedText.jsx';

export default function StageContoh({ module, level, onLevelChange }) {
  const content = (module.contentByLevel && (module.contentByLevel[level] || module.contentByLevel.dasar)) || module;

  const levelLabels = {
    dasar:    { icon: '🌱', title: 'Dasar',    badge: 'Contoh Sederhana & Bertahap' },
    menengah: { icon: '⚡', title: 'Menengah', badge: 'Studi Kasus Terstruktur & Nyata' },
    lanjutan: { icon: '🚀', title: 'Lanjutan', badge: 'Strategi Efisiensi & Kerja Paralel' },
  };

  const activeLevel = levelLabels[level] ? level : 'dasar';

  return (
    <section className="lesson-section">
      <div className="section-kicker"><span>02</span> CONTOH NYATA</div>

      {/* Header with Title and Segmented Level Switcher */}
      <div className="section-header-wrap">
        <div>
          <h2>Seperti apa <em>{module.title.toLowerCase()}</em> dalam kehidupan nyata?</h2>
          <p className="section-subtitle">
            Pelajari dua contoh penerapan di bawah sesuai dengan sudut pandang jalur belajarmu.
          </p>
        </div>

        {onLevelChange && (
          <div className="content-level-switcher" aria-label="Ganti tingkat contoh">
            <span className="switcher-label">Tingkat Penjelasan:</span>
            <div className="level-pills">
              {['dasar', 'menengah', 'lanjutan'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  className={`level-pill-btn ${activeLevel === lvl ? 'active ' + lvl : ''}`}
                  onClick={() => onLevelChange(lvl)}
                  title={`Ganti ke contoh Jalur ${levelLabels[lvl].title}`}
                >
                  <span>{levelLabels[lvl].icon}</span>
                  {levelLabels[lvl].title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="example-grid">
        {/* Card 1: Everyday Life Situation */}
        <article className="example-card everyday">
          <div className="example-card-header">
            <div className="example-icon-badge">🏠</div>
            <div>
              <small>CONTOH SEHARI-HARI 1</small>
              <strong>
                <FormattedText
                  text={content.everydayExample?.title || `Situasi Nyata (${levelLabels[activeLevel]?.title})`}
                  as="span"
                />
              </strong>
            </div>
          </div>
          {content.everydayExample?.steps && content.everydayExample.steps.length > 0 ? (
            <div className="example-steps-content" style={{ display: 'grid', gap: '8px', marginTop: '10px' }}>
              {content.everydayExample.steps.map((st, i) => (
                <div key={i} style={{ fontSize: '0.92rem', lineHeight: '1.55' }}>
                  <FormattedText text={st} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: '10px' }}>
              <FormattedText text={content.everyday} />
            </div>
          )}
        </article>

        {/* Card 2: School & Activity Case Study */}
        <article className="example-card workshop">
          <div className="example-card-header">
            <div className="example-icon-badge">🎒</div>
            <div>
              <small>CONTOH SEHARI-HARI 2</small>
              <strong>
                <FormattedText
                  text={content.workshopExample?.title || `Kegiatan & Proyek Siswa (${levelLabels[activeLevel]?.title})`}
                  as="span"
                />
              </strong>
            </div>
          </div>
          {content.workshopExample?.steps && content.workshopExample.steps.length > 0 ? (
            <div className="example-steps-content" style={{ display: 'grid', gap: '8px', marginTop: '10px' }}>
              {content.workshopExample.steps.map((st, i) => (
                <div key={i} style={{ fontSize: '0.92rem', lineHeight: '1.55' }}>
                  <FormattedText text={st} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: '10px' }}>
              <FormattedText text={content.workshop} />
            </div>
          )}
        </article>
      </div>

      {/* Steps / process */}
      {content.steps && content.steps.length > 0 && (
        <div className="concept-steps">
          <div className="concept-steps-header">
            <div className="steps-title-wrap">
              <span>🪜</span>
              <div>
                <strong>Langkah Terstruktur Menerapkan {module.title}</strong>
                <small>Panduan alur berpikir untuk Jalur {levelLabels[activeLevel]?.title}</small>
              </div>
            </div>
          </div>
          <ol className="steps-list">
            {content.steps.map((step, i) => (
              <li key={i} className="step-item">
                <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="step-text">
                  <FormattedText text={step} as="span" />
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

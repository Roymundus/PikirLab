import React from 'react';
import FormattedText from '../common/FormattedText.jsx';

export default function StageKonsep({ module, level, onLevelChange }) {
  const content = (module.contentByLevel && (module.contentByLevel[level] || module.contentByLevel.dasar)) || module;

  const levelLabels = {
    dasar:    { icon: '🌱', title: 'Dasar',    badge: 'Bahasa Sederhana & Bertahap' },
    menengah: { icon: '⚡', title: 'Menengah', badge: 'Studi Kasus Terstruktur & Nyata' },
    lanjutan: { icon: '🚀', title: 'Lanjutan', badge: 'Strategi Efisiensi & Kerja Paralel' },
  };

  const activeLevel = levelLabels[level] ? level : 'dasar';

  return (
    <section className="lesson-section">
      <div className="section-kicker"><span>01</span> KONSEP UTAMA</div>

      {/* Header with Title and Segmented Level Switcher */}
      <div className="section-header-wrap">
        <div>
          <h2>Apa itu {module.title}?</h2>
          <p className="section-subtitle">{content.tagline || module.tagline}</p>
        </div>

        {onLevelChange && (
          <div className="content-level-switcher" aria-label="Ganti tingkat penjelasan">
            <span className="switcher-label">Tingkat Penjelasan:</span>
            <div className="level-pills">
              {['dasar', 'menengah', 'lanjutan'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  className={`level-pill-btn ${activeLevel === lvl ? 'active ' + lvl : ''}`}
                  onClick={() => onLevelChange(lvl)}
                  title={`Ganti ke penjelasan Jalur ${levelLabels[lvl].title}`}
                >
                  <span>{levelLabels[lvl].icon}</span>
                  {levelLabels[lvl].title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Definition highlight box */}
      <div className="definition-highlight">
        <div className="definition-icon">{module.emoji}</div>
        <div className="definition-content">
          <span className="definition-kicker">INTI DEFINISI ({activeLevel.toUpperCase()})</span>
          <blockquote className="definition-text">
            <FormattedText text={content.definition} />
          </blockquote>
          {content.conceptExplanation && content.conceptExplanation.length > 1 && (
            <div className="definition-extra-paragraphs" style={{ marginTop: '14px', display: 'grid', gap: '10px' }}>
              {content.conceptExplanation.slice(1).map((para, i) => (
                <div key={i} style={{ fontSize: '0.94rem', color: 'var(--ink)' }}>
                  <FormattedText text={para} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Key terms */}
      {content.keyTerms && content.keyTerms.length > 0 && (
        <div className="key-terms">
          <div className="key-terms-header">
            <span>📌</span>
            <strong>Istilah Kunci — {levelLabels[activeLevel]?.title}</strong>
          </div>
          <div className="key-terms-grid">
            {content.keyTerms.map(kt => (
              <div className="key-term-card" key={kt.term}>
                <span className="key-term-label">
                  <FormattedText text={kt.term} as="span" />
                </span>
                <p className="key-term-def">
                  <FormattedText text={kt.def} as="span" />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two columns: Mengapa Penting & Target Belajar */}
      <div className="concept-meta-grid">
        {content.whyMatters && (
          <div className="why-matters">
            <span className="why-icon">💡</span>
            <div>
              <strong>Mengapa ini penting dalam keseharian?</strong>
              <div style={{ marginTop: '4px' }}>
                <FormattedText text={content.whyMatters} />
              </div>
            </div>
          </div>
        )}

        <div className="goal-note">
          <span className="goal-icon">🎯</span>
          <div>
            <strong>Target belajar kita</strong>
            <p style={{ margin: '4px 0 0' }}>{module.goal}</p>
          </div>
        </div>
      </div>

      {/* Tactical weapon for solving quiz */}
      {(content.ammunitionBox?.length > 0 || content.tacticalTip) && (
        <div className="tactical-ammo-box">
          <span className="ammo-icon">🛡️</span>
          <div style={{ width: '100%' }}>
            <div className="ammo-header" style={{ marginBottom: '8px' }}>
              <strong>Kotak Amunisi Belajar ({levelLabels[activeLevel]?.title})</strong>
              <span className={`content-level-badge ${activeLevel}`}>
                {levelLabels[activeLevel]?.icon} Jalur {levelLabels[activeLevel]?.title}
              </span>
            </div>
            {content.tacticalTip && (
              <div style={{ margin: '0 0 10px 0', fontSize: '0.92rem', fontWeight: '600' }}>
                <FormattedText text={content.tacticalTip} />
              </div>
            )}
            {content.ammunitionBox && content.ammunitionBox.length > 0 && (
              <div className="ammo-grid" style={{ display: 'grid', gap: '8px', marginTop: '8px' }}>
                {content.ammunitionBox.map((ammo, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.75)',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      lineHeight: '1.5',
                      border: '1px solid rgba(103, 85, 232, 0.15)',
                    }}
                  >
                    <FormattedText text={ammo} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

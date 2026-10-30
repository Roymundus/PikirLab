import React from 'react';

const navItems = [
  ['home',       '🏡', 'Beranda'],
  ['dashboard',  '🗺️', 'Dashboard'],
  ['diagnostic', '🧭', 'Asesmen awal'],
  ['path',       '🚀', 'Jalur belajar'],
  ['reflection', '🌱', 'Refleksi'],
];

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <nav aria-label="Navigasi utama">
        {navItems.map(([id, emoji, label]) => (
          <button
            key={id}
            className={`nav-item ${page === id || (page === 'lesson' && id === 'path') ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <span>{emoji}</span>
            {label}
          </button>
        ))}
      </nav>
      <div className="sidebar-note">
        <span>🌟</span>
        <strong>Ingat, ya!</strong>
        <p>Kamu nggak harus langsung bisa. Salah itu bagian dari belajar. Coba lagi, pelan-pelan juga boleh.</p>
      </div>
      <div className="sidebar-footer">Dibuat untuk belajar Informatika kelas X · Berpikir Komputasional</div>
    </aside>
  );
}


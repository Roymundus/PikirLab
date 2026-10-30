# PikirLab React — Petualangan Berpikir Komputasional

Media belajar interaktif untuk Informatika kelas X, dengan contoh sehari-hari dan konteks Teknik Pemesinan. Dibangun menggunakan **React + Vite** agar komponen, materi, dan tampilan lebih mudah dirawat dan dikembangkan.

## 1. Yang perlu disiapkan
- Laptop/PC
- Node.js versi LTS (disarankan versi 20 atau lebih baru) dari https://nodejs.org/
- Visual Studio Code dari https://code.visualstudio.com/
- Browser seperti Chrome atau Edge

Setelah instalasi Node.js, buka terminal/CMD dan cek:

```bash
node -v
npm -v
```

Jika keduanya menampilkan nomor versi, berarti siap.

## 2. Cara menjalankan website
1. Ekstrak ZIP proyek ini.
2. Buka folder `pikir-lab-react` di Visual Studio Code (`File > Open Folder`).
3. Pilih menu `Terminal > New Terminal`.
4. Jalankan perintah berikut (tunggu sampai selesai):

```bash
npm install
```

5. Jalankan website:

```bash
npm run dev
```

6. Terminal akan menampilkan alamat lokal, biasanya `http://localhost:5173/`. Tekan `Ctrl` sambil klik alamat itu, atau salin ke browser.
7. Biarkan terminal tetap berjalan selama website digunakan. Untuk menghentikan server, tekan `Ctrl + C` di terminal.

> Website ini adalah proyek React, jadi jangan hanya membuka `index.html` dengan klik dua kali. Jalankan melalui Vite seperti langkah di atas.

## 3. Struktur folder

```text
pikir-lab-react/
├── index.html          # Halaman HTML awal
├── package.json        # Daftar dependensi dan perintah proyek
├── vite.config.js      # Konfigurasi Vite (opsional, bila diperlukan)
└── src/
    ├── main.jsx        # Titik masuk React
    ├── App.jsx         # Komponen halaman dan logika interaksi
    ├── data.js         # Materi, contoh, dan soal
    └── styles.css      # Warna, layout, dan desain responsif
```

## 4. Cara mengubah materi
1. Buka `src/data.js`.
2. Cari objek materi berdasarkan `id`: `dekomposisi`, `pola`, `abstraksi`, atau `algoritma`.
3. Ubah teks `definition`, `everyday`, `workshop`, `activity`, atau tantangan di `levels`.
4. Soal ada pada `question`, pilihan ada pada `answers`, indeks jawaban benar ada pada `correct` (dimulai dari angka `0`), dan penjelasan ada pada `explain`.
5. Simpan file. Saat server `npm run dev` berjalan, halaman biasanya memperbarui otomatis.

**Penting:** `correct: 1` berarti pilihan kedua adalah jawaban benar; `correct: 0` berarti pilihan pertama. Pastikan indeks jawaban sesuai dengan isi `answers`.

## 5. Belajar React dari proyek ini
- `src/main.jsx`: React memasang komponen utama (`App`) ke elemen `#root`.
- `src/App.jsx`: `function App()` adalah komponen utama. Komponen seperti `Home`, `Dashboard`, `Lesson`, dan `Reflection` memecah UI menjadi bagian kecil.
- `useState`: menyimpan kondisi yang dapat berubah, misalnya halaman aktif, jawaban yang dipilih, poin, dan progres.
- `useEffect`: menyimpan progres ke `localStorage` dan mengatur pesan singkat.
- `src/data.js`: data materi dipisahkan dari tampilan agar guru lebih mudah memperbarui konten.
- `src/styles.css`: desain dan aturan tampilan desktop/mobile.

Contoh sederhana:

```jsx
const [page, setPage] = useState('home');

<button onClick={() => setPage('dashboard')}>
  Lihat progres
</button>
```

`page` adalah state; `setPage` mengubah state ketika tombol ditekan. React kemudian memperbarui tampilan.

## 6. Membuat versi produksi

```bash
npm run build
```

Vite membuat folder `dist/`. Folder itulah yang nantinya diunggah ke layanan hosting statis seperti Vercel atau Netlify. Proyek belum dipublikasikan ke internet.

## 7. Fitur saat ini
- Navigasi Beranda, Dashboard, Asesmen Awal, Jalur Belajar, materi, dan Refleksi.
- Empat fondasi Berpikir Komputasional dengan bahasa santai.
- Contoh kehidupan sehari-hari dan Teknik Pemesinan.
- Tiga tingkat tantangan: Dasar, Menengah, dan Lanjutan.
- Asesmen diagnostik dengan rekomendasi jalur.
- Latihan pilihan ganda dengan umpan balik, poin, status modul, dan lencana.
- Refleksi umum dan refleksi per modul.
- Progres disimpan di `localStorage` browser tanpa akun.
- Layout responsif untuk layar kecil dan besar.

## Catatan
Ini adalah versi awal yang layak untuk uji coba terbatas. Tinjau kembali materi, soal, dan kunci jawaban sebelum dipakai sebagai asesmen formal. Progres tersimpan hanya pada browser/perangkat yang sama; membersihkan data browser akan menghapus progres. Belum ada backend, login, atau sinkronisasi antarperangkat.

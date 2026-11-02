# lazDev

Website company profile **lazDev** — perusahaan teknologi software di bawah **Laizs** — sekaligus landing page untuk produk unggulannya, **leam** (platform live room & community chat).

Dokumentasi ini mencakup struktur repo, cara menjalankan, arsitektur frontend, build & deployment, serta catatan pengembangan.

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Status Proyek](#status-proyek)
- [Struktur Repo](#struktur-repo)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Menjalankan Frontend](#menjalankan-frontend)
- [Scripts](#scripts)
- [Routing](#routing)
- [Arsitektur Frontend](#arsitektur-frontend)
- [Aset & Font](#aset--font)
- [Build & Production](#build--production)
- [Docker](#docker)
- [Replika Desain Presisi (Statis)](#replika-desain-presisi-statis)
- [Alur Kontribusi](#alur-kontribusi)
- [Troubleshooting](#troubleshooting)
- [Lisensi & Kredit](#lisensi--kredit)

---

## Tentang Proyek

Repo ini berisi dua bagian utama:

1. **`frontend/`** — aplikasi utama (React Router + Vite + Tailwind CSS v4) yang menampilkan company profile lazDev dan landing page leam.
2. **`replika-desain-presisi/`** — versi statis (HTML + Tailwind CDN) dari desain landing page leam, dipakai sebagai referensi visual/replika presisi dari desain Stitch.

Konten utama menyoroti:

- Identitas lazDev sebagai perusahaan software di bawah Laizs.
- Layanan: Backend, Frontend, Infra, Security, Mobile, dan Data.
- Produk **leam**: live rooms, tiket & langganan, collectibles, analytics, dan lainnya.

---

## Status Proyek

| Bagian | Status | Keterangan |
|--------|--------|------------|
| Landing page (`/`) | Selesai | Seluruh section leam sudah diimplementasikan |
| Halaman `/project` | Placeholder | Route & meta tersedia, konten belum diisi |
| Halaman `/team` | Placeholder | Route & meta tersedia, konten belum diisi |
| Halaman `/contact` | Placeholder | Route & meta tersedia, konten belum diisi |
| `backend/` | ✅ Selesai | Express + Prisma + MySQL — Auth, Blog, Portfolio, Contact, Newsletter, Media, CMS |
| `replika-desain-presisi/` | Selesai | Replika statis desain Stitch (arsip/referensi) |

---

## Struktur Repo

```
lazdev/
├── README.md                     # Dokumentasi utama (file ini)
├── backend/                      # Placeholder back end (belum ada kode)
├── frontend/                     # Aplikasi utama React Router
│   ├── app/
│   │   ├── root.tsx              # Layout global, font preload, error boundary
│   │   ├── app.css               # Tailwind v4 + @font-face + style global
│   │   ├── routes.ts             # Definisi route (config-based)
│   │   ├── routes/               # Halaman: home, project, team, contact
│   │   ├── leam/
│   │   │   ├── leam.tsx          # Komposisi seluruh section landing page
│   │   │   ├── components/       # Komponen UI per section
│   │   │   ├── data/content.ts   # Data konten (hero, stats, fitur, member, dll.)
│   │   │   ├── css/              # CSS & konfigurasi Tailwind referensi
│   │   │   └── js/               # Script referensi
│   │   └── welcome/              # Komponen bawaan template
│   ├── assets/
│   │   ├── images/               # Gambar hero, portofolio, tim
│   │   ├── videos/               # Video demo (mp4)
│   │   ├── css/                  # CSS statis referensi
│   │   └── js/                   # JS statis referensi
│   ├── public/
│   │   ├── favicon.ico
│   │   └── fonts/google-sans/    # Font lokal (woff2)
│   ├── index.html                # Versi statis landing page (legacy/referensi)
│   ├── Dockerfile                # Multi-stage build production
│   ├── react-router.config.ts    # Konfigurasi React Router (SSR aktif)
│   ├── vite.config.ts            # Plugin Tailwind + React Router
│   ├── tsconfig.json             # TypeScript strict, alias ~/* -> app/*
│   ├── package.json
│   └── package-lock.json
└── replika-desain-presisi/       # Replika statis desain Stitch
    ├── index.html                # Halaman utama (Tailwind CDN)
    ├── screenshot.png            # Screenshot desain sumber
    └── app/
        ├── index.html            # Salinan halaman
        ├── assets/screenshot.png
        ├── css/styles.css        # Custom CSS (glow, shadow, scrollbar)
        ├── css/tailwind.config.js
        └── js/main.js            # Inisialisasi ikon Lucide
```

---

## Tech Stack

### Frontend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React | 19 | UI library |
| React Router | 8 | Routing + SSR + data APIs |
| Vite | 8 | Dev server & bundler |
| TypeScript | 5.9 | Type safety (strict mode) |
| Tailwind CSS | 4 | Styling utility-first (`@tailwindcss/vite`) |
| GSAP | 3.15 | Animasi kompleks (scroll, timeline) |
| Framer Motion | 14 | Animasi komponen React |
| Lenis | 1.x | Smooth scroll |
| React Icons | 5 | Ikon (Lucide, dll.) |
| Node.js | 24 (Docker) | Runtime build & server |

### Replika Statis

| Teknologi | Keterangan |
|-----------|------------|
| HTML5 | Markup semantik |
| Tailwind CSS v3 (CDN) | Styling tanpa build step |
| Lucide Icons (CDN) | Ikon SVG |
| Google Fonts (Inter) | Tipografi |

---

## Prasyarat

- **Node.js** minimal `20.19` (disarankan `24`, sesuai image Docker)
- **npm** (repo memakai `package-lock.json`)
- **Git**
- Opsional: **Docker** untuk build/deploy container

Cek versi:

```bash
node -v
npm -v
```

---

## Menjalankan Frontend

```bash
# 1. Masuk ke folder frontend
cd frontend

# 2. Install dependency
npm ci        # instalasi bersih sesuai lockfile
# atau: npm install

# 3. Jalankan dev server (default http://localhost:5173)
npm run dev
```

Buka `http://localhost:5173` di browser. Perubahan file akan otomatis ter-reload (HMR).

### Build production

```bash
cd frontend
npm run build     # output ke frontend/build/
npm run start     # jalankan server hasil build
```

Server production default berjalan di `http://localhost:3000` (port dapat diatur dengan env `PORT`).

### Type checking

```bash
cd frontend
npm run typecheck
```

Perintah ini menjalankan `react-router typegen` lalu `tsc --noEmit`. Tipe route (`./+types/*`) di-generate ke `.react-router/types/` dan **tidak** di-commit.

---

## Scripts

| Perintah | Lokasi | Fungsi |
|----------|--------|--------|
| `npm run dev` | `frontend/` | Dev server dengan HMR |
| `npm run build` | `frontend/` | Build production (client + server) |
| `npm run start` | `frontend/` | Serve hasil build (`react-router-serve`) |
| `npm run typecheck` | `frontend/` | Generate tipe route + cek TypeScript |

---

## Routing

Route didefinisikan secara config-based di `frontend/app/routes.ts`:

| Path | File | Status | Deskripsi |
|------|------|--------|-----------|
| `/` | `routes/home.tsx` | Selesai | Landing page leam (semua section) |
| `/project` | `routes/project.tsx` | Placeholder | Halaman project |
| `/team` | `routes/team.tsx` | Placeholder | Halaman tim |
| `/contact` | `routes/contact.tsx` | Placeholder | Halaman kontak |

SSR aktif (`ssr: true` pada `react-router.config.ts`). Navigasi utama memakai **floating dock** di bagian bawah layar (`app/leam/components/navbar/Navbar.tsx`) yang dirender sekali di `root.tsx` agar tidak remount saat berpindah halaman.

Menambah route baru:

1. Buat file di `frontend/app/routes/`, mis. `pricing.tsx`.
2. Daftarkan di `frontend/app/routes.ts`:
   ```ts
   route("pricing", "routes/pricing.tsx"),
   ```
3. Tambahkan item navigasi di `app/leam/components/navbar/Navbar.tsx` bila perlu.

---

## Arsitektur Frontend

```
root.tsx (Layout)
├── Header (Dock navigation, fixed bottom)
├── Outlet
│   └── routes/home.tsx
│       └── Leam
│           ├── Hero               # Hero + video/laser flow
│           ├── TrustedBy          # Logo klien
│           ├── StatsSection       # Metrik
│           ├── Features           # Live rooms, tickets, vault, analytics
│           ├── HowItWorks         # Langkah penggunaan
│           ├── QuoteSection       # Kutipan
│           ├── TemplateGallery    # Galeri template
│           ├── PerformanceSection # Performa
│           ├── Testimonials       # Testimoni
│           ├── Prices             # Paket harga
│           ├── FAQ                # Pertanyaan umum
│           └── Footer             # Tautan & sosial
└── NavbarSpacer + ScrollRestoration + Scripts
```

Poin penting:

- **Konten terpusat** di `frontend/app/leam/data/content.ts` (tipe `Project`, `Member`, `Stat`, `Feature`, objek `heroCenter`, `floatLabels`, `stats`, `features`, dll.). Ubah teks/angka di sini, bukan di komponen.
- **Styling global** ada di `frontend/app/app.css`: import Tailwind v4, `@font-face` Google Sans, tema font, warna latar gelap, utilitas `no-scrollbar` dan `card-mockup-shadow`.
- **Animasi** memakai GSAP/Lenis (scroll & hero) serta Framer Motion (transisi komponen). Perhatikan cleanup pada `useEffect`/`useLayoutEffect` agar tidak ada listener bocor.
- **Alias import** `~/*` mengarah ke `frontend/app/*` (lihat `tsconfig.json`).
- **Error handling** global memakai `ErrorBoundary` di `root.tsx` (menampilkan 404 atau stack trace saat dev).

---

## Aset & Font

| Aset | Lokasi | Catatan |
|------|--------|---------|
| Font Google Sans | `frontend/public/fonts/google-sans/` | Di-preload di `root.tsx`, dipakai lewat `@font-face` |
| Gambar hero | `frontend/assets/images/img.jpg` | Di-import langsung di komponen |
| Gambar tim | `frontend/assets/images/team/` | `member-1..4.jpg` |
| Gambar portofolio | `frontend/assets/images/portfolio/` | `project-1..3.jpg` |
| Video demo | `frontend/assets/videos/` | `demo-vid.mp4` (~18 MB), `demo-vid-2.mp4` (~14 MB), `demo-vid-3.mp4` |

Catatan:

- File di `frontend/public/` disajikan dari root URL (`/fonts/...`, `/favicon.ico`).
- File di `frontend/assets/` diproses oleh Vite saat di-import dari kode.
- Ukuran video cukup besar; pertimbangkan kompresi/streaming (mis. CDN) sebelum deploy publik.

---

## Build & Production

```bash
cd frontend
npm ci
npm run build
npm run start
```

Output build:

```
frontend/build/
├── client/   # Aset statis (JS, CSS, gambar) — dapat disajikan via CDN/Nginx
└── server/   # Entry SSR (index.js) — dijalankan oleh Node
```

Environment variable yang didukung saat ini:

| Variabel | Default | Fungsi |
|----------|---------|--------|
| `PORT` | `3000` | Port server production (`react-router-serve`) |

> Saat ini belum ada file `.env` yang di-commit. Jika menambahkan kredensial/API key, buat `.env` lokal (sudah di-ignore) dan jangan pernah commit nilainya.

---

## Docker

`frontend/Dockerfile` memakai multi-stage build (Node 24 Alpine):

1. Install dependency development.
2. Install dependency production saja.
3. Build aplikasi.
4. Image final hanya berisi `package.json`, `node_modules` production, dan `build/`.

Build & jalankan:

```bash
cd frontend

# Build image
docker build -t lazdev-frontend .

# Jalankan container
docker run --rm -p 3000:3000 -e PORT=3000 lazdev-frontend
```

Buka `http://localhost:3000`.

---

## Replika Desain Presisi (Statis)

Folder `replika-desain-presisi/` adalah replika statis landing page leam dari desain **Stitch**, tanpa build step.

```bash
# Opsi 1 — Python
python3 -m http.server 3001 --directory replika-desain-presisi

# Opsi 2 — Node
npx serve replika-desain-presisi
```

Buka `http://localhost:3001`.

Detail desain sumber:

- **Project Stitch:** Replika Desain Presisi (`7688514500056140461`)
- **Screen:** Leam — Create your Universe (`e64cada015974b4188f4d1d7ee99a941`)
- **Dimensi:** 2560 × 3860 px (desktop)

Folder `frontend/index.html` juga menyimpan versi statis serupa sebagai referensi; aplikasi yang aktif digunakan adalah versi React Router di `frontend/app/`.

---

## Alur Kontribusi

1. Buat branch dari `main`:
   ```bash
   git checkout -b feat/nama-fitur
   ```
2. Lakukan perubahan, lalu verifikasi:
   ```bash
   cd frontend
   npm run typecheck
   npm run build
   ```
3. Commit dengan pesan deskriptif (Conventional Commits disarankan):
   ```bash
   git add .
   git commit -m "feat: tambah halaman pricing"
   ```
4. Push dan buat Pull Request:
   ```bash
   git push -u origin feat/nama-fitur
   ```

Konvensi commit yang dipakai: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`.

Hal yang perlu diperhatikan:

- Jangan commit `node_modules/`, `build/`, `.react-router/`, atau `.env`.
- Jalankan `npm run typecheck` sebelum push.
- Untuk perubahan konten, utamakan edit `frontend/app/leam/data/content.ts`.

---

## Troubleshooting

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| `Cannot find module './+types/...'` | Tipe route belum di-generate | Jalankan `npm run typecheck` atau `npx react-router typegen` |
| Port 5173/3000 sudah dipakai | Proses lain berjalan | Hentikan proses atau jalankan dengan port lain: `npm run dev -- --port 5174` |
| Halaman blank setelah build | Menjalankan `build/client` tanpa server SSR | Gunakan `npm run start` (butuh `build/server`) |
| Video/gambar tidak muncul | Path aset salah atau aset tidak ada di `public/` | Import dari `assets/` atau pindahkan ke `public/` dan rujuk dengan `/...` |
| Build gagal karena versi Node | Node terlalu lama untuk Vite 8 | Upgrade ke Node >= 20.19 (disarankan 24) |
| Perubahan tidak terlihat | Cache browser/HMR | Hard reload atau restart `npm run dev` |

---

## Lisensi & Kredit

Proyek internal **lazDev** (Laizs). Desain landing page leam direplika dari **Stitch** untuk keperluan referensi visual.

Untuk pertanyaan, hubungi tim melalui halaman `/contact` atau buka issue di repository ini.
# last-dev
# Last-developer
# Last-developer

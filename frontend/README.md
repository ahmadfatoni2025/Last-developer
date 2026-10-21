# leam — Create your Universe

Replika presisi halaman landing **Leam**, dibangun dari desain Stitch.

## Struktur Folder

```
frontend/
├── index.html                  # Halaman utama
├── README.md                   # Dokumentasi ini
└── assets/
    ├── css/
    │   ├── styles.css          # Custom CSS (glow, shadow, scrollbar, hover)
    │   └── tailwind.config.js  # Tailwind config (referensi / migrasi build)
    ├── js/
    │   └── main.js             # JS entry point (Lucide icon init)
    └── images/
        └── screenshot.png      # Screenshot desain dari Stitch
```

## Teknologi

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| HTML5     | —     | Semantik, aksesibel |
| Tailwind CSS | v3 CDN | Utility-first styling |
| Lucide Icons | latest CDN | Icon SVG |
| Google Fonts | Inter | Tipografi |

## Cara Jalankan

Cukup buka `index.html` langsung di browser — tidak perlu build step.

```bash
# Dengan Python (paling simpel)
python3 -m http.server 3000 --directory frontend/

# Dengan Node.js (npx serve)
npx serve frontend/
```

Lalu buka `http://localhost:3000`.

## Sumber Desain

- **Project Stitch:** Replika Desain Presisi (`7688514500056140461`)
- **Screen:** Leam — Create your Universe (`e64cada015974b4188f4d1d7ee99a941`)
- **Dimensi:** 2560 × 3860 px (Desktop)

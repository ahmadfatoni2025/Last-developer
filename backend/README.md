# lazDev Backend API

Backend REST API untuk website **lazDev** — dibangun dengan **Express.js + Node.js + Prisma + MySQL**.

## Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Node.js | 24 | Runtime |
| Express | 4.x | HTTP Framework |
| TypeScript | 5.x | Type safety |
| Prisma | 5.x | ORM + MySQL |
| JWT | 9.x | Authentication |
| Multer | 1.x | File upload |
| Sharp | 0.33 | Image processing |
| Nodemailer | 6.x | Email |
| Winston | 3.x | Logging |
| Zod | 3.x | Validation |

---

## Struktur Folder

```
backend/
├── prisma/
│   └── schema.prisma         # Database schema MySQL
├── src/
│   ├── server.ts             # Entry point (listen port)
│   ├── app.ts                # Express app + middleware stack
│   ├── config/
│   │   ├── cors.ts           # CORS options
│   │   ├── rateLimit.ts      # Rate limiters (global, auth, contact, newsletter)
│   │   ├── mailer.ts         # Nodemailer + email templates
│   │   └── multer.ts         # File upload config
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── post.controller.ts
│   │   ├── project.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── newsletter.controller.ts
│   │   ├── media.controller.ts
│   │   ├── category.controller.ts
│   │   └── admin.controller.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts       # JWT + role guards
│   │   ├── errorHandler.ts          # Centralized error handling
│   │   ├── notFound.ts              # 404 handler
│   │   └── validate.middleware.ts   # express-validator helper
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── post.routes.ts
│   │   ├── project.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── newsletter.routes.ts
│   │   ├── media.routes.ts
│   │   ├── category.routes.ts
│   │   ├── tag.routes.ts
│   │   └── admin.routes.ts
│   ├── prisma/
│   │   ├── client.ts         # Prisma singleton
│   │   └── seed.ts           # Database seeder
│   └── utils/
│       ├── logger.ts         # Winston logger
│       └── helpers.ts        # Pagination, pick, dll.
├── .env.example
├── .gitignore
├── .dockerignore
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

## Quick Start

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Install dependency
npm install

# 3. Copy & isi environment
cp .env.example .env
# Edit DATABASE_URL, JWT_SECRET, SMTP_*, dll.

# 4. Generate Prisma client
npm run db:generate

# 5. Jalankan migrasi database
npm run db:migrate

# 6. Seed data awal (admin + kategori + tag)
npm run db:seed

# 7. Jalankan dev server
npm run dev
# → http://localhost:5000
```

---

## Environment Variables

| Variabel | Wajib | Keterangan |
|----------|-------|------------|
| `DATABASE_URL` | ✅ | MySQL connection string |
| `JWT_SECRET` | ✅ | Secret key JWT access token |
| `JWT_REFRESH_SECRET` | ✅ | Secret key JWT refresh token |
| `PORT` | ❌ | Default: `5000` |
| `NODE_ENV` | ❌ | `development` / `production` |
| `ALLOWED_ORIGINS` | ❌ | Comma-separated origins untuk CORS |
| `SMTP_HOST` | ❌ | SMTP server |
| `SMTP_USER` | ❌ | Email pengirim |
| `SMTP_PASS` | ❌ | App password email |
| `UPLOAD_DIR` | ❌ | Default: `uploads` |
| `MAX_FILE_SIZE` | ❌ | Default: `10485760` (10MB) |
| `ADMIN_EMAIL` | ❌ | Email admin default (untuk seed) |
| `ADMIN_PASSWORD` | ❌ | Password admin default (untuk seed) |

---

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

### 🔐 Auth
| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| POST | `/auth/register` | Public | Daftar user baru (role: EDITOR) |
| POST | `/auth/login` | Public | Login, return accessToken + cookie |
| POST | `/auth/refresh` | Public | Refresh access token |
| POST | `/auth/logout` | Auth | Logout + clear cookie |
| GET | `/auth/me` | Auth | Info user yang login |
| PATCH | `/auth/change-password` | Auth | Ganti password |

### 📝 Blog Posts
| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/posts` | Public | List post (filter: category, tag, search, page) |
| GET | `/posts/:slug` | Public | Detail post + increment view |
| POST | `/posts` | Editor+ | Buat post baru |
| PUT | `/posts/:id` | Editor+ | Update post |
| DELETE | `/posts/:id` | Admin | Hapus post |

### 🎨 Projects
| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/projects` | Public | List project (filter: featured) |
| GET | `/projects/:slug` | Public | Detail project |
| POST | `/projects` | Editor+ | Buat project |
| PUT | `/projects/:id` | Editor+ | Update project |
| DELETE | `/projects/:id` | Admin | Hapus project |
| PATCH | `/projects/reorder` | Admin | Ubah urutan project |

### 📬 Contact
| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| POST | `/contact` | Public (rate-limited) | Kirim pesan kontak |
| GET | `/contact` | Admin | List semua pesan |
| GET | `/contact/:id` | Admin | Detail + auto-mark read |
| PATCH | `/contact/:id/status` | Admin | Update status pesan |
| DELETE | `/contact/:id` | Admin | Hapus pesan |

### 📧 Newsletter
| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| POST | `/newsletter/subscribe` | Public | Subscribe email |
| GET | `/newsletter/unsubscribe?token=` | Public | Unsubscribe via token |
| GET | `/newsletter` | Admin | List subscribers |
| DELETE | `/newsletter/:id` | Admin | Hapus subscriber |

### 🖼️ Media
| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/media` | Editor+ | List media (filter: type) |
| POST | `/media/upload` | Editor+ | Upload file (multipart/form-data) |
| PATCH | `/media/:id` | Editor+ | Update alt text |
| DELETE | `/media/:id` | Editor+ | Hapus media + file fisik |

### 🏷️ Categories & Tags
| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/categories` | Public | List kategori |
| POST | `/categories` | Editor+ | Buat kategori |
| PUT | `/categories/:id` | Editor+ | Update kategori |
| DELETE | `/categories/:id` | Admin | Hapus kategori |
| GET | `/tags` | Public | List tag |
| POST | `/tags` | Editor+ | Buat tag |
| DELETE | `/tags/:id` | Admin | Hapus tag |

### 🛠️ Admin
| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/admin/dashboard` | Admin | Stats dashboard |
| GET | `/admin/users` | Admin | List user |
| PATCH | `/admin/users/:id` | Admin | Update role/status user |
| DELETE | `/admin/users/:id` | Admin | Hapus user |

---

## Response Format

```json
{
  "success": true,
  "message": "Opsional",
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

Error:
```json
{
  "success": false,
  "message": "Pesan error",
  "errors": [{ "field": "email", "message": "Email tidak valid" }]
}
```

---

## Role Hierarchy

| Role | Akses |
|------|-------|
| `ADMIN` | Semua endpoint |
| `EDITOR` | Create/edit post, project, media, category, tag |
| *(public)* | Read published content, contact form, newsletter |

---

## Docker

```bash
cd backend

# Build
docker build -t lazdev-backend .

# Jalankan
docker run --rm -p 5000:5000 --env-file .env lazdev-backend
```

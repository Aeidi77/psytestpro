# Psikotes Online

Sistem Manajemen Tes Psikotes Online dibangun dengan **React + Vite + Tailwind**. Mendukung **role Admin & User** dengan dashboard berbeda, data disimpan di **LocalStorage**, dan fitur **CRUD, Filter, Sorting, Search**.

## Fitur
- Login & Register (LocalStorage)
- Dashboard Admin (CRUD Tes, lihat hasil)
- Dashboard User (mulai tes, lihat hasil)
- Halaman Tes (mengerjakan tes dan skor otomatis)
- Filter, Sorting, Search daftar tes
- Header & Footer responsif dengan Lucide icons
- Hooks: useState, useEffect, useContext
- Routing dengan React Router
- Siap deploy ke Vercel

## Jalankan
```bash
pnpm install
pnpm dev
```
Login cepat:
- Admin: **admin / admin123**
- User: **user / user123**

## Struktur
- `src/state/AuthContext.jsx` — autentikasi & role
- `src/pages/AdminDashboard.jsx` — CRUD tes
- `src/pages/Tests.jsx` — filter/sort/search
- `src/pages/TestTake.jsx` — pengerjaan tes + skor
- `src/pages/Results.jsx` — hasil tes
- `src/components/Header.jsx` & `Footer.jsx` — UI global

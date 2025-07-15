# mcp-grading

## Deskripsi

**mcp-grading** adalah sebuah sistem penilaian (grading) berbasis web yang terdiri dari dua bagian utama:
- **backend-grading**: Backend berbasis Node.js/Express yang menyediakan API untuk pengelolaan data siswa, penilaian, dan mapel.
- **mcp-grading**: Frontend (atau core logic) yang berisi resource, service, dan tools untuk mengakses backend serta menjalankan aplikasi.

## Struktur Proyek

```
grading-mcp/
  ├── backend-grading/      # Backend Express API
  │   ├── app.js
  │   ├── routes/           # Routing untuk siswa, penilaian, mapel, users
  │   └── public/           # Static files (HTML, CSS, JS)
  ├── mcp-grading/          # Frontend/core logic
  │   ├── src/
  │   │   ├── core/         # Prompts, resources, services, tools
  │   │   └── server/       # HTTP server
  │   └── README.md
  └── config/               # Konfigurasi project
```

## Fitur Utama

- Manajemen data siswa, mata pelajaran, dan penilaian.
- API RESTful untuk operasi CRUD.
- Struktur modular untuk pengembangan lebih lanjut.
- Dokumentasi dan konfigurasi terpisah.

## Cara Menjalankan

### 1. Jalankan Backend

Masuk ke folder `backend-grading` dan install dependencies:

```bash
cd backend-grading
npm install
npm start
```

Secara default, backend akan berjalan di port 3000.

### 2. Jalankan Frontend/Core

Masuk ke folder `mcp-grading` dan install dependencies:

```bash
cd mcp-grading
npm install
npm start:http
```

### 3. Akses Aplikasi

- Backend API: `http://localhost:3000`
- Frontend/core: (Sesuai konfigurasi pada `mcp-grading`)

## Kontribusi

1. Fork repository ini.
2. Buat branch baru untuk fitur/bugfix.
3. Lakukan perubahan dan commit.
4. Ajukan pull request.

## Lisensi

Project ini menggunakan lisensi MIT.

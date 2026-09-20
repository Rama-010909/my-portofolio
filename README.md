# NOVA — Portfolio Website + Admin Panel

## File Structure
```
portfolio-website/
├── index.html      → Halaman portfolio (publik)
├── styles.css      → Desain & animasi portfolio
├── script.js       → Logic portfolio
├── admin.html      → Halaman admin (login + dashboard)
├── admin.css       → Desain admin panel
├── admin.js        → Logic admin (CRUD)
└── README.md
```

## Cara Pakai

1. Buka `index.html` di browser untuk lihat portfolio
2. Klik ikon **shield** di navbar → masuk ke `admin.html`
3. Login:
   - Username: `admin`
   - Password: `nova2026`

## Fitur Admin (Halaman Sendiri)

### Profil & Foto
- Upload / hapus **foto profil** (muncul di About section)
- Edit nama tampilan & jabatan

### Konten Teks
- Edit Hero subtitle
- Edit About title & description
- Edit email & lokasi
- Edit angka stats (Projects, Years, Clients)

### Projects (Full CRUD)
- **Tambah** project baru
- **Edit** judul, kategori, deskripsi, tags, icon
- **Upload gambar** project (tampil di card)
- **Hapus** project

### Skills
- Tambah / edit / hapus skill + level

### Experience
- Tambah / edit / hapus timeline experience

### Settings
- Ganti username & password
- Reset semua data ke default

## Catatan
- Semua data tersimpan di **localStorage** browser
- Foto disimpan sebagai base64 (max disarankan 2MB per foto)
- Setelah edit di admin, klik **Simpan Semua**, lalu refresh `index.html`
- Tidak butuh backend / database / server

## Deploy
Upload seluruh folder ke Vercel, Netlify, GitHub Pages, atau hosting statis apapun.

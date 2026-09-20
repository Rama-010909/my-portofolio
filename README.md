# RAMZZ — Portfolio Website + Admin Panel

## Login Admin
- Username: `rama`
- Password: `010909`

Buka file `admin.html` untuk masuk ke panel admin.

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

## Fitur Admin
- Upload / ganti foto profil
- Edit semua teks (Hero, About, Contact, Stats)
- Tambah / edit / hapus Projects + upload gambar
- Kelola Skills & Experience
- Ganti username & password

## Catatan
- Data tersimpan di localStorage browser
- Setelah edit, klik **Simpan Semua**, lalu refresh index.html
- Jika login gagal, clear Local Storage key `ramzzPortfolio` di browser (F12 → Application)

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

## Cloud Sync (production)

1. Firebase Console → Realtime Database → create in **production mode** (bukan test mode)
2. Rules → Publish:

```json
{
  "rules": {
    "ramzz": {
      ".read": true,
      ".write": true
    },
    ".read": false,
    ".write": false
  }
}
```

3. Copy Database URL → Admin → Settings → paste → Simpan Semua
4. Upload foto / edit konten → Simpan Semua (otomatis ke cloud)

## Firebase Realtime Database
Database utama: `https://my-portofolio-rama-default-rtdb.asia-southeast1.firebasedatabase.app/ramzz`.
Portfolio tidak menggunakan localStorage sebagai penyimpanan data.
Tombol **Simpan Semua** mengirim seluruh data portfolio dengan HTTP PUT ke Firebase Realtime Database.

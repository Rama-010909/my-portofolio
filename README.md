# NOVA — Ultra Unique Portfolio Website

Portfolio website dengan desain **Cyber Nebula / Glass Void** yang jarang ditemui.

## Fitur Utama

### Design & Animation
- Particle nebula background interaktif (bereaksi ke mouse)
- Custom cursor dengan efek hover
- Full glassmorphism + neon glow
- Loading screen animasi orbit
- Orbit animation di hero section
- Skill cards dengan progress bar animasi
- Timeline experience dengan reveal animation
- Smooth scroll & section transitions
- Floating cards di about section
- Project filter dengan animasi

### Admin Panel
- Login protected (username + password)
- Edit Hero, About, Contact info
- Kelola Projects (tambah/hapus/edit)
- Kelola Skills
- Kelola Experience / Timeline
- Ganti username & password
- Reset data ke default
- Semua perubahan tersimpan di localStorage browser

## Cara Menjalankan

Cukup buka file `index.html` di browser (double click atau drag ke browser).

Atau pakai live server:
```bash
# Jika punya Python
python -m http.server 8000

# Atau dengan Node
npx serve .
```

Lalu buka `http://localhost:8000`

## Login Admin

Klik ikon **shield** di kanan atas navbar.

**Default credentials:**
- Username: `admin`
- Password: `nova2026`

Setelah login, kamu bisa ubah semua konten dan ganti password di tab Settings.

## Kustomisasi Cepat

1. Login ke admin
2. Edit teks di tab Content
3. Tambah/edit project, skill, experience
4. Klik **Save All**
5. Refresh halaman utama untuk melihat hasil

## Catatan

- Data disimpan di **localStorage** browser (tidak hilang saat refresh)
- Kalau mau deploy ke hosting (Vercel, Netlify, GitHub Pages), cukup upload folder ini
- Tidak butuh backend / database
- Fully responsive (mobile friendly)

---

Dibuat dengan pure HTML, CSS & Vanilla JS — tanpa framework, tanpa build step.

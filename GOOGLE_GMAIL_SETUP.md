# RAMZZ Portfolio — Direct Gmail Setup

Form tetap: Nama, Email, Pesan. Pengiriman memakai Google Apps Script dan Gmail, tanpa FormSubmit dan tanpa mailto.

## 1. Buat Google Apps Script
1. Buka https://script.google.com/ dan login dengan Gmail yang akan menerima pesan.
2. New project.
3. Hapus kode bawaan lalu salin isi `GOOGLE_APPS_SCRIPT.gs`.
4. Ganti `GANTI_DENGAN_GMAIL_KAMU` dengan alamat Gmail penerima.
5. Save.
6. Deploy > New deployment > Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Klik Deploy dan izinkan akses yang diminta Google.
10. Salin Web app URL yang berakhiran `/exec`.

## 2. Pasang URL ke website
Buka `portfolio-website/script.js`, cari:
`PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
Ganti teks itu dengan URL Web App `/exec`.

Setelah itu upload folder website ke Vercel seperti biasa.

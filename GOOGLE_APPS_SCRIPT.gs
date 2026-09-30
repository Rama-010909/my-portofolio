// RAMZZ Portfolio - Google Apps Script
// 1. Ganti DESTINATION_EMAIL dengan Gmail yang menerima pesan.
// 2. Deploy sebagai Web app: Execute as Me, Who has access: Anyone.

const DESTINATION_EMAIL = "GANTI_DENGAN_GMAIL_KAMU";

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);
    const name = String(data.name || "Pengunjung").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();
    const page = String(data.page || "").trim();

    if (!name || !email || !message) throw new Error("Data form tidak lengkap.");
    if (!DESTINATION_EMAIL || DESTINATION_EMAIL.includes("GANTI_DENGAN")) throw new Error("DESTINATION_EMAIL belum diatur.");

    const subject = "Pesan dari Portfolio RAMZZ — " + name;
    const plain = [
      "Nama: " + name,
      "Email: " + email,
      "",
      "Pesan:",
      message,
      "",
      "Halaman: " + page
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Pesan dari Portfolio RAMZZ</h2>
        <p><b>Nama:</b> ${escapeHtml_(name)}</p>
        <p><b>Email:</b> ${escapeHtml_(email)}</p>
        <p><b>Pesan:</b></p>
        <div style="white-space:pre-wrap;padding:12px;border:1px solid #ddd;border-radius:8px">${escapeHtml_(message)}</div>
        <p><small>Halaman: ${escapeHtml_(page)}</small></p>
      </div>`;

    MailApp.sendEmail({
      to: DESTINATION_EMAIL,
      subject: subject,
      body: plain,
      htmlBody: html,
      replyTo: email,
      name: "RAMZZ Portfolio"
    });

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err.message || err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

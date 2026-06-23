const mainMenu = `
╔══════════════════════════════════════════╗
║     Selamat Datang di Layanan Virtual    ║
║           Assistant Pelayanan            ║
╚══════════════════════════════════════════╝

Kami siap membantu Anda. Silakan pilih layanan yang diinginkan dengan membalas nomor menu di bawah ini:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1️⃣  Informasi Layanan & Produk
 2️⃣  Cek Status Permohonan
 3️⃣  Panduan & Persyaratan
 4️⃣  Hubungi Customer Service
 5️⃣  Pertanyaan Umum (FAQ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Ketik *0* untuk kembali ke menu utama
📌 Ketik *menu* kapan saja untuk mengulang

*Terima kasih telah menghubungi kami.*
`;

const subMenus = {
  1: {
    title: 'INFORMASI LAYANAN & PRODUK',
    body: `
Berikut adalah informasi layanan yang tersedia. Silakan pilih dengan membalas huruf yang sesuai:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 a.  Layanan Pengaduan Masyarakat
 b.  Informasi Produk & Program
 c.  Jam Operasional Pelayanan
 d.  Alamat & Lokasi Kantor
 e.  Kebijakan & Regulasi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ketik *a/b/c/d/e* untuk melihat detail informasi.
Ketik *0* untuk kembali ke menu utama.`,
    children: {
      a: `
━━━ LAYANAN PENGADUAN MASYARAKAT ━━━

Kami menerima pengaduan, saran, dan masukan melalui saluran resmi berikut:

📞 *Telepon:* 021-12345678
🌐 *Website:* www.perusahaan.com/pengaduan
📧 *Email:* pengaduan@perusahaan.com

Apabila Anda ingin menyampaikan pengaduan melalui chat ini, silakan kirimkan data berikut:

*Nama Lengkap:*
*Nomor Identitas:*
*Nomor Telepon:*
*Isi Pengaduan:*
*Lokasi Kejadian:*
*Tanggal Kejadian:*

⏱ *Estimasi respon:* 1×24 jam kerja
📌 *Nomor tiket pengaduan* akan kami kirimkan setelah laporan diterima.

Ketik *0* untuk kembali ke menu utama.`,
      b: `
━━━ INFORMASI PRODUK & PROGRAM ━━━

Saat ini kami menyediakan berbagai produk dan program layanan sebagai berikut:

1️⃣ *Produk Utama*
   Deskripsi lengkap produk utama dan manfaatnya.

2️⃣ *Program Kemitraan*
   Informasi program kemitraan dan kerja sama.

3️⃣ *Layanan Premium*
   Layanan eksklusif untuk pengguna terdaftar.

📌 Untuk informasi lebih detail mengenai produk dan program, silakan kunjungi website resmi kami di www.perusahaan.com atau hubungi Customer Service kami.

Ketik *0* untuk kembali ke menu utama.`,
      c: `
━━━ JAM OPERASIONAL PELAYANAN ━━━

Berikut adalah jam operasional kantor kami:

🏢 *Kantor Pusat*
   Senin – Kamis : 08.00 – 16.00 WIB
   Jumat          : 08.00 – 16.30 WIB

🏪 *Unit Layanan Terpadu*
   Senin – Jumat : 08.00 – 15.00 WIB

📌 *Sabtu, Minggu & Hari Libur Nasional:* TUTUP

⏰ *Layanan Pengaduan 24 Jam*
    Pengaduan dapat disampaikan kapan saja melalui website atau email kami.

Ketik *0* untuk kembali ke menu utama.`,
      d: `
━━━ ALAMAT & LOKASI KANTOR ━━━

Kantor Pusat
📍 Jl. Profesional No. 123
   Kelurahan Contoh, Kecamatan Teladan
   Jakarta Pusat 12345

Unit Layanan Terpadu
📍 Gedung Pelayanan Lt. 1
   Jl. Pelayanan No. 45
   Jakarta Selatan 54321

📌 Untuk melihat lokasi kantor cabang terdekat, silakan kunjungi website resmi kami di www.perusahaan.com/lokasi atau hubungi Customer Service.

Ketik *0* untuk kembali ke menu utama.`,
      e: `
━━━ KEBIJAKAN & REGULASI ━━━

Seluruh layanan kami diselenggarakan berdasarkan peraturan dan kebijakan yang berlaku, antara lain:

📜 Undang-Undang No. XX/20XX tentang Pelayanan Publik
📜 Peraturan Pemerintah No. XX/20XX tentang Standar Pelayanan
📜 Peraturan Menteri No. XX/20XX tentang Tata Cara Pelayanan
📜 Keputusan Direksi No. XXX/20XX tentang Kebijakan Mutu Layanan

📌 Dokumen regulasi selengkapnya dapat diakses melalui website resmi kami.

Ketik *0* untuk kembali ke menu utama.`
    }
  },
  2: {
    title: 'CEK STATUS PERMOHONAN',
    body: `
Silakan pilih jenis status yang ingin Anda ketahui:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 a.  Status Pendaftaran
 b.  Status Pengaduan
 c.  Status Pembayaran
 d.  Status Kelengkapan Berkas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ketik *a/b/c/d* untuk melanjutkan.
Ketik *0* untuk kembali ke menu utama.`,
    children: {
      a: `
━━━ CEK STATUS PENDAFTARAN ━━━

Untuk mengetahui status pendaftaran Anda, silakan kirimkan *Nomor Registrasi* yang telah diberikan saat pendaftaran.

Contoh format:
*REG-2025-XXXXXX*

📌 Nomor registrasi terdiri dari 12 karakter dan telah dikirimkan melalui email/SMS saat Anda mendaftar.

Ketik *0* untuk kembali ke menu utama.`,
      b: `
━━━ CEK STATUS PENGADUAN ━━━

Untuk mengetahui status pengaduan Anda, silakan kirimkan *Nomor Tiket* yang telah diberikan saat pengaduan dilaporkan.

Contoh format:
*TKT-2025-XXXXXX*

📌 Jika Anda belum memiliki nomor tiket, silakan menyampaikan pengaduan terlebih dahulu melalui menu *Layanan Pengaduan Masyarakat*.

Ketik *0* untuk kembali ke menu utama.`,
      c: `
━━━ CEK STATUS PEMBAYARAN ━━━

Untuk mengetahui status pembayaran, silakan kirimkan *Nomor Invoice* atau *Kode Billing* yang tertera pada bukti pembayaran.

Contoh format:
*INV-2025-XXXXXX*
*BILL-2025-XXXXXX*

📌 Pembayaran yang telah diverifikasi akan mempercepat proses layanan Anda.

Ketik *0* untuk kembali ke menu utama.`,
      d: `
━━━ CEK KELENGKAPAN BERKAS ━━━

Untuk mengetahui status kelengkapan berkas permohonan Anda, silakan kirimkan *Nomor Permohonan* yang tertera pada tanda terima dokumen.

Contoh format:
*PMN-2025-XXXXXX*

📌 Petugas kami akan memeriksa dan memberikan informasi mengenai dokumen yang masih kurang atau perlu dilengkapi.

Ketik *0* untuk kembali ke menu utama.`
    }
  },
  3: {
    title: 'PANDUAN & PERSYARATAN',
    body: `
Berikut adalah panduan lengkap dan persyaratan yang harus disiapkan:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1️⃣  Persyaratan Dokumen
 2️⃣  Tata Cara Pendaftaran
 3️⃣  Alur Proses Layanan
 4️⃣  Estimasi Waktu Penyelesaian
 5️⃣  Biaya & Tarif Layanan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ketik nomor *1/2/3/4/5* untuk melihat informasi.
Ketik *0* untuk kembali ke menu utama.`,
    children: {
      1: `
━━━ PERSYARATAN DOKUMEN ━━━

Dokumen yang wajib disiapkan sebelum mengajukan permohonan:

📋 *Dokumen Wajib:*
  1. Fotokopi KTP (masih berlaku)
  2. Fotokopi Kartu Keluarga
  3. Pas foto terbaru 3×4 (2 lembar)
  4. Surat permohonan bermaterai

📋 *Dokumen Pendukung (jika diperlukan):*
  5. Fotokopi NPWP
  6. Surat keterangan domisili
  7. Dokumen pendukung lainnya sesuai jenis layanan

🔔 *Catatan Penting:*
• Seluruh dokumen harus dalam kondisi jelas dan terbaca
• Dokumen asli wajib ditunjukkan saat verifikasi
• Kelengkapan dokumen mempercepat proses layanan

Ketik *0* untuk kembali ke menu utama.`,
      2: `
━━━ TATA CARA PENDAFTARAN ━━━

Pendaftaran dapat dilakukan melalui dua jalur:

🔵 *Pendaftaran Online:*
  1. Kunjungi website www.perusahaan.com/daftar
  2. Isi formulir pendaftaran secara lengkap
  3. Upload dokumen persyaratan
  4. Klik "Kirim Permohonan"
  5. Simpan nomor registrasi yang muncul

🟢 *Pendaftaran Offline (Langsung):*
  1. Datang ke kantor terdekat
  2. Ambil nomor antrean
  3. Serahkan dokumen persyaratan ke petugas
  4. Isi formulir pendaftaran
  5. Terima tanda terima dokumen

⏱ Proses verifikasi akan memakan waktu 1-3 hari kerja setelah dokumen dinyatakan lengkap.

Ketik *0* untuk kembali ke menu utama.`,
      3: `
━━━ ALUR PROSES LAYANAN ━━━

Berikut adalah alur proses layanan secara umum:

1️⃣ *Pendaftaran*
   □ Pengajuan permohonan oleh pemohon
   □ Pemeriksaan kelengkapan dokumen

2️⃣ *Verifikasi*
   □ Verifikasi data dan dokumen
   □ Konfirmasi kebenaran informasi

3️⃣ *Proses*
   □ Pemrosesan permohonan
   □ Pengecekan dan validasi akhir

4️⃣ *Penyelesaian*
   □ Penerbitan hasil/dokumen
   □ Pemberitahuan kepada pemohon

📌 Status permohonan dapat dicek secara berkala melalui menu *Cek Status Permohonan*.

Ketik *0* untuk kembali ke menu utama.`,
      4: `
━━━ ESTIMASI WAKTU PENYELESAIAN ━━━

Berikut estimasi waktu penyelesaian setiap tahapan layanan:

⏱ *Verifikasi Berkas*   : 1-2 hari kerja
⏱ *Proses Permohonan*   : 3-5 hari kerja
⏱ *Penerbitan Dokumen*  : 1-2 hari kerja
⏱ *Total Keseluruhan*   : 5-9 hari kerja

📌 Estimasi waktu dapat berbeda tergantung pada:
   • Kelengkapan dokumen yang diserahkan
   • Volume permohonan yang sedang diproses
   • Jenis layanan yang diajukan

📌 *Pengaduan prioritas* akan ditangani dalam waktu 1×24 jam.

Ketik *0* untuk kembali ke menu utama.`,
      5: `
━━━ BIAYA & TARIF LAYANAN ━━━

Berikut informasi mengenai biaya layanan:

💰 *Biaya Pendaftaran*        : GRATIS (tidak dipungut biaya)
💰 *Biaya Penggantian Dokumen* : Rp50.000,-
💰 *Biaya Legalisir*          : Rp25.000,- per lembar
💰 *Biaya Akses Premium*      : Rp150.000,-/tahun

🔔 *Peringatan!*
   Kami TIDAK pernah meminta biaya tambahan di luar ketentuan resmi.
   Waspada terhadap segala bentuk penipuan yang mengatasnamakan perusahaan.
   Seluruh pembayaran resmi dilakukan melalui bank yang ditunjuk.

📌 Informasi tarif selengkapnya dapat diakses di www.perusahaan.com/tarif.

Ketik *0* untuk kembali ke menu utama.`
    }
  },
  4: {
    title: 'HUBUNGI CUSTOMER SERVICE',
    body: `
Kami siap membantu Anda melalui berbagai saluran komunikasi berikut:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞  *Telepon*
    021-12345678 (Senin-Jumat, 08.00-16.00)

💬  *WhatsApp*
    0812-3456-7890 (24 jam)

📧  *Email*
    cs@perusahaan.com

🌐  *Website*
    www.perusahaan.com

📍  *Kantor Pusat*
    Jl. Profesional No. 123, Jakarta Pusat
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Anda juga dapat menyampaikan pesan langsung melalui chat ini dan petugas kami akan merespon sesegera mungkin.

Ketik *0* untuk kembali ke menu utama.`
  },
  5: {
    title: 'PERTANYAAN UMUM (FAQ)',
    body: `
Berikut adalah pertanyaan yang sering diajukan oleh pengguna layanan:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1️⃣  Bagaimana cara melakukan reset password?
 2️⃣  Berapa lama proses pendaftaran?
 3️⃣  Apakah ada biaya pendaftaran?
 4️⃣  Bagaimana cara memperbarui data diri?
 5️⃣  Apa yang harus dilakukan jika lupa nomor registrasi?
 6️⃣  Bagaimana cara mengajukan pengaduan?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ketik nomor *1/2/3/4/5/6* untuk melihat jawaban.
Ketik *0* untuk kembali ke menu utama.`,
    children: {
      1: `
━━━ FAQ: RESET PASSWORD ━━━

🔹 *Bagaimana cara melakukan reset password?*

Langkah-langkah reset password:

1. Buka halaman login di website www.perusahaan.com
2. Klik menu *"Lupa Password"* atau *"Forgot Password"*
3. Masukkan alamat email yang terdaftar
4. Cek email Anda untuk tautan reset password
5. Klik tautan dan buat password baru
6. Login kembali menggunakan password baru

📌 Jika tidak menerima email reset, periksa folder *Spam* atau *Promotions*.
📌 Pastikan email yang dimasukkan sesuai dengan yang didaftarkan.

Ketik *0* untuk kembali ke menu utama.`,
      2: `
━━━ FAQ: LAMA PROSES PENDAFTARAN ━━━

🔹 *Berapa lama proses pendaftaran?*

Proses pendaftaran umumnya memakan waktu:

✅ *Berkas Lengkap*        : 1-3 hari kerja
✅ *Verifikasi Data*       : 1-2 hari kerja
✅ *Penerbitan Dokumen*    : 1-2 hari kerja

📌 *Total estimasi:* 3-7 hari kerja sejak dokumen dinyatakan lengkap.

📌 Faktor yang mempengaruhi lama proses:
   • Kelengkapan dokumen persyaratan
   • Kebenaran data yang diisi
   • Volume permohonan yang masuk

Ketik *0* untuk kembali ke menu utama.`,
      3: `
━━━ FAQ: BIAYA PENDAFTARAN ━━━

🔹 *Apakah ada biaya pendaftaran?*

TIDAK. Pendaftaran *GRATIS* dan tidak dipungut biaya sepeser pun.

⚠️ *WASPADA PENIPUAN!*
   • Kami tidak pernah meminta biaya di luar ketentuan
   • Kami tidak pernah meminta transfer ke rekening pribadi
   • Segala bentuk pungutan liar dapat dilaporkan

💰 Biaya hanya dikenakan untuk layanan tertentu seperti:
   • Legalisir dokumen
   • Penggantian dokumen hilang
   • Layanan premium (opsional)

Ketik *0* untuk kembali ke menu utama.`,
      4: `
━━━ FAQ: PERBARUI DATA DIRI ━━━

🔹 *Bagaimana cara memperbarui data diri?*

Pembaruan data diri dapat dilakukan melalui:

🟢 *Online:*
   1. Login ke akun Anda di website
   2. Masuk ke menu *"Profil"* atau *"Data Saya"*
   3. Klik *"Ubah Data"*
   4. Perbarui data yang diperlukan
   5. Simpan perubahan

🔵 *Offline:*
   1. Datang ke kantor terdekat
   2. Bawa dokumen pendukung (KTP, KK)
   3. Isi formulir perubahan data
   4. Serahkan ke petugas

📌 Perubahan data penting (nama, alamat) memerlukan verifikasi tambahan.

Ketik *0* untuk kembali ke menu utama.`,
      5: `
━━━ FAQ: NOMOR REGISTRASI HILANG ━━━

🔹 *Apa yang harus dilakukan jika lupa nomor registrasi?*

Jika Anda lupa nomor registrasi, silakan hubungi Customer Service melalui:

📞 Telepon: 021-12345678
💬 WhatsApp: 0812-3456-7890
📧 Email: cs@perusahaan.com

Sertakan data berikut untuk verifikasi:
   • Nama lengkap
   • Nomor KTP
   • Tanggal pendaftaran (perkiraan)

📌 Petugas kami akan membantu menemukan nomor registrasi Anda setelah data diverifikasi.

Ketik *0* untuk kembali ke menu utama.`,
      6: `
━━━ FAQ: CARA MENGAJUKAN PENGADUAN ━━━

🔹 *Bagaimana cara mengajukan pengaduan?*

Pengaduan dapat diajukan melalui beberapa saluran:

1️⃣ *Melalui Chat ini*
   Kirimkan detail pengaduan Anda langsung melalui chat ini dengan format:
   • Nama lengkap
   • Isi pengaduan
   • Tanggal & lokasi kejadian

2️⃣ *Melalui Website*
   www.perusahaan.com/pengaduan

3️⃣ *Melalui Email*
   pengaduan@perusahaan.com

4️⃣ *Datang Langsung*
   Ke kantor terdekat dengan membawa dokumen pendukung

📌 Setiap pengaduan akan diberikan nomor tiket untuk memudahkan pengecekan status.

Ketik *0* untuk kembali ke menu utama.`
    }
  }
};

module.exports = { mainMenu, subMenus };

const header = `LAYANAN INFORMASI DAN PELAYANAN PUBLIK`;

const mainMenu = `${header}

Selamat datang di Layanan Chatbot BNNP Sulsel. Sahabat dapat memilih opsi menu yang dibutuhkan:`;

const subMenus = {
  1: {
    title: 'INFORMASI LAYANAN DAN PRODUK',
    body: `${header}

Silakan pilih informasi yang Anda butuhkan:

 a.  Layanan Pengaduan Masyarakat
 b.  Informasi Produk dan Program
 c.  Jam dan Hari Operasional
 d.  Alamat dan Lokasi Kantor
 e.  Landasan Hukum dan Regulasi
`,
    children: {
      a: `${header}

LAYANAN PENGADUAN MASYARAKAT

Kami menerima pengaduan, saran, dan masukan melalui:

📞  021-12345678
📧  pengaduan@perusahaan.com
🌐  www.perusahaan.com/pengaduan

Untuk menyampaikan pengaduan melalui chat ini, kirimkan:

 1. Nama lengkap
 2. NIK
 3. Alamat lengkap
 4. No. telepon
 5. Uraian pengaduan
 6. Lokasi dan waktu kejadian

⏱ Estimasi penanganan: 1×24 jam kerja setelah diverifikasi.
📌 Nomor tiket akan diterbitkan setelah pengaduan diregistrasi.
`,
      b: `${header}

INFORMASI PRODUK DAN PROGRAM

Produk dan program layanan yang kami sediakan:

 1️⃣ Layanan Utama — Layanan inti pelayanan publik
 2️⃣ Program Kemitraan — Kerja sama dengan berbagai pihak
 3️⃣ Layanan Premium — Fasilitas prioritas (opsional)

Informasi lengkap dapat diakses di www.perusahaan.com atau hubungi Customer Service.
`,
      c: `${header}

JAM DAN HARI OPERASIONAL

🏢 Kantor Pusat
   Senin–Kamis : 08.00 – 16.00 WIB
   Jumat       : 08.00 – 16.30 WIB

🏪 Unit Pelayanan Terpadu
   Senin–Jumat : 08.00 – 15.00 WIB

❌ Sabtu, Minggu, dan Hari Libur Nasional: TUTUP

☎️ Pengaduan dapat disampaikan 24 jam via website/email.
`,
      d: `${header}

ALAMAT DAN LOKASI KANTOR

🏛️ Kantor Pusat
   Jl. Profesional No. 123, Jakarta Pusat 12345
   📞 021-12345678

🏪 Unit Pelayanan Terpadu
   Gedung Pelayanan Lt. 1, Jl. Pelayanan No. 45
   Jakarta Selatan 54321
   📞 021-87654321

Lokasi kantor cabang: www.perusahaan.com/lokasi
`,
      e: `${header}

LANDASAN HUKUM DAN REGULASI

Layanan kami berdasarkan peraturan berikut:

📜 UU No. XX/20XX tentang Pelayanan Publik
📜 PP No. XX/20XX tentang Standar Pelayanan
📜 Permen No. XX/20XX tentang Tata Cara Pelayanan
📜 Keputusan Direksi No. XXX/20XX tentang SOP

Dokumen selengkapnya: www.perusahaan.com/regulasi
`
    }
  },
  2: {
    title: 'STATUS PERMOHONAN LAYANAN',
    body: `${header}

Pilih jenis status yang ingin diketahui:

 a.  Status Pendaftaran
 b.  Status Pengaduan
 c.  Status Pembayaran
 d.  Status Kelengkapan Berkas
`,
    children: {
      a: `${header}

CEK STATUS PENDAFTARAN

Kirimkan *Nomor Registrasi* Anda untuk mengecek status pendaftaran.

Format: *REG-2025-XXXXXX* (12 karakter)

Nomor registrasi telah dikirim melalui SMS/Email saat pendaftaran.
`,
      b: `${header}

CEK STATUS PENGADUAN

Kirimkan *Nomor Tiket* yang diterbitkan saat pengaduan diregistrasi.

Format: *TKT-2025-XXXXXX*

Belum punya nomor tiket? Sampaikan pengaduan melalui menu *Layanan Pengaduan Masyarakat* terlebih dahulu.
`,
      c: `${header}

CEK STATUS PEMBAYARAN

Kirimkan *Nomor Invoice* atau *Kode Billing* dari bukti pembayaran.

Format:
   Invoice: *INV-2025-XXXXXX*
   Billing: *BILL-2025-XXXXXX*

Pembayaran yang terverifikasi akan mempercepat proses layanan.
`,
      d: `${header}

CEK KELENGKAPAN BERKAS

Kirimkan *Nomor Permohonan* yang tercantum pada tanda terima dokumen.

Format: *PMN-2025-XXXXXX*

Petugas akan menginformasikan dokumen yang masih kurang.
`
    }
  },
  3: {
    title: 'PANDUAN, PERSYARATAN, DAN KETENTUAN',
    body: `${header}

Pilih informasi yang Anda butuhkan:

 1️⃣  Persyaratan Dokumen
 2️⃣  Tata Cara Pendaftaran
 3️⃣  Alur Proses Layanan
 4️⃣  Estimasi Waktu Penyelesaian
 5️⃣  Biaya dan Tarif Layanan
`,
    children: {
      1: `${header}

PERSYARATAN DOKUMEN

Dokumen Wajib:
✅ Fotokopi KTP (masih berlaku)
✅ Fotokopi Kartu Keluarga
✅ Pas foto 3×4 (2 lembar)
✅ Surat permohonan bermaterai

Dokumen Pendukung:
✅ Fotokopi NPWP
✅ Surat keterangan domisili
✅ Dokumen lain sesuai jenis layanan

Ketentuan:
• Dokumen harus jelas dan terbaca
• Dokumen asli ditunjukkan saat verifikasi
• Kelengkapan dokumen mempercepat proses
`,
      2: `${header}

TATA CARA PENDAFTARAN

🌐 Online
   1. Akses www.perusahaan.com/daftar
   2. Isi formulir pendaftaran
   3. Upload dokumen persyaratan
   4. Klik "Kirim Permohonan"
   5. Simpan nomor registrasi

🏛️ Offline (Langsung)
   1. Datang ke kantor terdekat
   2. Ambil nomor antrean
   3. Serahkan dokumen ke petugas
   4. Isi formulir pendaftaran
   5. Terima tanda terima dokumen

⏱ Verifikasi: 1-3 hari kerja setelah dokumen lengkap.
`,
      3: `${header}

ALUR PROSES LAYANAN

 1️⃣ Pendaftaran
    → Pengajuan permohonan
    → Pemeriksaan kelengkapan

 2️⃣ Verifikasi
    → Verifikasi data dan dokumen
    → Konfirmasi informasi

 3️⃣ Pemrosesan
    → Pengolahan permohonan
    → Validasi akhir

 4️⃣ Penyelesaian
    → Penerbitan hasil/dokumen
    → Pemberitahuan ke pemohon

Status dapat dicek melalui menu *Cek Status Permohonan*.
`,
      4: `${header}

ESTIMASI WAKTU PENYELESAIAN

Verifikasi berkas        : 1-2 hari kerja
Pemrosesan permohonan    : 3-5 hari kerja
Penerbitan dokumen       : 1-2 hari kerja
Total                    : 5-9 hari kerja

Faktor yang mempengaruhi:
• Kelengkapan dokumen
• Volume permohonan
• Jenis layanan

Pengaduan prioritas: maksimal 1×24 jam.
`,
      5: `${header}

BIAYA DAN TARIF LAYANAN

Pendaftaran              : GRATIS
Penggantian dokumen      : Rp50.000,-
Legalisir dokumen        : Rp25.000,-/lembar
Akses premium            : Rp150.000,-/tahun

⚠️ PERHATIAN
Kami TIDAK PERNAH meminta biaya di luar ketentuan resmi.
Waspada penipuan yang mengatasnamakan perusahaan.

Informasi tarif: www.perusahaan.com/tarif
`
    }
  },
  4: {
    title: 'HUBUNGI CUSTOMER SERVICE',
    body: `${header}

Saluran komunikasi resmi:

📞 Telepon : 021-12345678
   (Senin–Jumat, 08.00–16.00 WIB)

💬 WhatsApp : 0812-3456-7890
📧 Email   : cs@perusahaan.com
🌐 Website : www.perusahaan.com

📍 Kantor Pusat
   Jl. Profesional No. 123, Jakarta Pusat

Anda juga dapat menyampaikan pesan melalui chat ini. Petugas kami akan merespon sesegera mungkin pada jam operasional.
`
  },
  5: {
    title: 'PERTANYAAN UMUM (FAQ)',
    body: `${header}

Pilih pertanyaan yang sesuai:

 1️⃣  Cara reset password?
 2️⃣  Lama proses pendaftaran?
 3️⃣  Biaya pendaftaran?
 4️⃣  Cara memperbarui data diri?
 5️⃣  Lupa nomor registrasi?
 6️⃣  Cara mengajukan pengaduan?
`,
    children: {
      1: `${header}

FAQ: RESET PASSWORD

Langkah reset password:
1. Buka www.perusahaan.com
2. Klik "Lupa Password"
3. Masukkan email terdaftar
4. Cek email untuk tautan reset
5. Buat password baru
6. Login kembali

Tidak terima email? Periksa folder Spam.
`,
      2: `${header}

FAQ: LAMA PROSES PENDAFTARAN

Proses pendaftaran:

Verifikasi berkas   : 1-3 hari
Validasi data       : 1-2 hari
Penerbitan dokumen  : 1-2 hari
Total               : 3-7 hari

Faktor: kelengkapan dokumen, volume permohonan, jenis layanan.
`,
      3: `${header}

FAQ: BIAYA PENDAFTARAN

Pendaftaran *GRATIS*, tidak dipungut biaya.

⚠️ WASPADA PENIPUAN
• Kami tidak pernah meminta biaya di luar ketentuan
• Tidak ada transfer ke rekening pribadi
• Laporkan pungutan liar

Biaya hanya untuk legalisir, penggantian dokumen, dan layanan premium (opsional).
`,
      4: `${header}

FAQ: PERBARUI DATA DIRI

🌐 Online:
   1. Login ke www.perusahaan.com
   2. Menu Profil → Ubah Data
   3. Perbarui data
   4. Simpan

🏛️ Offline:
   1. Datang ke kantor terdekat
   2. Bawa KTP dan KK
   3. Isi formulir perubahan data
   4. Serahkan ke petugas

Perubahan data penting memerlukan verifikasi tambahan.
`,
      5: `${header}

FAQ: NOMOR REGISTRASI HILANG

Hubungi Customer Service:
📞 021-12345678
💬 0812-3456-7890
📧 cs@perusahaan.com

Sertakan data verifikasi:
• Nama lengkap
• NIK
• Tanggal pendaftaran (perkiraan)

Petugas akan membantu setelah data diverifikasi.
`,
      6: `${header}

FAQ: CARA MENGAJUKAN PENGADUAN

Pengaduan dapat diajukan melalui:

📱 Chat ini — Kirim detail pengaduan
🌐 Website — www.perusahaan.com/pengaduan
📧 Email — pengaduan@perusahaan.com
🏛️ Datang langsung — ke kantor terdekat

Setiap pengaduan akan diberikan nomor tiket untuk pengecekan status.
`
    }
  }
};

module.exports = { header, mainMenu, subMenus };
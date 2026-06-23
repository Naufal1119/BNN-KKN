const header = `
╔══════════════════════════════════════════════════════════════╗
║                    LAYANAN INFORMASI                         ║
║                 DAN PELAYANAN PUBLIK                         ║
║                                                              ║
║          SISTEM PELAYANAN BERBASIS TEKNOLOGI                 ║
║                 INFORMASI (SPBTI)                            ║
╚══════════════════════════════════════════════════════════════╝`;

const footerMenu = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Ketik *0* untuk kembali ke menu utama
📌 Ketik *menu* untuk menampilkan menu kembali
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*© 2026 - Seluruh hak cipta dilindungi undang-undang*`;

const footerBack = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ketik *0* untuk kembali ke menu utama.`;

const mainMenu = `${header}

Assalamu'alaikum Warahmatullahi Wabarakatuh.

Selamat datang dan terima kasih telah menghubungi *Layanan Informasi dan Pelayanan Publik* kami. Kami berkomitmen untuk memberikan pelayanan yang cepat, tepat, dan profesional kepada seluruh masyarakat.

Silakan memilih jenis layanan yang Anda butuhkan dengan membalas nomor menu di bawah ini:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🏛️  [1] Informasi Layanan dan Produk

    📋  [2] Status Permohonan Layanan

    📖  [3] Panduan, Persyaratan, dan Ketentuan

    📞  [4] Hubungi Customer Service

    ❓  [5] Pertanyaan yang Sering Diajukan (FAQ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${footerMenu}`;

const subMenus = {
  1: {
    title: 'INFORMASI LAYANAN DAN PRODUK',
    body: `${header}

Berikut adalah informasi layanan yang kami sediakan. Silakan pilih dengan membalas huruf yang sesuai untuk melihat detail lebih lanjut:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🔹  [a] Layanan Pengaduan Masyarakat
    🔹  [b] Informasi Produk dan Program
    🔹  [c] Jam dan Hari Operasional Pelayanan
    🔹  [d] Alamat dan Lokasi Kantor
    🔹  [e] Landasan Hukum dan Regulasi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Silakan kirimkan huruf *a*, *b*, *c*, *d*, atau *e*.
${footerBack}`,
    children: {
      a: `${header}

══════════════════════════════════════════════════════════════
               LAYANAN PENGADUAN MASYARAKAT
══════════════════════════════════════════════════════════════

Kami menerima dan menindaklanjuti setiap pengaduan, saran, serta masukan yang disampaikan oleh masyarakat melalui saluran resmi sebagai berikut:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞  Telepon            : 021-12345678
📧  Email              : pengaduan@perusahaan.com
🌐  Website            : www.perusahaan.com/pengaduan
💬  WhatsApp           : 0812-3456-7890
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apabila Anda hendak menyampaikan pengaduan melalui layanan chat ini, mohon kirimkan data berikut secara lengkap agar dapat kami proses dengan baik:

┌─────────────────────────────────────────────┐
│  1. Nama Lengkap                            │
│  2. Nomor Induk Kependudukan (NIK)          │
│  3. Alamat Lengkap                          │
│  4. Nomor Telepon yang Dapat Dihubungi      │
│  5. Uraian Pengaduan                        │
│  6. Lokasi dan Waktu Kejadian               │
│  7. Dokumen Pendukung (jika ada)            │
└─────────────────────────────────────────────┘

⏱  *Estimasi waktu penanganan:* 1×24 jam kerja sejak laporan diverifikasi.
📌  *Nomor tiket pengaduan* akan diterbitkan dan disampaikan kepada Anda melalui pesan ini setelah pengaduan berhasil diregistrasi.

Kami menjamin setiap pengaduan akan ditangani secara profesional dan sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.
${footerBack}`,
      b: `${header}

══════════════════════════════════════════════════════════════
               INFORMASI PRODUK DAN PROGRAM
══════════════════════════════════════════════════════════════

Saat ini kami menyelenggarakan berbagai produk dan program layanan yang dirancang untuk memenuhi kebutuhan masyarakat, antara lain:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆  [1] Layanan Utama
     Merupakan produk layanan inti yang menjadi fokus utama
     penyelenggaraan pelayanan publik kami.

🤝  [2] Program Kemitraan
     Program kerja sama dengan berbagai pihak dalam rangka
     meningkatkan kualitas dan jangkauan pelayanan.

⭐  [3] Layanan Premium
     Layanan dengan prioritas dan fasilitas tambahan bagi
     pengguna yang memerlukan penanganan khusus.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Untuk memperoleh informasi yang lebih lengkap dan detail mengenai masing-masing produk dan program, silakan mengunjungi website resmi kami di *www.perusahaan.com* atau menghubungi Customer Service kami melalui saluran yang tersedia.
${footerBack}`,
      c: `${header}

══════════════════════════════════════════════════════════════
               JAM DAN HARI OPERASIONAL PELAYANAN
══════════════════════════════════════════════════════════════

Berikut adalah jadwal operasional pelayanan di lingkungan kami:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏛️  *KANTOR PUSAT*

    Hari Senin s.d. Kamis
    ⏰  08.00 – 16.00 WIB

    Hari Jumat
    ⏰  08.00 – 16.30 WIB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏪  *UNIT PELAYANAN TERPADU*

    Hari Senin s.d. Jumat
    ⏰  08.00 – 15.00 WIB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌  *LIBUR*
    Hari Sabtu, Minggu, dan Hari Libur Nasional yang telah
    ditetapkan oleh Pemerintah.

☎️  *LAYANAN PENGADUAN 24 JAM*
    Pengaduan dapat disampaikan melalui website dan email
    tanpa terbatas waktu operasional kantor.
${footerBack}`,
      d: `${header}

══════════════════════════════════════════════════════════════
               ALAMAT DAN LOKASI KANTOR
══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏛️  *KANTOR PUSAT*

    Jalan Profesional Nomor 123
    Kelurahan Contoh, Kecamatan Teladan
    Jakarta Pusat 12345
    Telepon: 021-12345678

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏪  *UNIT PELAYANAN TERPADU*

    Gedung Pelayanan Lantai 1
    Jalan Pelayanan Nomor 45
    Jakarta Selatan 54321
    Telepon: 021-87654321

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Untuk mengetahui lokasi kantor cabang dan unit pelayanan terdekat di wilayah Anda, silakan mengakses website resmi kami di *www.perusahaan.com/lokasi* atau menghubungi Customer Service.
${footerBack}`,
      e: `${header}

══════════════════════════════════════════════════════════════
               LANDASAN HUKUM DAN REGULASI
══════════════════════════════════════════════════════════════

Seluruh penyelenggaraan layanan kami didasarkan pada ketentuan peraturan perundang-undangan yang berlaku, antara lain sebagai berikut:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📜  Undang-Undang Nomor XX Tahun 20XX
    tentang Pelayanan Publik

📜  Peraturan Pemerintah Nomor XX Tahun 20XX
    tentang Standar Pelayanan Publik

📜  Peraturan Menteri Nomor XX Tahun 20XX
    tentang Tata Cara Penyelenggaraan Pelayanan

📜  Peraturan Daerah Nomor XX Tahun 20XX
    tentang Penyelenggaraan Pelayanan di Daerah

📜  Keputusan Direksi Nomor XXX/20XX
    tentang Kebijakan Mutu dan Standar Operasional Prosedur
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dokumen regulasi selengkapnya dapat diakses dan diunduh melalui website resmi kami di *www.perusahaan.com/regulasi*.

Kami senantiasa berkomitmen untuk menyelenggarakan pelayanan yang sesuai dengan ketentuan hukum dan peraturan yang berlaku demi mewujudkan tata kelola pelayanan publik yang baik (good governance).
${footerBack}`
    }
  },
  2: {
    title: 'STATUS PERMOHONAN LAYANAN',
    body: `${header}

Silakan memilih jenis status permohonan yang ingin Anda ketahui informasinya:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🔹  [a] Status Pendaftaran
    🔹  [b] Status Pengaduan
    🔹  [c] Status Pembayaran
    🔹  [d] Status Kelengkapan Berkas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Silakan kirimkan huruf *a*, *b*, *c*, atau *d*.
${footerBack}`,
    children: {
      a: `${header}

══════════════════════════════════════════════════════════════
               CEK STATUS PENDAFTARAN
══════════════════════════════════════════════════════════════

Untuk mengetahui status permohonan pendaftaran Anda, silakan kirimkan *Nomor Registrasi* yang telah diterbitkan dan disampaikan kepada Anda pada saat proses pendaftaran.

Format nomor registrasi:
┌──────────────────────────────────────┐
│  *REG-2025-XXXXXX*                   │
│  (12 karakter)                       │
└──────────────────────────────────────┘

Nomor registrasi telah dikirimkan melalui *SMS* dan/atau *Email* yang Anda daftarkan pada saat melakukan pendaftaran.

Apabila Anda mengalami kendala atau kehilangan nomor registrasi, silakan menghubungi Customer Service kami untuk mendapatkan bantuan lebih lanjut.
${footerBack}`,
      b: `${header}

══════════════════════════════════════════════════════════════
               CEK STATUS PENGADUAN
══════════════════════════════════════════════════════════════

Untuk mengetahui status penanganan pengaduan Anda, silakan kirimkan *Nomor Tiket* yang telah diterbitkan pada saat pengaduan Anda berhasil diregistrasi.

Format nomor tiket:
┌──────────────────────────────────────┐
│  *TKT-2025-XXXXXX*                   │
│  (12 karakter)                       │
└──────────────────────────────────────┘

Apabila Anda belum memiliki nomor tiket pengaduan, silakan menyampaikan pengaduan terlebih dahulu melalui menu *Layanan Pengaduan Masyarakat* pada menu utama.
${footerBack}`,
      c: `${header}

══════════════════════════════════════════════════════════════
               CEK STATUS PEMBAYARAN
══════════════════════════════════════════════════════════════

Untuk mengetahui status pembayaran layanan Anda, silakan kirimkan *Nomor Invoice* atau *Kode Billing* yang tercantum pada bukti pembayaran yang telah Anda lakukan.

Format nomor:
┌──────────────────────────────────────┐
│  Invoice: *INV-2025-XXXXXX*          │
│  Bill  : *BILL-2025-XXXXXX*          │
└──────────────────────────────────────┘

Pembayaran yang telah terverifikasi akan mempercepat proses pemrosesan permohonan layanan Anda.
${footerBack}`,
      d: `${header}

══════════════════════════════════════════════════════════════
               CEK KELENGKAPAN BERKAS
══════════════════════════════════════════════════════════════

Untuk mengetahui status kelengkapan berkas permohonan Anda, silakan kirimkan *Nomor Permohonan* yang tercantum pada tanda terima dokumen yang telah diberikan oleh petugas kami.

Format nomor permohonan:
┌──────────────────────────────────────┐
│  *PMN-2025-XXXXXX*                   │
│  (12 karakter)                       │
└──────────────────────────────────────┘

Petugas kami akan melakukan pemeriksaan dan memberikan informasi secara lengkap mengenai dokumen yang masih kurang atau perlu dilengkapi untuk memproses permohonan Anda.
${footerBack}`
    }
  },
  3: {
    title: 'PANDUAN, PERSYARATAN, DAN KETENTUAN',
    body: `${header}

Berikut adalah berbagai informasi panduan, persyaratan, dan ketentuan yang perlu Anda ketahui dalam mengakses layanan kami. Silakan pilih dengan membalas nomor yang sesuai:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    📋  [1] Persyaratan Dokumen
    📝  [2] Tata Cara Pendaftaran
    🔄  [3] Alur dan Mekanisme Proses Layanan
    ⏱️  [4] Estimasi Waktu Penyelesaian
    💰  [5] Biaya dan Tarif Layanan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Silakan kirimkan nomor *1*, *2*, *3*, *4*, atau *5*.
${footerBack}`,
    children: {
      1: `${header}

══════════════════════════════════════════════════════════════
               PERSYARATAN DOKUMEN
══════════════════════════════════════════════════════════════

Sehubungan dengan pengajuan permohonan layanan, terdapat sejumlah dokumen yang wajib dan perlu dipersiapkan sebagai berikut:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋  *DOKUMEN WAJIB*

    ✅  Fotokopi Kartu Tanda Penduduk (KTP) yang masih berlaku
    ✅  Fotokopi Kartu Keluarga (KK)
    ✅  Pas foto berwarna terbaru ukuran 3×4 sebanyak 2 (dua) lembar
    ✅  Surat permohonan yang ditandatangani di atas materai

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋  *DOKUMEN PENDUKUNG*

    ✅  Fotokopi Nomor Pokok Wajib Pajak (NPWP)
    ✅  Surat keterangan domisili dari kelurahan setempat
    ✅  Dokumen pendukung lainnya yang dipersyaratkan sesuai dengan jenis layanan yang diajukan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  *KETENTUAN PENTING*

    1. Seluruh dokumen wajib dalam keadaan jelas, utuh, dan dapat terbaca dengan baik.
    2. Dokumen asli wajib ditunjukkan pada saat proses verifikasi di kantor.
    3. Kelengkapan dan kebenaran dokumen akan mempercepat proses verifikasi dan pemrosesan permohonan.
    4. Ketidaklengkapan dokumen dapat mengakibatkan penundaan atau penolakan permohonan.
${footerBack}`,
      2: `${header}

══════════════════════════════════════════════════════════════
               TATA CARA PENDAFTARAN
══════════════════════════════════════════════════════════════

Pendaftaran layanan dapat dilakukan melalui 2 (dua) jalur, yaitu secara *online* maupun *offline* (langsung). Berikut adalah panduan lengkapnya:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐  *A. PENDAFTARAN SECARA ONLINE*

    Langkah 1 : Akses website www.perusahaan.com/daftar
    Langkah 2 : Isi dan lengkapi formulir pendaftaran secara elektronik
    Langkah 3 : Unggah (upload) dokumen persyaratan yang diminta
    Langkah 4 : Lakukan verifikasi data dan klik tombol "Kirim Permohonan"
    Langkah 5 : Catat dan simpan *Nomor Registrasi* yang akan ditampilkan
               setelah permohonan berhasil dikirim

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏛️  *B. PENDAFTARAN SECARA OFFLINE (LANGSUNG)*

    Langkah 1 : Datang langsung ke kantor atau unit pelayanan terdekat
    Langkah 2 : Ambil nomor antrean pada mesin antrean yang tersedia
    Langkah 3 : Serahkan dokumen persyaratan kepada petugas loket
    Langkah 4 : Isi dan tanda tangani formulir pendaftaran
    Langkah 5 : Terima *Tanda Terima Dokumen* sebagai bukti registrasi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏱  *Verifikasi berkas* akan dilaksanakan dalam waktu 1×24 jam hingga 3×24 jam kerja sejak seluruh dokumen dinyatakan lengkap dan diterima oleh petugas.
${footerBack}`,
      3: `${header}

══════════════════════════════════════════════════════════════
               ALUR DAN MEKANISME PROSES LAYANAN
══════════════════════════════════════════════════════════════

Berikut adalah alur dan mekanisme proses layanan secara umum yang berlaku di lingkungan kami:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗂️  *TAHAP 1: PENDAFTARAN*
    ├── Pengajuan permohonan oleh pemohon
    └── Pemeriksaan awal kelengkapan dokumen

🔍  *TAHAP 2: VERIFIKASI*
    ├── Verifikasi keabsahan data dan dokumen
    ├── Konfirmasi kebenaran dan keakuratan informasi
    └── Permintaan kelengkapan tambahan (jika diperlukan)

⚙️  *TAHAP 3: PEMROSESAN*
    ├── Pemrosesan dan pengolahan permohonan
    ├── Pengecekan dan validasi akhir oleh pejabat berwenang
    └── Persiapan penerbitan hasil/dokumen

📨  *TAHAP 4: PENYELESAIAN*
    ├── Penerbitan hasil dan/atau dokumen
    ├── Pemberitahuan hasil kepada pemohon
    └── Pengambilan dokumen (offline) atau pengiriman (online)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status dan perkembangan permohonan dapat dipantau secara berkala melalui menu *Cek Status Permohonan Layanan* pada menu utama.
${footerBack}`,
      4: `${header}

══════════════════════════════════════════════════════════════
               ESTIMASI WAKTU PENYELESAIAN
══════════════════════════════════════════════════════════════

Berikut adalah estimasi waktu yang diperlukan untuk menyelesaikan setiap tahapan proses layanan:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️  *TAHAPAN LAYANAN                      ESTIMASI WAKTU*

    Verifikasi dan pemeriksaan berkas     1 - 2 hari kerja
    Proses pemrosesan permohonan          3 - 5 hari kerja
    Penerbitan dokumen hasil              1 - 2 hari kerja
    ─────────────────────────────────────────────────────
    *TOTAL KESELURUHAN*                   5 - 9 hari kerja
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌  *CATATAN PENTING:*

    Estimasi waktu penyelesaian di atas dapat berbeda dan dipengaruhi oleh beberapa faktor, antara lain:
    • Kelengkapan dan keabsahan dokumen yang diserahkan
    • Volume dan jumlah permohonan yang sedang diproses
    • Jenis dan kompleksitas layanan yang diajukan
    • Ketersediaan pejabat yang berwenang

📌  *PENGADUAN PRIORITAS*
    Pengaduan dengan kategori prioritas akan ditangani dalam waktu maksimal *1×24 jam*.
${footerBack}`,
      5: `${header}

══════════════════════════════════════════════════════════════
               BIAYA DAN TARIF LAYANAN
══════════════════════════════════════════════════════════════

Berikut adalah informasi mengenai biaya dan tarif yang berlaku untuk setiap jenis layanan:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰  *RINCIAN BIAYA LAYANAN*

    Pendaftaran awal              :   GRATIS (Rp0,-)
    Penggantian dokumen hilang     :   Rp50.000,-
    Legalisir dokumen              :   Rp25.000,-/lembar
    Akses layanan premium          :   Rp150.000,-/tahun
    Biaya administrasi keterlambatan: Rp10.000,-/hari
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  *PERHATIAN!*
┌──────────────────────────────────────────────────────────┐
│  Kami TIDAK PERNAH meminta biaya tambahan di luar       │
│  ketentuan tarif resmi yang telah ditetapkan.            │
│                                                          │
│  Waspada terhadap segala bentuk tindakan penipuan        │
│  yang mengatasnamakan perusahaan kami.                   │
│                                                          │
│  Seluruh pembayaran resmi hanya dilakukan melalui        │
│  bank-bank yang telah ditunjuk secara resmi.             │
└──────────────────────────────────────────────────────────┘

Informasi tarif secara lengkap dapat diakses melalui website resmi kami di *www.perusahaan.com/tarif*.
${footerBack}`
    }
  },
  4: {
    title: 'HUBUNGI CUSTOMER SERVICE',
    body: `${header}

Kami siap memberikan bantuan dan melayani Anda melalui berbagai saluran komunikasi yang tersedia sebagai berikut:

══════════════════════════════════════════════════════════════
               SALURAN KOMUNIKASI RESMI
══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞  *TELEPON*
    Nomor      : 021-12345678
    Waktu      : Senin s.d. Jumat, pukul 08.00 - 16.00 WIB

💬  *WHATSAPP*
    Nomor      : 0812-3456-7890
    Waktu      : 24 jam (dalam jam kerja akan direspon segera)

📧  *EMAIL*
    Alamat     : cs@perusahaan.com
    Waktu      : 1×24 jam respon

🌐  *WEBSITE*
    Alamat     : www.perusahaan.com

📍  *KANTOR PUSAT*
    Alamat     : Jl. Profesional No. 123, Jakarta Pusat 12345
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apabila Anda memerlukan bantuan lebih lanjut, Anda juga dapat menyampaikan pesan secara langsung melalui layanan chat ini dan petugas Customer Service kami akan merespon dan membantu Anda sesegera mungkin pada jam operasional pelayanan.
${footerBack}`
  },
  5: {
    title: 'PERTANYAAN YANG SERING DIAJUKAN (FAQ)',
    body: `${header}

Berikut adalah kumpulan pertanyaan yang sering diajukan oleh para pengguna layanan beserta jawabannya. Silakan pilih nomor pertanyaan yang sesuai dengan kebutuhan Anda:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ❓  [1] Bagaimana prosedur reset password akun?
    ❓  [2] Berapa lama proses pendaftaran?
    ❓  [3] Apakah dikenakan biaya pendaftaran?
    ❓  [4] Bagaimana cara memperbarui data diri?
    ❓  [5] Apa yang harus dilakukan jika lupa nomor registrasi?
    ❓  [6] Bagaimana tata cara mengajukan pengaduan?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Silakan kirimkan nomor *1*, *2*, *3*, *4*, *5*, atau *6*.
${footerBack}`,
    children: {
      1: `${header}

══════════════════════════════════════════════════════════════
FAQ 1: PROSEDUR RESET PASSWORD AKUN
══════════════════════════════════════════════════════════════

🔹 *Pertanyaan:*
   Bagaimana prosedur untuk melakukan reset password akun?

🔸 *Jawaban:*
   Berikut adalah langkah-langkah untuk melakukan reset password akun Anda:

   1. Buka halaman *login* pada website resmi kami di www.perusahaan.com
   2. Klik tautan *"Lupa Password"* atau *"Forgot Password"* yang tersedia
   3. Masukkan alamat email yang telah terdaftar pada akun Anda
   4. Periksa kotak masuk (inbox) email Anda untuk mendapatkan tautan reset password
   5. Klik tautan tersebut dan ikuti petunjuk untuk membuat password baru
   6. Login kembali menggunakan password baru yang telah dibuat

📌  Apabila Anda tidak menerima email reset, harap periksa folder *Spam* atau *Promotions* pada layanan email Anda.
📌  Pastikan alamat email yang dimasukkan sesuai dengan alamat email yang didaftarkan pada saat pembuatan akun.
${footerBack}`,
      2: `${header}

══════════════════════════════════════════════════════════════
FAQ 2: LAMA PROSES PENDAFTARAN
══════════════════════════════════════════════════════════════

🔹 *Pertanyaan:*
   Berapa lama waktu yang dibutuhkan untuk memproses pendaftaran?

🔸 *Jawaban:*
   Proses pendaftaran umumnya memerlukan waktu sebagai berikut:

   ┌─────────────────────────────────────────────┬──────────────┐
   │  Tahapan                                    │  Waktu       │
   ├─────────────────────────────────────────────┼──────────────┤
   │  Verifikasi berkas lengkap                  │  1 - 3 hari  │
   │  Verifikasi dan validasi data               │  1 - 2 hari  │
   │  Penerbitan dokumen/hasil                   │  1 - 2 hari  │
   ├─────────────────────────────────────────────┼──────────────┤
   │  *TOTAL ESTIMASI*                           │  3 - 7 hari  │
   └─────────────────────────────────────────────┴──────────────┘

📌  *Faktor-faktor yang mempengaruhi:*
   • Kelengkapan dan kebenaran dokumen persyaratan
   • Volume permohonan yang masuk dan sedang diproses
   • Jenis dan kompleksitas layanan yang diajukan
${footerBack}`,
      3: `${header}

══════════════════════════════════════════════════════════════
FAQ 3: BIAYA PENDAFTARAN
══════════════════════════════════════════════════════════════

🔹 *Pertanyaan:*
   Apakah ada biaya yang dikenakan untuk proses pendaftaran?

🔸 *Jawaban:*
   *TIDAK ADA BIAYA.* Pendaftaran layanan di lingkungan kami *GRATIS* dan tidak dipungut biaya sepeser pun.

┌──────────────────────────────────────────────────────────┐
│                   ⚠️  WASPADA PENIPUAN                     │
│                                                          │
│  1. Kami TIDAK PERNAH meminta biaya di luar ketentuan    │
│     tarif resmi yang berlaku.                            │
│  2. Kami TIDAK PERNAH meminta transfer ke rekening       │
│     pribadi atas nama individu.                          │
│  3. Segera laporkan apabila menemukan indikasi           │
│     pungutan liar (pungli) kepada pihak berwenang.       │
└──────────────────────────────────────────────────────────┘

💰  *Biaya hanya dikenakan untuk layanan tertentu:*
    • Legalisir dokumen
    • Penggantian dokumen karena hilang atau rusak
    • Layanan premium (sifatnya opsional)
${footerBack}`,
      4: `${header}

══════════════════════════════════════════════════════════════
FAQ 4: PEMBARUAN DATA DIRI
══════════════════════════════════════════════════════════════

🔹 *Pertanyaan:*
   Bagaimana prosedur untuk memperbarui atau mengubah data diri?

🔸 *Jawaban:*
   Pembaruan data diri dapat dilakukan melalui 2 (dua) jalur sebagai berikut:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐  *SECARA ONLINE*

    Langkah 1 : Login ke akun Anda di www.perusahaan.com
    Langkah 2 : Masuk ke menu *"Profil"* atau *"Data Saya"*
    Langkah 3 : Klik tombol *"Ubah Data"* atau *"Edit"*
    Langkah 4 : Lakukan perubahan pada data yang diperlukan
    Langkah 5 : Simpan perubahan dan tunggu konfirmasi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏛️  *SECARA OFFLINE*

    Langkah 1 : Datang langsung ke kantor atau unit pelayanan terdekat
    Langkah 2 : Bawa dokumen pendukung (KTP asli, KK, dan dokumen lainnya)
    Langkah 3 : Isi formulir permohonan perubahan data
    Langkah 4 : Serahkan kepada petugas untuk diproses

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌  Perubahan data yang bersifat substansial (nama, alamat, status perkawinan) memerlukan verifikasi tambahan dan kelengkapan dokumen pendukung.
${footerBack}`,
      5: `${header}

══════════════════════════════════════════════════════════════
FAQ 5: NOMOR REGISTRASI HILANG
══════════════════════════════════════════════════════════════

🔹 *Pertanyaan:*
   Apa yang harus saya lakukan apabila lupa atau kehilangan nomor registrasi?

🔸 *Jawaban:*
   Jika Anda lupa atau kehilangan nomor registrasi, silakan menghubungi Customer Service kami melalui saluran berikut:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞  Telepon : 021-12345678
💬  WhatsApp: 0812-3456-7890
📧  Email   : cs@perusahaan.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sertakan data berikut untuk proses verifikasi identitas:
┌─────────────────────────────────────────────┐
│  1. Nama lengkap (sesuai KTP)               │
│  2. Nomor Induk Kependudukan (NIK)          │
│  3. Tanggal pendaftaran (perkiraan)         │
│  4. Alamat email yang didaftarkan           │
└─────────────────────────────────────────────┘

Petugas kami akan membantu Anda menemukan nomor registrasi setelah data diri berhasil diverifikasi.
${footerBack}`,
      6: `${header}

══════════════════════════════════════════════════════════════
FAQ 6: TATA CARA MENGAJUKAN PENGADUAN
══════════════════════════════════════════════════════════════

🔹 *Pertanyaan:*
   Bagaimana tata cara untuk mengajukan pengaduan?

🔸 *Jawaban:*
   Pengaduan dapat diajukan melalui beberapa saluran resmi sebagai berikut:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱  *MELALUI LAYANAN CHAT INI*
    Kirimkan detail pengaduan Anda langsung melalui chat ini
    dengan menyertakan:
    • Nama lengkap dan NIK
    • Uraian pengaduan secara jelas dan rinci
    • Waktu dan lokasi kejadian
    • Dokumen pendukung (jika ada)

🌐  *MELALUI WEBSITE*
    Akses www.perusahaan.com/pengaduan
    dan lengkapi formulir pengaduan secara elektronik

📧  *MELALUI EMAIL*
    Kirimkan pengaduan ke alamat: pengaduan@perusahaan.com

🏛️  *DATANG LANGSUNG*
    Kunjungi kantor atau unit pelayanan terdekat dengan
    membawa dokumen pendukung yang diperlukan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌  Setiap pengaduan yang diterima akan diregistrasi dan diterbitkan *Nomor Tiket Pengaduan* untuk memudahkan Anda dalam memantau status penanganan pengaduan.
${footerBack}`
    }
  }
};

module.exports = { mainMenu, subMenus };

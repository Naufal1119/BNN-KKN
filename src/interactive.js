const { sendInteractiveMessage } = require('@ryuu-reinzz/button-helper');
const admin = require('./admin');

const interactiveMenus = {
  main: {
    text: `Selamat datang di Layanan Chatbot BNNP Sulsel. Silakan pilih menu yang dibutuhkan.`,
    header: 'LAYANAN INFORMASI DAN PELAYANAN PUBLIK',
    footer: '',
    type: 'quick_reply',
    buttons: [
      { text: 'Informasi & Layanan', id: '1' },
      { text: 'Pengaduan & Rehabilitasi', id: '2' },
      { text: 'Hubungi Kami', id: '3' },
    ]
  },
  mainAdmin: {
    text: `Selamat datang di Panel Admin BNNP Sulsel. Silakan pilih menu administrasi.`,
    header: 'PANEL ADMIN BNNP SULSEL',
    footer: 'Ketik /help untuk bantuan command',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Data Narkoba', id: 'admin_narkoba' },
      { text: '⚖️ Data Kasus', id: 'admin_kasus' },
      { text: '🏥 Data Rehabilitasi', id: 'admin_rehab' },
      { text: '📚 Data Edukasi', id: 'admin_edukasi' },
      { text: '👮 Data Petugas', id: 'admin_petugas' },
      { text: '📍 Data Lokasi', id: 'admin_lokasi' },
      { text: '📋 Data Pengaduan', id: 'admin_pengaduan' },
      { text: '📊 Laporan & Statistik', id: 'admin_laporan' },
      { text: '📝 Kelola Konten', id: 'admin_konten' },
      { text: '👥 Kelola Admin', id: 'admin_admins' },
    ]
  },
  '1': {
    text: `Anda memilih Informasi & Layanan Publik. Silakan pilih opsi di bawah:`,
    header: 'INFORMASI & LAYANAN PUBLIK',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'INFORMASI & LAYANAN PUBLIK',
      rows: [
        { title: 'Profil & Tugas BNNP Sulsel', rowId: '1a' },
        { title: 'Program P4GN', rowId: '1b' },
        { title: 'Jam & Alamat Kantor', rowId: '1c' },
        { title: 'Landasan Hukum', rowId: '1d' },
        { title: 'Lokasi Kantor Cabang', rowId: '1e' },
      ]
    }]
  },
  '2': {
    text: `Anda memilih Pengaduan & Rehabilitasi. Silakan pilih opsi di bawah:`,
    header: 'PENGADUAN & REHABILITASI',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'PENGADUAN & REHABILITASI',
      rows: [
        { title: 'Sampaikan Pengaduan', rowId: '2a' },
        { title: 'Cek Status Pengaduan', rowId: '2b' },
        { title: 'Layanan Rehab & Konseling', rowId: '2c' },
        { title: 'FAQ Narkoba', rowId: '2d' },
      ]
    }]
  },
  '2d': {
    text: `Anda memilih Panduan dan Persyaratan. Silakan pilih opsi di bawah:`,
    header: 'PANDUAN DAN PERSYARATAN',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'PANDUAN',
      rows: [
        { title: 'Persyaratan Dokumen', rowId: '2d1' },
        { title: 'Tata Cara Pendaftaran', rowId: '2d2' },
        { title: 'Alur Proses Layanan', rowId: '2d3' },
        { title: 'Estimasi Waktu', rowId: '2d4' },
        { title: 'Biaya dan Tarif', rowId: '2d5' },
      ]
    }]
  },
  '2e': {
    text: `Anda memilih Pertanyaan Umum (FAQ). Silakan pilih opsi di bawah:`,
    header: 'PERTANYAAN UMUM',
    footer: '',
    buttonText: 'Lihat Opsi',
    sections: [{
      title: 'FAQ',
      rows: [
        { title: 'Cara Reset Password', rowId: '2e1' },
        { title: 'Lama Proses Pendaftaran', rowId: '2e2' },
        { title: 'Biaya Pendaftaran', rowId: '2e3' },
        { title: 'Perbarui Data Diri', rowId: '2e4' },
        { title: 'Lupa Nomor Registrasi', rowId: '2e5' },
        { title: 'Cara Mengajukan Pengaduan', rowId: '2e6' },
      ]
    }]
  },
  '3': {
    text: `Anda memilih Hubungi Kami. Silakan pilih opsi di bawah:`,
    header: 'HUBUNGI KAMI',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'HUBUNGI KAMI',
      rows: [
        { title: 'Customer Service & Kontak Resmi', rowId: '3a' },
        { title: 'Media Sosial & Website', rowId: '3b' },
        { title: 'Panduan & Syarat Rehabilitasi', rowId: '3c' },
      ]
    }]
  },
  admin_narkoba: {
    text: `📋 *Manajemen Data Narkoba*\n\nGunakan command berikut:\n/narkoba - Lihat semua data\n/narkobaadd <nama>|<jenis>|<efek>|<hukuman>|<keterangan> - Tambah\n/narkobaedit <id>|<field>|<value> - Edit\n/narkobadel <id> - Hapus\n\nField: nama, jenis, efek, hukuman, keterangan`,
    header: 'DATA NARKOBA',
    footer: 'Ketik /narkoba untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Data', id: '/narkoba' },
      { text: '➕ Tambah Data', id: 'help_narkobaadd' },
      { text: '✏️ Edit Data', id: 'help_narkobaedit' },
      { text: '🗑️ Hapus Data', id: 'help_narkobadel' },
      { text: '⬅️ Kembali', id: 'mainAdmin' },
    ]
  },
  admin_kasus: {
    text: `⚖️ *Manajemen Data Kasus Narkoba*\n\nGunakan command berikut:\n/kasus - Lihat semua data\n/kasusadd <nomor>|<tanggal>|<tersangka>|<narkoba>|<jumlah>|<status>|<keterangan> - Tambah\n/kasusedit <id>|<field>|<value> - Edit\n/kasusdel <id> - Hapus\n\nField: nomorKasus, tanggal, namaTersangka, jenisNarkoba, jumlah, status, keterangan`,
    header: 'DATA KASUS',
    footer: 'Ketik /kasus untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Data', id: '/kasus' },
      { text: '➕ Tambah Kasus', id: 'help_kasusadd' },
      { text: '✏️ Edit Kasus', id: 'help_kasusedit' },
      { text: '🗑️ Hapus Kasus', id: 'help_kasusdel' },
      { text: '⬅️ Kembali', id: 'mainAdmin' },
    ]
  },
  admin_rehab: {
    text: `🏥 *Manajemen Data Rehabilitasi*\n\nGunakan command berikut:\n/rehab - Lihat semua data\n/rehabadd <nama>|<alamat>|<kapasitas>|<jenis>|<kontak>|<keterangan> - Tambah\n/rehabedit <id>|<field>|<value> - Edit\n/rehabdel <id> - Hapus\n\nField: nama, alamat, kapasitas, jenis, kontak, keterangan`,
    header: 'DATA REHABILITASI',
    footer: 'Ketik /rehab untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Data', id: '/rehab' },
      { text: '➕ Tambah Rehab', id: 'help_rehabadd' },
      { text: '✏️ Edit Rehab', id: 'help_rehabedit' },
      { text: '🗑️ Hapus Rehab', id: 'help_rehabdel' },
      { text: '⬅️ Kembali', id: 'mainAdmin' },
    ]
  },
  admin_edukasi: {
    text: `📚 *Manajemen Data Edukasi & Pencegahan*\n\nGunakan command berikut:\n/edukasi - Lihat semua data\n/edukasiadd <judul>|<kategori>|<konten>|<sumber> - Tambah\n/edukasiedit <id>|<field>|<value> - Edit\n/edukasidel <id> - Hapus\n\nField: judul, kategori, konten, sumber`,
    header: 'DATA EDUKASI',
    footer: 'Ketik /edukasi untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Data', id: '/edukasi' },
      { text: '➕ Tambah Edukasi', id: 'help_edukasiadd' },
      { text: '✏️ Edit Edukasi', id: 'help_edukasiedit' },
      { text: '🗑️ Hapus Edukasi', id: 'help_edukasidel' },
      { text: '⬅️', id: 'mainAdmin' },
    ]
  },
  admin_petugas: {
    text: `👮 *Manajemen Data Petugas BNNP*\n\nGunakan command berikut:\n/petugas - Lihat semua data\n/petugasadd <nama>|<nip>|<jabatan>|<unit>|<kontak>|<status> - Tambah\n/petugasedit <id>|<field>|<value> - Edit\n/petugasdel <id> - Hapus\n\nField: nama, nip, jabatan, unit, kontak, status`,
    header: 'DATA PETUGAS',
    footer: 'Ketik /petugas untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Data', id: '/petugas' },
      { text: '➕ Tambah Petugas', id: 'help_petugasadd' },
      { text: '✏️ Edit Petugas', id: 'help_petugasedit' },
      { text: '🗑️ Hapus Petugas', id: 'help_petugasdel' },
      { text: '⬅️', id: 'mainAdmin' },
    ]
  },
  admin_lokasi: {
    text: `📍 *Manajemen Data Lokasi Kantor/Cabang*\n\nGunakan command berikut:\n/lokasi - Lihat semua data\n/lokasiadd <nama>|<alamat>|<jenis>|<kontak>|<koordinat>|<keterangan> - Tambah\n/lokasiedit <id>|<field>|<value> - Edit\n/lokasidel <id> - Hapus\n\nField: nama, alamat, jenis, kontak, koordinat, keterangan`,
    header: 'DATA LOKASI',
    footer: 'Ketik /lokasi untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Data', id: '/lokasi' },
      { text: '➕ Tambah Lokasi', id: 'help_lokasiadd' },
      { text: '✏️ Edit Lokasi', id: 'help_lokasiedit' },
      { text: '🗑️ Hapus Lokasi', id: 'help_lokasidel' },
      { text: '⬅️', id: 'mainAdmin' },
    ]
  },
  admin_pengaduan: {
    text: `📋 *Manajemen Pengaduan Masyarakat*\n\nGunakan command berikut:\n/pengaduan - Lihat semua pengaduan\n/pengaduanadd <tiket>|<nama>|<nik>|<kontak>|<isi>|<kategori>|<lokasi> - Tambah\n/pengaduanedit <id>|<field>|<value> - Edit\n/pengaduadel <id> - Hapus\n/pengaduanstatus <id>|<status> - Update Status\n\nField: nomorTiket, namaPelapor, nik, kontak, isiPengaduan, kategori, lokasi, status\nStatus: Baru, Diproses, Selesai, Ditolak`,
    header: 'DATA PENGADUAN',
    footer: 'Ketik /pengaduan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Data', id: '/pengaduan' },
      { text: '➕ Tambah', id: 'help_pengaduanadd' },
      { text: '✏️ Edit', id: 'help_pengaduanedit' },
      { text: '🔄 Status', id: 'help_pengaduanstatus' },
      { text: '🗑️ Hapus', id: 'help_pengaduadel' },
      { text: '⬅️', id: 'mainAdmin' },
    ]
  },
  admin_laporan: {
    text: `📊 *Laporan & Statistik BNNP*\n\nGunakan command berikut:\n/laporan - Lihat semua laporan\n/laporanadd <judul>|<periode>|<jenis>|<konten>|<penyusun> - Tambah\n/laporanedit <id>|<field>|<value> - Edit\n/laporandel <id> - Hapus\n\nField: judul, periode, jenis, konten, penyusun`,
    header: 'LAPORAN & STATISTIK',
    footer: 'Ketik /laporan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Data', id: '/laporan' },
      { text: '➕ Tambah Laporan', id: 'help_laporanadd' },
      { text: '✏️ Edit Laporan', id: 'help_laporanedit' },
      { text: '🗑️ Hapus Laporan', id: 'help_laporandel' },
      { text: '⬅️', id: 'mainAdmin' },
    ]
  },
  admin_konten: {
    text: `📝 *Kelola Konten Dinamis*\n\nGunakan command berikut:\n/list - Lihat semua konten\n/add <key>|<konten> - Tambah\n/edit <key>|<konten> - Edit\n/hapus <key> - Hapus`,
    header: 'KELOLA KONTEN',
    footer: 'Ketik /list untuk melihat konten',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Konten', id: '/list' },
      { text: '➕ Tambah', id: 'help_add' },
      { text: '✏️ Edit', id: 'help_edit' },
      { text: '🗑️ Hapus', id: 'help_hapus' },
      { text: '⬅️', id: 'mainAdmin' },
    ]
  },
  admin_admins: {
    text: `👥 *Kelola Admin*\n\nGunakan command berikut:\n/admins - Lihat daftar admin\n/addadmin <nomor> - Tambah admin (owner)\n/removeadmin <nomor> - Hapus admin (owner)\n/gantipin <PIN baru> - Ganti PIN (owner)`,
    header: 'KELOLA ADMIN',
    footer: 'Ketik /admins untuk melihat daftar',
    type: 'quick_reply',
    buttons: [
      { text: '📋 Lihat Admin', id: '/admins' },
      { text: '➕ Tambah Admin', id: 'help_addadmin' },
      { text: '🗑️ Hapus Admin', id: 'help_removeadmin' },
      { text: '🔐 Ganti PIN', id: 'help_gantipin' },
      { text: '⬅️', id: 'mainAdmin' },
    ]
  },
  help_narkobaadd: {
    text: `➕ *Tambah Data Narkoba*\nFormat:\n/narkobaadd <nama>|<jenis>|<efek>|<hukuman>|<keterangan>\n\nContoh:\n/narkobaadd Sabu|Sintetis|Kerusakan saraf, jantung|UU 35/2009|Larangan keras`,
    header: 'TAMBAH NARKOBA',
    footer: 'Ketik /narkoba untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_narkoba' },
    ]
  },
  help_narkobaedit: {
    text: `✏️ *Edit Data Narkoba*\nFormat:\n/narkobaedit <id>|<field>|<value>\n\nField: nama, jenis, efek, hukuman, keterangan\n\nContoh:\n/narkobaedit NAR-123456-abc123|efek|Kerusakan otak`,
    header: 'EDIT NARKOBA',
    footer: 'Ketik /narkoba untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_narkoba' },
    ]
  },
  help_narkobadel: {
    text: `🗑️ *Hapus Data Narkoba*\nFormat:\n/narkobadel <id>\n\nContoh:\n/narkobadel NAR-123456-abc123`,
    header: 'HAPUS NARKOBA',
    footer: 'Ketik /narkoba untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_narkoba' },
    ]
  },
  help_kasusadd: {
    text: `➕ *Tambah Data Kasus*\nFormat:\n/kasusadd <nomor>|<tanggal>|<tersangka>|<narkoba>|<jumlah>|<status>|<keterangan>\n\nContoh:\n/kasusadd KAS-2024-001|2024-01-15|Budi Santoso|Sabu|50 gram|Ditangkap|Penangkapan di Makassar`,
    header: 'TAMBAH KASUS',
    footer: 'Ketik /kasus untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_kasus' },
    ]
  },
  help_kasusedit: {
    text: `✏️ *Edit Data Kasus*\nFormat:\n/kasusedit <id>|<field>|<value>\n\nField: nomorKasus, tanggal, namaTersangka, jenisNarkoba, jumlah, status, keterangan\n\nContoh:\n/kasusedit KAS-123456-abc123|status|Diproses Pengadilan`,
    header: 'EDIT KASUS',
    footer: 'Ketik /kasus untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_kasus' },
    ]
  },
  help_kasusdel: {
    text: `🗑️ *Hapus Data Kasus*\nFormat:\n/kasusdel <id>\n\nContoh:\n/kasusdel KAS-123456-abc123`,
    header: 'HAPUS KASUS',
    footer: 'Ketik /kasus untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_kasus' },
    ]
  },
  help_rehabadd: {
    text: `➕ *Tambah Data Rehabilitasi*\nFormat:\n/rehabadd <nama>|<alamat>|<kapasitas>|<jenis>|<kontak>|<keterangan>\n\nContoh:\n/rehabadd BNN Rehab Makassar|Jl. Sultan Hasanuddin No. 1|50|Pemerintah|0411-xxxxxx|Rehab tipe A`,
    header: 'TAMBAH REHAB',
    footer: 'Ketik /rehab untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_rehab' },
    ]
  },
  help_rehabedit: {
    text: `✏️ *Edit Data Rehabilitasi*\nFormat:\n/rehabedit <id>|<field>|<value>\n\nField: nama, alamat, kapasitas, jenis, kontak, keterangan\n\nContoh:\n/rehabedit REH-123456-abc123|kapasitas|60`,
    header: 'EDIT REHAB',
    footer: 'Ketik /rehab untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_rehab' },
    ]
  },
  help_rehabdel: {
    text: `🗑️ *Hapus Data Rehabilitasi*\nFormat:\n/rehabdel <id>\n\nContoh:\n/rehabdel REH-123456-abc123`,
    header: 'HAPUS REHAB',
    footer: 'Ketik /rehab untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_rehab' },
    ]
  },
  help_edukasiadd: {
    text: `➕ *Tambah Data Edukasi*\nFormat:\n/edukasiadd <judul>|<kategori>|<konten>|<sumber>\n\nContoh:\n/edukasiadd Bahaya Narkoba|Pencegahan|Narkoba merusak otak...|BNN RI`,
    header: 'TAMBAH EDUKASI',
    footer: 'Ketik /edukasi untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_edukasi' },
    ]
  },
  help_edukasiedit: {
    text: `✏️ *Edit Data Edukasi*\nFormat:\n/edukasiedit <id>|<field>|<value>\n\nField: judul, kategori, konten, sumber\n\nContoh:\n/edukasiedit EDU-123456-abc123|kategori|Rehabilitasi`,
    header: 'EDIT EDUKASI',
    footer: 'Ketik /edukasi untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_edukasi' },
    ]
  },
  help_edukasidel: {
    text: `🗑️ *Hapus Data Edukasi*\nFormat:\n/edukasidel <id>\n\nContoh:\n/edukasidel EDU-123456-abc123`,
    header: 'HAPUS EDUKASI',
    footer: 'Ketik /edukasi untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_edukasi' },
    ]
  },
  help_petugasadd: {
    text: `➕ *Tambah Data Petugas*\nFormat:\n/petugasadd <nama>|<nip>|<jabatan>|<unit>|<kontak>|<status>\n\nContoh:\n/petugasadd Budi Santoso|19800101|Kasubag Umum|Sekretariat|0812xxx|Aktif`,
    header: 'TAMBAH PETUGAS',
    footer: 'Ketik /petugas untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_petugas' },
    ]
  },
  help_petugasedit: {
    text: `✏️ *Edit Data Petugas*\nFormat:\n/petugasedit <id>|<field>|<value>\n\nField: nama, nip, jabatan, unit, kontak, status\n\nContoh:\n/petugasedit PET-123456-abc123|status|Cuti`,
    header: 'EDIT PETUGAS',
    footer: 'Ketik /petugas untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_petugas' },
    ]
  },
  help_petugasdel: {
    text: `🗑️ *Hapus Data Petugas*\nFormat:\n/petugasdel <id>\n\nContoh:\n/petugasdel PET-123456-abc123`,
    header: 'HAPUS PETUGAS',
    footer: 'Ketik /petugas untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_petugas' },
    ]
  },
  help_lokasiadd: {
    text: `➕ *Tambah Data Lokasi*\nFormat:\n/lokasiadd <nama>|<alamat>|<jenis>|<kontak>|<koordinat>|<keterangan>\n\nContoh:\n/lokasiadd BNN Kab. Bone|Jl. Ahmad Yani No. 45|Kabupaten|0481-xxxxxx|-4.5,120.1|Kantor BNN Bone`,
    header: 'TAMBAH LOKASI',
    footer: 'Ketik /lokasi untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_lokasi' },
    ]
  },
  help_lokasiedit: {
    text: `✏️ *Edit Data Lokasi*\nFormat:\n/lokasiedit <id>|<field>|<value>\n\nField: nama, alamat, jenis, kontak, koordinat, keterangan\n\nContoh:\n/lokasiedit LOK-123456-abc123|kontak|0481-yyyyyy`,
    header: 'EDIT LOKASI',
    footer: 'Ketik /lokasi untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_lokasi' },
    ]
  },
  help_lokasidel: {
    text: `🗑️ *Hapus Data Lokasi*\nFormat:\n/lokasidel <id>\n\nContoh:\n/lokasidel LOK-123456-abc123`,
    header: 'HAPUS LOKASI',
    footer: 'Ketik /lokasi untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_lokasi' },
    ]
  },
  help_pengaduanadd: {
    text: `➕ *Tambah Pengaduan*\nFormat:\n/pengaduanadd <tiket>|<nama>|<nik>|<kontak>|<isi>|<kategori>|<lokasi>\n\nContoh:\n/pengaduanadd TKT-2024-001|Budi|123456|0812xxx|Pengaduan narkoba|Penyalahgunaan|Makassar`,
    header: 'TAMBAH PENGADUAN',
    footer: 'Ketik /pengaduan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_pengaduan' },
    ]
  },
  help_pengaduanedit: {
    text: `✏️ *Edit Pengaduan*\nFormat:\n/pengaduanedit <id>|<field>|<value>\n\nField: nomorTiket, namaPelapor, nik, kontak, isiPengaduan, kategori, lokasi, status\n\nContoh:\n/pengaduanedit PGD-123456-abc123|status|Diproses`,
    header: 'EDIT PENGADUAN',
    footer: 'Ketik /pengaduan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_pengaduan' },
    ]
  },
  help_pengaduanstatus: {
    text: `🔄 *Update Status Pengaduan*\nFormat:\n/pengaduanstatus <id>|<status>\n\nStatus: Baru, Diproses, Selesai, Ditolak\n\nContoh:\n/pengaduanstatus PGD-123456-abc123|Selesai`,
    header: 'STATUS PENGADUAN',
    footer: 'Ketik /pengaduan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_pengaduan' },
    ]
  },
  help_pengaduadel: {
    text: `🗑️ *Hapus Pengaduan*\nFormat:\n/pengaduadel <id>\n\nContoh:\n/pengaduadel PGD-123456-abc123`,
    header: 'HAPUS PENGADUAN',
    footer: 'Ketik /pengaduan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_pengaduan' },
    ]
  },
  help_laporanadd: {
    text: `➕ *Tambah Laporan*\nFormat:\n/laporanadd <judul>|<periode>|<jenis>|<konten>|<penyusun>\n\nContoh:\n/laporanadd Laporan Bulanan Januari|2024-01|Bulanan|Data kasus...|Kasubag Intel`,
    header: 'TAMBAH LAPORAN',
    footer: 'Ketik /laporan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_laporan' },
    ]
  },
  help_laporanedit: {
    text: `✏️ *Edit Laporan*\nFormat:\n/laporanedit <id>|<field>|<value>\n\nField: judul, periode, jenis, konten, penyusun\n\nContoh:\n/laporanedit LAP-123456-abc123|jenis|Tahunan`,
    header: 'EDIT LAPORAN',
    footer: 'Ketik /laporan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_laporan' },
    ]
  },
  help_laporandel: {
    text: `🗑️ *Hapus Laporan*\nFormat:\n/laporandel <id>\n\nContoh:\n/laporandel LAP-123456-abc123`,
    header: 'HAPUS LAPORAN',
    footer: 'Ketik /laporan untuk melihat data',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_laporan' },
    ]
  },
  help_add: {
    text: `➕ *Tambah Konten Dinamis*\nFormat:\n/add <key>|<konten>\n\nContoh:\n/add info_rehab|Informasi rehab terbaru...`,
    header: 'TAMBAH KONTEN',
    footer: 'Ketik /list untuk melihat konten',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_konten' },
    ]
  },
  help_edit: {
    text: `✏️ *Edit Konten Dinamis*\nFormat:\n/edit <key>|<konten baru>\n\nContoh:\n/edit info_rehab|Informasi rehab update...`,
    header: 'EDIT KONTEN',
    footer: 'Ketik /list untuk melihat konten',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_konten' },
    ]
  },
  help_hapus: {
    text: `🗑️ *Hapus Konten Dinamis*\nFormat:\n/hapus <key>\n\nContoh:\n/hapus info_rehab`,
    header: 'HAPUS KONTEN',
    footer: 'Ketik /list untuk melihat konten',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_konten' },
    ]
  },
  help_addadmin: {
    text: `➕ *Tambah Admin* (Owner Only)\nFormat:\n/addadmin <nomor>\n\nContoh:\n/addadmin 6281234567890`,
    header: 'TAMBAH ADMIN',
    footer: 'Ketik /admins untuk melihat daftar',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_admins' },
    ]
  },
  help_removeadmin: {
    text: `🗑️ *Hapus Admin* (Owner Only)\nFormat:\n/removeadmin <nomor>\n\nContoh:\n/removeadmin 6281234567890`,
    header: 'HAPUS ADMIN',
    footer: 'Ketik /admins untuk melihat daftar',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_admins' },
    ]
  },
  help_gantipin: {
    text: `🔐 *Ganti PIN* (Owner Only)\nFormat:\n/gantipin <PIN baru>\n\nContoh:\n/gantipin 12345\n\n*Catatan: PIN minimal 4 karakter*`,
    header: 'GANTI PIN',
    footer: 'Hanya owner yang bisa mengganti PIN',
    type: 'quick_reply',
    buttons: [
      { text: '⬅️ Kembali', id: 'admin_admins' },
    ]
  },
  error_fallback: {
    text: `⚠️ Maaf, pilihan yang Anda masukkan tidak tersedia.

Silakan pilih menu yang tersedia atau klik tombol di bawah untuk kembali ke menu utama.`,
    header: 'PILIHAN TIDAK TERSEDIA',
    footer: 'Klik tombol di bawah untuk kembali',
    type: 'quick_reply',
    buttons: [
      { text: '🏠 Kembali ke Menu Utama', id: 'menu' },
    ]
  },
  content_back: {
    text: 'Gunakan tombol di bawah untuk kembali ke menu utama.',
    header: '',
    footer: '',
    type: 'quick_reply',
    buttons: [
      { text: '🏠 Kembali ke Menu Utama', id: 'menu' },
    ]
  },
};

const detailContent = {
  '1a': `
PROFIL & TUGAS POKOK BNNP SULSEL

BNNP Sulsel adalah Instansi Vertikal di bawah BNN RI yang bertugas melaksanakan Pencegahan dan Pemberantasan Penyalahgunaan serta Peredaran Gelap Narkoba (P4GN) di wilayah Sulawesi Selatan.

Tugas Pokok:
• Penyusunan kebijakan teknis P4GN tingkat provinsi
• Koordinasi dengan BNN Kab/Kota, Polri, TNI, dan stakeholder
• Pengawasan sirkulasi narkotika & prekursor
• Rehabilitasi korban penyalahgunaan narkoba
• Advokasi, sosialisasi, dan pemberdayaan masyarakat

Visi: "Sulawesi Selatan Bebas Narkoba, Sejahtera, dan Berbudaya"
Misi: Pencegahan dini, penegakan hukum humanis, rehabilitasi berkelanjutan.`,
  '1b': `
PROGRAM P4GN (PENCEGAHAN & PEMBERDAYAAN)

Program Unggulan BNNP Sulsel:

🏘️ DESA/KELURAHAN BERSINAR
Pemberdayaan masyarakat di tingkat akar rumput untuk jadi "jaga tempat" anti-narkoba.

🏫 PENCEGAHAN DI SEKOLAH & KAMPUS
• Gerakan Sekolah Sehat & Bebas Narkoba (GSSBN)
• Peer Counselor / Kespro anti-narkoba
• Kemitraan dengan Dinas Pendidikan

👨‍👩‍👧‍👦 PENCEGAHAN DI KELUARGA
• Bina Keluarga Sehat (BKS) anti-narkoba
• Pelatihan orang tua deteksi dini
• Modul "Keluarga Tangguh Lawan Narkoba"

🌐 SOSIALISASI BAHAYA NARKOBA
• Roadshow ke kecamatan/desa
• Media sosial, radio, TV lokal
• Kemitraan tokoh agama, adat, pemuda

📞 LAYANAN KONSULTASI GRATIS
Hubungi BNNP Sulsel untuk bantuan konseling & rujukan rehab.`,
  '1c': `
JAM OPERASIONAL & ALAMAT KANTOR BNNP SULSEL

📍 KANTOR UTAMA BNNP SULSEL
Jl. A.P. Pettarani No. 14, Makassar 90234
Sulawesi Selatan

⏰ JAM KERJA
Senin–Kamis : 08.00 – 16.00 WITA
Jumat       : 08.00 – 16.30 WITA
Sabtu–Minggu & Libur Nasional: TUTUP

📞 KONTAK RESMI
Telepon : 0411-585xxx (hubungi via WA untuk nomor lengkap)
WhatsApp: 0821-9xxx-xxxx (CS BNNP Sulsel)
Email   : humas@sulsel.bnn.go.id
Website : sulsel.bnn.go.id

💡 Pengaduan & konsultasi bisa 24 jam via WhatsApp/Email.`,
  '1d': `
LANDASAN HUKUM BNNP SULSEL

⚖️ UNDANG-UNDANG UTAMA
• UU No. 35 Tahun 2009 tentang Narkotika
• UU No. 5 Tahun 1997 tentang Psikotropika
• UU No. 17 Tahun 2017 tentang Perubahan atas UU 35/2009

📜 PERATURAN PELAKSANA
• PP No. 31 Tahun 2014 tentang Rehabilitasi
• Perpres No. 89 Tahun 2014 tentang BNN
• Inpres No. 2 Tahun 2020 tentang RAN P4GN
• Perbnn No. 8 Tahun 2020 tata cara rehabilitasi
• Peraturan Gubernur Sulsel tentang P4GN Daerah

📚 Dokumen lengkap: sulsel.bnn.go.id/regulasi`,
  '1e': `
LOKASI KANTOR CABANG BNNP SULSEL

📍 BNN KAB. BONE
📌 Macanang, Tanete Riattang Bar., Macanang, Kec. Tanete Riattang Bar., Kabupaten Bone, Sulawesi Selatan 92713
🗺️ https://maps.app.goo.gl/wiXLnjRd1ipjyktF6

📍 BNN KAB. SIDENRENG RAPPANG
📌 Jl. Korban 40.000 Jiwa No.6, Majjelling, Kec. Maritengngae, Kabupaten Sidenreng Rappang, Sulawesi Selatan 91611
🗺️ https://maps.app.goo.gl/5S5HSFYKLZbH7ndb6

📍 BNN KOTA PALOPO
📌 Takkalala, Kec. Wara Sel., Kota Palopo, Sulawesi Selatan 91922
🗺️ https://maps.app.goo.gl/AMY2SX6xot1zxF9w7

📍 BNN KAB. TANA TORAJA
📌 Jl. Ibu Tien Soeharto, Kamali Pentalluan, Makale, Bombongan, Makale, Bombongan, Kec. Makale, Kabupaten Tana Toraja, Sulawesi Selatan 91811
🗺️ https://maps.app.goo.gl/VkaUKMKc5AmBQRqdA

📌 Semua cabang menyediakan:
   • Pendaftaran Program Rehabilitasi
   • Konseling & Edukasi Pencegahan
   • Pemeriksaan Narkoba (Urine Test)
   • Pelayanan Administrasi Umum`,
  '2a': `
SAMPAIKAN PENGADUAN NARKOBA

Saluran Resmi Pengaduan BNNP Sulsel:

📱 WHATSAPP (24 Jam)
0821-9xxx-xxxx (CS BNNP Sulsel)

📧 EMAIL
pengaduan@sulsel.bnn.go.id

🌐 WEBSITE
sulsel.bnn.go.id/pengaduan

🏛️ DATANG LANGSUNG
Kantor BNNP Sulsel, Jl. A.P. Pettarani No. 14, Makassar
Atau BNN Kab/Kota terdekat

📋 DATA YANG DIBUTUHKAN
1. Nama lengkap pelapor (bisa anonim)
2. Nomor telepon/WhatsApp yang bisa dihubungi
3. Lokasi kejadian (detail alamat/koordinat)
4. Waktu kejadian (perkiraan)
5. Uraian pengaduan (jenis narkoba, pelaku, modus)
6. Bukti pendukung (foto/video) jika ada

⏱ Estimasi: Nomor tiket (TKT-xxx) diterbitkan < 1×24 jam.
Status bisa dicek via menu "Cek Status Pengaduan".

⚠️ Perlindungan pelapor: UU 31/2014 tentang Perlindungan Saksi & Korban.`,
  '2b': `
CEK STATUS PENGADUAN

Kirim *Nomor Tiket* yang diterbitkan saat pengaduan diregistrasi.

Format: *TKT-2025-XXXXXX* (contoh: TKT-2025-001234)

Nomor tiket dikirim via WhatsApp/Email setelah pengaduan diverifikasi.

📊 ALUR STATUS
1. BARU        → Pengaduan masuk, belum diverifikasi
2. DIPROSES    → Verifikasi & penyelidikan oleh petugas
3. SELESAI     → Tindak lanjut selesai (penangkapan/rehab/dll)
4. DITOLAK     → Tidak memenuhi syarat / data tidak valid

💡 Belum punya nomor tiket? Gunakan menu "Sampaikan Pengaduan" terlebih dahulu.`,
  '2c': `
LAYANAN REHABILITASI & KONSELING

BNNP menyediakan layanan rehabilitasi GRATIS & RAHASIA untuk korban penyalahgunaan narkoba.

🏥 JENIS REHABILITASI
• Rawat Inap (Residensial)  : 3–6 bulan di Lembaga Rehab BNN
• Rawat Jalan (Non-Residen) : Konseling berkala, tetap tinggal di rumah
• Komunitas Terapis         : Therapeutic Community (TC)

📋 SYARAT MASUK REHAB
1. Surat rujukan dokter/RS (bisa dari BNN)
2. Hasil screening urine positif narkoba
3. Surat keterangan sehat (bebas TB, HIV, dll)
4. Surat pernyataan bersedia direhabilitasi
5. KTP & KK (fotokopi)
6. Pas foto 3×4 (2 lembar)

📞 KONTAK RUJUKAN REHAB
• RS Khusus Rehab BNN Makassar
• Lembaga Rehab Mitra BNN di Sulsel
• Hubungi BNNP Sulsel (WA/Telepon) untuk asesmen & penempatan

💰 BIAYA: GRATIS (dibiayakan APBN/APBD). Tidak ada biaya tersembunyi.`,
  '2d': `
FAQ NARKOBA (PERTANYAAN UMUM)

❓ Apa beda Narkotika & Psikotropika?
Narkotika (UU 35/2009): zat/obat yang menimbulkan ketergantungan (heroin, sabu, putau, kokain, dll).
Psikotropika (UU 5/1997): obat yang memengaruhi sistem saraf pusat (ekstasi, shabu-shabu, benzodiazepin, dll).

❓ Apa bahaya narkoba?
• Kerusakan otak permanen (memori, konsentrasi, emosi)
• Gangguan jantung, hati, ginjal, paru
• Gangguan mental: depresi, psikosis, kecemasan
• Risiko HIV/AIDS (jarum suntik)
• Ketergantungan fisik & psikologis sulit dilepaskan

❓ Cara melapor narkoba tanpa takut?
• Anonim via WA/Email BNNP Sulsel
• Perlindungan identitas pelapor (UU 31/2014)
• Tidak dipanggil ke pengadilan kecuali sukarela

❓ Rehab gratis & rahasia?
✅ Ya, 100% dibiayai negara. Data pasien kerahasiaan medis.

❓ Cara daftar rehab?
Hubungi BNNP Sulsel → Asesmen → Rujuk ke fasilitas rehab.

❓ Apa itu P4GN?
Pencegahan & Pemberantasan Penyalahgunaan & Peredaran Gelap Narkoba. Program nasional terpadu (Inpres 2/2020).`,
  '3a': `
CUSTOMER SERVICE & KONTAK RESMI BNNP SULSEL

📞 TELEPON KANTOR
0411-585xxx (Jam kerja: Sen–Jum 08.00–16.00 WITA)

💬 WHATSAPP (24 Jam untuk Pengaduan & Konsultasi)
0821-9xxx-xxxx

📧 EMAIL
humas@sulsel.bnn.go.id
pengaduan@sulsel.bnn.go.id

🌐 WEBSITE RESMI
sulsel.bnn.go.id

📍 ALAMAT KANTOR UTAMA
Jl. A.P. Pettarani No. 14, Makassar 90234, Sulawesi Selatan

⏰ JAM LAYANAN PUBLIK
Senin–Kamis : 08.00 – 16.00 WITA
Jumat       : 08.00 – 16.30 WITA
Sabtu–Minggu & Libur: TUTUP (kecuali pengaduan darurat via WA)

💡 Petugas kami akan merespons secepatnya pada jam operasional.`,
  '3b': `
MEDIA SOSIAL & WEBSITE BNNP SULSEL

🌐 Website
   sulsel.bnn.go.id

📸 Instagram
   @infobnn_prov_sulsel
   instagram.com/infobnn_prov_sulsel

🐦 X (Twitter)
   @humasBNNPsulsel
   x.com/humasBNNPsulsel

📘 Facebook
   BNNP Sulawesi Selatan
   facebook.com/bnnpsulawesiselatan

▶️ YouTube
   @bnnpsulawesiselatan
   youtube.com/@bnnpsulawesiselatan

🎵 TikTok
   @halobnn_sulsel
   tiktok.com/@halobnn_sulsel

Ikuti untuk info terbaru: edukasi, kegiatan, pengumuman, dan tips anti-narkoba.`,
  '3c': `
PANDUAN & SYARAT REHABILITASI NARKOBA

📋 ALUR PENDAFTARAN REHAB
1. Hubungi BNNP Sulsel (WA/Telepon/Datang)
2. Asesmen awal oleh petugas/medis
3. Cek kesehatan (lab, fisik, psikologis)
4. Penentuan jenis rehab (Inap/Jalan/Komunitas)
5. Penempatan ke Lembaga Rehab BNN/Mitra

📄 SYARAT DOKUMEN
✅ KTP asli & fotokopi (masih berlaku)
✅ KK fotokopi
✅ Surat rujukan dokter/RS (bisa dari BNN)
✅ Hasil screening urine (positif narkoba)
✅ Surat keterangan sehat (bebas TB, HIV, hepatitis)
✅ Surat pernyataan bersedia direhabilitasi (bermaterai)
✅ Pas foto 3×4 (2 lembar)
✅ KTP & KK orang tua/wali (jika < 21 thn)

⏱ ESTIMASI WAKTU
Asesmen & administrasi: 1–3 hari kerja
Penempatan rehab: tergantung kuota fasilitas

💰 BIAYA: GRATIS (APBN/APBD). Tidak ada biaya apapun.

⚠️ PERHATIAN
• Rehab wajib untuk pengguna (bukan penjara) — UU 35/2009 Pasal 127–129
• Data pasien kerahasiaan medis
• Keluarga diikutsertakan dalam program family therapy`,
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendInteractive(sock, jid, menuKey, bodyText) {
  const config = interactiveMenus[menuKey];
  if (!config) {
    console.log(`sendInteractive: config "${menuKey}" not found`);
    return;
  }

  await delay(800);

  try {
    let interactiveButtons;

    if (config.type === 'quick_reply') {
      interactiveButtons = config.buttons.map(button => ({
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: button.text,
          id: button.id
        })
      }));
    } else {
      const buttonTitle = config.buttonText || 'Pilih';
      interactiveButtons = [{
        name: 'single_select',
        buttonParamsJson: JSON.stringify({
          title: buttonTitle,
          sections: config.sections.map(section => ({
            title: section.title,
            rows: section.rows.map(row => ({
              id: row.rowId,
              title: row.title,
              description: row.description
            }))
          }))
        })
      }];
    }

    await sendInteractiveMessage(sock, jid, {
      text: bodyText || config.text,
      footer: config.footer,
      title: config.header,
      interactiveButtons: interactiveButtons
    });
    console.log(`sendInteractive: "${menuKey}" sent to ${jid}`);
  } catch (err) {
    console.error(`sendInteractive "${menuKey}" error:`, err.message);
  }
}

module.exports = { interactiveMenus, detailContent, sendInteractive };

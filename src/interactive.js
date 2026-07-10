const { sendInteractiveMessage } = require('@ryuu-reinzz/button-helper');
const admin = require('./admin');

const interactiveMenus = {
  main: {
    text: `Selamat datang di Layanan Chatbot BNNP Sulsel. Silakan pilih menu yang dibutuhkan.`,
    header: 'LAYANAN INFORMASI DAN PELAYANAN PUBLIK',
    footer: '',
    type: 'quick_reply',
    buttons: [
      { text: 'Informasi', id: '1' },
      { text: 'Layanan', id: '2' },
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
    text: `Silakan pilih informasi yang Anda butuhkan:`,
    header: 'INFORMASI',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'INFORMASI',
      rows: [
        { title: 'Profil & Tugas BNNP Sulsel', rowId: '1a' },
        { title: 'Program P4GN', rowId: '1b' },
        { title: 'Jam & Alamat Kantor', rowId: '1c' },
        { title: 'Landasan Hukum', rowId: '1d' },
        { title: 'Lokasi Kantor Cabang', rowId: '1e' },
        { title: 'FAQ Narkoba', rowId: '1f' },
        { title: 'Media Sosial & Website', rowId: '1g' },
        { title: 'Daftar Layanan', rowId: '1h', description: 'TAT, Test Urine, Penyuluhan, dll' },
      ]
    }]
  },
  '2': {
    text: `Silakan pilih layanan yang Anda butuhkan:`,
    header: 'LAYANAN',
    footer: '',
    buttonText: 'Pilih Layanan',
    sections: [{
      title: 'LAYANAN',
      rows: [
        { title: 'Tes Asesmen Terpadu (TAT)', rowId: '2a', description: 'Asesmen awal & rujukan rehabilitasi' },
        { title: 'Test Urine', rowId: '2b', description: 'Pemeriksaan urine deteksi narkoba' },
        { title: 'Penyuluhan', rowId: '2c', description: 'Sosialisasi bahaya narkoba ke sekolah/komunitas' },
        { title: 'Buku Tamu', rowId: '2d', description: 'Pencatatan kunjungan & layanan' },
        { title: 'Konsultasi Hukum', rowId: '2e', description: 'Konsultasi UU Narkotika & hak hukum' },
        { title: 'Pengaduan', rowId: '2f', description: 'Sampaikan & cek status pengaduan' },
        { title: 'Perjanjian Kerja Sama (PKS)', rowId: '2g', description: 'Kemitraan & MoU dengan institusi' },
        { title: 'Rehabilitasi', rowId: '2h', description: 'Rehab gratis & rahasia korban narkoba' },
        { title: 'Survei', rowId: '2i', description: 'Survei kepuasan & indeks P4GN' },
        { title: 'Magang', rowId: '2j', description: 'Program magang/praktik di BNNP' },
        { title: 'SKHPN', rowId: '2k', description: 'Surat Keterangan Hasil Pemeriksaan Narkoba' },
      ]
    }]
  },
  '1h': {
    text: `Silakan pilih layanan yang Anda butuhkan:`,
    header: 'LAYANAN',
    footer: '',
    buttonText: 'Pilih Layanan',
    sections: [{
      title: 'LAYANAN',
      rows: [
        { title: 'Tes Asesmen Terpadu (TAT)', rowId: '1h2a', description: 'Asesmen awal & rujukan rehabilitasi' },
        { title: 'Test Urine', rowId: '1h2b', description: 'Pemeriksaan urine deteksi narkoba' },
        { title: 'Penyuluhan', rowId: '1h2c', description: 'Sosialisasi bahaya narkoba' },
        { title: 'Buku Tamu', rowId: '1h2d', description: 'Pencatatan kunjungan & layanan' },
        { title: 'Konsultasi Hukum', rowId: '1h2e', description: 'Konsultasi UU Narkotika & hak hukum' },
        { title: 'Pengaduan', rowId: '1h2f', description: 'Sampaikan & cek status pengaduan' },
        { title: 'Perjanjian Kerja Sama (PKS)', rowId: '1h2g', description: 'Kemitraan & MoU dengan institusi' },
        { title: 'Rehabilitasi', rowId: '1h2h', description: 'Rehab gratis & rahasia korban narkoba' },
        { title: 'Survei', rowId: '1h2i', description: 'Survei kepuasan & indeks P4GN' },
        { title: 'Magang', rowId: '1h2j', description: 'Program magang/praktik di BNNP' },
        { title: 'SKHPN', rowId: '1h2k', description: 'Surat Keterangan Hasil Pemeriksaan Narkoba' },
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
  back_layanan: {
    text: '',
    header: '',
    footer: '',
    type: 'quick_reply',
    buttons: [
      { text: 'Kembali', id: '1h' },
      { text: 'Kembali ke Menu Utama', id: 'menu' },
    ]
  },
  back_layanan_main: {
    text: '',
    header: '',
    footer: '',
    type: 'quick_reply',
    buttons: [
      { text: 'Kembali', id: '2' },
      { text: 'Kembali ke Menu Utama', id: 'menu' },
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
Pemberdayaan masyarakat untuk jadi "jaga tempat" anti-narkoba.

🏫 PENCEGAHAN DI SEKOLAH & KAMPUS
• Gerakan Sekolah Sehat & Bebas Narkoba
• Peer Counselor anti-narkoba
• Kemitraan dengan Dinas Pendidikan

👨‍👩‍👧‍👦 PENCEGAHAN DI KELUARGA
• Bina Keluarga Sehat anti-narkoba
• Pelatihan orang tua deteksi dini

🌐 SOSIALISASI BAHAYA NARKOBA
• Roadshow ke kecamatan/desa
• Media sosial, radio, TV lokal

📞 Hubungi BNNP Sulsel untuk info program selengkapnya.`,
  '1c': `
JAM OPERASIONAL & ALAMAT KANTOR BNNP SULSEL

📍 KANTOR UTAMA BNNP SULSEL
Jl. A.P. Pettarani No. 14, Makassar 90234

⏰ JAM KERJA
Senin–Kamis : 08.00 – 16.00 WITA
Jumat       : 08.00 – 16.30 WITA
Sabtu–Minggu & Libur Nasional: TUTUP

📞 KONTAK
Telepon : 0411-585xxx
WhatsApp: 0821-9xxx-xxxx
Email   : humas@sulsel.bnn.go.id
Website : sulsel.bnn.go.id

💡 Pengaduan & konsultasi 24 jam via WA/Email.`,
  '1d': `
LANDASAN HUKUM BNNP SULSEL

⚖️ UU No. 35 Tahun 2009 tentang Narkotika
⚖️ UU No. 5 Tahun 1997 tentang Psikotropika
⚖️ PP No. 31 Tahun 2014 tentang Rehabilitasi
⚖️ Perpres No. 89 Tahun 2014 tentang BNN
⚖️ Inpres No. 2 Tahun 2020 tentang RAN P4GN

📚 Dokumen lengkap: sulsel.bnn.go.id/regulasi`,
  '1e': `
LOKASI KANTOR CABANG BNNP SULSEL

📍 BNN KAB. BONE
📌 Macanang, Tanete Riattang Bar., Kab. Bone 92713
🗺️ https://maps.app.goo.gl/wiXLnjRd1ipjyktF6

📍 BNN KAB. SIDENRENG RAPPANG
📌 Jl. Korban 40.000 Jiwa No.6, Majjelling, Kab. Sidrap 91611
🗺️ https://maps.app.goo.gl/5S5HSFYKLZbH7ndb6

📍 BNN KOTA PALOPO
📌 Takkalala, Kec. Wara Sel., Kota Palopo 91922
🗺️ https://maps.app.goo.gl/AMY2SX6xot1zxF9w7

📍 BNN KAB. TANA TORAJA
📌 Jl. Ibu Tien Soeharto, Kamali Pentalluan, Makale, Kab. Tana Toraja 91811
🗺️ https://maps.app.goo.gl/VkaUKMKc5AmBQRqdA

📌 Semua cabang: Pendaftaran Rehab, Konseling Edukasi, Test Urine, Adm Umum.`,
  '1f': `
FAQ NARKOBA

❓ Apa bahaya narkoba?
Kerusakan otak permanen, gangguan jantung & mental, HIV/AIDS (jarum suntik), ketergantungan fisik/psikologis, overdosis hingga kematian.

❓ Apakah melapor narkoba ada perlindungan?
Ya, UU 31/2014 melindungi identitas pelapor. Bisa lapor anonim via WA/Email BNNP.

❓ Bisa lapor dari jauh?
Bisa via WA/Email/Website. Tidak harus datang langsung.

❓ Apakah ada reward pelapor?
Informasi lebih lanjut hubungi BNNP Sulsel.

❓ Rehab gratis?
100% gratis, dibiayai negara. Rahasia medis terjamin.

❓ Cara daftar rehab?
Hubungi BNNP → Asesmen → Positif → Rujuk ke IPWL/RSKO.

Informasi lengkap: hubungi CS BNNP Sulsel.`,
  '1g': `
MEDIA SOSIAL & WEBSITE BNNP SULSEL

🌐 sulsel.bnn.go.id
📸 @infobnn_prov_sulsel
🐦 @humasBNNPsulsel
📘 BNNP Sulawesi Selatan
▶️ @bnnpsulawesiselatan
🎵 @halobnn_sulsel

Ikuti untuk info edukasi, kegiatan, pengumuman & tips anti-narkoba.`,
  '1h2a': `
LAYANAN TES ASESMEN TERPADU (TAT)

TAT adalah layanan assessment awal untuk menentukan tingkat ketergantungan narkoba dan merekomendasikan program rehabilitasi yang sesuai.

• Mengetahui tingkat keparahan ketergantungan
• Mendapatkan rujukan tepat ke lembaga rehab
• Assessment gratis & rahasia
• Estimasi: 1-2 jam sesi

Hubungi BNNP Sulsel untuk janji assessment.`,
  '1h2b': `
LAYANAN TEST URINE

Pemeriksaan urine untuk deteksi narkoba.

• Test Panel (multi-jenis narkoba) — hasil 15-30 menit
• Test Konfirmasi — hasil 3-5 hari
• GRATIS untuk masyarakat umum (program tertentu)
• Berbayar untuk instansi/perusahaan

Syarat: KTP asli + formulir permohonan.

📍 Layanan di Kantor BNNP Sulsel & BNN Kab/Kota.`,
  '1h2c': `
LAYANAN PENYULUHAN

Permintaan penyuluhan bahaya narkoba untuk sekolah, kantor, komunitas, dan masyarakat umum.

• GRATIS untuk masyarakat Sulsel
• Kirim surat permohonan resmi min. 7 hari sebelum pelaksanaan

📍 Alamat: Jl. A.P. Pettarani No. 14, Makassar
🌐 sulsel.bnn.go.id`,
  '1h2d': `
BUKU TAMU BNNP SULSEL

Pencatatan setiap kunjungan masyarakat ke kantor BNNP Sulsel dan BNN Kab/Kota.

• Data kunjungan & layanan
• Monitoring pengunjung
• Dasar evaluasi layanan publik

📍 Tersedia di loket pelayanan BNNP Sulsel dan BNN Kab/Kota.`,
  '1h2e': `
KONSULTASI HUKUM

Konsultasi hukum terkait narkotika untuk masyarakat umum.

• UU 35/2009 tentang Narkotika
• Hak hukum tersangka/terdakwa narkotika
• Rehabilitasi sebagai pengganti hukuman
• Mekanisme pelaporan & perlindungan saksi

💻 Datang langsung, telepon, atau WA. GRATIS & RAHASIA.
⏱ Senin–Jumat, 08.00–16.00 WITA.`,
  '1h2f': `
LAYANAN PENGADUAN NARKOBA

📱 WA 24 Jam: 0821-9xxx-xxxx
📧 Email: pengaduan@sulsel.bnn.go.id
🌐 sulsel.bnn.go.id/pengaduan
🏛️ Datang langsung: Jl. A.P. Pettarani No. 14, Makassar

Data yg dibutuhkan: nama (bisa anonim), kontak, lokasi & waktu kejadian, uraian, bukti jika ada.

⏱ Nomor tiket (TKT-xxx) < 1×24 jam.
⚠️ Perlindungan: UU 31/2014 Perlindungan Saksi & Korban.`,
  '1h2g': `
PERJANJIAN KERJA SAMA (PKS)

BNNP Sulsel membuka kerja sama dengan institusi.

🤝 Program pencegahan narkoba, test urine massal, pelatihan kader, Desa Bersinar.

Prosedur: surat permohonan → rapat koordinasi → PKS/MoU → implementasi → M&E.

💻 Kontak: humas@sulsel.bnn.go.id`,
  '1h2h': `
REHABILITASI NARKOBA

Rehab GRATIS & RAHASIA untuk korban penyalahgunaan narkoba.

• Rawat Inap: 3-6 bulan
• Rawat Jalan: konseling berkala
• Komunitas Terapis (TC)

Syarat: KTP, surat rujukan, hasil urine positif, surat sehat.

💰 BIAYA: GRATIS (APBN/APBD).

⚠️ Rehab wajib untuk pengguna (UU 35/2009 Pasal 127-129).`,
  '1h2i': `
SURVEI BNNP SULSEL

Survei berkala untuk mengukur:
• Kepuasan masyarakat terhadap layanan BNN
• Indeks P4GN
• Prevalensi penyalahgunaan narkoba

💻 Partisipasi Anda sangat berharga.
Ikuti survei: sulsel.bnn.go.id/survei`,
  '1h2j': `
PROGRAM MAGANG / PRAKTIK KERJA

Kesempatan magang untuk mahasiswa/siswa/fresh graduate.

Syarat: surat pengantar, proposal, CV, transkrip, KTP, pas foto.
Durasi: 1-3 bulan.

📞 Kirim lamaran: humas@sulsel.bnn.go.id
📍 Jl. A.P. Pettarani No. 14, Makassar`,
  '1h2k': `
SKHPN (SURAT KETERANGAN HASIL PEMERIKSAAN NARKOBA)

SKHPN adalah surat resmi hasil pemeriksaan narkoba untuk keperluan administrasi, pekerjaan, beasiswa, dll.

Prosedur: Datang → Test Urine → Hasil (15-30 menit) → Terbit SKHPN.

💰 GRATIS untuk perorangan.

💡 Hubungi BNNP Sulsel untuk info lebih lanjut.`,
  '2a': `
CARA DAFTAR TES ASESMEN TERPADU (TAT)

📋 PERSYARATAN:
• KTP asli
• Surat rujukan dari dokter/puskesmas (jika ada)
• Bersedia mengikuti sesi assessment (±1-2 jam)

📝 ALUR:
1. Hubungi BNNP Sulsel (WA/Telepon/Datang) untuk buat janji
2. Datang ke kantor sesuai jadwal
3. Assessment oleh petugas/psikolog
4. Hasil assessment → rekomendasi rehab
5. Rujuk ke lembaga rehab sesuai hasil

🌐 Link pendaftaran: sulsel.bnn.go.id/layanan/tat

💡 Assessment GRATIS & RAHASIA.`,
  '2b': `
CARA DAFTAR TEST URINE

📋 PERSYARATAN:
• KTP asli
• Mengisi formulir permohonan
• Bersedia mengikuti prosedur sampling

📝 ALUR:
1. Datang ke BNNP Sulsel atau BNN Kab/Kota terdekat
2. Ambil nomor antrean di loket
3. Isi formulir permohonan test urine
4. Petugas melakukan sampling urine
5. Tunggu hasil:
   - Test Panel: 15-30 menit
   - Test Konfirmasi: 3-5 hari
6. Ambil hasil & SKHPN (jika diperlukan)

💰 BIAYA:
• GRATIS untuk masyarakat umum (program tertentu)
• Berbayar untuk instansi/perusahaan

🌐 Link info: sulsel.bnn.go.id/layanan/test-urine`,
  '2c': `
CARA DAFTAR PENYULUHAN

📋 PERSYARATAN:
• Surat permohonan resmi dari pimpinan institusi
• Surat pernyataan kesediaan fasilitas tempat
• Surat pernyataan jumlah peserta (min. 20 orang)

📝 ALUR:
1. Kirim surat permohonan resmi ke:
   BNNP Sulsel
   Jl. A.P. Pettarani No. 14, Makassar 90234
   Atau email: humas@sulsel.bnn.go.id
2. Tim BNN akan menghubungi untuk koordinasi
3. Konfirmasi jadwal & tempat
4. Pelaksanaan penyuluhan
5. Laporan & evaluasi

⏱ Ajukan minimal 7 hari sebelum pelaksanaan
💰 GRATIS untuk masyarakat Sulsel

🌐 Link info: sulsel.bnn.go.id/layanan/penyuluhan`,
  '2d': `
CARA DAFTAR BUKU TAMU

📝 ALUR:
1. Datang ke kantor BNNP Sulsel atau BNN Kab/Kota
2. Menuju loket pelayanan
3. Isi buku tamu / form digital:
   • Nama lengkap
   • Instansi/identitas
   • Keperluan/kunjungan
   • No. telepon
4. Petugas akan mengarahkan ke bagian terkait

🌐 Link: sulsel.bnn.go.id/layanan/buku-tamu`,
  '2e': `
CARA DAFTARKONSULTASI HUKUM

📋 PERSYARATAN:
• KTP/surat identitas
• Data/informasi terkait kasus (jika ada)

📝 ALUR:
1. Hubungi BNNP Sulsel:
   📞 0411-585xxx (jam kerja)
   💬 WA: 0821-9xxx-xxxx
   📧 humas@sulsel.bnn.go.id
2. Sampaikan topik konsultasi
3. Petugas hukum akan merespon & menjadwalkan
4. Sesi konsultasi (datang langsung / telepon / WA)
5. Dapatkan penjelasan & rekomendasi hukum

🕒 Senin–Jumat, 08.00–16.00 WITA
💰 GRATIS & RAHASIA

🌐 Link: sulsel.bnn.go.id/layanan/konsultasi-hukum`,
  '2f': `
CARADAFTAR PENGADUAN

📝 ALUR:
1. Sampaikan pengaduan lewat salah satu saluran:
   💬 WA 24 Jam: 0821-9xxx-xxxx
   📧 pengaduan@sulsel.bnn.go.id
   🌐 sulsel.bnn.go.id/pengaduan
   🏛️ Datang langsung ke kantor
2. Lengkapi data:
   • Nama (bisa anonim)
   • Kontak yang bisa dihubungi
   • Lokasi & waktu kejadian
   • Uraian pengaduan
   • Bukti pendukung (jika ada)
3. Petugas memverifikasi & menerbitkan nomor tiket
4. Pantau status via menu "Pengaduan" atau hubungi CS

⏱ Nomor tiket (TKT-xxx) diterbitkan < 1×24 jam.

🌐 Link: sulsel.bnn.go.id/layanan/pengaduan`,
  '2g': `
CARA DAFTAR PKS / KERJA SAMA

📋 PERSYARATAN:
• Surat permohonan dari pimpinan institusi
• Profil institusi & latar belakang
• Proposal kerja sama / program

📝 ALUR:
1. Kirim surat permohonan resmi ke:
   BNNP Sulsel
   Jl. A.P. Pettarani No. 14, Makassar
   Atau email: humas@sulsel.bnn.go.id
2. Tim BNN mengkaji proposal
3. Rapat koordinasi & presentasi program
4. Penandatanganan PKS/MoU
5. Implementasi program bersama
6. Monitoring & evaluasi berkala

🌐 Link: sulsel.bnn.go.id/layanan/pks`,
  '2h': `
CARA DAFTARREHABILITASI

📋 PERSYARATAN:
• KTP & KK (fotokopi)
• Surat rujukan dokter/RS (bisa dari BNN)
• Hasil screening urine positif narkoba
• Surat keterangan sehat (bebas TB, HIV, hepatitis)
• Surat pernyataan bersedia direhab (bermaterai)
• Pas foto 3×4 (2 lembar)
• KTP & KK orang tua/wali (jika < 21 tahun)

📝 ALUR:
1. Hubungi BNNP Sulsel (WA/Telepon/Datang)
2. Asesmen awal oleh petugas/medis
3. Cek kesehatan (lab, fisik, psikologis)
4. Penentuan jenis rehab (Inap/Jalan/Komunitas)
5. Penempatan ke Lembaga Rehab BNN/Mitra
6. Jalani program rehabilitasi
7. Selesai → reintegrasi sosial & pasca rehab

💰 BIAYA: GRATIS (APBN/APBD)
⚠️ Rehab wajib untuk pengguna (UU 35/2009 Pasal 127-129)

🌐 Link: sulsel.bnn.go.id/layanan/rehabilitasi`,
  '2i': `
CARA DAFTAR SURVEI

📝 ALUR:
1. Buka tautan survei: sulsel.bnn.go.id/survei
2. Pilih jenis survei yang tersedia:
   • Kepuasan Masyarakat
   • Indeks P4GN
   • Kebutuhan Rehabilitasi
3. Isi data diri (nama, umur, domisili, pekerjaan)
4. Jawab pertanyaan survei
5. Klik "Kirim"
6. Selesai — partisipasi Anda tercatat

💰 Partisipasi GRATIS & ANONIM.

🌐 Link: sulsel.bnn.go.id/survei`,
  '2j': `
CARA DAFTAR MAGANG

📋 PERSYARATAN:
• Surat pengantar dari institusi pendidikan
• Proposal magang (maks 2 halaman)
• CV & transkrip nilai
• KTP & KTM/kartu siswa
• Pas foto 3×4 (2 lembar)
• Surat pernyataan bersedia mengikuti aturan BNN

📝 ALUR:
1. Kirim lamaran via email: humas@sulsel.bnn.go.id
2. Tim BNN review proposal
3. Interview & penempatan bagian
4. Penandatanganan surat tugas magang
5. Pelaksanaan magang (1-3 bulan)
6. Evaluasi & penerbitan sertifikat

🌐 Link: sulsel.bnn.go.id/layanan/magang`,
  '2k': `
CARA DAFTAR SKHPN

📋 PERSYARATAN:
• KTP asli & fotokopi
• Mengisi formulir permohonan SKHPN
• Surat pengantar dari instansi (jika untuk keperluan kerja/sekolah)
• Hasil test urine (dilakukan di tempat)

📝 ALUR:
1. Datang ke BNNP Sulsel / BNN Kab/Kota
2. Ambil nomor antrean
3. Isi formulir permohonan
4. Lakukan test urine (panel 15-30 menit)
5. Tunggu hasil test
6. Jika hasil keluar → SKHPN diterbitkan & ditandatangani petugas
7. Ambil SKHPN di loket

💰 BIAYA: GRATIS untuk perorangan

🌐 Link: sulsel.bnn.go.id/layanan/skhpn`,
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

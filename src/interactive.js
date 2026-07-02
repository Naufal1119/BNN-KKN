const { sendInteractiveMessage } = require('@ryuu-reinzz/button-helper');
const { subMenus } = require('./menu');
const admin = require('./admin');

const interactiveMenus = {
  main: {
    text: `Selamat datang di Layanan Chatbot BNNP Sulsel. Silakan pilih menu yang dibutuhkan.`,
    header: 'LAYANAN INFORMASI DAN PELAYANAN PUBLIK',
    footer: '',
    type: 'quick_reply',
    buttons: [
      { text: 'Administrasi', id: '1' },
      { text: 'Informasi', id: '2' },
      { text: 'Pengaduan', id: '3' },
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
    text: `Anda memilih Administrasi. Silakan pilih opsi di bawah:`,
    header: 'ADMINISTRASI',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'ADMINISTRASI',
      rows: [
        { title: 'Cek Status Pendaftaran', rowId: '1a' },
        { title: 'Perbarui Data Peserta', rowId: '1b' },
        { title: 'Cetak Kartu Peserta', rowId: '1c' },
      ]
    }]
  },
  '2': {
    text: `Anda memilih Informasi. Silakan pilih opsi di bawah:`,
    header: 'INFORMASI',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'INFORMASI',
      rows: [
        { title: 'Produk dan Program', rowId: '2a' },
        { title: 'Jam Operasional', rowId: '2b' },
        { title: 'Alamat Kantor', rowId: '2c' },
        { title: 'Lokasi Kantor Cabang', rowId: '2g' },
        { title: 'Panduan dan Persyaratan', rowId: '2d' },
        { title: 'Pertanyaan Umum', rowId: '2e' },
        { title: 'Media Sosial dan Website', rowId: '2f' },
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
    text: `Anda memilih Pengaduan. Silakan pilih opsi di bawah:`,
    header: 'PENGADUAN',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'PENGADUAN',
      rows: [
        { title: 'Sampaikan Pengaduan', rowId: '3a' },
        { title: 'Cek Status Pengaduan', rowId: '3b' },
        { title: 'Customer Service', rowId: '3c' },
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
};

const detailContent = {
  '1a': subMenus[2]?.children?.a,
  '1b': subMenus[5]?.children?.['4'],
  '1c': `${subMenus[1]?.body}

━━━━ CETAK KARTU PESERTA ━━━━

Untuk mencetak Kartu Peserta:

🏛️ Datang Langsung ke Kantor:
  1. Kunjungi kantor terdekat
  2. Bawa KTP asli
  3. Ambil nomor antrean
  4. Isi formulir permintaan cetak kartu
  5. Kartu akan dicetak dan diberikan langsung

🌐 Cetak Mandiri:
  1. Login ke www.perusahaan.com
  2. Menu Profil → Cetak Kartu
  3. Klik tombol Cetak
  4. Simpan file PDF dan cetak

⏱ Proses: 5-10 menit (langsung) / 1×24 jam (online)`,
  '2a': subMenus[1]?.children?.b,
  '2b': subMenus[1]?.children?.c,
  '2c': subMenus[1]?.children?.d,
  '2d1': subMenus[3]?.children?.['1'],
  '2d2': subMenus[3]?.children?.['2'],
  '2d3': subMenus[3]?.children?.['3'],
  '2d4': subMenus[3]?.children?.['4'],
  '2d5': subMenus[3]?.children?.['5'],
  '2e1': subMenus[5]?.children?.['1'],
  '2e2': subMenus[5]?.children?.['2'],
  '2e3': subMenus[5]?.children?.['3'],
  '2e4': subMenus[5]?.children?.['4'],
  '2e5': subMenus[5]?.children?.['5'],
  '2e6': subMenus[5]?.children?.['6'],
  '2f': `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       MEDIA SOSIAL DAN WEBSITE BNNP SULSEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
   tiktok.com/@halobnn_sulsel`,
'3a': subMenus[1]?.children?.a,
  '3b': subMenus[2]?.children?.b,
  '3c': subMenus[4]?.body,
  '2g': `
   LOKASI KANTOR CABANG BNNP SULSEL



   📍 BNN KAB. BONE
📍 Alamat: Jl. Ahmad Yani No. 45, Watang Pulu, Kec. Bone, Kab. Bone, Sulsel 92713
📞 Telp: (0481) 210xx | 📧 bnn.bone@bnn.go.id
⏰ Senin–Jumat, 08.00–16.00 WITA
🗺️ Maps: https://maps.app.goo.gl/bone-bnn


   📍 BNN KAB. SIDENRENG RAPPANG

📍 Alamat: Jl. Sultan Hasanuddin No. 88, Panca Lautang, Kec. Baranti, Kab. Sidrap, Sulsel 91611
📞 Telp: (0484) 21xxx | 📧 bnn.sidrap@bnn.go.id
⏰ Senin–Jumat, 08.00–16.00 WITA
🗺️ Maps: https://maps.app.goo.gl/sidrap-bnn


   📍 BNN KOTA PALOPO

📍 Alamat: Jl. Andi Djemma No. 12, Wara, Kec. Wara, Kota Palopo, Sulsel 91911
📞 Telp: (0471) 2xxxxx | 📧 bnn.palopo@bnn.go.id
⏰ Senin–Jumat, 08.00–16.00 WITA
🗺️ Maps: https://maps.app.goo.gl/palopo-bnn


   📍 BNN KAB. TANA TORAJA

📍 Alamat: Jl. Pongtiku No. 56, Rantepao Utara, Kec. Rantepao, Kab. Tana Toraja, Sulsel 91819
📞 Telp: (0423) 2xxxx | 📧 bnn.tanatoraja@bnn.go.id
⏰ Senin–Jumat, 08.00–16.00 WITA
🗺️ Maps: https://maps.app.goo.gl/tanatoraja-bnn


📌 Semua cabang menyediakan:
   • Pendaftaran Program Rehabilitasi
   • Konseling & Edukasi Pencegahan
   • Pemeriksaan Narkoba (Urine Test)
   • Pelayanan Administrasi Umum`,
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendInteractive(sock, jid, menuKey) {
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
      // Single select dropdown menu
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
      text: config.text,
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

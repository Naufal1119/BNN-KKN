const { interactiveMenus, detailContent } = require('./interactive');
const { getSock } = require('./connection');
const admin = require('./admin');

const userSessions = new Map();
const TIMEOUT_REMINDER = 3 * 60 * 1000;
const TIMEOUT_CLOSE = 5 * 60 * 1000;

const welcomeMessage = `Selamat datang di Layanan Chatbot BNNP Sulsel. Silakan pilih menu yang dibutuhkan.`;

const reminderMessage = `Apakah Sahabat BNNP masih bersama kami?

Jika masih memerlukan bantuan, silakan pilih menu yang tersedia.`;

const closeMessage = `Terima kasih telah mengakses Layanan Pandawa, senang dapat membantu Sahabat BNN.`;

function initTimers() {}

function getSession(jid) {
  if (!userSessions.has(jid)) {
    userSessions.set(jid, { currentMenu: 'main', greeted: false });
  }
  return userSessions.get(jid);
}

function resetSession(jid) {
  const session = userSessions.get(jid);
  if (session) {
    clearTimeout(session.reminderTimer);
    clearTimeout(session.closeTimer);
  }
  userSessions.set(jid, { currentMenu: 'main', greeted: session?.greeted ?? false });
}

function clearTimers(session) {
  clearTimeout(session.reminderTimer);
  clearTimeout(session.closeTimer);
}

function startTimers(jid, session) {
  clearTimers(session);
  if (session.closed) return;

  session.reminderTimer = setTimeout(() => {
    const sock = getSock();
    if (sock) {
      sock.sendMessage(jid, { text: reminderMessage });
    }

    session.closeTimer = setTimeout(() => {
      const sockNow = getSock();
      if (sockNow && !session.closed) {
        session.closed = true;
        sockNow.sendMessage(jid, { text: closeMessage });
      }
      userSessions.delete(jid);
    }, TIMEOUT_CLOSE - TIMEOUT_REMINDER);
  }, TIMEOUT_REMINDER);
}

function formatAdminHelp() {
  return `🔧 *Admin Commands BNNP*

*🔐 Auth:*
/login <PIN> - Login admin
/logout - Logout
/admin atau /panel - Menu Admin

*📝 Konten Dinamis:*
/add <key>|<konten> - Tambah info
/edit <key>|<konten> - Edit info
/hapus <key> - Hapus info
/list - Daftar semua info

*👥 Manajemen Admin:*
/admins - Daftar admin
/addadmin <nomor> - Tambah admin (owner)
/removeadmin <nomor> - Hapus admin (owner)
/gantipin <PIN baru> - Ganti PIN (owner)

*💊 Data Korupsi:*
/narkoba - Lihat data narkoba
/narkobaadd <nama>|<jenis>|<efek>|<hukuman>|<keterangan> - Tambah narkoba
/narkobaedit <id>|<field>|<value> - Edit narkoba
/narkobadel <id> - Hapus narkoba

*⚖️ Data Kasus:*
/kasus - Lihat data kasus
/kasusadd <nomor>|<tanggal>|<tersangka>|<narkoba>|<jumlah>|<status>|<keterangan> - Tambah kasus
/kasusedit <id>|<field>|<value> - Edit kasus
/kasusdel <id> - Hapus kasus

*🏥 Data Rehabilitasi:*
/rehab - Lihat data rehab
/rehabadd <nama>|<alamat>|<kapasitas>|<jenis>|<kontak>|<keterangan> - Tambah rehab
/rehabedit <id>|<field>|<value> - Edit rehab
/rehabdel <id> - Hapus rehab

*📚 Data Edukasi:*
/edukasi - Lihat data edukasi
/edukasiadd <judul>|<kategori>|<konten>|<sumber> - Tambah edukasi
/edukasiedit <id>|<field>|<value> - Edit edukasi
/edukasidel <id> - Hapus edukasi

*👮 Data Petugas:*
/petugas - Lihat data petugas
/petugasadd <nama>|<nip>|<jabatan>|<unit>|<kontak>|<status> - Tambah petugas
/petugasedit <id>|<field>|<value> - Edit petugas
/petugasdel <id> - Hapus petugas

*📍 Data Lokasi:*
/lokasi - Lihat data lokasi
/lokasiadd <nama>|<alamat>|<jenis>|<kontak>|<koordinat>|<keterangan> - Tambah lokasi
/lokasiedit <id>|<field>|<value> - Edit lokasi
/lokasidel <id> - Hapus lokasi

*📋 Data Pengaduan:*
/pengaduan - Lihat pengaduan
/pengaduanadd <nomor>|<nama>|<nik>|<kontak>|<isi>|<kategori>|<lokasi> - Tambah pengaduan
/pengaduanedit <id>|<field>|<value> - Edit pengaduan
/pengaduadel <id> - Hapus pengaduan
/pengaduanstatus <id>|<status> - Update status pengaduan

*📊 Laporan & Statistik:*
/laporan - Lihat laporan
/laporanadd <judul>|<periode>|<jenis>|<konten>|<penyusun> - Tambah laporan
/laporanedit <id>|<field>|<value> - Edit laporan
/laporandel <id> - Hapus laporan

*📖 Bantuan:*
/help - Bantuan ini
/bantuan - Alias help`;
}

function handleAdminCommand(text, jid) {
  const { cmd, args } = admin.parseAdminArgs(text);

  if (cmd === '/login') {
    const pin = args.split(' ')[0];
    if (!pin) return { text: 'Format: /login <PIN>' };
    const result = admin.authenticateWithPin(jid, pin);
    if (result.success) return { text: `✅ Login berhasil. Role: ${result.role}` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/logout') {
    admin.logoutAdmin(jid);
    return { text: '✅ Logged out.' };
  }

  if (cmd === '/admin' || cmd === '/panel') {
    if (!admin.isAdmin(jid)) return { text: '❌ Anda belum login. Gunakan /login <PIN>' };
    return { text: interactiveMenus.mainAdmin.text, menu: 'mainAdmin' };
  }

  if (!admin.isAdmin(jid)) return null;

  if (cmd === '/help' || cmd === '/bantuan') {
    return { text: formatAdminHelp() };
  }

  if (cmd === '/add') {
    const parsed = admin.parseKeyValue(args);
    if (!parsed) return { text: 'Format: /add <key>|<konten>' };
    const result = admin.addContent(jid, parsed.key, parsed.value);
    if (result.success) return { text: `✅ Konten "${parsed.key}" berhasil ditambahkan.` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/edit') {
    const parsed = admin.parseKeyValue(args);
    if (!parsed) return { text: 'Format: /edit <key>|<konten baru>' };
    const result = admin.editContent(jid, parsed.key, parsed.value);
    if (result.success) return { text: `✅ Konten "${parsed.key}" berhasil diupdate.` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/hapus' || cmd === '/delete') {
    const key = args.split(' ')[0];
    if (!key) return { text: 'Format: /hapus <key>' };
    const result = admin.deleteContent(jid, key);
    if (result.success) return { text: `✅ Konten "${key}" dihapus.` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/list') {
    const list = admin.listContent(jid);
    return { text: `📋 *Konten Dinamis:*\n\n${list}` };
  }

  if (cmd === '/admins') {
    const list = admin.listAdmins(jid);
    return { text: `👥 *Daftar Admin:*\n\n${list}` };
  }

  if (cmd === '/addadmin') {
    const target = args.split(' ')[0];
    if (!target) return { text: 'Format: /addadmin <nomor>\nContoh: /addadmin 6281234567890' };
    const targetJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
    const result = admin.addAdmin(jid, targetJid);
    if (result.success) return { text: `✅ Admin berhasil ditambahkan: ${target}` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/removeadmin') {
    const target = args.split(' ')[0];
    if (!target) return { text: 'Format: /removeadmin <nomor>' };
    const targetJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
    const result = admin.removeAdmin(jid, targetJid);
    if (result.success) return { text: `✅ Admin dihapus: ${target}` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/gantipin' || cmd === '/changepin') {
    const newPin = args.split(' ')[0];
    if (!newPin) return { text: 'Format: /gantipin <PIN baru>' };
    const result = admin.changePin(jid, newPin);
    if (result.success) return { text: `✅ PIN berhasil diganti menjadi: ${newPin}` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/narkoba') {
    const data = admin.getNarkobaData();
    const list = admin.formatList(data.data, d => `${d.nama} (${d.jenis}) - ${d.efek.substring(0,30)}... [${d.id}]`);
    return { text: `💊 *Data Narkoba:*\n\n${list}` };
  }

  if (cmd === '/narkobaadd') {
    const parsed = admin.parseFields(args, ['nama', 'jenis', 'efek', 'hukuman', 'keterangan']);
    if (!parsed) return { text: 'Format: /narkobaadd <nama>|<jenis>|<efek>|<hukuman>|<keterangan>' };
    const data = admin.getNarkobaData();
    const newItem = {
      id: admin.generateId('NAR'),
      nama: parsed.nama,
      jenis: parsed.jenis,
      efek: parsed.efek,
      hukuman: parsed.hukuman,
      keterangan: parsed.keterangan,
      createdAt: admin.getCurrentDateTime(),
      updatedAt: admin.getCurrentDateTime()
    };
    data.data.push(newItem);
    admin.saveNarkobaData(data);
    return { text: `✅ Data narkoba "${parsed.nama}" berhasil ditambahkan (ID: ${newItem.id})` };
  }

  if (cmd === '/narkobaedit') {
    const parsed = admin.parseFields(args, ['id', 'field', 'value']);
    if (!parsed) return { text: 'Format: /narkobaedit <id>|<field>|<value>\nField: nama, jenis, efek, hukuman, keterangan' };
    const data = admin.getNarkobaData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validFields = ['nama', 'jenis', 'efek', 'hukuman', 'keterangan'];
    if (!validFields.includes(parsed.field)) return { text: `❌ Field tidak valid. Gunakan: ${validFields.join(', ')}` };
    data.data[idx][parsed.field] = parsed.value;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.saveNarkobaData(data);
    return { text: `✅ Data narkoba ${parsed.id} berhasil diupdate` };
  }

  if (cmd === '/narkobadel') {
    const id = args.split(' ')[0];
    if (!id) return { text: 'Format: /narkobadel <id>' };
    const data = admin.getNarkobaData();
    const idx = data.data.findIndex(d => d.id === id);
    if (idx === -1) return { text: `❌ Data dengan ID ${id} tidak ditemukan` };
    const nama = data.data[idx].nama;
    data.data.splice(idx, 1);
    admin.saveNarkobaData(data);
    return { text: `✅ Data narkoba "${nama}" (${id}) berhasil dihapus` };
  }

  if (cmd === '/kasus') {
    const data = admin.getKasusData();
    const list = admin.formatList(data.data, d => `${d.nomorKasus} - ${d.namaTersangka} (${d.jenisNarkoba}, ${d.jumlah}) - ${d.status} [${d.id}]`);
    return { text: `⚖️ *Data Kasus Narkoba:*\n\n${list}` };
  }

  if (cmd === '/kasusadd') {
    const parsed = admin.parseFields(args, ['nomorKasus', 'tanggal', 'namaTersangka', 'jenisNarkoba', 'jumlah', 'status', 'keterangan']);
    if (!parsed) return { text: 'Format: /kasusadd <nomor>|<tanggal>|<tersangka>|<narkoba>|<jumlah>|<status>|<keterangan>' };
    const data = admin.getKasusData();
    const newItem = {
      id: admin.generateId('KAS'),
      nomorKasus: parsed.nomorKasus,
      tanggal: parsed.tanggal,
      namaTersangka: parsed.namaTersangka,
      jenisNarkoba: parsed.jenisNarkoba,
      jumlah: parsed.jumlah,
      status: parsed.status,
      keterangan: parsed.keterangan,
      createdAt: admin.getCurrentDateTime(),
      updatedAt: admin.getCurrentDateTime()
    };
    data.data.push(newItem);
    admin.saveKasusData(data);
    return { text: `✅ Kasus "${parsed.nomorKasus}" berhasil ditambahkan (ID: ${newItem.id})` };
  }

  if (cmd === '/kasusedit') {
    const parsed = admin.parseFields(args, ['id', 'field', 'value']);
    if (!parsed) return { text: 'Format: /kasusedit <id>|<field>|<value>\nField: nomorKasus, tanggal, namaTersangka, jenisNarkoba, jumlah, status, keterangan' };
    const data = admin.getKasusData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validFields = ['nomorKasus', 'tanggal', 'namaTersangka', 'jenisNarkoba', 'jumlah', 'status', 'keterangan'];
    if (!validFields.includes(parsed.field)) return { text: `❌ Field tidak valid. Gunakan: ${validFields.join(', ')}` };
    data.data[idx][parsed.field] = parsed.value;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.saveKasusData(data);
    return { text: `✅ Kasus ${parsed.id} berhasil diupdate` };
  }

  if (cmd === '/kasusdel') {
    const id = args.split(' ')[0];
    if (!id) return { text: 'Format: /kasusdel <id>' };
    const data = admin.getKasusData();
    const idx = data.data.findIndex(d => d.id === id);
    if (idx === -1) return { text: `❌ Data dengan ID ${id} tidak ditemukan` };
    const nomor = data.data[idx].nomorKasus;
    data.data.splice(idx, 1);
    admin.saveKasusData(data);
    return { text: `✅ Kasus "${nomor}" (${id}) berhasil dihapus` };
  }

  if (cmd === '/rehab') {
    const data = admin.getRehabData();
    const list = admin.formatList(data.data, d => `${d.nama} (${d.jenis}) - Kap: ${d.kapasitas} - ${d.alamat.substring(0,30)}... [${d.id}]`);
    return { text: `🏥 *Data Rehabilitasi:*\n\n${list}` };
  }

  if (cmd === '/rehabadd') {
    const parsed = admin.parseFields(args, ['nama', 'alamat', 'kapasitas', 'jenis', 'kontak', 'keterangan']);
    if (!parsed) return { text: 'Format: /rehabadd <nama>|<alamat>|<kapasitas>|<jenis>|<kontak>|<keterangan>' };
    const data = admin.getRehabData();
    const newItem = {
      id: admin.generateId('REH'),
      nama: parsed.nama,
      alamat: parsed.alamat,
      kapasitas: parsed.kapasitas,
      jenis: parsed.jenis,
      kontak: parsed.kontak,
      keterangan: parsed.keterangan,
      createdAt: admin.getCurrentDateTime(),
      updatedAt: admin.getCurrentDateTime()
    };
    data.data.push(newItem);
    admin.saveRehabData(data);
    return { text: `✅ Rehab "${parsed.nama}" berhasil ditambahkan (ID: ${newItem.id})` };
  }

  if (cmd === '/rehabedit') {
    const parsed = admin.parseFields(args, ['id', 'field', 'value']);
    if (!parsed) return { text: 'Format: /rehabedit <id>|<field>|<value>\nField: nama, alamat, kapasitas, jenis, kontak, keterangan' };
    const data = admin.getRehabData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validFields = ['nama', 'alamat', 'kapasitas', 'jenis', 'kontak', 'keterangan'];
    if (!validFields.includes(parsed.field)) return { text: `❌ Field tidak valid. Gunakan: ${validFields.join(', ')}` };
    data.data[idx][parsed.field] = parsed.value;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.saveRehabData(data);
    return { text: `✅ Rehab ${parsed.id} berhasil diupdate` };
  }

  if (cmd === '/rehabdel') {
    const id = args.split(' ')[0];
    if (!id) return { text: 'Format: /rehabdel <id>' };
    const data = admin.getRehabData();
    const idx = data.data.findIndex(d => d.id === id);
    if (idx === -1) return { text: `❌ Data dengan ID ${id} tidak ditemukan` };
    const nama = data.data[idx].nama;
    data.data.splice(idx, 1);
    admin.saveRehabData(data);
    return { text: `✅ Rehab "${nama}" (${id}) berhasil dihapus` };
  }

  if (cmd === '/edukasi') {
    const data = admin.getEdukasiData();
    const list = admin.formatList(data.data, d => `${d.judul} (${d.kategori}) - ${d.konten.substring(0,40)}... [${d.id}]`);
    return { text: `📚 *Data Edukasi & Pencegahan:*\n\n${list}` };
  }

  if (cmd === '/edukasiadd') {
    const parsed = admin.parseFields(args, ['judul', 'kategori', 'konten', 'sumber']);
    if (!parsed) return { text: 'Format: /edukasiadd <judul>|<kategori>|<konten>|<sumber>' };
    const data = admin.getEdukasiData();
    const newItem = {
      id: admin.generateId('EDU'),
      judul: parsed.judul,
      kategori: parsed.kategori,
      konten: parsed.konten,
      sumber: parsed.sumber,
      createdAt: admin.getCurrentDateTime(),
      updatedAt: admin.getCurrentDateTime()
    };
    data.data.push(newItem);
    admin.saveEdukasiData(data);
    return { text: `✅ Edukasi "${parsed.judul}" berhasil ditambahkan (ID: ${newItem.id})` };
  }

  if (cmd === '/edukasiedit') {
    const parsed = admin.parseFields(args, ['id', 'field', 'value']);
    if (!parsed) return { text: 'Format: /edukasiedit <id>|<field>|<value>\nField: judul, kategori, konten, sumber' };
    const data = admin.getEdukasiData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validFields = ['judul', 'kategori', 'konten', 'sumber'];
    if (!validFields.includes(parsed.field)) return { text: `❌ Field tidak valid. Gunakan: ${validFields.join(', ')}` };
    data.data[idx][parsed.field] = parsed.value;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.saveEdukasiData(data);
    return { text: `✅ Edukasi ${parsed.id} berhasil diupdate` };
  }

  if (cmd === '/edukasidel') {
    const id = args.split(' ')[0];
    if (!id) return { text: 'Format: /edukasidel <id>' };
    const data = admin.getEdukasiData();
    const idx = data.data.findIndex(d => d.id === id);
    if (idx === -1) return { text: `❌ Data dengan ID ${id} tidak ditemukan` };
    const judul = data.data[idx].judul;
    data.data.splice(idx, 1);
    admin.saveEdukasiData(data);
    return { text: `✅ Edukasi "${judul}" (${id}) berhasil dihapus` };
  }

  if (cmd === '/petugas') {
    const data = admin.getPetugasData();
    const list = admin.formatList(data.data, d => `${d.nama} (${d.nip}) - ${d.jabatan} @ ${d.unit} [${d.status}] [${d.id}]`);
    return { text: `👮 *Data Petugas BNNP:*\n\n${list}` };
  }

  if (cmd === '/petugasadd') {
    const parsed = admin.parseFields(args, ['nama', 'nip', 'jabatan', 'unit', 'kontak', 'status']);
    if (!parsed) return { text: 'Format: /petugasadd <nama>|<nip>|<jabatan>|<unit>|<kontak>|<status>' };
    const data = admin.getPetugasData();
    const newItem = {
      id: admin.generateId('PET'),
      nama: parsed.nama,
      nip: parsed.nip,
      jabatan: parsed.jabatan,
      unit: parsed.unit,
      kontak: parsed.kontak,
      status: parsed.status,
      createdAt: admin.getCurrentDateTime(),
      updatedAt: admin.getCurrentDateTime()
    };
    data.data.push(newItem);
    admin.savePetugasData(data);
    return { text: `✅ Petugas "${parsed.nama}" berhasil ditambahkan (ID: ${newItem.id})` };
  }

  if (cmd === '/petugasedit') {
    const parsed = admin.parseFields(args, ['id', 'field', 'value']);
    if (!parsed) return { text: 'Format: /petugasedit <id>|<field>|<value>\nField: nama, nip, jabatan, unit, kontak, status' };
    const data = admin.getPetugasData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validFields = ['nama', 'nip', 'jabatan', 'unit', 'kontak', 'status'];
    if (!validFields.includes(parsed.field)) return { text: `❌ Field tidak valid. Gunakan: ${validFields.join(', ')}` };
    data.data[idx][parsed.field] = parsed.value;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.savePetugasData(data);
    return { text: `✅ Petugas ${parsed.id} berhasil diupdate` };
  }

  if (cmd === '/petugasdel') {
    const id = args.split(' ')[0];
    if (!id) return { text: 'Format: /petugasdel <id>' };
    const data = admin.getPetugasData();
    const idx = data.data.findIndex(d => d.id === id);
    if (idx === -1) return { text: `❌ Data dengan ID ${id} tidak ditemukan` };
    const nama = data.data[idx].nama;
    data.data.splice(idx, 1);
    admin.savePetugasData(data);
    return { text: `✅ Petugas "${nama}" (${id}) berhasil dihapus` };
  }

  if (cmd === '/lokasi') {
    const data = admin.getLokasiData();
    const list = admin.formatList(data.data, d => `${d.nama} (${d.jenis}) - ${d.alamat.substring(0,40)}... [${d.id}]`);
    return { text: `📍 *Data Lokasi Kantor/Cabang:*\n\n${list}` };
  }

  if (cmd === '/lokasiadd') {
    const parsed = admin.parseFields(args, ['nama', 'alamat', 'jenis', 'kontak', 'koordinat', 'keterangan']);
    if (!parsed) return { text: 'Format: /lokasiadd <nama>|<alamat>|<jenis>|<kontak>|<koordinat>|<keterangan>' };
    const data = admin.getLokasiData();
    const newItem = {
      id: admin.generateId('LOK'),
      nama: parsed.nama,
      alamat: parsed.alamat,
      jenis: parsed.jenis,
      kontak: parsed.kontak,
      koordinat: parsed.koordinat,
      keterangan: parsed.keterangan,
      createdAt: admin.getCurrentDateTime(),
      updatedAt: admin.getCurrentDateTime()
    };
    data.data.push(newItem);
    admin.saveLokasiData(data);
    return { text: `✅ Lokasi "${parsed.nama}" berhasil ditambahkan (ID: ${newItem.id})` };
  }

  if (cmd === '/lokasiedit') {
    const parsed = admin.parseFields(args, ['id', 'field', 'value']);
    if (!parsed) return { text: 'Format: /lokasiedit <id>|<field>|<value>\nField: nama, alamat, jenis, kontak, koordinat, keterangan' };
    const data = admin.getLokasiData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validFields = ['nama', 'alamat', 'jenis', 'kontak', 'koordinat', 'keterangan'];
    if (!validFields.includes(parsed.field)) return { text: `❌ Field tidak valid. Gunakan: ${validFields.join(', ')}` };
    data.data[idx][parsed.field] = parsed.value;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.saveLokasiData(data);
    return { text: `✅ Lokasi ${parsed.id} berhasil diupdate` };
  }

  if (cmd === '/lokasidel') {
    const id = args.split(' ')[0];
    if (!id) return { text: 'Format: /lokasidel <id>' };
    const data = admin.getLokasiData();
    const idx = data.data.findIndex(d => d.id === id);
    if (idx === -1) return { text: `❌ Data dengan ID ${id} tidak ditemukan` };
    const nama = data.data[idx].nama;
    data.data.splice(idx, 1);
    admin.saveLokasiData(data);
    return { text: `✅ Lokasi "${nama}" (${id}) berhasil dihapus` };
  }

  if (cmd === '/pengaduan') {
    const data = admin.getPengaduanData();
    const list = admin.formatList(data.data, d => `${d.nomorTiket} - ${d.namaPelapor} (${d.kategori}) - ${d.status} [${d.id}]`);
    return { text: `📋 *Data Pengaduan Masyarakat:*\n\n${list}` };
  }

  if (cmd === '/pengaduanadd') {
    const parsed = admin.parseFields(args, ['nomorTiket', 'namaPelapor', 'nik', 'kontak', 'isiPengaduan', 'kategori', 'lokasi']);
    if (!parsed) return { text: 'Format: /pengaduanadd <nomorTiket>|<nama>|<nik>|<kontak>|<isi>|<kategori>|<lokasi>' };
    const data = admin.getPengaduanData();
    const newItem = {
      id: admin.generateId('PGD'),
      nomorTiket: parsed.nomorTiket,
      namaPelapor: parsed.namaPelapor,
      nik: parsed.nik,
      kontak: parsed.kontak,
      isiPengaduan: parsed.isiPengaduan,
      kategori: parsed.kategori,
      lokasi: parsed.lokasi,
      status: 'Baru',
      createdAt: admin.getCurrentDateTime(),
      updatedAt: admin.getCurrentDateTime()
    };
    data.data.push(newItem);
    admin.savePengaduanData(data);
    return { text: `✅ Pengaduan "${parsed.nomorTiket}" berhasil ditambahkan (ID: ${newItem.id})` };
  }

  if (cmd === '/pengaduanedit') {
    const parsed = admin.parseFields(args, ['id', 'field', 'value']);
    if (!parsed) return { text: 'Format: /pengaduanedit <id>|<field>|<value>\nField: nomorTiket, namaPelapor, nik, kontak, isiPengaduan, kategori, lokasi, status' };
    const data = admin.getPengaduanData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validFields = ['nomorTiket', 'namaPelapor', 'nik', 'kontak', 'isiPengaduan', 'kategori', 'lokasi', 'status'];
    if (!validFields.includes(parsed.field)) return { text: `❌ Field tidak valid. Gunakan: ${validFields.join(', ')}` };
    data.data[idx][parsed.field] = parsed.value;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.savePengaduanData(data);
    return { text: `✅ Pengaduan ${parsed.id} berhasil diupdate` };
  }

  if (cmd === '/pengaduadel') {
    const id = args.split(' ')[0];
    if (!id) return { text: 'Format: /pengaduadel <id>' };
    const data = admin.getPengaduanData();
    const idx = data.data.findIndex(d => d.id === id);
    if (idx === -1) return { text: `❌ Data dengan ID ${id} tidak ditemukan` };
    const tiket = data.data[idx].nomorTiket;
    data.data.splice(idx, 1);
    admin.savePengaduanData(data);
    return { text: `✅ Pengaduan "${tiket}" (${id}) berhasil dihapus` };
  }

  if (cmd === '/pengaduanstatus') {
    const parsed = admin.parseFields(args, ['id', 'status']);
    if (!parsed) return { text: 'Format: /pengaduanstatus <id>|<status>\nStatus: Baru, Diproses, Selesai, Ditolak' };
    const data = admin.getPengaduanData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validStatus = ['Baru', 'Diproses', 'Selesai', 'Ditolak'];
    if (!validStatus.includes(parsed.status)) return { text: `❌ Status tidak valid. Gunakan: ${validStatus.join(', ')}` };
    data.data[idx].status = parsed.status;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.savePengaduanData(data);
    return { text: `✅ Status pengaduan ${parsed.id} diubah ke "${parsed.status}"` };
  }

  if (cmd === '/laporan') {
    const data = admin.getLaporanData();
    const list = admin.formatList(data.data, d => `${d.judul} (${d.periode}, ${d.jenis}) - ${d.penyusun} [${d.id}]`);
    return { text: `📊 *Laporan & Statistik BNNP:*\n\n${list}` };
  }

  if (cmd === '/laporanadd') {
    const parsed = admin.parseFields(args, ['judul', 'periode', 'jenis', 'konten', 'penyusun']);
    if (!parsed) return { text: 'Format: /laporanadd <judul>|<periode>|<jenis>|<konten>|<penyusun>' };
    const data = admin.getLaporanData();
    const newItem = {
      id: admin.generateId('LAP'),
      judul: parsed.judul,
      periode: parsed.periode,
      jenis: parsed.jenis,
      konten: parsed.konten,
      penyusun: parsed.penyusun,
      createdAt: admin.getCurrentDateTime(),
      updatedAt: admin.getCurrentDateTime()
    };
    data.data.push(newItem);
    admin.saveLaporanData(data);
    return { text: `✅ Laporan "${parsed.judul}" berhasil ditambahkan (ID: ${newItem.id})` };
  }

  if (cmd === '/laporanedit') {
    const parsed = admin.parseFields(args, ['id', 'field', 'value']);
    if (!parsed) return { text: 'Format: /laporanedit <id>|<field>|<value>\nField: judul, periode, jenis, konten, penyusun' };
    const data = admin.getLaporanData();
    const idx = data.data.findIndex(d => d.id === parsed.id);
    if (idx === -1) return { text: `❌ Data dengan ID ${parsed.id} tidak ditemukan` };
    const validFields = ['judul', 'periode', 'jenis', 'konten', 'penyusun'];
    if (!validFields.includes(parsed.field)) return { text: `❌ Field tidak valid. Gunakan: ${validFields.join(', ')}` };
    data.data[idx][parsed.field] = parsed.value;
    data.data[idx].updatedAt = admin.getCurrentDateTime();
    admin.saveLaporanData(data);
    return { text: `✅ Laporan ${parsed.id} berhasil diupdate` };
  }

  if (cmd === '/laporandel') {
    const id = args.split(' ')[0];
    if (!id) return { text: 'Format: /laporandel <id>' };
    const data = admin.getLaporanData();
    const idx = data.data.findIndex(d => d.id === id);
    if (idx === -1) return { text: `❌ Data dengan ID ${id} tidak ditemukan` };
    const judul = data.data[idx].judul;
    data.data.splice(idx, 1);
    admin.saveLaporanData(data);
    return { text: `✅ Laporan "${judul}" (${id}) berhasil dihapus` };
  }

  return null;
}

function handleMessage(text, jid) {
  const session = getSession(jid);
  const isLoggedIn = admin.isAdmin(jid);

  if (!session.greeted) {
    session.greeted = true;
    session.currentMenu = 'main';
    startTimers(jid, session);
    return { text: welcomeMessage, menu: 'main' };
  }

  const msg = text.toLowerCase().trim();

  clearTimers(session);

  if (isLoggedIn && (msg === 'mainadmin' || msg === '/admin' || msg === '/panel')) {
    resetSession(jid);
    startTimers(jid, getSession(jid));
    return { text: interactiveMenus.mainAdmin.text, menu: 'mainAdmin' };
  }

  if (isLoggedIn && (msg.startsWith('admin_') || msg.startsWith('help_') || msg === 'mainAdmin')) {
    if (interactiveMenus[msg]) {
      session.currentMenu = msg;
      startTimers(jid, session);
      return { text: interactiveMenus[msg].text, menu: msg };
    }
  }

  if (msg === 'menu') {
    resetSession(jid);
    startTimers(jid, getSession(jid));
    return { text: interactiveMenus.main.text, menu: 'main' };
  }

  if (interactiveMenus[msg]) {
    session.currentMenu = msg;
    startTimers(jid, session);
    return { text: interactiveMenus[msg].text, menu: msg };
  }

  if (detailContent[msg]) {
    session.currentMenu = 'detail';
    startTimers(jid, session);
    return { text: detailContent[msg], menu: 'content_back' };
  }

  const dynamicContent = admin.getDynamicContent(msg);
  if (dynamicContent) {
    session.currentMenu = 'detail';
    startTimers(jid, session);
    return { text: dynamicContent, menu: 'content_back' };
  }

  if (session.currentMenu && session.currentMenu !== 'main' && session.currentMenu !== 'detail' && session.currentMenu !== 'mainAdmin') {
    const contextualKey = `${session.currentMenu}${msg}`;
    if (interactiveMenus[contextualKey]) {
      session.currentMenu = contextualKey;
      startTimers(jid, session);
      return { text: interactiveMenus[contextualKey].text, menu: contextualKey };
    }
    if (detailContent[contextualKey]) {
      session.currentMenu = 'detail';
      startTimers(jid, session);
      return { text: detailContent[contextualKey], menu: 'content_back' };
    }
    const dynamicContextual = admin.getDynamicContent(contextualKey);
    if (dynamicContextual) {
      session.currentMenu = 'detail';
      startTimers(jid, session);
      return { text: dynamicContextual, menu: 'content_back' };
    }
  }

  const adminReply = handleAdminCommand(text, jid);
  if (adminReply) return adminReply;

  resetSession(jid);
  startTimers(jid, getSession(jid));
  return { text: interactiveMenus.main.text, menu: 'main' };
}

module.exports = { handleMessage, resetSession, initTimers };
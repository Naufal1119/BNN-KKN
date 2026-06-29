const { mainMenu } = require('./menu');
const { interactiveMenus, detailContent } = require('./interactive');
const { getSock } = require('./connection');
const admin = require('./admin');

const userSessions = new Map();
const TIMEOUT_REMINDER = 3 * 60 * 1000;
const TIMEOUT_CLOSE = 5 * 60 * 1000;

const welcomeMessage = `Selamat datang di Layanan Chatbot BNNP Sulsel. Silakan pilih menu yang dibutuhkan.`;

const reminderMessage = `
━━━ BATAS WAKTU PELAYANAN ━━━

Yth. Bapak/Ibu Pengguna Layanan,

Tidak ada aktivitas dalam beberapa waktu terakhir. Sesi ini akan ditutup otomatis dalam 2 menit.

Jika masih memerlukan bantuan, ketik *0* atau *menu* untuk kembali ke menu utama.

Terima kasih.
`;

const closeMessage = `
━━━ SESI PELAYANAN DITUTUP ━━━

Yth. Bapak/Ibu Pengguna Layanan,

Sesi pelayanan telah ditutup karena tidak ada aktivitas.

Untuk memulai kembali, kirim *menu* kapan saja.

Informasi lebih lanjut:
📞 021-12345678 (Senin–Jumat, 08.00–16.00)
📧 cs@perusahaan.com

Terima kasih.
`;

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

function handleAdminCommand(text, jid) {
  const parts = text.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();

  if (cmd === '/login') {
    const pin = parts[1];
    if (!pin) return { text: 'Format: /login <PIN>' };
    const result = admin.authenticateWithPin(jid, pin);
    if (result.success) return { text: `✅ Login berhasil. Role: ${result.role}` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/logout') {
    admin.logoutAdmin(jid);
    return { text: '✅ Logged out.' };
  }

  if (!admin.isAdmin(jid)) return null;
  if (cmd === '/add') {
    const args = parts.slice(1).join(' ');
    const sepIdx = args.indexOf('|');
    if (sepIdx === -1) return { text: 'Format: /add <key>|<konten>' };
    const key = args.substring(0, sepIdx).trim();
    const content = args.substring(sepIdx + 1).trim();
    const result = admin.addContent(jid, key, content);
    if (result.success) return { text: `✅ Konten "${key}" berhasil ditambahkan.` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/edit') {
    const args = parts.slice(1).join(' ');
    const sepIdx = args.indexOf('|');
    if (sepIdx === -1) return { text: 'Format: /edit <key>|<konten baru>' };
    const key = args.substring(0, sepIdx).trim();
    const content = args.substring(sepIdx + 1).trim();
    const result = admin.editContent(jid, key, content);
    if (result.success) return { text: `✅ Konten "${key}" berhasil diupdate.` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/delete' || cmd === '/hapus') {
    const key = parts[1];
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
    const target = parts[1];
    if (!target) return { text: 'Format: /addadmin <nomor>\nContoh: /addadmin 6281234567890' };
    const targetJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
    const result = admin.addAdmin(jid, targetJid);
    if (result.success) return { text: `✅ Admin berhasil ditambahkan: ${target}` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/removeadmin') {
    const target = parts[1];
    if (!target) return { text: 'Format: /removeadmin <nomor>' };
    const targetJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
    const result = admin.removeAdmin(jid, targetJid);
    if (result.success) return { text: `✅ Admin dihapus: ${target}` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/changepin' || cmd === '/gantipin') {
    const newPin = parts[1];
    if (!newPin) return { text: 'Format: /gantipin <PIN baru>' };
    const result = admin.changePin(jid, newPin);
    if (result.success) return { text: `✅ PIN berhasil diganti menjadi: ${newPin}` };
    return { text: `❌ ${result.reason}` };
  }

  if (cmd === '/help' || cmd === '/bantuan') {
    return {
      text: `🔧 *Admin Commands:*

/login <PIN> - Login sebagai admin
/logout - Logout

/add <key>|<konten> - Tambah info baru
/edit <key>|<konten> - Edit info
/hapus <key> - Hapus info
/list - Daftar semua info

/admins - Daftar admin
/addadmin <nomor> - Tambah admin (owner)
/removeadmin <nomor> - Hapus admin (owner)
/gantipin <PIN> - Ganti PIN (owner)

/help - Bantuan ini`
    };
  }

  return null;
}

function handleMessage(text, jid) {
  const session = getSession(jid);

  if (!session.greeted) {
    session.greeted = true;
    session.currentMenu = 'main';
    startTimers(jid, session);
    return { text: welcomeMessage, menu: 'main' };
  }

  const msg = text.toLowerCase().trim();

  clearTimers(session);

  const adminReply = handleAdminCommand(text, jid);
  if (adminReply) return adminReply;

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
    return { text: detailContent[msg] };
  }

  const dynamicContent = admin.getDynamicContent(msg);
  if (dynamicContent) {
    session.currentMenu = 'detail';
    startTimers(jid, session);
    return { text: dynamicContent };
  }

  if (session.currentMenu && session.currentMenu !== 'main' && session.currentMenu !== 'detail') {
    const contextualKey = `${session.currentMenu}${msg}`;
    if (interactiveMenus[contextualKey]) {
      session.currentMenu = contextualKey;
      startTimers(jid, session);
      return { text: interactiveMenus[contextualKey].text, menu: contextualKey };
    }
    if (detailContent[contextualKey]) {
      session.currentMenu = 'detail';
      startTimers(jid, session);
      return { text: detailContent[contextualKey] };
    }
    const dynamicContextual = admin.getDynamicContent(contextualKey);
    if (dynamicContextual) {
      session.currentMenu = 'detail';
      startTimers(jid, session);
      return { text: dynamicContextual };
    }
  }

  const currentText = session.currentMenu && interactiveMenus[session.currentMenu]
    ? interactiveMenus[session.currentMenu].text
    : interactiveMenus.main.text;
  const currentKey = session.currentMenu && interactiveMenus[session.currentMenu]
    ? session.currentMenu
    : 'main';
  startTimers(jid, session);
  return { text: `⚠️ Maaf, pilihan "${text}" tidak tersedia.\n\n${currentText}`, menu: currentKey };
}

module.exports = { handleMessage, resetSession, initTimers };

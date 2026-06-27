const { mainMenu } = require('./menu');
const { interactiveMenus, detailContent } = require('./interactive');
const { getSock } = require('./connection');

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

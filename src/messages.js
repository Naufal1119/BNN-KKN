const { mainMenu, subMenus } = require('./menu');

const userSessions = new Map();
let sockRef = null;
const TIMEOUT_REMINDER = 3 * 60 * 1000;
const TIMEOUT_CLOSE = 5 * 60 * 1000;

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

function initTimers(sock) {
  sockRef = sock;
}

function getSession(jid) {
  if (!userSessions.has(jid)) {
    userSessions.set(jid, { menu: 'main' });
  }
  return userSessions.get(jid);
}

function resetSession(jid) {
  const session = userSessions.get(jid);
  if (session) {
    clearTimeout(session.reminderTimer);
    clearTimeout(session.closeTimer);
  }
  userSessions.set(jid, { menu: 'main' });
}

function clearTimers(session) {
  clearTimeout(session.reminderTimer);
  clearTimeout(session.closeTimer);
}

function startTimers(jid, session) {
  clearTimers(session);
  if (session.closed) return;

  session.reminderTimer = setTimeout(() => {
    if (sockRef) {
      sockRef.sendMessage(jid, { text: reminderMessage });
    }

    session.closeTimer = setTimeout(() => {
      if (sockRef && !session.closed) {
        session.closed = true;
        sockRef.sendMessage(jid, { text: closeMessage });
      }
      userSessions.delete(jid);
    }, TIMEOUT_CLOSE - TIMEOUT_REMINDER);
  }, TIMEOUT_REMINDER);
}

function handleMessage(text, jid) {
  const session = getSession(jid);
  const msg = text.toLowerCase().trim();

  clearTimers(session);

  if (msg === 'menu' || msg === '0') {
    resetSession(jid);
    startTimers(jid, getSession(jid));
    return { text: mainMenu, interactive: 'main' };
  }

  if (session.menu === 'main') {
    const choice = parseInt(msg);
    if (choice >= 1 && choice <= 5) {
      const sub = subMenus[choice];
      if (sub && sub.body) {
        session.menu = `sub_${choice}`;
        session.subMenu = choice;
        startTimers(jid, session);
        return { text: sub.body, interactive: 'sub' };
      }
    }
    startTimers(jid, session);
    return { text: `⚠️ Maaf, pilihan "${text}" tidak tersedia. Silakan pilih nomor 1-5.\n\n${mainMenu}`, interactive: 'main' };
  }

  if (session.menu && session.menu.startsWith('sub_')) {
    const subKey = session.subMenu;
    const sub = subMenus[subKey];

    if (msg === '0') {
      resetSession(jid);
      startTimers(jid, getSession(jid));
      return { text: mainMenu, interactive: 'main' };
    }

    if (sub && sub.children) {
      const childContent = sub.children[msg];
      if (childContent) {
        session.menu = 'detail';
        session.parentMenu = subKey;
        startTimers(jid, session);
        return { text: `${childContent}\n\nKetik *0* untuk kembali ke menu utama.` };
      }
    }

    if (subKey === 4) {
      resetSession(jid);
      return { text: `${sub.body}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPesan Anda telah tercatat dan akan segera diproses.\n\n${mainMenu}`, interactive: 'main' };
    }

    startTimers(jid, session);
    return { text: `⚠️ Maaf, pilihan "${text}" tidak tersedia. Silakan coba lagi.\n\n${sub.body}`, interactive: 'sub' };
  }

  if (session.menu === 'detail') {
    if (msg === '0') {
      resetSession(jid);
      startTimers(jid, getSession(jid));
      return { text: mainMenu, interactive: 'main' };
    }
    startTimers(jid, session);
    return { text: `Terima kasih. Informasi Anda telah kami catat.\n\nKetik *0* untuk kembali ke menu utama.` };
  }

  resetSession(jid);
  startTimers(jid, getSession(jid));
  return { text: mainMenu, interactive: 'main' };
}

module.exports = { handleMessage, resetSession, initTimers };

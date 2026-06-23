const { mainMenu, subMenus } = require('./menu');

const userSessions = new Map();
let sockRef = null;
const TIMEOUT_REMINDER = 3 * 60 * 1000;
const TIMEOUT_CLOSE = 5 * 60 * 1000;

const reminderMessage = `
╔══════════════════════════════════════════╗
║       PEMBERITAHUAN INACTIVITAS         ║
╚══════════════════════════════════════════╝

Yth. Pengguna Layanan,

Kami mendeteksi tidak ada aktivitas dalam beberapa waktu terakhir.

🗓️ *Sesi chat Anda akan ditutup secara otomatis* dalam 2 menit apabila tidak ada tanggapan.

Jika Anda masih memerlukan bantuan, silakan kirim:
• Ketik *0* atau *menu* untuk kembali ke menu utama
• Atau ketik pesan Anda untuk melanjutkan

Terima kasih atas perhatian Anda.
`;

const closeMessage = `
╔══════════════════════════════════════════╗
║         SESI CHAT TELAH DITUTUP         ║
╚══════════════════════════════════════════╝

Yth. Pengguna Layanan,

Sesi chat ini telah ditutup secara otomatis karena tidak ada aktivitas dalam jangka waktu tertentu.

🔹 Apabila Anda masih memerlukan bantuan, silakan kirim *menu* kapan saja untuk memulai sesi chat baru.

🔹 Untuk informasi lebih lanjut, Anda dapat menghubungi Customer Service kami di:
   📞 021-12345678 (Senin-Jumat, 08.00-16.00)
   📧 cs@perusahaan.com

Terima kasih telah mempercayakan layanan kepada kami. 🙏
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

  session.reminderTimer = setTimeout(() => {
    if (sockRef) {
      sockRef.sendMessage(jid, { text: reminderMessage });
    }

    session.closeTimer = setTimeout(() => {
      if (sockRef) {
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
    startTimers(jid, session);
    return mainMenu;
  }

  if (session.menu === 'main') {
    const choice = parseInt(msg);
    if (choice >= 1 && choice <= 5) {
      const sub = subMenus[choice];
      if (sub && sub.body) {
        session.menu = `sub_${choice}`;
        session.subMenu = choice;
        startTimers(jid, session);
        return sub.body;
      }
    }
    startTimers(jid, session);
    return `⚠️ Maaf, pilihan *${text}* tidak tersedia.\n\nSilakan pilih nomor *1* sampai *5* yang tertera pada menu.\n\n${mainMenu}`;
  }

  if (session.menu && session.menu.startsWith('sub_')) {
    const subKey = session.subMenu;
    const sub = subMenus[subKey];

    if (msg === '0') {
      resetSession(jid);
      startTimers(jid, session);
      return mainMenu;
    }

    if (sub && sub.children) {
      const childContent = sub.children[msg];
      if (childContent) {
        session.menu = 'detail';
        session.parentMenu = subKey;
        startTimers(jid, session);
        return `${childContent}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nKetik *0* untuk kembali ke menu utama.`;
      }
    }

    if (subKey === 4) {
      resetSession(jid);
      return `${sub.body}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nTerima kasih telah menghubungi kami. Pesan Anda akan segera diproses oleh petugas kami.\n\n${mainMenu}`;
    }

    startTimers(jid, session);
    return `⚠️ Maaf, pilihan *${text}* tidak valid.\n\n${sub.body}`;
  }

  if (session.menu === 'detail') {
    if (msg === '0') {
      resetSession(jid);
      startTimers(jid, session);
      return mainMenu;
    }
    startTimers(jid, session);
    return `Terima kasih. Informasi Anda telah kami catat.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nKetik *0* untuk kembali ke menu utama.`;
  }

  resetSession(jid);
  startTimers(jid, session);
  return mainMenu;
}

module.exports = { handleMessage, resetSession, initTimers };

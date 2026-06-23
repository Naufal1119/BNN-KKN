const { mainMenu, subMenus } = require('./menu');

const userSessions = new Map();
let sockRef = null;
const TIMEOUT_REMINDER = 3 * 60 * 1000;
const TIMEOUT_CLOSE = 5 * 60 * 1000;

const reminderMessage = `
╔══════════════════════════════════════════════════════════════╗
║                   PEMBERITAHUAN                             ║
║              BATAS WAKTU PELAYANAN                          ║
╚══════════════════════════════════════════════════════════════╝

Yth. Bapak/Ibu Pengguna Layanan,

Berdasarkan sistem pencatatan kami, terdeteksi bahwa tidak terdapat aktivitas komunikasi dalam beberapa waktu terakhir.

Sehubungan dengan hal tersebut, dengan ini kami informasikan bahwa *sesi pelayanan ini akan ditutup secara otomatis* dalam waktu 2 (dua) menit apabila tidak ada tanggapan dari Anda.

Apabila Anda masih memerlukan bantuan atau informasi lebih lanjut, silakan:
┌─────────────────────────────────────────────┐
│  • Ketik *0* atau *menu* untuk kembali ke   │
│    menu utama                               │
│  • Atau ketik pesan Anda untuk melanjutkan  │
│    sesi pelayanan                           │
└─────────────────────────────────────────────┘

Kami menghaturkan terima kasih atas perhatian dan kesediaan Anda untuk terus menggunakan layanan kami.
`;

const closeMessage = `
╔══════════════════════════════════════════════════════════════╗
║            SESI PELAYANAN TELAH DITUTUP                     ║
╚══════════════════════════════════════════════════════════════╝

Yth. Bapak/Ibu Pengguna Layanan,

Dengan ini diberitahukan bahwa sesi pelayanan Anda telah ditutup secara otomatis dikarenakan tidak terdapat aktivitas dalam jangka waktu yang telah ditentukan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔹  Apabila Anda masih memerlukan bantuan atau ingin
    mengakses layanan kembali, silakan kirim *menu*
    kapan saja untuk memulai sesi pelayanan baru.

🔹  Untuk informasi lebih lanjut, Anda dapat
    menghubungi Customer Service kami melalui:
    📞  021-12345678 (Senin-Jumat, 08.00-16.00 WIB)
    📧  cs@perusahaan.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Terima kasih atas kepercayaan yang telah diberikan kepada kami. Kami siap melayani Anda kembali kapan pun diperlukan.

*© 2026 - Sistem Pelayanan Berbasis Teknologi Informasi*
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
    return `⚠️  *INFORMASI*
Maaf, pilihan "*${text}*" yang Anda masukkan tidak tersedia dalam sistem kami.

Silakan pilih salah satu nomor *1* sampai *5* yang tertera pada menu di bawah ini:

${mainMenu}`;
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
      return `${sub.body}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n✅  *KONFIRMASI*\nTerima kasih telah menghubungi kami melalui layanan *Customer Service*. Pesan dan identitas Anda telah kami catat dalam sistem dan akan segera diproses oleh petugas kami pada jam operasional pelayanan.\n\n${mainMenu}`;
    }

    startTimers(jid, session);
    return `⚠️  *INFORMASI*
Maaf, pilihan "*${text}*" yang Anda masukkan tidak sesuai dengan ketentuan yang tersedia pada menu saat ini.

Silakan coba kembali dengan pilihan yang benar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${sub.body}`;
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

const fs = require('fs');
const path = require('path');

const ADMINS_FILE = path.join(__dirname, '../data/admins.json');
const CONTENT_FILE = path.join(__dirname, '../data/content.json');
const SESSION_TIMEOUT = 30 * 60 * 1000;

const adminSessions = new Map();

function loadJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function getAdminsData() {
  return loadJSON(ADMINS_FILE) || { admins: [], pin: '9283' };
}

function getContentData() {
  return loadJSON(CONTENT_FILE) || { info: {} };
}

function saveContentData(data) {
  saveJSON(CONTENT_FILE, data);
}

function saveAdminsData(data) {
  saveJSON(ADMINS_FILE, data);
}

function isAdmin(jid) {
  const session = adminSessions.get(jid);
  if (!session) return false;
  if (Date.now() - session.lastActive > SESSION_TIMEOUT) {
    adminSessions.delete(jid);
    return false;
  }
  session.lastActive = Date.now();
  return true;
}

function loginAdmin(jid) {
  const adminsData = getAdminsData();
  const admin = adminsData.admins.find(a => a.jid === jid);
  if (!admin) return false;
  adminSessions.set(jid, { lastActive: Date.now(), role: admin.role });
  return true;
}

function logoutAdmin(jid) {
  adminSessions.delete(jid);
}

function authenticateWithPin(jid, pin) {
  const adminsData = getAdminsData();
  if (pin !== adminsData.pin) return { success: false, reason: 'PIN salah' };
  const admin = adminsData.admins.find(a => a.jid === jid);
  if (!admin) return { success: false, reason: 'Nomor belum terdaftar sebagai admin' };
  loginAdmin(jid);
  return { success: true, role: admin.role };
}

function addAdmin(senderJid, targetJid) {
  const session = adminSessions.get(senderJid);
  if (!session || session.role !== 'owner') return { success: false, reason: 'Hanya owner yang bisa menambah admin' };
  const adminsData = getAdminsData();
  if (adminsData.admins.find(a => a.jid === targetJid)) {
    return { success: false, reason: 'Nomor sudah terdaftar sebagai admin' };
  }
  adminsData.admins.push({
    jid: targetJid,
    role: 'admin',
    addedBy: senderJid,
    addedAt: new Date().toISOString()
  });
  saveAdminsData(adminsData);
  return { success: true };
}

function removeAdmin(senderJid, targetJid) {
  const session = adminSessions.get(senderJid);
  if (!session || session.role !== 'owner') return { success: false, reason: 'Hanya owner yang bisa menghapus admin' };
  const adminsData = getAdminsData();
  const target = adminsData.admins.find(a => a.jid === targetJid);
  if (!target) return { success: false, reason: 'Nomor tidak ditemukan' };
  if (target.role === 'owner') return { success: false, reason: 'Tidak bisa menghapus owner' };
  adminsData.admins = adminsData.admins.filter(a => a.jid !== targetJid);
  saveAdminsData(adminsData);
  adminSessions.delete(targetJid);
  return { success: true };
}

function listAdmins(senderJid) {
  if (!isAdmin(senderJid)) return null;
  const adminsData = getAdminsData();
  return adminsData.admins.map(a => `• ${a.jid.replace('@s.whatsapp.net', '')} [${a.role}]`).join('\n');
}

function addContent(senderJid, key, text) {
  if (!isAdmin(senderJid)) return { success: false, reason: 'Session admin expired atau tidak login' };
  const data = getContentData();
  if (data.info[key]) return { success: false, reason: `Key "${key}" sudah ada. Gunakan edit.` };
  data.info[key] = text;
  saveContentData(data);
  return { success: true };
}

function editContent(senderJid, key, text) {
  if (!isAdmin(senderJid)) return { success: false, reason: 'Session admin expired atau tidak login' };
  const data = getContentData();
  if (!data.info[key]) return { success: false, reason: `Key "${key}" tidak ditemukan` };
  data.info[key] = text;
  saveContentData(data);
  return { success: true };
}

function deleteContent(senderJid, key) {
  if (!isAdmin(senderJid)) return { success: false, reason: 'Session admin expired atau tidak login' };
  const data = getContentData();
  if (!data.info[key]) return { success: false, reason: `Key "${key}" tidak ditemukan` };
  delete data.info[key];
  saveContentData(data);
  return { success: true };
}

function listContent(senderJid) {
  if (!isAdmin(senderJid)) return null;
  const data = getContentData();
  const keys = Object.keys(data.info);
  if (keys.length === 0) return 'Belum ada konten dinamis.';
  return keys.map(k => `• *${k}*: ${data.info[k].substring(0, 50)}...`).join('\n');
}

function getDynamicContent(key) {
  const data = getContentData();
  return data.info[key] || null;
}

function changePin(senderJid, newPin) {
  const session = adminSessions.get(senderJid);
  if (!session || session.role !== 'owner') return { success: false, reason: 'Hanya owner yang bisa mengganti PIN' };
  if (newPin.length < 4) return { success: false, reason: 'PIN minimal 4 karakter' };
  const adminsData = getAdminsData();
  adminsData.pin = newPin;
  saveAdminsData(adminsData);
  return { success: true };
}

function parseAdminCommand(text) {
  const parts = text.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');
  return { cmd, args, parts };
}

module.exports = {
  isAdmin,
  authenticateWithPin,
  addAdmin,
  removeAdmin,
  listAdmins,
  addContent,
  editContent,
  deleteContent,
  listContent,
  getDynamicContent,
  changePin,
  parseAdminCommand,
  loginAdmin,
  logoutAdmin
};

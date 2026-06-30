const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const NARKOBA_FILE = path.join(DATA_DIR, 'narkoba.json');
const KASUS_FILE = path.join(DATA_DIR, 'kasus.json');
const REHAB_FILE = path.join(DATA_DIR, 'rehab.json');
const EDUKASI_FILE = path.join(DATA_DIR, 'edukasi.json');
const PETUGAS_FILE = path.join(DATA_DIR, 'petugas.json');
const PENGADUAN_FILE = path.join(DATA_DIR, 'pengaduan.json');
const LOKASI_FILE = path.join(DATA_DIR, 'lokasi.json');
const LAPORAN_FILE = path.join(DATA_DIR, 'laporan.json');

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
  return loadJSON(ADMINS_FILE) || { admins: [], pin: process.env.ADMIN_PIN || '1234' };
}

function getContentData() {
  return loadJSON(CONTENT_FILE) || { info: {} };
}

function getNarkobaData() {
  return loadJSON(NARKOBA_FILE) || { data: [] };
}

function getKasusData() {
  return loadJSON(KASUS_FILE) || { data: [] };
}

function getRehabData() {
  return loadJSON(REHAB_FILE) || { data: [] };
}

function getEdukasiData() {
  return loadJSON(EDUKASI_FILE) || { data: [] };
}

function getPetugasData() {
  return loadJSON(PETUGAS_FILE) || { data: [] };
}

function getPengaduanData() {
  return loadJSON(PENGADUAN_FILE) || { data: [] };
}

function getLokasiData() {
  return loadJSON(LOKASI_FILE) || { data: [] };
}

function getLaporanData() {
  return loadJSON(LAPORAN_FILE) || { data: [] };
}

function saveAdminsData(data) {
  saveJSON(ADMINS_FILE, data);
}

function saveContentData(data) {
  saveJSON(CONTENT_FILE, data);
}

function saveNarkobaData(data) {
  saveJSON(NARKOBA_FILE, data);
}

function saveKasusData(data) {
  saveJSON(KASUS_FILE, data);
}

function saveRehabData(data) {
  saveJSON(REHAB_FILE, data);
}

function saveEdukasiData(data) {
  saveJSON(EDUKASI_FILE, data);
}

function savePetugasData(data) {
  saveJSON(PETUGAS_FILE, data);
}

function savePengaduanData(data) {
  saveJSON(PENGADUAN_FILE, data);
}

function saveLokasiData(data) {
  saveJSON(LOKASI_FILE, data);
}

function saveLaporanData(data) {
  saveJSON(LAPORAN_FILE, data);
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

function getAdminRole(jid) {
  const session = adminSessions.get(jid);
  return session ? session.role : null;
}

function isOwner(jid) {
  return getAdminRole(jid) === 'owner';
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
  if (!isOwner(senderJid)) return { success: false, reason: 'Hanya owner yang bisa menambah admin' };
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
  if (!isOwner(senderJid)) return { success: false, reason: 'Hanya owner yang bisa menghapus admin' };
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
  return adminsData.admins.map(a => `• ${a.jid.replace('@s.whatsapp.net', '').replace('@lid', '')} [${a.role}]`).join('\n');
}

function changePin(senderJid, newPin) {
  if (!isOwner(senderJid)) return { success: false, reason: 'Hanya owner yang bisa mengganti PIN' };
  if (newPin.length < 4) return { success: false, reason: 'PIN minimal 4 karakter' };
  const adminsData = getAdminsData();
  adminsData.pin = newPin;
  saveAdminsData(adminsData);
  return { success: true };
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

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function getCurrentDateTime() {
  return new Date().toISOString();
}

function parseAdminArgs(text) {
  const parts = text.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');
  return { cmd, args, parts };
}

function parseKeyValue(args, separator = '|') {
  const sepIdx = args.indexOf(separator);
  if (sepIdx === -1) return null;
  return { key: args.substring(0, sepIdx).trim(), value: args.substring(sepIdx + 1).trim() };
}

function parseMultiKeyValue(args, separators = ['|']) {
  let remaining = args.trim();
  const result = {};
  for (const sep of separators) {
    const idx = remaining.indexOf(sep);
    if (idx !== -1) {
      const key = remaining.substring(0, idx).trim();
      remaining = remaining.substring(idx + 1).trim();
      result[key] = remaining;
      break;
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

function parseFields(args, fields) {
  const result = {};
  let remaining = args.trim();
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (i === fields.length - 1) {
      result[field] = remaining;
    } else {
      const sepIdx = remaining.indexOf('|');
      if (sepIdx === -1) return null;
      result[field] = remaining.substring(0, sepIdx).trim();
      remaining = remaining.substring(sepIdx + 1).trim();
    }
  }
  return result;
}

function formatList(data, formatter) {
  if (!data || data.length === 0) return 'Belum ada data.';
  return data.map((item, i) => `${i + 1}. ${formatter(item)}`).join('\n');
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

module.exports = {
  isAdmin,
  getAdminRole,
  isOwner,
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
  loginAdmin,
  logoutAdmin,
  parseAdminArgs,
  parseKeyValue,
  parseMultiKeyValue,
  parseFields,
  generateId,
  getCurrentDate,
  getCurrentDateTime,
  formatDate,
  formatList,
  getNarkobaData,
  getKasusData,
  getRehabData,
  getEdukasiData,
  getPetugasData,
  getPengaduanData,
  getLokasiData,
  getLaporanData,
  saveNarkobaData,
  saveKasusData,
  saveRehabData,
  saveEdukasiData,
  savePetugasData,
  savePengaduanData,
  saveLokasiData,
  saveLaporanData
};
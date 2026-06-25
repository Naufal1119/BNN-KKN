const { sendInteractiveMessage } = require('@ryuu-reinzz/button-helper');
const { subMenus } = require('./menu');

const interactiveMenus = {
  main: {
    text: 'Selamat datang di Layanan Chatbot BNNP Sulsel. Sahabat dapat memilih opsi menu yang dibutuhkan:',
    header: 'LAYANAN INFORMASI DAN PELAYANAN PUBLIK',
    footer: 'Ketik 0 untuk kembali ke menu utama',
    buttonText: 'Lihat Menu',
    sections: [{
      title: 'MENU LAYANAN',
      rows: [
        { title: 'Administrasi', rowId: '1', description: 'Cek status, perbarui data, cetak kartu' },
        { title: 'Informasi', rowId: '2', description: 'Produk, jam operasional, alamat, panduan' },
        { title: 'Pengaduan', rowId: '3', description: 'Sampaikan pengaduan, hubungi CS' },
      ]
    }]
  },
  '1': {
    text: 'Anda memilih Administrasi. Silakan pilih opsi di bawah:',
    header: 'ADMINISTRASI',
    footer: 'Ketik 0 untuk kembali ke menu utama',
    buttonText: 'Lihat Opsi',
    sections: [{
      title: 'ADMINISTRASI',
      rows: [
        { title: 'Cek Status Pendaftaran', rowId: '1a', description: 'Cek status pendaftaran layanan' },
        { title: 'Perbarui Data Peserta', rowId: '1b', description: 'Perbarui data diri peserta' },
        { title: 'Cetak Kartu Peserta', rowId: '1c', description: 'Cetak ulang kartu peserta' },
      ]
    }]
  },
  '2': {
    text: 'Anda memilih Informasi. Silakan pilih opsi di bawah:',
    header: 'INFORMASI',
    footer: 'Ketik 0 untuk kembali ke menu utama',
    buttonText: 'Lihat Opsi',
    sections: [{
      title: 'INFORMASI',
      rows: [
        { title: 'Produk dan Program', rowId: '2a', description: 'Info produk dan program layanan' },
        { title: 'Jam Operasional', rowId: '2b', description: 'Jam dan hari operasional kantor' },
        { title: 'Alamat Kantor', rowId: '2c', description: 'Alamat dan lokasi kantor' },
        { title: 'Panduan dan Persyaratan', rowId: '2d', description: 'Syarat, alur, biaya layanan' },
        { title: 'Pertanyaan Umum', rowId: '2e', description: 'FAQ seputar layanan' },
      ]
    }]
  },
  '2d': {
    text: 'Anda memilih Panduan dan Persyaratan. Silakan pilih:',
    header: 'PANDUAN DAN PERSYARATAN',
    footer: 'Ketik 0 untuk kembali ke menu utama',
    buttonText: 'Lihat Opsi',
    sections: [{
      title: 'PANDUAN',
      rows: [
        { title: 'Persyaratan Dokumen', rowId: '2d1', description: 'Dokumen wajib dan pendukung' },
        { title: 'Tata Cara Pendaftaran', rowId: '2d2', description: 'Cara daftar online dan offline' },
        { title: 'Alur Proses Layanan', rowId: '2d3', description: 'Tahapan pemrosesan layanan' },
        { title: 'Estimasi Waktu', rowId: '2d4', description: 'Estimasi waktu penyelesaian' },
        { title: 'Biaya dan Tarif', rowId: '2d5', description: 'Biaya dan tarif layanan' },
      ]
    }]
  },
  '2e': {
    text: 'Anda memilih Pertanyaan Umum (FAQ). Silakan pilih:',
    header: 'PERTANYAAN UMUM',
    footer: 'Ketik 0 untuk kembali ke menu utama',
    buttonText: 'Lihat Opsi',
    sections: [{
      title: 'FAQ',
      rows: [
        { title: 'Cara Reset Password', rowId: '2e1', description: 'Langkah reset password akun' },
        { title: 'Lama Proses Pendaftaran', rowId: '2e2', description: 'Estimasi waktu pendaftaran' },
        { title: 'Biaya Pendaftaran', rowId: '2e3', description: 'Apakah pendaftaran berbayar?' },
        { title: 'Perbarui Data Diri', rowId: '2e4', description: 'Cara memperbarui data peserta' },
        { title: 'Lupa Nomor Registrasi', rowId: '2e5', description: 'Cara mengembalikan nomor registrasi' },
        { title: 'Cara Mengajukan Pengaduan', rowId: '2e6', description: 'Saluran dan cara pengaduan' },
      ]
    }]
  },
  '3': {
    text: 'Anda memilih Pengaduan. Silakan pilih opsi di bawah:',
    header: 'PENGADUAN',
    footer: 'Ketik 0 untuk kembali ke menu utama',
    buttonText: 'Lihat Opsi',
    sections: [{
      title: 'PENGADUAN',
      rows: [
        { title: 'Sampaikan Pengaduan', rowId: '3a', description: 'Sampaikan pengaduan via chat' },
        { title: 'Cek Status Pengaduan', rowId: '3b', description: 'Cek status pengaduan anda' },
        { title: 'Customer Service', rowId: '3c', description: 'Saluran komunikasi resmi' },
      ]
    }]
  }
};

const detailContent = {
  '1a': subMenus[2]?.children?.a,
  '1b': subMenus[5]?.children?.['4'],
  '1c': `${subMenus[1]?.body}

━━━ CETAK KARTU PESERTA ━━━

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

⏱ Proses: 5-10 menit (langsung) / 1×24 jam (online)

Ketik *0* untuk kembali ke menu utama.`,
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
  '3a': subMenus[1]?.children?.a,
  '3b': subMenus[2]?.children?.b,
  '3c': subMenus[4]?.body
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
    const buttonTitle = config.buttonText || 'Pilih';

    await sendInteractiveMessage(sock, jid, {
      text: config.text,
      footer: config.footer,
      title: config.header,
      interactiveButtons: [{
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
      }]
    });
    console.log(`sendInteractive: "${menuKey}" sent to ${jid}`);
  } catch (err) {
    console.error(`sendInteractive "${menuKey}" error:`, err.message);
  }
}

module.exports = { interactiveMenus, detailContent, sendInteractive };

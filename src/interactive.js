const { sendInteractiveMessage } = require('@ryuu-reinzz/button-helper');
const { subMenus } = require('./menu');

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
  }
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
  '2g': `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOKASI KANTOR CABANG BNNP SULSEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📍 BNN KAB. BONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Alamat: Jl. Ahmad Yani No. 45, Watang Pulu, Kec. Bone, Kab. Bone, Sulsel 92713
📞 Telp: (0481) 210xx | 📧 bnn.bone@bnn.go.id
⏰ Senin–Jumat, 08.00–16.00 WITA
🗺️ Maps: https://maps.app.goo.gl/bone-bnn

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📍 BNN KAB. SIDENRENG RAPPANG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Alamat: Jl. Sultan Hasanuddin No. 88, Panca Lautang, Kec. Baranti, Kab. Sidrap, Sulsel 91611
📞 Telp: (0484) 21xxx | 📧 bnn.sidrap@bnn.go.id
⏰ Senin–Jumat, 08.00–16.00 WITA
🗺️ Maps: https://maps.app.goo.gl/sidrap-bnn

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📍 BNN KOTA PALOPO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Alamat: Jl. Andi Djemma No. 12, Wara, Kec. Wara, Kota Palopo, Sulsel 91911
📞 Telp: (0471) 2xxxxx | 📧 bnn.palopo@bnn.go.id
⏰ Senin–Jumat, 08.00–16.00 WITA
🗺️ Maps: https://maps.app.goo.gl/palopo-bnn

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📍 BNN KAB. TANA TORAJA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Alamat: Jl. Pongtiku No. 56, Rantepao Utara, Kec. Rantepao, Kab. Tana Toraja, Sulsel 91819
📞 Telp: (0423) 2xxxx | 📧 bnn.tanatoraja@bnn.go.id
⏰ Senin–Jumat, 08.00–16.00 WITA
🗺️ Maps: https://maps.app.goo.gl/tanatoraja-bnn

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

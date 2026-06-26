const { sendInteractiveMessage } = require('@ryuu-reinzz/button-helper');
const { subMenus } = require('./menu');

const generateBodyWithAllOptions = (menuKey, childrenData) => {
  const stripHeader = (text) => {
    if (!text) return '';
    let result = text;
    while (result.includes('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')) {
      const lines = result.split('\n');
      let firstSeparatorIdx = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')) {
          firstSeparatorIdx = i;
          break;
        }
      }
      if (firstSeparatorIdx === -1) break;
      const remaining = lines.slice(firstSeparatorIdx + 2);
      result = remaining.join('\n');
    }
    return result.trim();
  };

  let body = '';

  if (menuKey === '1') {
    const ops = childrenData;
    body = `Anda memilih Administrasi. Berikut detail layanan yang tersedia:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.a?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.d?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.b?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.e?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.c?.body || '')}`;
  } else if (menuKey === '2') {
    const ops = childrenData;
    body = `Anda memilih Informasi. Berikut detail layanan yang tersedia:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.a?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.b?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.c?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.d?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.e?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.f?.body || '')}`;
  } else if (menuKey === '2d') {
    const ops = childrenData;
    body = `Anda memilih Panduan dan Persyaratan. Berikut detail layanan yang tersedia:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[1] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[2] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[3] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[4] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[5] || '')}`;
  } else if (menuKey === '2e') {
    const ops = childrenData;
    body = `Anda memilih Pertanyaan Umum (FAQ). Berikut detail layanan yang tersedia:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[1] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[2] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[3] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[4] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[5] || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops[6] || '')}`;
  } else if (menuKey === '3') {
    const ops = childrenData;
    body = `Anda memilih Pengaduan. Berikut detail layanan yang tersedia:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.a?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.b?.body || '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${stripHeader(ops.c?.body || '')}`;
  }

  return body || '';
};

const interactiveMenus = {
  main: {
    text: `Selamat datang di Layanan Chatbot BNNP Sulsel. Silakan pilih menu yang dibutuhkan.`,
    header: 'LAYANAN INFORMASI DAN PELAYANAN PUBLIK',
    footer: '',
    buttonText: 'Pilih Menu',
    sections: [{
      title: 'MENU LAYANAN',
      rows: [
        { title: 'Administrasi', rowId: '1' },
        { title: 'Informasi', rowId: '2' },
        { title: 'Pengaduan', rowId: '3' },
      ]
    }]
  },
  '1': {
    text: generateBodyWithAllOptions('1', subMenus),
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
    }, {
      title: 'NAVIGASI',
      rows: [
        { title: 'Kembali ke Menu Utama', rowId: '0' },
      ]
    }]
  },
  '2': {
    text: generateBodyWithAllOptions('2', subMenus),
    header: 'INFORMASI',
    footer: '',
    buttonText: 'Pilih',
    sections: [{
      title: 'INFORMASI',
      rows: [
        { title: 'Produk dan Program', rowId: '2a' },
        { title: 'Jam Operasional', rowId: '2b' },
        { title: 'Alamat Kantor', rowId: '2c' },
        { title: 'Panduan dan Persyaratan', rowId: '2d' },
        { title: 'Pertanyaan Umum', rowId: '2e' },
        { title: 'Media Sosial dan Website', rowId: '2f' },
      ]
    }, {
      title: 'NAVIGASI',
      rows: [
        { title: 'Kembali ke Menu Utama', rowId: '0' },
      ]
    }]
  },
  '2d': {
    text: generateBodyWithAllOptions('2d', subMenus[3]?.children),
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
    }, {
      title: 'NAVIGASI',
      rows: [
        { title: 'Kembali ke Menu Utama', rowId: '0' },
      ]
    }]
  },
  '2e': {
    text: generateBodyWithAllOptions('2e', subMenus[5]?.children),
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
    }, {
      title: 'NAVIGASI',
      rows: [
        { title: 'Kembali ke Menu Utama', rowId: '0' },
      ]
    }]
  },
  '3': {
    text: generateBodyWithAllOptions('3', subMenus),
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
    }, {
      title: 'NAVIGASI',
      rows: [
        { title: 'Kembali ke Menu Utama', rowId: '0' },
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
`,
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
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       MEDIA SOSIAL DAN WEBSITE BNNP SULSEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

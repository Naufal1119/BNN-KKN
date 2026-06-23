const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

const mainMenuSections = [
  {
    title: 'MENU LAYANAN',
    rows: [
      { title: 'Informasi Layanan & Produk', rowId: '1', description: 'Info produk dan program layanan' },
      { title: 'Status Permohonan', rowId: '2', description: 'Cek status pendaftaran & pengaduan' },
      { title: 'Panduan & Persyaratan', rowId: '3', description: 'Syarat, alur, biaya & estimasi' },
      { title: 'Hubungi Customer Service', rowId: '4', description: 'Saluran komunikasi resmi' },
      { title: 'Pertanyaan Umum (FAQ)', rowId: '5', description: 'FAQ seputar layanan' },
    ]
  }
];

async function sendInteractiveMainMenu(sock, jid) {
  try {
    const interactiveMsg = {
      header: proto.Message.InteractiveMessage.Header.create({ title: '🚀 LAYANAN INFORMASI DAN PELAYANAN PUBLIK' }),
      body: proto.Message.InteractiveMessage.Body.create({ text: 'Silakan pilih menu layanan yang tersedia:' }),
      footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Ketik 0 untuk kembali ke menu utama' }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
        messageVersion: 1,
        buttons: [
          {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
              title: '📋 Lihat Menu',
              sections: mainMenuSections
            })
          }
        ]
      })
    };

    const msg = generateWAMessageFromContent(
      jid,
      proto.Message.create({
        interactiveMessage: proto.Message.InteractiveMessage.create(interactiveMsg)
      }),
      { userJid: sock.user?.id }
    );

    await sock.relayMessage(jid, msg.message, { messageId: msg.key.id });
  } catch (err) {
    console.error('Gagal mengirim interactive menu:', err);
  }
}

module.exports = { sendInteractiveMainMenu };

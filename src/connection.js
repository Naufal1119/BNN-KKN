const { makeWASocket, useMultiFileAuthState, DisconnectReason, getContentType } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const pino = require('pino');

let sock = null;

async function startConnection(onMessage) {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: ['WA Chatbot', 'Chrome', '1.0.0']
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\n╔══════════════════════════════════════════════════════════════╗');
      console.log('║     SCAN QR CODE INI DENGAN WHATSAPP ANDA              ║');
      console.log('║  Buka WhatsApp > 3 Titik > Linked Devices               ║');
      console.log('╚══════════════════════════════════════════════════════════════╝\n');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'open') {
      console.log('✓ WhatsApp terhubung!');
      console.log(`✓ Nomor: ${sock.user?.id || 'Terkoneksi'}`);
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log('✗ Koneksi terputus. Kode:', statusCode, 'Reconnect:', shouldReconnect);
      if (shouldReconnect) {
        setTimeout(() => startConnection(onMessage), 3000);
      } else {
        console.log('✗ WhatsApp terlogout. Hapus folder auth_info dan jalankan ulang.');
      }
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async (messageUpsert) => {
    const message = messageUpsert.messages[0];
    if (!message.key.fromMe && message.message) {
      const msgType = getContentType(message.message);
      const msgContent = message.message[msgType];
      let text = '';
      if (msgType === 'interactiveResponseMessage') {
        const nativeFlow = msgContent?.nativeFlowResponseMessage;
        if (nativeFlow?.paramsJson) {
          try {
            const parsed = JSON.parse(nativeFlow.paramsJson);
            text = parsed.id || parsed.buttonId || parsed.selectedId || '';
          } catch (e) {}
        }
        text = text || msgContent?.body?.text || '';
      } else if (msgType === 'templateButtonReplyMessage') {
        text = msgContent?.selectedId || msgContent?.selectedButtonId || msgContent?.displayText || '';
      } else {
        text = msgContent?.text || msgContent?.caption || message.message?.conversation || '';
      }
      console.log('[DEBUG] msgType:', msgType, '| text:', text, '| jid:', message.key.remoteJid);
      if (text) {
        const jid = message.key.remoteJid;
        if (onMessage) {
          await onMessage(sock, text, jid);
        }
      }
    }
  });

  return sock;
}

function getSock() {
  return sock;
}

module.exports = { startConnection, getSock };

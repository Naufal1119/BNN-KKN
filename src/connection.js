const { makeWASocket, useMultiFileAuthState, DisconnectReason, getContentType, normalizeMessageContent } = require('@whiskeysockets/baileys');
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
      console.log('✗ Koneksi terputus. Status code:', statusCode, 'Reconnect:', shouldReconnect);
      if (lastDisconnect?.error?.message) {
        console.log('✗ Error:', lastDisconnect.error.message);
      }
      if (shouldReconnect) {
        setTimeout(() => startConnection(onMessage), 3000);
      } else {
        console.log('✗ WhatsApp terlogout. Hapus folder auth_info dan jalankan ulang.');
      }
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async (messageUpsert) => {
    console.log('📩 Event messages.upsert type:', messageUpsert.type);
    const message = messageUpsert.messages[0];
    console.log('📨 Key:', JSON.stringify(message.key));
    console.log('📨 FromMe:', message.key.fromMe);

    if (!message.key.fromMe && message.message) {
      console.log('📨 Raw message keys:', Object.keys(message.message));
      const msgType = getContentType(message.message);
      console.log('📨 Content type:', msgType);
      const msgContent = message.message[msgType];
      const text = msgContent?.text || msgContent?.caption || message.message?.conversation || '';
      console.log('📨 Extracted text:', text || '(empty)');

      if (text) {
        const jid = message.key.remoteJid;
        if (onMessage) {
          await onMessage(sock, text, jid);
        }
      }
    } else if (message.key.fromMe) {
      console.log('⏭ Skip: fromMe');
    } else if (!message.message) {
      console.log('⏭ Skip: no message content');
    }
  });

  return sock;
}

function getSock() {
  return sock;
}

module.exports = { startConnection, getSock };

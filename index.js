const { startConnection, getSock } = require('./src/connection');
const { handleMessage, initTimers } = require('./src/messages');
const { sendInteractive } = require('./src/interactive');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typingDelay(sock, jid, text) {
  await sock.sendPresenceUpdate('composing', jid);
  const base = Math.min(text.length * 3, 2000);
  const wait = Math.max(base + Math.random() * 500, 1500);
  await delay(wait);
}

async function main() {
  console.log('Memulai WhatsApp Chatbot...\n');

  const sock = await startConnection(async (sock, text, jid) => {
    try {
      const reply = handleMessage(text, jid);
      if (reply) {
        await typingDelay(sock, jid, reply.text);
        await sock.sendMessage(jid, { text: reply.text });
        if (reply.menu) {
          await sendInteractive(sock, jid, reply.menu);
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });

  initTimers();

  const port = process.env.PORT || 3000;
  const http = require('http');
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WhatsApp Bot is running!');
  });
  server.listen(port, () => {
    console.log(`\nHTTP server running on port ${port}`);
  });
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

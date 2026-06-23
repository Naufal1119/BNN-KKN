const { startConnection, getSock } = require('./src/connection');
const { handleMessage, initTimers } = require('./src/messages');

async function main() {
  console.log('Memulai WhatsApp Chatbot...\n');

  const sock = await startConnection(async (sock, text, jid) => {
    try {
      const reply = handleMessage(text, jid);
      if (reply) {
        await sock.sendMessage(jid, { text: reply });
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });

  initTimers(sock);

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

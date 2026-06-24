const fs = require('fs');
const path = require('path');

const shimDir = path.join(__dirname, '..', 'node_modules', 'baileys');
const shimFile = path.join(shimDir, 'index.js');

fs.mkdirSync(shimDir, { recursive: true });
fs.writeFileSync(shimFile, `module.exports = require('@whiskeysockets/baileys');\n`);
console.log('✓ baileys shim created for @ryuu-reinzz/button-helper compatibility');

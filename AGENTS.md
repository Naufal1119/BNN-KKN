# Session Notes

## BAGUS#1 — Manual interactiveMessage + single_select (working)
- Switch dari `listMessage` (deprecated) ke `interactiveMessage.nativeFlowMessage` dengan `single_select`
- Fix `additionalNodes`: nested `biz → interactive (type:native_flow) → native_flow (v:9, name:mixed)`
- Tambah `bot` node untuk private chat (`biz_bot: '1'`)
- Hasil: tombol single_select muncul di WhatsApp
- File: `src/interactive.js` (manual version di commit history)

## BAGUS#2 — Via @ryuu-reinzz/button-helper (working)
- Sama seperti BAGUS#1 tapi pakai `sendInteractiveMessage()` dari helper package
- Lebih clean, no manual proto/additionalNodes
- Package: `@ryuu-reinzz/button-helper`
- File: `src/interactive.js` (current)

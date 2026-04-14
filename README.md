# Proposal Site

Password-protected, encrypted single-page proposal. Built with Vite + React + TS + Tailwind. Deploys to GitHub Pages.

## How it works

- `content.json` (gitignored) holds the plaintext content.
- `npm run encrypt` derives a key from a passphrase via PBKDF2 (600k iters), encrypts the JSON with AES-256-GCM, and writes the ciphertext to `public/content.enc.json` (committed).
- The browser fetches `content.enc.json`, prompts for the passphrase, derives the same key with WebCrypto, and decrypts in memory.
- The repo can be public — no plaintext content is ever committed.

## Local

```bash
npm install
PASSWORD="your-passphrase" npm run encrypt
npm run dev
```

## Edit content

1. Edit `content.json`
2. Run `PASSWORD="your-passphrase" npm run encrypt`
3. Commit `public/content.enc.json`

The passphrase is shared with recipients out-of-band.

## Deploy

Push to `main`. GitHub Actions builds and deploys to Pages.

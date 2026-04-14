# Proposal Site

Password-protected, encrypted single-page proposal. One deployment can host multiple client proposals, selected via `?for=<slug>` in the URL.

## How it works

- `content.<slug>.json` (gitignored) holds the plaintext content for a client.
- `PASSWORD="..." npm run encrypt -- <slug>` derives a key via PBKDF2 (600k iters), encrypts the JSON with AES-256-GCM, and writes the ciphertext to `public/content.<slug>.enc.json` (committed).
- The browser reads `?for=<slug>` from the URL, fetches the matching ciphertext, prompts for the passphrase, and decrypts in memory.
- The repo can be public — no plaintext content is ever committed.

## Local

```bash
npm install
PASSWORD="your-passphrase" npm run encrypt -- gls
npm run dev
# visit http://localhost:5173/?for=gls
```

## Add a new client proposal

1. Create `content.<slug>.json` with the proposal content
2. Run `PASSWORD="unique-passphrase" npm run encrypt -- <slug>`
3. Commit `public/content.<slug>.enc.json`
4. Share the URL `https://<site>/?for=<slug>` and the passphrase out-of-band

Each client gets its own file and its own passphrase. Ciphertexts are independent.

## Deploy

Push to `main`. GitHub Actions builds and deploys to Pages.

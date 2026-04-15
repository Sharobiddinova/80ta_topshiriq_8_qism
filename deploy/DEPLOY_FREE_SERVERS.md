# Free Serverlarda Deploy

Quyidagi variant bepul planlar bilan ishlaydi:
- Smart contract: Sepolia testnet
- Backend API: Render (Free Web Service)
- Frontend: Netlify (Free Static Hosting)

## A) Smart Contract deploy (Sepolia)

1. Wallet oching (MetaMask), Sepolia ETH oling (faucet).
2. RPC oling (Infura/Alchemy).
3. `.env` sozlang:
```env
RPC_URL=YOUR_SEPOLIA_RPC_URL
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
```
4. Deploy:
```bash
npm run compile
npm run deploy:sepolia
```
5. Natijadagi contract address ni `.env` ga yozing:
```env
CONTRACT_ADDRESS=0x...
```
6. ABI chiqarish:
```bash
npm run export:abi
```

## B) Backend deploy (Render)

1. Render'da `New +` -> `Web Service`.
2. GitHub repository ni ulang.
3. Build command:
```bash
npm install && npm run compile && npm run export:abi
```
4. Start command:
```bash
npm run backend:start
```
5. Environment variables qo'shing:
- `RPC_URL`
- `PRIVATE_KEY`
- `CONTRACT_ADDRESS`
- `BACKEND_PORT=10000`
6. Deploy tugmasini bosing.
7. Backend URL olasiz: `https://your-backend-name.onrender.com`

## C) Frontend deploy (Netlify)

1. Netlify'da `Add new site` -> `Import an existing project`.
2. GitHub repo ni tanlang.
3. Publish directory: `frontend`
4. Deploy qiling.
5. `frontend/app.js` ichida default backend URL ni Render URL ga almashtiring (yoki sahifada inputga yozing).

## D) Tekshirish
- Frontend sahifani oching
- `Backend URL` maydoniga Render URL kiriting
- 1 -> 6 topshiriqlarni ketma-ket test qiling
- Ustozga GitHub link + deployed frontend/backend link bering


# Logistics Blockchain System

Ushbu loyiha logistika tizimi uchun blockchain asosida ishlab chiqilgan. Siz bergan har bir gap alohida topshiriq sifatida bajarildi va alohida fayllarga ajratildi.

## Bajarilgan topshiriqlar
1. Mahsulotni tizimga birinchi marta kiritish
2. Mahsulot lokatsiyasini real vaqt rejimida kuzatish
3. Yetkazib berish holatini yangilash
4. Mahsulot haqiqiyligini tekshirish
5. Mahsulot egasini o'zgartirish (ishlab chiqaruvchi -> distribyutor -> sotuvchi)
6. Ta'minot zanjirini audit qilish

Har bir topshiriq bo'yicha alohida hujjat:
- `tasks/1_mahsulotni_tizimga_kiritish.md`
- `tasks/2_real_vaqt_kuzatish.md`
- `tasks/3_yetkazib_berish_holati.md`
- `tasks/4_haqiqiylikni_tekshirish.md`
- `tasks/5_egasini_ozgartirish.md`
- `tasks/6_taminot_zanjiri_audit.md`

## Arxitektura
- `contracts/` - Solidity smart contract
- `test/` - har topshiriq uchun alohida test
- `backend/` - REST API + Socket.IO (real-time)
- `frontend/` - demo dashboard
- `scripts/` - deploy va ABI export
- `deploy/` - GitHub va free server deploy yo'riqnomalari

## O'rnatish
```bash
npm install
```

`.env.example` ni `.env` ga nusxalab kerakli qiymatlarni to'ldiring:
```bash
copy .env.example .env
```

## Local ishga tushirish
1. Kontraktni compile qilish:
```bash
npm run compile
```

2. Local node ishga tushirish (1-terminal):
```bash
npm run node
```

3. Kontraktni deploy qilish (2-terminal):
```bash
npm run deploy:local
```

4. `deployments/localhost.json` dagi address ni `.env` ga `CONTRACT_ADDRESS` qilib yozing.

5. ABI ni export qilish:
```bash
npm run export:abi
```

6. Backend ni ishga tushirish:
```bash
npm run backend:start
```

7. Frontend ni ochish:
- `frontend/index.html` faylini brauzerda oching yoki static server bilan ishga tushiring.

## Testlar
```bash
npm test
```

Yoki alohida topshiriq bo'yicha:
```bash
npm test -- test/1_register_product.test.js
npm test -- test/2_realtime_tracking.test.js
npm test -- test/3_delivery_status_update.test.js
npm test -- test/4_authenticity_verification.test.js
npm test -- test/5_ownership_transfer.test.js
npm test -- test/6_supply_chain_audit.test.js
```

## Deploy yo'riqnoma
- GitHub: `deploy/DEPLOY_GITHUB.md`
- Free serverlar: `deploy/DEPLOY_FREE_SERVERS.md`


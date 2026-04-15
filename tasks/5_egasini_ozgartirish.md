# 5-topshiriq: Mahsulot Egasini O'zgartirish

## Ishlatilgan fayllar
- `contracts/SupplyChainLogistics.sol` (`transferProductOwnership`, `getOwnershipHistory`)
- `backend/src/routes/task5-transfer-ownership.route.js`
- `test/5_ownership_transfer.test.js`

## API
- `POST /api/task5/transfer-ownership`
- `GET /api/task5/:productId/ownership-history`

## Tekshirish
```bash
npm test -- test/5_ownership_transfer.test.js
```


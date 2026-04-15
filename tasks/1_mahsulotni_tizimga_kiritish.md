# 1-topshiriq: Mahsulotni Tizimga Birinchi Marta Kiritish

## Ishlatilgan fayllar
- `contracts/SupplyChainLogistics.sol` (`registerProduct`)
- `backend/src/routes/task1-register-product.route.js`
- `test/1_register_product.test.js`

## API
- `POST /api/task1/register-product`
- Body:
```json
{
  "productId": "PRD-001",
  "name": "Olma Sharbat",
  "metadataURI": "ipfs://metadata/prd-001"
}
```

## Tekshirish
```bash
npm test -- test/1_register_product.test.js
```


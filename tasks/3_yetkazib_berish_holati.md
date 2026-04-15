# 3-topshiriq: Yetkazib Berish Holatini Yangilash

## Ishlatilgan fayllar
- `contracts/SupplyChainLogistics.sol` (`updateDeliveryStatus`, `getStatusHistory`)
- `backend/src/routes/task3-update-delivery-status.route.js`
- `backend/src/utils/status.js`
- `test/3_delivery_status_update.test.js`

## API
- `POST /api/task3/update-delivery-status`
- `GET /api/task3/:productId/status-history`

## Tekshirish
```bash
npm test -- test/3_delivery_status_update.test.js
```


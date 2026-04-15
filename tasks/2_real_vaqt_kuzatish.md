# 2-topshiriq: Mahsulot Qayerdaligini Real Vaqtda Kuzatish

## Ishlatilgan fayllar
- `contracts/SupplyChainLogistics.sol` (`updateLocation`, `getLocationHistory`)
- `backend/src/routes/task2-track-location.route.js`
- `backend/src/app.js` (`socket.io`)
- `frontend/app.js` (`location:update` real-time listener)
- `test/2_realtime_tracking.test.js`

## API
- `POST /api/task2/update-location`
- `GET /api/task2/:productId/location-history`

## Tekshirish
```bash
npm test -- test/2_realtime_tracking.test.js
```


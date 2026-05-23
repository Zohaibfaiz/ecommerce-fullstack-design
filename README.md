# ecommerce-fullstack-design

Full-stack responsive eCommerce app (Figma assets + React + Express + MongoDB).

## Features (Week 1-3)

- Week 1: Responsive shop UI (Home, Products, Details, Cart)
- Week 2: MongoDB + product APIs + dynamic pages + search
- Week 3: JWT auth, admin CRUD, cart localStorage, deployment ready

## Quick start

```bash
npm install
copy server\.env.example server\.env
npm run dev:server
npm run dev:client
```

Open http://127.0.0.1:5173

### Demo admin

- Email: admin@brand.com
- Password: admin123
- Admin panel: /admin (protected)

## Week 3

- Register / Login with JWT
- Protected admin routes and product CRUD
- Cart saved in localStorage
- All 49 asset files used (npm run check:assets)

## Deploy on Render

1. Push to GitHub repo ecommerce-fullstack-design
2. New Web Service on Render, use render.yaml
3. Set MONGODB_URI (Atlas), JWT_SECRET, NODE_ENV=production
4. Build: npm install && npm run build
5. Start: npm run start:prod

## Production local

```bash
npm run build
set NODE_ENV=production
npm run start:prod
```

Deadline: 5 June 2026

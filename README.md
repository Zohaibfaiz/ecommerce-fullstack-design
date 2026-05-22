# ecommerce-fullstack-design

Responsive eCommerce web app based on the **Ecommerce Web Design** Figma template (`assets.rar`).

## Week 1 — Completed (Static Frontend)

| Requirement | Status |
|-------------|--------|
| Node.js + React (Vite) + Express scaffold | Done |
| Home page (desktop + mobile) | Done |
| Product listing page | Done |
| Product details page | Done |
| Cart page | Done |
| Responsive layout (CSS Grid / Flexbox) | Done |
| Figma assets in `client/public/assets` | Done |

### Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, deals, category showcases, inquiry form, recommended items |
| `/products` | Product listing — filters, grid/list view, search |
| `/products/:productId` | Product details — gallery, specs, supplier card |
| `/cart` | Shopping cart — items, summary, saved section |

### Tech stack (Week 1)

- **Frontend:** React 19, React Router, Vite, plain CSS
- **Backend:** Express (health check only — APIs in Week 2)
- **Data:** Static JSON in `client/src/data/products.js`

## Project structure

```text
ecommerce-fullstack-design/
├── client/                 React app
│   ├── public/assets/      Images from assets.rar
│   └── src/
│       ├── components/     Header, Footer, ProductCard
│       ├── context/        CartContext (static cart state)
│       ├── data/           Sample products
│       └── pages/          Home, Products, Details, Cart
└── server/                 Express scaffold
```

## Run locally

**1. Install dependencies**

```bash
npm install
```

**2. Start frontend (Week 1 main deliverable)**

```bash
npm run dev:client
```

Open: **http://127.0.0.1:5173**

**3. Optional — backend health check**

```bash
npm run dev:server
```

API: **http://localhost:5000/api/health**

**4. Production build**

```bash
npm run build
```

## Week 1 testing checklist

- [ ] Home page loads with banner, deals, and product grids
- [ ] Resize browser to mobile width (~375px) — layout stacks correctly
- [ ] `/products` — category filters and search work
- [ ] Click a product — details page opens with image gallery
- [ ] **Add to cart** on details page → cart updates
- [ ] `/cart` — change quantity, remove item, see totals
- [ ] Header **Cart (n)** shows item count

## GitHub submission (Week 1)

Repository name: **`ecommerce-fullstack-design`**

```bash
git init
git add .
git commit -m "Week 1: static responsive eCommerce frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-fullstack-design.git
git push -u origin main
```

## Later weeks (not in Week 1 scope)

- **Week 2:** MongoDB + product CRUD APIs + dynamic data
- **Week 3:** JWT auth, admin panel, deployment, cart persistence

---

**Deadline:** 5 June 2026 — record demo video for Google Classroom on that date.

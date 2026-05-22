# ecommerce-fullstack-design

Responsive eCommerce web app based on the **Ecommerce Web Design** Figma template (`assets.rar`).

## Week 2 — Backend + Dynamic Data (current)

| Requirement | Status |
|-------------|--------|
| MongoDB product storage | Done |
| Express CRUD APIs | Done |
| Product schema (id, name, price, image, description, category, stock) | Done |
| Sample data seed | Done (auto on first server start) |
| Home — featured products from API | Done |
| Products listing — dynamic grid + search | Done |
| Product details — dynamic | Done |
| Cart — dynamic product data | Done |
| Search by name or category | Done |

## Tech stack

- **Frontend:** React, Vite, React Router, CSS (same Figma screens/assets)
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. MongoDB

Install [MongoDB Community](https://www.mongodb.com/try/download/community) locally, **or** use MongoDB Atlas and set `MONGODB_URI` in `server/.env`.

Copy env file:

```bash
copy server\.env.example server\.env
```

Default local URI:

```text
mongodb://127.0.0.1:27017/ecommerce-fullstack-design
```

### 3. Run backend (Terminal 1)

```bash
npm run dev:server
```

On first run, the server **auto-seeds** 12 sample products if the database is empty.

Manual re-seed:

```bash
npm run seed
```

### 4. Run frontend (Terminal 2)

```bash
npm run dev:client
```

Open: **http://127.0.0.1:5173**

Vite proxies `/api` → `http://127.0.0.1:5000`.

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (`?search=`, `?category=`, `?featured=true`) |
| GET | `/api/products/meta/categories` | Distinct categories |
| GET | `/api/products/:id` | Single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

## Project structure

```text
client/
  public/assets/     Figma export images
  src/api/           API client
  src/data/assets.js Static UI content (banners, regions)
server/
  src/models/        Mongoose Product model
  src/routes/        CRUD routes
  src/data/          Seed products
```

## Week 2 test checklist

- [ ] Backend starts and logs `MongoDB connected` + `Seeded` or `already has N products`
- [ ] `http://127.0.0.1:5000/api/products` returns JSON array
- [ ] Home page shows deals + recommended from API
- [ ] Search in header filters products on `/products`
- [ ] Product detail page loads from `/api/products/:id`
- [ ] Cart shows correct names, images, prices from API

## Week 3 (next)

JWT auth, admin panel, cart persistence, deployment.

**Deadline:** 5 June 2026

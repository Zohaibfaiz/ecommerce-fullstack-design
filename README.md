
# Full-Stack eCommerce Web Application 🚀

A fully functional, responsive, full-stack eCommerce web application built according to the Ecommerce Web Design Figma specifications. It includes modern visual aesthetics, dynamic content delivery, user authentication, interactive cart management, an automated checkout system, and a comprehensive protected Admin Dashboard.

## 🔗 Live Deployments
* **Production Live URL:** [https://ecommerce-fullstack-design-ochre.vercel.app](https://ecommerce-fullstack-design-ochre.vercel.app)
* **API Health Check:** [https://ecommerce-fullstack-design-ochre.vercel.app/api/health](https://ecommerce-fullstack-design-ochre.vercel.app/api/health)
* **Seeded Database Engine:** MongoDB Atlas (AWS Mumbai Region)
# 🖼️ Project Screenshots

<div align="center">

## 📌 Main Dashboard

<img width="100%" alt="Dashboard" src="https://github.com/user-attachments/assets/6d50f715-1f9a-4ee3-a81c-8bc1ccf97a3e" />

<br><br>

## 📌 Home Interface

<img width="100%" alt="Home" src="https://github.com/user-attachments/assets/88eb04cd-a3a6-466d-b4bc-46b71abe5ba3" />

<br><br>

## 📌 Books Collection

<img width="100%" alt="Books Collection" src="https://github.com/user-attachments/assets/e7f28df5-e3ec-4d24-996c-4e6613ff8838" />

<br><br>

## 📌 Categories Section

<img width="100%" alt="Categories" src="https://github.com/user-attachments/assets/4ebc4211-244d-4b85-8f1c-0cf1b8fac16c" />

<br><br>

## 📌 Book Details

<img width="100%" alt="Book Details" src="https://github.com/user-attachments/assets/54d7d7ff-80e0-43b9-bcd6-a307a49bf71f" />

<br><br>

## 📌 Search Feature

<img width="100%" alt="Search" src="https://github.com/user-attachments/assets/c9ee2de3-efc4-4dc3-9409-b9b35f1d65dd" />

<br><br>

## 📌 User Panel

<img width="100%" alt="User Panel" src="https://github.com/user-attachments/assets/59c4e32a-92fe-43ce-9536-efc239ee4a75" />

<br><br>

## 📌 Borrowing System

<img width="100%" alt="Borrowing System" src="https://github.com/user-attachments/assets/e7f09f7f-523f-4515-a5c4-70240d132ad2" />

<br><br>

## 📌 Admin Dashboard

<img width="100%" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/03432278-8873-46ce-ae87-19f5ba5c4dc8" />

<br><br>

## 📌 Mobile Responsive Design

<img width="350" alt="Mobile View" src="https://github.com/user-attachments/assets/b6688d3d-1daf-435f-ab73-4741868e018a" />

</div>





---

## 🛠️ Technology Stack
* **Frontend:** React.js, CSS3 (Custom Responsive Layouts), Flexbox, CSS Grid, React Router v6, Context API.
* **Backend:** Node.js, Express.js (transpiled as Vercel Serverless API Functions).
* **Database:** MongoDB Atlas (using Mongoose Schema models).
* **Security:** JSON Web Tokens (JWT) for session management, bcryptjs for password hashing.
* **Hosting/Deployment:** Vercel (both client-side SPA hosting and server-side API Functions).

---

## 🌟 Key Features Completed

### 📅 Week 1: Static Frontend & Responsiveness
* **Figma Pixel-Perfect Layouts:** Developed the Home Page, Product Listing, Product Details, and Cart Page matching original design criteria.
* **100% Responsive Design:** Implemented fully fluid CSS Grid and Flexbox structures supporting Desktop, Tablet, and Mobile screens.

### 📅 Week 2: Dynamic Backend & Database Integration
* **MongoDB Seeding:** Automatically seeds the database with **12 beautiful sample products** on first connection.
* **REST API Endpoints:** Complete set of CRUD operations (Create, Read, Update, Delete) for managing products (`/api/products`).
* **Instant Search & Filter Bar:** Fully operational search query mechanism allowing filtering products by name or category instantly.

### 📅 Week 3: Authentication, Cart Persistence & Secure Checkout
* **JWT User Authentication:** Fully functional login & signup system with local session synchronization.
* **Interactive Cart Manager:**
  * Add, delete, and adjust product quantities from any card or detail page.
  * Local persistence using `localStorage`.
  * **Premium Toast Notifications:** Gorgeous floating popup banner overlays with smooth slide-in and fade-out animations giving instant cart feedback!
* **Secure Checkout Flow:**
  * Auto-redirects guests to login and redirects back to the Cart without losing the flow.
  * Form overlay to enter Shipping details, prefilled with logged-in profile names.
  * Glorious **Success checkmark loading screen** on successful placement.
* **Protected Admin Panel:**
  * Simple admin interface at `/admin` accessible only to verified administrators.
  * Comprehensive dashboard showing active listings.
  * Admin form controls to add new items, modify prices/stocks, and delete listings with safety prompts.

---

## 🔑 Demo Access Credentials
To test the admin panel and protected routes immediately without registering a new profile, use the default administrator credentials:

* **Email:** `admin@brand.com`
* **Password:** `admin123`

---

## 📂 Project Structure
```
├── api/                   # Vercel Serverless entrypoint
│   └── index.js           # Serverless Function API dispatcher
├── client/                # React Vite SPA Frontend
│   ├── public/assets/     # Figma layout images and brand assets
│   └── src/
│       ├── api/           # HTTP Fetch modules for Auth & Products
│       ├── components/    # Reusable layouts, cards, protected routes
│       ├── context/       # AuthContext and CartContext (with toast manager)
│       ├── data/          # Assets, categories, and mocks
│       ├── pages/         # Home, Listing, Details, Cart, Admin Panel
│       └── styles.css     # Unified Modern Glassmorphism Stylesheet
├── server/                # Express Backend
│   ├── src/
│   │   ├── db/            # Mongoose connector and database seeders
│   │   ├── middleware/    # Auth authorization filters
│   │   ├── models/        # Product and User schemas
│   │   └── routes/        # Auth routers and Product routers
│   └── .env.example       # Backend environmental keys
├── vercel.json            # Vercel routing, ESM compilation, and path configurations
└── package.json           # Workspace manager configurations
```

---

## 💻 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zohaibfaiz/ecommerce-fullstack-design.git
   cd ecommerce-fullstack-design
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `server` directory and configure the variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecommerce
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Run the Development Server:**
   This command launches both the Vite React server on `127.0.0.1:5173` and the Express Backend on port `5000` concurrently with active hot reloading and proxies:
   ```bash
   npm run dev
   ```

---

## 📝 Evaluator Notes
* Designed to work as a decoupled architecture, optimized for high performance.
* Features pure custom CSS styling (avoiding heavy overhead frameworks) to maximize micro-animations and aesthetic layout detail.
* Deployment configuration is engineered fully in serverless environment to prevent cold-start delays of hosting platforms like Render.
